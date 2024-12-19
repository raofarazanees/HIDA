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
} from './graph.actions';

describe('Actions :: Graph Actions', () => {
  it('should create an GET_GRAPH_ITEM_FOR_CONFIRMATION action', () => {
    const action = new GetGraphProductForMergeUnMerge({ payload: '' });
    expect(action.type).toEqual(GraphActionsEnum.GET_GRAPH_ITEM_FOR_CONFIRMATION);
  });

  it('should create an GET_GRAPH_ITEM_FOR_CONFIRMATION_SUCCESS action', () => {
    const action = new GetGraphProductForMergeUnMergeSuccess({ payload: '' });
    expect(action.type).toEqual(GraphActionsEnum.GET_GRAPH_ITEM_FOR_CONFIRMATION_SUCCESS);
  });

  it('should create an GET_GRAPH_ITEM_FOR_CONFIRMATION_FAIL action', () => {
    const action = new GetGraphProductForMergeUnMergeFail({ payload: '' });
    expect(action.type).toEqual(GraphActionsEnum.GET_GRAPH_ITEM_FOR_CONFIRMATION_FAIL);
  });

  it('should create an CONFIRM_GRAPH_ITEM_MERGE_UNMERGE action', () => {
    const action = new GraphProductMergeUnMergeAction({ payload: '' });
    expect(action.type).toEqual(GraphActionsEnum.CONFIRM_GRAPH_ITEM_MERGE_UNMERGE);
  });

  it('should create an CONFIRM_GRAPH_ITEM_MERGE_UNMERGE_SUCCESS action', () => {
    const action = new GraphProductMergeUnMergeActionSuccess();
    expect(action.type).toEqual(GraphActionsEnum.CONFIRM_GRAPH_ITEM_MERGE_UNMERGE_SUCCESS);
  });

  it('should create an CONFIRM_GRAPH_ITEM_MERGE_UNMERGE_FAIL action', () => {
    const action = new GraphProductMergeUnMergeActionFail({ payload: '' });
    expect(action.type).toEqual(GraphActionsEnum.CONFIRM_GRAPH_ITEM_MERGE_UNMERGE_FAIL);
  });

  it('should create an GET_GRAPH_ITEMS_FOR_PRODUCT action', () => {
    const action = new GetGraphItemsForProduct({ payload: '' });
    expect(action.type).toEqual(GraphActionsEnum.GET_GRAPH_ITEMS_FOR_PRODUCT);
  });

  it('should create an GET_GRAPH_ITEMS_FOR_PRODUCT_SUCCESS action', () => {
    const action = new GetGraphItemsForProductSuccess({ payload: '' });
    expect(action.type).toEqual(GraphActionsEnum.GET_GRAPH_ITEMS_FOR_PRODUCT_SUCCESS);
  });

  it('should create an GET_GRAPH_ITEMS_FOR_PRODUCT_FAIL action', () => {
    const action = new GetGraphItemsForProductFail({ payload: '' });
    expect(action.type).toEqual(GraphActionsEnum.GET_GRAPH_ITEMS_FOR_PRODUCT_FAIL);
  });
});
