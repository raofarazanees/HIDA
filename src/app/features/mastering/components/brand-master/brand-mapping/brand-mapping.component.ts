import { getCreatedBrandCVForAssign } from './../../../store/selectors/brand-master.selector';
import { ChangeDetectorRef, Component, HostListener, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgGridActionCellComponent, AgGridTypeaheadComponent } from '@app-shared-components';
import { Store } from '@ngrx/store';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { searchCriteriaInternal, ProductSearchCriteria } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { HistoryLogDialogComponent } from '../../../history-log-dialog/history-log-dialog.component';
import { BrandMappingResponse, BrandMappingRecord, BrandCVRecord } from '../../../model/manf-master-models/interface/brand-cv-filter-options';
import { GetBrandMappingRecords, GetAllActiveChildManf, getParentChildManfRecords, GetAllActiveMarketRecords, GetActiveBrandMaster, UpdateBrandMappingRecords, GetBrandMappingRecordsSuccess, GetBrandMapRecordChangeLog } from '../../../store/actions';
import { BrandMasterState, manfMasterState, unspscMasterState } from '../../../store/reducers';
import { GetBrandMappingRecords$ } from '../../../store/selectors/brand-master.selector';
import { InlineInputEditComponent } from '../../ag-grid-components/inline-input-edit/inline-input-edit.component';
import { CreateBrandCvComponent } from '../brand-cv/create-brand-cv/create-brand-cv.component';
import { BrandMappingSearchOptions } from '../../../model/manf-master-models/interface/brand-mapping-filter-options';
import { BrandMappingGridOptions } from '../../../model/manf-master-models/ag-grid-columns/brand-mapping.utils';
import { GetActiveMarketData$, GetParentChildTopMap, getCratedManfRecord, getCreatedMarketForAssign } from '../../../store/selectors';
import { parentChildTopMapping } from '../../../model/manf-master-models/interface/manf-master.interface';
import { CreateBrandMappingDialogComponent } from './create-brand-mapping-dialog/create-brand-mapping-dialog.component';
import { CreateMarketMasterComponent } from '../../market-master/create-market-master/create-market-master.component';
import { CreateChildManfMasterComponent } from '../../manufacture-master-search/create-child-manf-master/create-child-manf-master.component';
import { BrandMappingChangelogGridOptions } from '../../../model/manf-master-models/ag-grid-columns/brand-mapping-changelog.utils';
import { autoAppendFor } from '../../../model/manf-master-models/interface/common.interface';
import { MarketMasterModel } from '../../../model/manf-master-models/interface/unspsc-master.interface';

@Component({
  selector: 'app-brand-mapping',
  templateUrl: './brand-mapping.component.html',
  styleUrls: ['./brand-mapping.component.scss']
})
export class BrandMappingComponent implements OnInit {

  @Input() userProfile: any;
  @Input() pageSize: any;
  @Input() readOnly: boolean;

  searchCriteriaOptionsData: searchCriteriaInternal[] = BrandMappingSearchOptions();
  overlayLoadingForGrid: string = '<span class="ag-overlay-loading-center">Fetching Records...</span>';
  gridApi: GridApi | any;
  rowCount: number = 0;
  frameworkComponents = {
    inlineEdit: InlineInputEditComponent,
    typeHeadEditor: AgGridTypeaheadComponent,
    actionCellRenderer: AgGridActionCellComponent
  };
  public readonly destroyed$ = new Subject<boolean>();
  isChangeOnPage: boolean = true;
  gridOptions: GridOptions;
  BrandMappingDataRes: BrandMappingResponse;
  BrandMappingDataRef: BrandMappingRecord[] = [];
  isNotingChangeOnPage: boolean = false;
  topParentRecords: parentChildTopMapping[] = [];
  activeMarketRecords: MarketMasterModel[] = [];

  constructor(public readonly store: Store<BrandMasterState>, private readonly manfStore: Store<manfMasterState>, private readonly marketStore: Store<unspscMasterState>, private dialogRef: MatDialog, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.gridOptions = BrandMappingGridOptions(30, this, this.readOnly);
    this.manfStore.dispatch(GetAllActiveChildManf());
    this.manfStore.dispatch(getParentChildManfRecords());
    this.marketStore.dispatch(GetAllActiveMarketRecords());
    this.store.dispatch(GetActiveBrandMaster());
    this.listenParentChildTopMapping();
    this.getAllActiveMarket();
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

  searchBrandMasterRecords(dataToPost: ProductSearchCriteria) {
    this.gridApi.showLoadingOverlay();
    this.store.dispatch(GetBrandMappingRecords({ payload: dataToPost }));
  }

  onGridReady(params: GridReadyEvent | any): void {
    this.gridApi = params.api;
    this.gridApi.showNoRowsOverlay();
    this.gridApi.paginationSetPageSize(this.pageSize);
    this.gridApi.sizeColumnsToFit();
    this.listenDataChanges();
    this.listenAutoAssignBrand();
    this.listenForNewManf();
    this.listenAutoAssignMarket();
  }

  openCreateBrandCvModel(node, typedText: string = ''): void {
    let dialogRef = this.dialogRef.open(CreateBrandCvComponent, {
      height: '400px',
      width: '500px',
      disableClose: true,
      position: { top: '10px' },
      data: { createdBy: this.userProfile.userName, name: typedText, appendToId: node.rowIndex + 1, appendFor: 'brandMasterCV' }
    });
  }
  saveEditedChanges() {
    this.gridApi.stopEditing();
    const editedRecords: BrandMappingUpdateModel = {
      userName: this.userProfile?.userName,
      records: this.getModifiedRecords()
    };
    this.store.dispatch(UpdateBrandMappingRecords({ payload: editedRecords }));
  }

  @HostListener('click', ['$event.target'])
  public onClick(targetElement) {
    if (targetElement.className == 'mat-chip-list' || targetElement.className == 'btn-row-container' || targetElement.className == 'ag-paging-panel ag-unselectable' || targetElement.className == 'ag-center-cols-viewport') {
      this.gridApi.stopEditing();
    }
  }

  openLogDialog(node) {
    this.store.dispatch(GetBrandMapRecordChangeLog({ payload: { brandMapID: node.data.brandMapID } }));
    const logDialogRef = this.dialogRef.open(HistoryLogDialogComponent, {
      height: '100%',
      width: '100vw',
      maxWidth: '98vw',
      position: { top: '10% !important' },
      disableClose: true,
      data: {
        dialogTriggeredFor: 'BrandMapMaster',
        title: 'Brand Map',
        subTitle: ``,
        data: node.data,
        agGridOptions: BrandMappingChangelogGridOptions(30, this)
      }
    });
  }

  openCreateBrandMappingModal() {
    let dialogRef = this.dialogRef.open(CreateBrandMappingDialogComponent, {
      height: '400px',
      width: '650px',
      disableClose: true,
      position: { top: '10px' },
      data: { createdBy: this.userProfile.userName },
      autoFocus: false
    });
  }
  private listenDataChanges() {
    this.store
      .select(GetBrandMappingRecords$)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: BrandMappingResponse) => {
        if (item != null) {
          this.BrandMappingDataRes = JSON.parse(JSON.stringify(item));
          this.setDataInAgGrid(this.BrandMappingDataRes.records);
          this.BrandMappingDataRef = item.records;
          this.getModifiedRecords();
        } else {
          this.setDataInAgGrid([]);
        }
      });
  }

  private listenAutoAssignBrand() {
    this.store
      .select(getCreatedBrandCVForAssign)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: { autoAppendFor: autoAppendFor, data: BrandCVRecord }) => {

        if (item != null && item.autoAppendFor.appendFor === 'brandMasterCV') {
          const { id, appendFor } = item.autoAppendFor;
          const { brandID, brandname } = item.data;
          const rowNode = this.gridApi.getRowNode(Number(id) - 1);
          rowNode.setData({
            ...rowNode.data,
            ...{
              brandID: brandID,
              brandname: brandname
            }
          });
          this.getModifiedRecords();
        }
      });
  }



  private setDataInAgGrid(item: BrandMappingRecord[]) {
    if (item && item.length > 0) {
      this.rowCount = item.length;
      this.gridApi.setRowData(item);
      this.gridApi.hideOverlay();
    } else {
      this.gridApi.setRowData([]);
      this.gridApi.showNoRowsOverlay();
    }
  }

  private updateValue(node) {
    const data = this.BrandMappingDataRef.find((record: BrandMappingRecord) => record.brandID === node.data.brandID);

    if (typeof node.data.brandname === 'object') {
      node.data.brandID = node.data.brandname.id;
      node.data.brandname = node.data.brandname.value;
    }

    if (typeof node.data.manfName === 'object') {
      node.data.manfID = node.data.manfName.id;
      node.data.manfName = node.data.manfName.value;
      const topParent = this.topParentRecords.find((record) => record.childManfID === node.data.manfID);
      if (node.data.manfID === data.manfID) {
        node.data.topParentManfID = data.topParentManfID;
        node.data.topParentManfName = data.topParentManfName;
        node.data.parentManfID = data.parentManfID;
        node.data.parentManfName = data.parentManfName;
        node.data.childDisplayName = data.childDisplayName;
        node.data.parentDisplayName = data.parentDisplayName;
        node.data.topParentDisplayName = data.topParentDisplayName;
      } else {
        node.data.topParentManfID = topParent.topParentManfID;
        node.data.topParentManfName = topParent.topParentManfName;
        node.data.parentManfID = topParent.parentManfID;
        node.data.parentManfName = topParent.parentManfName;
        node.data.childDisplayName = topParent.childDisplayName;
        node.data.parentDisplayName = topParent.parentDisplayName;
        node.data.topParentDisplayName = topParent.topParentDisplayName;
      }
    }

    if (typeof node.data.submarketName === 'object') {
      node.data.submarketName = node.data.submarketName.value;
    }

    if (typeof node.data.marketName === 'object') {
      node.data.marketID = node.data.marketName.id;
      node.data.marketName = node.data.marketName.value;
      node.data.submarketName = this.getSubmarket(node.data.marketName);
    }

    // if(typeof node.data.submarketName === 'object') {
    //   node.data.marketID = node.data.submarketName.id;
    //   node.data.submarketName = node.data.submarketName.value;
    //   node.data.marketName = '';
    // }

    // if(typeof node.data.marketName === 'object') {
    //   node.data.marketName = node.data.marketName.value;
    // }

    const rowNode = this.gridApi.getRowNode(node.id);
    delete node.data['isModified'];
    delete node.data['isNewAdded'];
    //const { isNewAdded, ...refDataObject } = data;
    Object.keys(node.data).map((k) => (node.data[k] = typeof node.data[k] == 'string' ? node.data[k].trim() : node.data[k]));
    const isValueChanged = JSON.stringify(data) === JSON.stringify(node.data);
    rowNode.setData({ ...node.data, ...{ isModified: !isValueChanged } });
    this.cd.markForCheck();
    this.getModifiedRecords();
  }

  private getModifiedRecords() {
    const allRows = this.getAllRows();
    const filterRecords = allRows
      .filter((item: BrandMappingRecord) => item?.isModified && item.brandID && item.brandname && item.manfName && item.manfID && item.marketID && item.marketName && item.submarketName)
      .map(({ brandID, brandMapID, brandname, comments, isBrandMapActive, manfID, manfName, marketID, marketName, rank, submarketName }: BrandMappingRecord) => ({
        brandMapID,
        brandID,
        brandname,
        comments,
        isBrandMapActive,
        manfID,
        manfName,
        marketID,
        marketName,
        rank: Number(rank),
        submarketName
      }));

    const data = allRows.filter((item) => item?.isModified && item?.isModified === true);
    this.isNotingChangeOnPage = filterRecords.length > 0 ? !(data.length === filterRecords.length) : true;

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

  private OnEditIconsClicked(params) {
    this.gridApi.startEditingCell({
      rowIndex: params.rowIndex,
      colKey: 'brandName'
    });
  }
  private listenParentChildTopMapping() {
    this.manfStore
      .select(GetParentChildTopMap)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: parentChildTopMapping[] | null) => {
        this.topParentRecords = item;
      });

  }

  private openMarketMasterDialog(node, typeText: string = '') {
    let submarket = node.colDef.field === 'submarketName' ? typeText : '';
    const marketName = node.colDef.field === 'marketName' ? typeText : '';
    submarket = node.colDef.field === 'marketName' ? node.data.submarketName : submarket;

    let dialogRef = this.dialogRef.open(CreateMarketMasterComponent, {
      height: '400px',
      width: '500px',
      disableClose: true,
      position: { top: '10px' },
      data: { createdBy: this.userProfile.userName, name: submarket, marketName: marketName, appendToId: node.rowIndex + 1, appendFor: 'marketBrandMap' }
    });
  }

  private openParentChildDialog(node, text?: string) {
    this.dialogRef.open(CreateChildManfMasterComponent, {
      height: '400px',
      width: '500px',
      disableClose: true,
      position: { top: '10px' },
      data: { createdBy: this.userProfile.userName, value: text, appendToId: node.rowIndex + 1, appendFor: 'brandMapManf' }
    });
  }

  private listenForNewManf() {
    this.manfStore
      .select(getCratedManfRecord)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$), filter((data: any) => data != null))
      .subscribe((item: { autoAppendFor: autoAppendFor, data: any }) => {
        if (item.autoAppendFor.appendFor === 'brandMapManf') {
          const { id, appendFor } = item.autoAppendFor;
          const { childManfName, childManfID, childDisplayName, parentDisplayName, parentManfName, parentManfID, topParentDisplayName, topParentManfID, topParentManfName } = item.data;
          const rowNode = this.gridApi.getRowNode(Number(id) - 1);
          rowNode.setData({
            ...rowNode.data,
            ...{
              topParentManfID: topParentManfID,
              topParentManfName: topParentManfName,
              topParentDisplayName: topParentDisplayName,
              parentManfID: parentManfID,
              parentManfName: parentManfName,
              parentDisplayName: parentDisplayName,
              childDisplayName: childDisplayName,
              manfID: childManfID,
              manfName: childManfName,
            }
          });
          this.getModifiedRecords();
        }
      });
  }

  private listenAutoAssignMarket() {
    this.marketStore
      .select(getCreatedMarketForAssign)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: { autoAppendFor: autoAppendFor, data: MarketMasterModel }) => {
        if (item != null && item.autoAppendFor.appendFor === 'marketBrandMap') {
          const { id, appendFor } = item.autoAppendFor;
          const { marketID, marketName, submarketName } = item.data;
          const rowNode = this.gridApi.getRowNode(Number(id) - 1);
          rowNode.setData({
            ...rowNode.data,
            ...{
              marketID: marketID,
              marketName: marketName,
              submarketName: submarketName
            }
          });
          this.getModifiedRecords();
        }
      });
  }

  private getSubmarket(market: string): string {
    const submarket = this.activeMarketRecords.filter((item) => {
      return item.marketName.toLowerCase() === market.toLowerCase();
    })

    return submarket.length === 1 ? submarket[0].submarketName : '';
  }

  private getAllActiveMarket() {
    this.store
      .select(GetActiveMarketData$)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$), filter(item => item != null))
      .subscribe((item: MarketMasterModel[]) => {
        this.activeMarketRecords = item;
      });

  }

}


export interface BrandMappingUpdateModel {
  userName: string;
  records: BrandMasterUpdateData[]
}

export interface BrandMasterUpdateData {
  brandMapID: string;
  brandID: string;
  brandname: string;
  comments: string;
  isBrandMapActive: string;
  manfID: string;
  manfName: string;
  marketID: string;
  marketName: string;
  submarketName: string;
}