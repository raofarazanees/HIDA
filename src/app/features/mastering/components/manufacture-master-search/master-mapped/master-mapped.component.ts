import { updatedByModel } from './../../../../../model/staging-curation/create-update.interface';
import { ChangeDetectorRef, Component, HostListener, Input, OnInit, SimpleChanges } from '@angular/core';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { searchCriteriaInternal } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import {
  MasteredDataResponse,
  manfMasterState,
  parentChildTopMapping
} from '../../../model/manf-master-models/interface/manf-master.interface';
import { MasteredSearchOptions, MasteredSearchOptionsMapped } from '../../../model/manf-master-models/interface/manf-unmastered-search-options';
import { AgGridTypeaheadComponent, AgGridActionCellComponent } from '@app-shared-components';
import { InlineInputEditComponent } from '../../ag-grid-components/inline-input-edit/inline-input-edit.component';
import { GetMasteredMappedColumn } from '../../../model/manf-master-models/ag-grid-columns/master-mapped-column.utils';
import {
  GetAllActiveChildManf,
  getManfForMappingSuccess,
  getMasteredChangeLog,
  getMasteredManfRecords,
  getMasteredManfRecordsSuccess,
  getParentChildManfRecords,
  updateMasteredMappedRecords
} from '../../../store/actions/manf-master.actions';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { HistoryLogDialogComponent } from '../../../history-log-dialog/history-log-dialog.component';
import { GetMasteredMappedChangeLogColumn } from '../../../model/manf-master-models/ag-grid-columns/master-mapped-changelog-utils';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { GetAllActiveChildManfRecords, GetMappedManfRecords, GetParentChildTopMap } from '../../../store/selectors';
import { masteredMappedModel } from '../../../model/manf-master-models/interface/mastered-mapped.interface';
import { CreateChildManfMasterComponent } from '../create-child-manf-master/create-child-manf-master.component';
import { activeChildMaf } from '../../../model/manf-master-models/interface/child-parent-manf.interface';

interface mappedUpdateModel {
  comments: string;
  manfID: string;
  manfMapID: Number;
  manfName: string;
}

interface MappedDataToUpdate extends updatedByModel {
  mappings: mappedUpdateModel[];
}

@Component({
  selector: 'app-master-mapped',
  templateUrl: './master-mapped.component.html',
  styleUrls: ['../parent-manf-master/parent-manf-master.component.scss']
})
export class MasterMappedComponent implements OnInit {
  @Input() userProfile: any;
  @Input() pageSize: number = 20;
  @Input() readOnly:boolean;

  parentManfData: any;
  searchCriteriaOptionsData: searchCriteriaInternal[] = MasteredSearchOptionsMapped();
  overlayLoadingForAgGrid: string = '<span class="ag-overlay-loading-center">Fetching Records...</span>';
  gridApi: GridApi | any;
  rowCount: number = 0;
  gridOptions: GridOptions;
  isNotingChangeOnPage: boolean = true;
  pagination: number = 0;
  public readonly destroyed$ = new Subject<boolean>();
  mappedData: MasteredDataResponse;
  mappedDataRef: masteredMappedModel[] = [];
  searchCriteriaReference: any;
  topParentRecords:parentChildTopMapping[];
  activeParentRecords: activeChildMaf[] = [];
  
  frameworkComponents = {
    inlineEdit: InlineInputEditComponent,
    typeHeadEditor: AgGridTypeaheadComponent,
    actionCellRenderer: AgGridActionCellComponent
  };

  constructor(private readonly store: Store<manfMasterState>, private dialogRef: MatDialog, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.gridOptions = GetMasteredMappedColumn(30, this,false,this.readOnly);
    this.store.dispatch(GetAllActiveChildManf());
    this.store.dispatch(getParentChildManfRecords());
    this.listenActiveParentManfRecords();
    this.listenParentChildTopMapping();
  }

  onCellEditRequest(e) {
    console.log(e);
  }
  
  ngOnDestroy(): void {
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

  listenActiveParentManfRecords() {
    this.store
      .select(GetAllActiveChildManfRecords)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((data: any) => data)
      )
      .subscribe((r: activeChildMaf[]) => {
        if(r && (this.activeParentRecords.length != r.length)) {
          this.mappedData = {totalRecords:this.mappedData?.totalRecords || 0, records: this.mappedData ? this.getAllRows() : []};
         if(this.mappedData.records.length > 0) this.store.dispatch(getMasteredManfRecordsSuccess({payload: this.mappedData}));
        }
        this.activeParentRecords = r;
      });
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridApi.showNoRowsOverlay();
    this.gridApi.paginationSetPageSize(this.pageSize);
    this.checkDeviceWithAndFitColumn(this.gridApi);
    this.listenForMappedData();
  }

  checkDeviceWithAndFitColumn(grid) {
    if (grid.columnModel && grid.columnModel.bodyWidth < window.innerWidth - 60) {
      this.gridApi.sizeColumnsToFit();
    } else {
      return true
    }
  }

  searchParentManfRecords(e) {
    this.gridApi.showLoadingOverlay();
    this.searchCriteriaReference = e;
    this.store.dispatch(getMasteredManfRecords({ payload: e }));
  }

  saveEditedChanges() {
    this.gridApi.stopEditing();
    const editedChanges: MappedDataToUpdate = {
      updatedBy: this.userProfile.userName,
      mappings: this.getModifiedRecords()
    };
    this.store.dispatch(updateMasteredMappedRecords({ payload: editedChanges }));
  }

  openLogDialog(node) {
    this.store.dispatch(getMasteredChangeLog({ payload: { manfMapID: node.data.manfMapID } }));
    const logDialogRef = this.dialogRef.open(HistoryLogDialogComponent, {
      height: '100%',
      width: '100vw',
      maxWidth: '98vw',
      position: { top: '10% !important' },
      disableClose: true,
      data: {
        dialogTriggeredFor: 'MappedManf',
        title: 'Mastered Record',
        subTitle: ``,
        data: node.data,
        agGridOptions: GetMasteredMappedChangeLogColumn(30)
      }
    });
  }


  @HostListener('click', ['$event.target']) 
  public onClick(targetElement) {
    if(targetElement.className == 'mat-chip-list' || targetElement.className == 'btn-row-container' ||  targetElement.className == 'ag-paging-panel ag-unselectable' || targetElement.className == 'ag-center-cols-viewport') {
      this.gridApi.stopEditing();
    }
  }

  private OnEditIconsClicked(params) {
    this.gridApi.startEditingCell({
      rowIndex: params.rowIndex,
      colKey: 'manfName'
    });
  }

  private listenForMappedData() {
    this.store
      .select(GetMappedManfRecords)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: MasteredDataResponse) => {
        if (item) {
          this.mappedData = JSON.parse(JSON.stringify(item));
          this.mappedDataRef = JSON.parse(JSON.stringify(item.records));
          this.setDataInAgGrid(this.mappedData.records);
          this.getModifiedRecords();
        } else {
          this.setDataInAgGrid([]);
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
  private getAllRows(): any {
    let rowData = [];
    this.gridApi.forEachNode((node) => rowData.push(node.data));
    return rowData;
  }

 private getModifiedRecords() {
  const allRowsData = this.getAllRows();
   const filterRecords: mappedUpdateModel[] = allRowsData
     .filter((item: masteredMappedModel) => 
       item?.isModified && item.manfID && item.mappingComments.trim()
     )
     .map((item: masteredMappedModel) => ({
       manfMapID: item.manfMapID,
       manfID: item.manfID,
       manfName: item.manfName,
       comments: item.mappingComments.trim()
     }));
 
   const data = allRowsData.filter((item) => item?.isModified);

   this.isNotingChangeOnPage = filterRecords.length > 0 ? data.length !== filterRecords.length : true;
 
   return filterRecords;
 }
 

  // called from ag-grid
  private updateValue(node) {

    const data = this.mappedDataRef.find((record) => record.manfMapID === node.data.manfMapID);

    if (typeof node.data.manfName === 'object') {
      node.data.manfID = node.data.manfName.id;
      node.data.manfName = node.data.manfName.value;
      node.data.manufacturer_mapping = node.data.manfName.value;
      const topParent = this.topParentRecords.find((record) => record.childManfID === node.data.manfID);
      if(node.data.manfID === data.manfID) {
        node.data.topParManfID = data.topParManfID;
        node.data.topParManfName = data.topParManfName;
        node.data.parManfID = data.parManfID;
        node.data.parManfName = data.parManfName;
        node.data.childDispName = data.childDispName;
        node.data.topParDispName = data.topParDispName;
        node.data.parDispName = data.parDispName;
      } else {
        node.data.topParManfID = topParent.topParentManfID;
        node.data.topParManfName = topParent.topParentManfName;
        node.data.parManfID = topParent.parentManfID;
        node.data.parManfName = topParent.parentManfName;
        node.data.childDispName = topParent.childDisplayName;
        node.data.topParDispName = topParent.topParentDisplayName;
        node.data.parDispName = topParent.parentDisplayName;
      }
    }

    this.gridApi.stopEditing();
    const rowNode = this.gridApi.getRowNode(node.id);
    delete node.data['isModified'];
    delete node.data['isNewAdded'];

    Object.keys(node.data).map((k) => (node.data[k] = typeof node.data[k] == 'string' ? node.data[k].trim() : node.data[k]));
    const { isNewAdded, ...refDataObject } = data;
    const isValueChanged = JSON.stringify(refDataObject) === JSON.stringify(node.data);
    rowNode.setData({ ...node.data, ...{ isModified: !isValueChanged } });
    this.cd.markForCheck();
    this.getModifiedRecords();
  }

  // called from ag-grid
  private markAsNotified(event: any) {
    const rowNode = this.gridApi.getRowNode(event.node.id);
    rowNode.setData({ ...rowNode.data, ...{ isNewAdded: false } });
    this.cd.markForCheck();
  }

  private openParentChildDialog(node,text?:string) {
    this.dialogRef.open(CreateChildManfMasterComponent, {
      height: '400px',
      width: '500px',
      disableClose: true,
      position: { top: '10px' },
      data: { createdBy: this.userProfile.userName,value:text,appendToId:node.data.manfMapID,appendFor:'masteredManf'}
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

