import { createSelector } from "@ngrx/store";
import { MasteringState, getToolsFilterState } from "../reducers";


export const GetLoadingStateUnspsc = createSelector(
    getToolsFilterState,
    (state: MasteringState) => state.unspscMasterState.loadingState.loading
  );

export const GetUnspscMasterRecordsData = createSelector(
    getToolsFilterState,
    (state: MasteringState) => state.unspscMasterState?.UnspscSearchedRecords
  );

  
export const GetActiveMarketData$ = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.unspscMasterState?.activeMarketRecords
);


export const GetUnspscChangeLog$ = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.unspscMasterState?.unspscChangeLogRecords
);

export const GetMarketMasterRecords$ = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.unspscMasterState?.MarketMasterData
);

export const getCreatedMarketForAssign = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.unspscMasterState.autoAssignRecordMarket
);

export const getListOfBusinessUsers = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.unspscMasterState.activeBusinessUsers
);

