import { BrandMasterCV, BrandMasterCVFail, BrandMasterCVSuccess, CommonBrandActionsEnum } from '../actions/brand.actions';
import { brandReducer, initialState } from './brand.reducer';

describe('Reducer: Brand ', () => {
  it('should return loading true on BRAND_MASTER_CV_UPLOAD', () => {
    const action = { type: CommonBrandActionsEnum.BRAND_MASTER_CV_UPLOAD };
    const expected = { ...initialState, brandLoadingState: { loading: true } };
    expect(brandReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on BRAND_MASTER_CV_UPLOAD_SUCCESS', () => {
    const action = { type: CommonBrandActionsEnum.BRAND_MASTER_CV_UPLOAD_SUCCESS };
    const expected = { ...initialState, brandLoadingState: { loading: false } };
    expect(brandReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on BRAND_MASTER_CV_UPLOAD_SUCCESS', () => {
    const action = { type: CommonBrandActionsEnum.BRAND_MASTER_CV_UPLOAD_FAIL };
    const expected = { ...initialState, brandLoadingState: { loading: false } };
    expect(brandReducer(initialState, action)).toEqual(expected);
  });


  it('should return loading true on BRAND_PRODUCT_MAPPING_UPLOAD', () => {
    const action = { type: CommonBrandActionsEnum.BRAND_PRODUCT_MAPPING_UPLOAD };
    const expected = { ...initialState, brandLoadingState: { loading: true } };
    expect(brandReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on BRAND_PRODUCT_MAPPING_UPLOAD_FAIL', () => {
    const action = { type: CommonBrandActionsEnum.BRAND_PRODUCT_MAPPING_UPLOAD_FAIL };
    const expected = { ...initialState, brandLoadingState: { loading: false } };
    expect(brandReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on BRAND_PRODUCT_MAPPING_UPLOAD_FAIL', () => {
    const action = { type: CommonBrandActionsEnum.BRAND_PRODUCT_MAPPING_UPLOAD_SUCCESS };
    const expected = { ...initialState, brandLoadingState: { loading: false } };
    expect(brandReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading true on GET_ACTIVE_MASTER_BRAND', () => {
    const action = { type: CommonBrandActionsEnum.GET_ACTIVE_MASTER_BRAND };
    const expected = { ...initialState, ActiveBrandMaster: { loading: true } };
    expect(brandReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on GET_ACTIVE_MASTER_BRAND_SUCCESS', () => {
    const action = { type: CommonBrandActionsEnum.GET_ACTIVE_MASTER_BRAND_SUCCESS, payload: null };
    const expected = { ...initialState, ActiveBrandMaster: { loading: false, response: null } };
    expect(brandReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on GET_ACTIVE_MASTER_BRAND_FAIL', () => {
    const action = { type: CommonBrandActionsEnum.GET_ACTIVE_MASTER_BRAND_FAIL };
    const expected = { ...initialState, ActiveBrandMaster: { loading: false, response: null } };
    expect(brandReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading true on GET_PRODUCT_BRAND_TAGGING_VIEW', () => {
    const action = { type: CommonBrandActionsEnum.GET_PRODUCT_BRAND_TAGGING_VIEW };
    const expected = { ...initialState, productBrandReviewState: { loading: true } };
    expect(brandReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false and payload null on GET_PRODUCT_BRAND_TAGGING_VIEW_SUCCESS', () => {
    const action = { type: CommonBrandActionsEnum.GET_PRODUCT_BRAND_TAGGING_VIEW_SUCCESS, payload: null };
    const expected = { ...initialState, productBrandReviewState: { loading: false, response: null } };
    expect(brandReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false and payload null on GET_PRODUCT_BRAND_TAGGING_VIEW_FAIL', () => {
    const action = { type: CommonBrandActionsEnum.GET_PRODUCT_BRAND_TAGGING_VIEW_FAIL };
    const expected = { ...initialState, productBrandReviewState: { loading: false, response: null } };
    expect(brandReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading true on DOWNLOAD_PRODUCT_BRAND_TAGGING_FILE', () => {
    const action = { type: CommonBrandActionsEnum.DOWNLOAD_PRODUCT_BRAND_TAGGING_FILE };
    const expected = { ...initialState, brandLoadingState: { loading: true } };
    expect(brandReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on DOWNLOAD_PRODUCT_BRAND_TAGGING_FILE_SUCCESS', () => {
    const action = { type: CommonBrandActionsEnum.DOWNLOAD_PRODUCT_BRAND_TAGGING_FILE_SUCCESS };
    const expected = { ...initialState, brandLoadingState: { loading: false }, productBrandReviewState: { response: null } };
    expect(brandReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on DOWNLOAD_PRODUCT_BRAND_TAGGING_FILE_FAIL', () => {
    const action = { type: CommonBrandActionsEnum.DOWNLOAD_PRODUCT_BRAND_TAGGING_FILE_FAIL };
    const expected = { ...initialState, brandLoadingState: { loading: false } };
    expect(brandReducer(initialState, action)).toEqual(expected);
  });
});
