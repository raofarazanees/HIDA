import { Action } from '@ngrx/store';

export enum PairingActionsEnum {
  GET_PAIRS_FOR_RESOLUTION = '[ItemToProductModule] Get Pairs For Resolution',
  GET_PAIRS_FOR_RESOLUTION_SUCCESS = '[ItemToProductModule] Get Pairs For Resolution Success',
  GET_PAIRS_FOR_RESOLUTION_FAIL = '[ItemToProductModule] Get Pairs For Resolution Fail'
}
export class GetPairsForResolution implements Action {
  readonly type = PairingActionsEnum.GET_PAIRS_FOR_RESOLUTION;
  constructor(public payload: any) {}
}

export class GetPairsForResolutionSuccess implements Action {
  readonly type = PairingActionsEnum.GET_PAIRS_FOR_RESOLUTION_SUCCESS;

  constructor(public payload: any) {}
}
export class GetPairsForResolutionFail implements Action {
  readonly type = PairingActionsEnum.GET_PAIRS_FOR_RESOLUTION_FAIL;

  constructor(public payload: any) {}
}

// action types
export type pairActions = GetPairsForResolution | GetPairsForResolutionSuccess | GetPairsForResolutionFail;
