import { createSelector } from '@ngrx/store';

import { CommonState, getCommonState } from '../reducers';

export const getSubmitState = createSelector(getCommonState, (state: CommonState) => state.loading);
