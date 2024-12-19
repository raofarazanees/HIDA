import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApplicationState, getUserProfile } from './../../../../../store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonActionsEnum, UpdateMasteredRecord } from '../../../store/actions';
import { ItemMasterState } from '../../../store/reducers';
import { getUpdateMasteredRecordLoader } from '../../../store/selectors';
import { UNSPSCSource } from '../../../modal/ag-grid.constants';
import { UnspscSelectionComponent } from '../../unspsc-selection/unspsc-selection.component';

@Component({
  selector: 'app-edit-item-master',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  commentCtrl = new FormControl('');
  ambiguityFlag = new FormControl('');
  isEnabledSubmitButton = false;
  tooltip: string;
  loader$: Observable<boolean> = this.store.select(getUpdateMasteredRecordLoader);
  dsParams: any;
  reParams: any;
  reclassifyParams: any;
  ccParams: any;
  manualParams: any;
  unspscAttributes: any = {
    ids: [],
    list: []
  };
  private userName: string;
  private preFormValues: string;
  private readonly destroyed$ = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditComponent>,
    protected actions$: Actions,
    public matDialog: MatDialog,
    private readonly appStore: Store<ApplicationState>,
    private readonly store: Store<ItemMasterState>
  ) {}

  ngOnInit() {
    this.setUNSPSCSource();
    this.ambiguityFlag.setValue(this.data.ambiguityFlag);
    this.commentCtrl.setValue(this.data.comments);
    this.preFormValues = JSON.stringify({
      uc: this.data.masteredUnspscCode,
      af: this.data.ambiguityFlag,
      c: this.data.comments,
      ae: this.data.unspscAttributes || []
    });
    this.listenDataChanges();
    this.subscribeModalChange();
    this.undateTooltipString();
    this.updateUnspscParams();
    this.prepareUnspsActtributeIds(this.data.attributeExtensions[1]);
    this.prepareUnspsActtributeList(this.data.unspscAttributes);
  }

  update() {
    this.store.dispatch(new UpdateMasteredRecord(this.getPayload()));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  openUnspscSelectionModel(): void {
    this.matDialog
      .open(UnspscSelectionComponent, {
        width: '80%',
        data: {
          productDesc: this.data.productDesc,
          unspscCode: this.data.unspscCode
        }
      })
      .afterClosed()
      .subscribe((data: any) => {
        if (!data) {
          return;
        }
        this.data = {
          ...this.data,
          internalItemKey: data.internalItemKey,
          masteredUnspscCode: data.unspscCode,
          segmentCode: data.segmentCode,
          segmentTitle: data.segmentTitle,
          familyCode: data.familyCode,
          familyTitle: data.familyTitle,
          classCode: data.classCode,
          classTitle: data.classTitle,
          commodityCode: data.commodityCode,
          commodityTitle: data.commodityTitle,
          unspscSource: UNSPSCSource.M,
          ambiguityFlag: 'Confirmed'
        };
        this.ambiguityFlag.setValue(this.data.ambiguityFlag);
        this.undateTooltipString();
        this.updateUnspscParams();
        this.validateSubmitButton();
      });
  }

  get isPredictedTask(): boolean {
    return this.data.dsUnspscId || this.data.reUnspscId || this.data.reclassifySuggestedUNSPSC;
  }

  onAttributeSelection(id: string): void {
    if (this.unspscAttributes.ids?.includes(id)) {
      this.unspscAttributes.ids = this.unspscAttributes.ids.filter((item: any) => item !== id);
    } else {
      this.unspscAttributes.ids.unshift(id);
    }
    this.prepareUnspsActtributeList(this.unspscAttributes.ids);
    this.validateSubmitButton();
  }

  isActiveGroup(ids: any): boolean {
    return this.unspscAttributes.ids?.some((id: any) => Object.keys(ids).includes(id));
  }

  private prepareUnspsActtributeIds(attributeList: any): void {
    this.unspscAttributes.ids = [];
    (this.data.unspscAttributes || []).forEach((id: string) => {
      const item = attributeList[id];
      item && this.unspscAttributes.ids.push(id);
    });
  }

  private prepareUnspsActtributeList(ids: any = [], attributeList: any = this.data.attributeExtensions[1]): void {
    this.unspscAttributes.list = [];
    ids.forEach((id: string) => {
      const item = attributeList[id];
      item &&
        this.unspscAttributes.list.push({
          attributeGroup: item.attributeGroup,
          attributeValue: item.attributeValue
        });
    });
  }

  private setUNSPSCSource(): void {
    if (this.data.masteredUnspscCode === this.data.dsUnspscId) {
      this.data = { ...this.data, ...this.clearManualUnspsc(), unspscSource: UNSPSCSource.DS };
    } else if (this.data.masteredUnspscCode === this.data.reUnspscId) {
      this.data = { ...this.data, ...this.clearManualUnspsc(), unspscSource: UNSPSCSource.RE };
    } else if (this.data.masteredUnspscCode === this.data.reclassifySuggestedUNSPSC) {
      this.data = { ...this.data, ...this.clearManualUnspsc(), unspscSource: UNSPSCSource.RC };
    } else if (this.data.masteredUnspscCode === this.data.unspscForCC) {
      this.data = { ...this.data, ...this.clearManualUnspsc(), unspscSource: UNSPSCSource.CC };
    } else {
      this.data = { ...this.data, unspscSource: UNSPSCSource.M };
    }
  }

  private clearManualUnspsc(): any {
    return {
      masteredUnspscCode: '',
      segmentCode: '',
      segmentTitle: '',
      familyCode: '',
      familyTitle: '',
      classCode: '',
      classTitle: '',
      commodityCode: '',
      commodityTitle: '',
      internalItemKey: ''
    };
  }
  private validateSubmitButton(): void {
    this.isEnabledSubmitButton =
      this.preFormValues !==
      JSON.stringify({
        uc: this.data.masteredUnspscCode,
        af: this.data.ambiguityFlag,
        c: this.data.comments,
        ae: this.unspscAttributes.ids
      });
  }

  private listenDataChanges(): void {
    this.appStore
      .select(getUserProfile)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((userInfo: any) => {
        this.userName = `${userInfo.lastName}, ${userInfo.firstName}`;
      });

    this.actions$.pipe(takeUntil(this.destroyed$), ofType(CommonActionsEnum.UPDATE_MASTERED_RECORD_SUCCESS)).subscribe(() => {
      this.dialogRef.close({ ...this.data, ...this.getUnspscPropertiesForDsReRC(this.data), unspscAttributes: this.unspscAttributes.ids });
    });
  }

  private undateTooltipString(): void {
    this.tooltip = `${this.data.segmentTitle ? this.data.segmentTitle : ''}
    ${this.data.familyTitle ? ' | ' + this.data.familyTitle : ''}
    ${this.data.classTitle ? ' | ' + this.data.classTitle : ''}
    ${this.data.commodityTitle ? ' | ' + this.data.commodityTitle : ''}`;
  }

  private subscribeModalChange() {
    this.ambiguityFlag.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((value: string) => {
      this.data.ambiguityFlag = value;
      this.validateSubmitButton();
    });
    this.commentCtrl.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((value: string) => {
      this.data.comments = value;
      this.validateSubmitButton();
    });
  }

  private getUnspscPropertiesForDsReRC(data: any): any {
    const unspscDetails: any = this.getUnspscDetailsForDsReRC(data);
    if (unspscDetails) {
      let unspscHierarchy: any;
      try {
        unspscHierarchy = JSON.parse(unspscDetails.hierarchy) || {};
      } catch (error) {
        return {};
      }
      return {
        masteredUnspscCode: unspscDetails.code,
        segmentCode: unspscHierarchy.segmentCode,
        segmentTitle: unspscHierarchy.segmentTitle,
        familyCode: unspscHierarchy.familyCode,
        familyTitle: unspscHierarchy.familyTitle,
        classCode: unspscHierarchy.classCode,
        classTitle: unspscHierarchy.classTitle,
        commodityCode: unspscHierarchy.commodityCode,
        commodityTitle: unspscHierarchy.commodityTitle,
        internalItemKey: unspscHierarchy.ontologyItemPguid
      };
    }
    return {};
  }

  private getUnspscDetailsForDsReRC(data: any): object | undefined {
    if (data.unspscSource === UNSPSCSource.DS) {
      return {
        code: data.dsUnspscId,
        hierarchy: data.dsUnspscHierarchy
      };
    }
    if (data.unspscSource === UNSPSCSource.RE) {
      return {
        code: data.reUnspscId,
        hierarchy: data.reUnspscHierarchy
      };
    }
    if (data.unspscSource === UNSPSCSource.RC) {
      return {
        code: data.reclassifySuggestedUNSPSC,
        hierarchy: data.reclassifySuggestedUNSPSCHierarchy
      };
    }
    if (data.unspscSource === UNSPSCSource.CC) {
      return {
        code: data.unspscForCC,
        hierarchy: data.unspscHierarchyForCC
      };
    }
    return undefined;
  }

  private getPayload(): any {
    this.data = {
      ...this.data,
      unspscSource: UNSPSCSource.WM,
      resourceName: this.userName,
      unspscAttributes: JSON.stringify(this.unspscAttributes.ids),
      ...this.getUnspscPropertiesForDsReRC(this.data)
    };
    return this.data;
  }

  private updateUnspscParams(): void {
    this.dsParams = {
      details: 'dsUnspscHierarchy',
      label: 'Data Science',
      score: this.data.dsConfidenceScore,
      selectionValue: UNSPSCSource.DS,
      value: this.data.dsUnspscId,
      data: this.data,
      onSelection: (rowNode: any) => {
        this.data.unspscSource = rowNode.unspscSource;
        this.isEnabledSubmitButton = true;
      }
    };
    this.reParams = {
      details: 'reUnspscHierarchy',
      label: 'Rules Engine',
      selectionValue: UNSPSCSource.RE,
      value: this.data.reUnspscId,
      data: this.data,
      onSelection: (rowNode: any) => {
        this.data.unspscSource = rowNode.unspscSource;
        this.isEnabledSubmitButton = true;
      }
    };
    this.reclassifyParams = {
      details: 'reclassifySuggestedUNSPSCHierarchy',
      label: 'Reclassify Suggested',
      selectionValue: UNSPSCSource.RC,
      value: this.data.reclassifySuggestedUNSPSC,
      data: this.data,
      onSelection: (rowNode: any) => {
        this.data.unspscSource = rowNode.unspscSource;
        this.isEnabledSubmitButton = true;
      }
    };
    this.ccParams = {
      details: 'unspscHierarchyForCC',
      label: 'Client Corrected',
      selectionValue: UNSPSCSource.CC,
      value: this.data.unspscForCC,
      data: this.data,
      onSelection: (rowNode: any) => {
        this.data.unspscSource = rowNode.unspscSource;
        this.isEnabledSubmitButton = true;
      }
    };
    this.manualParams = {
      details: 'manual',
      label: 'Manual',
      selectionValue: UNSPSCSource.M,
      value: this.data.masteredUnspscCode,
      data: this.data,
      onSelection: (rowNode: any) => {
        this.data.unspscSource = rowNode.unspscSource;
        this.isEnabledSubmitButton = true;
      },
      onDoubleClicked: () => {
        this.openUnspscSelectionModel();
      }
    };
  }
}
