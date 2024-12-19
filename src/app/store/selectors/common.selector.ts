import { createSelector } from '@ngrx/store';

import { CommonState, getCommonState } from '../reducers';

export const getDistributors = createSelector(getCommonState, (state: CommonState) => state?.distributors);
export const getRouteState = createSelector(getCommonState, (state: CommonState) => state?.routeState);
export const getTaskDetails = createSelector(getCommonState, (state: CommonState) => state?.taskDetails);
export const getActiveDistributorPguid = createSelector(getCommonState, (state: CommonState) => state?.activeDistributorPguid);
export const getLoadingState = createSelector(getCommonState, (state: CommonState) => state?.loading);
export const getUpdatingTaskState = createSelector(getCommonState, (state: CommonState) => state?.updatingTask);
export const getAppEnv  = createSelector(getCommonState, (state: CommonState) => state?.appEnv);
