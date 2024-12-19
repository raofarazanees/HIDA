import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AgGridActionCellComponent, AgGridTypeaheadComponent } from '@app-shared-components';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { searchCriteriaInternal } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { FacilityMappedFilterOptions } from '../../../model/manf-master-models/interface/facility-for-map-search-options';
import { InlineInputEditComponent } from '../../ag-grid-components/inline-input-edit/inline-input-edit.component';
import { GetFacilityMappedColumn } from '../../../model/manf-master-models/ag-grid-columns/facility-mapped.utils';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  GetActiveFacilityMasterRecords,
  GetFacilityMappedRecordChangeLog,
  GetFacilityMappedRecords,
  UpdateFacilityMappedRecords,
  createFacilityMapping,
} from '../../../store/actions';
import { facilityMasterState } from '../../../store/reducers';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import {
  FacilityMappedRecord,
  FacilityMappedRecordsRes,
  facilityMasterData,
} from '../../../model/manf-master-models/interface/facility-master-state.interface';
import { getCreatedFacilityForAssign, getFacilityMappedData$ } from '../../../store/selectors';
import { CreateFacilityMasterComponent } from '../facility-master-components/create-facility-master/create-facility-master.component';
import { HistoryLogDialogComponent } from '../../../history-log-dialog/history-log-dialog.component';
import { GetFacilityMappedChangeLogColumn } from '../../../model/manf-master-models/ag-grid-columns/facility-mapped-changelog.utils';
import { ProductSearchCriteria } from './../../../../admin-dashboard/store/reducers/common.reducer';
import { updatedByModel } from 'src/app/model/staging-curation/create-update.interface';
import { autoAppendFor } from '../../../model/manf-master-models/interface/common.interface';

@Component({
  selector: 'app-facility-mastered',
  templateUrl: './facility-mastered.component.html',
  styleUrls: ['./facility-mastered.component.scss']
})
export class FacilityMasteredComponent implements OnInit {
  @Input() userProfile: any;
  @Input() pageSize: any;
  @Input() readOnly: boolean;
  searchCriteriaOptionsData: searchCriteriaInternal[] = FacilityMappedFilterOptions();
  overlayLoadingForGrid: string = '<span class="ag-overlay-loading-center">Fetching Records...</span>';
  gridApi: GridApi | any;
  rowCount: number = 0;
  frameworkComponents = {
    inlineEdit: InlineInputEditComponent,
    actionCellRenderer: AgGridActionCellComponent,
    typeHeadEditor: AgGridTypeaheadComponent
  };
  public readonly destroyed$ = new Subject<boolean>();
  isChangeOnPage: boolean = true;
  gridOptions: GridOptions;
  facilityMasteredRecords: FacilityMappedRecordsRes;
  facilityMasteredRecordsRef: FacilityMappedRecord[];
  isNotingChangeOnPage:boolean = true;

  constructor(public readonly store: Store<facilityMasterState>, private dialogRef: MatDialog, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.gridOptions = GetFacilityMappedColumn(30, this, this.readOnly);
    this.store.dispatch(GetActiveFacilityMasterRecords());
  }

  ngOnDestroy() {
    this.gridApi.destroy();
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('pageSize') && changes['pageSize'].previousValue) {
      this.gridApi.paginationSetPageSize(Number(changes['pageSize'].currentValue));
    } else {
      return true;
    }
  }
  
  searchFacilityMasterRecords(dataToPost: ProductSearchCriteria) {
    this.gridApi.showLoadingOverlay();
    this.store.dispatch(GetFacilityMappedRecords({ payload: dataToPost }));
  }

  onGridReady(params: GridReadyEvent | any): void {
    this.gridApi = params.api;
    this.gridApi.showNoRowsOverlay();
    this.gridApi.paginationSetPageSize(this.pageSize);
    this.gridApi.sizeColumnsToFit();
    this.listenDataChanges();
    this.listenAutoAssignFacility();
  }

  openCreateFacilityDialog(node,text:string ='') {
    let dialogRef = this.dialogRef.open(CreateFacilityMasterComponent, {
      height: '400px',
      width: '500px',
      disableClose: true,
      position: { top: '10px' },
      data: { createdBy: this.userProfile.userName,name:text,appendToId:node.rowIndex + 1,appendFor:'masterFacility'}
    });
  }

  openLogDialog(node) {
    this.store.dispatch(GetFacilityMappedRecordChangeLog({ payload: { facilityMapID: node.data.facMapID } }));
    const logDialogRef = this.dialogRef.open(HistoryLogDialogComponent, {
      height: '100%',
      width: '100vw',
      maxWidth: '98vw',
      position: { top: '10% !important' },
      disableClose: true,
      data: {
        dialogTriggeredFor: 'FacilityMaster',
        title: 'Facility Mastered',
        subTitle: `Facility Map ID: ${node.data.facMapID}`,
        data: node.data,
        agGridOptions: GetFacilityMappedChangeLogColumn(30)
      }
    });
  }
  saveEditedChanges() {
    this.gridApi.stopEditing();
    const editedRecords: facilityDataToUpdate = {
      updatedBy: this.userProfile?.userName,
      mappings: this.getModifiedRecords()
    };
    console.log(editedRecords);
    this.store.dispatch(UpdateFacilityMappedRecords({ payload: editedRecords }));
  }

  private listenDataChanges() {
    this.store
      .select(getFacilityMappedData$)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: FacilityMappedRecordsRes) => {
        if (item != null) {
          this.facilityMasteredRecords = JSON.parse(JSON.stringify(item));
          this.facilityMasteredRecordsRef = JSON.parse(JSON.stringify(this.facilityMasteredRecords.records));
          this.setDataInAgGrid(this.facilityMasteredRecords.records);
          this.getModifiedRecords();
        } else {
          this.setDataInAgGrid([]);
        }
      });
  }

  private setDataInAgGrid(item: FacilityMappedRecord[]) {
    if (item && item.length > 0) {
      this.rowCount = item.length;
      this.gridApi.setRowData(item);
      this.gridApi.hideOverlay();
    } else {
      this.gridApi.setRowData([]);
      this.gridApi.showNoRowsOverlay();
    }
  }

  private OnEditIconsClicked(params) {
    this.gridApi.startEditingCell({
      rowIndex: params.rowIndex,
      colKey: 'facSubgroupName'
    });
  }

  private updateValue(node) {
    const rowNode = this.gridApi.getRowNode(node.id);
    const data = this.facilityMasteredRecordsRef.find((record:FacilityMappedRecord) => record.facMapID === node.data.facMapID);

    if (typeof node.data.facSubgroupName === 'object') {
      node.data.facID = node.data.facSubgroupName.id;
      node.data.facGroupName = node.data.facSubgroupName.facilityGroupName;;
      node.data.facSubgroupName = node.data.facSubgroupName.value;
    }

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

  private getModifiedRecords() {
    const allRows = this.getAllRows();
    const filterRecords: facilityMappedUpdate[] = allRows
    .filter((item: FacilityMappedRecord) => item?.isModified && item.facSubgroupName && item.facID &&  item.mappingComments.trim().length > 0)
    .map((item: FacilityMappedRecord) => {
        return {
          facilitySubgroupName: item.facSubgroupName,
          facilityID: item.facID,
          facilityGroupName: item.facGroupName,
          comments:item.mappingComments,
          facilityMapID:item.facMapID
        };
      });
      
      const data = allRows.filter((item) => item?.isModified);
      this.isNotingChangeOnPage = filterRecords.length > 0 ? data.length !== filterRecords.length : true;
      return filterRecords;
  }

  private getAllRows(): any {
    let rowData = [];
    this.gridApi.forEachNode((node) => rowData.push(node.data));
    return rowData;
  }

  private markAsNotified(event: any) {
    const rowNode = this.gridApi.getRowNode(event.node.id);
    rowNode.setData({ ...rowNode.data, ...{ isNewAdded: false } });
    this.cd.markForCheck();
  }

  private listenAutoAssignFacility() {
    this.store
      .select(getCreatedFacilityForAssign)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: {autoAppendFor:autoAppendFor,data:facilityMasterData}) => {
        if (item != null && item.autoAppendFor.appendFor === 'masterFacility') {
          const {id, appendFor} = item.autoAppendFor;
          const {facilityID,facilityGroupName,facilitySubgroupName} = item.data;
          const rowNode = this.gridApi.getRowNode(Number(id)-1);
          rowNode.setData({
            ...rowNode.data,
            ...{
              facGroupName:facilityGroupName,
              facID:facilityID,
              facSubgroupName:facilitySubgroupName,
              isModified:true
            }
          });
          this.getModifiedRecords();        
        } 
      });
  }

}

export interface facilityDataToUpdate extends updatedByModel {
  mappings:facilityMappedUpdate[]
}

export interface facilityMappedUpdate {
  facilitySubgroupName:string;
  facilityGroupName:string;
  comments:string;
  facilityID:string;
  facilityMapID:string;
}