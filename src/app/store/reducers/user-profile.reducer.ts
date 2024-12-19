import { UserProfileActions, UserProfileActionsEnum } from '../actions';

export interface UserProfileState {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  vendorName: string;
  faciliyTypeRoles: string[];
  itemMasterRoles: string[];
  manufacturerRoles: string[];
  restatingSalesRoles: string[];
  wbDashboardRoles: string[];
  itemToProductRoles: string[];
}

export const initialState: UserProfileState = {
  firstName: '',
  lastName: '',
  fullName: '',
  email: '',
  vendorName: '',
  faciliyTypeRoles: [],
  itemMasterRoles: [],
  manufacturerRoles: [],
  restatingSalesRoles: [],
  wbDashboardRoles: [],
  itemToProductRoles: []
};

export function userProfileReducer(state: UserProfileState = initialState, action: UserProfileActions): UserProfileState {
  switch (action.type) {
    case UserProfileActionsEnum.USER_PROFILE_STATE_CHANGE: {
      return {
        ...state,
        firstName: action.payload.userInfo.first_name,
        lastName: action.payload.userInfo.last_name,
        fullName: `${action.payload.userInfo.last_name}, ${action.payload.userInfo.first_name}`,
        email: action.payload.userInfo.email,
        vendorName: getVendorName(action.payload.userInfo),
        faciliyTypeRoles: action.payload.faciliyTypeRoles,
        itemMasterRoles: action.payload.itemMasterRoles,
        manufacturerRoles: action.payload.manufacturerRoles,
        restatingSalesRoles: action.payload.restatingSalesRoles,
        wbDashboardRoles: action.payload.wbDashboardRoles,
        itemToProductRoles: action.payload.itemToProductRoles
      };
    }
    default:
      return state;
  }
}

function getVendorName(userInfo: any): string {
  if (userInfo.sing_vendor) {
    return userInfo.sing_vendor_name;
  }
  const domain = userInfo.email.split('@').length > 1 ? userInfo.email.split('@')[1] : '';
  return domain.split('.')[0];
}
