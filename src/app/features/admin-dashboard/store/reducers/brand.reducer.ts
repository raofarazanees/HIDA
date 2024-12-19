import { Action, createReducer, on } from '@ngrx/store';
import {
  BrandMasterCV,
  BrandMasterCVFail,
  BrandMasterCVSuccess,
  BrandProductMappingUpload,
  BrandProductMappingUploadSuccess,
  BrandProductMappingUploadFail,
  BrandMasterRecords,
  BrandMasterRecordsSuccess,
  BrandMasterRecordsFail,
  GetBrandProductReview,
  GetBrandProductReviewSuccess,
  GetBrandProductReviewFail,
  DownloadProductBrandFile,
  DownloadProductBrandFileFail,
  DownloadProductBrandFileSuccess
} from '../actions';
import { FileUploadState, initialFileUpload } from './common.reducer';


export interface ProductBrand {
  productID: string | number;
  prodSKU: string;
  prodDesc: string;
  prodManf: string;
  prodParentManf: string;
  prodUNSPSCCode: string;
  prodUNSPSCDesc: string;
  prodBrand: string;
  prodConvFactor: number | string;
  analystName: string;
  masterBrand: string;
  analystComments: string;
}

export interface BrandState {
  brandLoadingState: FileUploadState;
  ActiveBrandMaster: BrandMasterRecordsState,
  productBrandReviewState : ProductBrandReviewState;
}

export interface BrandMasterRecordsState {
  loading?:boolean;
  response?:string[];
}

export interface ProductBrandReviewState {
  loading?:boolean;
  response?:ProductBrand[];
}

export const ActiveBrandMasterInit : BrandMasterRecordsState = {
  loading:false,
  response:null
}

export const initialProductBrand : ProductBrandReviewState = {
  loading:false,
  response:null
}

export const initialState: BrandState = {
  brandLoadingState: initialFileUpload,
  ActiveBrandMaster: ActiveBrandMasterInit,
  productBrandReviewState: initialProductBrand
};


const featureReducer = createReducer(
  initialState,
  on(BrandMasterCV, (state) => ({ ...state, brandLoadingState: { loading: true } })),
  on(BrandMasterCVSuccess, (state) => ({ ...state, brandLoadingState: { loading: false } })),
  on(BrandMasterCVFail, (state) => ({ ...state, brandLoadingState: { loading: false } })),
  on(BrandProductMappingUpload, (state) => ({ ...state, brandLoadingState: { loading: true } })),
  on(BrandProductMappingUploadSuccess, (state) => ({ ...state, brandLoadingState: { loading: false } })),
  on(BrandProductMappingUploadFail, (state) => ({ ...state, brandLoadingState: { loading: false } })),
  on(BrandMasterRecords, (state) => ({ ...state, ActiveBrandMaster: { loading: true } })),
  on(BrandMasterRecordsSuccess, (state, action) => ({ ...state, ActiveBrandMaster: { loading: false, response:action.payload } })),
  on(BrandMasterRecordsFail, (state) => ({ ...state, ActiveBrandMaster: { loading: false,response: null } })),
  on(GetBrandProductReview, (state) => ({ ...state, productBrandReviewState: { loading: true } })),
  on(GetBrandProductReviewSuccess, (state, action) => ({ ...state, productBrandReviewState: { loading: false, response:action.payload } })),
  on(GetBrandProductReviewFail, (state) => ({ ...state, productBrandReviewState: { loading: false,response: null } })),

  on(DownloadProductBrandFile, (state) => ({ ...state, brandLoadingState: { loading: true} })),
  on(DownloadProductBrandFileSuccess, (state) => ({ ...state, brandLoadingState: { loading: false},productBrandReviewState:{response:null} })),
  on(DownloadProductBrandFileFail, (state) => ({ ...state, brandLoadingState: { loading: false} })),



);

export function brandReducer(state: BrandState | undefined, action: Action) {
  return featureReducer(state, action);
}
