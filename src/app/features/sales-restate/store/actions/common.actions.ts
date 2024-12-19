import { Action } from '@ngrx/store';

export enum CommonActionsEnum {
  SUBMIT_SALES_RECORD = '[SalesRestateModule] Sumit Sales Record',
  SUBMIT_SALES_RECORD_SUCCESS = '[SalesRestateModule]  Sumit Sales Record Success',
  SUBMIT_SALES_RECORD_FAIL = '[SalesRestateModule]  Sumit Sales Record Fail'
}
export class SubmitSalesRecord implements Action {
  readonly type = CommonActionsEnum.SUBMIT_SALES_RECORD;
  constructor(public payload: any) {}
}

export class SubmitSalesRecordSuccess implements Action {
  readonly type = CommonActionsEnum.SUBMIT_SALES_RECORD_SUCCESS;

  constructor() {}
}
export class SubmitSalesRecordFail implements Action {
  readonly type = CommonActionsEnum.SUBMIT_SALES_RECORD_FAIL;

  constructor() {}
}

// action types
export type CommonActions = SubmitSalesRecord | SubmitSalesRecordSuccess | SubmitSalesRecordFail;
