import { ApplicationState } from './../../../../store/reducers/index';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Observable, Subject } from 'rxjs';
import { ProductSearchCriteria, searchCriteriaInternal } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { BaseContainer } from 'src/app/features/item-to-product/containers/base.container';
import { GetUnspscColumns, UnspscMasterFilterOptions } from '../../model/manf-master-models/interface/unspsc-master-filter-options';
import { AgGridTypeaheadComponent, AgGridActionCellComponent, CheckboxButtonRendererComponent } from '@app-shared-components';
import { InlineInputEditComponent } from '../ag-grid-components/inline-input-edit/inline-input-edit.component';
import { unspscMasterState } from '../../store/reducers';
import { Store } from '@ngrx/store';
import {
  GetAllActiveMarketRecords,
  GetUnspscChangeLog,
  GetUnspscMasterRecords,
  UpdateUnspscRecord,
  autoAssignMarketToRecord,
  exportCSVFileMasters,
  getActiveBusinessUsers
} from '../../store/actions';
import { GetActiveMarketData$, GetLoadingStateUnspsc, GetUnspscMasterRecordsData, getCreatedMarketForAssign } from '../../store/selectors';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import {
  MarketMasterModel,
  UnspscMasterResponseData,
  UnspscRecordInterface
} from '../../model/manf-master-models/interface/unspsc-master.interface';
import { MatDialog } from '@angular/material/dialog';
import { HistoryLogDialogComponent } from '../../history-log-dialog/history-log-dialog.component';
import { GetUnspscChangelogColumn } from '../../model/manf-master-models/ag-grid-columns/unspsc-records-changelog.utils';
import { CreateMarketMasterComponent } from '../market-master/create-market-master/create-market-master.component';
import { updatedByModel } from './../../../../model/staging-curation/create-update.interface';
import { autoAppendFor } from '../../model/manf-master-models/interface/common.interface';
import { getWbDashboardRoles } from '@app-store';
import * as moment from 'moment';

@Component({
  selector: 'app-unspsc-master',
  templateUrl: './unspsc-master.component.html',
  styleUrls: ['./unspsc-master.component.scss']
})
export class UnspscMasterComponent extends BaseContainer implements OnInit {
  loading$: Observable<boolean> = this.store.select(GetLoadingStateUnspsc);
  searchCriteriaOptionsData: searchCriteriaInternal[] = UnspscMasterFilterOptions();
  overlayLoadingForAgGrid: string = '<span class="ag-overlay-loading-center">Fetching Records...</span>';
  gridApi: GridApi | any;
  rowCount: number = 0;
  gridOptions: GridOptions = GetUnspscColumns(30, this);
  isNotingChangeOnPage: boolean = true;
  pagination: number = 0;
  public readonly destroyed$ = new Subject<boolean>();
  searchCriteriaReference: any;
  UnspscRecordsRef: UnspscRecordInterface[] = [];
  UnspscRecordsData: UnspscMasterResponseData;
  frameworkComponents = {
    inlineEdit: InlineInputEditComponent,
    typeHeadEditor: AgGridTypeaheadComponent,
    actionCellRenderer: AgGridActionCellComponent,
    checkboxSelector: CheckboxButtonRendererComponent
  };
  pageSize: number = 20;
  pageSizeOptions: number[] = [20, 50, 100, 150, 200];
  isChangeOnPage: boolean = false;
  activeMarketRecords: MarketMasterModel[] = [];
  isReadOnlyAccess:boolean = false;
  constructor(private readonly store: Store<unspscMasterState>, private cd: ChangeDetectorRef, private dialogRef: MatDialog,
    private readonly appStore: Store<ApplicationState>) {
    super();
    this.getLoggedInUserRoles()
  }

  ngOnInit() {
    this.userProfile = BaseContainer.prototype.userProfile;
    this.store.dispatch(GetAllActiveMarketRecords());
    this.store.dispatch(getActiveBusinessUsers());

    this.getAllActiveMarket();
  }

  ngOnDestroy() {
    this.gridApi.destroy();
    this.store.dispatch(autoAssignMarketToRecord({ payload: null }));
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
  searchUnspscManfRecords(dataToPost: ProductSearchCriteria) {
    this.searchCriteriaReference = dataToPost;
    this.store.dispatch(GetUnspscMasterRecords({ payload: dataToPost }));
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridApi.paginationSetPageSize(20);
    this.checkDeviceWithAndFitColumn(this.gridApi);
    this.listenDataChanges();
    this.listenAutoAssignMarket();
    this.gridApi.showLoadingOverlay();
  }

  changePaginationSize(value) {
    this.pageSize = value === 0 ? 20 : value;
    this.gridApi.paginationSetPageSize(this.pageSize);
  }

  saveEditedChanges() {
    this.gridApi.stopEditing();
    const editedChanges: UnspscDataToUpdate = {
      updatedBy: this.userProfile?.userName,
      records: this.getModifiedRecords()
    };
    this.store.dispatch(UpdateUnspscRecord({ payload: editedChanges }));
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
    } else {
      return true;
    }
  }

  openLogDialog(node) {
    this.store.dispatch(GetUnspscChangeLog({ payload: { unspscCodeID: node.data.unspscCodeID } }));
    const logDialogRef = this.dialogRef.open(HistoryLogDialogComponent, {
      height: '100%',
      width: '100vw',
      maxWidth: '98vw',
      position: { top: '10% !important' },
      disableClose: true,
      data: {
        dialogTriggeredFor: 'UnspscMaster',
        title: 'UNSPSC Master',
        subTitle: `UNSPSC Code: ${node.data.unspscCode}`,
        data: node.data,
        agGridOptions: GetUnspscChangelogColumn(30)
      }
    });
  }

  downloadUnspscMasterFile() {
    const requestPayload:ProductSearchCriteria = ProductSearchCriteria.default();
    requestPayload.initiatedByUserName = this.userProfile.userName;
    requestPayload.searchCriteria = this.searchCriteriaReference?.searchCriteria || []
    this.store.dispatch(exportCSVFileMasters({filterParams:requestPayload,url:'/unspsc/downloadMasterUNSPSCs'}))
  }

  private checkDeviceWithAndFitColumn(grid) {
    if (grid.columnModel && grid.columnModel.bodyWidth < window.innerWidth - 60) {
      this.gridApi.sizeColumnsToFit();
    } else {
      return true;
    }
  }
  private listenDataChanges() {
    this.store
      .select(GetUnspscMasterRecordsData)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((item) => item != null)
      )
      .subscribe((item: UnspscMasterResponseData) => {
        if (item != null) {
          const UnspscRecordsData = JSON.parse(JSON.stringify(item));
          this.UnspscRecordsData = {
            totalRecords: UnspscRecordsData.totalRecords,
            records: UnspscRecordsData.records.map((item) => {
              return { ...item, isReviewed: (item.lastReviewedDate && item.lastReviewedBy) ? 'Y' : '',lastReviewedDate: item.lastReviewedDate ? moment(item.lastReviewedDate).format('YYYY-MM-DD')+' 00:00:00' : '' };
            })
          };
          this.setDataInAgGrid(this.UnspscRecordsData.records);
          this.UnspscRecordsRef = JSON.parse(JSON.stringify(this.UnspscRecordsData.records));
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

  private getModifiedRecords() {
    const filterRecords: UnspscUpdateModel[] = this.getAllRows()
      .filter((item: UnspscRecordInterface) => {
        if (item?.isModified && item?.isModified === true && item.marketID && this.checkIsSellable(item) && this.checkReviewByDate(item)) {
          return item;
        }
      })
      .map((item: UnspscRecordInterface) => {
        return {
          clusteringFlag: item.clusteringFlag,
          manualFlag: item.manualFlag,
          marketID: item.marketID,
          marketName: item.marketName,
          submarketName: item.submarketName,
          unspscCode: item.unspscCode,
          unspscCodeID: item.unspscCodeID,
          unspscScope: item.unspscScope,
          attributes: item.attributes,
          brands: item.brands,
          isReviewed: item.isReviewed,
          isSellable: item.isSellable,
          nonSellableReason: item.nonSellableReason,
          lastReviewedDate:item.lastReviewedDate || '',
          lastReviewedBy: item.lastReviewedBy || ''
        };
      });

    if (filterRecords.length > 0) {
      const data = this.getAllRows().filter((item) => {
        if (item?.isModified && item?.isModified === true) {
          return item;
        }
      });
      this.isNotingChangeOnPage = !(data.length == filterRecords.length);
    } else {
      this.isNotingChangeOnPage = true;
    }
    return filterRecords;
  }

  private getAllRows(): UnspscRecordInterface[] {
    let rowData = [];
    this.gridApi.forEachNode((node) => rowData.push(node.data));
    return rowData;
  }

  private checkIsReview(node) {
    const rowNode = this.gridApi.getRowNode(node.rowIndex);
    this.updateValue(rowNode);
  }
  // called from ag grid update value
  private updateValue(node) {
    const data = this.UnspscRecordsRef.find((record) => record.unspscCodeID === node.data.unspscCodeID);

    if (typeof node.data.submarketName === 'object') {
      node.data.submarketName = node.data.submarketName.value;
    }

    if (node.data.isSellable === 'Y' || node.data.isSellable === '') {
      node.data.nonSellableReason = '';
    }

    if (node.data.isSellable === data.isSellable) {
      node.data.nonSellableReason = data.nonSellableReason;
    }

    if (node.data.lastReviewedBy !== data.lastReviewedBy || node.data.lastReviewedDate !== data.lastReviewedDate) {
        node.data.isReviewed = 'Y';
    } 
    // else {
    //   node.data.isReviewed = '';
    // }

    if (typeof node.data.marketName === 'object') {
      if (data.marketID === node.data.marketName.id) {
        node.data.marketID = data.marketID;
        node.data.marketName = data.marketName;
        node.data.submarketName = data.submarketName;
      } else {
        node.data.marketID = node.data.marketName.id;
        node.data.marketName = node.data.marketName.value;
        node.data.submarketName = this.getSubmarket(node.data.marketName);
      }
    }

    this.gridApi.stopEditing();
    const rowNode = this.gridApi.getRowNode(node.rowIndex);
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

  private OnEditIconsClicked(params) {
    this.gridApi.startEditingCell({
      rowIndex: params.rowIndex,
      colKey: 'marketName'
    });
  }

  //called from sg-grid column config
  private openMarketMasterDialog(node, typeText = '') {
    let submarket = node.colDef.field === 'submarketName' ? typeText : '';
    let marketName = node.colDef.field === 'marketName' ? typeText : '';
    marketName = node.colDef.field === 'submarketName' ? node.data.marketName : marketName;

    let dialogRef = this.dialogRef.open(CreateMarketMasterComponent, {
      height: '400px',
      width: '500px',
      disableClose: true,
      position: { top: '10px' },
      data: {
        createdBy: this.userProfile.userName,
        name: submarket,
        marketName: marketName,
        appendToId: node.rowIndex + 1,
        appendFor: 'marketUNSPSC'
      }
    });

    // let dialogRef = this.dialogRef.open(CreateMarketMasterComponent, {
    //   height: '400px',
    //   width: '500px',
    //   disableClose: true,
    //   position: { top: '10px' },
    //   data: { createdBy: this.userProfile.userName,name:node.typeHeadRenderFor == 'marketMaster' ? node.data.submarketName : '' }
    // });
  }

  private getAllActiveMarket() {
    this.store
      .select(GetActiveMarketData$)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((item) => item != null)
      )
      .subscribe((item: MarketMasterModel[]) => {
        this.activeMarketRecords = item;
      });
  }

  private getSubmarket(market: string): string {
    const submarket = this.activeMarketRecords.filter((item) => {
      return item.marketName.toLowerCase() === market.toLowerCase();
    });

    return submarket.length === 1 ? submarket[0].submarketName : '';
  }

  private listenAutoAssignMarket() {
    this.store
      .select(getCreatedMarketForAssign)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: { autoAppendFor: autoAppendFor; data: MarketMasterModel }) => {
        if (item != null && item.autoAppendFor.appendFor === 'marketUNSPSC') {
          const { id, appendFor } = item.autoAppendFor;
          const { marketID, marketName, submarketName } = item.data;
          const rowNode = this.gridApi.getRowNode(Number(id) - 1);
          rowNode.setData({
            ...rowNode.data,
            ...{
              marketID: marketID,
              marketName: marketName,
              submarketName: submarketName,
              isModified: true
            }
          });
          this.getModifiedRecords();
        }
      });
  }

  private checkIsSellable(item: UnspscRecordInterface): boolean {
    if (item.isSellable === 'N' && item.nonSellableReason.trim().length === 0) {
      return false;
    }
    return true;
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
        //&&  roles.indexOf('Mastering_UNSPSC') === -1 && roles.indexOf('Mastering_Manager') === -1 && roles.indexOf('Mastering_WFadmin') === -1
        if(roles.indexOf('Mastering_UNSPSC_Read_Only') !== -1 &&  roles.indexOf('Mastering_UNSPSC') === -1 && roles.indexOf('Mastering_Manager') === -1 && roles.indexOf('Mastering_WFadmin') === -1) {
          this.isReadOnlyAccess = true;
          this.gridOptions = GetUnspscColumns(30, this, true)
        }
       });
  }

  private checkReviewByDate(item: UnspscRecordInterface): boolean {
    if(item.lastReviewedDate && item.lastReviewedBy || !item.lastReviewedDate && !item.lastReviewedBy) {
        return true;
    }

    if(!item.lastReviewedDate || !item.lastReviewedBy) {
      return false;
    }

    return true;
  }
  
}
export interface UnspscDataToUpdate extends updatedByModel {
  records: UnspscUpdateModel[];
}
export interface UnspscUpdateModel {
  clusteringFlag: string;
  manualFlag: string;
  marketID: string;
  marketName: string;
  submarketName: string;
  unspscCode: number;
  unspscCodeID: number;
  unspscScope: string;
  isReviewed: string;
  isSellable: string;
  nonSellableReason: string;
  attributes: string;
  brands: string;
  lastReviewedBy: string;
  lastReviewedDate: string;
}
