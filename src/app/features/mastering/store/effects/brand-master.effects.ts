import { ProductSearchCriteria } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MessageService } from "src/app/shared/services";
import { ToolsFilterService } from './../../services/tools-filter.service';
import * as jsonata from 'jsonata/jsonata-es5.js';
import { of } from "rxjs";
import { mergeMap, switchMap, catchError,concatMap } from "rxjs/operators";
import { BrandMasterEnum, GetFacilityMasterRecordsSuccess, GetFacilityMasterRecordsFail, GetBrandCVRecordsSuccess, GetBrandCVRecordsFail, CloseDialogAt, CreateBrandMasterRecordSuccess, CreateBrandMasterRecordFail, UpdateBrandMasterRecordsSuccess, UpdateBrandMasterRecordsFail, GetBrandCVRecordChangeLog, GetBrandCVRecordChangeLogSuccess, GetBrandCVRecordChangeLogFail, GetBrandMappingRecordsSuccess, GetBrandMappingRecordsFail, GetActiveBrandMaster, GetActiveBrandMasterSuccess, GetActiveBrandMasterFail, UpdateBrandMappingRecordsSuccess, UpdateBrandMappingRecordsFail, GetBrandMapRecordChangeLogSuccess, GetBrandMapRecordChangeLogFail, autoAssignBrandCVtoRecord, GetBrandSourceSuccess, GetBrandSourceFail } from "../actions";
import { BrandCVChangeLogModel, BrandCVRecord, BrandMappingRecord } from '../../model/manf-master-models/interface/brand-cv-filter-options';
import { actionModel } from '../../model/manf-master-models/interface/common.interface';


@Injectable()
export class BrandMasterEffects {

    GetBrandCVRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrandMasterEnum.GET_BRAND_CV_RECORDS),
      mergeMap((action: {payload:ProductSearchCriteria}) =>
        this.ToolsFilterService.retrieveBrandMasterSearchRecords(action.payload).pipe(
          switchMap((response: any) => {
            return [GetBrandCVRecordsSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Brand Master Records', 'warn');
            return of(GetBrandCVRecordsFail(error));
          })
        )
      )
    )
  );

  CreateBrandMasterRecord$ = createEffect(() =>
  this.actions$.pipe(
    ofType(BrandMasterEnum.CREATE_BRAND_CV_RECORD),
    concatMap((action: actionModel) =>
      this.ToolsFilterService.createBrandMasterRecords(action.payload.brandMasterData).pipe(
        switchMap((response: BrandCVRecord) => {
          console.log(action.payload);
          this.messageService.showToast(`A New Brand Master record has been created with ID: ${response.brandID}`, 'success');
          const data = { ...response, isNewAdded: true };
          return [
            CreateBrandMasterRecordSuccess({ payload: data }),
            CloseDialogAt({ date: Math.floor(new Date().getTime()), dialogType: 'brandMaster' }),
            ...(action.payload?.autoAppendFor?.id && [autoAssignBrandCVtoRecord({payload:{autoAppendFor:action.payload?.autoAppendFor,data:data}})])
          ];
        }),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Create Brand Master Records', 'warn');
          return of(CreateBrandMasterRecordFail(error));
        })
      )
    )
  )
);

UpdateBrandMasterRecords$ = createEffect(() =>
this.actions$.pipe(
  ofType(BrandMasterEnum.UPDATE_BRAND_CV_RECORDS),
  mergeMap((action: actionModel) =>
    this.ToolsFilterService.updateBrandMasterRecords(action.payload).pipe(
      switchMap((response: BrandCVRecord[]) => {
        this.messageService.showToast(`Records have been updated successfully. Count: ${response.length}`, 'success');
        return [UpdateBrandMasterRecordsSuccess({ payload: response })];
      }),
      catchError((error) => {
        this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Update Brand records', 'warn');
        return of(UpdateBrandMasterRecordsFail(error));
      })
    )
  )
)
);

GetBrandCVChangeLogRecords$ = createEffect(() =>
this.actions$.pipe(
  ofType(BrandMasterEnum.GET_BRAND_CV_CHANGELOG_RECORDS),
  mergeMap((action: actionModel) =>
    this.ToolsFilterService.getBrandCVChangeLog(action.payload).pipe(
      switchMap((response: BrandCVChangeLogModel[]) => {
        return [GetBrandCVRecordChangeLogSuccess({ payload: response })];
      }),
      catchError((error) => {
        this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Brand Change log records', 'warn');
        return of(GetBrandCVRecordChangeLogFail(error));
      })
    )
  )
)
);

GetBrandMappingRecords$ = createEffect(() =>
this.actions$.pipe(
  ofType(BrandMasterEnum.GET_BRAND_MAPPING_RECORDS),
  mergeMap((action: {payload:ProductSearchCriteria}) =>
    this.ToolsFilterService.retrieveBrandMappingSearchRecords(action.payload).pipe(
      switchMap((response: any) => {
        return [GetBrandMappingRecordsSuccess({ payload: response })];
      }),
      catchError((error) => {
        this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Brand Mapping Records', 'warn');
        return of(GetBrandMappingRecordsFail(error));
      })
    )
  )
)
);

GetBrandActiveRecords$ = createEffect(() =>
this.actions$.pipe(
  ofType(BrandMasterEnum.GET_ACTIVE_BRAND_RECORDS),
  mergeMap(() =>
    this.ToolsFilterService.retrieveActiveBrandRecords().pipe(
      switchMap((response: any) => {
        return [GetActiveBrandMasterSuccess({ payload: response })];
      }),
      catchError((error) => {
        return of(GetActiveBrandMasterFail(error));
      })
    )
  )
)
);

GetBrandSourceRecords$ = createEffect(() =>
  this.actions$.pipe(
    ofType(BrandMasterEnum.GET_BRAND_SOURCE),
    mergeMap(() =>
      this.ToolsFilterService.retrieveBrandSourceRecords().pipe(
        switchMap((response: any) => {
          return [GetBrandSourceSuccess({ payload: response })];
        }),
        catchError((error) => {
          return of(GetBrandSourceFail(error));
        })
      )
    )
  )
  );

UpdateBrandMappingRecords$ = createEffect(() =>
this.actions$.pipe(
  ofType(BrandMasterEnum.UPDATE_BRAND_MAPPING_RECORDS),
  mergeMap((action: actionModel) =>
    this.ToolsFilterService.updateBrandMappingRecords(action.payload).pipe(
      switchMap((response: BrandMappingRecord[]) => {
        this.messageService.showToast(`Operation has been performed successfully`, 'success');
        if(action.payload.records.length === 1 && !action.payload.records[0].brandMapID) {
          return [UpdateBrandMappingRecordsSuccess({ payload: response }), CloseDialogAt({ date: Math.floor(new Date().getTime()), dialogType: 'brandMap' })];
        } else {
          return [UpdateBrandMappingRecordsSuccess({ payload: response })];
        }
      }),
      catchError((error) => {
        this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Create / Update Brand Mapping', 'warn');
        return of(UpdateBrandMappingRecordsFail(error));
      })
    )
  )
)
);

GetBrandMapChangeLogRecords$ = createEffect(() =>
this.actions$.pipe(
  ofType(BrandMasterEnum.GET_BRAND_MAP_CHANGELOG_RECORDS),
  mergeMap((action: actionModel) =>
    this.ToolsFilterService.getBrandMapChangeLog(action.payload).pipe(
      switchMap((response: BrandMappingRecord[]) => {
        return [GetBrandMapRecordChangeLogSuccess({ payload: response })];
      }),
      catchError((error) => {
        this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Brand Map Change log records', 'warn');
        return of(GetBrandMapRecordChangeLogFail(error));
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

