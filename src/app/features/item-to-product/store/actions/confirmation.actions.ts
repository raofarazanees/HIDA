import { Action } from '@ngrx/store';

export enum ConfirmationActionsEnum {
  GET_ITEM_PAIRS_FOR_CONFIRMATION = '[ItemToProductModule] Get Item Pairs For Confirmation',
  GET_ITEM_PAIRS_FOR_CONFIRMATION_SUCCESS = '[ItemToProductModule] Get Item Pairs For Confirmation Success',
  GET_ITEM_PAIRS_FOR_CONFIRMATION_FAIL = '[ItemToProductModule] Get Item Pairs For Confirmation Fail',
  CONFIRM_ITEM_PAIRS = '[ItemToProductModule] Confirm Item Pairs',
  CONFIRM_ITEM_PAIRS_SUCCESS = '[ItemToProductModule] Confirm Item Pairs Success',
  CONFIRM_ITEM_PAIRS_FAIL = '[ItemToProductModule] Confirm Item Pairs Fail'
}
export class GetItemPairsForConfirmation implements Action {
  readonly type = ConfirmationActionsEnum.GET_ITEM_PAIRS_FOR_CONFIRMATION;
  constructor(public payload: any) {}
}

export class GetItemPairsForConfirmationSuccess implements Action {
  readonly type = ConfirmationActionsEnum.GET_ITEM_PAIRS_FOR_CONFIRMATION_SUCCESS;

  constructor(public payload: any) {}
}
export class GetItemPairsForConfirmationFail implements Action {
  readonly type = ConfirmationActionsEnum.GET_ITEM_PAIRS_FOR_CONFIRMATION_FAIL;

  constructor(public payload: any) {}
}

export class ConfirmItemPairs implements Action {
  readonly type = ConfirmationActionsEnum.CONFIRM_ITEM_PAIRS;
  constructor(public payload: any) {}
}

export class ConfirmItemPairsSuccess implements Action {
  readonly type = ConfirmationActionsEnum.CONFIRM_ITEM_PAIRS_SUCCESS;

  constructor(public payload: any) {}
}
export class ConfirmItemPairsFail implements Action {
  readonly type = ConfirmationActionsEnum.CONFIRM_ITEM_PAIRS_FAIL;

  constructor(public payload: any) {}
}

// action types
export type confirmationActions =
  | GetItemPairsForConfirmation
  | GetItemPairsForConfirmationSuccess
  | GetItemPairsForConfirmationFail
  | ConfirmItemPairs
  | ConfirmItemPairsSuccess
  | ConfirmItemPairsFail;
