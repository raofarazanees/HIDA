import { createSelector } from '@ngrx/store';

import { getUserProfileState, UserProfileState } from '../reducers';

export const getFirstName = createSelector(getUserProfileState, (state: UserProfileState) => state.firstName);
export const getLastName = createSelector(getUserProfileState, (state: UserProfileState) => state.lastName);
export const getEmail = createSelector(getUserProfileState, (state: UserProfileState) => state.email);
export const getVendorName = createSelector(getUserProfileState, (state: UserProfileState) => state.vendorName);
export const getFaciliyTypeRoles = createSelector(getUserProfileState, (state: UserProfileState) => state.faciliyTypeRoles);
export const getItemMasterRoles = createSelector(getUserProfileState, (state: UserProfileState) => state.itemMasterRoles);
export const getManufacturerRoles = createSelector(getUserProfileState, (state: UserProfileState) => state.manufacturerRoles);
export const getRestatingSalesRoles = createSelector(getUserProfileState, (state: UserProfileState) => state.restatingSalesRoles);
export const getWbDashboardRoles = createSelector(getUserProfileState, (state: UserProfileState) => state.wbDashboardRoles);
export const getUserProfile = createSelector(getUserProfileState, (state: UserProfileState) => state);
