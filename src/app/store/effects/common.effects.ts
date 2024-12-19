import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  ChangeRouteStateFailed,
  ChangeUserProfileState,
  CommonActionsEnum,
  GetTaskDetails,
  GetTaskDetailsFail,
  GetTaskDetailsSuccess,
  UpdateTaskDetailsFail,
  UpdateTaskDetailsSuccess
} from '../actions';
import { MessageService } from './../../shared/services/message/message.service';
import { TaskInboxService } from './../../shared/services/task-inbox/task-inbox.service';
import { UserProfileService } from '@sgty/services/userprofile';
import { environment } from 'src/environments/environment';

declare let jsonata: any;

@Injectable()
export class CommonEffects {
  @Effect() getCTaskDetails$ = this.actions$.pipe(
    ofType(CommonActionsEnum.GET_TASK_DETAILS),
    switchMap((action: any) =>
      this.taskInboxService.getTaskDetails(action.payload.taskId, action.payload.workflowId).pipe(
        map((response) => {
          if (!response) {
            this.messageService.showToast('No task found or task returned empty', 'warn');
            return new GetTaskDetailsFail(response);
          }
          return new GetTaskDetailsSuccess(response);
        }),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'Unable to fetch the Task Details.', 'warn');
          return of(new GetTaskDetailsFail(error));
        })
      )
    )
  );

  @Effect() onRouteChange$ = this.actions$.pipe(
    ofType(CommonActionsEnum.ROUTE_STATE_CHANGE),
    switchMap((action: any) => {
      if (action.payload.taskId && action.payload.workflowId) {
        return of(new GetTaskDetails(action.payload));
      } else {
     //   this.messageService.showToast('TaskId and WorkflowId missing in the url', 'warn');
      return of(new ChangeRouteStateFailed(false));
      }
    })
  );

  @Effect() onTaskUpdate$ = this.actions$.pipe(
    ofType(CommonActionsEnum.UPDATE_TASK_DETAILS),
    switchMap((action: any) =>
      this.taskInboxService.updateTaskDetails(action.payload).pipe(
        map((response) => {
          const redirectionPath = `${environment.taskInboxApp}/embedui/taskmgmt/index.html#/taskinbox${
            sessionStorage.getItem('currentPath') ? sessionStorage.getItem('currentPath') : '/TaskList/New'
          }`;
          if (action.redirect) {
            window.open(redirectionPath, '_self');
          }
          return new UpdateTaskDetailsSuccess(response, redirectionPath);
        }),
        catchError((error) => {
          this.messageService.showToast(jsonata('message').evaluate(error) || 'An error occured while updating the task', 'warn');
          return of(new UpdateTaskDetailsFail(action.payload.status));
        })
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly taskInboxService: TaskInboxService,
    private readonly messageService: MessageService
  ) {}
}
