import { StagingEum } from './../actions/staging-curation.actions';
import { initialState, StagingCurationReducer } from './staging-curation.reducer';
const dataView = [
  {
    distributorName: 'henry-schein',
    itemPGUID: 'urn:asset:16:2528e754-9b98-487c-9633-72a8f9eacd61',
    itemKey: '1292846',
    manfKey: 'MISDFK',
    manfDesc: 'SKLAR INSTRUMENTS',
    stdManfDesc: 'SKLAR',
    stdParentManf: 'SKLAR',
    itemDesc: 'Biopsy Punch Keyes 3mm Sharp/Round Ea',
    itemUNSPSC: '42291713',
    itemUNSPSCDesc:
      'MEDICAL EQUIPMENT AND ACCESSORIES AND SUPPLIES \\ SURGICAL PRODUCTS \\ SURGICAL HAND DRILLS AND REAMERS AND PUNCTURING INSTRUMENTS AND ACCESSORIES AND RELATED PRODUCTS \\ SURGICAL PUNCHES OR PUNCH HOLDERS'
  }
];

const dataForCuration = [
  {
    prodBrandDist: 'Sklar Instruments',
    prodBrandMastered: '',
    prodUNSPSCCodeDist: '',
    prodUNSPSCDescDist: '',
    currentUNSPSCCode: 'current_unspsc_code',
    currentUNSPSCDesc: 'current_unspsc_desc',
    unspscAnalystName: '',
    unspscComments: '',
    newUNSPSCCode: '',
    newUNSPSCDesc: '',
    productID: 5741,
    prodSKU: '06-4143',
    prodDesc: 'BIOPSY PUNCH KEYES 3MM SHARP/ROUND EA',
    prodManf: 'SKLAR',
    prodParentManf: 'SKLAR',
    prodConvFactor: '2'
  }
];

describe('Reducer: Staging Curation WB Graph', () => {
  it('should loading true on STAGING_RETRIEVE_PRODUCTS_FOR_CURATION ', () => {
    const action = { type: StagingEum.STAGING_RETRIEVE_PRODUCTS_FOR_CURATION };
    const expected = { ...initialState, loadingState: { loading: true }, StagingProductsData: null, ProductItems: null };
    expect(StagingCurationReducer(initialState, action)).toEqual(expected);
  });

  xit('should loading false and have data on STAGING_RETRIEVE_PRODUCTS_FOR_CURATION_SUCCESS ', () => {
    const action = { type: StagingEum.STAGING_RETRIEVE_PRODUCTS_FOR_CURATION_SUCCESS, payload: dataForCuration  };
    const expected = { ...initialState, loadingState: { loading: false }, StagingProductsData: dataForCuration };
    expect(StagingCurationReducer(initialState, action)).toEqual(expected);
  });

  it('should loading false and have data on STAGING_RETRIEVE_PRODUCTS_FOR_CURATION_Fail', () => {
    const action = { type: StagingEum.STAGING_RETRIEVE_PRODUCTS_FOR_CURATION_FAIL };
    const expected = { ...initialState, loadingState: { loading: false }, StagingProductsData: null };
    expect(StagingCurationReducer(initialState, action)).toEqual(expected);
  });

  it('should loading true STAGING_RETRIEVE_PRODUCTS_ITEMS_VIEW', () => {
    const action = { type: StagingEum.STAGING_RETRIEVE_PRODUCTS_ITEMS_VIEW };
    const expected = { ...initialState, loadingState: { loading: false }, ProductItems: null };
    expect(StagingCurationReducer(initialState, action)).toEqual(expected);
  });

  xit('should loading false and have data on STAGING_RETRIEVE_PRODUCTS_ITEMS_VIEW_SUCCESS ', () => {
    const action = { type: StagingEum.STAGING_RETRIEVE_PRODUCTS_ITEMS_VIEW_SUCCESS, action: { payload: dataView } };
    const expected = { ...initialState, loadingState: { loading: false }, ProductItems: dataView };
    expect(StagingCurationReducer(initialState, action)).toEqual(expected);
  });

  it('should loading false and have data on STAGING_RETRIEVE_PRODUCTS_ITEMS_VIEW_FAIL ', () => {
    const action = { type: StagingEum.STAGING_RETRIEVE_PRODUCTS_ITEMS_VIEW_FAIL };
    const expected = { ...initialState, loadingState: { loading: false }, ProductItems: null };
    expect(StagingCurationReducer(initialState, action)).toEqual(expected);
  });

  it('should loading true STAGING_CURATION_WORKBENCH_DOWNLOAD_FILE', () => {
    const action = { type: StagingEum.STAGING_CURATION_WORKBENCH_DOWNLOAD_FILE };
    const expected = { ...initialState, loadingState: { loading: true } };
    expect(StagingCurationReducer(initialState, action)).toEqual(expected);
  });

  it('should loading false and have data on STAGING_CURATION_WORKBENCH_DOWNLOAD_FILE_SUCCESS ', () => {
    const action = { type: StagingEum.STAGING_CURATION_WORKBENCH_DOWNLOAD_FILE_SUCCESS };
    const expected = { ...initialState, loadingState: { loading: false } };
    expect(StagingCurationReducer(initialState, action)).toEqual(expected);
  });

  it('should loading false and have data on STAGING_CURATION_WORKBENCH_DOWNLOAD_FILE_FAIL ', () => {
    const action = { type: StagingEum.STAGING_CURATION_WORKBENCH_DOWNLOAD_FILE_FAIL };
    const expected = { ...initialState, loadingState: { loading: false } };
    expect(StagingCurationReducer(initialState, action)).toEqual(expected);
  });

  it('should loading true on STAGING_CURATION_WORKBENCH_UPLOAD_FILE ', () => {
    const action = { type: StagingEum.STAGING_CURATION_WORKBENCH_UPLOAD_FILE };
    const expected = { ...initialState, loadingState: { loading: true } };
    expect(StagingCurationReducer(initialState, action)).toEqual(expected);
  });

  it('should loading true on STAGING_CURATION_WORKBENCH_UPLOAD_FILE_SUCCESS ', () => {
    const action = { type: StagingEum.STAGING_CURATION_WORKBENCH_UPLOAD_FILE_SUCCESS };
    const expected = { ...initialState, loadingState: { loading: false } };
    expect(StagingCurationReducer(initialState, action)).toEqual(expected);
  });

  
  it('should loading true on STAGING_CURATION_WORKBENCH_UPLOAD_FILE_FAIL ', () => {
    const action = { type: StagingEum.STAGING_CURATION_WORKBENCH_UPLOAD_FILE_FAIL };
    const expected = { ...initialState, loadingState: { loading: false } };
    expect(StagingCurationReducer(initialState, action)).toEqual(expected);
  });

  it('should loading true on CLOSE_SIDEBAR_AT ', () => {
    const action = { type: StagingEum.CLOSE_SIDEBAR_AT,payload:0};
    const expected = { ...initialState, closeSidebarAt:0 };
    expect(StagingCurationReducer(initialState, action)).toEqual(expected);
  });

  it('should loading true on STAGING_CURATION_SAVE_FOR_LATER_WB ', () => {
    const action = { type: StagingEum.STAGING_CURATION_SAVE_FOR_LATER_WB };
    const expected = { ...initialState, loadingState: { loading: true } };
    expect(StagingCurationReducer(initialState, action)).toEqual(expected);
  });

  it('should loading true on STAGING_CURATION_SAVE_FOR_LATER_WB_SUCCESS ', () => {
    const action = { type: StagingEum.STAGING_CURATION_SAVE_FOR_LATER_WB_SUCCESS };
    const expected = { ...initialState, loadingState: { loading: false } };
    expect(StagingCurationReducer(initialState, action)).toEqual(expected);
  });

  it('should loading true on STAGING_CURATION_SAVE_FOR_LATER_WB_FAIL ', () => {
    const action = { type: StagingEum.STAGING_CURATION_SAVE_FOR_LATER_WB_FAIL };
    const expected = { ...initialState, loadingState: { loading: false } };
    expect(StagingCurationReducer(initialState, action)).toEqual(expected);
  });
  
  it('should loading true on STAGING_CURATION_TASK_SUBMISSION_WB ', () => {
    const action = { type: StagingEum.STAGING_CURATION_TASK_SUBMISSION_WB };
    const expected = { ...initialState, loadingState: { loading: true } };
    expect(StagingCurationReducer(initialState, action)).toEqual(expected);
  });

  it('should loading true on STAGING_CURATION_TASK_SUBMISSION_WB_SUCCESS ', () => {
    const action = { type: StagingEum.STAGING_CURATION_TASK_SUBMISSION_WB_SUCCESS };
    const expected = { ...initialState, loadingState: { loading: false } };
    expect(StagingCurationReducer(initialState, action)).toEqual(expected);
  });

  it('should loading true on STAGING_CURATION_TASK_SUBMISSION_WB_FAIL ', () => {
    const action = { type: StagingEum.STAGING_CURATION_TASK_SUBMISSION_WB_FAIL };
    const expected = { ...initialState, loadingState: { loading: false } };
    expect(StagingCurationReducer(initialState, action)).toEqual(expected);
  });


});
