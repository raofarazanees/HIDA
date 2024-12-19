import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'src/app/shared/services';
import { ToolsFilterService } from './../../services/tools-filter.service';
import {
  CreateFacilityMasterRecordsFail,
  CreateFacilityMasterRecordsSuccess,
  GetFacilityMasterRecordsFail,
  GetFacilityMasterRecordsSuccess,
  facilityMasterEnum,
  CloseDialogAt,
  UpdateFacilityMasterRecordsSuccess,
  UpdateFacilityMasterRecordsFail,
  GetActiveFacilityMasterRecordsSuccess,
  GetActiveFacilityMasterRecordsFail,
  GetFacilityRecordsForMappingSuccess,
  GetFacilityRecordsForMappingFail,
  GetFacilityRecordChangeLogFail,
  GetFacilityRecordChangeLogSuccess,
  createFacilityMappingSuccess,
  createFacilityMappingFail,
  GetFacilityRecordsForMapping,
  GetFacilityMappedRecordsSuccess,
  GetFacilityMappedRecordsFail,
  GetFacilityMappedRecordChangeLogSuccess,
  GetFacilityMappedRecordChangeLogFail,
  UpdateFacilityMappedRecordsSuccess,
  UpdateFacilityMappedRecordsFail,
  autoAssignFacilityToRecord,
  GetAllFacRecordsSuccess,
  GetAllFacRecordsFail,
  ManageMappingFacAllRecordsSuccess,
  ManageMappingFacAllRecordsFail
} from '../actions';
import * as jsonata from 'jsonata/jsonata-es5.js';
import { of } from 'rxjs';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';
import { facilityMasterUpdateRecords } from '../../components/facility-master/facility-master-components/facility-master.component';
import { FacilityForMappingResponseData, FacilityMappedRecord, FacilityMappedRecordsRes } from '../../model/manf-master-models/interface/facility-master-state.interface';

@Injectable()
export class FacilityMasterEffects {
  GetFacilityMasterRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(facilityMasterEnum.GET_FACILITY_MASTER_RECORDS),
      mergeMap((action: any) =>
        this.ToolsFilterService.retrieveFacilityMasterSearchRecords(action.payload).pipe(
          switchMap((response: any) => {
            return [GetFacilityMasterRecordsSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Facility Master Records', 'warn');
            return of(GetFacilityMasterRecordsFail(error));
          })
        )
      )
    )
  );

  CreateFacilityMasterRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(facilityMasterEnum.CREATE_FACILITY_MASTER_RECORDS),
      mergeMap((action: any) =>
        this.ToolsFilterService.createFacilityMasterRecords(action.payload.facilityData).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(`A New Facility Master record has been created with ID: ${response.facilityID}`, 'success');
            const data = { ...response, isNewAdded: true };
            return [
              CreateFacilityMasterRecordsSuccess({ payload: data }),
              CloseDialogAt({ date: Math.floor(new Date().getTime()), dialogType: 'facilityMaster' }),
              ...(action.payload?.autoAppendFor?.id && [autoAssignFacilityToRecord({payload:{autoAppendFor:action.payload?.autoAppendFor,data:data}})])
            ];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Create Facility Master Records', 'warn');
            return of(CreateFacilityMasterRecordsFail(error));
          })
        )
      )
    )
  );

  UpdateFacilityMasterRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(facilityMasterEnum.UPDATE_FACILITY_MASTER_RECORDS),
      mergeMap((action: any) =>
        this.ToolsFilterService.updateFacilityMasterRecords(action.payload).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(`Records have been updated successfully. Count: ${response.length}`, 'success');
            return [UpdateFacilityMasterRecordsSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Update Facility records', 'warn');
            return of(UpdateFacilityMasterRecordsFail(error));
          })
        )
      )
    )
  );

  getActiveFacilityMasterRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(facilityMasterEnum.GET_ACTIVE_FACILITY_MASTERS),
      mergeMap(() =>
        this.ToolsFilterService.getActiveFacilityMasterRecords().pipe(
          switchMap((response: facilityMasterUpdateRecords[]) => {
            return [GetActiveFacilityMasterRecordsSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Active Facility Master records', 'warn');
            return of(GetActiveFacilityMasterRecordsFail(error));
          })
        )
      )
    )
  );

  GetFacilityMasterRecordsForMapping$ = createEffect(() =>
    this.actions$.pipe(
      ofType(facilityMasterEnum.GET_FACILITY_MASTER_FOR_MAPPING),
      mergeMap((action: any) =>
        this.ToolsFilterService.retrieveFacilityForMappingRecords(action.payload).pipe(
          switchMap((response: FacilityForMappingResponseData) => {
            return [GetFacilityRecordsForMappingSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Records For Mapping', 'warn');
            return of(GetFacilityRecordsForMappingFail(error));
          })
        )
      )
    )
  );

  getFacilityMasterRecordChangeLog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(facilityMasterEnum.GET_FACILITY_MASTER_CHANGE_LOG),
      mergeMap((action: any) =>
        this.ToolsFilterService.getMasterFacilityChangeLog(action.payload).pipe(
          switchMap((response: any) => {
            return [GetFacilityRecordChangeLogSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Change log records', 'warn');
            return of(GetFacilityRecordChangeLogFail(error));
          })
        )
      )
    )
  );

  createFacilityMapping$ = createEffect(() =>
    this.actions$.pipe(
      ofType(facilityMasterEnum.CREATE_FACILITY_MAPPING),
      mergeMap((action: any) =>
        this.ToolsFilterService.createFacilityMapping(action.payload.dataToCreate).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(jsonata('message').evaluate(response) || 'Mappings have been created successfully.', 'success');

            return [
              createFacilityMappingSuccess({ payload: response }),
              GetFacilityRecordsForMapping({ payload: action.payload.searchPayload })
            ];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to create mapping records', 'warn');
            return of(createFacilityMappingFail(error));
          })
        )
      )
    )
  );

  GetFacilityMappedRecordsSearch$ = createEffect(() =>
  this.actions$.pipe(
    ofType(facilityMasterEnum.GET_FACILITY_MASTERED_RECORD),
    mergeMap((action: any) =>
      this.ToolsFilterService.retrieveFacilityMappedSearchRecords(action.payload).pipe(
        switchMap((response: FacilityMappedRecordsRes) => {
          return [GetFacilityMappedRecordsSuccess({ payload: response })];
        }),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Facility Mapped Records', 'warn');
          return of(GetFacilityMappedRecordsFail(error));
        })
      )
    )
  )
);

getFacilityMappedRecordChangeLog$ = createEffect(() =>
this.actions$.pipe(
  ofType(facilityMasterEnum.GET_FACILITY_MAPPED_CHANGE_LOG),
  mergeMap((action: any) =>
    this.ToolsFilterService.getMappedFacilityChangeLog(action.payload).pipe(
      switchMap((response: any) => {
        return [GetFacilityMappedRecordChangeLogSuccess({ payload: response })];
      }),
      catchError((error) => {
        this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Change log records', 'warn');
        return of(GetFacilityMappedRecordChangeLogFail(error));
      })
    )
  )
)
);

UpdateFacilityMappedRecords$ = createEffect(() =>
this.actions$.pipe(
  ofType(facilityMasterEnum.UPDATE_FACILITY_MAPPED_RECORDS),
  mergeMap((action: any) =>
    this.ToolsFilterService.updateFacilityMappedRecords(action.payload).pipe(
      switchMap((response: any) => {
        this.messageService.showToast(`Records have been updated successfully. Count: ${response.length}`, 'success');
        return [UpdateFacilityMappedRecordsSuccess({ payload: response })];
      }),
      catchError((error) => {
        this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Update Facility records', 'warn');
        return of(UpdateFacilityMappedRecordsFail(error));
      })
    )
  )
)
);

GetFacilityAllRecordsSearch$ = createEffect(() =>
this.actions$.pipe(
  ofType(facilityMasterEnum.GET_ALL_FACILITY_RECORDS_SEARCH),
  mergeMap((action: any) =>
    this.ToolsFilterService.retrieveAllFacilities(action.payload).pipe(
      switchMap((response: FacilityMappedRecordsRes) => {
        return [GetAllFacRecordsSuccess({ payload: response })];
      }),
      catchError((error) => {
        this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Facility Records', 'warn');
        return of(GetAllFacRecordsFail(error));
      })
    )
  )
)
);

ManageFacRecords$ = createEffect(() =>
this.actions$.pipe(
  ofType(facilityMasterEnum.MANAGE_FAC_MAPPING_ALL_RECORDS),
  mergeMap((action: any) =>
    this.ToolsFilterService.manageFacMappings(action.payload).pipe(
      switchMap((response: FacilityMappedRecord[]) => {
        this.messageService.showToast(`Operation has been performed successfully`, 'success');
        return [ManageMappingFacAllRecordsSuccess({ payload: response })];
      }),
      catchError((error) => {
        this.messageService.showToast(jsonata('message').evaluate(error) || 'There was a problem. Please try again.', 'warn');
        return of(ManageMappingFacAllRecordsFail(error));
      })
    )
  )
)
);

  constructor(
    private readonly actions$: Actions,
    private readonly messageService: MessageService,
    private ToolsFilterService: ToolsFilterService
  ) {}
}
