import { ProductStagingCreateTask, ProductStagingEnum } from '../actions';
import { initialState, ProductStagingReducer } from './product-staging.reducer';

describe('Reducer: Product Staging ', () => {
  it('should return loading true on PRODUCT_STAGING_GET_UNSPSCS', () => {
    const action = { type: ProductStagingEnum.PRODUCT_STAGING_GET_UNSPSCS };
    const expected = { ...initialState, loadingState: { loading: true }, ProductStagingUNSPSCsData: null };
    expect(ProductStagingReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading true on PRODUCT_STAGING_GET_UNSPSCS_SUCCESS', () => {
    const action = { type: ProductStagingEnum.PRODUCT_STAGING_GET_UNSPSCS_SUCCESS, payload: null };
    const expected = { ...initialState, loadingState: { loading: false }, ProductStagingUNSPSCsData: null };
    expect(ProductStagingReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading true on PRODUCT_STAGING_GET_UNSPSCS_FAIL', () => {
    const action = { type: ProductStagingEnum.PRODUCT_STAGING_GET_UNSPSCS_FAIL, payload: null };
    const expected = { ...initialState, loadingState: { loading: false }, ProductStagingUNSPSCsData: null };
    expect(ProductStagingReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading true on PRODUCT_LEVEL_CLUSTERING_FILE_UPLOAD', () => {
    const action = { type: ProductStagingEnum.PRODUCT_LEVEL_CLUSTERING_FILE_UPLOAD };
    const expected = { ...initialState, loadingState: { loading: true } };
    expect(ProductStagingReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on PRODUCT_LEVEL_CLUSTERING_FILE_UPLOAD_SUCCESS', () => {
    const action = { type: ProductStagingEnum.PRODUCT_LEVEL_CLUSTERING_FILE_UPLOAD_SUCCESS };
    const expected = { ...initialState, loadingState: { loading: false } };
    expect(ProductStagingReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on PRODUCT_LEVEL_CLUSTERING_FILE_UPLOAD_FAIL', () => {
    const action = { type: ProductStagingEnum.PRODUCT_LEVEL_CLUSTERING_FILE_UPLOAD_FAIL };
    const expected = { ...initialState, loadingState: { loading: false } };
    expect(ProductStagingReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading true on PRODUCT_STAGING_CREATE_TASK_SELECTED_PRODUCT', () => {
    const action = { type: ProductStagingEnum.PRODUCT_STAGING_CREATE_TASK_SELECTED_PRODUCT };
    const expected = { ...initialState, loadingState: { loading: true } };
    expect(ProductStagingReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on PRODUCT_STAGING_CREATE_TASK_SELECTED_PRODUCT_SUCCESS', () => {
    const action = { type: ProductStagingEnum.PRODUCT_STAGING_CREATE_TASK_SELECTED_PRODUCT_SUCCESS };
    const expected = { ...initialState, loadingState: { loading: false } };
    expect(ProductStagingReducer(initialState, action)).toEqual(expected);
  });

  
  it('should return loading false on PRODUCT_STAGING_CREATE_TASK_SELECTED_PRODUCT_FAIL', () => {
    const action = { type: ProductStagingEnum.PRODUCT_STAGING_CREATE_TASK_SELECTED_PRODUCT_FAIL };
    const expected = { ...initialState, loadingState: { loading: false } };
    expect(ProductStagingReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading true on PRODUCT_STAGING_SELECTED_PRODUCT_FILE_DOWNLOAD', () => {
    const action = { type: ProductStagingEnum.PRODUCT_STAGING_SELECTED_PRODUCT_FILE_DOWNLOAD };
    const expected = { ...initialState, loadingState: { loading: true } };
    expect(ProductStagingReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on PRODUCT_STAGING_SELECTED_PRODUCT_FILE_DOWNLOAD_SUCCESS', () => {
    const action = { type: ProductStagingEnum.PRODUCT_STAGING_SELECTED_PRODUCT_FILE_DOWNLOAD_SUCCESS };
    const expected = { ...initialState, loadingState: { loading: false } };
    expect(ProductStagingReducer(initialState, action)).toEqual(expected);
  });

  
  it('should return loading false on PRODUCT_STAGING_SELECTED_PRODUCT_FILE_DOWNLOAD_FAIL', () => {
    const action = { type: ProductStagingEnum.PRODUCT_STAGING_SELECTED_PRODUCT_FILE_DOWNLOAD_FAIL };
    const expected = { ...initialState, loadingState: { loading: false } };
    expect(ProductStagingReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading true on STAGING_CURATION_TRIGGER_OUTBOUND_REFRESH', () => {
    const action = { type: ProductStagingEnum.STAGING_CURATION_TRIGGER_OUTBOUND_REFRESH };
    const expected = { ...initialState, loadingStateTrigger: { loading: true } };
    expect(ProductStagingReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on STAGING_CURATION_TRIGGER_OUTBOUND_REFRESH_SUCCESS', () => {
    const action = { type: ProductStagingEnum.STAGING_CURATION_TRIGGER_OUTBOUND_REFRESH_SUCCESS };
    const expected = { ...initialState, loadingStateTrigger: { loading: false } };
    expect(ProductStagingReducer(initialState, action)).toEqual(expected);
  });
  it('should return loading false on STAGING_CURATION_TRIGGER_OUTBOUND_REFRESH_FAIL', () => {
    const action = { type: ProductStagingEnum.STAGING_CURATION_TRIGGER_OUTBOUND_REFRESH_FAIL };
    const expected = { ...initialState, loadingStateTrigger: { loading: false } };
    expect(ProductStagingReducer(initialState, action)).toEqual(expected);
  });


});
