import {
  GetGraphItemsForProduct,
  GetGraphItemsForProductFail,
  GetGraphItemsForProductSuccess,
  GetGraphProductForMergeUnMerge,
  GetGraphProductForMergeUnMergeFail,
  GetGraphProductForMergeUnMergeSuccess,
  GraphActionsEnum,
  GraphProductMergeUnMergeAction,
  GraphProductMergeUnMergeActionFail,
  GraphProductMergeUnMergeActionSuccess
} from '../actions/graph.actions';
import { graphReducer, initialState } from './graph.reducer';

const itemGraphs = [{ productID: 1, itemPGUID: 'assets::uan:12345' }];

describe('Reducer: I2P Graph', () => {
  it('should loading true on GET_GRAPH_ITEM_FOR_CONFIRMATION ', () => {
    const action = { type: GraphActionsEnum.GET_GRAPH_ITEM_FOR_CONFIRMATION };
    const expected = { ...initialState, loading: true };
    expect(graphReducer(initialState, action)).toEqual(expected);
  });

  it('should loading false and Graph have item on GET_GRAPH_ITEM_FOR_CONFIRMATION_SUCCESS ', () => {
    const action = { type: GraphActionsEnum.GET_GRAPH_ITEM_FOR_CONFIRMATION_SUCCESS, payload: itemGraphs };
    const expected = { ...initialState, loading: false, itemGraphs: itemGraphs };
    expect(graphReducer(initialState, action)).toEqual(expected);
  });

  it('should loading false on GET_GRAPH_ITEM_FOR_CONFIRMATION_FAIL ', () => {
    const action = { type: GraphActionsEnum.GET_GRAPH_ITEM_FOR_CONFIRMATION_FAIL };
    const expected = { ...initialState, loading: false };
    expect(graphReducer(initialState, action)).toEqual(expected);
  });

  it('should loading false and itemsProduct should null on GET_GRAPH_ITEMS_FOR_PRODUCT ', () => {
    const action = { type: GraphActionsEnum.GET_GRAPH_ITEMS_FOR_PRODUCT };
    const expected = { ...initialState, loading: false , itemsProduct: null};
    expect(graphReducer(initialState, action)).toEqual(expected);
  });

  it('should loading false and itemsProduct should have item on GET_GRAPH_ITEMS_FOR_PRODUCT_SUCCESS ', () => {
    const action = { type: GraphActionsEnum.GET_GRAPH_ITEMS_FOR_PRODUCT_SUCCESS,payload: itemGraphs };
    const expected = { ...initialState, loading: false , itemsProduct: itemGraphs};
    expect(graphReducer(initialState, action)).toEqual(expected);
  });

  it('should loading false on GET_GRAPH_ITEMS_FOR_PRODUCT_FAIL ', () => {
    const action = { type: GraphActionsEnum.GET_GRAPH_ITEMS_FOR_PRODUCT_FAIL };
    const expected = { ...initialState, loading: false};
    expect(graphReducer(initialState, action)).toEqual(expected);
  });

  
  it('should loading true on CONFIRM_GRAPH_ITEM_MERGE_UNMERGE ', () => {
    const action = { type: GraphActionsEnum.CONFIRM_GRAPH_ITEM_MERGE_UNMERGE };
    const expected = { ...initialState, loading: true};
    expect(graphReducer(initialState, action)).toEqual(expected);
  });


  it('should loading false on CONFIRM_GRAPH_ITEM_MERGE_UNMERGE_SUCCESS ', () => {
    const action = { type: GraphActionsEnum.CONFIRM_GRAPH_ITEM_MERGE_UNMERGE_SUCCESS };
    const expected = { ...initialState, loading: false};
    expect(graphReducer(initialState, action)).toEqual(expected);
  });
 

  it('should loading false on CONFIRM_GRAPH_ITEM_MERGE_UNMERGE_FAIL ', () => {
    const action = { type: GraphActionsEnum.CONFIRM_GRAPH_ITEM_MERGE_UNMERGE_FAIL };
    const expected = { ...initialState, loading: false};
    expect(graphReducer(initialState, action)).toEqual(expected);
  });

});
