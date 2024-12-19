import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { GridReadyEvent } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';

import { MessageService } from './../../../../shared/services';
import { CommentRendererComponent, DialogModel } from './../../../../shared/components';
import { UnMasteredContainer } from '../../containers/unmastered.container';
import { UnspscColumnRendererComponent } from '../unspsc-selection/aggrid-column-renderer/unspsc-column-renderer.component';
import { ItemMasterState } from '../../store/reducers';
import { getUnmasteredData, getUnmasterRecordsLoader } from '../../store/selectors';
import { ApplicationState, CommonActionsEnum, UpdateTaskDetails, UserProfileState } from './../../../../store';
import { GetUnmasteredData, SaveForLaterUnmasteredRecords, SubmitUnmasteredRecords, UnmasteredActionsEnum } from '../../store/actions';
import { TaskType, UNSPSCSource } from '../../modal/ag-grid.constants';
import { unMasteredDialogs } from '../../dialogs/unmastered.dialogs';
import { itemMasterMessages, replaceMessageWithParams } from '../../modal/item-master-messages.constants';
import { RejectColumnRendererComponent } from './reject-column-renderer/reject-column-renderer.component';
import { AttributeExtensionColumnRendererComponent } from '../attribute-extension-renderer/attribute-extension-renderer.component';
import { UnmasteredGridColumns } from './unmastered-aggrid-columns.util';

@Component({
  selector: 'app-unmastered',
  templateUrl: './unmastered.component.html',
  styleUrls: ['./unmastered.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnmasteredComponent extends UnMasteredContainer implements OnInit, OnDestroy {
  _attributeExtensions: any = [];
  @Input() taskDetails: any;
  @Input() apiPayload: any = {};
  @Input() set attributeExtensions(value: any) {
    value && this._attributeExtensions.push(...value);
  }
  @Input('userProfile')
  set userProfile(value: UserProfileState) {
    this.updateUserProfileChanges(value);
  }
  @Output() setProductInfo = new EventEmitter<any>();

  frameworkComponents = {
    unspscCodeRendererComponent: UnspscColumnRendererComponent,
    commentRendererComponent: CommentRendererComponent,
    rejectColumnRenderer: RejectColumnRendererComponent,
    attributeColumnRendererComponent: AttributeExtensionColumnRendererComponent
  };

  isEnabledSubmitButton = false;
  isEnabledEscalateButton = false;
  updatedRecords = [];
  unmasteredData = [];
  isModifiedRejectInfo: boolean = false;
  editableColumns: any;
  unmasteredGridColumns: any;
  private previousAmbiguityFlag: string;

  private readonly destroyed$ = new Subject<boolean>();

  constructor(
    protected actions$: Actions,
    private messageService: MessageService,
    public matDialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private readonly store: Store<ItemMasterState>,
    private readonly appStore: Store<ApplicationState>
  ) {
    super();
    this.unmasteredGridColumns = new UnmasteredGridColumns();
  }

  ngOnInit(): void {
    this.initGridOption();
    this.initChangeListners();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.listenDataChanges();
    this.updateColumnDefs();
    if (this.isInvalidTask()) {
      this.gridApi.showNoRowsOverlay();
    }
  }

  autoSelectUNSPSCCode(): void {
    let count = 0;
    this.gridApi.forEachNode((node) => {
      if (
        node.data &&
        !node.data.unspscSource &&
        node.data.dsUnspscId &&
        (node.data.dsConfidenceScore > 0.75 || node.data.dsUnspscId === node.data.reUnspscId)
      ) {
        node.setData({
          ...node.data,
          ...{ unspscSource: UNSPSCSource.DS, ambiguityFlag: node.data.ambiguityFlag === 'Ambiguity' ? 'Ambiguity' : 'Confirmed' }
        });
        this.addToUpdatedRecords(node);
        count++;
      }
    });
    if (count > 0) {
      this.messageService.open(
        `${count} record${count > 1 ? 's are' : ' is'}  auto predicted out of ${this.totalRecords} ${
          this.totalRecords > 1 ? 'records' : 'record'
        }`,
        `Close`
      );
    }
  }

  submitRecords() {
    this.gridApi.stopEditing();
    if (this.getAllConfirmedData().length === this.totalRecords) {
      const dialogData = {
        submitPayload: this.getPayloadForSubmit(),
        taskType: this.taskType,
        taskDetails: this.taskDetails,
        totalRecords: this.totalRecords,
        totalConfirmedRecords: this.getAllConfirmedData().length,
        updatedRecords: []
      };
      unMasteredDialogs.submissionStepper(dialogData, this.matDialog);
    } else {
      this.store.dispatch(new SubmitUnmasteredRecords(this.getPayloadForSubmit(), this.taskType));
    }
  }

  saveForLaterRecords() {
    this.gridApi.stopEditing();
    this.store.dispatch(new SaveForLaterUnmasteredRecords(this.updatedRecords, this.getPayloadForSaveForLater(), this.taskType));
  }

  escalateRecords(): void {
    this.gridApi.stopEditing();
    const dialogData = {
      saveForLaterPayload: this.getPayloadForSaveForLater(),
      submitPayload: this.getPayloadForSubmit(),
      taskType: this.taskType,
      taskDetails: this.taskDetails,
      totalRecords: this.totalRecords,
      totalConfirmedRecords: this.getAllConfirmedData().length,
      updatedRecords: this.updatedRecords
    };
    unMasteredDialogs.submissionStepper(dialogData, this.matDialog);
  }

  closeTaskOnForce() {
    unMasteredDialogs
      .confirmDialog(new DialogModel(itemMasterMessages.commpleteTask, true), this.matDialog)
      .afterClosed()
      .subscribe((data: any) => data && this.completeTask());
  }

  discardChanges(): any {
    if (this.updatedRecords.length === 0 && !this.isModifiedRejectInfo) {
      return true;
    }
    this.gridApi.setRowData(this.prepareGridData(this.unmasteredData));
    this.updatedRecords = [];
    this.isModifiedRejectInfo = false;
    this.isEnabledEscalateButton = this.isUpdatedAllRecords() && !this.isEscalatedTask() ? true : false;
    this.changeDetectorRef.detectChanges();
  }

  private initChangeListners(): void {
    this.actions$
      .pipe(takeUntil(this.destroyed$), ofType(UnmasteredActionsEnum.SAVEFORLATER_UNMASTERED_RECORD_SUCCESS))
      .subscribe(({ message }: any) => {
        this.saveForLaterSuccessHandler(message);
      });
    this.actions$
      .pipe(takeUntil(this.destroyed$), ofType(UnmasteredActionsEnum.SUBMIT_UNMASTERED_RECORDS_SUCCESS))
      .subscribe(({ message }: any) => {
        this.submitRecordsSuccessHandler(message);
      });
    this.actions$.pipe(takeUntil(this.destroyed$), ofType(CommonActionsEnum.UPDATE_TASK_DETAILS_FAIL)).subscribe((status) => {
      if (status === 'ESCALATED') {
        this.isEnabledEscalateButton = true;
      }
      if (status === 'COMPLETED') {
        this.isEnabledSubmitButton = true;
      }
    });
  }

  private listenDataChanges(): void {
    this.gridApi.showLoadingOverlay();
    this.store
      .select(getUnmasterRecordsLoader)
      .pipe(
        takeUntil(this.destroyed$),
        filter((data) => data !== undefined)
      )
      .subscribe((data: any) => (data ? this.gridApi.showLoadingOverlay() : this.gridApi.hideOverlay()));
    this.store
      .select(getUnmasteredData)
      .pipe(
        takeUntil(this.destroyed$),
        filter((data) => data !== null)
      )
      .subscribe(
        (data: any) => {
          if (data && data.length) {
            this.totalRecords = data.length;
            this.unmasteredData = data;
            this.setProductInfo.emit(data[0].productPGUID);
            this.gridApi.setRowData(this.prepareGridData(data));
            if (this.isUpdatedAllRecords() && !this.isEscalatedTask()) {
              this.isEnabledEscalateButton = true;
            }
            if (this.getAllConfirmedData().length) {
              this.isEnabledSubmitButton = true;
            }
          } else {
            this.gridApi.showNoRowsOverlay();
            if (this.taskDetails && this.taskDetails.status !== 'COMPLETED') {
              this.openNoDataDialog();
            }
          }
          this.changeDetectorRef.detectChanges();
        },
        () => {
          this.gridApi.showNoRowsOverlay();
        }
      );
  }

  private updateColumnDefs(): void {
    const columnsUtils = this.unmasteredGridColumns.editableColumns(this);
    const columnDefs: any = this.columnDefs.columns;
    if (this.taskType === TaskType.P) {
      columnDefs.push(
        {
          headerName: 'UNSPSC Code',
          type: 'centerAligned',
          lockPosition: true,
          children: [columnsUtils.dsUNSPSC, columnsUtils.reUNSPSC, columnsUtils.manualUNSPSC]
        },
        columnsUtils.attributeExtension,
        columnsUtils.ambiguity,
        columnsUtils.commentWithUnspscSource
      );
    } else if (this.taskType === TaskType.RC) {
      columnDefs.push(
        {
          headerName: 'UNSPSC Code',
          type: 'centerAligned',
          lockPosition: true,
          children: [columnsUtils.reclassifyUNSPSC, columnsUtils.manualUNSPSC]
        },
        columnsUtils.attributeExtension,
        columnsUtils.ambiguity,
        columnsUtils.commentWithUnspscSource,
        columnsUtils.clientComment
      );
    } else if (this.taskType === TaskType.CC) {
      columnDefs.push(
        {
          headerName: 'UNSPSC Code',
          type: 'centerAligned',
          lockPosition: true,
          children: [columnsUtils.ccUNSPSC, columnsUtils.manualUNSPSC]
        },
        columnsUtils.rejectClientCorrection,
        columnsUtils.attributeExtension,
        columnsUtils.ambiguity,
        columnsUtils.commentWithUnspscSource,
        columnsUtils.clientComment
      );
    } else {
      columnDefs.push(
        columnsUtils.manualUNSPSC,
        columnsUtils.attributeExtension,
        columnsUtils.ambiguity,
        columnsUtils.commentWithunspscCode
      );
    }
    this.gridApi.setColumnDefs(columnDefs);
  }

  private isEscalatedTask(): boolean {
    return this.taskDetails && this.taskDetails.status === 'ESCALATED';
  }

  private submitRecordsSuccessHandler(message: string) {
    this.clearModifiedFlag();
    this.updatedRecords = [];
    this.changeDetectorRef.detectChanges();
    if (this.isSubmitedAllRecords()) {
      this.gridApi.setRowData([]);
      this.gridApi.showNoRowsOverlay();
    } else {
      this.messageService.open(message || itemMasterMessages.recordsSubmitted, 'Close');
      this.store.dispatch(new GetUnmasteredData(this.apiPayload));
    }
  }

  private saveForLaterSuccessHandler(message: string) {
    this.clearModifiedFlag();
    this.updatedRecords = [];
    this.changeDetectorRef.detectChanges();
    this.messageService.open(message || itemMasterMessages.recordsSaved, 'Close');
  }

  private isInvalidTask() {
    return this.taskDetails && this.taskDetails.error;
  }

  private getPayloadForSaveForLater(): any {
    switch (this.taskType) {
      case TaskType.RC:
        return this.getReclassificationSaveForLaterPayload(this.updatedRecords);
      case TaskType.CC:
        return this.getClientCorrectionSaveForLaterPayload(this.updatedRecords);
      default:
        return {
          ...this.apiPayload,
          status: 'SaveForLater',
          masterData: this.normalizeMappingProperties(this.updatedRecords)
        };
    }
  }

  private getPayloadForSubmit(): any {
    switch (this.taskType) {
      case TaskType.RC:
        return this.getReclassificationSubmitPayload();
      case TaskType.CC:
        return this.getClientCorrectionSubmitPayload();
      default:
        return {
          ...this.apiPayload,
          status: 'Completed',
          masterData: this.normalizeMappingProperties(this.getAllConfirmedData())
        };
    }
  }

  private openNoDataDialog() {
    const dialogData = new DialogModel(itemMasterMessages.noUnMasteredRecordsToMaster);
    unMasteredDialogs
      .confirmDialog(dialogData, this.matDialog)
      .afterClosed()
      .subscribe((data: any) => {
        data && this.completeTask();
      });
  }

  private completeTask(): void {
    this.appStore.dispatch(new UpdateTaskDetails({ ...this.taskDetails, status: 'COMPLETED', action: 'UPDATE' }));
  }

  private addToUpdatedRecords(node: any) {
    if (this.isMappingExists(node.data) && this.isAmbiguityFlagExists(node.data)) {
      const index = this.updatedRecords.findIndex((item) => item.itemPguid === node.data.itemPguid);
      if (index >= 0) {
        this.updatedRecords[index] = node.data;
      } else {
        this.updatedRecords.push(node.data);
      }
      this.isEnabledSubmitButton = true;
      this.isEnabledEscalateButton = this.isUpdatedAllRecords() ? true : false;
      this.changeDetectorRef.detectChanges();
      node.setData({ ...node.data, ...{ isModified: true } });
    }
  }

  private openConfirmDialog(rowNode: any): void {
    const data = new DialogModel(itemMasterMessages.clearUnspscCode, true);
    unMasteredDialogs
      .confirmDialog(data, this.matDialog)
      .afterClosed()
      .subscribe((isConfirm) => {
        const node = this.gridApi.getRowNode(rowNode.node.id);
        if (!isConfirm) {
          const ambiguityFlag = this.previousAmbiguityFlag ? this.previousAmbiguityFlag : 'Confirmed';
          node.setData({ ...node.data, ...{ ambiguityFlag: ambiguityFlag } });
        } else {
          node.setData({
            ...node.data,
            ...this.clearUnspscObject(),
            unspscSource: UNSPSCSource.M,
            unspscAttributes: []
          });
        }
        this.addToUpdatedRecords(node);
      });
  }

  private removeFromUpdatedRecord(node: any): void {
    const index = this.updatedRecords.findIndex((item) => item.itemPguid === node.data.itemPguid);
    if (index >= 0) {
      this.updatedRecords.splice(index, 1);
      node.setData({ ...node.data, ...{ isModified: true } });
      this.isEnabledEscalateButton = false;
    }
    this.isEnabledSubmitButton = this.getAllConfirmedData().length ? true : false;
    this.changeDetectorRef.detectChanges();
  }

  private openAmbiguityInformationDialog(rowNode: any): void {
    const data = new DialogModel(`UNSPSC Code is empty, so you can't set Ambiquity Flag as "<strong>${rowNode.data.ambiguityFlag}</strong>"
    <br>Please select UNSPSC Code first.`);
    unMasteredDialogs
      .confirmDialog(data, this.matDialog)
      .afterClosed()
      .subscribe((data: any) => {
        if (!data) {
          return;
        }
        const node = this.gridApi.getRowNode(rowNode.node.id);
        node.setData({
          ...node.data,
          ambiguityFlag: rowNode.data.unspscCode === 'N/A' ? 'No UNSPSC found' : ''
        });
      });
  }

  // below functions might shown as unused but those are using from unmastered-aggrid-columns.util.ts

  private escalateTask(): void {
    this.appStore.dispatch(
      new UpdateTaskDetails({
        ...this.taskDetails,
        status: 'ESCALATED',
        action: 'UPDATE'
      })
    );
  }

  private getEscalateMessage(): string {
    const totalConfirmedRecords = this.getAllConfirmedData().length;
    if (this.totalRecords === totalConfirmedRecords) {
      return itemMasterMessages.confirmSubmit;
    } else if (!this.getAllConfirmedData().length) {
      return itemMasterMessages.escalateToLead;
    }
    return replaceMessageWithParams(itemMasterMessages.submitAndEscalate, {
      totalConfirmedRecords,
      otherRecords: this.totalRecords - totalConfirmedRecords
    });
  }

  private ambiguityFlagChangeHandler(rowNode: any) {
    if (rowNode.data.unspscSource && rowNode.data.unspscCode !== 'N/A' && rowNode.data.ambiguityFlag === 'No UNSPSC found') {
      this.openConfirmDialog(rowNode);
    } else {
      const node = this.gridApi.getRowNode(rowNode.node.id);
      if (this.taskType === TaskType.CC && rowNode.data.clientCorrectionAction === 'Reject') {
        this.addToUpdatedRecords(node);
        return;
      }
      if ((!rowNode.data.unspscSource || rowNode.data.unspscCode === 'N/A') && rowNode.data.ambiguityFlag !== 'No UNSPSC found') {
        this.openAmbiguityInformationDialog(rowNode);
      } else if (!rowNode.data.unspscSource && rowNode.data.ambiguityFlag === 'No UNSPSC found') {
        node.setData({
          ...node.data,
          ...this.clearUnspscObject(),
          unspscSource: UNSPSCSource.M,
          unspscAttributes: []
        });
        this.addToUpdatedRecords(node);
      } else {
        this.addToUpdatedRecords(node);
      }
    }
  }

  private rejectClientCorrectedRecord(node: any, isRejected: boolean): void {
    this.isModifiedRejectInfo = true;
    node.setData({
      ...node.data,
      ...{
        clientCorrectionAction: isRejected ? 'Reject' : '',
        unspscSource: '',
        unspscCode: '',
        ambiguityFlag: this.isExceptionLead ? 'Confirmed' : node.data.ambiguityFlag === 'Ambiguity' ? 'Ambiguity' : 'Confirmed',
        isModified: true
      }
    });
    if (isRejected) {
      node.data.comments ? this.addToUpdatedRecords(node) : this.removeFromUpdatedRecord(node);
    } else {
      this.removeFromUpdatedRecord(node);
    }
  }

  private onCommentChanged(node: any): void {
    this.isModifiedRejectInfo = true;
    node.data.comments
      ? this.addToUpdatedRecords(node)
      : node.data.clientCorrectionAction === 'Reject' || node.data.clientCorrectionAction === 'Override'
      ? this.removeFromUpdatedRecord(node)
      : this.addToUpdatedRecords(node);
    this.changeDetectorRef.detectChanges();
  }

  private onCellDoubleClicked(event: any): void {
    const promptData: any = {
      productDesc: event.data.productDesc,
      unspscCode: this.getDefaultUnspscCode(event.data, this.taskType)
    };
    unMasteredDialogs
      .unspscSelection(promptData, this.matDialog)
      .afterClosed()
      .subscribe((data: any) => {
        if (!data) {
          return;
        }
        console.log(data);
        const rowNode = this.gridApi.getRowNode(event.node.id);
        if (this.taskType === TaskType.CC) {
          data = { ...data, clientCorrectionAction: data.unspscCode !== rowNode.data.unspscForCC ? 'Override' : 'Approve' };
        }
        rowNode.setData({
          ...rowNode.data,
          ...data,
          ambiguityFlag: rowNode.data.ambiguityFlag === 'Ambiguity' ? 'Ambiguity' : 'Confirmed',
          unspscSource: UNSPSCSource.M
        });
        if (this.taskType === TaskType.CC && data.unspscCode !== rowNode.data.unspscForCC && !rowNode.data.comments) {
          this.removeFromUpdatedRecord(rowNode.data);
        }
        this.addToUpdatedRecords(rowNode);
      });
  }
}
