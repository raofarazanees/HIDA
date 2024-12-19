import { GetStagingCurationFinalProductForReview, GetStagingCurationFinalProductForReviewFail, GetStagingCurationFinalProductForReviewSuccess, GetStagingProductItemForViewFail, StagingCurationSaveForLaterWB, StagingCurationSaveForLaterWBFail, StagingCurationSaveForLaterWBSuccess, StagingCurationSubmitFinalConfirmation, StagingCurationSubmitFinalConfirmationFail, StagingCurationTaskSubmission, StagingCurationTaskSubmissionFail, StagingCurationTaskSubmissionSuccess, StagingCurationWorkbenchDownloadFile, StagingCurationWorkbenchDownloadFileFail, StagingCurationWorkbenchDownloadFileSuccess, StagingCurationWorkbenchUploadFile, StagingCurationWorkbenchUploadFileFail, StagingCurationWorkbenchUploadFileSuccess } from './../actions/staging-curation.actions';
import { OverlayModule } from "@angular/cdk/overlay"
import { CommonModule } from "@angular/common"
import { HttpClientModule } from "@angular/common/http"
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { MatSnackBar } from "@angular/material/snack-bar"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { provideMockActions } from "@ngrx/effects/testing"
import { Store } from "@ngrx/store"
import { provideMockStore } from "@ngrx/store/testing"
import { Observable, of, throwError } from "rxjs"
import { MessageService } from "src/app/shared/services"
import { ItemToProductService } from "../../services/item-to-product.service"
import { GetStagingProductItemForView, GetStagingProductItemForViewSuccess, GetStagingProductsForCuration, GetStagingProductsForCurationFail, GetStagingProductsForCurationSuccess } from "../actions"
import { initialState } from "../reducers/staging-curation.reducer"
import { StagingCurationEffects } from "./staging-curation.effects"

describe("Effects : StagingCuration WB", () => {
    let actions$: Observable<any>
    let effects: StagingCurationEffects
    let store: Store
    let ItemProductService: ItemToProductService
  
    const successResponse = {status:201,message:'Staging Curation Data Retrieve Successfully'};
    const failedResponse = {status:400,message:'Failed to Make API Request'};
    const failedResponseWOMessage = {status:400};
    const successResponseWOMessage = {status:400};

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
         StagingCurationEffects,
          MatSnackBar,
          MessageService,
          provideMockActions(() => actions$),
          provideMockStore({initialState})
        ],
        imports: [BrowserAnimationsModule,CommonModule,HttpClientModule, OverlayModule],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      })
      ItemProductService = TestBed.inject(ItemToProductService)
      effects = TestBed.inject(StagingCurationEffects)
      store = TestBed.inject(Store)
    })

     it("should call retrieveProductStagingCurationUNSPSCs and return success", (done) => {
        spyOn(ItemProductService, "retrieveProductUNSPSCsForCuration").and.returnValue(of(successResponse))
        actions$ = of(GetStagingProductsForCuration);
        effects.GetStagingProductsForCuration$.subscribe(res => {
          expect(ItemProductService.retrieveProductUNSPSCsForCuration).toHaveBeenCalled()
          expect(res).toEqual(GetStagingProductsForCurationSuccess({payload:successResponse}))
          done()
        })
      })

      
     it("should call retrieveProductStagingCurationUNSPSCs and return Failed", (done) => {
        spyOn(ItemProductService, "retrieveProductUNSPSCsForCuration").and.returnValue(throwError({payload:failedResponseWOMessage}))
        actions$ = of(GetStagingProductsForCuration);
        effects.GetStagingProductsForCuration$.subscribe(res => {
          expect(ItemProductService.retrieveProductUNSPSCsForCuration).toHaveBeenCalled()
          expect(res).toEqual(GetStagingProductsForCurationFail({payload:failedResponseWOMessage}))
          done()
        })
      })

      it("should call retrieveProductItemForView and return success", (done) => {
        spyOn(ItemProductService, "retrieveProductItemForView").and.returnValue(of(successResponse))
        actions$ = of(GetStagingProductItemForView({payload:{productID:15}}));
        effects.GetStagingProductItemsForView$.subscribe(res => {
          expect(ItemProductService.retrieveProductItemForView).toHaveBeenCalled()
          expect(res).toEqual(GetStagingProductItemForViewSuccess({payload:successResponse}))
          done()
        })
      })

        
     it("should call retrieveProductItemForView and return Failed", (done) => {
        spyOn(ItemProductService, "retrieveProductItemForView").and.returnValue(throwError({payload:failedResponseWOMessage}))
        actions$ = of(GetStagingProductItemForView({payload:{productID:15}}));
        effects.GetStagingProductItemsForView$.subscribe(res => {
          expect(ItemProductService.retrieveProductItemForView).toHaveBeenCalled()
          expect(res).toEqual(GetStagingProductItemForViewFail({payload:failedResponseWOMessage}))
          done()
        })
      })


      xit("should call StagingCurationWorkbenchDownloadFile and return success", (done) => {
        spyOn(ItemProductService, "downloadStagingCurationWorkbenchFile").and.returnValue(of(successResponse))
        actions$ = of(StagingCurationWorkbenchDownloadFile({payload:{productID:15}}));
        effects.StagingCurationWorkbenchDownloadFile$.subscribe(res => {
          expect(ItemProductService.downloadStagingCurationWorkbenchFile).toHaveBeenCalled()
          expect(res).toEqual(StagingCurationWorkbenchDownloadFileSuccess({payload:successResponse}))
          done()
        })
      })

        
     it("should call StagingCurationWorkbenchDownloadFile and return Failed", (done) => {
        spyOn(ItemProductService, "downloadStagingCurationWorkbenchFile").and.returnValue(throwError({payload:failedResponseWOMessage}))
        actions$ = of(StagingCurationWorkbenchDownloadFile({payload:{productID:15}}));
        effects.StagingCurationWorkbenchDownloadFile$.subscribe(res => {
          expect(ItemProductService.downloadStagingCurationWorkbenchFile).toHaveBeenCalled()
          expect(res).toEqual(StagingCurationWorkbenchDownloadFileFail({payload:failedResponseWOMessage}))
          done()
        })
      })


      it("should call StagingCurationWorkbenchUploadFile and return success", (done) => {
        spyOn(ItemProductService, "uploadStagingCurationWorkbenchFile").and.returnValue(of(successResponse))
      //  spyOn(ItemProductService, "redirectToTaskInbox").and.returnValue(true);
        actions$ = of(StagingCurationWorkbenchUploadFile({payload:{productID:15}}));
        effects.StagingCurationWorkbenchUploadFile$.subscribe(res => {
          expect(ItemProductService.uploadStagingCurationWorkbenchFile).toHaveBeenCalled()
         // expect(ItemProductService.redirectToTaskInbox).toHaveBeenCalled();
       //   expect(res).toEqual(StagingCurationWorkbenchUploadFileSuccess({payload:successResponse}))
          done()
        })
      })

       
     it("should call StagingCurationWorkbenchUploadFile and return Failed", (done) => {
        spyOn(ItemProductService, "uploadStagingCurationWorkbenchFile").and.returnValue(throwError({payload:failedResponseWOMessage}))
        actions$ = of(StagingCurationWorkbenchUploadFile({payload:{productID:15}}));
        effects.StagingCurationWorkbenchUploadFile$.subscribe(res => {
          expect(ItemProductService.uploadStagingCurationWorkbenchFile).toHaveBeenCalled()
          expect(res).toEqual(StagingCurationWorkbenchUploadFileFail({payload:failedResponseWOMessage}))
          done()
        })
      })

      xit("should call StagingCurationTaskSubmission and return Success", (done) => {
        spyOn(ItemProductService, "stagingCurationTaskSubmission").and.returnValue(of(successResponse))
        spyOn(ItemProductService, "redirectToTaskInbox").and.returnValue();
        actions$ = of(StagingCurationTaskSubmission({payload:{productID:15}}));
        effects.StagingCurationTaskSubmission$.subscribe(res => {
          expect(ItemProductService.stagingCurationTaskSubmission).toHaveBeenCalled()
          expect(ItemProductService.redirectToTaskInbox).toHaveBeenCalled();
          expect(res).toEqual(StagingCurationTaskSubmissionSuccess({payload:successResponse}))
          done()
        })
      })

      xit("should call StagingCurationTaskSubmission and return Success", (done) => {
        spyOn(ItemProductService, "stagingCurationTaskSubmission").and.returnValue(of(successResponseWOMessage))
        spyOn(ItemProductService, "redirectToTaskInbox").and.returnValue();
        actions$ = of(StagingCurationTaskSubmission({payload:{productID:15}}));
        effects.StagingCurationTaskSubmission$.subscribe(res => {
          expect(ItemProductService.stagingCurationTaskSubmission).toHaveBeenCalled()
          expect(ItemProductService.redirectToTaskInbox).toHaveBeenCalled();
          expect(res).toEqual(StagingCurationTaskSubmissionSuccess({payload:successResponseWOMessage}))
          done()
        })
      })

      it("should call StagingCurationTaskSubmission and return Failed", (done) => {
        spyOn(ItemProductService, "stagingCurationTaskSubmission").and.returnValue(throwError({payload:failedResponseWOMessage}))
        actions$ = of(StagingCurationTaskSubmission({payload:{productID:15}}));
        effects.StagingCurationTaskSubmission$.subscribe(res => {
          expect(ItemProductService.stagingCurationTaskSubmission).toHaveBeenCalled()
          expect(res).toEqual(StagingCurationTaskSubmissionFail({payload:failedResponseWOMessage}))
          done()
        })
      })

      it("should call StagingCurationSaveForLaterOperation and return Success", (done) => {
        spyOn(ItemProductService, "stagingCurationSaveForLater").and.returnValue(of(successResponseWOMessage))
        actions$ = of(StagingCurationSaveForLaterWB({payload:{productID:15}}));
        effects.StagingCurationSaveForLaterOperation$.subscribe(res => {
          expect(ItemProductService.stagingCurationSaveForLater).toHaveBeenCalled()
          expect(res).toEqual(StagingCurationSaveForLaterWBSuccess({payload:successResponseWOMessage}))
          done()
        })
      })

      it("should call StagingCurationSaveForLaterOperation and return fail response", (done) => {
        spyOn(ItemProductService, "stagingCurationSaveForLater").and.returnValue(throwError({payload:failedResponseWOMessage}))
        actions$ = of(StagingCurationSaveForLaterWB({payload:{productID:15}}));
        effects.StagingCurationSaveForLaterOperation$.subscribe(res => {
          expect(ItemProductService.stagingCurationSaveForLater).toHaveBeenCalled()
          expect(res).toEqual(StagingCurationSaveForLaterWBFail({payload:failedResponseWOMessage}))
          done()
        })
      })


      it("should call GetProductsForFinalReview and return Success", (done) => {
        spyOn(ItemProductService, "retrieveProductUNSPSCsForFinalReview").and.returnValue(of(successResponseWOMessage))
        actions$ = of(GetStagingCurationFinalProductForReview({payload:{productID:15}}));
        effects.GetProductsForFinalReview$.subscribe(res => {
          expect(ItemProductService.retrieveProductUNSPSCsForFinalReview).toHaveBeenCalled()
          expect(res).toEqual(GetStagingCurationFinalProductForReviewSuccess({payload:successResponseWOMessage}))
          done()
        })
      })

      it("should call GetProductsForFinalReview and return Success", (done) => {
        spyOn(ItemProductService, "retrieveProductUNSPSCsForFinalReview").and.returnValue(throwError({payload:failedResponseWOMessage}))
        actions$ = of(GetStagingCurationFinalProductForReview({payload:{productID:15}}));
        effects.GetProductsForFinalReview$.subscribe(res => {
          expect(ItemProductService.retrieveProductUNSPSCsForFinalReview).toHaveBeenCalled()
          expect(res).toEqual(GetStagingCurationFinalProductForReviewFail({payload:failedResponseWOMessage}))
          done()
        })
      })

      it("should call SubmitFinalConfirmationStaging and return Success", (done) => {
        spyOn(ItemProductService, "submitFinalConfirmationRecords").and.returnValue(of(successResponseWOMessage))
        actions$ = of(StagingCurationSubmitFinalConfirmation({payload:{productID:15}}));
        effects.SubmitFinalConfirmationStaging$.subscribe(res => {
          expect(ItemProductService.submitFinalConfirmationRecords).toHaveBeenCalled()
        //  expect(res).toEqual(GetStagingCurationFinalProductForReviewSuccess({payload:successResponseWOMessage}))
          done()
        })
      })

      it("should call SubmitFinalConfirmationStaging and return Fail", (done) => {
        spyOn(ItemProductService, "submitFinalConfirmationRecords").and.returnValue(throwError({payload:failedResponseWOMessage}))
        actions$ = of(StagingCurationSubmitFinalConfirmation({payload:{productID:15}}));
        effects.SubmitFinalConfirmationStaging$.subscribe(res => {
          expect(ItemProductService.submitFinalConfirmationRecords).toHaveBeenCalled()
          expect(res).toEqual(StagingCurationSubmitFinalConfirmationFail({payload:failedResponseWOMessage}))
          done()
        })
      })


})