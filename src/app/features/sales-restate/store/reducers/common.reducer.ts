import { CommonActionsEnum } from '../actions';
export interface CommonState {
  loading: boolean;
}

export const initialState: CommonState = {
  loading: false
};

export function commonReducer(state: CommonState = initialState, action: any): CommonState {
  switch (action.type) {
    case CommonActionsEnum.SUBMIT_SALES_RECORD:
      return {
        ...state,
        loading: true
      };
    case CommonActionsEnum.SUBMIT_SALES_RECORD_SUCCESS:
    case CommonActionsEnum.SUBMIT_SALES_RECORD_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
