import { I2PEffect } from './I2P.effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import {TestBed} from "@angular/core/testing";
import { ProductStagingEffect } from "./product-staging.effects";
import {provideMockActions} from "@ngrx/effects/testing";
import {Observable, of, throwError} from "rxjs";
import {provideMockStore} from "@ngrx/store/testing";
import {Store} from "@ngrx/store";
import {HttpClientModule} from "@angular/common/http";
import { DashboardService } from "../../services/dashboard.service";
import { MessageService } from 'src/app/shared/services';
import { OverlayModule } from '@angular/cdk/overlay';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { initialState } from '../reducers/I2P.reducer';
import { I2POutboundSnowFlakeRefresh, I2POutboundSnowFlakeRefreshFail, I2POutboundSnowFlakeRefreshSuccess, ItemToProductIncrementalProcess, ItemToProductIncrementalProcessFail, ItemToProductIncrementalProcessSuccess } from '../actions';

describe("Effects : I2P", () => {
    let actions$: Observable<any>
    let effects: I2PEffect
    let store: Store
    let dashboardService: DashboardService
  
    const responseSuccess = {status:201,message:'File upload Success'};
    const responseFail = {status:400,message:'Failed to call request'};

    beforeEach(async () => {
      TestBed.configureTestingModule({
        providers: [
          I2PEffect,
          MatSnackBar,
          MessageService,
          provideMockActions(() => actions$),
          provideMockStore({initialState})
        ],
        imports: [BrowserAnimationsModule,CommonModule,HttpClientModule, OverlayModule],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      })
      dashboardService = TestBed.inject(DashboardService)
      effects = TestBed.inject(I2PEffect)
      store = TestBed.inject(Store)
    })

        it("should call I2POutboundSnowFlakeRefresh and return success", (done) => {
          spyOn(dashboardService, "I2PTriggerOutboundRefreshProcess").and.returnValue(of({payload:responseSuccess}))
          actions$ = of(I2POutboundSnowFlakeRefresh);
          effects.triggerI2POutboundProcess$.subscribe(res => {
            expect(dashboardService.I2PTriggerOutboundRefreshProcess).toHaveBeenCalled()
            expect(res).toEqual(I2POutboundSnowFlakeRefreshSuccess({payload:responseSuccess}))
            done()
          })
        })

        it("should call ItemToProductIncrementalProcess and return success", (done) => {
            spyOn(dashboardService, "I2PTriggerIncrementalProcess").and.returnValue(of({payload:responseSuccess}))
            actions$ = of(ItemToProductIncrementalProcess);
            effects.ItemToProductIncrementProcess$.subscribe(res => {
              expect(dashboardService.I2PTriggerIncrementalProcess).toHaveBeenCalled()
              expect(res).toEqual(ItemToProductIncrementalProcessSuccess({payload:responseSuccess}))
              done()
            })
          })

          it("should call I2POutboundSnowFlakeRefresh and return Fail", (done) => {
            spyOn(dashboardService, "I2PTriggerOutboundRefreshProcess").and.returnValue(throwError({payload:responseFail}))
            actions$ = of(I2POutboundSnowFlakeRefresh);
            effects.triggerI2POutboundProcess$.subscribe(res => {
              expect(dashboardService.I2PTriggerOutboundRefreshProcess).toHaveBeenCalled()
              expect(res).toEqual(I2POutboundSnowFlakeRefreshFail({payload:responseFail}))
              done()
            })
          })
  
          it("should call ItemToProductIncrementalProcess and return Fail", (done) => {
              spyOn(dashboardService, "I2PTriggerIncrementalProcess").and.returnValue(throwError({payload:responseFail}))
              actions$ = of(ItemToProductIncrementalProcess);
              effects.ItemToProductIncrementProcess$.subscribe(res => {
                expect(dashboardService.I2PTriggerIncrementalProcess).toHaveBeenCalled()
                expect(res).toEqual(ItemToProductIncrementalProcessFail({payload:responseFail}))
                done()
              })
            })


})