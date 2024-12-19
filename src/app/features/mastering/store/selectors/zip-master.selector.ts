import { createSelector } from "@ngrx/store";
import { MasteringState, getToolsFilterState } from "../reducers";


export const GetLoadingStateZip = createSelector(
    getToolsFilterState,
    (state: MasteringState) => state.zipMasterState.loadingState.loading
  );

export const GetZipMasterRecordsData = createSelector(
    getToolsFilterState,
    (state: MasteringState) => state.zipMasterState?.zipSearchedRecords
  );


export const GetZipChangeLog$ = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.zipMasterState?.zipChangeLogRecords
);



