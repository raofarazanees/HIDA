import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { CommonState, commonReducer } from './common.reducer';

export interface ManufacturerState {
  common: CommonState;
}

export const reducers: ActionReducerMap<ManufacturerState, any> = {
  common: commonReducer
};

export const getManufacturerState = createFeatureSelector<ManufacturerState>('manufacturer');

export const getCommonState = createSelector(getManufacturerState, (state: ManufacturerState) => state.common);

export { CommonState } from './common.reducer';
