import { Injectable } from '@angular/core';
import { environment } from '@app-environment';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { MessageService } from '../../../../shared/services/message/message.service';
import { ItemToProductService } from '../../services/item-to-product.service';
import { GetGraphProductForMergeUnMergeSuccess } from '../actions';
import {
  GetGraphProductForMergeUnMergeFail,
  GraphActionsEnum,
  GraphProductMergeUnMergeActionSuccess,
  GraphProductMergeUnMergeActionFail,
  GetGraphItemsForProductFail,
  GetGraphItemsForProductSuccess,
  GetProductBrandForConfirmationFail,
  GetProductBrandForConfirmationSuccess,
  TaskSubmissionProductBrandSuccess,
  TaskSubmissionProductBrandFail
} from './../actions/graph.actions';

declare let jsonata: any;
@Injectable()
export class GraphsEffects {
  @Effect() getItemGraphForConfirmation$ = this.actions$.pipe(
    ofType(GraphActionsEnum.GET_GRAPH_ITEM_FOR_CONFIRMATION),
    switchMap((action: any) =>
      this.itemToProductService.getGraphItemForMergeUnMerge(action.payload).pipe(
        map((response: any) => new GetGraphProductForMergeUnMergeSuccess(response)),
        catchError((error) => {
          this.messageService.showToast(
            jsonata('message').evaluate(error) || 'An error occurred while fetching the Graph Product for Merge / UnMerge',
            'warn'
          );
          return of(new GetGraphProductForMergeUnMergeFail(error));
        })
      )
    )
  );

  @Effect() ConfirmGraphProductAction$ = this.actions$.pipe(
    ofType(GraphActionsEnum.CONFIRM_GRAPH_ITEM_MERGE_UNMERGE),
    switchMap((action: any) =>
      this.itemToProductService.confirmGraphProduct(action.payload).pipe(
        map((response: any) => {
          this.messageService.showToast(
            jsonata('message').evaluate(response) || 'Graph Merge / UnMerge Request submitted successfully',
            'success'
          );
          const redirectionPath = `${environment.taskInboxApp}/embedui/taskmgmt/index.html#/taskinbox${
            sessionStorage.getItem('currentPath') ? sessionStorage.getItem('currentPath') : '/TaskList/New'
          }`;
          window.open(redirectionPath, '_self');
          return [new GraphProductMergeUnMergeActionSuccess()];
        }),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'An error occurred while update the product', 'warn');
          return of(new GraphProductMergeUnMergeActionFail(error));
        })
      )
    )
  );

  @Effect() GetGraphItemsForProduct$ = this.actions$.pipe(
    ofType(GraphActionsEnum.GET_GRAPH_ITEMS_FOR_PRODUCT),
    switchMap((action: any) =>
      this.itemToProductService.getGraphItemsForProduct(action.payload).pipe(
        map((response: any) => new GetGraphItemsForProductSuccess(response)),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'An error occurred while fetching the product items', 'warn');
          return of(new GetGraphItemsForProductFail(error));
        })
      )
    )
  );

  
  @Effect() GetProductBrandItemForConfirmation$ = this.actions$.pipe(
    ofType(GraphActionsEnum.GET_PRODUCT_BRAND_CONFIRMATION),
    switchMap((action: any) =>
      this.itemToProductService.getProductBrandForConfirmation(action.payload).pipe(
        map((response: any) => new GetProductBrandForConfirmationSuccess(response)),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'An error occurred while fetching the product brand items', 'warn');
          return of(new GetProductBrandForConfirmationFail(error));
        })
      )
    )
  );

  @Effect() ProductBrandTaskSubmission$ = this.actions$.pipe(
    ofType(GraphActionsEnum.TASK_SUBMISSION_PRODUCT_BRAND),
    switchMap((action: any) =>
      this.itemToProductService.productBrandTaskSubmission(action.payload).pipe(
        map((response: any) => {
          this.messageService.showToast(
            jsonata('message').evaluate(response) || 'Product Brand Task Submission successfully',
            'success'
          );
          const redirectionPath = `${environment.taskInboxApp}/embedui/taskmgmt/index.html#/taskinbox${
            sessionStorage.getItem('currentPath') ? sessionStorage.getItem('currentPath') : '/TaskList/New'
          }`;
          window.open(redirectionPath, '_self');
          return [new TaskSubmissionProductBrandSuccess(response)];
        }),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'An error occurred while updating the Task', 'warn');
          return of(new TaskSubmissionProductBrandFail(error));
        })
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly messageService: MessageService,
    private itemToProductService: ItemToProductService
  ) {}
}
