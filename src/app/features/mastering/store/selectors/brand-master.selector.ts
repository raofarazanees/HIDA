import { createSelector } from '@ngrx/store';
import { MasteringState, getToolsFilterState } from '../reducers';

export const GetLoadingState = createSelector(getToolsFilterState, (state: MasteringState) => state.brandMasterState.loadingState.loading);

export const GetBrandMasterCVRecords = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.brandMasterState?.brandCVResponse
);

export const GetBrandCVChangeLogRecords = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.brandMasterState?.brandChangeLogRecords
);

export const GetBrandMappingRecords$ = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.brandMasterState?.brandMappingResponse
);

export const GetActiveBrandRecords$ = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.brandMasterState?.activeBrandRecords
);

export const GetBrandSourceRecords = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.brandMasterState?.brandSourceRecords
);

export const getCreatedBrandCVForAssign = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.brandMasterState.autoAssignRecord
);
