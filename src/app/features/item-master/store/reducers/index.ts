import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { CommonState, commonReducer } from './common.reducer';

export interface ItemMasterState {
  common: CommonState;
}

export const reducers: ActionReducerMap<ItemMasterState, any> = {
  common: commonReducer
};

export const getItemMasterState = createFeatureSelector<ItemMasterState>('item-master');

export const getCommonState = createSelector(getItemMasterState, (state: ItemMasterState) => state?.common);

export { CommonState } from './common.reducer';
