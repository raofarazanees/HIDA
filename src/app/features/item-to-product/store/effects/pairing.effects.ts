import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { MessageService } from '../../../../shared/services/message/message.service';
import { ItemToProductService } from '../../services/item-to-product.service';
import { PairingActionsEnum, GetPairsForResolutionFail, GetPairsForResolutionSuccess } from '../actions';

declare let jsonata: any;
@Injectable()
export class PairingEffects {
  @Effect() getPairsForResolution$ = this.actions$.pipe(
    ofType(PairingActionsEnum.GET_PAIRS_FOR_RESOLUTION),
    switchMap((action: any) =>
      this.itemToProductService.getPairsForResolution(action.payload).pipe(
        map((response: any) => new GetPairsForResolutionSuccess(response)),
        catchError((error) => {
          this.messageService.showToast(
            jsonata('message').evaluate(error) || 'An error occurred while fetching the Pairs for Resolution',
            'warn'
          );
          return of(new GetPairsForResolutionFail([]));
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
