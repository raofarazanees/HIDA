import { createAction, props } from '@ngrx/store';
import { ProductSearchCriteria } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { ActiveBrandMapping, ItemToProductGraphDetails, ItemToProductGraphDetailsResponse, SearchUnspsc, productEntitlementRecord, productEntitlementResponse, unspscResponse } from '../../model/manf-master-models/interface/product-entitlement.interface';
import { MarketMasterModel } from '../../model/manf-master-models/interface/unspsc-master.interface';
import { productInfoUpdate } from '../../components/product-entitlement-management/product-entitlement-management.component';

export enum ProductEnum {
  GET_PRODUCT_ENTITLEMENT_RECORDS = '[Mastering Module] Get Product ENTITLEMENT Records',
  GET_PRODUCT_ENTITLEMENT_RECORDS_SUCCESS = '[Mastering Module] Get Product ENTITLEMENT Records Success',
  GET_PRODUCT_ENTITLEMENT_RECORDS_FAIL = '[Mastering Module] Get Product ENTITLEMENT Fail',
  SEARCH_UNSPSC_CODE_MARKET = '[MASTERING_MODULE] Search UNSPSC Code and Market',
  SEARCH_UNSPSC_CODE_MARKET_SUCCESS = '[MASTERING_MODULE] Search UNSPSC Code and Market Success',
  SEARCH_UNSPSC_CODE_MARKET_FAIL = '[MASTERING_MODULE] Search UNSPSC Code and Market Fail',
  GET_BRAND_MAPPING_RECORDS = '[Mastering Module] Get Active Brand Mapping records',
  GET_BRAND_MAPPING_RECORDS_SUCCESS = '[Mastering Module] Get Active Brand Mapping records Success',
  GET_BRAND_MAPPING_RECORDS_FAIL = '[Mastering Module] Get Active Brand Mapping records Fail',
  UPDATE_PRODUCT_INFO_RECORDS = '[Mastering Module] Get Product records',
  UPDATE_PRODUCT_INFO_RECORDS_SUCCESS = '[Mastering Module] Get Product records Success',
  UPDATE_PRODUCT_INFO_RECORDS_FAIL = '[Mastering Module] Get Product records Fail',
  GET_PRODUCT_CHANGE_LOG_RECORDS = '[Mastering Module] Get Product Change Log records',
  GET_PRODUCT_CHANGE_LOG_RECORDS_SUCCESS = '[Mastering Module] Get Product Change Log records Success',
  GET_PRODUCT_CHANGE_LOG_RECORDS_FAIL = '[Mastering Module] Get Product Change Log records Fail',
  SET_LOADING_STATE = '[Mastering Module] Set Loading State',
  EXPORT_PIM_RECORDS_CSV = '[Mastering Module] Export PIM records CSV',
  EXPORT_PIM_RECORDS_CSV_SUCCESS = '[Mastering Module]  Export PIM records CSV Success',
  EXPORT_PIM_RECORDS_CSV_FAIL = '[Mastering Module]  Export PIM records CSV Fail',
  PIM_UPLOAD_CSV = '[Mastering Module] Upload PIM records CSV',
  PIM_UPLOAD_CSV_SUCCESS = '[Mastering Module]  Upload PIM records CSV Success',
  PIM_UPLOAD_CSV_FAIL = '[Mastering Module]  Upload PIM records CSV Fail',
  CLOSE_UPLOAD_DRAWER_PIM = '[Mastering Module]  Close Upload Drawer PIM',
  PRODUCT_MANF_SKU_DUPLICATE_RECORDS = '[Mastering Module] Product Manf SKU Duplicate Records',
  GET_DUPLICATE_PRODUCT_RECORDS= '[Mastering Module] Get Product Duplicate Records by Prod ID',
  GET_DUPLICATE_PRODUCT_RECORDS_SUCCESS = '[Mastering Module] Get Product Duplicate Records by Prod ID Success',
  GET_DUPLICATE_PRODUCT_RECORDS_Fail = '[Mastering Module] Get Product Duplicate Records by Prod ID Fail',
  GET_ITEM_TO_PRODUCT_DETAILS= '[Mastering Module] Get Item To Product Details by Prod ID',
  GET_ITEM_TO_PRODUCT_DETAILS_SUCCESS = '[Mastering Module] Get Item To Product Details by Prod ID Success',
  GET_ITEM_TO_PRODUCT_DETAILS_Fail = '[Mastering Module] Get Item To Product Details by Prod ID Fail',
  GET_I2P_GRAPH_HISTORY_CHANGE_LOG = '[MASTERING_MODULE] Get I2P Graph History Change Log',
  GET_I2P_GRAPH_HISTORY_CHANGE_LOG_SUCCESS = '[MASTERING_MODULE] Get I2P Graph History Change Log Success',
  GET_I2P_GRAPH_HISTORY_CHANGE_LOG_FAIL = '[MASTERING_MODULE] Get I2P Graph History Change Log Fail'

}

export const GetProductEntitlementRecords = createAction(
  ProductEnum.GET_PRODUCT_ENTITLEMENT_RECORDS,
  props<{ payload: ProductSearchCriteria }>()
);
export const GetProductEntitlementRecordsSuccess = createAction(
  ProductEnum.GET_PRODUCT_ENTITLEMENT_RECORDS_SUCCESS,
  props<{ payload: productEntitlementResponse }>()
);
export const GetProductEntitlementRecordsFail = createAction(ProductEnum.GET_PRODUCT_ENTITLEMENT_RECORDS_FAIL, props<{ payload: any }>());

export const SearchUNSPSCCode = createAction(ProductEnum.SEARCH_UNSPSC_CODE_MARKET, props<{payload: SearchUnspsc}>());
export const SearchUNSPSCCodeSuccess = createAction(ProductEnum.SEARCH_UNSPSC_CODE_MARKET_SUCCESS, props<{payload:unspscResponse}>());
export const SearchUNSPSCCodeFail = createAction(ProductEnum.SEARCH_UNSPSC_CODE_MARKET_FAIL, props<{payload: any}>());

export const GetActiveBrandMapping = createAction(ProductEnum.GET_BRAND_MAPPING_RECORDS);
export const GetActiveBrandMappingSuccess = createAction(ProductEnum.GET_BRAND_MAPPING_RECORDS_SUCCESS, props<{payload:ActiveBrandMapping[]}>());
export const GetActiveBrandMappingFail = createAction(ProductEnum.GET_BRAND_MAPPING_RECORDS_FAIL, props<{payload: any}>());

export const updateProductInformationRecords = createAction(ProductEnum.UPDATE_PRODUCT_INFO_RECORDS, props<{payload: productInfoUpdate}>());
export const updateProductInformationRecordsSuccess = createAction(ProductEnum.UPDATE_PRODUCT_INFO_RECORDS_SUCCESS, props<{payload:{response:productEntitlementRecord[],localUpdate:productEntitlementRecord[],updatedBy: string}}>());
export const updateProductInformationRecordsFail = createAction(ProductEnum.UPDATE_PRODUCT_INFO_RECORDS_FAIL, props<{payload: any}>());

export const GetProductChangeLogRecords = createAction(ProductEnum.GET_PRODUCT_CHANGE_LOG_RECORDS, props<{payload: {productID:number}}>());
export const GetProductChangeLogRecordsSuccess = createAction(ProductEnum.GET_PRODUCT_CHANGE_LOG_RECORDS_SUCCESS, props<{payload: productEntitlementRecord[]}>());
export const GetProductChangeLogRecordsFail = createAction(ProductEnum.GET_PRODUCT_CHANGE_LOG_RECORDS_FAIL, props<{payload: any}>());

export const SetLoadingState = createAction(ProductEnum.SET_LOADING_STATE, props<{status: boolean}>());

export const exportCSVFilePIM = createAction(ProductEnum.EXPORT_PIM_RECORDS_CSV, props<{payload:ProductSearchCriteria}>());
export const exportCSVFilePIMSuccess = createAction(ProductEnum.EXPORT_PIM_RECORDS_CSV_SUCCESS);
export const exportCSVFilePIMFail = createAction(ProductEnum.EXPORT_PIM_RECORDS_CSV_FAIL);

export const uploadPIMCSV = createAction(ProductEnum.PIM_UPLOAD_CSV, props<{payload:any}>());
export const uploadPIMCSVSuccess = createAction(ProductEnum.PIM_UPLOAD_CSV_SUCCESS);
export const uploadPIMCSVFail = createAction(ProductEnum.PIM_UPLOAD_CSV_FAIL);

export const closeUploadDrawer = createAction(ProductEnum.CLOSE_UPLOAD_DRAWER_PIM, props<{ payload: any }>());

export const productManfSkuDuplicateRecords = createAction(ProductEnum.PRODUCT_MANF_SKU_DUPLICATE_RECORDS, props<{ payload: any }>());

export const getDuplicateProductRecords = createAction(ProductEnum.GET_DUPLICATE_PRODUCT_RECORDS, props<{ payload: any }>());
export const getDuplicateProductRecordsSuccess = createAction(ProductEnum.GET_DUPLICATE_PRODUCT_RECORDS_SUCCESS, props<{ payload: any }>());
export const getDuplicateProductRecordsFail = createAction(ProductEnum.GET_DUPLICATE_PRODUCT_RECORDS_Fail, props<{ payload: any }>());


export const GetI2PGraphHistoryChangeLog = createAction(ProductEnum.GET_I2P_GRAPH_HISTORY_CHANGE_LOG, props<{ payload: any }>());
export const GetI2PGraphHistoryChangeLogSuccess = createAction(ProductEnum.GET_I2P_GRAPH_HISTORY_CHANGE_LOG_SUCCESS, props<{ payload: any }>());
export const GetI2PGraphHistoryChangeLogFail = createAction(ProductEnum.GET_I2P_GRAPH_HISTORY_CHANGE_LOG_FAIL, props<{ payload: any }>());



export const getItemToProductDetails = createAction(ProductEnum.GET_ITEM_TO_PRODUCT_DETAILS, props<{payload: {productID:string}}>());
export const getItemToProductDetailsSuccess = createAction(ProductEnum.GET_ITEM_TO_PRODUCT_DETAILS_SUCCESS, props<{ payload: any }>());
export const getItemToProductDetailsFail = createAction(ProductEnum.GET_ITEM_TO_PRODUCT_DETAILS_Fail, props<{ payload: any }>());
