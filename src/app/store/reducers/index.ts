import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { CommonState, commonReducer } from './common.reducer';
import { userProfileReducer, UserProfileState } from './user-profile.reducer';

export interface ApplicationState {
  common: CommonState;
  [propName: string]: any;
}

export const reducers: ActionReducerMap<ApplicationState, any> = {
  common: commonReducer,
  userProfile: userProfileReducer
};

export const getCommonState = createFeatureSelector<CommonState>('common');

export const getUserProfileState = createFeatureSelector<UserProfileState>('userProfile');

export { CommonState } from './common.reducer';
export { UserProfileState } from './user-profile.reducer';
