import { createSelector } from '@ngrx/store';

import { CommonState, getCommonState } from '../reducers';

export const getUnmasterRecordsLoader = createSelector(getCommonState, (state: CommonState) => state?.loaders?.getUnmastered);
export const getChangeLog = createSelector(getCommonState, (state: CommonState) => state?.changeLog);
export const getChangeLogLoader = createSelector(getCommonState, (state: CommonState) => state?.changeLogLoader);
export const getUnmasteredData = createSelector(getCommonState, (state: CommonState) => state?.unmasteredData);
export const getUpdateMasteredRecordLoader = createSelector(getCommonState, (state: CommonState) => state?.updateMasteredRecordLoader);
export const getUnspscRootNodes = createSelector(getCommonState, (state: CommonState) => ({
  dataMode: state?.treeView?.dataMode,
  data: state?.treeView?.dataMode === 'ALL' ? state?.treeView?.rootNodes : state?.treeView?.searchedNodes
}));
export const getUnspscRootNodesLoading = createSelector(getCommonState, (state: CommonState) =>
  state?.treeView?.dataMode === 'ALL' ? state?.treeView?.loading : state?.treeView?.searchLoading
);
export const getUnspscTreeDataMode = createSelector(getCommonState, (state: CommonState) => state?.treeView?.dataMode);
export const getRejectLog = createSelector(getCommonState, (state: CommonState) => state.rejectLog?.log);
export const getRejectLogLoader = createSelector(getCommonState, (state: CommonState) => state.rejectLog?.loading);
export const getAttributeExtensions = createSelector(getCommonState, (state: CommonState) => state?.attributeExtensions);
export const getAttributeExtensionLoading = createSelector(getCommonState, (state: CommonState) => state?.loaders?.attributeExtensions);
