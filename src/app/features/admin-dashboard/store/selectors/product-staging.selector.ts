import { createSelector } from "@ngrx/store";
import { getProductStagingState, ProductStagingState } from "../reducers";

export const GetProductStagingLoading = createSelector(getProductStagingState, (state: ProductStagingState) => state.loadingState?.loading);
export const GetProductStagingLoadingTrigger = createSelector(getProductStagingState, (state: ProductStagingState) => state.loadingStateTrigger?.loading);

export const retrieveProductStagingUNSPSCs = createSelector(getProductStagingState, (state: ProductStagingState) => state?.ProductStagingUNSPSCsData);

export const getUnspscWorkFlowStatus = createSelector(getProductStagingState, (state: ProductStagingState) => state?.unspscWorkflowStatus);

export const GetSkuWorkflowLoading = createSelector(getProductStagingState, (state: ProductStagingState) => state.loadingState?.loading);
