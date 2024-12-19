import { initialProductBrand, ProductBrandReviewState } from '../../../../features/admin-dashboard/store/reducers/brand.reducer';
import { GraphActionsEnum } from '../actions';

export interface GraphState {
  loading: boolean;
  itemGraphs: any;
  itemsProduct: any;
  productBrandConfirmation: ProductBrandReviewState;
}


export const initialState: GraphState = {
  loading: false,
  itemGraphs: null,
  itemsProduct: null,
  productBrandConfirmation: initialProductBrand
};

export function graphReducer(state: GraphState = initialState, action: any): GraphState {
  switch (action.type) {
    case GraphActionsEnum.GET_GRAPH_ITEM_FOR_CONFIRMATION:
      return {
        ...state,
        loading: true
      };
    case GraphActionsEnum.GET_GRAPH_ITEM_FOR_CONFIRMATION_SUCCESS:
      return {
        ...state,
        loading: false,
        itemGraphs: action.payload
      };
    case GraphActionsEnum.GET_GRAPH_ITEM_FOR_CONFIRMATION_FAIL:
      return {
        ...state,
        loading: false
      };
    case GraphActionsEnum.GET_GRAPH_ITEMS_FOR_PRODUCT:
      return {
        ...state,
        loading: false,
        itemsProduct: null
      };
    case GraphActionsEnum.GET_GRAPH_ITEMS_FOR_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        itemsProduct: action.payload
      };
    case GraphActionsEnum.GET_GRAPH_ITEMS_FOR_PRODUCT_FAIL:
      return {
        ...state,
        loading: false
      };

    case GraphActionsEnum.CONFIRM_GRAPH_ITEM_MERGE_UNMERGE:
      return {
        ...state,
        loading: true
      };
    case GraphActionsEnum.CONFIRM_GRAPH_ITEM_MERGE_UNMERGE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case GraphActionsEnum.CONFIRM_GRAPH_ITEM_MERGE_UNMERGE_FAIL:
      return {
        ...state,
        loading: false
      };
    case GraphActionsEnum.GET_PRODUCT_BRAND_CONFIRMATION:
      return {
        ...state,
        loading: true,
        productBrandConfirmation: { response: null }
      };
    case GraphActionsEnum.GET_PRODUCT_BRAND_CONFIRMATION_SUCCESS:
      return {
        ...state,
        loading: false,
        productBrandConfirmation: { response: action.payload }
      };
    case GraphActionsEnum.GET_PRODUCT_BRAND_CONFIRMATION_FAIL:
      return {
        ...state,
        loading: false,
        productBrandConfirmation: { response: null }
      };
    case GraphActionsEnum.TASK_SUBMISSION_PRODUCT_BRAND:
      return {
        ...state,
        loading: true
      };
    case GraphActionsEnum.TASK_SUBMISSION_PRODUCT_BRAND_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case GraphActionsEnum.TASK_SUBMISSION_PRODUCT_BRAND_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
