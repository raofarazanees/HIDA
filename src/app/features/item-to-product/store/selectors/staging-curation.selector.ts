import { createSelector } from "@ngrx/store";
import { getStagingCurationState, StagingCurationState } from "../reducers";

export const GetStagingLoadingState = createSelector(getStagingCurationState, (state: StagingCurationState) => state.loadingState?.loading);

export const retrieveProductStagingCuration = createSelector(getStagingCurationState, (state: StagingCurationState) => state?.StagingProductsData);
export const stagingProductItemView = createSelector(getStagingCurationState, (state: StagingCurationState) => state?.ProductItems);
export const closeSidebarAtStatus = createSelector(getStagingCurationState, (state: StagingCurationState) => state?.closeSidebarAt);
export const retrieveProductForFinalReview = createSelector(getStagingCurationState, (state: StagingCurationState) => state?.stagingCurationFinalReviewProducts);

