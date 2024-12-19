import { ConfirmationActionsEnum } from '../actions';

export interface ConfirmationState {
  loading: boolean;
  confirmLoading: boolean;
  itemPairs: any;
}

export const initialState: ConfirmationState = {
  loading: false,
  confirmLoading: false,
  itemPairs: null
};

export function confirmationReducer(state: ConfirmationState = initialState, action: any): ConfirmationState {
  switch (action.type) {
    case ConfirmationActionsEnum.GET_ITEM_PAIRS_FOR_CONFIRMATION:
      return {
        ...state,
        loading: true
      };
    case ConfirmationActionsEnum.GET_ITEM_PAIRS_FOR_CONFIRMATION_SUCCESS:
    case ConfirmationActionsEnum.GET_ITEM_PAIRS_FOR_CONFIRMATION_FAIL:
      return {
        ...state,
        loading: false,
        itemPairs: action.payload
      };
    case ConfirmationActionsEnum.CONFIRM_ITEM_PAIRS:
      return {
        ...state,
        confirmLoading: true
      };
    case ConfirmationActionsEnum.CONFIRM_ITEM_PAIRS_SUCCESS:
    case ConfirmationActionsEnum.CONFIRM_ITEM_PAIRS_FAIL:
      return {
        ...state,
        confirmLoading: false
      };
    default:
      return state;
  }
}
