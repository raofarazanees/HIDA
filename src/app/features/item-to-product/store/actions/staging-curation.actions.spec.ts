import {
  CloseStagingCurationSidebar,
    GetStagingProductItemForView,
  GetStagingProductItemForViewFail,
  GetStagingProductItemForViewSuccess,
  GetStagingProductsForCuration,
  GetStagingProductsForCurationFail,
  GetStagingProductsForCurationSuccess,
  StagingCurationSaveForLaterWB,
  StagingCurationSaveForLaterWBFail,
  StagingCurationSaveForLaterWBSuccess,
  StagingCurationTaskSubmission,
  StagingCurationTaskSubmissionFail,
  StagingCurationTaskSubmissionSuccess,
  StagingCurationWorkbenchDownloadFile,
  StagingCurationWorkbenchDownloadFileFail,
  StagingCurationWorkbenchDownloadFileSuccess,
  StagingEum
} from './staging-curation.actions';

describe('Actions :: Staging Curation WB Actions', () => {
  it('should create an STAGING_RETRIEVE_PRODUCTS_FOR_CURATION action', () => {
    const action = GetStagingProductsForCuration({ payload: '' });
    expect(action.type).toEqual(StagingEum.STAGING_RETRIEVE_PRODUCTS_FOR_CURATION);
  });
  it('should create an STAGING_RETRIEVE_PRODUCTS_FOR_CURATION_SUCCESS action', () => {
    const action = GetStagingProductsForCurationSuccess({ payload: '' });
    expect(action.type).toEqual(StagingEum.STAGING_RETRIEVE_PRODUCTS_FOR_CURATION_SUCCESS);
  });
  it('should create an STAGING_RETRIEVE_PRODUCTS_FOR_CURATION_FAIL action', () => {
    const action = GetStagingProductsForCurationFail({ payload: '' });
    expect(action.type).toEqual(StagingEum.STAGING_RETRIEVE_PRODUCTS_FOR_CURATION_FAIL);
  });

  it('should create an STAGING_RETRIEVE_PRODUCTS_ITEMS_VIEW action', () => {
    const action = GetStagingProductItemForView({ payload: '' });
    expect(action.type).toEqual(StagingEum.STAGING_RETRIEVE_PRODUCTS_ITEMS_VIEW);
  });

  it('should create an STAGING_RETRIEVE_PRODUCTS_ITEMS_VIEW_FAIL action', () => {
    const action = GetStagingProductItemForViewFail({ payload: '' });
    expect(action.type).toEqual(StagingEum.STAGING_RETRIEVE_PRODUCTS_ITEMS_VIEW_FAIL);
  });

  it('should create an STAGING_RETRIEVE_PRODUCTS_ITEMS_VIEW_SUCCESS action', () => {
    const action = GetStagingProductItemForViewSuccess({ payload: '' });
    expect(action.type).toEqual(StagingEum.STAGING_RETRIEVE_PRODUCTS_ITEMS_VIEW_SUCCESS);
  });


  it('should create an STAGING_CURATION_WORKBENCH_DOWNLOAD_FILE action', () => {
    const action = StagingCurationWorkbenchDownloadFile({ payload: '' });
    expect(action.type).toEqual(StagingEum.STAGING_CURATION_WORKBENCH_DOWNLOAD_FILE);
  });

  it('should create an STAGING_CURATION_WORKBENCH_DOWNLOAD_FILE_SUCCESS action', () => {
    const action = StagingCurationWorkbenchDownloadFileSuccess({ payload: '' });
    expect(action.type).toEqual(StagingEum.STAGING_CURATION_WORKBENCH_DOWNLOAD_FILE_SUCCESS);
  });

  it('should create an STAGING_CURATION_WORKBENCH_DOWNLOAD_FILE_FAIL action', () => {
    const action = StagingCurationWorkbenchDownloadFileFail({ payload: '' });
    expect(action.type).toEqual(StagingEum.STAGING_CURATION_WORKBENCH_DOWNLOAD_FILE_FAIL);
  });

  it('should create an CLOSE_SIDEBAR_AT action', () => {
    const action = CloseStagingCurationSidebar({ payload: '' });
    expect(action.type).toEqual(StagingEum.CLOSE_SIDEBAR_AT);
  });

  
  it('should create an STAGING_CURATION_SAVE_FOR_LATER_WB action', () => {
    const action = StagingCurationSaveForLaterWB({ payload: '' });
    expect(action.type).toEqual(StagingEum.STAGING_CURATION_SAVE_FOR_LATER_WB);
  });

  
  it('should create an STAGING_CURATION_SAVE_FOR_LATER_WB_SUCCESS action', () => {
    const action = StagingCurationSaveForLaterWBSuccess({ payload: '' });
    expect(action.type).toEqual(StagingEum.STAGING_CURATION_SAVE_FOR_LATER_WB_SUCCESS);
  });

  
  it('should create an STAGING_CURATION_SAVE_FOR_LATER_WB_FAIL action', () => {
    const action = StagingCurationSaveForLaterWBFail({ payload: '' });
    expect(action.type).toEqual(StagingEum.STAGING_CURATION_SAVE_FOR_LATER_WB_FAIL);
  });
   
  it('should create an STAGING_CURATION_TASK_SUBMISSION_WB action', () => {
    const action = StagingCurationTaskSubmission({ payload: '' });
    expect(action.type).toEqual(StagingEum.STAGING_CURATION_TASK_SUBMISSION_WB);
  });

  it('should create an STAGING_CURATION_TASK_SUBMISSION_WB_SUCCESS action', () => {
    const action = StagingCurationTaskSubmissionSuccess({ payload: '' });
    expect(action.type).toEqual(StagingEum.STAGING_CURATION_TASK_SUBMISSION_WB_SUCCESS);
  });

  it('should create an STAGING_CURATION_TASK_SUBMISSION_WB_FAIL action', () => {
    const action = StagingCurationTaskSubmissionFail({ payload: '' });
    expect(action.type).toEqual(StagingEum.STAGING_CURATION_TASK_SUBMISSION_WB_FAIL);
  });

  
});
