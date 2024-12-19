import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { CommonState, commonReducer } from './common.reducer';

export interface FacilityTypeState {
  common: CommonState;
}

export const reducers: ActionReducerMap<FacilityTypeState, any> = {
  common: commonReducer
};

export const getFacilityState = createFeatureSelector<FacilityTypeState>('facility');

export const getCommonState = createSelector(getFacilityState, (state: FacilityTypeState) => state.common);

export { CommonState } from './common.reducer';
