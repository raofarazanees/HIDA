import { createSelector } from "@ngrx/store";
import { getBrandMaster,BrandState } from "../reducers";

export const getBrandLoadingState = createSelector(getBrandMaster, (state: BrandState) => state.brandLoadingState?.loading);

export const getProductBrandLoadingState = createSelector(getBrandMaster, (state: BrandState) => state.brandLoadingState?.loading);

export const getProductBrandRecords = createSelector(getBrandMaster, (state: BrandState) => state.ActiveBrandMaster.response);
export const retrieveProductBrandLoading = createSelector(getBrandMaster, (state: BrandState) => state.productBrandReviewState?.loading);

export const retrieveProductBrand = createSelector(getBrandMaster, (state: BrandState) => state.productBrandReviewState?.response);
