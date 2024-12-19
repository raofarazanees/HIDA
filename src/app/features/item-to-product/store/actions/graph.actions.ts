import { Action } from '@ngrx/store';

export enum GraphActionsEnum {
  GET_GRAPH_ITEM_FOR_CONFIRMATION = '[ItemToProductModule] Get Product For Graph Merge UnMerge',
  GET_GRAPH_ITEM_FOR_CONFIRMATION_SUCCESS = '[ItemToProductModule] Get Product For Graph Merge UnMerge Success',
  GET_GRAPH_ITEM_FOR_CONFIRMATION_FAIL = '[ItemToProductModule] Get Product For Graph Merge UnMerge Fail',
  CONFIRM_GRAPH_ITEM_MERGE_UNMERGE = '[ItemToProductModule] Confirm Graph Product For Merge UnMerge',
  CONFIRM_GRAPH_ITEM_MERGE_UNMERGE_SUCCESS = '[ItemToProductModule] Confirm Graph Product For Merge UnMerge Success',
  CONFIRM_GRAPH_ITEM_MERGE_UNMERGE_FAIL = '[ItemToProductModule] Confirm Graph Product For Merge UnMerge Fail',
  GET_GRAPH_ITEMS_FOR_PRODUCT = '[ItemToProductModule] Get Graph items for Product',
  GET_GRAPH_ITEMS_FOR_PRODUCT_SUCCESS = '[ItemToProductModule] Get Graph items for Product Success',
  GET_GRAPH_ITEMS_FOR_PRODUCT_FAIL = '[ItemToProductModule] Get Graph items for Product Fail',

  GET_PRODUCT_BRAND_CONFIRMATION = '[ItemToProductModule] Get Product brand for Confirmation',
  GET_PRODUCT_BRAND_CONFIRMATION_SUCCESS = '[ItemToProductModule] Get Product brand for Confirmation Success',
  GET_PRODUCT_BRAND_CONFIRMATION_FAIL = '[ItemToProductModule] Get Product brand for Confirmation Fail',
  TASK_SUBMISSION_PRODUCT_BRAND = '[ItemToProductModule] Product Brand Task Submission',
  TASK_SUBMISSION_PRODUCT_BRAND_SUCCESS = '[ItemToProductModule] Product Brand Task Submission Success',
  TASK_SUBMISSION_PRODUCT_BRAND_FAIL = '[ItemToProductModule] Product Brand Task Submission Fail',

}

export class GetGraphProductForMergeUnMerge implements Action {
  readonly type = GraphActionsEnum.GET_GRAPH_ITEM_FOR_CONFIRMATION;
  constructor(public payload: any) {}
}

export class GetGraphProductForMergeUnMergeSuccess implements Action {
  readonly type = GraphActionsEnum.GET_GRAPH_ITEM_FOR_CONFIRMATION_SUCCESS;
  constructor(public payload: any) {}
}
export class GetGraphProductForMergeUnMergeFail implements Action {
  readonly type = GraphActionsEnum.GET_GRAPH_ITEM_FOR_CONFIRMATION_FAIL;
  constructor(public payload: any) {}
}

export class GraphProductMergeUnMergeAction implements Action {
  readonly type = GraphActionsEnum.CONFIRM_GRAPH_ITEM_MERGE_UNMERGE;
  constructor(public payload: any) {}
}

export class GraphProductMergeUnMergeActionSuccess implements Action {
  readonly type = GraphActionsEnum.CONFIRM_GRAPH_ITEM_MERGE_UNMERGE_SUCCESS;
  constructor() {}
}

export class GraphProductMergeUnMergeActionFail implements Action {
  readonly type = GraphActionsEnum.CONFIRM_GRAPH_ITEM_MERGE_UNMERGE_FAIL;
  constructor(public payload: any) {}
}

export class GetGraphItemsForProduct implements Action {
  readonly type = GraphActionsEnum.GET_GRAPH_ITEMS_FOR_PRODUCT;
  constructor(public payload: any) {}
}

export class GetGraphItemsForProductSuccess implements Action {
  readonly type = GraphActionsEnum.GET_GRAPH_ITEMS_FOR_PRODUCT_SUCCESS;
  constructor(public payload: any) {}
}

export class GetGraphItemsForProductFail implements Action {
  readonly type = GraphActionsEnum.GET_GRAPH_ITEMS_FOR_PRODUCT_FAIL;
  constructor(public payload: any) {}
}

export class GetProductBrandForConfirmation implements Action {
  readonly type = GraphActionsEnum.GET_PRODUCT_BRAND_CONFIRMATION;
  constructor(public payload: any) {}
}

export class GetProductBrandForConfirmationSuccess implements Action {
  readonly type = GraphActionsEnum.GET_PRODUCT_BRAND_CONFIRMATION_SUCCESS;
  constructor(public payload: any) {}
}

export class GetProductBrandForConfirmationFail implements Action {
  readonly type = GraphActionsEnum.GET_PRODUCT_BRAND_CONFIRMATION_FAIL;
  constructor(public payload: any) {}
}

export class TaskSubmissionProductBrand implements Action {
  readonly type = GraphActionsEnum.TASK_SUBMISSION_PRODUCT_BRAND;
  constructor(public payload: any) {}
}

export class TaskSubmissionProductBrandSuccess implements Action {
  readonly type = GraphActionsEnum.TASK_SUBMISSION_PRODUCT_BRAND_SUCCESS;
  constructor(public payload: any) {}
}

export class TaskSubmissionProductBrandFail implements Action {
  readonly type = GraphActionsEnum.TASK_SUBMISSION_PRODUCT_BRAND_FAIL;
  constructor(public payload: any) {}
}


export type graphActions = 
GetGraphProductForMergeUnMerge
| GetGraphProductForMergeUnMergeSuccess 
| GetGraphProductForMergeUnMergeFail 
| GraphProductMergeUnMergeAction
| GraphProductMergeUnMergeActionSuccess
| GraphProductMergeUnMergeActionFail
| GetGraphItemsForProduct
| GetGraphItemsForProductSuccess
| GetGraphItemsForProductFail
| GetProductBrandForConfirmation
| GetProductBrandForConfirmationSuccess
| GetProductBrandForConfirmationFail
| TaskSubmissionProductBrand
| TaskSubmissionProductBrandSuccess
| TaskSubmissionProductBrandFail;
