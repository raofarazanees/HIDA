import { ProductStagingCreateTaskFail, ProductStagingUploadFile, ProductStagingUploadFileFail, StagingCurationTriggerOutboundProcess, StagingCurationTriggerOutboundProcessFail, StagingCurationTriggerOutboundProcessSuccess } from './../actions/product-staging.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import {TestBed} from "@angular/core/testing";
import { ProductStagingEffect } from "./product-staging.effects";
import {provideMockActions} from "@ngrx/effects/testing";
import {Observable, of, throwError} from "rxjs";
import {provideMockStore} from "@ngrx/store/testing";
import {initialState} from "../reducers/product-staging.reducer";
import {Store} from "@ngrx/store";
import { GetProductStagingUNSPSCs, ProductLevelClusteringFileUpload, ProductLevelClusteringFileUploadFail, ProductLevelClusteringFileUploadSuccess, ProductStagingCreateTask, ProductStagingUNSPSCsFail, ProductStagingUNSPSCsSuccess } from "../actions/product-staging.action";
import {HttpClientModule} from "@angular/common/http";
import { DashboardService } from "../../services/dashboard.service";
import { MessageService } from 'src/app/shared/services';
import { OverlayModule } from '@angular/cdk/overlay';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

describe("Effects : ProductStaging", () => {
    let actions$: Observable<any>
    let effects: ProductStagingEffect
    let store: Store
    let dashboardService: DashboardService
  
    const responseSuccess = {status:201,message:'File upload Success'};
    const responseFail = {status:400,message:'Failed to call request'};

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          ProductStagingEffect,
          MatSnackBar,
          MessageService,
          provideMockActions(() => actions$),
          provideMockStore({initialState})
        ],
        imports: [BrowserAnimationsModule,CommonModule,HttpClientModule, OverlayModule],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      })
      dashboardService = TestBed.inject(DashboardService)
      effects = TestBed.inject(ProductStagingEffect)
      store = TestBed.inject(Store)
    })

    describe('retrieveProductStagingCurationUNSPSCs action', function () {

        it("should call retrieveProductStagingCurationUNSPSCs and return success", (done) => {
          spyOn(dashboardService, "retrieveProductStagingCurationUNSPSCs").and.returnValue(of(responseSuccess))
          actions$ = of(GetProductStagingUNSPSCs);
          effects.GetProductStagingUNSPSCs$.subscribe(res => {
            expect(dashboardService.retrieveProductStagingCurationUNSPSCs).toHaveBeenCalled()
            expect(res).toEqual(ProductStagingUNSPSCsSuccess({payload:responseSuccess}))
            done()
          })
        })

      });

      describe('retrieveProductStagingCurationUNSPSCs action responseFail', function () {
        it("should call retrieveProductStagingCurationUNSPSCs and return fail", (done) => {
          spyOn(dashboardService, "retrieveProductStagingCurationUNSPSCs").and.returnValue(throwError({payload:responseFail}))
          actions$ = of(GetProductStagingUNSPSCs);
          effects.GetProductStagingUNSPSCs$.subscribe(res => {
            expect(dashboardService.retrieveProductStagingCurationUNSPSCs).toHaveBeenCalled()
           // expect(res).toEqual(ProductStagingUNSPSCsFail({payload:responseFail}))
            done()
          })
        })
      });

    describe('UploadProductLevelClusteringFile action responseFail', function () {
      it("should call UploadProductLevelClusteringFile effect Fail", (done) => {
        spyOn(dashboardService, "UploadProductLevelClusteringFile").and.returnValue(throwError({payload:responseFail}))
        actions$ = of(ProductLevelClusteringFileUpload);
        effects.UploadProductLevelClusteringFile$.subscribe(res => {
          expect(dashboardService.UploadProductLevelClusteringFile).toHaveBeenCalled()
          expect(res).toEqual(ProductLevelClusteringFileUploadFail({payload:responseFail}))
          done()
        })
      })
  })

  describe('UploadProductLevelClusteringFile action responseSuccess', function () {
    it("should call UploadProductLevelClusteringFile effect Success", (done) => {
      spyOn(dashboardService, "UploadProductLevelClusteringFile").and.returnValue(of(responseSuccess))
      actions$ = of(ProductLevelClusteringFileUpload);
      effects.UploadProductLevelClusteringFile$.subscribe(res => {
        expect(dashboardService.UploadProductLevelClusteringFile).toHaveBeenCalled()
     //   expect(res[0]).toEqual(ProductLevelClusteringFileUploadSuccess({payload:undefined}))
        done()
      })
    })
})

describe('UploadProductLevelClusteringFile action responseSuccess StatementCheck', function () {
  it("should call UploadProductLevelClusteringFile effect Success StatementCheck", (done) => {
    spyOn(dashboardService, "UploadProductLevelClusteringFile").and.returnValue(of({status:responseSuccess.message}))
    actions$ = of(ProductLevelClusteringFileUpload);
    effects.UploadProductLevelClusteringFile$.subscribe(res => {
      expect(dashboardService.UploadProductLevelClusteringFile).toHaveBeenCalled()
   //   expect(res[0]).toEqual(ProductLevelClusteringFileUploadSuccess({payload:undefined}))
      done()
    })
  })
})


describe('ProductStagingCreateTaskProducts action Success Response', function () {
  it("should call ProductStagingCreateTaskProducts effect Success StatementCheck", (done) => {
    spyOn(dashboardService, "CreateTaskForProductStagingUnspsc").and.returnValue(of({status:responseSuccess.message}))
    actions$ = of(ProductStagingCreateTask);
    effects.ProductStagingCreateTaskProducts$.subscribe(res => {
      expect(dashboardService.CreateTaskForProductStagingUnspsc).toHaveBeenCalled()
   //   expect(res[0]).toEqual(ProductLevelClusteringFileUploadSuccess({payload:undefined}))
      done()
    })
  })
})

describe('ProductStagingCreateTaskProducts action Fail Response', function () {
  it("should call ProductStagingCreateTaskProducts effect Fail", (done) => {
    spyOn(dashboardService, "CreateTaskForProductStagingUnspsc").and.returnValue(throwError({payload:responseFail}))
    actions$ = of(ProductStagingCreateTask);
    effects.ProductStagingCreateTaskProducts$.subscribe(res => {
      expect(dashboardService.CreateTaskForProductStagingUnspsc).toHaveBeenCalled()
      expect(res).toEqual(ProductStagingCreateTaskFail({payload:responseFail}))
      done()
    })
  })
})

describe('ProductStagingUploadFile action Success Response', function () {
  it("should call ProductStagingUploadFile effect Success", (done) => {
    spyOn(dashboardService, "UploadFileForProductStaging").and.returnValue(of({status:responseSuccess.message}))
    actions$ = of(ProductStagingUploadFile);
    effects.ProductStagingUploadFile$.subscribe(res => {
      expect(dashboardService.UploadFileForProductStaging).toHaveBeenCalled()
      done()
    })
  })
})

describe('ProductStagingUploadFile action Fail Response', function () {
  it("should call ProductStagingUploadFile effect Fail", (done) => {
    spyOn(dashboardService, "UploadFileForProductStaging").and.returnValue(throwError({payload:responseFail}))
    actions$ = of(ProductStagingUploadFile);
    effects.ProductStagingUploadFile$.subscribe(res => {
      expect(dashboardService.UploadFileForProductStaging).toHaveBeenCalled()
      expect(res).toEqual(ProductStagingUploadFileFail({payload:responseFail}))
      done()
    })
  })
})

describe('triggerStagingCurationOutboundProcess action Success Response', function () {
  it("should call triggerStagingCurationOutboundProcess effect Success", (done) => {
    spyOn(dashboardService, "StagingTriggerOutboundRefreshProcess").and.returnValue(of({payload:responseSuccess}))
    actions$ = of(StagingCurationTriggerOutboundProcess);
    effects.triggerStagingCurationOutboundProcess$.subscribe(res => {
      expect(dashboardService.StagingTriggerOutboundRefreshProcess).toHaveBeenCalled();
      expect(res).toEqual(StagingCurationTriggerOutboundProcessSuccess({payload:responseSuccess}))

      done()
    })
  })
})

describe('triggerStagingCurationOutboundProcess action Fail Response', function () {
  it("should call triggerStagingCurationOutboundProcess effect Fail", (done) => {
    spyOn(dashboardService, "StagingTriggerOutboundRefreshProcess").and.returnValue(throwError({payload:responseFail}))
    actions$ = of(StagingCurationTriggerOutboundProcess);
    effects.triggerStagingCurationOutboundProcess$.subscribe(res => {
      expect(dashboardService.StagingTriggerOutboundRefreshProcess).toHaveBeenCalled();
      expect(res).toEqual(StagingCurationTriggerOutboundProcessFail({payload:responseFail}))

      done()
    })
  })
})


})