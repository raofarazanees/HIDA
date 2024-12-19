import { Action } from '@ngrx/store';

export enum CommonActionsEnum {
  ROUTE_STATE_CHANGE = '[APPMODULE] Route State Change ',
  ROUTE_STATE_CHANGE_FAIL = '[APPMODULE] Route State Change Fail',
  GET_TASK_DETAILS = '[APPMODULE] Get Task Details',
  GET_TASK_DETAILS_SUCCESS = '[APPMODULE] Get Task Details Success',
  GET_TASK_DETAILS_FAIL = '[APPMODULE] Get Task Details Fail',
  UPDATE_TASK_DETAILS = '[APPMODULE] Update Task Details',
  UPDATE_TASK_DETAILS_SUCCESS = '[APPMODULE] Update Task Details Success',
  UPDATE_TASK_DETAILS_FAIL = '[APPMODULE] Update Task Details Fail',
  CLEAR_STORE_ON_DEACTIVE = '[APPMODULE] Clear Store on Deactive',
  SET_APP_ENV_STATUS = '[APPMODULE] Get App Env Status'
}

export class ChangeRouteState implements Action {
  readonly type = CommonActionsEnum.ROUTE_STATE_CHANGE;

  constructor(public payload: any) {}
}

export class ChangeRouteStateFailed implements Action {
  readonly type = CommonActionsEnum.ROUTE_STATE_CHANGE_FAIL;
  constructor(public payload: any) {}
}

export class GetTaskDetails implements Action {
  readonly type = CommonActionsEnum.GET_TASK_DETAILS;

  constructor(public payload: any) {}
}
export class GetTaskDetailsSuccess implements Action {
  readonly type = CommonActionsEnum.GET_TASK_DETAILS_SUCCESS;

  constructor(public payload: any) {}
}
export class GetTaskDetailsFail implements Action {
  readonly type = CommonActionsEnum.GET_TASK_DETAILS_FAIL;

  constructor(public payload: any) {}
}

export class UpdateTaskDetails implements Action {
  readonly type = CommonActionsEnum.UPDATE_TASK_DETAILS;

  constructor(public payload: any, public redirect: boolean = true) {}
}
export class UpdateTaskDetailsSuccess implements Action {
  readonly type = CommonActionsEnum.UPDATE_TASK_DETAILS_SUCCESS;

  constructor(public payload: any, public redirectionPath: string = '') {}
}
export class UpdateTaskDetailsFail implements Action {
  readonly type = CommonActionsEnum.UPDATE_TASK_DETAILS_FAIL;

  constructor(public payload: any) {}
}

export class ClearStoreOnDeactive implements Action {
  readonly type = CommonActionsEnum.CLEAR_STORE_ON_DEACTIVE;

  constructor() {}
}

export class SetAppEnvStatus implements Action {
  readonly type = CommonActionsEnum.SET_APP_ENV_STATUS;
  constructor(public payload: {appEnv:string}) {}
}

// action types
export type CommonActions =
  | ChangeRouteState
  | GetTaskDetails
  | GetTaskDetailsSuccess
  | GetTaskDetailsFail
  | UpdateTaskDetails
  | UpdateTaskDetailsSuccess
  | UpdateTaskDetailsFail
  | ClearStoreOnDeactive
  | SetAppEnvStatus;
