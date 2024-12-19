import { Action } from '@ngrx/store';

export enum UserProfileActionsEnum {
  USER_PROFILE_STATE_CHANGE = '[APPMODULE] User Profile State Change '
}

export class ChangeUserProfileState implements Action {
  readonly type = UserProfileActionsEnum.USER_PROFILE_STATE_CHANGE;

  constructor(public payload: any) {}
}

// action types
export type UserProfileActions = ChangeUserProfileState;
