import { Observable, of, throwError } from "rxjs"
import { ToolsFilterEffects } from "./manf-master.effects"
import { Store } from "@ngrx/store"
import { ToolsFilterService } from "../../services/tools-filter.service"
import { TestBed } from "@angular/core/testing"
import { initialState } from "../../model/manf-master-models/interface/manf-master.interface"
import { provideMockStore } from "@ngrx/store/testing"
import { MessageService } from "src/app/shared/services"
import { MatSnackBar } from "@angular/material/snack-bar"
import { provideMockActions } from "@ngrx/effects/testing"
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core"
import { CommonModule } from "@angular/common"
import { HttpClientModule } from "@angular/common/http"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { OverlayModule } from "@angular/cdk/overlay"
import { CreateParentManfRecordFail, CreateParentManfRecordSuccess, GetParentManfRecords } from "../actions"

xdescribe("Effects : StagingCuration WB", () => {
    let actions$: Observable<any>
    let effects: ToolsFilterEffects
    let store: Store
    let ToolsFilterService_: ToolsFilterService
  
    const successResponse = {status:201,message:'Staging Curation Data Retrieve Successfully'};
    const failedResponse = {status:400,message:'Failed to Make API Request'};
    const failedResponseWOMessage = {status:400};
    const successResponseWOMessage = {status:400};

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          ToolsFilterEffects,
          MatSnackBar,
          MessageService,
          provideMockActions(() => actions$),
          provideMockStore({initialState})
        ],
        imports: [BrowserAnimationsModule,CommonModule,HttpClientModule, OverlayModule],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      })
      ToolsFilterService_ = TestBed.inject(ToolsFilterService)
      effects = TestBed.inject(ToolsFilterEffects)
      store = TestBed.inject(Store)
    })

     it("should call createNewParentManfRecord and return success", (done) => {
        spyOn(ToolsFilterService_, "createNewParentManfRecord").and.returnValue(of(successResponse))
        actions$ = of(GetParentManfRecords);
        effects.CreateParentMasterRecord$.subscribe(res => {
          expect(ToolsFilterService_.createNewParentManfRecord).toHaveBeenCalled()
          expect(res).toEqual(CreateParentManfRecordSuccess({payload:successResponse}))
          done()
        })
      })

      it("should call createNewParentManfRecord and return success", (done) => {
        spyOn(ToolsFilterService_, "createNewParentManfRecord").and.returnValue(throwError({payload:failedResponseWOMessage}))
        actions$ = of(GetParentManfRecords);
        effects.CreateParentMasterRecord$.subscribe(res => {
          expect(ToolsFilterService_.createNewParentManfRecord).toHaveBeenCalled()
          expect(res).toEqual(CreateParentManfRecordFail({payload:successResponse}))
          done()
        })
      })

    
})