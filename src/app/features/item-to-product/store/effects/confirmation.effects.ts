import { Injectable } from '@angular/core';
import { environment } from '@app-environment';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { MessageService } from '../../../../shared/services/message/message.service';
import { ItemToProductService } from '../../services/item-to-product.service';
import {
  ConfirmationActionsEnum,
  GetItemPairsForConfirmationFail,
  GetItemPairsForConfirmationSuccess,
  ConfirmItemPairsFail,
  ConfirmItemPairsSuccess,
  GetItemPairsForConfirmation
} from '../actions';

declare let jsonata: any;
@Injectable()
export class ConfirmationEffects {
  @Effect() getItemPairsForConfirmation$ = this.actions$.pipe(
    ofType(ConfirmationActionsEnum.GET_ITEM_PAIRS_FOR_CONFIRMATION),
    switchMap((action: any) =>
      this.itemToProductService.getItemPairsForConfirmation(action.payload).pipe(
        map((response: any) => new GetItemPairsForConfirmationSuccess(response)),
        catchError((error) => {
          this.messageService.showToast(
            jsonata('message').evaluate(error) || 'An error occurred while fetching the Item Pairs for Confirmation',
            'warn'
          );
          return of(new GetItemPairsForConfirmationFail([]));
        })
      )
    )
  );

  @Effect() confirmItemPairs$ = this.actions$.pipe(
    ofType(ConfirmationActionsEnum.CONFIRM_ITEM_PAIRS),
    switchMap((action: any) =>
      this.itemToProductService.confirmItemPairs(action.payload).pipe(
        switchMap((response: any) => {
          this.messageService.showToast('Item pairs confirmed successfully...', 'success');
          const redirectionPath = `${environment.taskInboxApp}/embedui/taskmgmt/index.html#/taskinbox${
            sessionStorage.getItem('currentPath') ? sessionStorage.getItem('currentPath') : '/TaskList/New'
          }`;
          window.open(redirectionPath,'_self');
          return [new ConfirmItemPairsSuccess(response), new GetItemPairsForConfirmation({ docPGUID: action.payload.taskID })];
        }),
        catchError((error) => {
          this.messageService.showToast(
            jsonata('message').evaluate(error) || 'An error occurred while saving the Item Pairs for Confirmation',
            'warn'
          );
          return of(new ConfirmItemPairsFail([]));
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
