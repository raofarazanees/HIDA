import {
  AddSearchCriteriaProductAttribute,
  ChangeProductAttributeFilterValue,
  CloseDrawerAt,
  CommonActionsEnum,
  DownloadProductAttributeTagFileSuccess,
  DownloadProductMergeUnmergedGraphFile,
  DownloadProductMergeUnmergedGraphFileFailed,
  DownloadProductMergeUnmergedGraphFileSuccess,
  DownProductAttributeTagFile,
  DownProductAttributeTagFileFailed,
  FacilityTypeCVsUploadFile,
  FacilityTypeCVsUploadFileFail,
  FacilityTypeCVsUploadFileSuccess,
  GetActiveAttributesMaster,
  GetActiveAttributesMasterFail,
  GetActiveAttributesMasterSuccess,
  GetGraphProductItemReview,
  GetGraphProductItemReviewFail,
  GetGraphProductItemReviewSuccess,
  GetUploadedFileDetails,
  GetUploadedFileDetailsFail,
  GetUploadedFileDetailsSuccess,
  GetUploadedFileHistory,
  GetUploadedFileHistoryFail,
  GetUploadedFileHistorySuccess,
  I2PItemPairsForResolutionFileUpload,
  I2PItemPairsForResolutionFileUploadFail,
  I2PItemPairsForResolutionFileUploadSuccess,
  ManufacturerCVsUploadFile,
  ManufacturerCVsUploadFileFail,
  ManufacturerCVsUploadFileSuccess,
  ManufacturerParentChildUploadFile,
  ManufacturerParentChildUploadFileFail,
  ManufacturerParentChildUploadFileSuccess,
  SearchCriteriaProductGraphMerge,
  SearchCriteriaProductGraphMergeFilter,
  UploadAttributeMasterFile,
  UploadAttributeMasterFileFail,
  UploadAttributeMasterFileSuccess,
  UploadProductAttributeTagFile,
  UploadProductAttributeTagFileFailed,
  UploadProductAttributeTagFileSuccess,
  UploadProductMergeUnmergedGraphFile,
  UploadProductMergeUnmergedGraphFileFailed,
  UploadProductMergeUnmergedGraphFileSuccess,
  UploadUnspscClientCorrectionFile,
  UploadUnspscClientCorrectionFileFail,
  UploadUnspscClientCorrectionFileSuccess,
  UploadUnspscReclassificationFile,
  UploadUnspscReclassificationFileFail,
  UploadUnspscReclassificationFileSuccess,
  WidgetSelectionChange
} from './common.actions';

describe('Actions :: Common Actions', () => {
  it('should create an UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE action', () => {
    const action = new UploadProductAttributeTagFile({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE);
  });

  it('should create an UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_FAIL action', () => {
    const action = new UploadProductAttributeTagFileFailed({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_FAIL);
  });

  it('should create an UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_SUCCESS action', () => {
    const action = new UploadProductAttributeTagFileSuccess({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_SUCCESS);
  });

  it('should create an DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE action', () => {
    const action = new DownProductAttributeTagFile({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE);
  });

  it('should create an DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_FAIL action', () => {
    const action = new DownProductAttributeTagFileFailed({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_FAIL);
  });

  it('should create an DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_SUCCESS action', () => {
    const action = new DownloadProductAttributeTagFileSuccess({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_SUCCESS);
  });

  it('should create an GET_ACTIVE_ATTRIBUTE_MASTER action', () => {
    const action = new GetActiveAttributesMaster();
    expect(action.type).toEqual(CommonActionsEnum.GET_ACTIVE_ATTRIBUTE_MASTER);
  });

  it('should create an GET_ACTIVE_ATTRIBUTE_MASTER_FAIL action', () => {
    const action = new GetActiveAttributesMasterFail({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.GET_ACTIVE_ATTRIBUTE_MASTER_FAIL);
  });

  it('should create an GET_ACTIVE_ATTRIBUTE_MASTER_SUCCESS action', () => {
    const action = new GetActiveAttributesMasterSuccess({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.GET_ACTIVE_ATTRIBUTE_MASTER_SUCCESS);
  });

  it('should create an ADD_SEARCH_CRITERIA_PRODUCT_ATTRIBUTE action', () => {
    const action = new AddSearchCriteriaProductAttribute({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.ADD_SEARCH_CRITERIA_PRODUCT_ATTRIBUTE);
  });

  it('should create an CHANGE_CRITERIA_PRODUCT_ATTRIBUTE_VALUE action', () => {
    const action = new ChangeProductAttributeFilterValue({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.CHANGE_CRITERIA_PRODUCT_ATTRIBUTE_VALUE);
  });

  it('should create an CHANGE_CRITERIA_PRODUCT_ATTRIBUTE_VALUE action', () => {
    const action = new ChangeProductAttributeFilterValue({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.CHANGE_CRITERIA_PRODUCT_ATTRIBUTE_VALUE);
  });

  it('should create an UPLOAD_PRODUCT_GRAPH_MANAGE_FILE action', () => {
    const action = new UploadProductMergeUnmergedGraphFile({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.UPLOAD_PRODUCT_GRAPH_MANAGE_FILE);
  });

  it('should create an UPLOAD_PRODUCT_GRAPH_MANAGE_FILE_SUCCESS action', () => {
    const action = new UploadProductMergeUnmergedGraphFileSuccess({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.UPLOAD_PRODUCT_GRAPH_MANAGE_FILE_SUCCESS);
  });

  it('should create an UPLOAD_PRODUCT_GRAPH_MANAGE_FILE_FAIL action', () => {
    const action = new UploadProductMergeUnmergedGraphFileFailed({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.UPLOAD_PRODUCT_GRAPH_MANAGE_FILE_FAIL);
  });

  it('should create an DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE action', () => {
    const action = new DownloadProductMergeUnmergedGraphFile({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE);
  });

  it('should create an DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE_SUCCESS action', () => {
    const action = new DownloadProductMergeUnmergedGraphFileSuccess({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE_SUCCESS);
  });

  it('should create an DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE_FAIL action', () => {
    const action = new DownloadProductMergeUnmergedGraphFileFailed({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE_FAIL);
  });

  it('should create an SEARCH_CRITERIA_PRODUCT_GRAPH_MERGE_UNMERGED action', () => {
    const action = new SearchCriteriaProductGraphMerge({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.SEARCH_CRITERIA_PRODUCT_GRAPH_MERGE_UNMERGED);
  });

  it('should create an SEARCH_CRITERIA_PRODUCT_GRAPH_MERGE_UNMERGED action', () => {
    const action = new SearchCriteriaProductGraphMergeFilter({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.CHANGE_CRITERIA_PRODUCT_GRAPH_FILTER_VALUE);
  });

  it('should create an GET_UPLOADED_FILE_DETAILS_FAIL action', () => {
    const action = new GetUploadedFileDetailsFail({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.GET_UPLOADED_FILE_DETAILS_FAIL);
  });

  
  it('should create an GET_UPLOADED_FILE_DETAILS_SUCCESS action', () => {
    const action = new GetUploadedFileDetailsSuccess({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.GET_UPLOADED_FILE_DETAILS_SUCCESS);
  });

  it('should create an GET_UPLOADED_FILE_DETAILS action', () => {
    const action = new GetUploadedFileDetails({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.GET_UPLOADED_FILE_DETAILS);
  });

  it('should create an GET_UPLOADED_FILE_HISTORY_FAIL action', () => {
    const action = new GetUploadedFileHistoryFail({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.GET_UPLOADED_FILE_HISTORY_FAIL);
  });

  it('should create an GET_UPLOADED_FILE_HISTORY_SUCCESS action', () => {
    const action = new GetUploadedFileHistorySuccess({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.GET_UPLOADED_FILE_HISTORY_SUCCESS);
  });

  it('should create an GET_UPLOADED_FILE_HISTORY action', () => {
    const action = new GetUploadedFileHistory({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.GET_UPLOADED_FILE_HISTORY);
  });

  it('should create an I2P_ITEM_PAIRS_FOR_RESOLUTION_FILE_UPLOAD_FILE_FAIL action', () => {
    const action = new I2PItemPairsForResolutionFileUploadFail({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.I2P_ITEM_PAIRS_FOR_RESOLUTION_FILE_UPLOAD_FILE_FAIL);
  });
  
  it('should create an I2P_ITEM_PAIRS_FOR_RESOLUTION_FILE_UPLOAD_FILE_SUCCESS action', () => {
    const action = new I2PItemPairsForResolutionFileUploadSuccess({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.I2P_ITEM_PAIRS_FOR_RESOLUTION_FILE_UPLOAD_FILE_SUCCESS);
  });
  
  it('should create an I2P_ITEM_PAIRS_FOR_RESOLUTION_FILE_UPLOAD_FILE action', () => {
    const action = new I2PItemPairsForResolutionFileUpload({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.I2P_ITEM_PAIRS_FOR_RESOLUTION_FILE_UPLOAD_FILE);
  });

    
  it('should create an MANUFACTURER_PARENT_CHILD_UPLOAD_FILE_FAIL action', () => {
    const action = new ManufacturerParentChildUploadFileFail({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.MANUFACTURER_PARENT_CHILD_UPLOAD_FILE_FAIL);
  });

  it('should create an MANUFACTURER_PARENT_CHILD_UPLOAD_FILE_SUCCESS action', () => {
    const action = new ManufacturerParentChildUploadFileSuccess({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.MANUFACTURER_PARENT_CHILD_UPLOAD_FILE_SUCCESS);
  });

  it('should create an MANUFACTURER_PARENT_CHILD_UPLOAD_FILE action', () => {
    const action = new ManufacturerParentChildUploadFile({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.MANUFACTURER_PARENT_CHILD_UPLOAD_FILE);
  });

  it('should create an MANUFACTURER_CVS_UPLOAD_FILE_FAIL action', () => {
    const action = new ManufacturerCVsUploadFileFail({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.MANUFACTURER_CVS_UPLOAD_FILE_FAIL);
  });

  it('should create an MANUFACTURER_CVS_UPLOAD_FILE_SUCCESS action', () => {
    const action = new ManufacturerCVsUploadFileSuccess({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.MANUFACTURER_CVS_UPLOAD_FILE_SUCCESS);
  });

  it('should create an MANUFACTURER_CVS_UPLOAD_FILE action', () => {
    const action = new ManufacturerCVsUploadFile({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.MANUFACTURER_CVS_UPLOAD_FILE);
  });

  it('should create an FACILITY_TYPE_CVS_UPLOAD_FILE_FAIL action', () => {
    const action = new FacilityTypeCVsUploadFileFail({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.FACILITY_TYPE_CVS_UPLOAD_FILE_FAIL);
  });

  it('should create an FACILITY_TYPE_CVS_UPLOAD_FILE_SUCCESS action', () => {
    const action = new FacilityTypeCVsUploadFileSuccess({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.FACILITY_TYPE_CVS_UPLOAD_FILE_SUCCESS);
  });

  it('should create an FACILITY_TYPE_CVS_UPLOAD_FILE action', () => {
    const action = new FacilityTypeCVsUploadFile({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.FACILITY_TYPE_CVS_UPLOAD_FILE);
  });

  it('should create an UPLOAD_UNSPSC_CLIENT_CORRECTION_FILE_FAIL action', () => {
    const action = new UploadUnspscClientCorrectionFileFail({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.UPLOAD_UNSPSC_CLIENT_CORRECTION_FILE_FAIL);
  });

  it('should create an UPLOAD_UNSPSC_CLIENT_CORRECTION_FILE_SUCCESS action', () => {
    const action = new UploadUnspscClientCorrectionFileSuccess({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.UPLOAD_UNSPSC_CLIENT_CORRECTION_FILE_SUCCESS);
  });

  it('should create an UPLOAD_UNSPSC_CLIENT_CORRECTION_FILE action', () => {
    const action = new UploadUnspscClientCorrectionFile({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.UPLOAD_UNSPSC_CLIENT_CORRECTION_FILE);
  });

  it('should create an UPLOAD_ATTRIBUTE_MASTER_FILE action', () => {
    const action = new UploadAttributeMasterFile({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.UPLOAD_ATTRIBUTE_MASTER_FILE);
  });

  it('should create an UPLOAD_ATTRIBUTE_MASTER_FILE_SUCCESS action', () => {
    const action = new UploadAttributeMasterFileSuccess({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.UPLOAD_ATTRIBUTE_MASTER_FILE_SUCCESS);
  });

  it('should create an UPLOAD_ATTRIBUTE_MASTER_FILE_FAIL action', () => {
    const action = new UploadAttributeMasterFileFail({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.UPLOAD_ATTRIBUTE_MASTER_FILE_FAIL);
  });

  it('should create an UPLOAD_UNSPSC_RECLASSIFICATION_FILE_FAIL action', () => {
    const action = new UploadUnspscReclassificationFileFail({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.UPLOAD_UNSPSC_RECLASSIFICATION_FILE_FAIL);
  });

  it('should create an UPLOAD_UNSPSC_RECLASSIFICATION_FILE_SUCCESS action', () => {
    const action = new UploadUnspscReclassificationFileSuccess({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.UPLOAD_UNSPSC_RECLASSIFICATION_FILE_SUCCESS);
  });

  it('should create an UPLOAD_UNSPSC_RECLASSIFICATION_FILE action', () => {
    const action = new UploadUnspscReclassificationFile({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.UPLOAD_UNSPSC_RECLASSIFICATION_FILE);
  });

  it('should create an CLOSE_DRAWER_AT action', () => {
    const action = new CloseDrawerAt({ time: '' });
    expect(action.type).toEqual(CommonActionsEnum.CLOSE_DRAWER_AT);
  });


  it('should create an WIDGET_SELECTION_CHANGE action', () => {
    const action = new WidgetSelectionChange({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.WIDGET_SELECTION_CHANGE);
  });

  it('should create an GET_GRAPH_PRODUCT_ITEM_VIEW action', () => {
    const action = new GetGraphProductItemReview({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.GET_GRAPH_PRODUCT_ITEM_VIEW);
  });

  it('should create an GetGraphProductItemReviewSuccess action', () => {
    const action = new GetGraphProductItemReviewSuccess({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.GET_GRAPH_PRODUCT_ITEM_VIEW_SUCCESS);
  });

  it('should create an GetGraphProductItemReviewFail action', () => {
    const action = new GetGraphProductItemReviewFail({ payload: '' });
    expect(action.type).toEqual(CommonActionsEnum.GET_GRAPH_PRODUCT_ITEM_VIEW_FAIL);
  });


});
