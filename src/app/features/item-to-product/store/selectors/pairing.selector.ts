import { createSelector } from '@ngrx/store';

import { getPairingState, PairingState } from '../reducers';

export const getPairsLoading = createSelector(getPairingState, (state: PairingState) => state.loading);
export const getPairs = createSelector(getPairingState, (state: PairingState) => state.pairs);
