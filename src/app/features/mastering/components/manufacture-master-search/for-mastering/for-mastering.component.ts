import { ChangeDetectorRef, Component, HostListener, Input, OnInit, SimpleChanges } from '@angular/core';
import { manfMasterState } from '../../../store/reducers';
import { Store } from '@ngrx/store';
import { GetAllActiveChildManf, GetChildParentManfRecordsSuccess, createManufacturerMapping, getManfForMapping, getManfForMappingSuccess, getParentChildManfRecords } from '../../../store/actions';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import {
  ParentManfResponseData,
  UnMasteredDataResponse,
  UnMasteredRecords,
  parentChildTopMapping,
  parentManfData
} from '../../../model/manf-master-models/interface/manf-master.interface';
import { activeChildMaf } from '../../../model/manf-master-models/interface/child-parent-manf.interface';
import { Subject } from 'rxjs';
import { GetAllActiveChildManfRecords, GetAllActiveParentManf, GetAllManfForMapping, GetParentChildTopMap } from '../../../store/selectors';
import { searchCriteriaInternal } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { ParentManfSearchOptions } from '../../../model/manf-master-models/interface/parent-manf-search-options';
import { ManfUnmasteredSearchOptions } from '../../../model/manf-master-models/interface/manf-unmastered-search-options';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { GetUmMasteredColumn } from '../../../model/manf-master-models/ag-grid-columns/umastered-column-constants';
import { AgGridTypeaheadComponent, AgGridActionCellComponent } from '@app-shared-components';
import { InlineInputEditComponent } from '../../ag-grid-components/inline-input-edit/inline-input-edit.component';
import { CreateChildManfMasterComponent } from '../create-child-manf-master/create-child-manf-master.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-for-mastering',
  templateUrl: './for-mastering.component.html',
  styleUrls: ['../parent-manf-master/parent-manf-master.component.scss']
})
export class ForMasteringComponent implements OnInit {
  @Input() userProfile: any;
  @Input() pageSize: number = 20;
  @Input() readOnly:boolean;


  parentManfData: any;
  searchCriteriaOptionsData: searchCriteriaInternal[] = ManfUnmasteredSearchOptions();
  overlayLoadingForAgGrid: string = '<span class="ag-overlay-loading-center">Fetching Records...</span>';
  gridApi: GridApi | any;
  rowCount: number = 0;
  gridOptions: GridOptions;
  isChangeOnPage: boolean = true;
  pagination: number = 0;
  public readonly destroyed$ = new Subject<boolean>();
  forMappingData: UnMasteredDataResponse;
  forMappingDataRef: UnMasteredRecords[] = [];
  searchCriteriaReference:any;
  topParentRecords:parentChildTopMapping[];
  activeParentRecords: activeChildMaf[] = [];

  frameworkComponents = {
    inlineEdit: InlineInputEditComponent,
    typeHeadEditor: AgGridTypeaheadComponent,
    actionCellRenderer: AgGridActionCellComponent
  };

  constructor(private readonly store: Store<manfMasterState>, private dialogRef: MatDialog, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.gridOptions = GetUmMasteredColumn(30, this,this.readOnly)
    this.store.dispatch(GetAllActiveChildManf());
    this.store.dispatch(getParentChildManfRecords());
    this.listenActiveParentManfRecords()
    this.listenParentChildTopMapping();

  }

  ngOnDestroy(): void {
    this.gridApi.destroy();
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('pageSize') && changes['pageSize'].previousValue) {
      this.gridApi.paginationSetPageSize(Number(changes['pageSize'].currentValue));
    }
  }

  listenActiveParentManfRecords() {
    this.store
      .select(GetAllActiveChildManfRecords)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((data: any) => data != null)
      )
      .subscribe((r: activeChildMaf[]) => {
        if(r && (this.activeParentRecords.length != r.length)) {
          this.forMappingData = {totalRecords:this.forMappingData?.totalRecords || 0, records: this.forMappingData ? this.getAllRows() : []};
         if(this.forMappingData.records.length > 0) this.store.dispatch(getManfForMappingSuccess({payload: this.forMappingData}));
        }
        this.activeParentRecords = r;
      });
  }
  

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridApi.showNoRowsOverlay();
    this.gridApi.paginationSetPageSize(this.pageSize);
    this.checkDeviceWithAndFitColumn(this.gridApi);
    this.listenForMappingData();
  }

  checkDeviceWithAndFitColumn(grid) {
    if (grid.columnModel.bodyWidth < window.innerWidth - 60) {
      this.gridApi.sizeColumnsToFit();
    }
  }

  searchParentManfRecords(e) {
    this.gridApi.showLoadingOverlay();
    this.searchCriteriaReference = e;
    this.store.dispatch(getManfForMapping({ payload: e }));
  }

  saveEditedChanges() {
    this.gridApi.stopEditing();
    const editedChanges: mapDataToPost = {
      createdBy: this.userProfile.userName,
      mappings: this.getModifiedRecords()
    };
    this.store.dispatch(createManufacturerMapping({payload:{dataToPost: editedChanges,searchCriteriaData:this.searchCriteriaReference}}));
  }

  @HostListener('click', ['$event.target']) 
  public onClick(targetElement) {
    if(targetElement.className == 'mat-chip-list' || targetElement.className == 'btn-row-container' || targetElement.className == 'ag-paging-panel ag-unselectable' || targetElement.className == 'ag-center-cols-viewport') {
      this.gridApi.stopEditing();
    }
  }

  
  private updateValue(node) {


    if (typeof node.data.manufacturer_mapping === 'object') {
      node.data.manfID = node.data.manufacturer_mapping.id;
      node.data.manfName = node.data.manufacturer_mapping.value;
      node.data.manufacturer_mapping = node.data.manufacturer_mapping.value;
      const topParent = this.topParentRecords.find((record) => record.childManfID === node.data.manfID);
      node.data.parentManfID = topParent.parentManfID;
      node.data.topParentManfID = topParent.topParentManfID;
      node.data.topParentManfName = topParent.topParentManfName;
      node.data.parentManfName = topParent.parentManfName;
      node.data.childDisplayName = topParent.childDisplayName;
      node.data.topDisplayName = topParent.topParentDisplayName;
      node.data.parentDisplayName = topParent.parentDisplayName;
    }

    this.gridApi.stopEditing();
    const rowNode = this.gridApi.getRowNode(node.id);
    delete node.data['isModified'];
    delete node.data['isNewAdded'];

    const data = this.forMappingDataRef.find((record) => record.manfPGUID === node.data.manfPGUID);

    Object.keys(node.data).map((k) => (node.data[k] = typeof node.data[k] == 'string' ? node.data[k].trim() : node.data[k]));

    const { isNewAdded, ...refDataObject } = data;
    const isValueChanged = JSON.stringify(refDataObject) === JSON.stringify(node.data);


    rowNode.setData({ ...node.data, ...{ isModified: !isValueChanged } });
    this.cd.markForCheck();
    this.getModifiedRecords();
  }

  private getModifiedRecords() {
    const filterRecords: manufacturerMapModel[] = this.getAllRows()
      .filter((item: UnMasteredRecords) => {
        if (item?.isModified && item?.isModified === true && item.manfID) {
          return item;
        }
      })
      .map((item: UnMasteredRecords) => {
        return {
          manufacturerPGUID: item.manfPGUID,
          distributorPGUID: item.distPGUID,
          manfID: item.manfID,
          manfName: item.manfName,
          comments: item.comments
        };
      });
    this.isChangeOnPage = !filterRecords.length;
    return filterRecords;
  }

  private getAllRows(): any {
    let rowData = [];
    this.gridApi.forEachNode((node) => rowData.push(node.data));
    return rowData;
  }

  private openParentChildDialog(node,text?:string) {
    this.dialogRef.open(CreateChildManfMasterComponent, {
      height: '400px',
      width: '500px',
      disableClose: true,
      position: { top: '10px' },
      data: { createdBy: this.userProfile.userName,value:text,appendToId:node.data.manfPGUID,appendFor:'unmasteredManf'}
    });
  }

  private listenForMappingData() {
    this.store
      .select(GetAllManfForMapping)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: UnMasteredDataResponse | any) => {
        if (item) {
          this.forMappingData = {
            totalRecords: item.totalRecords,
            records: item.records.map((record) => {
              return { ...record, manufacturer_mapping: record?.manufacturer_mapping || '', childDisplayName: record.childDisplayName || '', comments:  record.comments || '',parentDisplayName: record.parentDisplayName || '',topDisplayName: record.topDisplayName || '' };
            })
          };
          this.forMappingDataRef = JSON.parse(JSON.stringify(this.forMappingData.records));
          this.setDataInAgGrid(this.forMappingData.records);
          this.getModifiedRecords();
        }
      });
  }

  private setDataInAgGrid(item: any) {
    if ( item && item.length > 0) {
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
      colKey: 'manufacturer_mapping'
    });
  }

  private listenParentChildTopMapping() {
    this.store
    .select(GetParentChildTopMap)
    .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
    .subscribe((item: parentChildTopMapping[] | null) => {
      this.topParentRecords = item;
    });

  }
}

interface mapDataToPost {
  createdBy: string;
  mappings: manufacturerMapModel[];
}
export interface manufacturerMapModel {
  comments: string;
  distributorPGUID: string;
  manfID: string;
  manfName: string;
  manufacturerPGUID: string;
}
