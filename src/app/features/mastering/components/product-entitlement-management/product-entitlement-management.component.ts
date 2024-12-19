import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BaseContainer } from 'src/app/features/item-to-product/containers/base.container';
import { AgGridTypeaheadComponent, AgGridActionCellComponent } from '@app-shared-components';
import { InlineInputEditComponent } from '../ag-grid-components/inline-input-edit/inline-input-edit.component';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ProductEntitlementOptions } from '../../model/manf-master-models/ag-grid-columns/product-entitlement.utils';
import { Store } from '@ngrx/store';
import {
  GetActiveBrandMaster,
  GetAllActiveChildManf,
  GetProductChangeLogRecords,
  GetProductEntitlementRecords,
  GetProductEntitlementRecordsFail,
  SearchUNSPSCCode,
  SetLoadingState,
  closeUploadDrawer,
  exportCSVFilePIM,
  getItemToProductDetails,
  getParentChildManfRecords,
  updateProductInformationRecords,
  uploadPIMCSV
} from '../../store/actions';
import { BrandMasterState, ProductEntitlementState, manfMasterState } from '../../store/reducers';
import { ProductEntitlementSearch } from '../../model/manf-master-models/interface/product-entitlement-filter-options';
import {
  GetLoadingStateProduct as prodSelectLoad,
  GetProductEntitlements$,
  GetSearchUnspscRecord$,
  GetLoadingStateProduct,
  closeUploadAtStatus,
  getProdManfSkuDuplicates$
} from '../../store/selectors/product-entitlement.selector';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import {
  ActiveBrandMapping,
  productEntitlementRecord,
  productEntitlementResponse,
  unspscResponse
} from '../../model/manf-master-models/interface/product-entitlement.interface';
import { Observable, Subject } from 'rxjs';
import { updatedByModel } from 'src/app/model/staging-curation/create-update.interface';
import { parentChildTopMapping } from '../../model/manf-master-models/interface/manf-master.interface';
import { GetParentChildTopMap, getCratedManfRecord } from '../../store/selectors';
import { HistoryLogDialogComponent } from '../../history-log-dialog/history-log-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateChildManfMasterComponent } from '../manufacture-master-search/create-child-manf-master/create-child-manf-master.component';
import { ProductEntitlementChangeLogOptions } from '../../model/manf-master-models/ag-grid-columns/product-infomation-changelog.const';
import { MessageService } from 'src/app/shared/services';
import { ApplicationState, getAppEnv, getWbDashboardRoles } from '@app-store';
import { MatDrawer } from '@angular/material/sidenav';
import { searchCriteriaInternal, ProductSearchCriteria } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { UploadFileValidation } from './../../../interface/upload-file-validation';
import { GetParentChildLoadingState, GetTopManfLoadingState } from './../../store/selectors/manf-master.selector';
import { ProductMnfSkuInfoDialogComponent } from './product-mnf-sku-info-dialog/product-mnf-sku-info-dialog.component';
import { CreateBrandCvComponent } from '../brand-master/brand-cv/create-brand-cv/create-brand-cv.component';
import { getCreatedBrandCVForAssign } from '../../store/selectors/brand-master.selector';
import { autoAppendFor } from '../../model/manf-master-models/interface/common.interface';
import { BrandCVRecord } from '../../model/manf-master-models/interface/brand-cv-filter-options';
import { ItemToProductGraphDetailsComponent } from './item-to-product-graph-details/item-to-product-graph-details.component';

@Component({
  selector: 'app-product-entitlement-management',
  templateUrl: './product-entitlement-management.component.html',
  styleUrls: ['./product-entitlement-management.component.scss']
})
export class ProductEntitlementManagementComponent extends BaseContainer implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;

  loading$: boolean = true;
  loadingParentChild$: Observable<boolean> = this.manfStore.select(GetParentChildLoadingState);
  loadingParentChildRel$: Observable<boolean> = this.manfStore.select(GetTopManfLoadingState);
  exportBtnTooltip = 'Only those products which are not already checked out will be available for checkout.';

  overlayLoadingForAgGrid: string = '<span class="ag-overlay-loading-center">Fetching Records...</span>';
  searchCriteriaOptionsData: searchCriteriaInternal[] = ProductEntitlementSearch();
  gridOptions: GridOptions
  gridApi: GridApi | any;
  rowCount: number = 0;
  isNotingChangeOnPage: boolean = true;
  pageSize: number = 20;
  pageSizeOptions: number[] = [20, 50, 100];
  frameworkComponents = {
    inlineEdit: InlineInputEditComponent,
    typeHeadEditor: AgGridTypeaheadComponent,
    actionCellRenderer: AgGridActionCellComponent
  };
  public readonly destroyed$ = new Subject<boolean>();
  productEntitlementRef: productEntitlementRecord[] = [];
  productEntitlementRes: productEntitlementResponse;
  activeBrandsMapping: ActiveBrandMapping[];
  topParentRecords: parentChildTopMapping[];
  isReadOnlyAccess: boolean = false;
  isDrawerOpened = false;
  fileValidation: UploadFileValidation = {
    loadingState$: this.productStore.select(GetLoadingStateProduct),
    fileName: `Product_Info_Management_UP_`,
    fileNameShouldHave: `Product_Info_Management_UP_`,
    submitBtnText: 'Submit File'
  };
  searchCriteriaReference: any;
  userRole: string;
  env: string = '';
  editedChanges: productInfoUpdate;
  duplicateModelRef: MatDialogRef<ProductMnfSkuInfoDialogComponent>;

  constructor(
    private readonly brandMaster: Store<BrandMasterState>,
    private readonly manfStore: Store<manfMasterState>,
    private readonly productStore: Store<ProductEntitlementState>,
    private dialogRef: MatDialog,
    private readonly messageService: MessageService,
    private readonly appStore: Store<ApplicationState>,
    private cd: ChangeDetectorRef
  ) {
    super();
    this.getLoggedInUserRoles();
  }

  ngOnInit() {
    this.getAppRunningEnv();
    this.userProfile = BaseContainer.prototype.userProfile;
    this.gridOptions = ProductEntitlementOptions(30, this, false, this.userProfile.email);
    this.manfStore.dispatch(GetAllActiveChildManf());
    this.manfStore.dispatch(getParentChildManfRecords());
    this.brandMaster.dispatch(GetActiveBrandMaster());
    this.listenParentChildTopMapping();
    this.listenSideUploadClose();
    this.listenProdManfSkuDuplicates()
  }
  ngOnDestroy() {
    this.productStore.dispatch(SetLoadingState({ status: true }));
    this.productStore.dispatch(GetProductEntitlementRecordsFail({ payload: null }));
    this.gridApi.destroy();
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
  searchProductEntitlement(e: ProductSearchCriteria) {
    this.loading$ = true;
    e.initiatedByUserEmail = this.userProfile.email;
    e.userRole = this.userRole;
    this.searchCriteriaReference = e;
    this.productStore.dispatch(GetProductEntitlementRecords({ payload: e }));
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridApi.showLoadingOverlay();
    this.gridApi.paginationSetPageSize(20);
    this.listenDataChanges();
    this.listenSearchUnspscRecordsChanges();
    this.checkDeviceWithAndFitColumn(this.gridApi);
    this.listenForNewManf();
    this.listenLoadingState();
    this.listenAutoAssignBrand();
  }

  checkDeviceWithAndFitColumn(grid) {
    if (grid.columnModel.bodyWidth < window.innerWidth - 60) {
      this.gridApi.sizeColumnsToFit();
    }
  }

  saveEditedChanges() {
    this.loading$ = true;
    this.editedChanges = {
      updatedBy: this.userProfile?.userName,
      updatedByEmail: this.userProfile?.email,
      manfSKUCheck: "Y",
      records: this.getModifiedRecords(),
      updatedRecords: this.getAllRows().filter((item) => item?.isModified)
    };
    this.productStore.dispatch(updateProductInformationRecords({ payload: this.editedChanges }));
  }

  async updateValue(node, isUnspscModified = false) {
    let isUnspscChange = false;
    const rowNode = this.gridApi.getRowNode(node.rowIndex);
    const data = this.productEntitlementRef.find((record) => record.prodID === node.data.prodID);
    if (typeof node.data.manfName === 'object') {
      node.data.manfID = node.data.manfName.id;
      node.data.manfName = node.data.manfName.value;
      const topParent = this.topParentRecords.find((record) => record.childManfID === node.data.manfID);

      if (node.data.manfID === data.manfID) {
        node.data.topParentManfID = data.topParentManfID;
        node.data.topParentManfName = data.topParentManfName;
        node.data.topParentManfDisplayName = data.topParentManfDisplayName;
        node.data.parentManfID = data.parentManfID;
        node.data.parentManfName = data.parentManfName;
        node.data.parentManfDisplayName = data.parentManfDisplayName;
        node.data.manfDisplayName = data.manfDisplayName;
        node.data.brandname = data.brandname;
        node.data.brandMapIDName = data.brandMapIDName;
      } else {
        node.data.topParentManfID = topParent.topParentManfID;
        node.data.topParentManfName = topParent.topParentManfName;
        node.data.topParentManfDisplayName = topParent.topParentDisplayName;
        node.data.parentManfID = topParent.parentManfID;
        node.data.parentManfName = topParent.parentManfName;
        node.data.parentManfDisplayName = topParent.parentDisplayName;
        node.data.manfDisplayName = topParent.childDisplayName;
        node.data.brandname = null;
        node.data.brandMapIDName = '';
      }
    }
    isUnspscChange = data.unspscCode != node.data.unspscCode;
    if (isUnspscModified) {
      delete rowNode.data['invalidUNSPSC'];
      if (isUnspscChange) {
        node.data.unspscDesc = '';
        node.data.unspscSource = '';
        node.data.unspscMarketID = '';
        node.data.unspscMarketName = '';
        node.data.unspscSubmarketName = '';
        node.data.isUNSPSCUpdated = 'Y'
      } else {
        node.data.unspscSource = data.unspscSource;
        node.data.unspscDesc = data.unspscDesc;
        node.data.unspscMarketID = data.unspscMarketID;
        node.data.unspscMarketName = data.unspscMarketName;
        node.data.unspscSubmarketName = data.unspscSubmarketName;
        node.data.isUNSPSCUpdated = 'N'
      }
    }
    if (node.data.brandname?.id !== data.brandname?.id) {
      if (node.data.brandname) {
        node.data.brandMapIDName = `${node.data.brandname.brandManfID}||||${node.data.brandname.id}####${node.data.brandname.value}`;
      } else {
        node.data.brandMapIDName = '';
      }
    } else {
      node.data.brandMapIDName = data.brandMapIDName;
      node.data.brandname = data.brandname;
    }

    delete node.data['isLoading'];
    const { isNewAdded, isModified, ...refDataObject } = data;
    Object.keys(node.data).map((k) => (node.data[k] = typeof node.data[k] == 'string' ? node.data[k].trim() : node.data[k]));
    delete node.data['isModified'];
    delete node.data['isNewAdded'];

    const isNotingChangeOnPage = JSON.stringify(refDataObject) === JSON.stringify(node.data);
    delete node.data['isModified'];

    if (isUnspscModified && isUnspscChange && node.data.unspscCode != '' && node.data.unspscCode.length === 8) {
      if (node.data.unspscCode.slice(-2).toString() !== '00') {
        node.data.isLoading = true;
        this.productStore.dispatch(
          SearchUNSPSCCode({ payload: { UNSPSCCode: node.data.unspscCode, prodID: node.data.prodID, nodeId: node.id } })
        );
      } else {
        this.messageService.showToast('Please enter Level 4 / Commodity level UNSPSC', 'error');
        node.data.invalidUNSPSC = true;
      }
    }

    rowNode.setData({ ...node.data, ...{ isModified: !isNotingChangeOnPage } });

    this.getModifiedRecords();
  }

  changePaginationSize(value) {
    this.pageSize = value === 0 ? 20 : value;
    this.gridApi.paginationSetPageSize(this.pageSize);
  }

  setLoading(e?) {
    if (this.productEntitlementRef.length > 0 && e.newData === false && (!e.newPage || e.newPage)) {
      this.loading$ = true;
      setTimeout(() => {
        this.loading$ = false;
      }, 1300);
    }
  }

  onSideNavClosed() {
    this.productStore.dispatch(closeUploadDrawer({ payload: 0 }));
    this.drawer.close();
    this.isDrawerOpened = false;
    this.fileValidation = {
      loadingState$: this.productStore.select(GetLoadingStateProduct),
      fileName: `Product_Info_Management_UP_`,
      fileNameShouldHave: `Product_Info_Management_UP_`,
      submitBtnText: 'Submit File'
    };
  }

  onSubmitFileUpload(e) {
    // this.loading$ = true;
    this.productStore.dispatch(uploadPIMCSV({ payload: e }))
  }
  private openParentChildDialog(node, text?: string) {
    this.dialogRef.open(CreateChildManfMasterComponent, {
      height: '400px',
      width: '500px',
      disableClose: true,
      position: { top: '10px' },
      data: { createdBy: this.userProfile.userName, value: text, appendToId: node.rowIndex + 1, appendFor: 'productEntitlement' }
    });
  }

  downloadPIMFile() {
    this.loading$ = true;
    this.productStore.dispatch(exportCSVFilePIM({ payload: this.searchCriteriaReference }))
  }

  private openLogDialog(node) {
    this.loading$ = true;
    this.productStore.dispatch(GetProductChangeLogRecords({ payload: { productID: node.data.prodID } }));
    const logDialogRef = this.dialogRef.open(HistoryLogDialogComponent, {
      height: '100%',
      width: '100vw',
      maxWidth: '98vw',
      position: { top: '10px !important' },
      disableClose: true,
      data: {
        dialogTriggeredFor: 'ProductInfoLog',
        title: 'Product Information',
        subTitle: ``,
        data: node.data,
        agGridOptions: ProductEntitlementChangeLogOptions(30, this)
      }
    });
    return false;
  }

  private openI2PDetails(node) {
    this.loading$ = true;
    this.productStore.dispatch(getItemToProductDetails({ payload: { productID: node.data.prodID } }));
    const logDialogRef = this.dialogRef.open(ItemToProductGraphDetailsComponent, {
      height: '100%',
      width: '100vw',
      maxWidth: '98vw',
      position: { top: '10px !important' },
      disableClose: true,
      data: { prodId: node.data.prodID }
    });
    return false;
  }

  private listenDataChanges() {
    this.productStore
      .select(GetProductEntitlements$)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((item) => item != null)
      )
      .subscribe((item: any) => {
        if (item != null) {
          this.productEntitlementRes = {
            totalRecords: item.totalRecords,
            records: item.records.map((record) => {
              return {
                ...record,
                brandname: record.brandMapIDName ? this.convertStringToArrayBrandMap(record.brandMapIDName) : null,
                unspscCodeHist: record.unspscCode,
                unspscSourceHist: record.unspscSource,
                isUNSPSCUpdated: "N",
                userRole: this.userRole
              };
            })
          };
          this.setDataInAgGrid(this.productEntitlementRes.records);
          this.productEntitlementRef = JSON.parse(JSON.stringify(this.productEntitlementRes.records));
          this.getModifiedRecords();
          item?.records.length === 0 ? this.gridApi.showNoRowsOverlay() : this.gridApi.hideOverlay();
        }
      });
  }

  private listenSearchUnspscRecordsChanges() {
    this.productStore
      .select(GetSearchUnspscRecord$)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: unspscResponse) => {
        if (item != null) {
          const { initiatedData, responseData } = item;
          const { nodeId } = initiatedData;
          let rowNode = this.gridApi.getRowNode(nodeId);
          delete rowNode.data['isLoading'];
          delete rowNode.data['invalidUNSPSC'];
          if (responseData) {
            rowNode.setData({
              ...rowNode.data,
              ...{
                unspscMarketID: responseData.marketID,
                unspscMarketName: responseData.marketName,
                unspscSubmarketName: responseData.submarketName,
                unspscDesc: responseData.unspscDesc,
                unspscSource: 'MANUAL',
                isUNSPSCUpdated: 'Y'
              }
            });
          } else {
            const data = this.productEntitlementRef.find((record) => record.prodID === rowNode.data.prodID);
            delete rowNode.data['isNewAdded'];
            const { isNewAdded, ...refDataObject } = data;
            Object.keys(rowNode.data).map(
              (k) => (rowNode.data[k] = typeof rowNode.data[k] == 'string' ? rowNode.data[k].trim() : rowNode.data[k])
            );
            const dataToUpdate = {
              ...rowNode.data,
              ...{
                invalidUNSPSC: true,
                isUNSPSCUpdated: 'N'
              }
            };
            rowNode.setData({ ...dataToUpdate });
            this.getModifiedRecords();
          }
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

  //&& item.unspscCode ? item.unspscCode.length === 8 : false
  private getModifiedRecords(): updateProduct[] {
    const allRows = this.getAllRows();

    const filterRecords = allRows
      .filter(
        (item: productEntitlementRecord) => item.manfName && item.prodDesc && item.prodSKU && item.isModified && this.checkUnspscCode(item)
      )
      .map((item: productEntitlementRecord) => ({
        brandMapIDBrandID:
          item.brandname
            ? `${item.brandname.brandManfID}###${item.brandname.id}`
            : '',
        comments: item.comments,
        id: item.id,
        manfID: item.manfID,
        manfName: item.manfName,
        prodDesc: item.prodDesc,
        prodID: item.prodID,
        prodSKU: item.prodSKU,
        unspscCode: item.unspscCode,
        unspscSource: item.unspscSource,
        customFlag: item.customFlag,
        kptFlag: item.kptFlag,
        privateFlag: item.privateFlag,
        isUNSPSCUpdated: item?.isUNSPSCUpdated || 'N'
      }));

    const data = allRows.filter((item) => item.isModified);
    this.isNotingChangeOnPage = data.length > 0 ? !(data.length === filterRecords.length) : true;
    return filterRecords;
  }

  private checkUnspscCode(item: productEntitlementRecord): boolean {
    if (item?.invalidUNSPSC) return false;

    return item.unspscCode ? item.unspscCode.length === 8 : true;
  }
  private getAllRows(): any {
    let rowData = [];
    this.gridApi.forEachNode((node) => rowData.push(node.data));
    return rowData;
  }

  private markAsNotified(event: any) {
    const rowNode = this.gridApi.getRowNode(event.node.id);
    rowNode.setData({ ...rowNode.data, isNewAdded: false });
    //this.gridApi.redrawRows({rowNode});
    this.cd.detectChanges();
  }

  private convertStringToArrayBrandMap(value: string): any {
    const data: any = value.split('~~~~~~~~~').map((item) => {
      return item;
    });
    const brand = data[0]?.replace('||||', ':').replace('####', ':').split(':');
    return { brandManfID: brand[0].toString(), id: brand[1], value: brand[2] };
  }

  private listenParentChildTopMapping() {
    this.manfStore
      .select(GetParentChildTopMap)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: parentChildTopMapping[] | null) => {
        this.topParentRecords = item;
      });
  }

  private listenLoadingState() {
    this.productStore
      .select(prodSelectLoad)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: boolean) => {
        setTimeout(() => {
          this.loading$ = item;
        }, 1300);
      });
  }

  private listenForNewManf() {
    this.manfStore
      .select(getCratedManfRecord)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((data: any) => data != null)
      )
      .subscribe((item: any) => {
        const { id, appendFor } = item.autoAppendFor;
        const {
          childManfName,
          childManfID,
          childDisplayName,
          parentDisplayName,
          parentManfName,
          parentManfID,
          topParentDisplayName,
          topParentManfID,
          topParentManfName
        } = item.data;
        const rowNode = this.gridApi.getRowNode(id - 1);
        rowNode.setData({
          ...rowNode.data,
          ...{
            topParentManfID: topParentManfID,
            topParentManfName: topParentManfName,
            topParentManfDisplayName: topParentDisplayName,
            parentManfID: parentManfID,
            parentManfName: parentManfName,
            parentManfDisplayName: parentDisplayName,
            manfDisplayName: childDisplayName,
            manfID: childManfID,
            manfName: childManfName,
            brandname: [],
            brandMapIDName: ''
          }
        });
        this.getModifiedRecords();
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
        //&&  roles.indexOf('Mastering_Product') === -1 && roles.indexOf('Mastering_Product') === -1 && roles.indexOf('Mastering_WFadmin') === -1
        if (
          roles.indexOf('Mastering_Product_Read_Only') !== -1 &&
          roles.indexOf('Mastering_Product') === -1 &&
          roles.indexOf('Mastering_Product_Admin') === -1 &&
          roles.indexOf('Mastering_Manager') === -1 &&
          roles.indexOf('Mastering_WFadmin') === -1
        ) {
          this.isReadOnlyAccess = true;
          this.userRole = 'READ_ONLY';
          this.gridOptions = ProductEntitlementOptions(30, this, true, '');
        } else if (roles.indexOf('Mastering_Product_Admin') !== -1) {
          this.userRole = 'ADMIN';
        } else {
          this.userRole = 'REGULAR';
        }
      });
  }

  private listenSideUploadClose() {
    this.productStore.select(closeUploadAtStatus)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((time: any) => time)
      )
      .subscribe((r) => {
        this.onSideNavClosed();
      });
  }

  private getAppRunningEnv() {
    const base_url = window.location.href;
    if (base_url.includes('-dev.dev')) {
      this.env = 'dev';
    } else if (base_url.includes('-int.int')) {
      this.env = 'int';
    } else if (base_url.includes('-uat.uat')) {
      this.env = 'uat';
    } else if (base_url.includes('-prod.prod')) {
      this.env = 'prod';
    } else {
      this.env = 'dev';
    }

  }

  private listenProdManfSkuDuplicates() {
    this.manfStore
      .select(getProdManfSkuDuplicates$)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: any[]) => {
        if (item && item.length > 0) {
          this.openManfSkuDuplicateDialog(item);
        } else if (this.duplicateModelRef) {
          this.duplicateModelRef.close();
        }
      });
  }

  private openManfSkuDuplicateDialog(data) {
    this.duplicateModelRef = this.dialogRef.open(ProductMnfSkuInfoDialogComponent, {
      width: '900px',
      data: { editedRecords: this.editedChanges, duplicatesRecords: data, initiatedByUserEmail: this.userProfile.email, initiatedByUserName: this.userProfile.userName },
      position: { top: '20px' },
      height: '300px',
      maxHeight: '600px',
      disableClose: true,
    });
    this.duplicateModelRef.afterClosed().subscribe(e => {
      if (e) {
        const allRows = this.getAllRows();
        this.setDataInAgGrid(JSON.parse(JSON.stringify(allRows)));
        this.getModifiedRecords();
      }

    })
  }

  private openBrandMasterDialog(node, text?: string) {
    let dialogRef = this.dialogRef.open(CreateBrandCvComponent, {
      height: '400px',
      width: '500px',
      disableClose: true,
      position: { top: '10px' },
      data: { createdBy: this.userProfile.userName, name: text, appendToId: node.rowIndex + 1, appendFor: 'productEntitlement' }
    });
  }

  private listenAutoAssignBrand() {
    this.brandMaster
      .select(getCreatedBrandCVForAssign)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: { autoAppendFor: autoAppendFor, data: BrandCVRecord }) => {
        if (item != null && item.autoAppendFor.appendFor === 'productEntitlement') {
          const { id, appendFor } = item.autoAppendFor;
          const { brandID, brandname } = item.data;
          const rowNode = this.gridApi.getRowNode(Number(id) - 1);
          rowNode.data.brandname.push({ brandID: brandID, brandname: brandname });
          rowNode.setData({
            ...rowNode.data
          });
          this.getModifiedRecords();
        }
      });
  }

}

export interface productInfoUpdate extends updatedByModel {
  records: updateProduct[];
  updatedRecords: productEntitlementRecord[];
  updatedByEmail: string;
  manfSKUCheck: string
}

interface updateProduct {
  brandMapIDBrandID: string;
  comments: string;
  customFlag: string;
  id: number;
  kptFlag: string;
  manfID: string;
  manfName: string;
  privateFlag: string;
  prodDesc: string;
  prodID: number;
  prodSKU: string;
  unspscCode: string;
  unspscSource: string;
}
