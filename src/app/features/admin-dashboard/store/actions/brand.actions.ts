import { Action, createAction, props } from '@ngrx/store';

export enum CommonBrandActionsEnum {
  BRAND_MASTER_CV_UPLOAD = '[DASHBOARDMODULE] Brand Master CV',
  BRAND_MASTER_CV_UPLOAD_SUCCESS = '[DASHBOARDMODULE] Brand Master CV Success',
  BRAND_MASTER_CV_UPLOAD_FAIL = '[DASHBOARDMODULE]  Brand Master CV Fail',
  BRAND_PRODUCT_MAPPING_UPLOAD = '[DASHBOARDMODULE] Brand Product Mapping',
  BRAND_PRODUCT_MAPPING_UPLOAD_SUCCESS = '[DASHBOARDMODULE] Brand Product Mapping Success',
  BRAND_PRODUCT_MAPPING_UPLOAD_FAIL = '[DASHBOARDMODULE] Brand Product Mapping Fail',
  GET_ACTIVE_MASTER_BRAND = '[DASHBOARDMODULE] Get Active Master Brand',
  GET_ACTIVE_MASTER_BRAND_SUCCESS = '[DASHBOARDMODULE] Get Master Brand Success',
  GET_ACTIVE_MASTER_BRAND_FAIL = '[DASHBOARDMODULE] Get Master Brand Fail',
  GET_PRODUCT_BRAND_TAGGING_VIEW = '[DASHBOARDMODULE] Get Product Brand Tagging view for review',
  GET_PRODUCT_BRAND_TAGGING_VIEW_SUCCESS = '[DASHBOARDMODULE] Get Product Brand Tagging view for success',
  GET_PRODUCT_BRAND_TAGGING_VIEW_FAIL = '[DASHBOARDMODULE] Get Product Brand Tagging view for FAIL',

  DOWNLOAD_PRODUCT_BRAND_TAGGING_FILE = '[DASHBOARDMODULE] Download Product Brand Tagging file',
  DOWNLOAD_PRODUCT_BRAND_TAGGING_FILE_SUCCESS = '[DASHBOARDMODULE] Download Product Brand Tagging file Success',
  DOWNLOAD_PRODUCT_BRAND_TAGGING_FILE_FAIL = '[DASHBOARDMODULE] Download Product Brand Tagging file Fail',
}

export const BrandMasterCV = createAction(CommonBrandActionsEnum.BRAND_MASTER_CV_UPLOAD, props<{ payload: any }>());

export const BrandMasterCVSuccess = createAction(CommonBrandActionsEnum.BRAND_MASTER_CV_UPLOAD_SUCCESS, props<{ payload: any }>());

export const BrandMasterCVFail = createAction(CommonBrandActionsEnum.BRAND_MASTER_CV_UPLOAD_FAIL, props<{ payload: any }>());

export const BrandProductMappingUpload = createAction(CommonBrandActionsEnum.BRAND_PRODUCT_MAPPING_UPLOAD, props<{ payload: any }>());

export const BrandProductMappingUploadFail = createAction(CommonBrandActionsEnum.BRAND_PRODUCT_MAPPING_UPLOAD_FAIL, props<{ payload: any }>() );

export const BrandProductMappingUploadSuccess = createAction( CommonBrandActionsEnum.BRAND_PRODUCT_MAPPING_UPLOAD_SUCCESS, props<{ payload: any }>());

export const BrandMasterRecords = createAction(CommonBrandActionsEnum.GET_ACTIVE_MASTER_BRAND);

export const BrandMasterRecordsSuccess = createAction(CommonBrandActionsEnum.GET_ACTIVE_MASTER_BRAND_SUCCESS, props<{ payload: any }>());

export const BrandMasterRecordsFail = createAction(CommonBrandActionsEnum.GET_ACTIVE_MASTER_BRAND_FAIL, props<{ payload: any }>());

export const GetBrandProductReview = createAction(CommonBrandActionsEnum.GET_PRODUCT_BRAND_TAGGING_VIEW, props<{ payload: any }>());

export const GetBrandProductReviewSuccess = createAction(CommonBrandActionsEnum.GET_PRODUCT_BRAND_TAGGING_VIEW_SUCCESS, props<{ payload: any }>());

export const GetBrandProductReviewFail = createAction(CommonBrandActionsEnum.GET_PRODUCT_BRAND_TAGGING_VIEW_FAIL, props<{ payload: any }>());


export const DownloadProductBrandFile = createAction(CommonBrandActionsEnum.DOWNLOAD_PRODUCT_BRAND_TAGGING_FILE, props<{ payload: any }>());

export const DownloadProductBrandFileSuccess = createAction(CommonBrandActionsEnum.DOWNLOAD_PRODUCT_BRAND_TAGGING_FILE_SUCCESS, props<{ payload: any }>());

export const DownloadProductBrandFileFail = createAction(CommonBrandActionsEnum.DOWNLOAD_PRODUCT_BRAND_TAGGING_FILE_FAIL, props<{ payload: any }>());
