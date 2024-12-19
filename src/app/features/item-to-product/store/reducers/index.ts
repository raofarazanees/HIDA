import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { confirmationReducer, ConfirmationState } from './confirmation.reducer';
import { graphReducer, GraphState } from './graph.reducer';
import { PairingState, pairingReducer } from './pairing.reducer';
import { StagingCurationReducer, StagingCurationState } from './staging-curation.reducer';

export interface ItemToProductState {
  pairing: PairingState;
  confirmation: ConfirmationState;
  graph: GraphState,
  graphItems: GraphState,
  StagingCuration:StagingCurationState
}

export const reducers: ActionReducerMap<ItemToProductState, any> = {
  pairing: pairingReducer,
  confirmation: confirmationReducer,
  graph: graphReducer,
  graphItems: graphReducer,
  StagingCuration: StagingCurationReducer
};

export const getItemToProductState = createFeatureSelector<ItemToProductState>('itemToProduct');

export const getPairingState = createSelector(getItemToProductState, (state: ItemToProductState) => state.pairing);
export const getConfirmationState = createSelector(getItemToProductState, (state: ItemToProductState) => state.confirmation);
export const getGraphState = createSelector(getItemToProductState, (state: ItemToProductState) => state.graph);

export const getGraphItemsState = createSelector(getItemToProductState, (state: ItemToProductState) => state.graph);
export const getStagingCurationState = createSelector(getItemToProductState, (state: ItemToProductState) => state.StagingCuration);


export { PairingState } from './pairing.reducer';
export { ConfirmationState } from './confirmation.reducer';
export { GraphState } from './graph.reducer';
export { StagingCurationState } from './staging-curation.reducer';
