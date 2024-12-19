
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { MessageService } from 'src/app/shared/services';
import { DashboardService } from '../../services/dashboard.service';
import {
  CloseDrawerAt,
  CommonActionsEnum,
  FacilityTypeCVsUploadFileFail,
  FacilityTypeCVsUploadFileSuccess,
  GetUploadedFileDetailsFail,
  GetUploadedFileDetailsSuccess,
  GetUploadedFileHistoryFail,
  GetUploadedFileHistorySuccess,
  I2PItemPairsForResolutionFileUploadFail,
  I2PItemPairsForResolutionFileUploadSuccess,
  ManufacturerCVsUploadFileFail,
  ManufacturerCVsUploadFileSuccess,
  ManufacturerParentChildUploadFileFail,
  ManufacturerParentChildUploadFileSuccess,
  UploadAttributeMasterFileFail,
  UploadAttributeMasterFileSuccess,
  UploadUnspscClientCorrectionFileFail,
  UploadUnspscClientCorrectionFileSuccess,
  UploadUnspscReclassificationFileFail,
  UploadUnspscReclassificationFileSuccess,
  UploadProductAttributeTagFileSuccess,
  UploadProductAttributeTagFileFailed,
  DownloadProductAttributeTagFileSuccess,
  DownProductAttributeTagFileFailed,
  GetActiveAttributesMasterSuccess,
  UploadProductMergeUnmergedGraphFileFailed,
  UploadProductMergeUnmergedGraphFileSuccess,
  DownloadProductMergeUnmergedGraphFileSuccess,
  DownloadProductMergeUnmergedGraphFileFailed,
  GetGraphProductItemReviewSuccess,
  GetGraphProductItemReviewFail,
  CloseDialogAt,
  DownloadUOMDataFileSuccess,
  DownloadUOMDataFileFail,
  UploadASPFileSuccess,
  UploadASPFileFail,
  UploadUNSPSCWorkFlowFileSuccess,
  UploadUNSPSCWorkFlowFileFail,
  TriggerBrandAutomationDAGSuccess,
  TriggerBrandAutomationDAGFail,
  InitUNSPSCWorkflowWithMarketSuccess,
  InitUNSPSCWorkflowWithMarketFail,
  BrandFeatureSuggestionSuccess,
  BrandFeatureSuggestionFail,
  UploadBrandSuggestionFileUploadSuccess,
  UploadBrandSuggestionFileUploadFail
} from '../actions';
declare let jsonata: any;

@Injectable()
export class CommonEffects {
  @Effect() uploadUnspscReclassificationFile$ = this.actions$.pipe(
    ofType(CommonActionsEnum.UPLOAD_UNSPSC_RECLASSIFICATION_FILE),
    switchMap((action: any) =>
      this.dashboardService.uploadUnspscReclassificationFile(action.payload).pipe(
        switchMap((response) => {
          this.messageService.showToast(response.message, 'Close');
          return [new UploadUnspscReclassificationFileSuccess(response), new CloseDrawerAt(new Date().getTime())];
        }),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to upload UNSPSC reclassification file', 'warn');
          return of(new UploadUnspscReclassificationFileFail(error));
        })
      )
    )
  );

  @Effect() uploadAttributeMasterFile$ = this.actions$.pipe(
    ofType(CommonActionsEnum.UPLOAD_ATTRIBUTE_MASTER_FILE),
    switchMap((action: any) =>
      this.dashboardService.uploadAttributeMasterFile(action.payload).pipe(
        switchMap((response: any) => {
          this.messageService.showToast(response.message, 'Close');
          return [new UploadAttributeMasterFileSuccess(response), new CloseDrawerAt(new Date().getTime())];
        }),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to upload UNSPSC Attribute extension file', 'warn');
          return of(new UploadAttributeMasterFileFail(error));
        })
      )
    )
  );

  @Effect() uploadUnspscClientCorrectionFile$ = this.actions$.pipe(
    ofType(CommonActionsEnum.UPLOAD_UNSPSC_CLIENT_CORRECTION_FILE),
    switchMap((action: any) =>
      this.dashboardService.uploadUnspscClientCorrectionFile(action.payload).pipe(
        switchMap((response: any) => {
          this.messageService.showToast(response.message, 'Close');
          return [new UploadUnspscClientCorrectionFileSuccess(response), new CloseDrawerAt(new Date().getTime())];
        }),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to upload Unspsc Client Correction file', 'warn');
          return of(new UploadUnspscClientCorrectionFileFail(error));
        })
      )
    )
  );

  @Effect() uploadfacilityTypeCVsFile$ = this.actions$.pipe(
    ofType(CommonActionsEnum.FACILITY_TYPE_CVS_UPLOAD_FILE),
    switchMap((action: any) =>
      this.dashboardService.uploadLatestMappedDescriptions(action.payload).pipe(
        switchMap((response: any) => {
          this.messageService.showToast(response.message, 'Close');
          return [new FacilityTypeCVsUploadFileSuccess(response), new CloseDrawerAt(new Date().getTime())];
        }),
        catchError((error) => {
          this.messageService.showToast(
            jsonata('message').evaluate(error) || 'Unable to upload Facility Type Internal descriptions for mapping',
            'warn'
          );
          return of(new FacilityTypeCVsUploadFileFail(error));
        })
      )
    )
  );

  @Effect() uploadManufacturerCVsFile$ = this.actions$.pipe(
    ofType(CommonActionsEnum.MANUFACTURER_CVS_UPLOAD_FILE),
    switchMap((action: any) =>
      this.dashboardService.uploadLatestMappedDescriptions(action.payload).pipe(
        switchMap((response: any) => {
          this.messageService.showToast(response.message, 'Close');
          return [new ManufacturerCVsUploadFileSuccess(response), new CloseDrawerAt(new Date().getTime())];
        }),
        catchError((error) => {
          this.messageService.showToast(
            jsonata('message').evaluate(error) || 'Unable to upload Manufacturer Internal descriptions for mapping',
            'warn'
          );
          return of(new ManufacturerCVsUploadFileFail(error));
        })
      )
    )
  );

  @Effect() uploadManufacturerParentChildFile$ = this.actions$.pipe(
    ofType(CommonActionsEnum.MANUFACTURER_PARENT_CHILD_UPLOAD_FILE),
    switchMap((action: any) =>
      this.dashboardService.uploadManufacturerParentChildRelationships(action.payload).pipe(
        switchMap((response: any) => {
          this.messageService.showToast(response.message, 'Close');
          return [new ManufacturerParentChildUploadFileSuccess(response), new CloseDrawerAt(new Date().getTime())];
        }),
        catchError((error) => {
          this.messageService.showToast(
            jsonata('message').evaluate(error) || 'Unable to upload manufacturer parent and child relationships',
            'warn'
          );
          return of(new ManufacturerParentChildUploadFileFail(error));
        })
      )
    )
  );

  @Effect() i2pItemPairsForResolutionFileUpload$ = this.actions$.pipe(
    ofType(CommonActionsEnum.I2P_ITEM_PAIRS_FOR_RESOLUTION_FILE_UPLOAD_FILE),
    switchMap((action: any) =>
      this.dashboardService.uploadI2PItemsPairsForResolution(action.payload).pipe(
        switchMap((response: any) => {
          this.messageService.showToast(response.message, 'Close');
          return [new I2PItemPairsForResolutionFileUploadSuccess(response), new CloseDrawerAt(new Date().getTime())];
        }),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to upload I2P items for resolutions', 'warn');
          return of(new I2PItemPairsForResolutionFileUploadFail(error));
        })
      )
    )
  );

  @Effect() getUploadedFileHistory$ = this.actions$.pipe(
    ofType(CommonActionsEnum.GET_UPLOADED_FILE_HISTORY),
    switchMap((action: any) =>
      this.dashboardService.getUploadedFileHistory(action.payload).pipe(
        switchMap((response: any) => {
          return [new GetUploadedFileHistorySuccess(response)];
        }),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to fetch uploaded file history', 'warn');
          return of(new GetUploadedFileHistoryFail(error));
        })
      )
    )
  );

  @Effect() getUploadedFileDetails$ = this.actions$.pipe(
    ofType(CommonActionsEnum.GET_UPLOADED_FILE_DETAILS),
    switchMap((action: any) =>
      this.dashboardService.getUploadedFileDetails(action.payload).pipe(
        switchMap((response: any) => {
          return [new GetUploadedFileDetailsSuccess(response)];
        }),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to fetch uploaded file details', 'warn');
          return of(new GetUploadedFileDetailsFail(error));
        })
      )
    )
  );

  @Effect() downloadProductAttributeFile$ = this.actions$.pipe(
    ofType(CommonActionsEnum.DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE),
    switchMap((action: any) =>

      this.dashboardService.downloadProductAttributeTaggingFile(action.payload).pipe(
        switchMap((response: any) => {
          this.dashboardService.downloadFileCommonFunction(response);
          return [new DownloadProductAttributeTagFileSuccess(response), new CloseDrawerAt(new Date().getTime())];
        }),
        catchError((error: HttpErrorResponse) => {

          this.dashboardService.parseBlobAndDisplayMessage(error);
          return of(new DownProductAttributeTagFileFailed(error));
        })
      )
    )
  );

  @Effect() ProductAttributeTaggingFileUpload$ = this.actions$.pipe(
    ofType(CommonActionsEnum.UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE),
    switchMap((action: any) =>
      this.dashboardService.uploadProductAttributeFile(action.payload).pipe(
        switchMap((response: any) => {
          this.messageService.showToast(response.message, 'Close');
          return [new UploadProductAttributeTagFileSuccess(response), new CloseDrawerAt(new Date().getTime())];
        }),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to upload I2P items for resolutions', 'warn');
          return of(new UploadProductAttributeTagFileFailed(error));
        })
      )
    )
  );

  @Effect() GetActiveAttributeMaster$ = this.actions$.pipe(
    ofType(CommonActionsEnum.GET_ACTIVE_ATTRIBUTE_MASTER),
    switchMap((action: any) =>
      this.dashboardService.getActiveAttributesMaster(action.payload).pipe(
        switchMap((response: any) => {
          return [new GetActiveAttributesMasterSuccess(response)];
        }),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to fetch Active Attribute master', 'warn');
          return of(new UploadProductAttributeTagFileFailed(error));
        })
      )
    )
  );

  @Effect() ProductMergeUnMergedGraphFileUpload$ = this.actions$.pipe(
    ofType(CommonActionsEnum.UPLOAD_PRODUCT_GRAPH_MANAGE_FILE),
    switchMap((action: any) =>
      this.dashboardService.UploadProductMergeUnmergedGraphFile(action.payload).pipe(
        switchMap((response: any) => {
          this.messageService.showToast(response.message, 'Close');
          return [new UploadProductMergeUnmergedGraphFileSuccess(response), new CloseDrawerAt(new Date().getTime())];
        }),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to upload I2P for Merge / Unmerged Item Graph', 'warn');
          return of(new UploadProductMergeUnmergedGraphFileFailed(error));
        })
      )
    )
  );

  @Effect() downloadProductGraphFile$ = this.actions$.pipe(
    ofType(CommonActionsEnum.DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE),
    switchMap((action: any) =>
      this.dashboardService.DownloadProductMergeUnmergedGraphFile(action.payload).pipe(
        switchMap((response: any) => {
          this.dashboardService.downloadFileCommonFunction(response);
          return [new DownloadProductMergeUnmergedGraphFileSuccess(response), new CloseDialogAt(new Date().getTime())];
        }),
        catchError((error: HttpErrorResponse) => {
          this.dashboardService.parseBlobAndDisplayMessage(error);
          return of(new DownloadProductMergeUnmergedGraphFileFailed(error));
        })
      )
    )
  )

  @Effect() retrieveGraphProductItemView$ = this.actions$.pipe(
    ofType(CommonActionsEnum.GET_GRAPH_PRODUCT_ITEM_VIEW),
    switchMap((action: any) =>
      this.dashboardService.retrieveGraphProductItemView(action.payload).pipe(
        switchMap((response: any) => {
          return [new GetGraphProductItemReviewSuccess(response)];
        }),
        catchError((error: HttpErrorResponse) => {
          this.messageService.showToast(jsonata('message').evaluate(error.error) || 'Unable to retrieve Graph Product Item', 'warn');
          return of(new GetGraphProductItemReviewFail(error));
        })
      )
    )
  );

  @Effect() downloadUOMDataFile$ = this.actions$.pipe(
    ofType(CommonActionsEnum.DOWNLOAD_UOM_DATA_FILE),
    switchMap((action: any) =>
      this.dashboardService.DownloadUOMDataFile(action.payload).pipe(
        switchMap((response: any) => {
          this.dashboardService.downloadFileCommonFunction(response);
          this.messageService.open('File downloaded successfully', 'Success');
          return [new DownloadUOMDataFileSuccess(response)];
        }),
        catchError((error: HttpErrorResponse) => {
          this.dashboardService.parseBlobAndDisplayMessage(error);
          return of(new DownloadUOMDataFileFail(error));
        })
      )
    )
  );

  UploadASPDataFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommonActionsEnum.UPLOAD_ASP_FILE),
      switchMap((action: { payload: FormData }) =>
        this.dashboardService.makeGenericHttpReq({ method: 'POST', data: action.payload, url: '/content/operations/asp/uploadAverageSellingPriceFile' }).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(response.message, 'Close');
            return [UploadASPFileSuccess(), new CloseDrawerAt(new Date().getTime())];
          }),
          catchError((error: HttpErrorResponse) => {
            this.messageService.showToast(jsonata('message').evaluate(error.error) || 'Unable to upload ASP File', 'error');
            return of(UploadASPFileFail());
          })
        )
      )
    );
  });

  UploadUNSPSCWorkFlowFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommonActionsEnum.UPLOAD_UNSPSC_WORKFLOW_FILE),
      switchMap((action: { payload: FormData }) =>
        this.dashboardService.makeGenericHttpReq({ method: 'POST', data: action.payload, url: '/content/operations/unspsc/uploadUNSPSCFile' }).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(response.message, 'Close');
            return [UploadUNSPSCWorkFlowFileSuccess(), new CloseDrawerAt(new Date().getTime())];
          }),
          catchError((error: HttpErrorResponse) => {
            this.messageService.showToast(jsonata('message').evaluate(error.error) || 'Unable to upload UNSPSC Workflow File', 'error');
            return of(UploadUNSPSCWorkFlowFileFail());
          })
        )
      )
    );
  });

  InitUNSPSCWorkflow$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommonActionsEnum.INIT_UNSPSC_WORKFLOW_MARKET),
      switchMap((action: { payload: any }) =>
        this.dashboardService.makeGenericHttpReq({ method: 'POST', data: action.payload, url: '/content/operations/unspsc/submitMarketToInitiateUNSPSCWorkflow' }).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(response.message, 'Close');
            return [InitUNSPSCWorkflowWithMarketSuccess()];
          }),
          catchError((error: HttpErrorResponse) => {
            this.messageService.showToast(jsonata('message').evaluate(error.error) || 'Unable to Initiate UNSPSC Workflow Process', 'error');
            return of(InitUNSPSCWorkflowWithMarketFail());
          })
        )
      )
    );
  });

  InitBrandAttributeDAG$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommonActionsEnum.BRAND_AUTOMATION_TRIGGER),
      switchMap((action: { payload: any }) =>
        this.dashboardService.makeGenericHttpReq({ method: 'POST', data: action.payload, url: 'master/brand/brandAttributeAutomation' }).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(response.message, 'Close');
            return [TriggerBrandAutomationDAGSuccess()];
          }),
          catchError((error: HttpErrorResponse) => {
            this.messageService.showToast(jsonata('message').evaluate(error.error) || 'Unable to Trigger Brand/Attribute DAG', 'error');
            return of(TriggerBrandAutomationDAGFail());
          })
        )
      )
    );
  });

  BrandFeatureSuggestionFlow$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommonActionsEnum.BRAND_FEATURE_SUGGESTION),
      switchMap((action: { payload: any }) =>
        this.dashboardService.makeGenericHttpReq({ method: 'POST', data: action.payload, url: 'master/brand/brandSuggestionFeature' }).pipe(
          switchMap((response: any) => {
            this.messageService.showToast(response.message, 'Close');
            return [BrandFeatureSuggestionSuccess()];
          }),
          catchError((error: HttpErrorResponse) => {
            this.messageService.showToast(jsonata('message').evaluate(error.error) || 'Unable to Initiate UNSPSC Workflow Process', 'error');
            return of(BrandFeatureSuggestionFail());
          })
        )
      )
    );
  });

  @Effect() uploadBrandFeatureSuggestionFileUpload$ = this.actions$.pipe(
    ofType(CommonActionsEnum.UPLOAD_BRAND_SUGGESTION_FILE_UPLOAD_FILE),
    switchMap((action: any) =>
      this.dashboardService.uploadBrandFeatureSuggestion(action.payload).pipe(
        switchMap((response: any) => {
          this.messageService.showToast(response.message, 'Close');
          return [new UploadBrandSuggestionFileUploadSuccess(response), new CloseDrawerAt(new Date().getTime())];
        }),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to upload I2P items for resolutions', 'warn');
          return of(new UploadBrandSuggestionFileUploadFail(error));
        })
      )
    )
  );


  constructor(
    private readonly actions$: Actions,
    private readonly dashboardService: DashboardService,
    private readonly messageService: MessageService
  ) { }
}
