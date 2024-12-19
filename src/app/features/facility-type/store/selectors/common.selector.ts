import { createSelector } from '@ngrx/store';

import { CommonState, getCommonState } from '../reducers';

export const getOntologyMappings = createSelector(getCommonState, (state: CommonState) => state.ontologyMappings);
export const getLoadingState = createSelector(getCommonState, (state: CommonState) => state.loading);
export const getChangeLog = createSelector(getCommonState, (state: CommonState) => state.changeLog);
export const getChangeLogLoader = createSelector(getCommonState, (state: CommonState) => state.changeLogLoader);
export const getUpdateMasteredRecordLoader = createSelector(getCommonState, (state: CommonState) => state.updateMasteredRecordLoader);
