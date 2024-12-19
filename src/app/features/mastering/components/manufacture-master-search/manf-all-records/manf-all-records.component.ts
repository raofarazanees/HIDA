import { updatedByModel } from 'src/app/model/staging-curation/create-update.interface';
import { ChangeDetectorRef, Component, HostListener, Input, OnInit, SimpleChanges } from '@angular/core';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { searchCriteriaInternal, ProductSearchCriteria } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { GetMasteredMappedColumn } from '../../../model/manf-master-models/ag-grid-columns/master-mapped-column.utils';
import { MasteredSearchOptions } from '../../../model/manf-master-models/interface/manf-unmastered-search-options';
import { manfMasterState } from '../../../store/reducers';
import { GetAllActiveChildManf, GetAllManfRecords, ManageMappingAllRecords, getMasteredChangeLog, getParentChildManfRecords } from '../../../store/actions';
import { GetAllActiveChildManfRecords, GetAllManfRecordsData$, GetParentChildTopMap, GetUpdateManfRecords$, getCratedManfRecord } from '../../../store/selectors';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { MasteredDataResponse, parentChildTopMapping } from '../../../model/manf-master-models/interface/manf-master.interface';
import { masteredMappedModel } from '../../../model/manf-master-models/interface/mastered-mapped.interface';
import { InlineInputEditComponent } from '../../ag-grid-components/inline-input-edit/inline-input-edit.component';
import { AgGridActionCellComponent } from '@app-shared-components';
import { activeChildMaf } from '../../../model/manf-master-models/interface/child-parent-manf.interface';
import { CreateChildManfMasterComponent } from '../create-child-manf-master/create-child-manf-master.component';
import { AgGridTypeaheadComponent } from './../../../../../shared/components/ag-grid/ag-grid-typeahead/ag-grid-typeahead.component';
import { HistoryLogDialogComponent } from '../../../history-log-dialog/history-log-dialog.component';
import { GetMasteredMappedChangeLogColumn } from '../../../model/manf-master-models/ag-grid-columns/master-mapped-changelog-utils';

@Component({
  selector: 'app-manf-all-records',
  templateUrl: './manf-all-records.component.html',
  styleUrls: ['../parent-manf-master/parent-manf-master.component.scss']
})
export class ManfAllRecordsComponent implements OnInit {

  @Input() userProfile: any;
  @Input() pageSize: number = 20;
  @Input() readOnly:boolean;

  searchCriteriaOptionsData: searchCriteriaInternal[] = MasteredSearchOptions(true,'Map',true);
  overlayLoadingForAgGrid: string = '<span class="ag-overlay-loading-center">Fetching Records...</span>';
  gridApi: GridApi | any;
  rowCount: number = 0;
  gridOptions: GridOptions = GetMasteredMappedColumn(30, this, true);
  isNotingChangeOnPage: boolean = true;
  pagination: number = 0;
  public readonly destroyed$ = new Subject<boolean>();
  allManfRecords:MasteredDataResponse;
  allManfRecordsRef:masteredMappedModel[] = [];
  topParentRecords:parentChildTopMapping[] = [];
  activeParentRecords: activeChildMaf[] = [];
  
  frameworkComponents = {
    inlineEdit: InlineInputEditComponent,
    typeHeadEditor: AgGridTypeaheadComponent,
    actionCellRenderer: AgGridActionCellComponent
  };
  
  constructor(private store:Store<manfMasterState>,private dialogRef: MatDialog, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.gridOptions = GetMasteredMappedColumn(30, this, true,this.readOnly);

    this.store.dispatch(GetAllActiveChildManf());
    this.store.dispatch(getParentChildManfRecords());
    this.listenActiveParentManfRecords();
    this.listenParentChildTopMapping();

  }

  ngOnDestroy() {
    this.gridApi.destroy();
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngAfterContentChecked() {
    this.cd.detectChanges();
  }

  searchAllManfRecords(e:ProductSearchCriteria) {
   this.gridApi.showLoadingOverlay();
   this.store.dispatch(GetAllManfRecords({ payload: e }));
  }

  
  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridApi.showNoRowsOverlay();
    this.gridApi.paginationSetPageSize(this.pageSize);
    this.checkDeviceWithAndFitColumn(this.gridApi);
    this.listenAllRecordsData();
    this.listenUpdateManfRecords();
    this.listenForNewManf();

  }

  
  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('pageSize') && changes['pageSize'].previousValue) {
      this.gridApi.paginationSetPageSize(Number(changes['pageSize'].currentValue));
    } else {
      return false
    }
  }

  saveEditedChanges() {
    this.gridApi.stopEditing();
    const editedChanges: manageMapping = {
      updatedBy: this.userProfile.userName,
      mappings: this.getModifiedRecords()
    };

   this.store.dispatch(ManageMappingAllRecords({payload:editedChanges}));
  }

  @HostListener('click', ['$event.target']) 
  public onClick(targetElement) {
    if(targetElement.className == 'mat-chip-list' || targetElement.className == 'btn-row-container' ||  targetElement.className == 'ag-paging-panel ag-unselectable' || targetElement.className == 'ag-center-cols-viewport') {
      this.gridApi.stopEditing();
    }
  }
  
  
  private updateValue(node) {

    const data = this.allManfRecordsRef.find((record) => record.extManufKey === node.data.extManufKey);

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

    const rowNode = this.gridApi.getRowNode(node.id);
    delete node.data['isModified'];
    delete node.data['isNewAdded'];
    this.gridApi.stopEditing();

    Object.keys(node.data).map((k) => (node.data[k] = typeof node.data[k] == 'string' ? node.data[k].trim() : node.data[k]));
    const { isNewAdded, ...refDataObject } = data;
    const isValueChanged = JSON.stringify(refDataObject) === JSON.stringify(node.data);
    rowNode.setData({ ...node.data, ...{ isModified: !isValueChanged } });
    this.getModifiedRecords();
  }

  onSortChanged(params){ params.api.forEachNode((rowNode,index)=>{ rowNode.rowIndex = index; }); }

  private openParentChildDialog(node,text?:string) {
    this.dialogRef.open(CreateChildManfMasterComponent, {
      height: '400px',
      width: '500px',
      disableClose: true,
      position: { top: '10px' },
      data: { createdBy: this.userProfile.userName,value:text,appendToId:node.rowIndex + 1 ,appendFor:''}
    });
  }

  private listenAllRecordsData() {
    this.store.select(GetAllManfRecordsData$)
    .pipe(distinctUntilChanged(),takeUntil(this.destroyed$),filter(item => item!= null))
    .subscribe((item:MasteredDataResponse) => {
        
      this.allManfRecords = JSON.parse(JSON.stringify(item));
      this.allManfRecordsRef = JSON.parse(JSON.stringify(item.records));
      this.setDataInAgGrid(this.allManfRecords.records);
      this.getModifiedRecords();
    })
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

  private getModifiedRecords() {
    const allRowsData = this.getAllRows();
     const filterRecords: mappingRecords[] = allRowsData
       .filter((item: masteredMappedModel) => 
         item?.isModified && item.manfID && item.manfName && this.checkForMappingComments(item.manfMapID,item.mappingComments)
       )
       .map((item: masteredMappedModel) => ({
         manfMapID: item.manfMapID,
         manfID: item.manfID,
         manfName: item.manfName,
         manufacturerPGUID: item.manuPGUID,
         comments: item.mappingComments.trim(),
         distributorPGUID:item.distrPGUID,
         rowIndexUI:item.rowIndexUI
       }));
   
     const data = allRowsData.filter((item) => item?.isModified);
     this.isNotingChangeOnPage = filterRecords.length > 0 ? data.length !== filterRecords.length : true;
  
     return filterRecords;
   }

   private getAllRows(): any {
    let rowData = [];
    this.gridApi.forEachNode((node) => rowData.push({...node.data,rowIndexUI:node.rowIndex}));
    return rowData;
  }
  
  private listenActiveParentManfRecords() {
    this.store
      .select(GetAllActiveChildManfRecords)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((data: any) => data!= null)
      )
      .subscribe((r: activeChildMaf[]) => {
        this.activeParentRecords = r;
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
  private listenUpdateManfRecords() {
    this.store
    .select(GetUpdateManfRecords$)
    .pipe(distinctUntilChanged(), takeUntil(this.destroyed$),filter(data => data!= null))
    .subscribe((item: masteredMappedModel[]) => {
      
      const allModifiedRows = this.getModifiedRecords();
      allModifiedRows.forEach(element => {
        const updatedRow = item.filter(row => row.manuPGUID === element.manufacturerPGUID)[0];
        const rowNode = this.gridApi.getRowNode(element.rowIndexUI);
        rowNode.setData({ ...updatedRow,isNewAdded: true });
      });

      this.getModifiedRecords()     
    });

  }
  private markAsNotified(event: any) {
    const rowNode = this.gridApi.getRowNode(event.node.id);
    rowNode.setData({ ...rowNode.data, ...{ isNewAdded: false } });
  }

  private checkForMappingComments(mapId:number,comments:string):boolean {
    if(mapId && !comments) {
      return false;
    }    
    return true;
  }
 private checkDeviceWithAndFitColumn(grid) {
    if (grid.columnModel.bodyWidth < window.innerWidth - 60) {
      this.gridApi.sizeColumnsToFit();
    }
  }
  private openLogDialog(node) {
    if(!node.data.manfMapID) {return false};
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

  private listenForNewManf() {
    this.store
      .select(getCratedManfRecord)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$),filter( (data:any)=> data != null))
      .subscribe((item: any) => {
        const {id, appendFor} = item.autoAppendFor;
        const {childManfName,childManfID, childDisplayName,parentDisplayName,parentManfName,parentManfID,topParentDisplayName,topParentManfID,topParentManfName} = item.data;
        const rowNode = this.gridApi.getRowNode(id-1);
        console.log(id,appendFor)
        rowNode.setData({
          ...rowNode.data,
          ...{
            topParManfID: topParentManfID,
            topParManfName:topParentManfName,
            topParDispName: topParentDisplayName,
            parManfID: parentManfID,
            parManfName:parentManfName,
            parDispName: parentDisplayName,
            childDispName:childDisplayName,
            manfID:childManfID,
            manfName: childManfName,
            manufacturer_mapping: childManfName
          }
        });
        this.getModifiedRecords();
      });
  }

}


export interface manageMapping extends updatedByModel {
  mappings: mappingRecords[];
}
export interface mappingRecords {
  comments: string;
  distributorPGUID: string;
  manfID: string;
  manfMapID: number | null;
  manfName: string;
  manufacturerPGUID: string;
  rowIndexUI?: number;
}
