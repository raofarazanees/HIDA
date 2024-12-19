import { ProductStagingUploadFileForLabellingSuccess, ProductStagingUploadFileForLabellingFail, StagingCurationTriggerOutboundProcessSuccess, StagingCurationTriggerOutboundProcessFail, UomCorrectionFileUploadSuccess, UomCorrectionFileUploadFail, UomRegularFileUploadSuccess, UomRegularFileUploadFail, UoMAdhocFileUploadSuccess, UoMAdhocFileUploadFail, SkuDataForClusteringFileUploadSuccess, SkuDataForClusteringFileUploadFail } from './../actions/product-staging.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';
import { MessageService } from 'src/app/shared/services';
import { DashboardService } from '../../services/dashboard.service';
import {
  CloseDialogAt,
  CloseDrawerAt,
  DownProductAttributeTagFileFailed,
  ProductLevelClusteringFileUploadFail,
  ProductLevelClusteringFileUploadSuccess,
  ProductStagingCreateTaskFail,
  ProductStagingCreateTaskSuccess,
  ProductStagingDownloadFileFail,
  ProductStagingDownloadFileSuccess,
  ProductStagingEnum,
  ProductStagingUNSPSCsFail,
  ProductStagingUNSPSCsSuccess,
  ProductStagingUploadFileFail,
  ProductStagingUploadFileSuccess
} from '../actions';

import * as jsonata from 'jsonata/jsonata-es5.js';

@Injectable()
export class ProductStagingEffect {
  
  GetProductStagingUNSPSCs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductStagingEnum.PRODUCT_STAGING_GET_UNSPSCS),
      mergeMap((action: any) =>
        this.dashboardService.retrieveProductStagingCurationUNSPSCs(action.payload).pipe(
          switchMap((response: any) => {
            return [ProductStagingUNSPSCsSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error.error) || 'Unable to Fetch Product UNSPSCs', 'warn');
            return of(ProductStagingUNSPSCsFail(error), new DownProductAttributeTagFileFailed(null));
          })
        )
      )
    )
  );

  UploadProductLevelClusteringFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductStagingEnum.PRODUCT_LEVEL_CLUSTERING_FILE_UPLOAD),
      mergeMap((action: any) =>
        this.dashboardService.UploadProductLevelClusteringFile(action.payload).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(
              jsonata('message').evaluate(response) || 'Product Level Clustering File Upload Successfully',
              'success',
              8000
            );
            return [ProductLevelClusteringFileUploadSuccess({ payload: response }), new CloseDrawerAt(new Date().getTime())];
          }),
          catchError((error) => {
            this.messageService.showToast(
              jsonata('message').evaluate(error.error) || 'Unable to upload Product Level Clustering ',
              'warn',
              8000
            );
            return of(ProductLevelClusteringFileUploadFail(error));
          })
        )
      )
    )
  );

  ProductStagingCreateTaskProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductStagingEnum.PRODUCT_STAGING_CREATE_TASK_SELECTED_PRODUCT),
      mergeMap((action: any) =>
        this.dashboardService.CreateTaskForProductStagingUnspsc(action.payload).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(
              jsonata('message').evaluate(response) || 'Task Created Successfully for Selected Items',
              'success',
              8000
            );
            return [ProductStagingCreateTaskSuccess({ payload: response }), new CloseDialogAt(new Date().getTime())];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error.error) || 'Unable to create Task ', 'warn', 8000);
            return of(ProductStagingCreateTaskFail(error));
          })
        )
      )
    )
  );

  ProductStagingDownloadFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductStagingEnum.PRODUCT_STAGING_SELECTED_PRODUCT_FILE_DOWNLOAD),
      mergeMap((action: any) =>
        this.dashboardService.DownloadFileForProductStagingUnspsc(action.payload).pipe(
          switchMap((response: any) => {
            this.dashboardService.downloadFileCommonFunction(response);
            return [ProductStagingDownloadFileSuccess({ payload: response }), new CloseDialogAt(new Date().getTime())];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error.error) || 'Unable to Download File ', 'warn', 8000);
            return of(ProductStagingDownloadFileFail(error));
          })
        )
      )
    )
  );

  ProductStagingUploadFile$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductStagingEnum.PRODUCT_STAGING_FILE_UPLOAD),
    mergeMap((action: any) =>
      this.dashboardService.UploadFileForProductStaging(action.payload).pipe(
        switchMap((response: any) => {
          this.messageService.showToast(jsonata('message').evaluate(response) || 'File uploaded successfully',
            'success',
            8000
          );
          return [ProductStagingUploadFileSuccess({ payload: response }), new CloseDrawerAt(new Date().getTime())];
        }),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error.error) || 'Unable to Upload File ', 'warn', 8000);
          return of(ProductStagingUploadFileFail(error));
        })
      )
    )
  )
);

ProductStagingUploadFileForLabelling$ = createEffect(() =>
this.actions$.pipe(
  ofType(ProductStagingEnum.PRODUCT_STAGING_FILE_UPLOAD_FOR_LABELLING),
  mergeMap((action: any) =>
    this.dashboardService.UploadFileForProductStagingForLabelling(action.payload).pipe(
      switchMap((response: any) => {
        this.messageService.showToast(jsonata('message').evaluate(response) || 'File uploaded successfully',
          'success',
          8000
        );
        return [ProductStagingUploadFileForLabellingSuccess({ payload: response }), new CloseDrawerAt(new Date().getTime())];
      }),
      catchError((error) => {
        this.messageService.showToast(jsonata('message').evaluate(error.error) || 'Unable to Upload File ', 'warn', 8000);
        return of(ProductStagingUploadFileForLabellingFail(error));
      })
    )
  )
)
);

triggerStagingCurationOutboundProcess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductStagingEnum.STAGING_CURATION_TRIGGER_OUTBOUND_REFRESH),
      mergeMap((action: any) =>
        this.dashboardService.StagingTriggerOutboundRefreshProcess(action.payload).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(response.message, 'Close');
            return [StagingCurationTriggerOutboundProcessSuccess(response)];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error.error) || 'Unable to Trigger Staging Curation Outbound Refresh Process', 'warn');
            return of(StagingCurationTriggerOutboundProcessFail(error));
          })
        )
      )
    )
  );

  
  UomInitWorkflowFileUpload$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductStagingEnum.UOM_REGULAR_FILE_UPLOAD),
      mergeMap((action: any) =>
        this.dashboardService.UploadUoMRegularFile(action.payload).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(
              jsonata('message').evaluate(response) || 'UoM Regular workflow File Uploaded Successfully',
              'success',
              8000
            );
            return [UomRegularFileUploadSuccess({ payload: response }), new CloseDrawerAt(new Date().getTime())];
          }),
          catchError((error) => {
            this.messageService.showToast(
              jsonata('message').evaluate(error.error) || 'Failed to upload UoM Regular Workflow File',
              'warn',
              8000
            );
            return of(UomRegularFileUploadFail(error));
          })
        )
      )
    )
  );

  UomAdhocFileUploader$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductStagingEnum.UOM_ADHOC_FILE_UPLOAD),
      mergeMap((action: any) =>
        this.dashboardService.UploadUoMAdhocFile(action.payload).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(
              jsonata('message').evaluate(response) || 'UoM Ad hoc workflow File Uploaded Successfully',
              'success',
              8000
            );
            return [UoMAdhocFileUploadSuccess({ payload: response }), new CloseDrawerAt(new Date().getTime())];
          }),
          catchError((error) => {
            this.messageService.showToast(
              jsonata('message').evaluate(error.error) || 'Failed to upload UoM Ad hoc Workflow File',
              'warn',
              8000
            );
            return of(UoMAdhocFileUploadFail(error));
          })
        )
      )
    )
  );

  skuFileUploader$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductStagingEnum.SKU_FILE_UPLOAD),
      mergeMap((action: any) =>
        this.dashboardService.UploadSkuDataForClusturingFile(action.payload).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(
              jsonata('message').evaluate(response) || 'Taxonomy Review workflow File Uploaded Successfully',
              'success',
              8000
            );
            return [SkuDataForClusteringFileUploadSuccess({ payload: response }), new CloseDrawerAt(new Date().getTime())];
          }),
          catchError((error) => {
            this.messageService.showToast(
              jsonata('message').evaluate(error.error) || 'Failed to upload Taxonomy Review Workflow File',
              'warn',
              8000
            );
            return of(SkuDataForClusteringFileUploadFail(error));
          })
        )
      )
    )
  );


  UomCorrectionFileUpload$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductStagingEnum.UOM_CORRECTION_FILE_UPLOAD),
      mergeMap((action: any) =>
        this.dashboardService.UploadUoMCorrectionFile(action.payload).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(
              jsonata('message').evaluate(response) || 'UOM Correction File Upload Successfully',
              'success',
              8000
            );
            return [UomCorrectionFileUploadSuccess({ payload: response }), new CloseDrawerAt(new Date().getTime())];
          }),
          catchError((error) => {
            this.messageService.showToast(
              jsonata('message').evaluate(error.error) || 'Unable to upload UOM correction file',
              'warn',
              8000
            );
            return of(UomCorrectionFileUploadFail(error));
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
