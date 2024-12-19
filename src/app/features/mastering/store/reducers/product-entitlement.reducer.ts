import { Action, createReducer, on } from '@ngrx/store';
import {
  ProductEntitlementState,
  initialProductState,
  productEntitlementRecord
} from '../../model/manf-master-models/interface/product-entitlement.interface';
import {
  GetActiveBrandMappingFail,
  GetActiveBrandMappingSuccess,
  GetProductChangeLogRecords,
  GetProductChangeLogRecordsFail,
  GetProductChangeLogRecordsSuccess,
  GetProductEntitlementRecords,
  GetProductEntitlementRecordsFail,
  GetProductEntitlementRecordsSuccess,
  SearchUNSPSCCode,
  SearchUNSPSCCodeFail,
  SearchUNSPSCCodeSuccess,
  SetLoadingState,
  closeUploadDrawer,
  exportCSVFilePIM,
  exportCSVFilePIMFail,
  exportCSVFilePIMSuccess,
  getDuplicateProductRecords,
  getDuplicateProductRecordsFail,
  getDuplicateProductRecordsSuccess,
  getItemToProductDetails,
  getItemToProductDetailsFail,
  getItemToProductDetailsSuccess,
  productManfSkuDuplicateRecords,
  updateProductInformationRecords,
  updateProductInformationRecordsFail,
  updateProductInformationRecordsSuccess,
  uploadPIMCSV,
  uploadPIMCSVFail,
  uploadPIMCSVSuccess,
  GetI2PGraphHistoryChangeLog,
  GetI2PGraphHistoryChangeLogSuccess,
  GetI2PGraphHistoryChangeLogFail,
} from '../actions';
import * as moment from 'moment';

const featureReducer = createReducer(
  initialProductState,
  on(GetProductEntitlementRecords, (state) => ({ ...state, loadingState: { loading: true }, productEntitlementRecord: null })),
  on(GetProductEntitlementRecordsSuccess, (state, action) => ({
    ...state,
    loadingState: { loading: false },
    productEntitlementRecord: action.payload
  })),
  on(GetProductEntitlementRecordsFail, (state) => ({ ...state, loadingState: { loading: false }, productEntitlementRecord: null })),
  on(SearchUNSPSCCode, (state) => ({ ...state,unspscSearchRecord:null })),
  on(SearchUNSPSCCodeSuccess, (state, action) => ({ ...state,unspscSearchRecord:action.payload })),
  on(SearchUNSPSCCodeFail, (state,action) => ({ ...state,unspscSearchRecord:action.payload })),
  on(GetActiveBrandMappingSuccess, (state, action) => ({ ...state,activeBrandMappings:action.payload })),
  on(GetActiveBrandMappingFail, (state,action) => ({ ...state,activeBrandMappings:[...state.activeBrandMappings] })),
  on(updateProductInformationRecords, (state,action) => ({ ...state,loadingState:{loading:true} })),
  on(updateProductInformationRecordsSuccess, (state, action) => ({ ...state,loadingState:{loading:false},productEntitlementRecord: {
    ...state.productEntitlementRecord,
    records: reMappedUpdatedRecords(action.payload.response,action.payload.localUpdate,action.payload.updatedBy, JSON.parse(JSON.stringify(state.productEntitlementRecord.records)))
  } })),
  on(updateProductInformationRecordsFail, (state,action) => ({ ...state,loadingState:{loading:false} })),
  on(GetProductChangeLogRecords, (state,action) => ({ ...state,loadingState:{loading:true},productChangeLogRecords:null })),
  on(GetProductChangeLogRecordsSuccess, (state,action) => ({ ...state,loadingState:{loading:false},productChangeLogRecords:action.payload })),
  on(GetProductChangeLogRecordsFail, (state,action) => ({ ...state,loadingState:{loading:false},productChangeLogRecords:null })),
  on(SetLoadingState,(state,action) => ({ ...state,loadingState:{loading:action.status}})),
  on(exportCSVFilePIM, (state,action) => ({ ...state,loadingState:{loading:true}})),
  on(exportCSVFilePIMSuccess, (state,action) => ({ ...state,loadingState:{loading:false}})),
  on(exportCSVFilePIMFail, (state,action) => ({ ...state,loadingState:{loading:false} })),
  on(uploadPIMCSV, (state,action) => ({ ...state,loadingState:{loading:true}})),
  on(uploadPIMCSVSuccess, (state,action) => ({ ...state,loadingState:{loading:false}})),
  on(uploadPIMCSVFail, (state,action) => ({ ...state,loadingState:{loading:false} })),
  on(closeUploadDrawer, (state, action) => ({ ...state, closeUploadDrawerPim:action.payload  })),
  on(productManfSkuDuplicateRecords, (state, action) => ({ ...state,loadingState:{loading:false},prodManfSkuDuplicateRecords:action.payload})),
  on(getDuplicateProductRecords, (state) => ({ ...state, loadingState: { loading: true }, productDuplicateList: null })),
  on(getDuplicateProductRecordsSuccess, (state, action) => ({
    ...state,
    loadingState: { loading: false },
    productDuplicateList: action.payload
  })),
  on(getDuplicateProductRecordsFail, (state) => ({ ...state, loadingState: { loading: false }, productDuplicateList: null })),

  on(GetI2PGraphHistoryChangeLog, (state) => ({ ...state, loadingState: { loading: true }, I2PGrahHistoryChangeLogRecords: null })),
  on(GetI2PGraphHistoryChangeLogSuccess, (state, action) => ({ ...state, loadingState: { loading: false }, I2PGrahHistoryChangeLogRecords: action.payload })),
  on(GetI2PGraphHistoryChangeLogFail, (state) => ({ ...state, loadingState: { loading: false }, I2PGrahHistoryChangeLogRecords: null })),
  on(getItemToProductDetails, (state) => ({ ...state, loadingState: { loading: true }, itemToProductGraphDetails: null })),
  on(getItemToProductDetailsSuccess, (state, action) => ({ ...state, loadingState: { loading: false }, itemToProductGraphDetails: action.payload})),
  on(getItemToProductDetailsFail, (state) => ({ ...state, loadingState: { loading: false }, itemToProductGraphDetails: null })),
);
export function productReducer(state: ProductEntitlementState | undefined, action: Action) {
  return featureReducer(state, action);
}


function reMappedUpdatedRecords(responseRecords: productEntitlementRecord[],localUpdate:productEntitlementRecord[],updatedBy:string, productInfoRecords:productEntitlementRecord[]) {

  const updatedRecords = responseRecords.length > 0 ?  responseRecords : localUpdate;

  updatedRecords.forEach(element => {
    delete element['isNewAdded']
  });

  productInfoRecords.forEach((record, index) => {
    const data = updatedRecords.find((el) => el.prodID === record.prodID);
    if (data) {
      const updateData = { ...data,isModified:false,isNewAdded: true,updatedDate:moment.utc().format('YYYY-MM-DD HH:mm:ss'),updatedBy:updatedBy };
      productInfoRecords[index] = updateData;
    }
    delete record['isNewAdded'];
  });
  return productInfoRecords;

}