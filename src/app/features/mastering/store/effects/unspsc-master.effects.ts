import { DashboardService } from 'src/app/features/admin-dashboard/services/dashboard.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MessageService } from "src/app/shared/services";
import { ToolsFilterService } from './../../services/tools-filter.service';
import * as jsonata from 'jsonata/jsonata-es5.js';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';
import { CloseDialogAt, CreateMarketMasterFail, CreateMarketMasterSuccess, GetAllActiveMarketRecordsFail, GetAllActiveMarketRecordsSuccess, GetMarketMasterRecordsFail, GetMarketMasterRecordsSuccess, GetMarketRecordChangeLogFail, GetMarketRecordChangeLogSuccess, GetUnspscChangeLogFail, GetUnspscChangeLogSuccess, GetUnspscMasterRecordsFail, GetUnspscMasterRecordsSuccess, UpdateMarketMasterRecordFail, UpdateMarketMasterRecordSuccess, UpdateUnspscRecordFail, UpdateUnspscRecordSuccess, autoAssignMarketToRecord, exportCSVFileMastersFail, exportCSVFileMastersSuccess, getActiveBusinessUsersFail, getActiveBusinessUsersSuccess, unspscMasterEnum } from "../actions";
import { of } from "rxjs";
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UnspscMasterEffects {

    GetUnspscMasterRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(unspscMasterEnum.GET_UNSPSC_MASTER_RECORDS),
      mergeMap((action: any) =>
        this.ToolsFilterService.retrieveUnspscMasterSearchRecords(action.payload).pipe(
          switchMap((response: any) => {
            return [GetUnspscMasterRecordsSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch UNSPSC Records', 'warn');
            return of(GetUnspscMasterRecordsFail(error));
          })
        )
      )
    )
  );

  UpdateUnspscMasterRecords$ = createEffect(() =>
  this.actions$.pipe(
    ofType(unspscMasterEnum.UPDATE_UNSPSC_MASTER_RECORDS),
    mergeMap((action: any) =>
      this.ToolsFilterService.updateUnspscRecords(action.payload).pipe(
        switchMap((response: any) => {

          this.messageService.showToast(`Records have been updated successfully. Count: ${response.length}`, 'success');
          return [UpdateUnspscRecordSuccess({ payload: response })];
        }),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Update UNSPSC records', 'warn');
          return of(UpdateUnspscRecordFail(error));
        })
      )
    )
  )
);

GetAllActiveMarket$ = createEffect(() =>
this.actions$.pipe(
  ofType(unspscMasterEnum.GET_ACTIVE_MARKET_RECORDS),
  mergeMap((action: any) =>
    this.ToolsFilterService.getActiveMarketRecords().pipe(
      switchMap((response: any) => {
        return [GetAllActiveMarketRecordsSuccess({ payload: response })];
      }),
      catchError((error) => {
        this.messageService.showToast(jsonata('message').evaluate(error.error) || 'Unable to Fetch Active Market', 'warn');
        return of(GetAllActiveMarketRecordsFail(error));
      })
    )
  )
)
);

getUnspscRecordChangeLog$ = createEffect(() =>
this.actions$.pipe(
  ofType(unspscMasterEnum.GET_UNSPSC_MASTER_CHANGE_LOG),
  mergeMap((action: any) =>
    this.ToolsFilterService.getUnspscRecordChangeLog(action.payload).pipe(
      switchMap((response: any) => {
        return [GetUnspscChangeLogSuccess({ payload: response })];
      }),
      catchError((error) => {
        this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Change log records', 'warn');
        return of(GetUnspscChangeLogFail(error));
      })
    )
  )
)
);

CreateMarketMaster$ = createEffect(() =>
this.actions$.pipe(
  ofType(unspscMasterEnum.CREATE_MARKET_MASTER_RECORD),
  mergeMap((action: any) =>
    this.ToolsFilterService.createNewMarketMasterRecord(action.payload.marketData).pipe(
      switchMap((response: any) => {
        this.messageService.showToast(`A New Market Master record has been created with ID: ${response.marketID}`, 'success');
        const data = { ...response, isNewAdded: true };
        return [
          CreateMarketMasterSuccess({ payload: data }),
          CloseDialogAt({ date: Math.floor(new Date().getTime()), dialogType: 'market' }),
          ...(action.payload?.autoAppendFor?.id && [autoAssignMarketToRecord({payload:{autoAppendFor:action.payload?.autoAppendFor,data:data}})])

        ];
      }),
      catchError((error) => {
        this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Create Market Master Records', 'warn');
        return of(CreateMarketMasterFail(error));
      })
    )
  )
)
);

GetMarketMasterRecords$ = createEffect(() =>
this.actions$.pipe(
  ofType(unspscMasterEnum.GET_MARKET_MASTER_RECORDS),
  mergeMap((action: any) =>
    this.ToolsFilterService.retrieveMarketMasterSearchRecords(action.payload).pipe(
      switchMap((response: any) => {
        return [GetMarketMasterRecordsSuccess({ payload: response })];
      }),
      catchError((error) => {
        this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Market Records', 'warn');
        return of(GetMarketMasterRecordsFail(error));
      })
    )
  )
)
);

UpdateMarketMasterRecords$ = createEffect(() =>
this.actions$.pipe(
  ofType(unspscMasterEnum.UPDATE_MARKET_MASTER_RECORDS),
  mergeMap((action: any) =>
    this.ToolsFilterService.updateMarketMasterRecords(action.payload).pipe(
      switchMap((response: any) => {

        this.messageService.showToast(`Records have been updated successfully. Count: ${response.length}`, 'success');
        return [UpdateMarketMasterRecordSuccess({ payload: response })];
      }),
      catchError((error) => {
        this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Update Market records', 'warn');
        return of(UpdateMarketMasterRecordFail(error));
      })
    )
  )
)
);

getMarketMasterRecordChangeLog$ = createEffect(() =>
this.actions$.pipe(
  ofType(unspscMasterEnum.GET_MARKET_MASTER_CHANGE_LOG),
  mergeMap((action: any) =>
    this.ToolsFilterService.getMarketRecordChangeLog(action.payload).pipe(
      switchMap((response: any) => {
        return [GetMarketRecordChangeLogSuccess({ payload: response })];
      }),
      catchError((error) => {
        this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Change log records', 'warn');
        return of(GetMarketRecordChangeLogFail(error));
      })
    )
  )
)
);

DownloadMastersFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(unspscMasterEnum.EXPORT_MASTERS_RECORDS_CSV),
      mergeMap((action: any) =>
        this.ToolsFilterService.DownloadMastersFile(action.filterParams,action.url).pipe(
          switchMap((response: any) => {
            this.dashboardService.downloadFileCommonFunction(response);
            this.messageService.showToast(`CSV File has been downloaded successfully`, 'success');
            return [exportCSVFileMastersSuccess()];
          }),
          catchError((error: HttpErrorResponse) => {
            this.dashboardService.parseBlobAndDisplayMessage(error);
            return of(exportCSVFileMastersFail());
          })
        )
      )
    )
  );

  getActiveBusinessUsers$ = createEffect(() =>
  this.actions$.pipe(
  ofType(unspscMasterEnum.GET_ACTIVE_BUSINESS_USERS),
  mergeMap((action: any) =>
    this.ToolsFilterService.getActiveBusinessUsers().pipe(
      switchMap((response: any) => {
        return [getActiveBusinessUsersSuccess({ payload: response })];
      }),
      catchError((error) => {
        this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Active Business Users', 'warn');
        return of(getActiveBusinessUsersFail(error));
      })
    )
  )
)
);
    constructor(
        private readonly actions$: Actions,
        private readonly messageService: MessageService,
        private ToolsFilterService: ToolsFilterService,
        private readonly dashboardService: DashboardService

      ) {}
    }
    