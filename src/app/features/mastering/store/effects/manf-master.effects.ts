import { ProductSearchCriteria } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { DashboardService } from 'src/app/features/admin-dashboard/services/dashboard.service';
import { ToolsFilterService } from './../../services/tools-filter.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { MessageService } from 'src/app/shared/services';
import {
  CloseDialogAt,
  CreateChildManfRecord,
  CreateChildManfRecordFail,
  CreateChildManfRecordSuccess,
  CreateParentManfRecordFail,
  CreateParentManfRecordSuccess,
  GetAllActiveChildManfFail,
  GetAllActiveChildManfSuccess,
  GetAllActiveManfRecordsFail,
  GetAllActiveManfRecordsSuccess,
  GetAllManfRecordsFail,
  GetAllManfRecordsSuccess,
  GetChildParentManfRecordsFail,
  GetChildParentManfRecordsSuccess,
  GetParentManfRecordsFail,
  GetParentManfRecordsSuccess,
  ManageMappingAllRecordsFail,
  ManageMappingAllRecordsSuccess,
  UpdateChildParentRecordsFail,
  UpdateChildParentRecordsSuccess,
  UpdateParentManfRecordsFail,
  UpdateParentManfRecordsSuccess,
  autoAssignManfToRecord,
  createManufacturerMappingFail,
  createManufacturerMappingSuccess,
  downloadParentChildRecordsCsvFail,
  downloadParentChildRecordsCsvSuccess,
  getChildChangeLogFail,
  getChildChangeLogSuccess,
  getManfForMapping,
  getManfForMappingFail,
  getManfForMappingSuccess,
  getMasteredChangeLogFail,
  getMasteredChangeLogSuccess,
  getMasteredManfRecordsFail,
  getMasteredManfRecordsSuccess,
  getParentChildManfRecordsFail,
  getParentChildManfRecordsSuccess,
  getParentManfChangeLogFail,
  getParentManfChangeLogSuccess,
  manfMasterEnum,
  updateMasteredMappedRecordsFail,
  updateMasteredMappedRecordsSuccess
} from '../actions';
import * as jsonata from 'jsonata/jsonata-es5.js';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MasteredDataResponse } from '../../model/manf-master-models/interface/manf-master.interface';
import { masteredMappedModel } from '../../model/manf-master-models/interface/mastered-mapped.interface';

@Injectable()
export class ToolsFilterEffects {
  GetParentManfRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manfMasterEnum.GET_PARENT_MANF_RECORDS),
      mergeMap((action: any) =>
        this.ToolsFilterService.retrieveParentManfSearchRecords(action.payload).pipe(
          switchMap((response: any) => {
            return [GetParentManfRecordsSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Parent Manf Records', 'warn');
            return of(GetParentManfRecordsFail(error));
          })
        )
      )
    )
  );

  CreateParentMasterRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manfMasterEnum.CREATE_PARENT_MANF_RECORD),
      mergeMap((action: any) =>
        this.ToolsFilterService.createNewParentManfRecord(action.payload.parentManfData).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(`A New Parent Manufacturer record has been created with ID: ${response.parentManfID}`, 'success');
            const data = { ...response, isNewAdded: true };
            return [
              CreateParentManfRecordSuccess({ payload: data }),
              CloseDialogAt({ date: Math.floor(new Date().getTime()), dialogType: 'parent' }),
              ...(action.payload?.autoAppendFor?.id && [autoAssignManfToRecord({payload:{autoAppendFor:action.payload?.autoAppendFor,data:data}})])
            ];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Create Parent Manf Master Records', 'warn');
            return of(CreateParentManfRecordFail(error));
          })
        )
      )
    )
  );

  UpdateParentManfRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manfMasterEnum.UPDATE_PARENT_MANF_RECORDS),
      mergeMap((action: any) =>
        this.ToolsFilterService.UpdateParentManfRecords(action.payload).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(`Parent Manufacturer Records have been updated successfully`, 'success');
            return [UpdateParentManfRecordsSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to update records', 'warn');
            return of(UpdateParentManfRecordsFail(error));
          })
        )
      )
    )
  );

  GetActiveParentManfRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manfMasterEnum.GET_ACTIVE_PARENT_MANF),
      mergeMap((action: any) =>
        this.ToolsFilterService.GetActiveParentManfRecords(action.payload).pipe(
          switchMap((response: any) => {
            return [GetAllActiveManfRecordsSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Get Active Parent Manf records', 'warn');
            return of(GetAllActiveManfRecordsFail(error));
          })
        )
      )
    )
  );

  GetChildParentManfRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manfMasterEnum.GET_CHILD_PARENT_MANF_RECORDS),
      mergeMap((action: any) =>
        this.ToolsFilterService.retrieveChildParentManfSearchRecords(action.payload).pipe(
          switchMap((response: any) => {
            return [GetChildParentManfRecordsSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Child Manf Records', 'warn');
            return of(GetChildParentManfRecordsFail(error));
          })
        )
      )
    )
  );

  CreateChildManfRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manfMasterEnum.CREATE_CHILD_MANF_RECORD),
      mergeMap((action: {payload:{childManfData:any,autoAppendFor:{id:string,appendFor:string}}}) =>
        this.ToolsFilterService.createNewChildManfRecord(action.payload.childManfData).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(`A New Child Manufacturer record has been created with ID: ${response.childManfID}`, 'success');
            const data = { ...response, isNewAdded: true };
            
            return [
              CreateChildManfRecordSuccess({ payload: data }),
              CloseDialogAt({ date: Math.floor(new Date().getTime()), dialogType: 'child' }),
              ...(action.payload?.autoAppendFor?.id && [autoAssignManfToRecord({payload:{autoAppendFor:action.payload?.autoAppendFor,data:data}})])
            ];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Create Child Manf Master Records', 'warn');
            return of(CreateChildManfRecordFail(error));
          })
        )
      )
    )
  );

  getParentManfRecordChangeLog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manfMasterEnum.GET_PARENT_MANF_CHANGE_LOG),
      mergeMap((action: any) =>
        this.ToolsFilterService.getParentManfRecordChangeLog(action.payload).pipe(
          switchMap((response: any) => {
            return [getParentManfChangeLogSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Change log records', 'warn');
            return of(getParentManfChangeLogFail(error));
          })
        )
      )
    )
  );

  getChildManfRecordChangeLog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manfMasterEnum.GET_CHILD_MANF_CHANGE_LOG),
      mergeMap((action: any) =>
        this.ToolsFilterService.getChildManfRecordChangeLog(action.payload).pipe(
          switchMap((response: any) => {
            return [getChildChangeLogSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Change log records', 'warn');
            return of(getChildChangeLogFail(error));
          })
        )
      )
    )
  );

  UpdateChildParentManfRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manfMasterEnum.UPDATE_CHILD_PARENT_MANF_RECORDS),
      mergeMap((action: any) =>
        this.ToolsFilterService.UpdateChildParentManfRecords(action.payload).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(`Parent-Child Manufacturer Records have been updated successfully`, 'success');
            return [UpdateChildParentRecordsSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to update records', 'warn');
            return of(UpdateChildParentRecordsFail(error));
          })
        )
      )
    )
  );

  GetActiveChildManfRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manfMasterEnum.GET_ACTIVE_CHILD_PARENT_MANF),
      mergeMap((action: any) =>
        this.ToolsFilterService.GetActiveChildParentManfRecords().pipe(
          switchMap((response: any) => {
            return [GetAllActiveChildManfSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Get Active Child Manf records', 'warn');
            return of(GetAllActiveChildManfFail(error));
          })
        )
      )
    )
  );

  GetManfRecordForMapping$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manfMasterEnum.GET_MANF_FOR_MAPPING),
      mergeMap((action: any) =>
        this.ToolsFilterService.GetManfRecordsForMapping(action.payload).pipe(
          switchMap((response: any) => {
            return [getManfForMappingSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Manf records for Mapping', 'warn');
            return of(getManfForMappingFail(error));
          })
        )
      )
    )
  );

  CreateManufacturerMapping$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manfMasterEnum.CREATE_MANUFACTURER_MAPPING),
      mergeMap((action: any) =>
        this.ToolsFilterService.CreateManufacturerMapping(action.payload.dataToPost).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(jsonata('message').evaluate(response), 'success');

            return [
              createManufacturerMappingSuccess({ payload: response }),
              getManfForMapping({ payload: action.payload.searchCriteriaData })
            ];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to create Manufacturer mapping', 'warn');
            return of(createManufacturerMappingFail(error));
          })
        )
      )
    )
  );

  getMasteredManfRecordChangeLog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manfMasterEnum.GET_MASTERED_MANF_CHANGE_LOG),
      mergeMap((action: any) =>
        this.ToolsFilterService.getMasteredManfRecordChangeLog(action.payload).pipe(
          switchMap((response: any) => {
            return [getMasteredChangeLogSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Change log records', 'warn');
            return of(getMasteredChangeLogFail(error));
          })
        )
      )
    )
  );

  getMasteredMappedRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manfMasterEnum.GET_MAPPED_MANF_RECORDS),
      mergeMap((action: any) =>
        this.ToolsFilterService.getMappedMasteredRecords(action.payload).pipe(
          switchMap((response: any) => {
            return [getMasteredManfRecordsSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Mastered Records', 'warn');
            return of(getMasteredManfRecordsFail(error));
          })
        )
      )
    )
  );

  UpdateMappedManfRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manfMasterEnum.UPDATE_MASTERED_MAPPED_RECORDS),
      mergeMap((action: any) =>
        this.ToolsFilterService.UpdateMasteredManfRecords(action.payload).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(`Records have been updated successfully. Count: ${response.length}`, 'success');
            return [updateMasteredMappedRecordsSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to update records', 'warn');
            return of(updateMasteredMappedRecordsFail(error));
          })
        )
      )
    )
  );

  getParentChildTopManfRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manfMasterEnum.GET_PARENT_CHILD_TOP_RECORD),
      mergeMap(() =>
        this.ToolsFilterService.getTopParentRecord().pipe(
          switchMap((response: any) => {
            return [getParentChildManfRecordsSuccess({ payload: response })];
          }),
          catchError((error) => {
            return of(getParentChildManfRecordsFail(error));
          })
        )
      )
    )
  );

  DownloadProductBrandFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manfMasterEnum.EXPORT_PARENT_CHILD_RECORDS_CSV),
      mergeMap((action: any) =>
        this.ToolsFilterService.DownloadParentChildFile(action.payload).pipe(
          switchMap((response: any) => {
            this.dashboardService.downloadFileCommonFunction(response);
            this.messageService.showToast(`Parent-Child File has been downloaded successfully`, 'success');
            return [downloadParentChildRecordsCsvSuccess()];
          }),
          catchError((error: HttpErrorResponse) => {
            this.dashboardService.parseBlobAndDisplayMessage(error);
            return of(downloadParentChildRecordsCsvFail());
          })
        )
      )
    )
  );

  GetAllManfRecords$ = createEffect(() =>
  this.actions$.pipe(
    ofType(manfMasterEnum.GET_ALL_MANF_RECORDS_SEARCH),
    mergeMap((action: {payload:ProductSearchCriteria}) =>
      this.ToolsFilterService.GetAllManfRecords(action.payload).pipe(
        switchMap((response: MasteredDataResponse) => {
          return [GetAllManfRecordsSuccess({ payload: response })];
        }),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Records', 'warn');
          return of(GetAllManfRecordsFail(error));
        })
      )
    )
  )
);


ManageManfMapping$ = createEffect(() =>
this.actions$.pipe(
  ofType(manfMasterEnum.MANAGE_MANF_MAPPING_ALL_RECORDS),
  mergeMap((action: {payload:any}) =>
    this.ToolsFilterService.ManageManfRecords(action.payload).pipe(
      switchMap((response: masteredMappedModel[]) => {
        this.messageService.showToast(`Operation has been performed successfully`, 'success');
        return [ManageMappingAllRecordsSuccess({ payload: response })];
      }),
      catchError((error) => {
        this.messageService.showToast(jsonata('message').evaluate(error) || 'There was a problem. Please try again.', 'warn');
        return of(ManageMappingAllRecordsFail(error));
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
