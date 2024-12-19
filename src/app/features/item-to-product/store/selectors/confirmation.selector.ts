import { createSelector } from '@ngrx/store';

import { ConfirmationState, getConfirmationState } from '../reducers';

export const getItemPairsLoading = createSelector(getConfirmationState, (state: ConfirmationState) => state.loading);
export const getConfirmationLoading = createSelector(getConfirmationState, (state: ConfirmationState) => state.confirmLoading);
export const getItemPairs = createSelector(getConfirmationState, (state: ConfirmationState) => state.itemPairs);
