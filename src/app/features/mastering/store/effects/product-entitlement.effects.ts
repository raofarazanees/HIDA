import { CloseStagingCurationSidebar } from './../../../item-to-product/store/actions/staging-curation.actions';
import { DashboardService } from 'src/app/features/admin-dashboard/services/dashboard.service';
import { Injectable } from '@angular/core';
import { GetActiveBrandMappingFail, GetActiveBrandMappingSuccess, GetI2PGraphHistoryChangeLogFail, GetI2PGraphHistoryChangeLogSuccess, GetProductChangeLogRecordsFail, GetProductChangeLogRecordsSuccess, GetProductEntitlementRecordsFail, GetProductEntitlementRecordsSuccess, ProductEnum, SearchUNSPSCCodeFail, SearchUNSPSCCodeSuccess, SetLoadingState, closeUploadDrawer, exportCSVFilePIMFail, exportCSVFilePIMSuccess, getDuplicateProductRecordsFail, getDuplicateProductRecordsSuccess, getItemToProductDetailsSuccess, productManfSkuDuplicateRecords, updateProductInformationRecordsFail, updateProductInformationRecordsSuccess, uploadPIMCSVFail, uploadPIMCSVSuccess } from '../actions/product-entitlement.action';
import * as jsonata from 'jsonata/jsonata-es5.js';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';
import { ProductSearchCriteria } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { MessageService } from 'src/app/shared/services';
import { ToolsFilterService } from './../../services/tools-filter.service';
import { ActiveBrandMapping, ItemToProductGraphDetails, ItemToProductGraphDetailsResponse, SearchUnspsc, productEntitlementRecord, productEntitlementResponse } from '../../model/manf-master-models/interface/product-entitlement.interface';
import { MarketMasterModel } from '../../model/manf-master-models/interface/unspsc-master.interface';
import { productInfoUpdate } from '../../components/product-entitlement-management/product-entitlement-management.component';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ProductEntitlementEffects {
  GetProductEntitlementRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductEnum.GET_PRODUCT_ENTITLEMENT_RECORDS),
      mergeMap((action: { payload: ProductSearchCriteria }) =>
        this.ToolsFilterService.retrieveProductEntitlementSearchRecords(action.payload).pipe(
          switchMap((response: productEntitlementResponse) => {
            return [GetProductEntitlementRecordsSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Product Information Records', 'warn');
            return of(GetProductEntitlementRecordsFail(error));
          })
        )
      )
    )
  );

SearchUnspscCodeRecord$ = createEffect(() =>
this.actions$.pipe(
  ofType(ProductEnum.SEARCH_UNSPSC_CODE_MARKET),
  mergeMap((action: {payload:SearchUnspsc}) =>
    this.ToolsFilterService.retrieveUnspscCodeRecords(action.payload).pipe(
      switchMap((response: MarketMasterModel) => {
        if(response && response.active === 'N') {
         const msg = `Submarket - ${response.submarketName}, Market - ${response.marketName} with Market ID - ${response.marketID} currently assigned to UNSPSC - ${action.payload.UNSPSCCode} is not active`
         this.messageService.showToast(msg, 'warn',6000);
        }
        return [SearchUNSPSCCodeSuccess({ payload: {initiatedData:action.payload,responseData:response} })];
      }),
      catchError((error) => {
        this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch UNSPSC Code', 'warn');
        return of(SearchUNSPSCCodeFail({ payload: {initiatedData:action.payload,responseData:null} }));
      })
    )
  )
)
);

GetActiveBrandMappings$ = createEffect(() =>
this.actions$.pipe(
  ofType(ProductEnum.GET_BRAND_MAPPING_RECORDS),
  mergeMap(() =>
    this.ToolsFilterService.retrieveActiveBrandMapping().pipe(
      switchMap((response: ActiveBrandMapping[]) => {
        return [GetActiveBrandMappingSuccess({ payload: response })];
      }),
      catchError((error) => {
        return of(GetActiveBrandMappingFail({ payload: error }));
      })
    )
  )
)
);

UpdateProductEntitlementRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductEnum.UPDATE_PRODUCT_INFO_RECORDS),
      mergeMap((action: { payload: productInfoUpdate }) =>
        this.ToolsFilterService.updateProductInfoRecords(action.payload).pipe(
          switchMap((response: productEntitlementRecord[]) => {
            if(response.length > 0) {
                return [productManfSkuDuplicateRecords({payload:response}),updateProductInformationRecordsFail({payload:response})]
            } else {
               return [productManfSkuDuplicateRecords({payload:null}),updateProductInformationRecordsSuccess({ payload: {response:response,localUpdate:action.payload.updatedRecords,updatedBy:action.payload.updatedBy} })];
            }
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Update Product Information Records', 'warn');
            return of(updateProductInformationRecordsFail(error));
          })
        )
      )
    )
  );

  getProductChangeLog$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductEnum.GET_PRODUCT_CHANGE_LOG_RECORDS),
    mergeMap((action: any) =>
      this.ToolsFilterService.getProductChangeLog(action.payload).pipe(
      switchMap((response: productEntitlementRecord[]) => {
          return [GetProductChangeLogRecordsSuccess({ payload: response })];
        }),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Change log records', 'warn');
          return of(GetProductChangeLogRecordsFail(error));
        })
      )
    )
  )
  );

  DownloadPIMFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductEnum.EXPORT_PIM_RECORDS_CSV),
      mergeMap((action: any) =>
        this.ToolsFilterService.DownloadMastersFile(action.payload,'entitlement/downloadEntitlementsOfProducts','product').pipe(
          switchMap((response: any) => {
            this.dashboardService.downloadFileCommonFunction(response);
            this.messageService.showToast(`CSV File has been downloaded successfully`, 'success');
            return [exportCSVFilePIMSuccess()];
          }),
          catchError((error: HttpErrorResponse) => {
            this.dashboardService.parseBlobAndDisplayMessage(error);
            return of(exportCSVFilePIMFail());
          })
        )
      )
    )
  );

  uploadPINCsv$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductEnum.PIM_UPLOAD_CSV),
    mergeMap((action: any) =>
      this.ToolsFilterService.uploadPIMCsv(action.payload).pipe(
      switchMap((response: any) => {
          this.messageService.showToast(jsonata('message').evaluate(response), 'success');
          return [uploadPIMCSVSuccess(),closeUploadDrawer({ payload: new Date().getTime() })];
        }),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Upload CSV', 'warn');
          return of(uploadPIMCSVFail());
        })
      )
    )
  )
  );

  getProductListByIds$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductEnum.GET_DUPLICATE_PRODUCT_RECORDS),
    mergeMap((action: any) =>
      this.ToolsFilterService.retrieveProductEntitlementSearchRecords(action.payload).pipe(
      switchMap((response: productEntitlementRecord[]) => {
          return [getDuplicateProductRecordsSuccess({ payload: response })];
        }),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Product Records', 'warn');
          return of(getDuplicateProductRecordsFail(error));
        })
      )
    )
  )
  );

  getI2PGraphHistoryChangeLog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductEnum.GET_I2P_GRAPH_HISTORY_CHANGE_LOG),
      mergeMap((action: any) =>
        this.ToolsFilterService.getI2PGraphHistoryRecordChangeLog(action.payload).pipe(
          switchMap((response: any) => {
            return [GetI2PGraphHistoryChangeLogSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Change log records', 'warn');
            return of(GetI2PGraphHistoryChangeLogFail(error));
          })
        )
      )
    )
  );

  getItemToProductDetailsByProductIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductEnum.GET_ITEM_TO_PRODUCT_DETAILS),
      mergeMap((action: any) =>
        this.ToolsFilterService.retrieveItemToProductRecords(action.payload).pipe(
        switchMap((response: ItemToProductGraphDetailsResponse) => {
            return [getItemToProductDetailsSuccess({ payload: response })];
          }),
          catchError((error) => {
            this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to Fetch Product Records', 'warn');
            return of(getItemToProductDetailsSuccess(error));
          })
        )
      )
    )
    )
  
  constructor(
    private readonly actions$: Actions,
    private readonly messageService: MessageService,
    private ToolsFilterService: ToolsFilterService,
    private readonly dashboardService: DashboardService
  ) {}
}
