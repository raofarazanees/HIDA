import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { ProductSearchCriteria } from '../features/admin-dashboard/store/reducers/common.reducer';
import { UserInitiatedData } from '../features/admin-dashboard/modal/user-initiated-interface';
const noRepeatHeader = { headers: { 'X-1p-Repeat-400': '0' } };

@Injectable({
  providedIn: 'root'
})
export class WorkbenchSwaggerService {
  constructor(protected readonly http: HttpClient) { }

  submitFacilityTask(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/facility/saveFacilityMasteredObject`, payload, noRepeatHeader);
  }

  facilitySaveForLater(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/facility/saveForLaterFacilityObject`, payload, noRepeatHeader);
  }

  getInternalFieldsForMapping(groupName: string) {
    return this.http.get(`${environment.hidaBaseUrl}/common/getInternalFieldsForMapping/${encodeURI(groupName)}/cvCode`);
  }

  getFacilityUnmasteredRecords(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/facility/getAllFacilityUnMasterValues`, payload, noRepeatHeader);
  }

  getFacilityMasteredRecords(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/facility/getAllFacilityMasterValues`, payload, noRepeatHeader);
  }

  getMappedRecordsCount(distributorPguid, master) {
    return this.http.get(
      `${environment.hidaBaseUrl}/common/getTotalMappedRecordsCount?distributorPguid=${distributorPguid}&groupName=1&master=${master}&status=SaveForLater`
    );
  }

  getUnspscUnmasteredRecords(groupName: string): any {
    return this.http.get(`${environment.hidaBaseUrl}/item/getAllItemUnMasterValues?groupName=${groupName}`);
  }

  getAllItemsForUNSPSCReclassification(groupName: string): any {
    return this.http.get(`${environment.hidaBaseUrl}/item/getAllItemsForUNSPSCReclassification?groupName=${groupName}`);
  }

  getAllItemsForUNSPSCClientCorrection(groupName: string): any {
    return this.http.get(`${environment.hidaBaseUrl}/item/getAllItemsForUNSPSCClientCorrection?groupName=${groupName}`);
  }

  getUNSPSCAttributeExtensions(): any {
    return this.http.get(`${environment.hidaBaseUrl}/common/getActiveUNSPSCExtensionAttributes`);
  }

  submitItemMasterTask(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/item/saveItemMasteredObject`, payload, noRepeatHeader);
  }

  submitUNSPSCReclassifiedObject(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/item/saveUNSPSCReclassifiedObject`, payload, noRepeatHeader);
  }

  submitClientCorrectedItems(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/item/saveUNSPSCClientCorrectedItems`, payload, noRepeatHeader);
  }

  itemMastersaveForLater(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/item/saveForLaterItemObject`, payload, noRepeatHeader);
  }

  reclassificationSaveForLater(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/item/saveForLaterUNSPSCReclassificationObject`, payload, noRepeatHeader);
  }

  clientCorrectedSaveForLater(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/item/saveForLaterItemsForUNSPSCClientCorrection`, payload, noRepeatHeader);
  }

  getAllUnspscMasterRecords(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/item/getAllItemMasterValues`, payload, noRepeatHeader);
  }

  getAllUnspscLibrary(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/common/getUNSPSCSegmentsFromInMemoryDB`, payload, noRepeatHeader);
  }

  submitManufacturerRecords(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/manufacturer/saveManufacturerMasteredObject`, payload, noRepeatHeader);
  }

  manufacturerSaveForLater(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/manufacturer/saveForLaterManufacturerObject`, payload, noRepeatHeader);
  }

  getManufacturerUnmasteredRecords(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/manufacturer/getAllManufacturerUnMasteredValues`, payload, noRepeatHeader);
  }

  getManufacturerMasterRecords(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/manufacturer/getAllManufacturerMasterValues`, payload, noRepeatHeader);
  }

  getAllRestateRecords(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/salesRestate/getAllSalesRestateValues`, payload, noRepeatHeader);
  }

  getChangeLogForFacility(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/changeLog/getChangeLogForFacility`, {
      params: payload
    });
  }

  getChangeLogForManufacturer(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/changeLog/getChangeLogForManufacturer`, {
      params: payload
    });
  }

  getChangeLogForUnspsc(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/changeLog/getChangeLogForItem`, {
      params: payload
    });
  }

  updateManufacturerMasteredRecord(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/manufacturer/updateManufacturerMasteredObject`, payload, noRepeatHeader);
  }

  updateFacilityMasteredRecord(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/facility/updateFacilityMasteredObject`, payload, noRepeatHeader);
  }

  updateUnspscMasteredRecord(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/item/updateItemMasteredObject`, payload, noRepeatHeader);
  }

  submitSalesRestateData(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/salesRestate/saveSalesRestateObject`, payload, noRepeatHeader);
  }

  getUNSPSCForTreeView(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/common/getUNSPSCSegmentsTreeView`, payload, noRepeatHeader);
  }

  getUNSPSCSearchForTreeView(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/common/searchUNSPSCSegmentsTreeView`, payload, noRepeatHeader);
  }

  getItemPguidByUnspsc(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/common/getUNSPSCRecordView`, {
      params: payload
    });
  }

  uploadUnspscReclassificationFile(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/item/uploadAndProcessUNSPSCReclassificationFile`, payload, noRepeatHeader);
  }

  uploadAttributeMasterFile(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/common/uploadLatestAttributesOfMaster`, payload, noRepeatHeader);
  }

  getDownloadAttributeMasterURL(): string {
    return `${environment.hidaBaseUrl}/common/downloadCurrentAttributesOfMaster`;
  }

  uploadUnspscClientCorrectionFile(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/item/uploadAndProcessClientCorrectionFile`, payload, noRepeatHeader);
  }

  getdownloadCurrentMappedDescriptionsURL(type: string): string {
    return `${environment.hidaBaseUrl}/common/downloadCurrentMappedDescriptions/${type}`;
  }

  getdownloadManfParentChildURL(): string {
    return `${environment.hidaBaseUrl}/common/downloadCurrentManufacturerParentChildRelationships`;
  }

  getDownloadUNSPSCAttributeExtensionURL(): string {
    return `${environment.hidaBaseUrl}/common/downloadCurrentUNSPSCExtensionAttributes`;
  }

  getDownloadItemPairForResolutionURL(email: string = '', name: string = ''): string {
    return `${environment.hidaBaseUrl}/itemtoproduct/downloadI2PItemPairsForResolutionFile?initiatedByUserEmail=${email}&initiatedByUserName=${name}`;
  }

  uploadLatestMappedDescriptions(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/common/uploadLatestMappedDescriptions`, payload, noRepeatHeader);
  }

  uploadManufacturerParentChildRelationships(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/common/uploadLatestManufacturerParentChildRelationships`, payload, noRepeatHeader);
  }

  uploadI2PItemsPairsForResolution(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/itemtoproduct/uploadI2PItemPairsForResolutionFile`, payload, noRepeatHeader);
  }

  getUNSPSCClientCorrectionRejectedInfo(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/item/getUNSPSCClientCorrectionRejectedInfo`, {
      params: payload
    });
  }

  getItemsForGrouping(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/itemtoproduct/getAllI2PItemsForGrouping`, {
      params: payload
    });
  }

  getPairsForResolution(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/itemtoproduct/getI2PItemPairsForResolution`, {
      params: payload
    });
  }

  getItemPairsForConfirmation(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/itemtoproduct/getReviewedI2PItemPairsForResolution`, {
      params: payload
    });
  }

  confirmItemPairs(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/itemtoproduct/confirmI2PItemPairsForResolution`, payload, noRepeatHeader);
  }

  getGroupsForReassignment() {
    return `${environment.hidaBaseUrl}/itemtoproduct/getI2PGroupsForItemReassignment`;
  }

  getGroupsRelatedToItems(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/itemtoproduct/getI2PRelatedGroupsForItem`, {
      params: payload
    });
  }

  submitItemToProductRecords(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/itemtoproduct/saveI2PGroupedObject`, payload, noRepeatHeader);
  }

  getAllGroupedRecords(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/itemtoproduct/getAllI2PGroupedItems`, payload, noRepeatHeader);
  }

  getChangeLogI2PItem(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/changeLog/getChangeLogForI2PGroupedItem`, {
      params: payload
    });
  }

  getUploadedFileHistory(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/item/getUNSPSCCustomerFeedbackFileUploadSummary`, {
      params: payload
    });
  }

  getUploadedFileDetails(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/item/getUNSPSCCustomerFeedbackFileUploadDetails`, {
      params: payload
    });
  }

  uploadProductAttributeFile(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/itemtoproduct/uploadProductAttributeFile`, payload, noRepeatHeader);
  }

  getActiveAttributesMaster() {
    return this.http.get(`${environment.hidaBaseUrl}/common/getActiveAttributesOfMaster`);
  }

  downloadProductAttributeTaggingFile(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/itemtoproduct/downloadProductAttributeFile`, payload, {
      responseType: 'blob',
      observe: 'response'
    });
  }

  UploadProductMergeUnmergedGraphFile(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/itemtoproduct/uploadGraphProductItemFile`, payload, noRepeatHeader);
  }

  retrieveGraphProductItemView(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/itemtoproduct/retrieveGraphProductItems`, payload, noRepeatHeader);
  }

  downloadProductGraphFile(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/itemtoproduct/downloadGraphProductItemFile`, payload, {
      responseType: 'blob',
      observe: 'response'
    });
  }

  getGraphItemForMergeUnMerge(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/itemtoproduct/getI2PGraphsProductsForConfirmation`, { params: payload });
  }

  confirmGraphProduct(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/itemtoproduct/confirmI2PGraphs`, payload, noRepeatHeader);
  }

  getGraphItemsForProduct(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/itemtoproduct/getI2PGraphsItemsForProductForConfirmation`, payload, noRepeatHeader);
  }

  I2PTriggerIncrementalProcess(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/itemtoproduct/triggerI2PIncrementalProcess`, payload, noRepeatHeader);
  }

  I2PTriggerOutboundRefreshProcess(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/itemtoproduct/triggerI2POutboundRefresh`, payload, noRepeatHeader);
  }

  UploadBrandMasterCVFile(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/common/uploadBrandMasterRecords`, payload, noRepeatHeader);
  }

  getBrandMasterRecordsURL(): string {
    return `${environment.hidaBaseUrl}/common/downloadBrandMasterRecords`;
  }

  UploadBrandProductMappingFile(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/itemtoproduct/uploadProductBrandFile`, payload, noRepeatHeader);
  }

  GetActiveProductBrands() {
    return this.http.get(`${environment.hidaBaseUrl}/itemtoproduct/getActiveProductBrands`);
  }

  retrieveProductBrandItem(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/itemtoproduct/retrieveProductBrands`, payload, noRepeatHeader);
  }

  DownloadProductBrandTaggingFile(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/itemtoproduct/downloadProductBrandFile`, payload, {
      responseType: 'blob',
      observe: 'response'
    });
  }

  getProductBrandForConfirmation(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/itemtoproduct/getProductBrandsForConfirmation`, { params: payload });
  }

  productBrandTaskSubmission(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/itemtoproduct/confirmProductBrands`, payload, noRepeatHeader);
  }

  retrieveProductStagingCurationUNSPSCs(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/staging/curation/retrieveProductUNSPSCs`, payload, noRepeatHeader);
  }

  UploadProductLevelClusteringFile(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/itemtoproduct/uploadProductUNSPSCFile`, payload, noRepeatHeader);
  }

  CreateTaskForProductStagingUnspsc(payload: any): Observable<any> {
    return this.http.post(`${environment.hidaBaseUrl}/staging/curation/handleUNSPSCForLabellingTaskCreation`, payload, noRepeatHeader);
  }

  DownloadFileForProductStagingUnspsc(payload: any): Observable<any> {
    return this.http.post(`${environment.hidaBaseUrl}/staging/curation/downloadProductUNSPSCFile`, payload, {
      responseType: 'blob',
      observe: 'response'
    });
  }

  UploadFileForProductStaging(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/staging/curation/uploadFileWithProductUNSPSCLabels`, payload, noRepeatHeader);
  }

  UploadFileForProductStagingForLabelling(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/staging/curation/uploadFileWithProductForUNSPSCLabelling`, payload, noRepeatHeader);
  }

  retrieveProductUNSPSCsForCuration(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/staging/curation/retrieveProductUNSPSCsForCuration`, { params: payload });
  }

  retrieveProductItemForView(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/staging/curation/get360ViewOfProduct`, { params: payload });
  }

  downloadStagingCurationWorkbenchFile(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/staging/curation/downloadProductUNSPSCFileForCuration`, payload, {
      responseType: 'blob',
      observe: 'response'
    });
  }

  UploadFileForProductStagingForCuration(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/staging/curation/uploadProductUNSPSCFileForCuration`, payload, noRepeatHeader);
  }

  stagingCurationSaveForLater(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/staging/curation/saveProductUNSPSCsFromOnlineCuration`, payload, noRepeatHeader);
  }

  stagingCurationTaskSubmission(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/staging/curation/confirmProductUNSPSCsForCuration`, payload, noRepeatHeader);
  }

  stagingTriggerOutboundRefreshProcess(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/staging/curation/triggerStagingCurationSnowflakeRefresh`, payload, noRepeatHeader);
  }

  retrieveProductUNSPSCsForFinalReview(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/staging/curation/retrieveCuratedProductUNSPSCsForConfirmation`, { params: payload });
  }

  submitFinalConfirmationRecords(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/staging/curation/confirmCuratedProductUNSPSCs`, payload, noRepeatHeader);
  }

  retrieveParentManfSearchRecords(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/master/manufacturer/getParentManufacturerMasterRecords`, payload, noRepeatHeader);
  }
  retrieveChildParentManfSearchRecords(payload: any) {
    return this.http.post(
      `${environment.hidaBaseUrl}/master/manufacturer/getMasterParentChildManufacturerRecords`,
      payload,
      noRepeatHeader
    );
  }

  createNewParentManfRecord(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/master/manufacturer/createParentManufacturerMaster`, payload, noRepeatHeader);
  }

  updateParentManfRecords(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/master/manufacturer/updateParentManufacturerMasters`, payload, noRepeatHeader);
  }

  GetActiveParentManfRecords(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/master/manufacturer/getActiveMasterParentManufacturers`);
  }

  createNewChildManfRecord(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/master/manufacturer/createParentChildManufacturerMaster`, payload, noRepeatHeader);
  }

  getParentManfRecordChangeLog(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/master/manufacturer/getParentManufacturerChangeLog`, { params: payload });
  }

  getChildManfRecordChangeLog(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/master/manufacturer/getParentChildManufacturerChangeLog`, { params: payload });
  }

  UpdateChildParentManfRecords(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/master/manufacturer/updateParentChildManufacturers`, payload, noRepeatHeader);
  }

  GetActiveChildParentManfRecords() {
    return this.http.get(`${environment.hidaBaseUrl}/master/manufacturer/getActiveChildManufacturers`);
  }

  GetManfRecordsForMapping(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/master/manufacturer/getManufacturersForMapping`, payload, noRepeatHeader);
  }

  CreateManufacturerMapping(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/master/manufacturer/createManufacturerMappings`, payload, noRepeatHeader);
  }

  getMasteredManfRecordChangeLog(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/master/manufacturer/getManufacturerMappedChangeLog`, { params: payload });
  }

  getMappedMasteredRecords(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/master/manufacturer/getMappedManufacturers`, payload, noRepeatHeader);
  }

  UpdateMasteredManfRecords(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/master/manufacturer/updateManufacturerMappings`, payload, noRepeatHeader);
  }

  retrieveUnspscMasterSearchRecords(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/master/unspsc/getUNSPSCMasterRecords`, payload, noRepeatHeader);
  }

  updateUnspscRecords(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/master/unspsc/updateUNSPSCMasterRecords`, payload, noRepeatHeader);
  }

  retrieveZipMasterSearchRecords(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/master/zip/getZipDetails`, payload, noRepeatHeader);
  }

  updateZipRecords(payload: any) {
    return this.http.patch(`${environment.hidaBaseUrl}/master/zip/updateZipMaster`, payload, noRepeatHeader);
  }

  getZipRecordChangeLog(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/master/zip/getZipHistoryLog`, { params: payload });
  }

  getActiveMarketRecords() {
    return this.http.get(`${environment.hidaBaseUrl}/master/market/getActiveMarkets`);
  }

  getUnspscRecordChangeLog(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/master/unspsc/getUNSPSCMasterChangeLog`, { params: payload });
  }

  createNewMarketMasterRecord(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/master/market/createMarketMaster`, payload, noRepeatHeader);
  }

  retrieveMarketMasterSearchRecords(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/master/market/getMasterMarkets`, payload, noRepeatHeader);
  }

  updateMarketMasterRecords(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/master/market/updateMasterMarkets`, payload, noRepeatHeader);
  }

  getMarketRecordChangeLog(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/master/market/getMasterMarketChangeLog`, { params: payload });
  }

  retrieveFacilityMasterSearchRecords(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/master/facility/getMasterFacilities`, payload, noRepeatHeader);
  }

  createFacilityMasterRecords(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/master/facility/createMasterFacility`, payload, noRepeatHeader);
  }

  updateFacilityMasterRecords(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/master/facility/updateMasterFacilities`, payload, noRepeatHeader);
  }

  getActiveFacilityMasterRecords() {
    return this.http.get(`${environment.hidaBaseUrl}/master/facility/getActiveFacilities`);
  }

  retrieveFacilityForMappingRecords(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/master/facility/getFacilitiesForMapping`, payload, noRepeatHeader);
  }

  getMasterFacilityChangeLog(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/master/facility/getMasterFacilityChangeLog`, { params: payload });
  }

  getTopParentRecord() {
    return this.http.get(`${environment.hidaBaseUrl}/master/manufacturer/getManufacturerChildrenAndParents`);
  }

  createFacilityMapping(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/master/facility/createFacilityMappings`, payload, noRepeatHeader);
  }

  retrieveFacilityMappedSearchRecords(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/master/facility/getMappedFacilities`, payload, noRepeatHeader);
  }

  getMappedFacilityChangeLog(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/master/facility/getFacilityMappedChangeLog`, { params: payload });
  }

  updateFacilityMappedRecords(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/master/facility/updateFacilityMappings`, payload, noRepeatHeader);
  }

  retrieveBrandMasterSearchRecords(payload: ProductSearchCriteria) {
    return this.http.post(`${environment.hidaBaseUrl}/master/brand/getMasterBrands`, payload, noRepeatHeader);
  }

  createBrandMasterRecords(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/master/brand/createMasterBrand`, payload, noRepeatHeader);
  }

  updateBrandMasterRecords(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/master/brand/updateMasterBrands`, payload, noRepeatHeader);
  }

  getBrandCVChangeLog(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/master/brand/getMasterBrandChangeLog`, { params: payload });
  }

  retrieveProductEntitlementSearchRecords(payload: ProductSearchCriteria) {
    return this.http.post(`${environment.hidaBaseUrl}/product/entitlement/getEntitlementsOfProducts`, payload, noRepeatHeader);
  }

  retrieveItemToProductDetailsRecords(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/product/entitlement/getItemOfProduct`, { params: payload });
  }

  DownloadParentChildFile(payload: ProductSearchCriteria) {
    return this.http.post(
      `${environment.hidaBaseUrl}/master/manufacturer/generateParentChildExport`, payload,
      {
        responseType: 'blob',
        observe: 'response'
      }
    );
  }

  retrieveBrandMappingSearchRecords(payload: ProductSearchCriteria) {
    return this.http.post(`${environment.hidaBaseUrl}/master/brand/getBrandMappings`, payload, noRepeatHeader);
  }

  retrieveActiveBrandRecords() {
    return this.http.get(`${environment.hidaBaseUrl}/master/brand/getActiveBrands`);
  }

  updateBrandMappingRecords(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/master/brand/manageBrandMappings`, payload, noRepeatHeader);
  }

  retrieveUnspscCodeRecords(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/master/unspsc/getUNSPSCMarket?unspscCode=${payload.UNSPSCCode}`);
  }

  retrieveActiveBrandMapping() {
    return this.http.get(`${environment.hidaBaseUrl}/master/brand/getBrandMapForAssignment`);
  }

  updateProductInfoRecords(payload: any) {
    //becoz need to hold the updated data on UI (MVW takes time to refresh the view)
    const dataToPost = {
      updatedBy: payload.updatedBy,
      records: payload.records,
      updatedByEmail: payload.updatedByEmail,
      manfSKUCheck: payload.manfSKUCheck
    };
    return this.http.put(`${environment.hidaBaseUrl}/product/entitlement/manageProductEntitlements`, dataToPost);
  }

  getProductChangeLog(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/product/entitlement/getProductEntitlementChangeLog`, { params: payload });
  }

  getBrandMapChangeLog(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/master/brand/getBrandMapChangeLog`, { params: payload });
  }

  GetAllManfRecords(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/master/manufacturer/getAllManufacturers`, payload, noRepeatHeader);
  }
  ManageManfRecords(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/master/manufacturer/manageManufacturerMappings`, payload, noRepeatHeader);
  }
  retrieveAllFacilities(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/master/facility/getAllFacilities`, payload, noRepeatHeader);
  }

  manageFacMappings(payload: any) {
    return this.http.put(`${environment.hidaBaseUrl}/master/facility/manageFacilityMappings`, payload, noRepeatHeader);
  }

  DownloadMasterCSVFile(payload, url, type) {
    return this.http.post(`${environment.hidaBaseUrl}/${type}/${url}`, payload, {
      responseType: 'blob',
      observe: 'response'
    });
  }

  getActiveBusinessUsers() {
    return this.http.get(`${environment.hidaBaseUrl}/master/unspsc/getUNSPSCMasteringUsers`);
  }

  uploadPIMCsv(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/product/entitlement/uploadEntitlementsOfProducts`, payload, noRepeatHeader);
  }

  UploadUoMRegularFile(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/uom/uploadUOMRegularFile`, payload, noRepeatHeader);
  }

  UploadUoMAdhocFile(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/uom/uploadUOMAdhocFile`, payload, noRepeatHeader);
  }

  UploadSkuDataForClusturingFile(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/product/entitlement/uploadSKUDataClustering`, payload, noRepeatHeader);
  }

  DownloadUOMDataFile(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/uom/downloadOutputFile`, payload, {
      responseType: 'blob',
      observe: 'response'
    });
  }
  UploadUoMCorrectionFile(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/uom/uploadCorrectionFile`, payload, noRepeatHeader);
  }

  makeHttpRequest<Body>(method: string = 'POST', url: string, data?: any): Observable<ApiResponse<Body>> {
    let apiEndPoint = `${environment.hidaBaseUrl}/${url}`;

    if (method.toLocaleUpperCase() === 'GET' && data) {
      apiEndPoint += `?+${data}`;
    }

    return this.http.request<ApiResponse<Body>>(method.toUpperCase(), apiEndPoint, { body: data });
  }

  uploadBrandFeatureSuggestion(payload: any) {
    return this.http.post(`${environment.hidaBaseUrl}/master/brand/uploadBrandSuggestionFile`, payload, noRepeatHeader);
  }

  retrieveBrandSourceRecords() {
    return this.http.get(`${environment.hidaBaseUrl}/master/brand/getActiveBrandSource`);
  }

  getI2PGraphHistoryRecordChangeLog(payload: any) {
    return this.http.get(`${environment.hidaBaseUrl}/product/entitlement/getProductItemHistory`, { params: payload });
  }
}

export class ApiResponse<T> {
  constructor() { }
  [Key: string]: any;
}