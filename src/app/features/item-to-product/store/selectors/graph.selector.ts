import { createSelector } from '@ngrx/store';

import { getGraphState, GraphState } from '../reducers';

export const getItemGraph = createSelector(getGraphState, (state: GraphState) => state.itemGraphs);
export const getGraphLoading = createSelector(getGraphState, (state: GraphState) => state.loading);
export const getItemForProductGraph = createSelector(getGraphState, (state: GraphState) => state.itemsProduct);
export const getProductBrandData = createSelector(getGraphState, (state: GraphState) => state.productBrandConfirmation?.response);
