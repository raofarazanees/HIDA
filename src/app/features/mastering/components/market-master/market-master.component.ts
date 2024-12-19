import { updatedByModel } from './../../../../model/staging-curation/create-update.interface';
import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { unspscMasterState } from '../../store/reducers';
import { Store } from '@ngrx/store';
import {  GetLoadingStateUnspsc, GetMarketMasterRecords$ } from '../../store/selectors';
import { Observable, Subject } from 'rxjs';
import { BaseContainer } from 'src/app/features/item-to-product/containers/base.container';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { searchCriteriaInternal, ProductSearchCriteria } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { GetMarketMasterRecords, GetMarketRecordChangeLog, UpdateMarketMasterRecord, UpdateUnspscRecord, downloadParentChildRecordsCsv, exportCSVFileMasters } from '../../store/actions';
import { AgGridTypeaheadComponent, AgGridActionCellComponent } from '@app-shared-components';
import { InlineInputEditComponent } from '../ag-grid-components/inline-input-edit/inline-input-edit.component';
import { GetMarketMaster } from '../../model/manf-master-models/ag-grid-columns/market-master.utils';
import { MatDialog } from '@angular/material/dialog';
import { CreateMarketMasterComponent } from './create-market-master/create-market-master.component';
import { MarketMasterModel, MarketMasterResponseData } from '../../model/manf-master-models/interface/unspsc-master.interface';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { MarketMasterFilterOptions } from '../../model/manf-master-models/interface/market-master-filter-options';
import { HistoryLogDialogComponent } from '../../history-log-dialog/history-log-dialog.component';
import { GetMarketChangelogColumn } from '../../model/manf-master-models/ag-grid-columns/market-master-chanelog.utils';
import { ApplicationState, getWbDashboardRoles } from '@app-store';

@Component({
  selector: 'app-market-master',
  templateUrl: './market-master.component.html',
  styleUrls: ['./market-master.component.scss']
})
export class MarketMasterComponent extends BaseContainer implements OnInit {
  loading$: Observable<boolean> = this.store.select(GetLoadingStateUnspsc);
  searchCriteriaOptionsData: searchCriteriaInternal[] = MarketMasterFilterOptions();
  overlayLoadingForAgGrid: string = '<span class="ag-overlay-loading-center">Fetching Records...</span>';
  gridApi: GridApi | any;
  rowCount: number = 0;
  gridOptions: GridOptions = GetMarketMaster(30, this,false);
  isNotingChangeOnPage: boolean = true;
  pagination: number = 0;
  public readonly destroyed$ = new Subject<boolean>();
  searchCriteriaReference: any;
  frameworkComponents = {
    inlineEdit: InlineInputEditComponent,
    typeHeadEditor: AgGridTypeaheadComponent,
    actionCellRenderer: AgGridActionCellComponent
  };
  pageSize: number = 20;
  pageSizeOptions: number[] = [20, 50, 100, 150, 200];
  isChangeOnPage: boolean = true;
  marketMasterDataRes: MarketMasterResponseData;
  marketMasterDataRef: MarketMasterModel[];
  isReadOnlyAccess:boolean = false;
  constructor(private readonly store: Store<unspscMasterState>, private dialogRef: MatDialog,private cd:ChangeDetectorRef,
    private readonly appStore:Store<ApplicationState>) {
    super();
    this.getLoggedInUserRoles();
  }

  ngOnInit() {
    this.userProfile = BaseContainer.prototype.userProfile;
  }
  
  ngOnDestroy() {
    this.gridApi.destroy();
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridApi.showNoRowsOverlay();
    this.gridApi.paginationSetPageSize(20);
    this.checkDeviceWithAndFitColumn(this.gridApi);
    this.listenDataChanges();
  }

  searchMarketManfRecords(dataToPost: ProductSearchCriteria) {
     this.gridApi.showLoadingOverlay();
     this.searchCriteriaReference = dataToPost;
     this.store.dispatch(GetMarketMasterRecords({ payload: dataToPost }));
  }

  changePaginationSize(value) {
    this.pageSize = value === 0 ? 20 : value;
    this.gridApi.paginationSetPageSize(this.pageSize);
  }

  saveEditedChanges() {
    this.gridApi.stopEditing();
    const editedChanges: MarketDataToUpdate = {
      updatedBy: this.userProfile?.userName,
      records: this.getModifiedRecords()
    };  
    this.store.dispatch(UpdateMarketMasterRecord({ payload: editedChanges }));

  }

  openCreateMarketDialog() {
    let dialogRef = this.dialogRef.open(CreateMarketMasterComponent, {
      height: '400px',
      width: '500px',
      disableClose: true,
      position: { top: '10px' },
      data: { createdBy: this.userProfile.userName }
    });
  }

  @HostListener('click', ['$event.target']) 
  public onClick(targetElement) {
    if(targetElement.className == 'mat-chip-list' || targetElement.className == 'ag-paging-panel ag-unselectable'  || targetElement.className == 'ag-center-cols-viewport') {
      this.gridApi.stopEditing();
    } else {
      return true
    }
  }
  
  downloadMarketMasterFile() {
    const requestPayload:ProductSearchCriteria = ProductSearchCriteria.default();
    requestPayload.initiatedByUserName = this.userProfile.userName;
    requestPayload.searchCriteria = this.searchCriteriaReference?.searchCriteria || []
    this.store.dispatch(exportCSVFileMasters({filterParams:requestPayload,url:'/market/downloadMasterMarkets'}))
  }
  private updateValue(node) {

    const rowNode = this.gridApi.getRowNode(node.id);
    const data = this.marketMasterDataRef.find((record) => record.marketID === node.data.marketID);
    const { isNewAdded, ...refDataObject } = data;
    Object.keys(node.data).map((k) => (node.data[k] = typeof node.data[k] == 'string' ? node.data[k].trim() : node.data[k]));
    delete node.data['isModified'];
    delete node.data['isNewAdded'];
    
    const isValueChanged = JSON.stringify(refDataObject) === JSON.stringify(node.data);
    rowNode.setData({ ...node.data, ...{ isModified: !isValueChanged } });
    this.gridApi.stopEditing();
    this.cd.markForCheck();
    this.getModifiedRecords();
  }

  private listenDataChanges() {
    this.store
      .select(GetMarketMasterRecords$)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: MarketMasterResponseData) => {
        if (item != null) {
          this.marketMasterDataRes = JSON.parse(JSON.stringify(item));
          this.setDataInAgGrid(this.marketMasterDataRes.records);
          this.marketMasterDataRef = item.records;
          this.getModifiedRecords();
        }
      });
  }

  private setDataInAgGrid(item: any) {
    if (item && item.length > 0) {
      this.rowCount = item.length;
      this.gridApi.setRowData(item);
      this.gridApi.hideOverlay();
    } else {
      this.gridApi.setRowData([]);
      this.gridApi.showNoRowsOverlay();
    }
  }

  private checkDeviceWithAndFitColumn(grid) {
    if (grid.columnModel && grid.columnModel.bodyWidth < window.innerWidth - 60) {
      this.gridApi.sizeColumnsToFit();
    } else {
      return true;
    }
  }

  private getModifiedRecords() {
    const allRows = this.getAllRows();
    const filterRecords = allRows
      .filter((item: MarketMasterModel) => item?.isModified && item.marketName && item.submarketName)
      .map(({ marketID, marketName, submarketName, active }: MarketMasterModel) => ({
        marketID,
        marketName,
        submarketName,
        active
      }));
  
    const data = allRows.filter(item => item?.isModified);
    this.isNotingChangeOnPage = data.length > 0 ?  !(data.length === filterRecords.length) : true;
  
    return filterRecords;
  }
  

  private getAllRows(): any {
    let rowData = [];
    this.gridApi.forEachNode((node) => rowData.push(node.data));
    return rowData;
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
      colKey: 'marketName'
    });
  }

 private openLogDialog(node) {
    this.store.dispatch(GetMarketRecordChangeLog({ payload: { marketID: node.data.marketID } }));
    const logDialogRef = this.dialogRef.open(HistoryLogDialogComponent, {
      height: '100%',
      width: '100vw',
      maxWidth: '98vw',
      position: { top: '10px !important' },
      disableClose: true,
      data: {
        dialogTriggeredFor: 'MarketMasterLog',
        title: 'Market Master',
        subTitle: `${node.data.marketID}`,
        data: node.data,
        agGridOptions: GetMarketChangelogColumn(30)
      }
    });
  }

  private getLoggedInUserRoles() {
    this.appStore
      .select(getWbDashboardRoles)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((data: any) => data)
      )
      .subscribe((roles: string[]) => {
        //&&  roles.indexOf('Mastering_Market') === -1 && roles.indexOf('Mastering_Manager') === -1 && roles.indexOf('Mastering_WFadmin') === -1
        if(roles.indexOf('Mastering_Market_Read_Only') !== -1 &&  roles.indexOf('Mastering_Market') === -1 && roles.indexOf('Mastering_Manager') === -1 && roles.indexOf('Mastering_WFadmin') === -1) {
          this.isReadOnlyAccess = true;
          this.gridOptions = GetMarketMaster(30, this, true)
        }
       });
  }

}


interface MarketDataToUpdate extends updatedByModel  {
  records:MarketMasterModel[]
}
