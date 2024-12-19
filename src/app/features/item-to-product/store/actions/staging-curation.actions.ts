import { createAction, props } from '@ngrx/store';

export enum StagingEum {
  STAGING_RETRIEVE_PRODUCTS_FOR_CURATION = '[ProductStagingCurationModule] Get Product for Curation',
  STAGING_RETRIEVE_PRODUCTS_FOR_CURATION_SUCCESS = '[ProductStagingCurationModule] Get Product for Curation Success',
  STAGING_RETRIEVE_PRODUCTS_FOR_CURATION_FAIL = '[ProductStagingCurationModule] Get Product for Curation Fail',
  STAGING_RETRIEVE_PRODUCTS_ITEMS_VIEW = '[ProductStagingCurationModule] Get Product  Items for review',
  STAGING_RETRIEVE_PRODUCTS_ITEMS_VIEW_SUCCESS = '[ProductStagingCurationModule] Get Product  Items for review Success',
  STAGING_RETRIEVE_PRODUCTS_ITEMS_VIEW_FAIL = '[ProductStagingCurationModule] Get Product  Items for review Fail',
  STAGING_CURATION_WORKBENCH_DOWNLOAD_FILE = '[ProductStagingCurationModule] Staging Curation Download CSV on Workbench',
  STAGING_CURATION_WORKBENCH_DOWNLOAD_FILE_SUCCESS = '[ProductStagingCurationModule] Staging Curation Download CSV on Workbench Success',
  STAGING_CURATION_WORKBENCH_DOWNLOAD_FILE_FAIL = '[ProductStagingCurationModule] Staging Curation Download CSV on Workbench Fail',
  STAGING_CURATION_WORKBENCH_UPLOAD_FILE = '[ProductStagingCurationModule] Staging Curation Upload CSV file on Workbench',
  STAGING_CURATION_WORKBENCH_UPLOAD_FILE_SUCCESS = '[ProductStagingCurationModule] Staging Curation Upload CSV file on Workbench Success',
  STAGING_CURATION_WORKBENCH_UPLOAD_FILE_FAIL = '[ProductStagingCurationModule] Staging Curation Upload CSV file on Workbench Fail',
  CLOSE_SIDEBAR_AT = '[ProductStagingCurationModule] Close Upload Dialog',
  STAGING_CURATION_SAVE_FOR_LATER_WB = '[ProductStagingCurationModule] Staging Curation Save For Later on Workbench',
  STAGING_CURATION_SAVE_FOR_LATER_WB_SUCCESS = '[ProductStagingCurationModule] Staging Curation Save For Later on Workbench Success',
  STAGING_CURATION_SAVE_FOR_LATER_WB_FAIL = '[ProductStagingCurationModule] Staging Curation Save For Later on Workbench Fail',
  STAGING_CURATION_TASK_SUBMISSION_WB = '[ProductStagingCurationModule] Staging Curation Task Submission Approve or reject',
  STAGING_CURATION_TASK_SUBMISSION_WB_SUCCESS = '[ProductStagingCurationModule] Staging Curation Task Submission Approve or reject Successfully',
  STAGING_CURATION_TASK_SUBMISSION_WB_FAIL = '[ProductStagingCurationModule] Staging Curation Task Submission Approve or reject Fail',

  STAGING_CURATION_GET_FINAL_PRODUCT_REVIEW = '[ProductStagingCurationModule] Get Staging Curation Final Product For Review',
  STAGING_CURATION_GET_FINAL_PRODUCT_REVIEW_SUCCESS = '[ProductStagingCurationModule] Get Staging Curation Final Product For Review Successfully',
  STAGING_CURATION_GET_FINAL_PRODUCT_REVIEW_FAIL = '[ProductStagingCurationModule] Get Staging Curation Final Product For Review Fail',

  STAGING_CURATION_SUBMIT_FINAL_RECORDS = '[ProductStagingCurationModule]  Staging Curation Final Product Submit',
  STAGING_CURATION_SUBMIT_FINAL_RECORDS_SUCCESS = '[ProductStagingCurationModule] Staging Curation Final Product Submit Successfully',
  STAGING_CURATION_SUBMIT_FINAL_RECORDS_FAIL = '[ProductStagingCurationModule] Staging Curation Final Product Submit Fail'
  
}

export const GetStagingProductsForCuration = createAction(StagingEum.STAGING_RETRIEVE_PRODUCTS_FOR_CURATION, props<{ payload: any }>());
export const GetStagingProductsForCurationSuccess = createAction(StagingEum.STAGING_RETRIEVE_PRODUCTS_FOR_CURATION_SUCCESS, props<{ payload: any }>());
export const GetStagingProductsForCurationFail = createAction(StagingEum.STAGING_RETRIEVE_PRODUCTS_FOR_CURATION_FAIL, props<{ payload: any }>());
export const GetStagingProductItemForView = createAction(StagingEum.STAGING_RETRIEVE_PRODUCTS_ITEMS_VIEW, props<{ payload: any }>());
export const GetStagingProductItemForViewSuccess = createAction(StagingEum.STAGING_RETRIEVE_PRODUCTS_ITEMS_VIEW_SUCCESS, props<{ payload: any }>());
export const GetStagingProductItemForViewFail = createAction(StagingEum.STAGING_RETRIEVE_PRODUCTS_ITEMS_VIEW_FAIL, props<{ payload: any }>());

export const StagingCurationWorkbenchDownloadFile = createAction(StagingEum.STAGING_CURATION_WORKBENCH_DOWNLOAD_FILE, props<{ payload: any }>());
export const StagingCurationWorkbenchDownloadFileSuccess = createAction(StagingEum.STAGING_CURATION_WORKBENCH_DOWNLOAD_FILE_SUCCESS, props<{ payload: any }>());
export const StagingCurationWorkbenchDownloadFileFail = createAction(StagingEum.STAGING_CURATION_WORKBENCH_DOWNLOAD_FILE_FAIL, props<{ payload: any }>());

export const StagingCurationWorkbenchUploadFile = createAction(StagingEum.STAGING_CURATION_WORKBENCH_UPLOAD_FILE, props<{ payload: any }>());
export const StagingCurationWorkbenchUploadFileSuccess = createAction(StagingEum.STAGING_CURATION_WORKBENCH_UPLOAD_FILE_SUCCESS, props<{ payload: any }>());
export const StagingCurationWorkbenchUploadFileFail = createAction(StagingEum.STAGING_CURATION_WORKBENCH_UPLOAD_FILE_FAIL, props<{ payload: any }>());
export const CloseStagingCurationSidebar = createAction(StagingEum.CLOSE_SIDEBAR_AT, props<{ payload: any }>());

export const StagingCurationSaveForLaterWB = createAction(StagingEum.STAGING_CURATION_SAVE_FOR_LATER_WB, props<{ payload: any }>());
export const StagingCurationSaveForLaterWBSuccess = createAction(StagingEum.STAGING_CURATION_SAVE_FOR_LATER_WB_SUCCESS, props<{ payload: any }>());
export const StagingCurationSaveForLaterWBFail = createAction(StagingEum.STAGING_CURATION_SAVE_FOR_LATER_WB_FAIL, props<{ payload: any }>());

export const StagingCurationTaskSubmission = createAction(StagingEum.STAGING_CURATION_TASK_SUBMISSION_WB, props<{ payload: any }>());
export const StagingCurationTaskSubmissionSuccess = createAction(StagingEum.STAGING_CURATION_TASK_SUBMISSION_WB_SUCCESS, props<{ payload: any }>());
export const StagingCurationTaskSubmissionFail = createAction(StagingEum.STAGING_CURATION_TASK_SUBMISSION_WB_FAIL, props<{ payload: any }>());


export const GetStagingCurationFinalProductForReview = createAction(StagingEum.STAGING_CURATION_GET_FINAL_PRODUCT_REVIEW, props<{ payload: any }>());
export const GetStagingCurationFinalProductForReviewSuccess = createAction(StagingEum.STAGING_CURATION_GET_FINAL_PRODUCT_REVIEW_SUCCESS, props<{ payload: any }>());
export const GetStagingCurationFinalProductForReviewFail = createAction(StagingEum.STAGING_CURATION_GET_FINAL_PRODUCT_REVIEW_FAIL, props<{ payload: any }>());

export const StagingCurationSubmitFinalConfirmation = createAction(StagingEum.STAGING_CURATION_SUBMIT_FINAL_RECORDS, props<{ payload: any }>());
export const StagingCurationSubmitFinalConfirmationSuccess = createAction(StagingEum.STAGING_CURATION_SUBMIT_FINAL_RECORDS_SUCCESS, props<{ payload: any }>());
export const StagingCurationSubmitFinalConfirmationFail = createAction(StagingEum.STAGING_CURATION_SUBMIT_FINAL_RECORDS_FAIL, props<{ payload: any }>());
