import { createdByModel, updatedByModel } from './../../../../../model/staging-curation/create-update.interface';
import { ChangeDetectorRef, Component, HostListener, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgGridActionCellComponent, AgGridTypeaheadComponent } from '@app-shared-components';
import { Store } from '@ngrx/store';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { searchCriteriaInternal, ProductSearchCriteria } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';

import {
  FacilityForMappingResponseData,
  facilityMappingRecords,
  facilityMasterData,
} from '../../../model/manf-master-models/interface/facility-master-state.interface';
import { GetActiveFacilityMasterRecords, GetFacilityRecordsForMapping,createFacilityMapping } from '../../../store/actions';
import { facilityMasterState } from '../../../store/reducers';
import { InlineInputEditComponent } from '../../ag-grid-components/inline-input-edit/inline-input-edit.component';
import { CreateFacilityMasterComponent } from '../facility-master-components/create-facility-master/create-facility-master.component';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { getCreatedFacilityForAssign, getRecordsForMappings$ } from '../../../store/selectors';
import { GetFacilityForMapColumnOptions } from '../../../model/manf-master-models/ag-grid-columns/facility-for-mapping.utils';
import { FacilityForMapFilterOptions } from '../../../model/manf-master-models/interface/facility-for-map-search-options';
import { autoAppendFor } from '../../../model/manf-master-models/interface/common.interface';

@Component({
  selector: 'app-for-facility-mapping',
  templateUrl: './for-facility-mapping.component.html',
  styleUrls: ['./for-facility-mapping.component.scss']
})
export class ForFacilityMappingComponent implements OnInit {
  @Input() userProfile: any;
  @Input() pageSize: any;
  @Input() readOnly: boolean;

  searchCriteriaOptionsData: searchCriteriaInternal[] = FacilityForMapFilterOptions();
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
  facilityMasterForMapRes: FacilityForMappingResponseData;
  facilityForMapRef: facilityMappingRecords[] = [];
  isNotingChangeOnPage: boolean = false;
  searchCriteriaReference: ProductSearchCriteria = ProductSearchCriteria.default();

  constructor(public readonly store: Store<facilityMasterState>, private dialogRef: MatDialog, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.gridOptions =  GetFacilityForMapColumnOptions(30, this,this.readOnly)
    this.store.dispatch(GetActiveFacilityMasterRecords());
  }

  searchFacilityMasterRecords(dataToPost: ProductSearchCriteria) {
    this.gridApi.showLoadingOverlay();
    this.searchCriteriaReference = dataToPost;
    this.store.dispatch(GetFacilityRecordsForMapping({ payload: dataToPost }));
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
    this.listenAutoAssignFacility();
  }

  openCreateFacilityDialog(node?,text:string = '') {
    console.log(text);
    let dialogRef = this.dialogRef.open(CreateFacilityMasterComponent, {
      height: '400px',
      width: '500px',
      disableClose: true,
      position: { top: '10px' },
      data: { createdBy: this.userProfile.userName,name:text,appendToId:node.rowIndex + 1,appendFor:'unmasterFacility' }
    });
  }

  saveEditedChanges() {
    this.gridApi.stopEditing();
    const editedRecords: facilityMasterDataToUpdate_ = {
      createdBy: this.userProfile?.userName,
      mappings: this.getModifiedRecords()
    };
     this.store.dispatch(createFacilityMapping({ payload: {dataToCreate:editedRecords,searchPayload:this.searchCriteriaReference} }));
  }

  @HostListener('click', ['$event.target'])
  public onClick(targetElement) {
    if (
      targetElement.className == 'mat-chip-list' ||
      targetElement.className == 'btn-row-container' ||
      targetElement.className == 'ag-paging-panel ag-unselectable' ||
      targetElement.className == 'ag-center-cols-viewport'
    ) {
      this.gridApi.stopEditing();
    }
  }
  private listenDataChanges() {
    this.store
      .select(getRecordsForMappings$)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: FacilityForMappingResponseData) => {
        if (item != null) {
          this.facilityMasterForMapRes = {
            totalRecords: item.totalRecords,
            records: item.records.map((record) => {
              return { ...record, facilitySubGroupName: '', facilityGroupName: '', facilityID: '',comments:'' };
            })
          };
          this.facilityForMapRef = JSON.parse(JSON.stringify(this.facilityMasterForMapRes.records));
          this.setDataInAgGrid(this.facilityMasterForMapRes.records);
          this.getModifiedRecords();
        } else {
          this.setDataInAgGrid([]);
        }
      });
  }
  private setDataInAgGrid(item: facilityMappingRecords[]) {
    if (item && item.length > 0) {
      this.rowCount = item.length;
      this.gridApi.setRowData(item);
      this.gridApi.hideOverlay();
    } else {
      this.gridApi.setRowData([]);
      this.gridApi.showNoRowsOverlay();
    }
  }

  // called from ag grid update value
  private updateValue(node) {

    if (typeof node.data.facilitySubGroupName === 'object') {
      node.data.facilityID = node.data.facilitySubGroupName.id;
      node.data.facilityGroupName = node.data.facilitySubGroupName.facilityGroupName;;
      node.data.facilitySubGroupName = node.data.facilitySubGroupName.value;
    }

    this.gridApi.stopEditing();
    const rowNode = this.gridApi.getRowNode(node.id);
    delete node.data['isModified'];
    delete node.data['isNewAdded'];

    const data = this.facilityForMapRef.find((record) => record.facilityPGUID === node.data.facilityPGUID);

    Object.keys(node.data).map((k) => (node.data[k] = typeof node.data[k] == 'string' ? node.data[k].trim() : node.data[k]));
    const { isNewAdded, ...refDataObject } = data;
    const isValueChanged = JSON.stringify(refDataObject) === JSON.stringify(node.data);
    rowNode.setData({ ...node.data, ...{ isModified: !isValueChanged } });
    this.cd.markForCheck();
    this.getModifiedRecords();
  }

  private getModifiedRecords() {
    const filterRecords: facilityMapUpdateRecords[] = this.getAllRows()
    .filter((item: facilityMappingRecords) => item?.isModified && item.facilitySubGroupName && item.facilityID)
    .map((item: facilityMappingRecords) => {
        return {
          facilityGroupName: item.facilityGroupName,
          facilityID: item.facilityID,
          facilitySubgroupName: item.facilitySubGroupName,
          facilityPGUID: item.facilityPGUID,
          comments:item.comments,
          distributorPGUID:item.facilityDistPGUID
        };
      });
    
    this.isNotingChangeOnPage =  (filterRecords. length > 0) ? false : true;
    return filterRecords;
  }

  private getAllRows(): any {
    let rowData = [];
    this.gridApi.forEachNode((node) => rowData.push(node.data));
    return rowData;
  }

  private listenAutoAssignFacility() {
    this.store
      .select(getCreatedFacilityForAssign)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: {autoAppendFor:autoAppendFor,data:facilityMasterData}) => {
        if (item != null && item.autoAppendFor.appendFor === 'unmasterFacility') {
          const {id, appendFor} = item.autoAppendFor;
          const {facilityID,facilityGroupName,facilitySubgroupName} = item.data;
          const rowNode = this.gridApi.getRowNode(Number(id)-1);
          rowNode.setData({
            ...rowNode.data,
            ...{
              facilityGroupName:facilityGroupName,
              facilityID:facilityID,
              facilitySubGroupName:facilitySubgroupName,
              isModified:true
            }
          });
          this.getModifiedRecords();        
        } 
      });
  }
}

export interface facilityMasterDataToUpdate_ extends createdByModel {
  mappings: facilityMapUpdateRecords[];
}
export interface facilityMapUpdateRecords {
  facilityGroupName: string;
  facilityID: string;
  facilitySubgroupName: string;
  facilityPGUID: string;
  comments:string;
  distributorPGUID:string
}
