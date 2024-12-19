import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';
import { MessageService } from 'src/app/shared/services';
import { DashboardService } from '../../services/dashboard.service';
import { CloseDialogAt, CloseDrawerAt, DownProductAttributeTagFileFailed } from '../actions';
import {
  BrandMasterCVSuccess,
  BrandMasterCVFail,
  CommonBrandActionsEnum,
  BrandProductMappingUploadSuccess,
  BrandProductMappingUploadFail,
  BrandMasterRecordsSuccess,
  BrandMasterRecordsFail,
  GetBrandProductReviewSuccess,
  GetBrandProductReviewFail,
  DownloadProductBrandFileSuccess,
  DownloadProductBrandFileFail
} from '../actions/brand.actions';
import * as jsonata from 'jsonata/jsonata-es5.js';

@Injectable()
export class BrandEffects {
  BrandMasterCVUpload$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommonBrandActionsEnum.BRAND_MASTER_CV_UPLOAD),
      mergeMap((action: any) =>
        this.dashboardService.UploadBrandMasterCVFile(action.payload).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(response.message, 'Close');
            return [BrandMasterCVSuccess(response), new CloseDrawerAt(new Date().getTime())];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error.error) || 'Unable to Upload Brand Master File', 'warn');
            return of(BrandMasterCVFail(error));
          })
        )
      )
    )
  );

  BrandProductMappingUploadProcess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommonBrandActionsEnum.BRAND_PRODUCT_MAPPING_UPLOAD),
      mergeMap((action: any) =>
        this.dashboardService.UploadBrandProductMappingFile(action.payload).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(response.message, 'Close');
            return [BrandProductMappingUploadSuccess(response), new CloseDrawerAt(new Date().getTime())];
          }),
          catchError((error) => {
            this.messageService.showToast(
              jsonata('message').evaluate(error.error) || 'Unable to Upload Brand Product Mapping File',
              'warn'
            );
            return of(BrandProductMappingUploadFail(error));
          })
        )
      )
    ));

    GetActiveProductBrand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommonBrandActionsEnum.GET_ACTIVE_MASTER_BRAND),
      mergeMap((action: any) =>
        this.dashboardService.GetActiveProductBrands().pipe(
          switchMap((response: any) => {
            return [BrandMasterRecordsSuccess({payload: response})];
          }),
          catchError((error) => {
            this.messageService.showToast(
              jsonata('message').evaluate(error.error) || 'Unable to Fetch Active Brand Product',
              'warn'
            );
            return of(BrandMasterRecordsFail(error));
          })
        )
      )
    ))

    GetProductBrandReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommonBrandActionsEnum.GET_PRODUCT_BRAND_TAGGING_VIEW),
      mergeMap((action: any) =>
        this.dashboardService.retrieveProductBrandItem(action.payload).pipe(
          switchMap((response: any) => {
            return [GetBrandProductReviewSuccess({payload: response})];
          }),
          catchError((error) => {
            this.messageService.showToast(
              jsonata('message').evaluate(error.error) || 'Unable to Fetch Product Brand Tagging Records',
              'warn'
            );
            return of(GetBrandProductReviewFail(error),new DownProductAttributeTagFileFailed(null));
          })
        )
      )
    ))

    DownloadProductBrandFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommonBrandActionsEnum.DOWNLOAD_PRODUCT_BRAND_TAGGING_FILE),
      mergeMap((action: any) =>
      this.dashboardService.DownloadProductBrandTaggingFile(action.payload).pipe(
        switchMap((response: any) => {
         this.dashboardService.downloadFileCommonFunction(response);
          return [DownloadProductBrandFileSuccess(response),new CloseDialogAt(new Date().getTime())];
        }),
        catchError( (error : HttpErrorResponse) => {
          this.dashboardService.parseBlobAndDisplayMessage(error);
          return of(DownloadProductBrandFileFail({payload:error}));
        })
        )
      )
    ))

  constructor(
    private readonly actions$: Actions,
    private readonly dashboardService: DashboardService,
    private readonly messageService: MessageService
  ) {}
}
