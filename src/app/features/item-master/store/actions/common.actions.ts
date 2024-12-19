import { Action } from '@ngrx/store';

export enum CommonActionsEnum {
  GET_UNMASTERED_DATA = '[ItemMasterModule] Get UnMastered Data',
  GET_UNMASTERED_DATA_SUCCESS = '[ItemMasterModule] Get UnMastered Data Success',
  GET_UNMASTERED_DATA_FAIL = '[ItemMasterModule] Get UnMastered Data Fail',
  UPDATE_MASTERED_RECORD = '[ItemMasterModule] Update Mastered Record',
  UPDATE_MASTERED_RECORD_SUCCESS = '[ItemMasterModule] Update Mastered Record Success',
  UPDATE_MASTERED_RECORD_FAIL = '[ItemMasterModule] Update Mastered Record Fail',
  GET_CHANGE_LOG_BY_MAPID = '[ItemMasterModule] Get Change Log By MapID',
  GET_CHANGE_LOG_BY_MAPID_SUCCESS = '[ItemMasterModule] Get Change Log By MapID Success',
  GET_CHANGE_LOG_BY_MAPID_FAIL = '[ItemMasterModule] Get Change Log By MapID Fail',
  GET_UNSPSC_FOR_TREE_VIEW = '[ItemMasterModule] Get UNSPSC For Tree View',
  GET_UNSPSC_FOR_TREE_VIEW_SUCCESS = '[ItemMasterModule] Get UNSPSC For Tree View Success',
  GET_UNSPSC_FOR_TREE_VIEW_FAIL = '[ItemMasterModule] Get UNSPSC For Tree View Fail',
  GET_UNSPSC_ATTRIBUTE_EXTENSIONS = '[ItemMasterModule] Get UNSPSC Attribute Extensions',
  GET_UNSPSC_ATTRIBUTE_EXTENSIONS_SUCCESS = '[ItemMasterModule] Get UNSPSC Attribute Extensions Success',
  GET_UNSPSC_ATTRIBUTE_EXTENSIONS_FAIL = '[ItemMasterModule] Get UNSPSC Attribute Extensions Fail',
  GET_UNSPSC_SEARCH_FOR_TREE_VIEW = '[ItemMasterModule] Get UNSPSC Search For Tree View',
  GET_UNSPSC_SEARCH_FOR_TREE_VIEW_SUCCESS = '[ItemMasterModule] Get UNSPSC Search For Tree View Success',
  GET_UNSPSC_SEARCH_FOR_TREE_VIEW_FAIL = '[ItemMasterModule] Get UNSPSC Search For Tree View Fail',
  SET_TREE_VIEW_DATA_MODE = '[ItemMasterModule] Set Tree View Data Mode',
  GET_REJECT_LOG_BY_ITEM_PGUID = '[ItemMasterModule] Get Reject Log By itemPGUID',
  GET_REJECT_LOG_BY_ITEM_PGUID_SUCCESS = '[ItemMasterModule] Get Reject Log By itemPGUID Success',
  GET_REJECT_LOG_BY_ITEM_PGUID_FAIL = '[ItemMasterModule] Get Reject Log By itemPGUID Fail'
}
export class GetUnmasteredData implements Action {
  readonly type = CommonActionsEnum.GET_UNMASTERED_DATA;
  constructor(public payload: any) {}
}

export class GetUnmasteredDataSuccess implements Action {
  readonly type = CommonActionsEnum.GET_UNMASTERED_DATA_SUCCESS;
  constructor(public payload: any) {}
}

export class GetUnmasteredDataFail implements Action {
  readonly type = CommonActionsEnum.GET_UNMASTERED_DATA_FAIL;
  constructor(public payload: any) {}
}

export class UpdateMasteredRecord implements Action {
  readonly type = CommonActionsEnum.UPDATE_MASTERED_RECORD;

  constructor(public payload: any) {}
}
export class UpdateMasteredRecordSuccess implements Action {
  readonly type = CommonActionsEnum.UPDATE_MASTERED_RECORD_SUCCESS;
}
export class UpdateMasteredRecordFail implements Action {
  readonly type = CommonActionsEnum.UPDATE_MASTERED_RECORD_FAIL;
}

export class GetChangeLogByMapID implements Action {
  readonly type = CommonActionsEnum.GET_CHANGE_LOG_BY_MAPID;
  constructor(public payload: any) {}
}

export class GetChangeLogByMapIDSuccess implements Action {
  readonly type = CommonActionsEnum.GET_CHANGE_LOG_BY_MAPID_SUCCESS;
  constructor(public payload: any) {}
}

export class GetChangeLogByMapIDFail implements Action {
  readonly type = CommonActionsEnum.GET_CHANGE_LOG_BY_MAPID_FAIL;
  constructor(public payload: any) {}
}

export class GetUNSPSCForTreeView implements Action {
  readonly type = CommonActionsEnum.GET_UNSPSC_FOR_TREE_VIEW;
  constructor(public payload: any, public isRoot: boolean = false) {}
}

export class GetUNSPSCForTreeViewSuccess implements Action {
  readonly type = CommonActionsEnum.GET_UNSPSC_FOR_TREE_VIEW_SUCCESS;
  constructor(public payload: any, public isRoot?: boolean) {}
}

export class GetUNSPSCForTreeViewFail implements Action {
  readonly type = CommonActionsEnum.GET_UNSPSC_FOR_TREE_VIEW_FAIL;
  constructor(public payload: any, public isRoot?: boolean) {}
}

export class GetUNSPSCAttributeExtensions implements Action {
  readonly type = CommonActionsEnum.GET_UNSPSC_ATTRIBUTE_EXTENSIONS;
  constructor() {}
}

export class GetUNSPSCAttributeExtensionsSuccess implements Action {
  readonly type = CommonActionsEnum.GET_UNSPSC_ATTRIBUTE_EXTENSIONS_SUCCESS;
  constructor(public payload: any) {}
}

export class GetUNSPSCAttributeExtensionsFail implements Action {
  readonly type = CommonActionsEnum.GET_UNSPSC_ATTRIBUTE_EXTENSIONS_FAIL;
  constructor(public payload: any) {}
}

export class GetUNSPSCSearchForTreeView implements Action {
  readonly type = CommonActionsEnum.GET_UNSPSC_SEARCH_FOR_TREE_VIEW;
  constructor(public payload: any) {}
}

export class GetUNSPSCSearchForTreeViewSuccess implements Action {
  readonly type = CommonActionsEnum.GET_UNSPSC_SEARCH_FOR_TREE_VIEW_SUCCESS;
  constructor(public payload: any) {}
}

export class GetUNSPSCSearchForTreeViewFail implements Action {
  readonly type = CommonActionsEnum.GET_UNSPSC_SEARCH_FOR_TREE_VIEW_FAIL;
  constructor(public payload: any) {}
}

export class SetTreeViewDataMode implements Action {
  readonly type = CommonActionsEnum.SET_TREE_VIEW_DATA_MODE;
  constructor(public payload: string) {}
}

export class GetRejectLogByitemPGUID implements Action {
  readonly type = CommonActionsEnum.GET_REJECT_LOG_BY_ITEM_PGUID;
  constructor(public payload: any) {}
}

export class GetRejectLogByitemPGUIDSuccess implements Action {
  readonly type = CommonActionsEnum.GET_REJECT_LOG_BY_ITEM_PGUID_SUCCESS;
  constructor(public payload: any) {}
}

export class GetRejectLogByitemPGUIDFail implements Action {
  readonly type = CommonActionsEnum.GET_REJECT_LOG_BY_ITEM_PGUID_FAIL;
  constructor(public payload: any) {}
}

// action types
export type CommonActions =
  | GetUnmasteredData
  | GetUnmasteredDataSuccess
  | GetUnmasteredDataFail
  | UpdateMasteredRecord
  | UpdateMasteredRecordSuccess
  | UpdateMasteredRecordFail
  | GetChangeLogByMapID
  | GetChangeLogByMapIDSuccess
  | GetChangeLogByMapIDFail
  | GetUNSPSCForTreeView
  | GetUNSPSCForTreeViewSuccess
  | GetUNSPSCForTreeViewFail
  | GetUNSPSCAttributeExtensions
  | GetUNSPSCAttributeExtensionsSuccess
  | GetUNSPSCAttributeExtensionsFail
  | GetUNSPSCSearchForTreeView
  | GetUNSPSCSearchForTreeViewSuccess
  | GetUNSPSCSearchForTreeViewFail
  | SetTreeViewDataMode
  | GetRejectLogByitemPGUID
  | GetRejectLogByitemPGUIDSuccess
  | GetRejectLogByitemPGUIDFail;
