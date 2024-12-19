import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';
import { MessageService } from 'src/app/shared/services';
import { ItemToProductService } from '../../services/item-to-product.service';
import * as jsonata from 'jsonata/jsonata-es5.js';
import { DashboardService } from 'src/app/features/admin-dashboard/services/dashboard.service';
import {
  CloseStagingCurationSidebar,
  GetStagingCurationFinalProductForReview,
  GetStagingCurationFinalProductForReviewFail,
  GetStagingCurationFinalProductForReviewSuccess,
  GetStagingProductItemForViewFail,
  GetStagingProductItemForViewSuccess,
  GetStagingProductsForCuration,
  GetStagingProductsForCurationFail,
  GetStagingProductsForCurationSuccess,
  StagingCurationSaveForLaterWBFail,
  StagingCurationSaveForLaterWBSuccess,
  StagingCurationSubmitFinalConfirmationFail,
  StagingCurationSubmitFinalConfirmationSuccess,
  StagingCurationTaskSubmissionFail,
  StagingCurationTaskSubmissionSuccess,
  StagingCurationWorkbenchDownloadFileFail,
  StagingCurationWorkbenchDownloadFileSuccess,
  StagingCurationWorkbenchUploadFileFail,
  StagingCurationWorkbenchUploadFileSuccess,
  StagingEum
} from './../actions/staging-curation.actions';
@Injectable()
export class StagingCurationEffects {
  GetStagingProductsForCuration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StagingEum.STAGING_RETRIEVE_PRODUCTS_FOR_CURATION),
      mergeMap((action: any) =>
        this.itemToProductService.retrieveProductUNSPSCsForCuration(action.payload).pipe(
          switchMap((response: any) => {
            return [GetStagingProductsForCurationSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(
              jsonata('message').evaluate(error.error) || 'Unable to Fetch Product UNSPSCs for Curation',
              'warn'
            );
            return of(GetStagingProductsForCurationFail(error));
          })
        )
      )
    )
  );

  GetStagingProductItemsForView$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StagingEum.STAGING_RETRIEVE_PRODUCTS_ITEMS_VIEW),
      mergeMap((action: any) =>
        this.itemToProductService.retrieveProductItemForView(action.payload).pipe(
          switchMap((response: any) => {
            return [GetStagingProductItemForViewSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error.error) || 'Unable to Fetch Product Items', 'warn');
            return of(GetStagingProductItemForViewFail(error));
          })
        )
      )
    )
  );

  StagingCurationWorkbenchDownloadFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StagingEum.STAGING_CURATION_WORKBENCH_DOWNLOAD_FILE),
      mergeMap((action: any) =>
        this.itemToProductService.downloadStagingCurationWorkbenchFile(action.payload).pipe(
          switchMap((response: any) => {
            this.dashboardService.downloadFileCommonFunction(response);
            return [StagingCurationWorkbenchDownloadFileSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error.error) || 'Unable to Download CSV File', 'warn');
            return of(StagingCurationWorkbenchDownloadFileFail(error));
          })
        )
      )
    )
  );

  StagingCurationWorkbenchUploadFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StagingEum.STAGING_CURATION_WORKBENCH_UPLOAD_FILE),
      mergeMap((action: any) =>
        this.itemToProductService.uploadStagingCurationWorkbenchFile(action.payload).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(jsonata('message').evaluate(response) || 'File uploaded successfully', 'success', 8000);
            //this.itemToProductService.redirectToTaskInbox();
            return [
              StagingCurationWorkbenchUploadFileSuccess({ payload: response }),
              CloseStagingCurationSidebar({ payload: Math.floor(new Date().getTime()) })
            ];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Upload CSV File', 'warn');
            return of(StagingCurationWorkbenchUploadFileFail(error));
          })
        )
      )
    )
  );

  StagingCurationSaveForLaterOperation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StagingEum.STAGING_CURATION_SAVE_FOR_LATER_WB),
      mergeMap((action: any) =>
        this.itemToProductService.stagingCurationSaveForLater(action.payload).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(jsonata('message').evaluate(response) || 'Data Save Successfully', 'success', 8000);
            return [StagingCurationSaveForLaterWBSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to save data', 'warn');
            return of(StagingCurationSaveForLaterWBFail(error));
          })
        )
      )
    )
  );

  StagingCurationTaskSubmission$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StagingEum.STAGING_CURATION_TASK_SUBMISSION_WB),
      mergeMap((action: any) =>
        this.itemToProductService.stagingCurationTaskSubmission(action.payload).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(jsonata('message').evaluate(response) || 'Records Saved Successfully', 'success', 3000);
            if (response?.count === 0) {
              setTimeout(() => {
                this.messageService.showToast('Navigating back to task inbox', 'success', 3000);
                this.itemToProductService.redirectToTaskInbox();
              }, 3000);
              return [StagingCurationTaskSubmissionSuccess({ payload: response })];
            } else {
              return [
                StagingCurationTaskSubmissionSuccess({ payload: response }),
                GetStagingProductsForCuration({ payload: { docPGUID: action.payload.workflowID } })
              ];
            }
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Save Task Details', 'warn');
            return of(StagingCurationTaskSubmissionFail(error));
          })
        )
      )
    )
  );

  GetProductsForFinalReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StagingEum.STAGING_CURATION_GET_FINAL_PRODUCT_REVIEW),
      mergeMap((action: any) =>
        this.itemToProductService.retrieveProductUNSPSCsForFinalReview(action.payload).pipe(
          switchMap((response: any) => {
            return [GetStagingCurationFinalProductForReviewSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error.error) || 'Unable to Fetch Product Items', 'warn');
            return of(GetStagingCurationFinalProductForReviewFail(error));
          })
        )
      )
    )
  );

  SubmitFinalConfirmationStaging$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StagingEum.STAGING_CURATION_SUBMIT_FINAL_RECORDS),
      mergeMap((action: any) =>
        this.itemToProductService.submitFinalConfirmationRecords(action.payload).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(jsonata('message').evaluate(response) || 'Records Save Successfully', 'success', 3000);
            if (response?.count === 0) {
              setTimeout(() => {
                this.itemToProductService.redirectToTaskInbox();
              }, 3000);
              return [StagingCurationSubmitFinalConfirmationSuccess({ payload: response })];
            } else {
              return [
                StagingCurationSubmitFinalConfirmationSuccess({ payload: response }),
                GetStagingCurationFinalProductForReview({ payload: { groupName: action.payload.workflowID } })
              ];
            }
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error.error) || 'Unable to save Records', 'warn');
            return of(StagingCurationSubmitFinalConfirmationFail(error));
          })
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly messageService: MessageService,
    private itemToProductService: ItemToProductService,
    private dashboardService: DashboardService
  ) {}
}
