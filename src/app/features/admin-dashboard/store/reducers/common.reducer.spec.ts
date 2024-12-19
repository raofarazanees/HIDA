import { CommonActionsEnum } from '../actions';
import { Attribute, commonReducer, CommonState, initialFileUpload, initialState, ProductSearchCriteria } from './common.reducer';

const payload = { type: 'error' };

describe('Reducer:', () => {
  it('should have WIDGET_SELECTION_CHANGE', () => {
    const action = { type: CommonActionsEnum.WIDGET_SELECTION_CHANGE, payload: 'Manage Graph' };
    const expected = { ...initialState, selectedWidget: 'Manage Graph' };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should have CLOSE_DRAWER_AT true', () => {
    const date = new Date().getTime();
    const action = { type: CommonActionsEnum.CLOSE_DRAWER_AT, time: date };
    const expected = { ...initialState, closeDrawerAt: date };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should loading true on  UPLOAD_UNSPSC_RECLASSIFICATION_FILE', () => {
    const action = { type: CommonActionsEnum.UPLOAD_UNSPSC_RECLASSIFICATION_FILE };
    const expected = { ...initialState, reclassifiedFileUpload: { loading: true, response: null } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return Null on  UPLOAD_UNSPSC_RECLASSIFICATION_FILE_SUCCESS', () => {
    const action = { type: CommonActionsEnum.UPLOAD_UNSPSC_RECLASSIFICATION_FILE_SUCCESS };
    const expected = { ...initialState, reclassifiedFileUpload: { loading: false, response: undefined } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return Value on GET_ACTIVE_ATTRIBUTE_MASTER_SUCCESS', () => {
    const initAttributeData = [{ id: 1, attributeType: 'Test', attributeLabel: 'Test Label' }];
    const action = { type: CommonActionsEnum.GET_ACTIVE_ATTRIBUTE_MASTER_SUCCESS, payload: initAttributeData };
    const expected = { ...initialState, activeAttributes: { loading: false, response: initAttributeData } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading true on DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE', () => {
    const action = { type: CommonActionsEnum.DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE };
    const expected = { ...initialState, productManageGraphUpload: { response: null, loading: true } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE_SUCCESS', () => {
    const action = { type: CommonActionsEnum.DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE_SUCCESS };
    const expected = {
      ...initialState,
      productManageGraphUpload: { loading: false },
      ProductGraphMergeUnMergedFilter: ProductSearchCriteria.default()
    };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE_FAIL', () => {
    const action = { type: CommonActionsEnum.DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE_FAIL };
    const expected = { ...initialState, productManageGraphUpload: { loading: false } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading true on UPLOAD_PRODUCT_GRAPH_MANAGE_FILE', () => {
    const action = { type: CommonActionsEnum.UPLOAD_PRODUCT_GRAPH_MANAGE_FILE };
    const expected = { ...initialState, productManageGraphUpload: { loading: true } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading true on UPLOAD_PRODUCT_GRAPH_MANAGE_FILE_SUCCESS', () => {
    const action = { type: CommonActionsEnum.UPLOAD_PRODUCT_GRAPH_MANAGE_FILE_SUCCESS };
    const expected = { ...initialState, productManageGraphUpload: { loading: false } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading true on UPLOAD_PRODUCT_GRAPH_MANAGE_FILE_FAIL', () => {
    const action = { type: CommonActionsEnum.UPLOAD_PRODUCT_GRAPH_MANAGE_FILE_FAIL };
    const expected = { ...initialState, productManageGraphUpload: { loading: false } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading true on DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE', () => {
    const action = { type: CommonActionsEnum.DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE };
    const expected = { ...initialState, productAttributeFileUpload: { loading: true } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_SUCCESS', () => {
    const action = { type: CommonActionsEnum.DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_SUCCESS };
    const expected = { ...initialState, productAttributeFileUpload: { loading: false } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_SUCCESS_FAIL', () => {
    const action = { type: CommonActionsEnum.DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_FAIL };
    const expected = { ...initialState, productAttributeFileUpload: { loading: false } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading true on UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE', () => {
    const action = { type: CommonActionsEnum.UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE };
    const expected = { ...initialState, productAttributeFileUpload: { loading: true } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_SUCCESS', () => {
    const action = { type: CommonActionsEnum.UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_SUCCESS };
    const expected = { ...initialState, productAttributeFileUpload: { loading: false } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_FAIL', () => {
    const action = { type: CommonActionsEnum.UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_FAIL };
    const expected = { ...initialState, productAttributeFileUpload: { loading: false } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading true on UPLOAD_ATTRIBUTE_MASTER_FILE', () => {
    const action = { type: CommonActionsEnum.UPLOAD_ATTRIBUTE_MASTER_FILE };
    const expected = { ...initialState, attributeFileUpload: { loading: true, response: null } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading true on UPLOAD_ATTRIBUTE_MASTER_FILE_SUCCESS', () => {
    const action = { type: CommonActionsEnum.UPLOAD_ATTRIBUTE_MASTER_FILE_SUCCESS };
    const expected = { ...initialState, attributeFileUpload: { loading: false, response: undefined } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false and response on UPLOAD_ATTRIBUTE_MASTER_FILE_FAIL', () => {
    const action = { type: CommonActionsEnum.UPLOAD_ATTRIBUTE_MASTER_FILE_FAIL, payload: payload };
    const expected = { ...initialState, attributeFileUpload: { loading: false, response: payload } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading true on FACILITY_TYPE_CVS_UPLOAD_FILE', () => {
    const action = { type: CommonActionsEnum.FACILITY_TYPE_CVS_UPLOAD_FILE };
    const expected = { ...initialState, facilityTypeCVsFileUpload: { loading: true, response: null } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on FACILITY_TYPE_CVS_UPLOAD_FILE_SUCCESS', () => {
    const action = { type: CommonActionsEnum.FACILITY_TYPE_CVS_UPLOAD_FILE_SUCCESS };
    const expected = { ...initialState, facilityTypeCVsFileUpload: { response: undefined, loading: false } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on FACILITY_TYPE_CVS_UPLOAD_FILE_FAIL', () => {
    const action = { type: CommonActionsEnum.FACILITY_TYPE_CVS_UPLOAD_FILE_FAIL, payload: payload };
    const expected = { ...initialState, facilityTypeCVsFileUpload: { loading: false, response: payload } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading true on MANUFACTURER_CVS_UPLOAD_FILE', () => {
    const action = { type: CommonActionsEnum.MANUFACTURER_CVS_UPLOAD_FILE };
    const expected = { ...initialState, manufacturerCVsFileUpload: { loading: true, response: null } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on MANUFACTURER_CVS_UPLOAD_FILE_SUCCESS', () => {
    const action = { type: CommonActionsEnum.MANUFACTURER_CVS_UPLOAD_FILE_SUCCESS };
    const expected = { ...initialState, manufacturerCVsFileUpload: { loading: false, response: undefined } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on MANUFACTURER_CVS_UPLOAD_FILE_FAIL', () => {
    const payload = { type: 'error' };
    const action = { type: CommonActionsEnum.MANUFACTURER_CVS_UPLOAD_FILE_FAIL, payload: payload };
    const expected = { ...initialState, manufacturerCVsFileUpload: { loading: false, response: payload } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading true on MANUFACTURER_PARENT_CHILD_UPLOAD_FILE', () => {
    const action = { type: CommonActionsEnum.MANUFACTURER_PARENT_CHILD_UPLOAD_FILE };
    const expected = { ...initialState, manufacturerParentChildFileUpload: { loading: true, response: null } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on MANUFACTURER_PARENT_CHILD_UPLOAD_FILE_SUCCESS', () => {
    const action = { type: CommonActionsEnum.MANUFACTURER_PARENT_CHILD_UPLOAD_FILE_SUCCESS };
    const expected = { ...initialState, manufacturerParentChildFileUpload: { loading: false, response: undefined } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on MANUFACTURER_PARENT_CHILD_UPLOAD_FILE_FAIL', () => {
    const action = { type: CommonActionsEnum.MANUFACTURER_PARENT_CHILD_UPLOAD_FILE_FAIL, payload: payload };
    const expected = { ...initialState, manufacturerParentChildFileUpload: { loading: false, response: payload } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading true on I2P_ITEM_PAIRS_FOR_RESOLUTION_FILE_UPLOAD_FILE', () => {
    const action = { type: CommonActionsEnum.I2P_ITEM_PAIRS_FOR_RESOLUTION_FILE_UPLOAD_FILE };
    const expected = { ...initialState, i2pItemPairsForResolutionFileUpload: { loading: true, response: null } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on I2P_ITEM_PAIRS_FOR_RESOLUTION_FILE_UPLOAD_FILE_SUCCESS', () => {
    const action = { type: CommonActionsEnum.I2P_ITEM_PAIRS_FOR_RESOLUTION_FILE_UPLOAD_FILE_SUCCESS };
    const expected = { ...initialState, i2pItemPairsForResolutionFileUpload: { loading: false, response: undefined } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false and response on I2P_ITEM_PAIRS_FOR_RESOLUTION_FILE_UPLOAD_FILE_FAIL', () => {
    const action = { type: CommonActionsEnum.I2P_ITEM_PAIRS_FOR_RESOLUTION_FILE_UPLOAD_FILE_FAIL, payload: payload };
    const expected = { ...initialState, i2pItemPairsForResolutionFileUpload: { loading: false, response: payload } };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading true on GET_UPLOADED_FILE_HISTORY', () => {
    const action = { type: CommonActionsEnum.GET_UPLOADED_FILE_HISTORY };
    const expected = {
      ...initialState,
      uploadedFileHistory: { loading: true, response: null, detailsLoading: false, detailsResponse: null }
    };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false and have status on GET_UPLOADED_FILE_HISTORY_SUCCESS', () => {
    const action = { type: CommonActionsEnum.GET_UPLOADED_FILE_HISTORY_SUCCESS, payload: [{ status: 'Success' }] };
    const expected = {
      ...initialState,
      uploadedFileHistory: {
        loading: false,
        detailsLoading: false,
        detailsResponse: null,
        response: [{ status: 'Success', statusCode: 4 }]
      }
    };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on GET_UPLOADED_FILE_HISTORY_FAIL', () => {
    const action = { type: CommonActionsEnum.GET_UPLOADED_FILE_HISTORY_FAIL };
    const expected = {
      ...initialState,
      uploadedFileHistory: { loading: false, detailsLoading: false, detailsResponse: null, response: null }
    };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading true on GET_UPLOADED_FILE_DETAILS', () => {
    const action = { type: CommonActionsEnum.GET_UPLOADED_FILE_DETAILS };
    const expected = {
      ...initialState,
      uploadedFileHistory: { loading: false, response: null, detailsLoading: true, detailsResponse: null }
    };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on GET_UPLOADED_FILE_DETAILS_SUCCESS', () => {
    const payloadSuccess = { status: 'Success' };
    const action = { type: CommonActionsEnum.GET_UPLOADED_FILE_DETAILS_SUCCESS, payload: payloadSuccess };
    const expected = {
      ...initialState,
      uploadedFileHistory: { loading: false, response: null, detailsLoading: false, detailsResponse: payloadSuccess }
    };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on GET_UPLOADED_FILE_DETAILS_FAIL', () => {
    const action = { type: CommonActionsEnum.GET_UPLOADED_FILE_DETAILS_FAIL };
    const expected = {
      ...initialState,
      uploadedFileHistory: { loading: false, response: null, detailsLoading: false, detailsResponse: null }
    };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return data on GET_ACTIVE_ATTRIBUTE_MASTER_SUCCESS', () => {
    const responsePayload: Attribute[] = [{ id: 123, attributeType: 'Data', attributeLabel: 'Test' }];
    const action = { type: CommonActionsEnum.GET_ACTIVE_ATTRIBUTE_MASTER_SUCCESS, payload: responsePayload };
    const expected = {
      ...initialState,
      activeAttributes: { loading: false, response: responsePayload }
    };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading true on DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE', () => {
    const action = { type: CommonActionsEnum.DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE };
    const expected = {
      ...initialState,
      productAttributeFileUpload: { loading: true }
    };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_FAIL', () => {
    const action = { type: CommonActionsEnum.DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_FAIL };
    const expected = {
      ...initialState,
      productAttributeFileUpload: { loading: false }
    };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_FAIL', () => {
    const action = { type: CommonActionsEnum.UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_FAIL };
    const expected = {
      ...initialState,
      productAttributeFileUpload: { loading: false }
    };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading true on UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE', () => {
    const action = { type: CommonActionsEnum.UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE };
    const expected = {
      ...initialState,
      productAttributeFileUpload: { loading: true }
    };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_SUCCESS', () => {
    const action = { type: CommonActionsEnum.UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_SUCCESS };
    const expected = {
      ...initialState,
      productAttributeFileUpload: { loading: false }
    };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_SUCCESS', () => {
    const action = { type: CommonActionsEnum.DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_SUCCESS };
    const expected = {
      ...initialState,
      productAttributeFileUpload: { loading: false },
      productDownloadFilter: ProductSearchCriteria.default()
    };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading true on UPLOAD_PRODUCT_GRAPH_MANAGE_FILE', () => {
    const action = { type: CommonActionsEnum.UPLOAD_PRODUCT_GRAPH_MANAGE_FILE };
    const expected = {
      ...initialState,
      productManageGraphUpload: { loading: true }
    };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on UPLOAD_PRODUCT_GRAPH_MANAGE_FILE_SUCCESS', () => {
    const action = { type: CommonActionsEnum.UPLOAD_PRODUCT_GRAPH_MANAGE_FILE_SUCCESS };
    const expected = {
      ...initialState,
      productManageGraphUpload: { loading: false }
    };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on UPLOAD_PRODUCT_GRAPH_MANAGE_FILE_FAIL', () => {
    const action = { type: CommonActionsEnum.UPLOAD_PRODUCT_GRAPH_MANAGE_FILE_FAIL };
    const expected = {
      ...initialState,
      productManageGraphUpload: { loading: false }
    };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading true on DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE', () => {
    const action = { type: CommonActionsEnum.DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE };
    const expected = {
      ...initialState,
      productManageGraphUpload: { loading: true, response:null }
    };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE_SUCCESS', () => {
    const action = { type: CommonActionsEnum.DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE_SUCCESS };
    const expected = {
      ...initialState,
      productManageGraphUpload: { loading: false },
      ProductGraphMergeUnMergedFilter: ProductSearchCriteria.default()
    };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE_FAIL', () => {
    const action = { type: CommonActionsEnum.DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE_FAIL };
    const expected = {
      ...initialState,
      productManageGraphUpload: { loading: false }
    };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return default state', () => {
    const action = { type: '' };
    expect(commonReducer(initialState, action)).toEqual(initialState);
  });

  it('should return loading true on GET_GRAPH_PRODUCT_ITEM_VIEW', () => {
    const action = { type: CommonActionsEnum.GET_GRAPH_PRODUCT_ITEM_VIEW };
    const expected = {
      ...initialState,
      GraphItemProductView: { loading: true, response: null }
    };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false and response data on GET_GRAPH_PRODUCT_ITEM_VIEW_SUCCESS', () => {
   
    const action = { type: CommonActionsEnum.GET_GRAPH_PRODUCT_ITEM_VIEW_SUCCESS,payload:null };
    const expected = {
      ...initialState,
      GraphItemProductView: { loading: false, response: null }
    };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false and response data on GET_GRAPH_PRODUCT_ITEM_VIEW_FAIL', () => {
   
    const action = { type: CommonActionsEnum.GET_GRAPH_PRODUCT_ITEM_VIEW_FAIL,payload:null };
    const expected = {
      ...initialState,
      GraphItemProductView: { loading: false, response: null }
    };
    expect(commonReducer(initialState, action)).toEqual(expected);
  });

  

});
