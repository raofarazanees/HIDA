import { DashboardService } from 'src/app/features/admin-dashboard/services/dashboard.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MessageService } from "src/app/shared/services";
import { ToolsFilterService } from '../../services/tools-filter.service';
import * as jsonata from 'jsonata/jsonata-es5.js';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';
import { CloseDialogAt, CreateMarketMasterFail, CreateMarketMasterSuccess, GetAllActiveMarketRecordsFail, GetAllActiveMarketRecordsSuccess, GetMarketMasterRecordsFail, GetMarketMasterRecordsSuccess, GetMarketRecordChangeLogFail, GetMarketRecordChangeLogSuccess, GetUnspscChangeLogFail, GetUnspscChangeLogSuccess, GetUnspscMasterRecordsFail, GetUnspscMasterRecordsSuccess, UpdateMarketMasterRecordFail, UpdateMarketMasterRecordSuccess, UpdateUnspscRecordFail, UpdateUnspscRecordSuccess, autoAssignMarketToRecord, exportCSVFileMastersFail, exportCSVFileMastersSuccess, getActiveBusinessUsersFail, getActiveBusinessUsersSuccess, unspscMasterEnum } from "../actions";
import { of } from "rxjs";
import { HttpErrorResponse } from '@angular/common/http';
import { GetZipChangeLogFail, GetZipChangeLogSuccess, GetZipMasterRecordsFail, GetZipMasterRecordsSuccess, UpdateZipRecordFail, UpdateZipRecordSuccess, zipMasterEnum } from '../actions/zip-master.actions';

@Injectable()
export class ZipMasterEffects {

    GetZipMasterRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(zipMasterEnum.GET_ZIP_MASTER_RECORDS),
      mergeMap((action: any) =>
        this.ToolsFilterService.retrieveZipMasterSearchRecords(action.payload).pipe(
          switchMap((response: any) => {
            return [GetZipMasterRecordsSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Zip Records', 'warn');
            return of(GetZipMasterRecordsFail(error));
          })
        )
      )
    )
  );

  UpdateZipMasterRecords$ = createEffect(() =>
  this.actions$.pipe(
    ofType(zipMasterEnum.UPDATE_ZIP_MASTER_RECORDS),
    mergeMap((action: any) =>
      this.ToolsFilterService.updateZipRecords(action.payload).pipe(
        switchMap((response: any) => {

          this.messageService.showToast(`Records have been updated successfully. Count: ${response.length}`, 'success');
          return [UpdateZipRecordSuccess({ payload: response })];
        }),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Update Zip Master records', 'warn');
          return of(UpdateZipRecordFail(error));
        })
      )
    )
  )
);

getZipRecordChangeLog$ = createEffect(() =>
this.actions$.pipe(
  ofType(zipMasterEnum.GET_ZIP_MASTER_CHANGE_LOG),
  mergeMap((action: any) =>
    this.ToolsFilterService.getZipRecordChangeLog(action.payload).pipe(
      switchMap((response: any) => {
        return [GetZipChangeLogSuccess({ payload: response })];
      }),
      catchError((error) => {
        this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Change log records', 'warn');
        return of(GetZipChangeLogFail(error));
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
