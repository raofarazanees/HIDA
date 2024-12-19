import { createSelector } from '@ngrx/store';
import { getToolsFilterState, MasteringState } from '../reducers';

export const GetLoadingFacilityState = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.facilityMasterState.loadingState.loading
);

export const getFacilityMasterData$ = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.facilityMasterState.facilityMasterRecords
);

export const getActiveFacilityMasterRecords$ = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.facilityMasterState?.activeFacilityMasterRecords
);

export const getRecordsForMappings$ = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.facilityMasterState?.facilityForMappingRecords
);

export const getFacilityChangeLogRecords$ = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.facilityMasterState?.facilityMasterChangeLogRecords
);

export const getFacilityMappedData$ = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.facilityMasterState?.facilityMappedResponse
);


export const getCreatedFacilityForAssign = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.facilityMasterState.autoAssignRecordFacility
);


export const getAllFacRecords$ = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.facilityMasterState.facilityAllRecordsResponse
);

export const GetUpdateFacRecords$ = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.facilityMasterState?.updatedFacRecords
);
