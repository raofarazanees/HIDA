import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MessageService } from '../../../../shared/services/message/message.service';
import { SalesRestateService } from '../../services/sales-restate.service';
import { CommonActionsEnum, SubmitSalesRecordFail, SubmitSalesRecordSuccess } from '../actions';

import {} from '../actions';

declare let jsonata: any;
@Injectable()
export class CommonEffects {
  @Effect() onMasteredRecordUpdate$ = this.actions$.pipe(
    ofType(CommonActionsEnum.SUBMIT_SALES_RECORD),
    switchMap((action: any) =>
      this.salesRestateService.submitData(action.payload).pipe(
        map((response: any) => {
          this.messageService.showToast(response.message, 'Close');
          return new SubmitSalesRecordSuccess();
        }),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'An error occured while updating the record', 'warn');
          return of(new SubmitSalesRecordFail());
        })
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly messageService: MessageService,
    private salesRestateService: SalesRestateService
  ) {}
}
