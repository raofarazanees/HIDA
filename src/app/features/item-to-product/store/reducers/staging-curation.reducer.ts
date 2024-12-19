import { Action, createReducer, on } from '@ngrx/store';
import { productItemView, stagingCurationProducts } from 'src/app/model/staging-curation/product-curation';
import {StagingCurationWorkbenchUploadFile, CloseStagingCurationSidebar, GetStagingProductItemForView, GetStagingProductItemForViewFail, GetStagingProductItemForViewSuccess, GetStagingProductsForCuration, GetStagingProductsForCurationFail, GetStagingProductsForCurationSuccess, StagingCurationWorkbenchDownloadFile, StagingCurationWorkbenchDownloadFileFail, StagingCurationWorkbenchDownloadFileSuccess, StagingCurationWorkbenchUploadFileSuccess, StagingCurationWorkbenchUploadFileFail, StagingCurationSaveForLaterWB, StagingCurationSaveForLaterWBSuccess, StagingCurationSaveForLaterWBFail, StagingCurationTaskSubmission, StagingCurationTaskSubmissionSuccess, StagingCurationTaskSubmissionFail } from '../actions';
import { GetStagingCurationFinalProductForReview, GetStagingCurationFinalProductForReviewFail, GetStagingCurationFinalProductForReviewSuccess, StagingCurationSubmitFinalConfirmation, StagingCurationSubmitFinalConfirmationFail, StagingCurationSubmitFinalConfirmationSuccess } from './../actions/staging-curation.actions';

export class loadingState {
  loading: boolean;
  public static default(): loadingState {
    return {
      loading: false
    };
  }
}

export interface StagingCurationState {
  loadingState: loadingState;
  StagingProductsData: stagingCurationProducts[];
  ProductItems: productItemView[];
  closeSidebarAt?:number,
  stagingCurationFinalReviewProducts: stagingCurationProducts[];

}

export const initialState: StagingCurationState = {
  loadingState: loadingState.default(),
  StagingProductsData: null,
  ProductItems:null,
  closeSidebarAt: 0,
  stagingCurationFinalReviewProducts:null
};

const featureReducer = createReducer(
  initialState,
  on(GetStagingProductsForCuration, (state) => ({ ...state, loadingState: { loading: true } })),
  on(GetStagingProductsForCurationSuccess, (state, action) => ({
    ...state,
    loadingState: { loading: false },
    StagingProductsData: action.payload
  })),
  on(GetStagingProductsForCurationFail, (state) => ({ ...state, loadingState: { loading: false }, StagingProductsData: null })),
  on(GetStagingProductItemForView, (state) => ({ ...state, loadingState: { loading: false }, ProductItems: null })),
  on(GetStagingProductItemForViewSuccess, (state, action) => ({ ...state, loadingState: { loading: false }, ProductItems: action.payload })),
  on(GetStagingProductItemForViewFail, (state) => ({ ...state, loadingState: { loading: false }, ProductItems: null })),
  on(StagingCurationWorkbenchDownloadFile, (state) => ({ ...state, loadingState: { loading: true }})),
  on(StagingCurationWorkbenchDownloadFileSuccess, (state) => ({ ...state, loadingState: { loading: false }})),
  on(StagingCurationWorkbenchDownloadFileFail, (state) => ({ ...state, loadingState: { loading: false } })),
  on(StagingCurationWorkbenchUploadFile, (state) => ({ ...state, loadingState: { loading: true }})),
  on(StagingCurationWorkbenchUploadFileSuccess, (state) => ({ ...state, loadingState: { loading: false }})),
  on(StagingCurationWorkbenchUploadFileFail, (state) => ({ ...state, loadingState: { loading: false } })),
  on(CloseStagingCurationSidebar, (state, action) => ({ ...state, closeSidebarAt:action.payload  })),
  on(StagingCurationSaveForLaterWB, (state) => ({ ...state, loadingState: { loading: true }})),
  on(StagingCurationSaveForLaterWBSuccess, (state) => ({ ...state, loadingState: { loading: false }})),
  on(StagingCurationSaveForLaterWBFail, (state) => ({ ...state, loadingState: { loading: false } })),
  on(StagingCurationTaskSubmission, (state) => ({ ...state, loadingState: { loading: true }})),
  on(StagingCurationTaskSubmissionSuccess, (state) => ({ ...state, loadingState: { loading: false }})),
  on(StagingCurationTaskSubmissionFail, (state) => ({ ...state, loadingState: { loading: false } })),
  on(GetStagingCurationFinalProductForReview, (state) => ({ ...state, loadingState: { loading: true }})),
  on(GetStagingCurationFinalProductForReviewSuccess, (state, action) => ({ ...state, loadingState: { loading: false },stagingCurationFinalReviewProducts:action.payload})),
  on(GetStagingCurationFinalProductForReviewFail, (state) => ({ ...state, loadingState: { loading: false },stagingCurationFinalReviewProducts: null })),
  on(StagingCurationSubmitFinalConfirmation, (state) => ({ ...state, loadingState: { loading: true }})),
  on(StagingCurationSubmitFinalConfirmationSuccess, (state) => ({ ...state, loadingState: { loading: false }})),
  on(StagingCurationSubmitFinalConfirmationFail, (state) => ({ ...state, loadingState: { loading: false } }))
  
);

export function StagingCurationReducer(state: StagingCurationState | undefined, action: Action) {
  return featureReducer(state, action);
}
