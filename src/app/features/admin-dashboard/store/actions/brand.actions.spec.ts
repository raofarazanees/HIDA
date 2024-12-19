import { BrandMasterCV, BrandMasterCVFail, BrandMasterCVSuccess, BrandMasterRecords, BrandMasterRecordsFail, BrandMasterRecordsSuccess, BrandProductMappingUpload, BrandProductMappingUploadFail, BrandProductMappingUploadSuccess, CommonBrandActionsEnum, DownloadProductBrandFile, DownloadProductBrandFileFail, DownloadProductBrandFileSuccess, GetBrandProductReview, GetBrandProductReviewFail, GetBrandProductReviewSuccess } from "./brand.actions";


describe('Actions :: Brand', () => {
    it('should create an BRAND_MASTER_CV_UPLOAD action', () => {
      const action = BrandMasterCV({ payload: '' });
      expect(action.type).toEqual(CommonBrandActionsEnum.BRAND_MASTER_CV_UPLOAD,);
    });


    it('should create an BRAND_MASTER_CV_UPLOAD_SUCCESS action', () => {
        const action = BrandMasterCVSuccess({ payload: '' });
        expect(action.type).toEqual(CommonBrandActionsEnum.BRAND_MASTER_CV_UPLOAD_SUCCESS,);
      });

      it('should create an BRAND_MASTER_CV_UPLOAD_FAIL action', () => {
        const action = BrandMasterCVFail({ payload: '' });
        expect(action.type).toEqual(CommonBrandActionsEnum.BRAND_MASTER_CV_UPLOAD_FAIL,);
      });


      it('should create an BRAND_PRODUCT_MAPPING_UPLOAD action', () => {
        const action = BrandProductMappingUpload({ payload: '' });
      });

      it('should create an BRAND_PRODUCT_MAPPING_UPLOAD_FAIL action', () => {
        const action = BrandProductMappingUploadFail({ payload: '' });
        expect(action.type).toEqual(CommonBrandActionsEnum.BRAND_PRODUCT_MAPPING_UPLOAD_FAIL,);
      });

      it('should create an BRAND_PRODUCT_MAPPING_UPLOAD_SUCCESS action', () => {
        const action = BrandProductMappingUploadSuccess({ payload: '' });
        expect(action.type).toEqual(CommonBrandActionsEnum.BRAND_PRODUCT_MAPPING_UPLOAD_SUCCESS,);
      });

      it('should create an GET_ACTIVE_MASTER_BRAND action', () => {
        const action = BrandMasterRecords();
        expect(action.type).toEqual(CommonBrandActionsEnum.GET_ACTIVE_MASTER_BRAND,);
      });

      it('should create an GET_ACTIVE_MASTER_BRAND_SUCCESS action', () => {
        const action = BrandMasterRecordsSuccess({ payload: '' });
        expect(action.type).toEqual(CommonBrandActionsEnum.GET_ACTIVE_MASTER_BRAND_SUCCESS,);
      });
      
      it('should create an GET_ACTIVE_MASTER_BRAND_FAIL action', () => {
        const action = BrandMasterRecordsFail({ payload: '' });
        expect(action.type).toEqual(CommonBrandActionsEnum.GET_ACTIVE_MASTER_BRAND_FAIL,);
      });

      it('should create an GET_ACTIVE_MASTER_BRAND action', () => {
        const action = GetBrandProductReview({ payload: '' });
        expect(action.type).toEqual(CommonBrandActionsEnum.GET_PRODUCT_BRAND_TAGGING_VIEW,);
      });

      it('should create an GET_ACTIVE_MASTER_BRAND_SUCCESS action', () => {
        const action = GetBrandProductReviewSuccess({ payload: '' });
        expect(action.type).toEqual(CommonBrandActionsEnum.GET_PRODUCT_BRAND_TAGGING_VIEW_SUCCESS,);
      });
      
      it('should create an GET_ACTIVE_MASTER_BRAND_FAIL action', () => {
        const action = GetBrandProductReviewFail({ payload: '' });
        expect(action.type).toEqual(CommonBrandActionsEnum.GET_PRODUCT_BRAND_TAGGING_VIEW_FAIL,);
      });
-
      it('should create an GET_ACTIVE_MASTER_BRAND action', () => {
        const action = DownloadProductBrandFile({ payload: '' });
        expect(action.type).toEqual(CommonBrandActionsEnum.DOWNLOAD_PRODUCT_BRAND_TAGGING_FILE);
      });

      it('should create an GET_ACTIVE_MASTER_BRAND_SUCCESS action', () => {
        const action = DownloadProductBrandFileSuccess({ payload: '' });
        expect(action.type).toEqual(CommonBrandActionsEnum.DOWNLOAD_PRODUCT_BRAND_TAGGING_FILE_SUCCESS);
      });
      
      it('should create an GET_ACTIVE_MASTER_BRAND_FAIL action', () => {
        const action = DownloadProductBrandFileFail({ payload: '' });
        expect(action.type).toEqual(CommonBrandActionsEnum.DOWNLOAD_PRODUCT_BRAND_TAGGING_FILE_FAIL,);
      });
})