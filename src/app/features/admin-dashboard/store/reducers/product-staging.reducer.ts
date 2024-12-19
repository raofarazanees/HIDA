import { BrandFeatureSuggestion, BrandFeatureSuggestionFail, BrandFeatureSuggestionSuccess, TriggerBrandAutomationDAGSuccess } from './../actions/common.actions';
import { ProductStagingUploadFileForLabelling, ProductStagingUploadFileForLabellingSuccess, ProductStagingUploadFileForLabellingFail, StagingCurationTriggerOutboundProcess, StagingCurationTriggerOutboundProcessSuccess, StagingCurationTriggerOutboundProcessFail, UomCorrectionFileUpload, UomCorrectionFileUploadSuccess, UomCorrectionFileUploadFail, UomRegularFileUpload, UomRegularFileUploadSuccess, UomRegularFileUploadFail, UoMAdhocFileUpload, UoMAdhocFileUploadSuccess, UoMAdhocFileUploadFail, SkuDataForClusteringFileUpload, SkuDataForClusteringFileUploadSuccess, SkuDataForClusteringFileUploadFail } from './../actions/product-staging.action';
import { Action, createReducer, on, State } from '@ngrx/store';
import { GetProductStagingUNSPSCs, ProductStagingUNSPSCsFail, ProductStagingEnum, ProductStagingUNSPSCsSuccess, ProductLevelClusteringFileUpload, ProductLevelClusteringFileUploadSuccess, ProductLevelClusteringFileUploadFail, ProductStagingCreateTask, ProductStagingCreateTaskSuccess, ProductStagingCreateTaskFail, ProductStagingDownloadFile, ProductStagingDownloadFileSuccess, ProductStagingDownloadFileFail, ProductStagingUploadFileSuccess, ProductStagingUploadFile, ProductStagingUploadFileFail, UploadASPFile, UploadASPFileSuccess, UploadASPFileFail, UploadUNSPSCWorkFlowFile, UploadUNSPSCWorkFlowFileSuccess, UploadUNSPSCWorkFlowFileFail, TriggerBrandAutomationDAG, TriggerBrandAutomationDAGFail, InitUNSPSCWorkflowWithMarketSuccess, InitUNSPSCWorkflowWithMarketFail, InitUNSPSCWorkflowWithMarket } from '../actions';

export class loadingState {
  loading: boolean;
  public static default(): loadingState {
    return {
      loading: false
    };
  }
}
export interface ProductStagingInterface {
  prodBrandDist: string,
  prodBrandMastered: string,
  prodUNSPSCCodeDist: string,
  prodUNSPSCDescDist: string,
  currentUNSPSCCode: string,
  currentUNSPSCDesc: string,
  unspscAnalystName: string,
  unspscComments: string,
  productID: string | number,
  prodSKU: string,
  prodDesc: string,
  prodManf: string,
  prodParentManf: string,
  prodConvFactor: string | number,
}


export interface ProductStagingState {
  loadingState: loadingState;
  loadingStateTrigger: loadingState;
  ProductStagingUNSPSCsData: Array<ProductStagingInterface>,
  unspscWorkflowStatus: string;
}

export const initialState: ProductStagingState = {
  loadingState: loadingState.default(),
  loadingStateTrigger: loadingState.default(),
  ProductStagingUNSPSCsData: null,
  unspscWorkflowStatus: ''
};

const featureReducer = createReducer(
  initialState,
  on(GetProductStagingUNSPSCs, (state) => ({ ...state, loadingState: { loading: true }, ProductStagingUNSPSCsData: null })),
  on(ProductStagingUNSPSCsSuccess, (state, action) => ({ ...state, loadingState: { loading: false }, ProductStagingUNSPSCsData: action.payload })),
  on(ProductStagingUNSPSCsFail, (state, action) => ({ ...state, loadingState: { loading: false }, ProductStagingUNSPSCsData: null })),
  on(ProductLevelClusteringFileUpload, (state) => ({ ...state, loadingState: { loading: true } })),
  on(ProductLevelClusteringFileUploadSuccess, (state) => ({ ...state, loadingState: { loading: false } })),
  on(ProductLevelClusteringFileUploadFail, (state) => ({ ...state, loadingState: { loading: false } })),
  on(ProductStagingCreateTask, (state) => ({ ...state, loadingState: { loading: true } })),
  on(ProductStagingCreateTaskSuccess, (state) => ({ ...state, loadingState: { loading: false } })),
  on(ProductStagingCreateTaskFail, (state) => ({ ...state, loadingState: { loading: false } })),
  on(ProductStagingDownloadFile, (state) => ({ ...state, loadingState: { loading: true } })),
  on(ProductStagingDownloadFileSuccess, (state) => ({ ...state, loadingState: { loading: false } })),
  on(ProductStagingDownloadFileFail, (state) => ({ ...state, loadingState: { loading: false } })),
  on(ProductStagingUploadFile, (state) => ({ ...state, loadingState: { loading: true } })),
  on(ProductStagingUploadFileSuccess, (state) => ({ ...state, loadingState: { loading: false } })),
  on(ProductStagingUploadFileFail, (state) => ({ ...state, loadingState: { loading: false } })),
  on(ProductStagingUploadFileForLabelling, (state) => ({ ...state, loadingState: { loading: true } })),
  on(ProductStagingUploadFileForLabellingSuccess, (state) => ({ ...state, loadingState: { loading: false } })),
  on(ProductStagingUploadFileForLabellingFail, (state) => ({ ...state, loadingState: { loading: false } })),
  on(StagingCurationTriggerOutboundProcess, (state) => ({ ...state, loadingStateTrigger: { loading: true } })),
  on(StagingCurationTriggerOutboundProcessSuccess, (state) => ({ ...state, loadingStateTrigger: { loading: false } })),
  on(StagingCurationTriggerOutboundProcessFail, (state) => ({ ...state, loadingStateTrigger: { loading: false } })),
  on(UomRegularFileUpload, (state) => ({ ...state, loadingState: { loading: true } })),
  on(UomRegularFileUploadSuccess, (state) => ({ ...state, loadingState: { loading: false } })),
  on(UomRegularFileUploadFail, (state) => ({ ...state, loadingState: { loading: false } })),
  on(UomCorrectionFileUpload, (state) => ({ ...state, loadingState: { loading: true } })),
  on(UomCorrectionFileUploadSuccess, (state) => ({ ...state, loadingState: { loading: false } })),
  on(UomCorrectionFileUploadFail, (state) => ({ ...state, loadingState: { loading: false } })),
  on(UploadASPFile, (state) => ({ ...state, loadingState: { loading: true } })),
  on(UploadASPFileSuccess, (state) => ({ ...state, loadingState: { loading: false } })),
  on(UploadASPFileFail, (state) => ({ ...state, loadingState: { loading: false } })),
  on(UploadUNSPSCWorkFlowFile, (state) => ({ ...state, loadingState: { loading: true } })),
  on(UploadUNSPSCWorkFlowFileSuccess, (state) => ({ ...state, loadingState: { loading: false } })),
  on(UploadUNSPSCWorkFlowFileFail, (state) => ({ ...state, loadingState: { loading: false } })),
  on(InitUNSPSCWorkflowWithMarket, (state) => ({ ...state, loadingStateTrigger: { loading: true }, unspscWorkflowStatus: '' })),
  on(InitUNSPSCWorkflowWithMarketSuccess, (state) => ({ ...state, loadingStateTrigger: { loading: false }, unspscWorkflowStatus: 'completed' })),
  on(InitUNSPSCWorkflowWithMarketFail, (state) => ({ ...state, loadingStateTrigger: { loading: false }, unspscWorkflowStatus: 'failed' })),
  on(UoMAdhocFileUpload, (state) => ({ ...state, loadingState: { loading: true } })),
  on(UoMAdhocFileUploadSuccess, (state) => ({ ...state, loadingState: { loading: false } })),
  on(UoMAdhocFileUploadFail, (state) => ({ ...state, loadingState: { loading: false } })),
  on(SkuDataForClusteringFileUpload, (state) => ({ ...state, loadingState: { loading: true } })),
  on(SkuDataForClusteringFileUploadSuccess, (state) => ({ ...state, loadingState: { loading: false } })),
  on(SkuDataForClusteringFileUploadFail, (state) => ({ ...state, loadingState: { loading: false } })),
  on(TriggerBrandAutomationDAG, (state) => ({ ...state, loadingStateTrigger: { loading: true } })),
  on(TriggerBrandAutomationDAGSuccess, (state) => ({ ...state, loadingStateTrigger: { loading: false } })),
  on(TriggerBrandAutomationDAGFail, (state) => ({ ...state, loadingStateTrigger: { loading: false } })),
  on(BrandFeatureSuggestion, (state) => ({ ...state, loadingStateTrigger: { loading: true }, unspscWorkflowStatus: '' })),
  on(BrandFeatureSuggestionSuccess, (state) => ({ ...state, loadingStateTrigger: { loading: false }, unspscWorkflowStatus: 'completed' })),
  on(BrandFeatureSuggestionFail, (state) => ({ ...state, loadingStateTrigger: { loading: false }, unspscWorkflowStatus: 'failed' }))
);

export function ProductStagingReducer(state: ProductStagingState | undefined, action: Action) {
  return featureReducer(state, action);
}
