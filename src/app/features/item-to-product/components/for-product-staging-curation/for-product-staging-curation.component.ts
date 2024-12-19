import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ForStagingCurationWBUI } from '../../../admin-dashboard/modal/staging_curation_wb_ui.constants';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationState, getAppEnv, getLoadingState, getTaskDetails } from '@app-store';
import { Store } from '@ngrx/store';
import {
  CloseStagingCurationSidebar,
  GetStagingProductsForCuration,
  StagingCurationSaveForLaterWB,
  StagingCurationTaskSubmission,
  StagingCurationWorkbenchDownloadFile,
  StagingCurationWorkbenchUploadFile
} from '../../store/actions';
import { Observable, Subject } from 'rxjs';
import { closeSidebarAtStatus, GetStagingLoadingState, retrieveProductStagingCuration } from '../../store/selectors';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { StagingProductItemsViewDialogComponent } from './staging-product-items-view-dialog/staging-product-items-view-dialog.component';
import { MatDrawer } from '@angular/material/sidenav';
import { UploadFileValidation } from 'src/app/features/interface/upload-file-validation';
import { UnspscColumnRendererComponent } from 'src/app/features/item-master/components/unspsc-selection/aggrid-column-renderer/unspsc-column-renderer.component';
import { ConfirmCuratedProduct, CuratedRecords, ListArray, StagingCurationSaveForLater } from '../../modal/staging-curation-save-later.interface';
import { TaskEscalatedDialogComponent } from './task-escalated-dialog/task-escalated-dialog.component';
import { Router } from '@angular/router';
import { unMasteredDialogs } from './../../../item-master/dialogs/unmastered.dialogs';
import { UserInitiatedData } from 'src/app/features/admin-dashboard/modal/user-initiated-interface';
import { StagingCurationState } from './../../store/reducers/index';
import { BaseContainer } from './../../containers/base.container';
import { CheckboxButtonRendererComponent } from 'src/app/shared/components/ag-grid/checkbox-button-renderer/checkbox-button-renderer.component';
export interface downloadOfflineFileInterface extends UserInitiatedData {
  docPGUID: string;
}

export enum actionStatus {
  Approve = 'A',
  Reject = 'N',
  Reset = ''
}
export const disabledColIdOnclick:string[] = ['RejectReason','newUNSPSCCode','newUNSPSCDesc','unspscComments','taskLevelRecords','taskLevelRecords_1']

@Component({
  selector: 'app-for-product-staging-curation',
  templateUrl: './for-product-staging-curation.component.html',
  styleUrls: ['./for-product-staging-curation.component.scss']
})
export class ForProductStagingCurationComponent extends BaseContainer implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;
  isDrawerOpened: boolean = false;
  taskDetails: any = undefined;
  overlayLoading: string = '<span class="ag-overlay-loading-center">Fetching Product...</span>';
  gridApi: GridApi;
  gridOptions: GridOptions = ForStagingCurationWBUI(this.gridRowHeight, this, false);
  updatedRecords: any[] = [];
  taskLoading$: Observable<any> = this.appStore.select(getLoadingState);
  loading$: Observable<boolean> = this.StagingStore.select(GetStagingLoadingState);
  userProfile: any = {};
  rowCount: number = 0;
  isForLabelling: boolean = true;
  private readonly destroyed$ = new Subject<boolean>();
  env:string =' dev';
  fileValidation: UploadFileValidation = {
    loadingState$: this.StagingStore.select(GetStagingLoadingState),
    fileName: `HIDA_Staging_Curation_Product_UNSPSC_For_Offline_Curation_UP_`,
    fileNameShouldHave: `HIDA_Staging_Curation_Product_UNSPSC_For_Offline_Curation_UP_`
  };

  frameworkComponents = {
    unspscCodeRendererComponent: UnspscColumnRendererComponent,
    checkboxSelector: CheckboxButtonRendererComponent
  };
  isEnabledEscalateButton: boolean = false;
  isEnabledSubmitButton: boolean = false;
  constructor(
    private readonly appStore: Store<ApplicationState>,
    private readonly StagingStore: Store<StagingCurationState>,
    private readonly cd: ChangeDetectorRef,
    private dialog: MatDialog,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.getAppRunningEnv();
    this.isForLabelling = this.router.url.toString().includes('/product/staging-curation/for-labelling');
    this.userProfile = BaseContainer.prototype.userProfile;
    this.getTaskDetails();

    this.StagingStore.select(closeSidebarAtStatus)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((time: any) => time)
      )
      .subscribe((r) => {
        this.onSideNavClosed();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    if (this.isInvalidTask()) {
      this.gridApi.showNoRowsOverlay();
    } else {
      this.getProductBrandForConfirmation();
    }
  }

  isInvalidTask() {
    return false;
  }

  resetFilters(): void {
    this.gridApi.setFilterModel(null);
  }

  viewProductsItems(e) {
    if (disabledColIdOnclick.includes(e.column.colId)) {
      return;
    }
    const dialogRef = this.dialog.open(StagingProductItemsViewDialogComponent, {
      width: '100%',
      minHeight: 'auto',
      maxWidth: '96vw',
      position: { top: '30px' },
      disableClose: true,
      data: { productId: e.data.productID }
    });
  }

  downloadCsvOfflineCuration() {
    const dataToPost: downloadOfflineFileInterface = {
      docPGUID: this.userProfile.routeState?.groupName,
      initiatedByUserName: this.userProfile.userName,
      initiatedByUserEmail: this.userProfile.email
    };
    this.StagingStore.dispatch(StagingCurationWorkbenchDownloadFile({ payload: dataToPost }));
  }

  openUploadPanel(): void {
    this.drawer.open();
    this.isDrawerOpened = true;
  }

  onSideNavClosed() {
    this.StagingStore.dispatch(CloseStagingCurationSidebar({ payload: 0 }));
    this.drawer.close();
    this.isDrawerOpened = false;

    this.fileValidation =  {
      loadingState$: this.StagingStore.select(GetStagingLoadingState),
      fileName: `HIDA_Staging_Curation_Product_UNSPSC_For_Offline_Curation_UP_`,
      fileNameShouldHave: `HIDA_Staging_Curation_Product_UNSPSC_For_Offline_Curation_UP_`
    };
  }

  onSubmit(dataToPost: any) {
    this.StagingStore.dispatch(StagingCurationWorkbenchUploadFile({ payload: dataToPost }));
  }

  onCellDoubleClicked(event) {
    if (!this.isForLabelling || this.taskDetails.taskDefinitionId == 'escalation') {
      return false;
    }
    const promptData: any = {
      productDesc: event.data.prodDesc,
      unspscCode: event?.data.newUNSPSCCode ? event?.data.newUNSPSCCode : null
    };
    unMasteredDialogs
      .unspscSelection(promptData, this.dialog)
      .afterClosed()
      .subscribe((data: any) => {
        if (!data) {
          return;
        }
        const rowNode = this.gridApi.getRowNode(event.node.id);
        const dataToUpdate = {
          newUNSPSCCode: data.unspscCode,
          newUNSPSCDesc: this.getUNSPSCTitle(data),
          unspscSource: 'workbench other',
          ...data
        };
        rowNode.setData({
          ...rowNode.data,
          ...dataToUpdate
        });
        this.addToUpdatedRecords(rowNode);
      });
  }

  isUpdatedAllRecords(): boolean {
    return this.rowCount === this.updatedRecords.length;
  }

  saveForLater(): void {
    this.stopGridEditing();
    const dataToPost: StagingCurationSaveForLater = {
      docPGUID: this.userProfile.routeState?.groupName,
      unspscAnalyst: this.userProfile.userName,
      newUNSPSCList: this.getAllRowsSaveForLater(),
      unspscAnalystEmail: this.userProfile.email
    };

    this.StagingStore.dispatch(StagingCurationSaveForLaterWB({ payload: dataToPost }));
  }

  escalateTask() {
    this.stopGridEditing();
    const dataToSave: StagingCurationSaveForLater = {
      docPGUID: this.userProfile.routeState?.groupName,
      unspscAnalyst: this.userProfile.userName,
      newUNSPSCList: this.getAllRowsSaveForLater(),
      unspscAnalystEmail: this.userProfile.email
    };
    const dialogData = { dataToSave, taskDetails: this.taskDetails };
    const dialogRef = this.dialog.open(TaskEscalatedDialogComponent, {
      disableClose: true,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  onTaskSubmit(actionType: string): void {
    this.stopGridEditing();
    const filterRecords = this.getFilterActedRecords();
    if (filterRecords && filterRecords.length > 0) {
      const dataToSave: ConfirmCuratedProduct = {
        workflowID: this.userProfile.routeState?.groupName,
        taskID: this.userProfile.routeState?.taskId,
        taskTitle: this.userProfile.routeState?.taskTitle,
        confirmedBy: this.userProfile.userName,
        confirmedByUserEmail: this.userProfile.email,
        records: filterRecords
      };
     this.StagingStore.dispatch(StagingCurationTaskSubmission({ payload: dataToSave }));
    }
  }


  getProductBrandForConfirmation() {
    this.gridApi.showLoadingOverlay();
    this.StagingStore.dispatch(GetStagingProductsForCuration({ payload: { docPGUID: this.userProfile.routeState?.groupName } }));
    this.StagingStore.select(retrieveProductStagingCuration)
      .pipe(
        filter((data) => data !== null),
        takeUntil(this.destroyed$)
      )
      .subscribe((item: any) => {
        this.rowCount = item.length;
        if (this.rowCount) {
          this.gridApi.setRowData(item);
          this.gridApi.hideOverlay();
        } else {
          this.gridApi.setRowData([]);
          this.gridApi.showNoRowsOverlay();
        }
        this.checkIsAllRecordsUpdate();
        this.cd.markForCheck();
      });
  }

  isEscalatedTask(): boolean {
    return (this.taskDetails && this.taskDetails.status === 'ESCALATED') || this.taskDetails.taskDefinitionId == 'escalation';
  }

  onSelectionAll(status: string) {
    this.stopGridEditing();
    for (let i = this.gridOptions.api.getFirstDisplayedRow(); i <= this.gridOptions.api.getLastDisplayedRow(); i++) {
      const rowNode = this.gridOptions.api.getDisplayedRowAtIndex(i);
      this.isEnabledSubmitButton = actionStatus[status] == 'A' || actionStatus[status] == 'N' ? true : false;
      const rejectReason = (actionStatus[status] === 'N') ? (rowNode.data.rejectReason ? rowNode.data.rejectReason : '') : '';
      rowNode.setData({ ...rowNode.data, ...{ status: actionStatus[status], isModified: this.isEnabledSubmitButton, rejectReason } });
    }
  }

  private checkDetailsForColumnRendering() {
    if ((this.isEscalatedTask() && this.userProfile.isExceptionLead) || !this.isForLabelling) {
      this.gridOptions = ForStagingCurationWBUI(this.gridRowHeight, this, true, 'taskLevelRecords');
    }
  }

  private getAllRows(): any {
    let rowData = [];
    this.gridApi.forEachNode((node) => rowData.push(node.data));
    return rowData;
  }

  private getAllRowsSaveForLater(): Array<ListArray> {
    let rowData: ListArray[] = [];
    this.gridApi.forEachNode((node) => {
      if (node.data.newUNSPSCCode) {
        rowData.push({
          code: node.data.newUNSPSCCode,
          productID: node.data.productID,
          title: node.data.newUNSPSCDesc,
          unspscComments: node.data.unspscComments
        });
      }
    });
    return rowData;
  }
  private getTaskDetails(): void {
    this.appStore
      .select(getTaskDetails)
      .pipe(filter((data) => data !== null))
      .subscribe((taskDetails: any) => {
        this.taskDetails = taskDetails;
        this.checkDetailsForColumnRendering();
        this.cd.detectChanges();
      });
  }

  private getFilterActedRecords() {
    const filterRecords: CuratedRecords[] = this.getAllRows()
      .filter((item: any) => {
        return item.status === 'A' || item.status === 'R' || item.status === 'N';
      })
      .map((item: any) => {
        return { actionPerformed: item.status, productID: item.productID,rejectReason: item.rejectReason ? item.rejectReason :'' };
      });
    return filterRecords;
  }

  private enabledSubmitButton() {
    const filterRecords = this.getFilterActedRecords();
    filterRecords.length > 0 ? (this.isEnabledSubmitButton = true) : (this.isEnabledSubmitButton = false);
    this.cd.detectChanges();
  }

  private stopGridEditing() {
    this.gridApi.stopEditing();
  }

  private updateRejectReason(node) {
    node.setData({ ...node.data, ...{ isModified: true } });
    this.cd.detectChanges();
  }

  
  private getUNSPSCTitle(data) {
    if (data.commodityTitle) return data.commodityTitle;
    if (data.classTitle) return data.classTitle;
    if (data.familyTitle) return data.familyTitle;
    if (data.segmentTitle) return data.segmentTitle;
  }

  private checkIsAllRecordsUpdate(): boolean {
    this.isEnabledEscalateButton = this.getAllRows().filter((item: any) => this.isUnspscCodeExists(item)).length == this.rowCount;
    return this.isEnabledEscalateButton;
  }

  private isUnspscCodeExists(item: any): boolean {
    return item.unspscCode || item.newUNSPSCCode;
  }

  private addToUpdatedRecords(node: any, isDrag: boolean = false) {
    if (!this.isForLabelling || this.taskDetails.taskDefinitionId == 'escalation') {
      return false;
    }

    let dataToUpdate;
    if (isDrag) {
      dataToUpdate = {
        ...node.data,
        newUNSPSCCode: node.data.unspscCode,
        newUNSPSCDesc: this.getUNSPSCTitle(node.data),
        unspscSource: 'workbench other'
      };
    } else {
      dataToUpdate = node.data;
    }
    const index = this.updatedRecords.findIndex((item) => item.itemPguid === node.data.itemPguid);
    if (index >= 0) {
      this.updatedRecords[index] = node.data;
    } else {
      this.updatedRecords.push(node.data);
    }
    this.isEnabledEscalateButton = this.checkIsAllRecordsUpdate();
    this.cd.detectChanges();
    node.setData({ ...dataToUpdate, ...{ isModified: true } });
  }

  private getAppRunningEnv() {
    const base_url = window.location.href;
    if(base_url.includes('-dev.dev')) {
        this.env = 'dev';
    } else if(base_url.includes('-int.int')) {
      this.env = 'int';
    } else if(base_url.includes('-uat.uat')) {
      this.env = 'uat';
    } else if(base_url.includes('-prod.prod')) {
      this.env = 'prod';
    }  else {
      this.env = 'dev';
    }
  console.log('env',this.env)
  }
  
}

export interface downloadOfflineFileInterface extends UserInitiatedData {
  docPGUID: string;
}

