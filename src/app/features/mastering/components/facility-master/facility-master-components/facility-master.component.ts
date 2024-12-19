import { ChangeDetectorRef, Component, HostListener, Input, OnInit, SimpleChanges } from '@angular/core';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { InlineInputEditComponent } from '../../ag-grid-components/inline-input-edit/inline-input-edit.component';
import { GetFacilityColumnOptions, GetFacilityColumnOptionsChangeLog } from '../../../model/manf-master-models/ag-grid-columns/facility-master-tab.utils';
import { ProductSearchCriteria, searchCriteriaInternal } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { FacilityMasterFilterOptions } from '../../../model/manf-master-models/interface/facility-master-filter-options';
import { AgGridActionCellComponent } from '@app-shared-components';
import { GetActiveFacilityMasterRecords, GetFacilityMasterRecords, GetFacilityRecordChangeLog, UpdateFacilityMasterRecords } from '../../../store/actions';
import { facilityMasterState } from '../../../store/reducers';
import { getFacilityMasterData$ } from '../../../store/selectors';
import {
  FacilityMasterResponseData,
  facilityMasterData
} from '../../../model/manf-master-models/interface/facility-master-state.interface';
import { MatDialog } from '@angular/material/dialog';
import { CreateFacilityMasterComponent } from './create-facility-master/create-facility-master.component';
import { updatedByModel } from 'src/app/model/staging-curation/create-update.interface';
import { HistoryLogDialogComponent } from '../../../history-log-dialog/history-log-dialog.component';

@Component({
  selector: 'app-facility-master',
  templateUrl: './facility-master.component.html',
  styleUrls: ['./facility-master.component.scss']
})
export class FacilityMasterComponent implements OnInit {
  @Input() userProfile: any;
  @Input() pageSize: any;
  @Input() readOnly: boolean;

  searchCriteriaOptionsData: searchCriteriaInternal[] = FacilityMasterFilterOptions();
  overlayLoadingForGrid: string = '<span class="ag-overlay-loading-center">Fetching Records...</span>';
  gridApi: GridApi | any;
  rowCount: number = 0;
  frameworkComponents = {
    inlineEdit: InlineInputEditComponent,
    actionCellRenderer: AgGridActionCellComponent
  };
  public readonly destroyed$ = new Subject<boolean>();
  isChangeOnPage: boolean = true;
  gridOptions: GridOptions;
  facilityMasterDataRes: FacilityMasterResponseData;
  facilityMasterDataRef: facilityMasterData[] = [];
  isNotingChangeOnPage:boolean = false;

  constructor(public readonly store: Store<facilityMasterState>,private dialogRef: MatDialog,private cd:ChangeDetectorRef) {}

  ngOnInit() {  
    this.gridOptions = GetFacilityColumnOptions(30, this,this.readOnly);
  }

  searchFacilityMasterRecords(dataToPost: ProductSearchCriteria) {
    this.gridApi.showLoadingOverlay();
    this.store.dispatch(GetFacilityMasterRecords({ payload: dataToPost }));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('pageSize') && changes['pageSize'].previousValue) {
      this.gridApi.paginationSetPageSize(Number(changes['pageSize'].currentValue));
    } else {
      return true;
    }
  }
  ngOnDestroy() {
    this.gridApi.destroy();
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onGridReady(params: GridReadyEvent | any): void {
    this.gridApi = params.api;
    this.gridApi.showNoRowsOverlay();
    this.gridApi.paginationSetPageSize(this.pageSize);
    this.gridApi.sizeColumnsToFit();
    this.listenDataChanges();
  }

  
  openCreateFacilityDialog() {
    let dialogRef = this.dialogRef.open(CreateFacilityMasterComponent, {
      height: '400px',
      width: '500px',
      disableClose: true,
      position: { top: '10px' },
      data: { createdBy: this.userProfile.userName }
    });
  }

  saveEditedChanges() {
    this.gridApi.stopEditing();
    const editedRecords: facilityMasterDataToUpdate = {
      updatedBy: this.userProfile?.userName,
      records: this.getModifiedRecords()
    }; 
   this.store.dispatch(UpdateFacilityMasterRecords({ payload: editedRecords }));
  }
  
  openLogDialog(node) {
    this.store.dispatch(GetFacilityRecordChangeLog({ payload: { facilityID: node.data.facilityID } }));
    const logDialogRef = this.dialogRef.open(HistoryLogDialogComponent, {
      height: '100%',
      width: '100vw',
      maxWidth: '98vw',
      position: { top: '10% !important' },
      disableClose: true,
      data: {
        dialogTriggeredFor: 'FacilityMaster',
        title: 'Facility Master',
        subTitle: `Facility ID: ${node.data.facilityID}`,
        data: node.data,
        agGridOptions: GetFacilityColumnOptionsChangeLog(30)
      }
    });
  }

  @HostListener('click', ['$event.target']) 
  public onClick(targetElement) {
    if(targetElement.className == 'mat-chip-list' || targetElement.className == 'btn-row-container' || targetElement.className == 'ag-paging-panel ag-unselectable' || targetElement.className == 'ag-center-cols-viewport') {
      this.gridApi.stopEditing();
    }
  }
  private listenDataChanges() {
    this.store
      .select(getFacilityMasterData$)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: FacilityMasterResponseData) => {
        if (item != null) {
          this.facilityMasterDataRes = JSON.parse(JSON.stringify(item));
          this.setDataInAgGrid(this.facilityMasterDataRes.records);
          this.facilityMasterDataRef = item.records;
          this.getModifiedRecords();
        } else {
          this.setDataInAgGrid([]);
        }
      });
  }

  private setDataInAgGrid(item: facilityMasterData[]) {
    if (item && item.length > 0) {
      this.rowCount = item.length;
      this.gridApi.setRowData(item);
      this.gridApi.hideOverlay();
    } else {
      this.gridApi.setRowData([]);
      this.gridApi.showNoRowsOverlay();
    }
  }

   //called from ag-grid
   private markAsNotified(event: any) {
    const rowNode = this.gridApi.getRowNode(event.node.id);
    rowNode.setData({ ...rowNode.data, ...{ isNewAdded: false } });
    this.cd.markForCheck();
  }

  
  private OnEditIconsClicked(params) {
    this.gridApi.startEditingCell({
      rowIndex: params.rowIndex,
      colKey: 'facilityGroupName'
    });
  }

  private updateValue(node) {
    const rowNode = this.gridApi.getRowNode(node.id);
    const data = this.facilityMasterDataRef.find((record:facilityMasterData) => record.facilityID === node.data.facilityID);
    delete node.data['isModified'];
    delete node.data['isNewAdded'];
    const { isNewAdded, ...refDataObject } = data;
    Object.keys(node.data).map((k) => (node.data[k] = typeof node.data[k] == 'string' ? node.data[k].trim() : node.data[k]));
    const isValueChanged = JSON.stringify(refDataObject) === JSON.stringify(node.data);
    rowNode.setData({ ...node.data, ...{ isModified: !isValueChanged } });
    this.gridApi.stopEditing();
    this.cd.markForCheck();
   this.getModifiedRecords();
  }

  private getAllRows(): any {
    let rowData = [];
    this.gridApi.forEachNode((node) => rowData.push(node.data));
    return rowData;
  }
  
  private getModifiedRecords() {
    const allRows =  this.getAllRows();
    const filterRecords = allRows
      .filter((item: facilityMasterData) => item?.isModified && item.facilityGroupName && item.facilitySubgroupName)
      .map(({ active, facilityGroupName, facilityID, facilitySubgroupName }: facilityMasterData) => ({
        active,
        facilityGroupName,
        facilityID,
        facilitySubgroupName
      }));
  
    const data = allRows.filter((item) => item?.isModified && item?.isModified === true);
    this.isNotingChangeOnPage = filterRecords.length > 0 ? !(data.length === filterRecords.length) : true;
  
    return filterRecords;
  }
  

}

export interface facilityMasterDataToUpdate  extends updatedByModel{
records:facilityMasterUpdateRecords[]
}
export interface facilityMasterUpdateRecords {
  active?: string;
  facilityGroupName: string;
  facilityID: string;
  facilitySubgroupName: string
}