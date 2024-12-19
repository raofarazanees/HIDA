import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { BrandState,brandReducer } from './brand.reducer';

import { CommonState, commonReducer } from './common.reducer';
import { I2PReducer, I2PState } from './I2P.reducer';
import { ProductStagingReducer, ProductStagingState } from './product-staging.reducer';

export interface DashboardState {
  common: CommonState;
  I2P: I2PState,
  brand: BrandState,
  productStaging:ProductStagingState
}

export const reducers: ActionReducerMap<DashboardState, any> = {
  common: commonReducer,
  I2P : I2PReducer,
  brand: brandReducer,
  productStaging: ProductStagingReducer

};

export const getFacilityState = createFeatureSelector<DashboardState>('dashboard');

export const getCommonState = createSelector(getFacilityState, (state: DashboardState) => state.common);

export const getI2PState = createSelector(getFacilityState, (state: DashboardState) => state.I2P);

export const getBrandMaster = createSelector(getFacilityState, (state: DashboardState) => state?.brand);

export const getProductStagingState = createSelector(getFacilityState, (state: DashboardState) => state?.productStaging);


export { CommonState } from './common.reducer';
export { I2PState } from './I2P.reducer';
export { BrandState } from './brand.reducer';
export { ProductStagingState } from './product-staging.reducer'
