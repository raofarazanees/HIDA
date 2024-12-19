import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { CommonState, commonReducer } from './common.reducer';

export interface SalesRestateState {
  common: CommonState;
}

export const reducers: ActionReducerMap<SalesRestateState, any> = {
  common: commonReducer
};

export const getSalesRestateState = createFeatureSelector<SalesRestateState>('salesRestate');

export const getCommonState = createSelector(
  getSalesRestateState,
  (state: SalesRestateState) => state.common
);

export { CommonState } from './common.reducer';
