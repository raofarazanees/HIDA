import { createAction, props } from "@ngrx/store";

export enum ProductStagingEnum {
    PRODUCT_STAGING_GET_UNSPSCS = '[DASHBOARDMODULE] Get Product Staging UNSPSCs',
    PRODUCT_STAGING_GET_UNSPSCS_SUCCESS = '[DASHBOARDMODULE] Get Product Staging UNSPSCs Success',
    PRODUCT_STAGING_GET_UNSPSCS_FAIL = '[DASHBOARDMODULE] Get Product Staging UNSPSCs Fail',
    PRODUCT_LEVEL_CLUSTERING_FILE_UPLOAD = '[DASHBOARDMODULE] Product Level Clustering File Upload',
    PRODUCT_LEVEL_CLUSTERING_FILE_UPLOAD_SUCCESS = '[DASHBOARDMODULE] Product Level Clustering File Upload Success',
    PRODUCT_LEVEL_CLUSTERING_FILE_UPLOAD_FAIL = '[DASHBOARDMODULE] Product Level Clustering File Upload Fail',
    PRODUCT_STAGING_CREATE_TASK_SELECTED_PRODUCT = '[DASHBOARDMODULE] Product Staging Create task for Selected Product',
    PRODUCT_STAGING_CREATE_TASK_SELECTED_PRODUCT_SUCCESS = '[DASHBOARDMODULE] Product Staging Create task for Selected Product Success',
    PRODUCT_STAGING_CREATE_TASK_SELECTED_PRODUCT_FAIL = '[DASHBOARDMODULE] Product Staging Create task for Selected Product Fail',
    PRODUCT_STAGING_SELECTED_PRODUCT_FILE_DOWNLOAD = '[DASHBOARDMODULE] Product Staging Download CSV for Selected Product',
    PRODUCT_STAGING_SELECTED_PRODUCT_FILE_DOWNLOAD_SUCCESS = '[DASHBOARDMODULE] Product Staging Download CSV for Selected Product Success',
    PRODUCT_STAGING_SELECTED_PRODUCT_FILE_DOWNLOAD_FAIL = '[DASHBOARDMODULE] Product Staging Download CSV for Selected Product Fail',   
    PRODUCT_STAGING_FILE_UPLOAD = '[DASHBOARDMODULE] Product Staging File Upload',
    PRODUCT_STAGING_FILE_UPLOAD_SUCCESS = '[DASHBOARDMODULE] Product Staging File Upload Success',
    PRODUCT_STAGING_FILE_UPLOAD_FAIL = '[DASHBOARDMODULE] Product Staging File Upload Fail',
    PRODUCT_STAGING_FILE_UPLOAD_FOR_LABELLING = '[DASHBOARDMODULE] Product Staging File Upload for Labelling',
    PRODUCT_STAGING_FILE_UPLOAD_FOR_LABELLING_SUCCESS = '[DASHBOARDMODULE] Product Staging File Upload Labelling Success',
    PRODUCT_STAGING_FILE_UPLOAD_FOR_LABELLING_FAIL = '[DASHBOARDMODULE] Product Staging File Upload Labelling Fail',
    STAGING_CURATION_TRIGGER_OUTBOUND_REFRESH =  '[DASHBOARDMODULE] Staging Curation Trigger Outbound Refresh',
    STAGING_CURATION_TRIGGER_OUTBOUND_REFRESH_SUCCESS =  '[DASHBOARDMODULE] Staging Curation Trigger Outbound Refresh Success',
    STAGING_CURATION_TRIGGER_OUTBOUND_REFRESH_FAIL =  '[DASHBOARDMODULE] Staging Curation Trigger Outbound Refresh Fail',
    UOM_REGULAR_FILE_UPLOAD = '[DASHBOARDMODULE] Uom Regular File Upload',
    UOM_REGULAR_FILE_UPLOAD_SUCCESS = '[DASHBOARDMODULE] Uom Regular File Upload Success',
    UOM_REGULAR_FILE_UPLOAD_FAIL = '[DASHBOARDMODULE] Uom Regular File Upload Fail',
    UOM_CORRECTION_FILE_UPLOAD = '[DASHBOARDMODULE] Uom Correction File Upload',
    UOM_CORRECTION_FILE_UPLOAD_SUCCESS = '[DASHBOARDMODULE] Uom Correction File Upload Success',
    UOM_CORRECTION_FILE_UPLOAD_FAIL = '[DASHBOARDMODULE] Uom Correction File Upload Fail',
    UOM_ADHOC_FILE_UPLOAD = '[DASHBOARDMODULE] Uom Adhoc File Upload',
    UOM_ADHOC_FILE_UPLOAD_SUCCESS = '[DASHBOARDMODULE] Uom Adhoc File Upload Success',
    UOM_ADHOC_FILE_UPLOAD_FAIL = '[DASHBOARDMODULE] Uom Adhoc File Upload Fail',
    SKU_FILE_UPLOAD = '[DASHBOARDMODULE] Taxonomy Review File Upload',
    SKU_FILE_UPLOAD_SUCCESS = '[DASHBOARDMODULE] Taxonomy Review File Upload Success',
    SKU_FILE_UPLOAD_FAIL = '[DASHBOARDMODULE] Taxonomy Review File Upload Fail',
}

export const GetProductStagingUNSPSCs = createAction(ProductStagingEnum.PRODUCT_STAGING_GET_UNSPSCS, props<{payload: any}>());
export const ProductStagingUNSPSCsSuccess = createAction(ProductStagingEnum.PRODUCT_STAGING_GET_UNSPSCS_SUCCESS, props<{payload: any}>());
export const ProductStagingUNSPSCsFail = createAction(ProductStagingEnum.PRODUCT_STAGING_GET_UNSPSCS_FAIL, props<{payload: any}>())
export const ProductLevelClusteringFileUpload = createAction(ProductStagingEnum.PRODUCT_LEVEL_CLUSTERING_FILE_UPLOAD, props<{payload: any}>());
export const ProductLevelClusteringFileUploadSuccess = createAction(ProductStagingEnum.PRODUCT_LEVEL_CLUSTERING_FILE_UPLOAD_SUCCESS, props<{payload: any}>());
export const ProductLevelClusteringFileUploadFail = createAction(ProductStagingEnum.PRODUCT_LEVEL_CLUSTERING_FILE_UPLOAD_FAIL, props<{payload: any}>())
export const ProductStagingCreateTask = createAction(ProductStagingEnum.PRODUCT_STAGING_CREATE_TASK_SELECTED_PRODUCT, props<{payload: any}>());
export const ProductStagingCreateTaskSuccess = createAction(ProductStagingEnum.PRODUCT_STAGING_CREATE_TASK_SELECTED_PRODUCT_SUCCESS, props<{payload: any}>());
export const ProductStagingCreateTaskFail = createAction(ProductStagingEnum.PRODUCT_STAGING_CREATE_TASK_SELECTED_PRODUCT_FAIL, props<{payload: any}>())
export const ProductStagingDownloadFile = createAction(ProductStagingEnum.PRODUCT_STAGING_SELECTED_PRODUCT_FILE_DOWNLOAD, props<{payload: any}>());
export const ProductStagingDownloadFileSuccess = createAction(ProductStagingEnum.PRODUCT_STAGING_SELECTED_PRODUCT_FILE_DOWNLOAD_SUCCESS, props<{payload: any}>());
export const ProductStagingDownloadFileFail = createAction(ProductStagingEnum.PRODUCT_STAGING_SELECTED_PRODUCT_FILE_DOWNLOAD_FAIL, props<{payload: any}>())
export const ProductStagingUploadFile = createAction(ProductStagingEnum.PRODUCT_STAGING_FILE_UPLOAD, props<{payload: any}>());
export const ProductStagingUploadFileSuccess = createAction(ProductStagingEnum.PRODUCT_STAGING_FILE_UPLOAD_SUCCESS, props<{payload: any}>());
export const ProductStagingUploadFileFail = createAction(ProductStagingEnum.PRODUCT_STAGING_FILE_UPLOAD_FAIL, props<{payload: any}>())

export const ProductStagingUploadFileForLabelling = createAction(ProductStagingEnum.PRODUCT_STAGING_FILE_UPLOAD_FOR_LABELLING, props<{payload: any}>());
export const ProductStagingUploadFileForLabellingSuccess = createAction(ProductStagingEnum.PRODUCT_STAGING_FILE_UPLOAD_FOR_LABELLING_SUCCESS, props<{payload: any}>());
export const ProductStagingUploadFileForLabellingFail = createAction(ProductStagingEnum.PRODUCT_STAGING_FILE_UPLOAD_FOR_LABELLING_FAIL, props<{payload: any}>())

export const StagingCurationTriggerOutboundProcess = createAction(ProductStagingEnum.STAGING_CURATION_TRIGGER_OUTBOUND_REFRESH, props<{payload: any}>());
export const StagingCurationTriggerOutboundProcessSuccess = createAction(ProductStagingEnum.STAGING_CURATION_TRIGGER_OUTBOUND_REFRESH_SUCCESS, props<{payload: any}>());
export const StagingCurationTriggerOutboundProcessFail = createAction(ProductStagingEnum.STAGING_CURATION_TRIGGER_OUTBOUND_REFRESH_FAIL, props<{payload: any}>())

export const UomRegularFileUpload = createAction(ProductStagingEnum.UOM_REGULAR_FILE_UPLOAD, props<{payload: any}>());
export const UomRegularFileUploadSuccess = createAction(ProductStagingEnum.UOM_REGULAR_FILE_UPLOAD_SUCCESS, props<{payload: any}>());
export const UomRegularFileUploadFail = createAction(ProductStagingEnum.UOM_REGULAR_FILE_UPLOAD_FAIL, props<{payload: any}>())

export const UomCorrectionFileUpload = createAction(ProductStagingEnum.UOM_CORRECTION_FILE_UPLOAD, props<{payload: any}>());
export const UomCorrectionFileUploadSuccess = createAction(ProductStagingEnum.UOM_CORRECTION_FILE_UPLOAD_SUCCESS, props<{payload: any}>());
export const UomCorrectionFileUploadFail = createAction(ProductStagingEnum.UOM_CORRECTION_FILE_UPLOAD_FAIL, props<{payload: any}>())

export const UoMAdhocFileUpload = createAction(ProductStagingEnum.UOM_ADHOC_FILE_UPLOAD, props<{payload: any}>());
export const UoMAdhocFileUploadSuccess = createAction(ProductStagingEnum.UOM_ADHOC_FILE_UPLOAD_SUCCESS, props<{payload: any}>());
export const UoMAdhocFileUploadFail = createAction(ProductStagingEnum.UOM_ADHOC_FILE_UPLOAD_FAIL, props<{payload: any}>())

export const SkuDataForClusteringFileUpload = createAction(ProductStagingEnum.SKU_FILE_UPLOAD, props<{payload: any}>());
export const SkuDataForClusteringFileUploadSuccess = createAction(ProductStagingEnum.SKU_FILE_UPLOAD_SUCCESS, props<{payload: any}>());
export const SkuDataForClusteringFileUploadFail = createAction(ProductStagingEnum.SKU_FILE_UPLOAD_FAIL, props<{payload: any}>())
