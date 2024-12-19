import { Action } from '@ngrx/store';

export enum UnmasteredActionsEnum {
  SUBMIT_UNMASTERED_RECORDS = '[ItemMasterModule] Submit UnMastered Records',
  SUBMIT_UNMASTERED_RECORDS_SUCCESS = '[ItemMasterModule] Submit UnMastered Records Success',
  SUBMIT_UNMASTERED_RECORDS_FAIL = '[ItemMasterModule] Submit UnMastered Records Fail',
  SAVEFORLATER_UNMASTERED_RECORD = '[ItemMasterModule] SaveForLaster UnMastered Record',
  SAVEFORLATER_UNMASTERED_RECORD_SUCCESS = '[ItemMasterModule] SaveForLaster UnMastered Record Success',
  SAVEFORLATER_UNMASTERED_RECORD_FAIL = '[ItemMasterModule] SaveForLaster UnMastered Record Fail'
}
export class SubmitUnmasteredRecords implements Action {
  readonly type = UnmasteredActionsEnum.SUBMIT_UNMASTERED_RECORDS;
  constructor(public payload: any, public taskType: string) {}
}

export class SubmitUnmasteredRecordsSuccess implements Action {
  readonly type = UnmasteredActionsEnum.SUBMIT_UNMASTERED_RECORDS_SUCCESS;
  constructor(public payload: any) {}
}

export class SubmitUnmasteredRecordsFail implements Action {
  readonly type = UnmasteredActionsEnum.SUBMIT_UNMASTERED_RECORDS_FAIL;
  constructor() {}
}

export class SaveForLaterUnmasteredRecords implements Action {
  readonly type = UnmasteredActionsEnum.SAVEFORLATER_UNMASTERED_RECORD;
  constructor(public updatedRecords: any, public payload: any, public taskType: string) {}
}
export class SaveForLaterUnmasteredRecordsSuccess implements Action {
  readonly type = UnmasteredActionsEnum.SAVEFORLATER_UNMASTERED_RECORD_SUCCESS;
  constructor(public payload: any) {}
}
export class SaveForLaterUnmasteredRecordsFail implements Action {
  readonly type = UnmasteredActionsEnum.SAVEFORLATER_UNMASTERED_RECORD_FAIL;
  constructor() {}
}

// action types
export type UnmasteredActions =
  | SubmitUnmasteredRecords
  | SubmitUnmasteredRecordsSuccess
  | SubmitUnmasteredRecordsFail
  | SaveForLaterUnmasteredRecords
  | SaveForLaterUnmasteredRecordsSuccess
  | SaveForLaterUnmasteredRecordsFail;
