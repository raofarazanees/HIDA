import { GetProductStagingUNSPSCs, ProductLevelClusteringFileUpload, ProductLevelClusteringFileUploadFail, ProductLevelClusteringFileUploadSuccess, ProductStagingCreateTask, ProductStagingCreateTaskFail, ProductStagingCreateTaskSuccess, ProductStagingDownloadFile, ProductStagingDownloadFileFail, ProductStagingDownloadFileSuccess, ProductStagingEnum, ProductStagingUNSPSCsFail, ProductStagingUNSPSCsSuccess, ProductStagingUploadFile, ProductStagingUploadFileFail, ProductStagingUploadFileSuccess, StagingCurationTriggerOutboundProcess, StagingCurationTriggerOutboundProcessFail, StagingCurationTriggerOutboundProcessSuccess } from "./product-staging.action";

describe('Actions :: Product Staging', () => {
    it('should create an PRODUCT_STAGING_GET_UNSPSCS action', () => {
      const action = GetProductStagingUNSPSCs({ payload: '' });
      expect(action.type).toEqual(ProductStagingEnum.PRODUCT_STAGING_GET_UNSPSCS);
    });

    it('should create an PRODUCT_STAGING_GET_UNSPSCS_SUCCESS action', () => {
        const action = ProductStagingUNSPSCsSuccess({ payload: '' });
        expect(action.type).toEqual(ProductStagingEnum.PRODUCT_STAGING_GET_UNSPSCS_SUCCESS);
      });
      it('should create an PRODUCT_STAGING_GET_UNSPSCS_FAIL action', () => {
        const action = ProductStagingUNSPSCsFail({ payload: '' });
        expect(action.type).toEqual(ProductStagingEnum.PRODUCT_STAGING_GET_UNSPSCS_FAIL);
      });

      it('should create an PRODUCT_LEVEL_CLUSTERING_FILE_UPLOAD action', () => {
        const action = ProductLevelClusteringFileUpload({ payload: '' });
        expect(action.type).toEqual(ProductStagingEnum.PRODUCT_LEVEL_CLUSTERING_FILE_UPLOAD);
      });

      it('should create an PRODUCT_LEVEL_CLUSTERING_FILE_UPLOAD_SUCCESS action', () => {
        const action = ProductLevelClusteringFileUploadSuccess({ payload: '' });
        expect(action.type).toEqual(ProductStagingEnum.PRODUCT_LEVEL_CLUSTERING_FILE_UPLOAD_SUCCESS);
      });

      it('should create an PRODUCT_LEVEL_CLUSTERING_FILE_UPLOAD_SUCCESS_FAIL action', () => {
        const action = ProductLevelClusteringFileUploadFail({ payload: '' });
        expect(action.type).toEqual(ProductStagingEnum.PRODUCT_LEVEL_CLUSTERING_FILE_UPLOAD_FAIL);
      });

      it('should create an PRODUCT_STAGING_CREATE_TASK_SELECTED_PRODUCT action', () => {
        const action = ProductStagingCreateTask({ payload: '' });
        expect(action.type).toEqual(ProductStagingEnum.PRODUCT_STAGING_CREATE_TASK_SELECTED_PRODUCT);
      });

      
      it('should create an PRODUCT_STAGING_CREATE_TASK_SELECTED_PRODUCT_SUCCESS action', () => {
        const action = ProductStagingCreateTaskSuccess({ payload: '' });
        expect(action.type).toEqual(ProductStagingEnum.PRODUCT_STAGING_CREATE_TASK_SELECTED_PRODUCT_SUCCESS);
      });

      it('should create an PRODUCT_STAGING_CREATE_TASK_SELECTED_PRODUCT_FAIL action', () => {
        const action = ProductStagingCreateTaskFail({ payload: '' });
        expect(action.type).toEqual(ProductStagingEnum.PRODUCT_STAGING_CREATE_TASK_SELECTED_PRODUCT_FAIL);
      });

      it('should create an PRODUCT_STAGING_CREATE_TASK_SELECTED_PRODUCT action', () => {
        const action = ProductStagingDownloadFile({ payload: '' });
        expect(action.type).toEqual(ProductStagingEnum.PRODUCT_STAGING_SELECTED_PRODUCT_FILE_DOWNLOAD);
      });

      
      it('should create an PRODUCT_STAGING_CREATE_TASK_SELECTED_PRODUCT_SUCCESS action', () => {
        const action = ProductStagingDownloadFileSuccess({ payload: '' });
        expect(action.type).toEqual(ProductStagingEnum.PRODUCT_STAGING_SELECTED_PRODUCT_FILE_DOWNLOAD_SUCCESS);
      });

      it('should create an PRODUCT_STAGING_CREATE_TASK_SELECTED_PRODUCT_FAIL action', () => {
        const action = ProductStagingDownloadFileFail({ payload: '' });
        expect(action.type).toEqual(ProductStagingEnum.PRODUCT_STAGING_SELECTED_PRODUCT_FILE_DOWNLOAD_FAIL);
      });

      it('should create an PRODUCT_STAGING_FILE_UPLOAD action', () => {
        const action = ProductStagingUploadFile({ payload: '' });
        expect(action.type).toEqual(ProductStagingEnum.PRODUCT_STAGING_FILE_UPLOAD);
      });

      it('should create an PRODUCT_STAGING_FILE_UPLOAD_SUCCESS action', () => {
        const action = ProductStagingUploadFileSuccess({ payload: '' });
        expect(action.type).toEqual(ProductStagingEnum.PRODUCT_STAGING_FILE_UPLOAD_SUCCESS);
      });

      it('should create an PRODUCT_STAGING_FILE_UPLOAD_Fail action', () => {
        const action = ProductStagingUploadFileFail({ payload: '' });
        expect(action.type).toEqual(ProductStagingEnum.PRODUCT_STAGING_FILE_UPLOAD_FAIL);
      });


      it('should create an STAGING_CURATION_TRIGGER_OUTBOUND_REFRESH action', () => {
        const action = StagingCurationTriggerOutboundProcess({ payload: '' });
        expect(action.type).toEqual(ProductStagingEnum.STAGING_CURATION_TRIGGER_OUTBOUND_REFRESH);
      });
      
      it('should create an STAGING_CURATION_TRIGGER_OUTBOUND_REFRESH_SUCCESS action', () => {
        const action = StagingCurationTriggerOutboundProcessSuccess({ payload: '' });
        expect(action.type).toEqual(ProductStagingEnum.STAGING_CURATION_TRIGGER_OUTBOUND_REFRESH_SUCCESS);
      });

      it('should create an STAGING_CURATION_TRIGGER_OUTBOUND_REFRESH_FAIL action', () => {
        const action = StagingCurationTriggerOutboundProcessFail({ payload: '' });
        expect(action.type).toEqual(ProductStagingEnum.STAGING_CURATION_TRIGGER_OUTBOUND_REFRESH_FAIL);
      });

})