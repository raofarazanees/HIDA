import { Action } from '@ngrx/store';

export enum CommonActionsEnum {
  GET_ONTOLOGY_MAPPINGS = '[FaciltyTypeModule] Get Ontology Mappings',
  GET_ONTOLOGY_MAPPINGS_SUCCESS = '[FaciltyTypeModule] Get Ontology Mappings Success',
  GET_ONTOLOGY_MAPPINGS_FAIL = '[FaciltyTypeModule] Get Ontology Mappings Fail',
  GET_CHANGE_LOG_BY_MAPID = '[FaciltyTypeModule] Get Change Log By MapID',
  GET_CHANGE_LOG_BY_MAPID_SUCCESS = '[FaciltyTypeModule] Get Change Log By MapID Success',
  GET_CHANGE_LOG_BY_MAPID_FAIL = '[FaciltyTypeModule] Get Change Log By MapID Fail',
  UPDATE_MASTERED_RECORD = '[FaciltyTypeModule] Update Mastered Record',
  UPDATE_MASTERED_RECORD_SUCCESS = '[FaciltyTypeModule] Update Mastered Record Success',
  UPDATE_MASTERED_RECORD_FAIL = '[FaciltyTypeModule] Update Mastered Record Fail'
}
export class GetOntologyMappings implements Action {
  readonly type = CommonActionsEnum.GET_ONTOLOGY_MAPPINGS;
  constructor(public payload: any) {}
}

export class GetOntologyMappingsSuccess implements Action {
  readonly type = CommonActionsEnum.GET_ONTOLOGY_MAPPINGS_SUCCESS;
  constructor(public payload: any) {}
}

export class GetOntologyMappingsFail implements Action {
  readonly type = CommonActionsEnum.GET_ONTOLOGY_MAPPINGS_FAIL;
  constructor(public payload: any) {}
}
export class UpdateMasteredRecord implements Action {
  readonly type = CommonActionsEnum.UPDATE_MASTERED_RECORD;

  constructor(public payload: any) {}
}
export class UpdateMasteredRecordSuccess implements Action {
  readonly type = CommonActionsEnum.UPDATE_MASTERED_RECORD_SUCCESS;

  constructor() {}
}
export class UpdateMasteredRecordFail implements Action {
  readonly type = CommonActionsEnum.UPDATE_MASTERED_RECORD_FAIL;

  constructor() {}
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

// action types
export type CommonActions =
  | GetOntologyMappings
  | GetOntologyMappingsSuccess
  | GetOntologyMappingsFail
  | GetChangeLogByMapID
  | GetChangeLogByMapIDSuccess
  | GetChangeLogByMapIDFail
  | UpdateMasteredRecord
  | UpdateMasteredRecordSuccess
  | UpdateMasteredRecordFail;
