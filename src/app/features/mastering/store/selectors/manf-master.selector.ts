import { createSelector } from '@ngrx/store';
import { getToolsFilterState, MasteringState } from '../reducers';

export const CloseDialogAt = createSelector(getToolsFilterState, (state: MasteringState) => state.manfMasterState?.closeDialogAt);

export const GetLoadingState = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.manfMasterState.loadingState.loading
);
export const getParentManfData = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.manfMasterState.parentManfRecords
);

export const getMasteredTabFormValue = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.manfMasterState?.masteredTabSearchFormState
);

export const GetAllActiveParentManf = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.manfMasterState?.activeParentManfRecords
);
export const GetChildParentsManf = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.manfMasterState.childParentManfRecords
);

export const GetParentManfChangeLogData = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.manfMasterState.ManfChangeLogRecords
);


export const GetAllActiveChildManfRecords = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.manfMasterState.activeChildManfRecords
);

export const GetAllManfForMapping = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.manfMasterState.manfRecordsForMapping
);


export const GetMappedManfRecords = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.manfMasterState.mappedMasteredRecords
);

export const GetParentChildTopMap = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.manfMasterState?.parentChildTopMapping
);

export const getCratedManfRecord = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.manfMasterState.manfAutoAssignRecords
);

export const GetAllManfRecordsData$ = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.manfMasterState?.allManfRecords
);

export const GetUpdateManfRecords$ = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.manfMasterState?.updatedManfRecords
);

export const GetParentLoadingState = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.manfMasterState.loadingState.parentLoading
);

export const GetParentChildLoadingState = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.manfMasterState.loadingState.parentChildLoading
);


export const GetTopManfLoadingState = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.manfMasterState.loadingState.parentChildRelLoading
);