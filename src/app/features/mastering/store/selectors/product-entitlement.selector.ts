import { closeUploadDrawer } from './../actions/product-entitlement.action';
import { MasteringState, getToolsFilterState } from '../reducers';
import { createSelector } from "@ngrx/store";

export const GetLoadingStateProduct = createSelector(getToolsFilterState, (state: MasteringState) => state.productEntitlementState.loadingState.loading);

export const GetProductEntitlements$ = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.productEntitlementState.productEntitlementRecord
);

export const GetSearchUnspscRecord$ = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.productEntitlementState?.unspscSearchRecord
);

export const GetActiveBrandMapping$ = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.productEntitlementState?.activeBrandMappings
);


export const GetProductChangeLogs$ = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.productEntitlementState?.productChangeLogRecords
);

export const GetItemToProductDetails = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.productEntitlementState?.itemToProductGraphDetails
);

export const closeUploadAtStatus = createSelector(getToolsFilterState, (state: MasteringState) => state.productEntitlementState?.closeUploadDrawerPim);

export const getProdManfSkuDuplicates$ = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.productEntitlementState?.prodManfSkuDuplicateRecords
);

export const GetProductList$ = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.productEntitlementState.productDuplicateList
);

export const GetI2PGraphHistoryChangeLogData = createSelector(
  getToolsFilterState,
  (state: MasteringState) => state.productEntitlementState.I2PGrahHistoryChangeLogRecords
);
