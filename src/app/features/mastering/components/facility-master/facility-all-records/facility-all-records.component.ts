import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgGridActionCellComponent, AgGridTypeaheadComponent } from '@app-shared-components';
import { Store } from '@ngrx/store';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { ProductSearchCriteria, searchCriteriaInternal } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { FacilityMappedFilterOptions, FacilityMappedFilterOptionsAllTab } from '../../../model/manf-master-models/interface/facility-for-map-search-options';
import { FacilityMappedRecordsRes, FacilityMappedRecord, facilityMasterData } from '../../../model/manf-master-models/interface/facility-master-state.interface';
import { facilityMasterState } from '../../../store/reducers';
import { InlineInputEditComponent } from '../../ag-grid-components/inline-input-edit/inline-input-edit.component';
import { GetActiveFacilityMasterRecords, GetAllFacRecords, GetFacilityMappedRecordChangeLog, GetFacilityMappedRecords, ManageMappingAllRecords, ManageMappingFacAllRecords } from '../../../store/actions';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { GetUpdateFacRecords$, getAllFacRecords$, getCreatedFacilityForAssign } from '../../../store/selectors';
import { GetFacilityMappedColumn } from '../../../model/manf-master-models/ag-grid-columns/facility-mapped.utils';
import { HistoryLogDialogComponent } from '../../../history-log-dialog/history-log-dialog.component';
import { GetFacilityMappedChangeLogColumn } from '../../../model/manf-master-models/ag-grid-columns/facility-mapped-changelog.utils';
import { CreateFacilityMasterComponent } from '../facility-master-components/create-facility-master/create-facility-master.component';
import { autoAppendFor } from '../../../model/manf-master-models/interface/common.interface';

@Component({
  selector: 'app-facility-all-records',
  templateUrl: './facility-all-records.component.html',
  styleUrls: ['./facility-all-records.component.scss']
})
export class FacilityAllRecordsComponent implements OnInit {

  @Input() userProfile: any;
  @Input() pageSize: any;
  @Input() readOnly: boolean;
  searchCriteriaOptionsData: searchCriteriaInternal[] = FacilityMappedFilterOptionsAllTab();
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
    this.gridOptions = GetFacilityMappedColumn(30, this, this.readOnly,true);
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
      return false
    }
  }
  
  searchFacilityMasterRecords(dataToPost: ProductSearchCriteria) {
    this.gridApi.showLoadingOverlay();
    this.store.dispatch(GetAllFacRecords({ payload: dataToPost }));
  }

  onGridReady(params: GridReadyEvent | any): void {
    this.gridApi = params.api;
    this.gridApi.showNoRowsOverlay();
    this.gridApi.paginationSetPageSize(this.pageSize);
    this.checkDeviceWithAndFitColumn(this.gridApi);
    this.listenDataChanges();
    this.listenUpdateFacRecords();
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
  

  saveEditedChanges() {
    this.gridApi.stopEditing();
    const editedChanges: any = {
      updatedBy: this.userProfile.userName,
      mappings: this.getModifiedRecords()
    };
   this.store.dispatch(ManageMappingFacAllRecords({payload:editedChanges}));
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

  private checkDeviceWithAndFitColumn(grid) {
    if (grid.columnModel.bodyWidth < window.innerWidth - 60) {
      this.gridApi.sizeColumnsToFit();
    }
  }

  private listenDataChanges() {
    this.store
      .select(getAllFacRecords$)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$),filter(item => item != null))
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
    const filterRecords: any[] = allRows
    .filter((item: FacilityMappedRecord) => item?.isModified && item.facSubgroupName && item.facID &&  this.checkForMappingComments(item.facMapID,item.mappingComments))
    .map((item: any) => {
        return {
          facilitySubgroupName: item.facSubgroupName,
          facilityID: item.facID,
          facilityGroupName: item.facGroupName,
          comments:item.mappingComments,
          facilityTypeMapID:item.facMapID,
          distributorPGUID: item.distrPGUID,
          facilityPGUID: item.facPGUID,
          rowIndexUI:item.rowIndexUI
        };
      });
      
      const data = allRows.filter((item) => item?.isModified);
      this.isNotingChangeOnPage = filterRecords.length > 0 ? data.length !== filterRecords.length : true;
      return filterRecords;
  }

  private getAllRows(): any {
    let rowData = [];
    this.gridApi.forEachNode((node) => rowData.push({...node.data,rowIndexUI:node.rowIndex}));
    return rowData;
  }

  private markAsNotified(event: any) {
    const rowNode = this.gridApi.getRowNode(event.node.id);
    rowNode.setData({ ...rowNode.data, ...{ isNewAdded: false } });
    this.cd.markForCheck();
  }

  private checkForMappingComments(mapId:number,comments:string):boolean {
    if(mapId && !comments) {
      return false;
    }    
    return true;
  }

  private listenUpdateFacRecords() {
    this.store
    .select(GetUpdateFacRecords$)
    .pipe(distinctUntilChanged(), takeUntil(this.destroyed$),filter(data => data!= null))
    .subscribe((item: FacilityMappedRecord[]) => {
      
      const allModifiedRows = this.getModifiedRecords();
      allModifiedRows.forEach(element => {
        const updatedRow = item.filter(row => row.facPGUID === element.facilityPGUID)[0];
        const rowNode = this.gridApi.getRowNode(element.rowIndexUI);
        rowNode.setData({ ...updatedRow,isNewAdded: true });
      });

      this.getModifiedRecords()     
    });

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
