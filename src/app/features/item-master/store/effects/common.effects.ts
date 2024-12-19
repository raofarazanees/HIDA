import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MessageService } from './../../../../shared/services';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ItemMasterService } from '../../services/item-master.service';

import {
  CommonActionsEnum,
  GetChangeLogByMapIDFail,
  GetChangeLogByMapIDSuccess,
  GetRejectLogByitemPGUIDFail,
  GetRejectLogByitemPGUIDSuccess,
  GetUnmasteredDataFail,
  GetUnmasteredDataSuccess,
  GetUNSPSCAttributeExtensionsFail,
  GetUNSPSCAttributeExtensionsSuccess,
  GetUNSPSCForTreeViewFail,
  GetUNSPSCForTreeViewSuccess,
  GetUNSPSCSearchForTreeViewFail,
  GetUNSPSCSearchForTreeViewSuccess,
  SaveForLaterUnmasteredRecordsFail,
  SaveForLaterUnmasteredRecordsSuccess,
  SubmitUnmasteredRecordsFail,
  SubmitUnmasteredRecordsSuccess,
  UnmasteredActionsEnum,
  UpdateMasteredRecordFail,
  UpdateMasteredRecordSuccess
} from '../actions';

declare let jsonata: any;
@Injectable()
export class CommonEffects {
  @Effect() getOntologyMappings$ = this.actions$.pipe(
    ofType(CommonActionsEnum.GET_UNMASTERED_DATA),
    switchMap((action: any) =>
      this.itemMasterService.getUnmasteredRecords(action.payload).pipe(
        map((response) => new GetUnmasteredDataSuccess(response)),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to fetching the Unmastered Records.', 'warn');
          return of(new GetUnmasteredDataFail(error));
        })
      )
    )
  );

  @Effect() getUNSPSCAttributeExtensions$ = this.actions$.pipe(
    ofType(CommonActionsEnum.GET_UNSPSC_ATTRIBUTE_EXTENSIONS),
    switchMap(() =>
      this.itemMasterService.getUNSPSCAttributeExtensions().pipe(
        map((response) => new GetUNSPSCAttributeExtensionsSuccess(response)),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to fetch the UNSPSC Attribute Extensions.', 'warn');
          return of(new GetUNSPSCAttributeExtensionsFail(error));
        })
      )
    )
  );

  @Effect() saveForLaterUnmasteredRecords$ = this.actions$.pipe(
    ofType(UnmasteredActionsEnum.SAVEFORLATER_UNMASTERED_RECORD),
    switchMap((action: any) =>
      this.itemMasterService.saveForLater(action.payload, action.taskType).pipe(
        map((response) => new SaveForLaterUnmasteredRecordsSuccess(response)),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to fetching the Unmastered Records.', 'warn');
          return of(new SaveForLaterUnmasteredRecordsFail());
        })
      )
    )
  );

  @Effect() submitUnmasteredRecords$ = this.actions$.pipe(
    ofType(UnmasteredActionsEnum.SUBMIT_UNMASTERED_RECORDS),
    switchMap((action: any) =>
      this.itemMasterService.submitTask(action.payload, action.taskType).pipe(
        map((response) => new SubmitUnmasteredRecordsSuccess(response)),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'An error occured while submiting the records', 'warn');
          return of(new SubmitUnmasteredRecordsFail());
        })
      )
    )
  );

  @Effect() onMasteredRecordUpdate$ = this.actions$.pipe(
    ofType(CommonActionsEnum.UPDATE_MASTERED_RECORD),
    switchMap((action: any) =>
      this.itemMasterService.updateMasteredRecord(action.payload).pipe(
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

  @Effect() getChangeLogMapID$ = this.actions$.pipe(
    ofType(CommonActionsEnum.GET_CHANGE_LOG_BY_MAPID),
    switchMap((action: any) =>
      this.itemMasterService.getMasteredMapIDChangeLog(action.payload).pipe(
        map((response) => new GetChangeLogByMapIDSuccess(response)),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to fetch the Change Log', 'warn');
          return of(new GetChangeLogByMapIDFail(error));
        })
      )
    )
  );

  @Effect() getUnspscForTreeView$ = this.actions$.pipe(
    ofType(CommonActionsEnum.GET_UNSPSC_FOR_TREE_VIEW),
    switchMap((action: any) =>
      this.itemMasterService.getUNSPSCForTreeView(action.payload).pipe(
        map((response) => new GetUNSPSCForTreeViewSuccess(response, action.isRoot)),
        catchError((error) => {
          const msg: string = action.isRoot ? 'Failed to load UnSPSC data.' : 'Failed to load sub levels. Please try again..!';
          this.messageService.showToast(jsonata('message').evaluate(error) || msg, 'error');
          return of(new GetUNSPSCForTreeViewFail(error, action.isRoot));
        })
      )
    )
  );

  @Effect() getUnspscSearchForTreeView$ = this.actions$.pipe(
    ofType(CommonActionsEnum.GET_UNSPSC_SEARCH_FOR_TREE_VIEW),
    switchMap((action: any) =>
      this.itemMasterService.getUNSPSCSearchForTreeView(action.payload).pipe(
        map((response) => new GetUNSPSCSearchForTreeViewSuccess(response)),
        catchError((error) => {
          this.messageService.showToast(
            jsonata('message').evaluate(error) || 'Failed to load search results. Please try again..!',
            'error'
          );
          return of(new GetUNSPSCSearchForTreeViewFail({}));
        })
      )
    )
  );

  @Effect() getRejectLogByitemPGUID$ = this.actions$.pipe(
    ofType(CommonActionsEnum.GET_REJECT_LOG_BY_ITEM_PGUID),
    switchMap((action: any) =>
      this.itemMasterService.getUNSPSCClientCorrectionRejectedInfo(action.payload).pipe(
        map((response) => new GetRejectLogByitemPGUIDSuccess(response)),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to fetch the Reject Log', 'warn');
          return of(new GetRejectLogByitemPGUIDFail(error));
        })
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly itemMasterService: ItemMasterService,
    private readonly messageService: MessageService
  ) {}
}
