import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MessageService } from './../../../../shared/services';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { FacilityTypeService } from '../../services/facility-type.service';

import {
  CommonActionsEnum,
  GetChangeLogByMapIDFail,
  GetChangeLogByMapIDSuccess,
  GetOntologyMappingsFail,
  GetOntologyMappingsSuccess,
  UpdateMasteredRecordFail,
  UpdateMasteredRecordSuccess
} from '../actions';

declare let jsonata: any;
@Injectable()
export class CommonEffects {
  @Effect() getOntologyMappings$ = this.actions$.pipe(
    ofType(CommonActionsEnum.GET_ONTOLOGY_MAPPINGS),
    switchMap((action: any) =>
      this.facilityTypeService.getAllMappingValues(action.payload).pipe(
        map((response) => new GetOntologyMappingsSuccess(response)),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to fetch the Mappings from Ontology.', 'warn');
          return of(new GetOntologyMappingsFail(error));
        })
      )
    )
  );

  @Effect() getChangeLogMapID$ = this.actions$.pipe(
    ofType(CommonActionsEnum.GET_CHANGE_LOG_BY_MAPID),
    switchMap((action: any) =>
      this.facilityTypeService.getMasteredMapIDChangeLog(action.payload).pipe(
        map((response) => new GetChangeLogByMapIDSuccess(response)),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to fetch the Change Log', 'warn');
          return of(new GetChangeLogByMapIDFail(error));
        })
      )
    )
  );

  @Effect() onMasteredRecordUpdate$ = this.actions$.pipe(
    ofType(CommonActionsEnum.UPDATE_MASTERED_RECORD),
    switchMap((action: any) =>
      this.facilityTypeService.updateMasteredRecord(action.payload).pipe(
        map((response: any) => {
          this.messageService.showToast(response.message, 'Close');
          return new UpdateMasteredRecordSuccess();
        }),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'An error occured while updating the record', 'warn');
          return of(new UpdateMasteredRecordFail());
        })
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly facilityTypeService: FacilityTypeService,
    private readonly messageService: MessageService
  ) {}
}
