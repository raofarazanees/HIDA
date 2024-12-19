import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { MessageService } from 'src/app/shared/services';
import { DashboardService } from '../../services/dashboard.service';
import { CommonI2PActionsEnum, I2POutboundSnowFlakeRefreshFail, I2POutboundSnowFlakeRefreshSuccess, ItemToProductIncrementalProcessFail, ItemToProductIncrementalProcessSuccess } from '../actions/index';

import * as jsonata from 'jsonata/jsonata-es5.js';

@Injectable()
export class I2PEffect {

    ItemToProductIncrementProcess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommonI2PActionsEnum.ITEM_TO_PRODUCT_TRIGGER_INCREMENTAL_PROCESS),
      mergeMap((action: any) =>
        this.dashboardService.I2PTriggerIncrementalProcess(action.payload).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(response.message, 'Close');
            return [ItemToProductIncrementalProcessSuccess(response)];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error.error) || 'Unable to Trigger I2P incremental Process', 'warn');
            return of(ItemToProductIncrementalProcessFail(error));
          })
        )
      )
    )
  );

  triggerI2POutboundProcess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommonI2PActionsEnum.ITEM_TO_PRODUCT_TRIGGER_OUTBOUND_REFRESH),
      mergeMap((action: any) =>
        this.dashboardService.I2PTriggerOutboundRefreshProcess(action.payload).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(response.message, 'Close');
            return [I2POutboundSnowFlakeRefreshSuccess(response)];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error.error) || 'Unable to Trigger I2P Outbound Refresh Process', 'warn');
            return of(I2POutboundSnowFlakeRefreshFail(error));
          })
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly dashboardService: DashboardService,
    private readonly messageService: MessageService
  ) {}
}
