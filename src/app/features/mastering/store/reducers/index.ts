import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import { manfMasterReducer } from "./manf-master.reducer";
import { manfMasterState } from "../../model/manf-master-models/interface/manf-master.interface";
import { unspscMasterState } from "../../model/manf-master-models/interface/unspsc-master.interface";
import { unspscReducer } from "./unspsc-master.reducer";
import { facilityMasterState } from "../../model/manf-master-models/interface/facility-master-state.interface";
import { facilityReducer } from "./facility-master.reducer";
import { BrandMasterState, brandReducer } from "./brand-master.reducer";
import { ProductEntitlementState } from "../../model/manf-master-models/interface/product-entitlement.interface";
import { productReducer } from "./product-entitlement.reducer";
import { zipMasterState } from "../../model/manf-master-models/interface/zip-master.interface";
import { zipReducer } from "./zip-master.reducer";

export interface MasteringState {
    manfMasterState: manfMasterState,
    unspscMasterState: unspscMasterState,
    zipMasterState: zipMasterState,
    facilityMasterState: facilityMasterState,
    brandMasterState:BrandMasterState,
    productEntitlementState:ProductEntitlementState,
  }
  
  export const reducers: ActionReducerMap<MasteringState, any> = {
    manfMasterState: manfMasterReducer,
    unspscMasterState: unspscReducer,
    facilityMasterState: facilityReducer,
    brandMasterState:brandReducer,
    productEntitlementState:productReducer,
    zipMasterState: zipReducer,
  };

export const getToolsFilterState = createFeatureSelector<MasteringState>('toolsAndFilters');

export { manfMasterState }  from "../../model/manf-master-models/interface/manf-master.interface";

export { unspscMasterState } from "../../model/manf-master-models/interface/unspsc-master.interface";
export  { facilityMasterState } from "../../model/manf-master-models/interface/facility-master-state.interface";

export { BrandMasterState } from "./brand-master.reducer";
export { ProductEntitlementState } from "../../model/manf-master-models/interface/product-entitlement.interface";