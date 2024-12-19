import { Action, createAction, props } from '@ngrx/store';
import { UnspscWorkflowModel } from '../../components/grid-html-components/unspsc-tool/unspsc-tool.component';
import { BrandFeatureSuggestionModel } from '../../components/grid-html-components/brand-feature-suggestion/brand-feature-suggestion.component';

export enum CommonActionsEnum {
  WIDGET_SELECTION_CHANGE = '[DASHBOARDMODULE] Widgetc Selection change',
  CLOSE_DRAWER_AT = '[DASHBOARDMODULE] Close Drawer At',
  UPLOAD_UNSPSC_RECLASSIFICATION_FILE = '[DASHBOARDMODULE] Upload UNSPSC Reclasaification File',
  UPLOAD_UNSPSC_RECLASSIFICATION_FILE_SUCCESS = '[DASHBOARDMODULE] Upload UNSPSC Reclasaification File Success',
  UPLOAD_UNSPSC_RECLASSIFICATION_FILE_FAIL = '[DASHBOARDMODULE] Upload UNSPSC Reclasaification File Fail',
  UPLOAD_ATTRIBUTE_MASTER_FILE = '[DASHBOARDMODULE] Upload Attribute Master File',
  UPLOAD_ATTRIBUTE_MASTER_FILE_SUCCESS = '[DASHBOARDMODULE] Upload Attribute Master File Success',
  UPLOAD_ATTRIBUTE_MASTER_FILE_FAIL = '[DASHBOARDMODULE] Upload Attribute Master File Fail',
  UPLOAD_UNSPSC_CLIENT_CORRECTION_FILE = '[DASHBOARDMODULE] Upload Unspsc Client Correction File',
  UPLOAD_UNSPSC_CLIENT_CORRECTION_FILE_SUCCESS = '[DASHBOARDMODULE] Upload Unspsc Client Correction File Success',
  UPLOAD_UNSPSC_CLIENT_CORRECTION_FILE_FAIL = '[DASHBOARDMODULE] Upload Unspsc Client Correction File Fail',
  FACILITY_TYPE_CVS_UPLOAD_FILE = '[DASHBOARDMODULE] Facility Type CVs Upload File',
  FACILITY_TYPE_CVS_UPLOAD_FILE_SUCCESS = '[DASHBOARDMODULE] Facility Type CVs Upload File Success',
  FACILITY_TYPE_CVS_UPLOAD_FILE_FAIL = '[DASHBOARDMODULE] Facility Type CVs Upload File Fail',
  MANUFACTURER_CVS_UPLOAD_FILE = '[DASHBOARDMODULE] Manufacturer CVs Upload File',
  MANUFACTURER_CVS_UPLOAD_FILE_SUCCESS = '[DASHBOARDMODULE] Manufacturer CVs Upload File Success',
  MANUFACTURER_CVS_UPLOAD_FILE_FAIL = '[DASHBOARDMODULE] Manufacturer CVs Upload File Fail',
  MANUFACTURER_PARENT_CHILD_UPLOAD_FILE = '[DASHBOARDMODULE] Manufacturer Parent Child Upload File',
  MANUFACTURER_PARENT_CHILD_UPLOAD_FILE_SUCCESS = '[DASHBOARDMODULE] Manufacturer Parent Child Upload File Success',
  MANUFACTURER_PARENT_CHILD_UPLOAD_FILE_FAIL = '[DASHBOARDMODULE] Manufacturer Parent Child Upload File Fail',
  I2P_ITEM_PAIRS_FOR_RESOLUTION_FILE_UPLOAD_FILE = '[DASHBOARDMODULE] I2P Item Pairs For Resolution File Upload File',
  I2P_ITEM_PAIRS_FOR_RESOLUTION_FILE_UPLOAD_FILE_SUCCESS = '[DASHBOARDMODULE] I2P Item Pairs For Resolution File Upload File Success',
  I2P_ITEM_PAIRS_FOR_RESOLUTION_FILE_UPLOAD_FILE_FAIL = '[DASHBOARDMODULE] I2P Item Pairs For Resolution File Upload File Fail',
  GET_UPLOADED_FILE_HISTORY = '[DASHBOARDMODULE] Get Uploaded File History',
  GET_UPLOADED_FILE_HISTORY_SUCCESS = '[DASHBOARDMODULE] Get Uploaded File History Success',
  GET_UPLOADED_FILE_HISTORY_FAIL = '[DASHBOARDMODULE] Get Uploaded File History Fail',
  GET_UPLOADED_FILE_DETAILS = '[DASHBOARDMODULE] Get Uploaded File Details',
  GET_UPLOADED_FILE_DETAILS_SUCCESS = '[DASHBOARDMODULE] Get Uploaded File Details Success',
  GET_UPLOADED_FILE_DETAILS_FAIL = '[DASHBOARDMODULE] Get Uploaded File Details Fail',

  UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE = '[DASHBOARDMODULE] Upload Product Attribute Tagging File',
  UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_SUCCESS = '[DASHBOARDMODULE] Upload Product Attribute Tagging File Success',
  UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_FAIL = '[DASHBOARDMODULE] Upload Product Attribute Tagging File Fail',
  DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE = '[DASHBOARDMODULE] Download Product Attribute Tagging File',
  DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_SUCCESS = '[DASHBOARDMODULE] Download Product Attribute Tagging File  Success',
  DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_FAIL = '[DASHBOARDMODULE] Download Product Attribute Tagging File Fail',
  GET_ACTIVE_ATTRIBUTE_MASTER = '[DASHBOARDMODULE] Get list of Active Attributes of Master',
  GET_ACTIVE_ATTRIBUTE_MASTER_SUCCESS = '[DASHBOARDMODULE] Get list of Active Attributes of Master Success',
  GET_ACTIVE_ATTRIBUTE_MASTER_FAIL = '[DASHBOARDMODULE] Get list of Active Attributes of Master Fail',
  ADD_SEARCH_CRITERIA_PRODUCT_ATTRIBUTE = '[DASHBOARDMODULE] Add Search Criteria Product  Attribute file download',
  CHANGE_CRITERIA_PRODUCT_ATTRIBUTE_VALUE = '[DASHBOARDMODULE] Change Search Criteria Product Attribute filter value',
  UPLOAD_PRODUCT_GRAPH_MANAGE_FILE = '[DASHBOARDMODULE] Upload Product Graph Manage File',
  UPLOAD_PRODUCT_GRAPH_MANAGE_FILE_SUCCESS = '[DASHBOARDMODULE] Upload Product Graph Manage File Success',
  UPLOAD_PRODUCT_GRAPH_MANAGE_FILE_FAIL = '[DASHBOARDMODULE] Upload Product Graph Manage Fail',
  SEARCH_CRITERIA_PRODUCT_GRAPH_MERGE_UNMERGED = '[DASHBOARDMODULE] Product Graph Merge Unmerged Filter Option',
  CHANGE_CRITERIA_PRODUCT_GRAPH_FILTER_VALUE = '[DASHBOARDMODULE] Change Search Criteria Product Graph filter value',
  DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE = '[DASHBOARDMODULE] Product Graph Merge Unmerged File',
  DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE_SUCCESS = '[DASHBOARDMODULE] Download Product Graph Merge Unmerged file Success',
  DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE_FAIL = '[DASHBOARDMODULE] Download Product Graph Merge Unmerged File Fail',
  GET_GRAPH_PRODUCT_ITEM_VIEW = '[DASHBOARDMODULE] Get Product Graph Item for review',
  GET_GRAPH_PRODUCT_ITEM_VIEW_SUCCESS = '[DASHBOARDMODULE] Get Product Graph Item for review success',
  GET_GRAPH_PRODUCT_ITEM_VIEW_FAIL = '[DASHBOARDMODULE] Get Product Graph Item for review FAIL',
  CLOSE_DIALOG_AT = '[DASHBOARDMODULE] Close Dialog At',
  DOWNLOAD_UOM_DATA_FILE = '[DASHBOARDMODULE] Download UOM data file',
  DOWNLOAD_UOM_DATA_FILE_SUCCESS = '[DASHBOARDMODULE] Download UOM data file Success',
  DOWNLOAD_UOM_DATA_FILE_FAIL = '[DASHBOARDMODULE] Download UOM data file Fail',
  UPLOAD_ASP_FILE = '[DASHBOARDMODULE] Upload ASP UNSPSc File',
  UPLOAD_ASP_FILE_SUCCESS = '[DASHBOARDMODULE] Upload ASP UNSPSc File Success',
  UPLOAD_ASP_FILE_FAIL = '[DASHBOARDMODULE] Upload ASP UNSPSc File Fail',
  UPLOAD_UNSPSC_WORKFLOW_FILE = '[DASHBOARDMODULE] Upload UNSPSC Workflow File',
  UPLOAD_UNSPSC_WORKFLOW_FILE_SUCCESS = '[DASHBOARDMODULE] Upload UNSPSC Workflow File Success',
  UPLOAD_UNSPSC_WORKFLOW_FILE_FAIL = '[DASHBOARDMODULE] Upload UNSPSC Workflow File Fail',
  INIT_UNSPSC_WORKFLOW_MARKET = '[DASHBOARDMODULE] Init UNSPSC workflow with Market',
  INIT_UNSPSC_WORKFLOW_MARKET_SUCCESS = '[DASHBOARDMODULE] Init UNSPSC workflow with Market Success',
  INIT_UNSPSC_WORKFLOW_MARKET_FAIL = '[DASHBOARDMODULE] Init UNSPSC workflow with Market Fail',
  BRAND_AUTOMATION_TRIGGER = '[DASHBOARDMODULE] Trigger Brand Automation process',
  BRAND_AUTOMATION_TRIGGER_SUCCESS = '[DASHBOARDMODULE] Trigger Brand Workflow Automation Success',
  BRAND_AUTOMATION_TRIGGER_FAIL = '[DASHBOARDMODULE] Trigger Brand Workflow Automation Fail',
  BRAND_FEATURE_SUGGESTION = '[DASHBOARDMODULE] Brand Feature Suggestion',
  BRAND_FEATURE_SUGGESTION_SUCCESS = '[DASHBOARDMODULE] Brand Feature Suggestion Success',
  BRAND_FEATURE_SUGGESTION_FAIL = '[DASHBOARDMODULE] Brand Feature Suggestion Fail',
  UPLOAD_BRAND_SUGGESTION_FILE_UPLOAD_FILE = '[DASHBOARDMODULE] Upload Brand Suggestion File Upload File',
  UPLOAD_BRAND_SUGGESTION_FILE_UPLOAD_FILE_SUCCESS = '[DASHBOARDMODULE] Upload Brand Suggestion File Upload File Success',
  UPLOAD_BRAND_SUGGESTION_FILE_UPLOAD_FILE_FAIL = '[DASHBOARDMODULE] Upload Brand Suggestion File Upload File Fail'
}

export class WidgetSelectionChange implements Action {
  readonly type = CommonActionsEnum.WIDGET_SELECTION_CHANGE;

  constructor(public payload: any) { }
}

export class CloseDrawerAt implements Action {
  readonly type = CommonActionsEnum.CLOSE_DRAWER_AT;
  constructor(public time: any) { }
}

export class CloseDialogAt implements Action {
  readonly type = CommonActionsEnum.CLOSE_DIALOG_AT;
  constructor(public time: any) { }
}

export class UploadUnspscReclassificationFile implements Action {
  readonly type = CommonActionsEnum.UPLOAD_UNSPSC_RECLASSIFICATION_FILE;
  constructor(public payload: any) { }
}

export class UploadUnspscReclassificationFileSuccess implements Action {
  readonly type = CommonActionsEnum.UPLOAD_UNSPSC_RECLASSIFICATION_FILE_SUCCESS;
  constructor(public payload: any) { }
}

export class UploadUnspscReclassificationFileFail implements Action {
  readonly type = CommonActionsEnum.UPLOAD_UNSPSC_RECLASSIFICATION_FILE_FAIL;
  constructor(public payload: any) { }
}

export class UploadAttributeMasterFile implements Action {
  readonly type = CommonActionsEnum.UPLOAD_ATTRIBUTE_MASTER_FILE;
  constructor(public payload: any) { }
}

export class UploadAttributeMasterFileSuccess implements Action {
  readonly type = CommonActionsEnum.UPLOAD_ATTRIBUTE_MASTER_FILE_SUCCESS;
  constructor(public payload: any) { }
}

export class UploadAttributeMasterFileFail implements Action {
  readonly type = CommonActionsEnum.UPLOAD_ATTRIBUTE_MASTER_FILE_FAIL;
  constructor(public payload: any) { }
}

export class UploadUnspscClientCorrectionFile implements Action {
  readonly type = CommonActionsEnum.UPLOAD_UNSPSC_CLIENT_CORRECTION_FILE;
  constructor(public payload: any) { }
}

export class UploadUnspscClientCorrectionFileSuccess implements Action {
  readonly type = CommonActionsEnum.UPLOAD_UNSPSC_CLIENT_CORRECTION_FILE_SUCCESS;
  constructor(public payload: any) { }
}

export class UploadUnspscClientCorrectionFileFail implements Action {
  readonly type = CommonActionsEnum.UPLOAD_UNSPSC_CLIENT_CORRECTION_FILE_FAIL;
  constructor(public payload: any) { }
}

export class FacilityTypeCVsUploadFile implements Action {
  readonly type = CommonActionsEnum.FACILITY_TYPE_CVS_UPLOAD_FILE;
  constructor(public payload: any) { }
}

export class FacilityTypeCVsUploadFileSuccess implements Action {
  readonly type = CommonActionsEnum.FACILITY_TYPE_CVS_UPLOAD_FILE_SUCCESS;
  constructor(public payload: any) { }
}

export class FacilityTypeCVsUploadFileFail implements Action {
  readonly type = CommonActionsEnum.FACILITY_TYPE_CVS_UPLOAD_FILE_FAIL;
  constructor(public payload: any) { }
}
export class ManufacturerCVsUploadFile implements Action {
  readonly type = CommonActionsEnum.MANUFACTURER_CVS_UPLOAD_FILE;
  constructor(public payload: any) { }
}

export class ManufacturerCVsUploadFileSuccess implements Action {
  readonly type = CommonActionsEnum.MANUFACTURER_CVS_UPLOAD_FILE_SUCCESS;
  constructor(public payload: any) { }
}

export class ManufacturerCVsUploadFileFail implements Action {
  readonly type = CommonActionsEnum.MANUFACTURER_CVS_UPLOAD_FILE_FAIL;
  constructor(public payload: any) { }
}

export class ManufacturerParentChildUploadFile implements Action {
  readonly type = CommonActionsEnum.MANUFACTURER_PARENT_CHILD_UPLOAD_FILE;
  constructor(public payload: any) { }
}

export class ManufacturerParentChildUploadFileSuccess implements Action {
  readonly type = CommonActionsEnum.MANUFACTURER_PARENT_CHILD_UPLOAD_FILE_SUCCESS;
  constructor(public payload: any) { }
}

export class ManufacturerParentChildUploadFileFail implements Action {
  readonly type = CommonActionsEnum.MANUFACTURER_PARENT_CHILD_UPLOAD_FILE_FAIL;
  constructor(public payload: any) { }
}
export class I2PItemPairsForResolutionFileUpload implements Action {
  readonly type = CommonActionsEnum.I2P_ITEM_PAIRS_FOR_RESOLUTION_FILE_UPLOAD_FILE;
  constructor(public payload: any) { }
}

export class I2PItemPairsForResolutionFileUploadSuccess implements Action {
  readonly type = CommonActionsEnum.I2P_ITEM_PAIRS_FOR_RESOLUTION_FILE_UPLOAD_FILE_SUCCESS;
  constructor(public payload: any) { }
}

export class I2PItemPairsForResolutionFileUploadFail implements Action {
  readonly type = CommonActionsEnum.I2P_ITEM_PAIRS_FOR_RESOLUTION_FILE_UPLOAD_FILE_FAIL;
  constructor(public payload: any) { }
}

export class GetUploadedFileHistory implements Action {
  readonly type = CommonActionsEnum.GET_UPLOADED_FILE_HISTORY;
  constructor(public payload: any) { }
}

export class GetUploadedFileHistorySuccess implements Action {
  readonly type = CommonActionsEnum.GET_UPLOADED_FILE_HISTORY_SUCCESS;
  constructor(public payload: any) { }
}

export class GetUploadedFileHistoryFail implements Action {
  readonly type = CommonActionsEnum.GET_UPLOADED_FILE_HISTORY_FAIL;
  constructor(public payload: any) { }
}

export class GetUploadedFileDetails implements Action {
  readonly type = CommonActionsEnum.GET_UPLOADED_FILE_DETAILS;
  constructor(public payload: any) { }
}

export class GetUploadedFileDetailsSuccess implements Action {
  readonly type = CommonActionsEnum.GET_UPLOADED_FILE_DETAILS_SUCCESS;
  constructor(public payload: any) { }
}

export class GetUploadedFileDetailsFail implements Action {
  readonly type = CommonActionsEnum.GET_UPLOADED_FILE_DETAILS_FAIL;
  constructor(public payload: any) { }
}

export class UploadProductAttributeTagFile implements Action {
  readonly type = CommonActionsEnum.UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE;
  constructor(public payload: any) { }
}

export class UploadProductAttributeTagFileFailed implements Action {
  readonly type = CommonActionsEnum.UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_FAIL;
  constructor(public payload: any) { }
}

export class UploadProductAttributeTagFileSuccess implements Action {
  readonly type = CommonActionsEnum.UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_SUCCESS;
  constructor(public payload: any) { }
}


export class DownProductAttributeTagFile implements Action {
  readonly type = CommonActionsEnum.DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE;
  constructor(public payload: any) { }
}

export class DownProductAttributeTagFileFailed implements Action {
  readonly type = CommonActionsEnum.DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_FAIL;
  constructor(public payload: any) { }
}

export class DownloadProductAttributeTagFileSuccess implements Action {
  readonly type = CommonActionsEnum.DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_SUCCESS;
  constructor(public payload: any) { }
}

export class GetActiveAttributesMaster implements Action {
  readonly type = CommonActionsEnum.GET_ACTIVE_ATTRIBUTE_MASTER;
  constructor() { }
}

export class GetActiveAttributesMasterFail implements Action {
  readonly type = CommonActionsEnum.GET_ACTIVE_ATTRIBUTE_MASTER_FAIL;
  constructor(public payload: any) { }
}

export class GetActiveAttributesMasterSuccess implements Action {
  readonly type = CommonActionsEnum.GET_ACTIVE_ATTRIBUTE_MASTER_SUCCESS;
  constructor(public payload: any) { }
}

export class AddSearchCriteriaProductAttribute implements Action {
  readonly type = CommonActionsEnum.ADD_SEARCH_CRITERIA_PRODUCT_ATTRIBUTE;
  constructor(public payload: any) { }
}
export class ChangeProductAttributeFilterValue implements Action {
  readonly type = CommonActionsEnum.CHANGE_CRITERIA_PRODUCT_ATTRIBUTE_VALUE;
  constructor(public payload: any) { }
}

export class UploadProductMergeUnmergedGraphFile implements Action {
  readonly type = CommonActionsEnum.UPLOAD_PRODUCT_GRAPH_MANAGE_FILE;
  constructor(public payload: any) { }
}

export class UploadProductMergeUnmergedGraphFileSuccess implements Action {
  readonly type = CommonActionsEnum.UPLOAD_PRODUCT_GRAPH_MANAGE_FILE_SUCCESS;
  constructor(public payload: any) { }
}

export class UploadProductMergeUnmergedGraphFileFailed implements Action {
  readonly type = CommonActionsEnum.UPLOAD_PRODUCT_GRAPH_MANAGE_FILE_FAIL;
  constructor(public payload: any) { }
}

export class DownloadProductMergeUnmergedGraphFile implements Action {
  readonly type = CommonActionsEnum.DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE;
  constructor(public payload: any) { }
}

export class DownloadProductMergeUnmergedGraphFileSuccess implements Action {
  readonly type = CommonActionsEnum.DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE_SUCCESS;
  constructor(public payload: any) { }
}

export class DownloadProductMergeUnmergedGraphFileFailed implements Action {
  readonly type = CommonActionsEnum.DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE_FAIL;
  constructor(public payload: any) { }
}


export class SearchCriteriaProductGraphMerge implements Action {
  readonly type = CommonActionsEnum.SEARCH_CRITERIA_PRODUCT_GRAPH_MERGE_UNMERGED;
  constructor(public payload: any) { }
}


export class SearchCriteriaProductGraphMergeFilter implements Action {
  readonly type = CommonActionsEnum.CHANGE_CRITERIA_PRODUCT_GRAPH_FILTER_VALUE;
  constructor(public payload: any) { }
}

export class GetGraphProductItemReview implements Action {
  readonly type = CommonActionsEnum.GET_GRAPH_PRODUCT_ITEM_VIEW;
  constructor(public payload: any) { }
}

export class GetGraphProductItemReviewSuccess implements Action {
  readonly type = CommonActionsEnum.GET_GRAPH_PRODUCT_ITEM_VIEW_SUCCESS;
  constructor(public payload: any) { }
}

export class GetGraphProductItemReviewFail implements Action {
  readonly type = CommonActionsEnum.GET_GRAPH_PRODUCT_ITEM_VIEW_FAIL;
  constructor(public payload: any) { }
}

export class DownloadUOMDataFile implements Action {
  readonly type = CommonActionsEnum.DOWNLOAD_UOM_DATA_FILE;
  constructor(public payload: { docPGUID: string, initiatedByUserEmail: string, initiatedByUserName: string }) { }
}

export class DownloadUOMDataFileSuccess implements Action {
  readonly type = CommonActionsEnum.DOWNLOAD_UOM_DATA_FILE_SUCCESS;
  constructor(public payload: any) { }
}

export class DownloadUOMDataFileFail implements Action {
  readonly type = CommonActionsEnum.DOWNLOAD_UOM_DATA_FILE_FAIL;
  constructor(public payload: any) { }
}

export class UploadBrandSuggestionFileUpload implements Action {
  readonly type = CommonActionsEnum.UPLOAD_BRAND_SUGGESTION_FILE_UPLOAD_FILE;
  constructor(public payload: any) { }
}

export class UploadBrandSuggestionFileUploadSuccess implements Action {
  readonly type = CommonActionsEnum.UPLOAD_BRAND_SUGGESTION_FILE_UPLOAD_FILE_SUCCESS;
  constructor(public payload: any) { }
}

export class UploadBrandSuggestionFileUploadFail implements Action {
  readonly type = CommonActionsEnum.UPLOAD_BRAND_SUGGESTION_FILE_UPLOAD_FILE_FAIL;
  constructor(public payload: any) { }
}

export const UploadASPFile = createAction(CommonActionsEnum.UPLOAD_ASP_FILE, props<{ payload: FormData }>());
export const UploadASPFileSuccess = createAction(CommonActionsEnum.UPLOAD_ASP_FILE_SUCCESS);
export const UploadASPFileFail = createAction(CommonActionsEnum.UPLOAD_ASP_FILE_FAIL);

export const UploadUNSPSCWorkFlowFile = createAction(CommonActionsEnum.UPLOAD_UNSPSC_WORKFLOW_FILE, props<{ payload: FormData }>());
export const UploadUNSPSCWorkFlowFileSuccess = createAction(CommonActionsEnum.UPLOAD_UNSPSC_WORKFLOW_FILE_SUCCESS);
export const UploadUNSPSCWorkFlowFileFail = createAction(CommonActionsEnum.UPLOAD_UNSPSC_WORKFLOW_FILE_FAIL);

export const InitUNSPSCWorkflowWithMarket = createAction(CommonActionsEnum.INIT_UNSPSC_WORKFLOW_MARKET, props<{ payload: UnspscWorkflowModel }>())
export const InitUNSPSCWorkflowWithMarketSuccess = createAction(CommonActionsEnum.INIT_UNSPSC_WORKFLOW_MARKET_SUCCESS)
export const InitUNSPSCWorkflowWithMarketFail = createAction(CommonActionsEnum.INIT_UNSPSC_WORKFLOW_MARKET_FAIL)

export const TriggerBrandAutomationDAG = createAction(CommonActionsEnum.BRAND_AUTOMATION_TRIGGER, props<{ payload: any }>());
export const TriggerBrandAutomationDAGSuccess = createAction(CommonActionsEnum.BRAND_AUTOMATION_TRIGGER_SUCCESS);
export const TriggerBrandAutomationDAGFail = createAction(CommonActionsEnum.BRAND_AUTOMATION_TRIGGER_FAIL);

export const BrandFeatureSuggestion = createAction(CommonActionsEnum.BRAND_FEATURE_SUGGESTION, props<{ payload: BrandFeatureSuggestionModel }>());
export const BrandFeatureSuggestionSuccess = createAction(CommonActionsEnum.BRAND_FEATURE_SUGGESTION_SUCCESS);
export const BrandFeatureSuggestionFail = createAction(CommonActionsEnum.BRAND_FEATURE_SUGGESTION_SUCCESS);

// action types
export type CommonActions =
  | WidgetSelectionChange
  | UploadUnspscReclassificationFile
  | UploadUnspscReclassificationFileSuccess
  | UploadUnspscReclassificationFileFail
  | UploadAttributeMasterFile
  | UploadAttributeMasterFileSuccess
  | UploadAttributeMasterFileFail
  | UploadUnspscClientCorrectionFile
  | UploadUnspscClientCorrectionFileSuccess
  | UploadUnspscClientCorrectionFileFail
  | ManufacturerCVsUploadFile
  | ManufacturerCVsUploadFileSuccess
  | ManufacturerCVsUploadFileFail
  | FacilityTypeCVsUploadFile
  | FacilityTypeCVsUploadFileSuccess
  | FacilityTypeCVsUploadFileFail
  | ManufacturerParentChildUploadFile
  | ManufacturerParentChildUploadFileSuccess
  | ManufacturerParentChildUploadFileFail
  | I2PItemPairsForResolutionFileUpload
  | I2PItemPairsForResolutionFileUploadSuccess
  | I2PItemPairsForResolutionFileUploadFail
  | GetUploadedFileHistory
  | GetUploadedFileHistorySuccess
  | GetUploadedFileHistoryFail
  | GetUploadedFileDetails
  | GetUploadedFileDetailsSuccess
  | GetUploadedFileDetailsFail
  | UploadProductAttributeTagFile
  | UploadProductAttributeTagFileFailed
  | UploadProductAttributeTagFileSuccess
  | GetActiveAttributesMaster
  | GetActiveAttributesMasterFail
  | GetActiveAttributesMasterSuccess
  | ChangeProductAttributeFilterValue
  | UploadProductMergeUnmergedGraphFile
  | UploadProductMergeUnmergedGraphFileFailed
  | UploadProductMergeUnmergedGraphFileSuccess
  | DownloadProductMergeUnmergedGraphFile
  | DownloadProductMergeUnmergedGraphFileSuccess
  | DownloadProductMergeUnmergedGraphFileFailed
  | SearchCriteriaProductGraphMerge
  | SearchCriteriaProductGraphMergeFilter
  | GetGraphProductItemReview
  | GetGraphProductItemReviewSuccess
  | GetActiveAttributesMasterFail
  | DownloadUOMDataFile
  | DownloadUOMDataFileSuccess
  | DownloadUOMDataFileFail
  | UploadBrandSuggestionFileUpload
  | UploadBrandSuggestionFileUploadSuccess
  | UploadBrandSuggestionFileUploadFail;