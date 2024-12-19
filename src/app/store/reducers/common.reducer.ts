import { CommonActions, CommonActionsEnum } from '../actions';
export interface RouteState {
  taskTitle: string;
  taskId: string;
  workflowId: string;
  distributorPguid: string;
}
export interface CommonState {
  routeState: RouteState | any;
  taskDetails: any;
  distributors: any;
  activeDistributorPguid: number;
  loading: boolean;
  updatingTask: boolean;
  appEnv: string;
}

export const initialState: CommonState = {
  routeState: null,
  taskDetails: null,
  distributors: getDistributorList(),
  loading: false,
  activeDistributorPguid: 0,
  updatingTask: false,
  appEnv: ''
};

export function commonReducer(state: CommonState = initialState, action: CommonActions): CommonState {
  switch (action.type) {
    case CommonActionsEnum.ROUTE_STATE_CHANGE: {
      return {
        ...state,
        routeState: {
          ...action.payload,
          groupName: decodeURIComponent(action?.payload?.groupName)
        }
      };
    }
    case CommonActionsEnum.GET_TASK_DETAILS: {
      return {
        ...state,
        loading: true,
        updatingTask: false
      };
    }
    case CommonActionsEnum.GET_TASK_DETAILS_SUCCESS: {
      return {
        ...state,
        taskDetails: action.payload,
        activeDistributorPguid: action.payload.genericPayload.distributorPguid || 0,
        loading: false
      };
    }
    case CommonActionsEnum.GET_TASK_DETAILS_FAIL: {
      return {
        ...state,
        taskDetails: null,
        loading: false
      };
    }
    case CommonActionsEnum.UPDATE_TASK_DETAILS: {
      return {
        ...state,
        updatingTask: true,
        loading: false
      };
    }
    case CommonActionsEnum.UPDATE_TASK_DETAILS_SUCCESS: {
      return {
        ...state,
        taskDetails: action.payload,
        updatingTask: false
      };
    }
    case CommonActionsEnum.UPDATE_TASK_DETAILS_FAIL: {
      return {
        ...state,
        updatingTask: false
      };
    }
    case CommonActionsEnum.CLEAR_STORE_ON_DEACTIVE: {
      return {
        ...state,
        routeState: null,
        activeDistributorPguid: 0,
        taskDetails: null
      };
    }
    case CommonActionsEnum.SET_APP_ENV_STATUS: {
      return {
        ...state,
        appEnv: action.payload?.appEnv,
      };
    }
    default:
      return state;
  }
}

function getDistributorList(): any {
  return ['', 'Claflin', 'Concordance', 'Henry Schein', 'Mckesson', 'Medline', 'Owens-And-Minor', 'Thermo-Fisher', 'Cardinal'];
}
