import { createSelector } from '@ngrx/store';

import { CommonState, getCommonState } from '../reducers';

export const getSelectedWidget = createSelector(getCommonState, (state: CommonState) => state.selectedWidget);
export const closeDrawerAt = createSelector(getCommonState, (state: CommonState) => state.closeDrawerAt);
export const closeDialogAt = createSelector(getCommonState, (state: CommonState) => state.closeDialogAt);

export const getReclassifiedFileUploadResponse = createSelector(
  getCommonState,
  (state: CommonState) => state.reclassifiedFileUpload?.response
);

export const getReclassifiedFileUploadLoading = createSelector(
  getCommonState,
  (state: CommonState) => state.reclassifiedFileUpload?.loading
);

export const getAttributeFileUploadResponse = createSelector(getCommonState, (state: CommonState) => state.attributeFileUpload?.response);

export const getAttributeFileUploadLoading = createSelector(getCommonState, (state: CommonState) => state.attributeFileUpload?.loading);

export const getUnspscClientCorrectionFileUploadResponse = createSelector(
  getCommonState,
  (state: CommonState) => state.unspscClientCorrectionFileUpload?.response
);

export const getUnspscClientCorrectionFileUploadLoading = createSelector(
  getCommonState,
  (state: CommonState) => state.unspscClientCorrectionFileUpload?.loading
);

export const getFacilityTypeCVsFileUploadResponse = createSelector(
  getCommonState,
  (state: CommonState) => state.facilityTypeCVsFileUpload?.response
);
export const getFacilityTypeCVsFileUploadLoading = createSelector(
  getCommonState,
  (state: CommonState) => state.facilityTypeCVsFileUpload?.loading
);

export const getManufacturerCVsFileUploadResponse = createSelector(
  getCommonState,
  (state: CommonState) => state.manufacturerCVsFileUpload?.response
);
export const getManufacturerCVsFileUploadLoading = createSelector(
  getCommonState,
  (state: CommonState) => state.manufacturerCVsFileUpload?.loading
);

export const getI2PItemPairsForResolutionFileResponse = createSelector(
  getCommonState,
  (state: CommonState) => state.i2pItemPairsForResolutionFileUpload?.response
);

export const getI2PItemPairsForResolutionFileLoading = createSelector(
  getCommonState,
  (state: CommonState) => state.i2pItemPairsForResolutionFileUpload?.loading
);

export const getManufacturerParentChildFileUploadResponse = createSelector(
  getCommonState,
  (state: CommonState) => state.manufacturerParentChildFileUpload?.response
);

export const getManufacturerParentChildFileUploadLoading = createSelector(
  getCommonState,
  (state: CommonState) => state.manufacturerParentChildFileUpload?.loading
);

export const getUploadedFileHistory = createSelector(getCommonState, (state: CommonState) => state.uploadedFileHistory?.response);

export const getUploadedFileHistoryLoading = createSelector(getCommonState, (state: CommonState) => state.uploadedFileHistory?.loading);

export const getUploadedFileDetails = createSelector(getCommonState, (state: CommonState) => state.uploadedFileHistory?.detailsResponse);

export const getUploadedFileDetailsLoading = createSelector(
  getCommonState,
  (state: CommonState) => state.uploadedFileHistory?.detailsLoading
);

export const getProductAttributeFileUploadResponse = createSelector(getCommonState, (state: CommonState) => state.productAttributeFileUpload?.response);

export const getProductAttributeFileUploadLoading = createSelector(getCommonState, (state: CommonState) => state.productAttributeFileUpload?.loading);

export const getProductAttributeFilter = createSelector(getCommonState, (state: CommonState) => state.productDownloadFilter);

export const getActiveAttributesMaster = createSelector(getCommonState, (state: CommonState) => state.activeAttributes);

export const getProductManageGraphUploading = createSelector(getCommonState, (state: CommonState) => state.productManageGraphUpload?.loading);


export const getProductGraphMergeUnMergedFilter = createSelector(getCommonState, (state: CommonState) => state.ProductGraphMergeUnMergedFilter);

export const getGraphProductViewItemData = createSelector(getCommonState, (state: CommonState) => state.GraphItemProductView?.response);

export const getGraphProductViewItemLoading = createSelector(getCommonState, (state: CommonState) => state.GraphItemProductView?.loading);

export const getUOMLoadingState = createSelector(getCommonState, (state: CommonState) => state?.uomFileLoading);

export const getBrandFeatureSuggestionFileResponse = createSelector(
  getCommonState,
  (state: CommonState) => state.brandFeatureSuggestionFileUpload?.response
);

export const getBrandFeatureSuggestionFileLoading = createSelector(
  getCommonState,
  (state: CommonState) => state.brandFeatureSuggestionFileUpload?.loading
);