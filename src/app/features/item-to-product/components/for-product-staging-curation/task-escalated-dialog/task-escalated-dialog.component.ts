import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ApplicationState, CommonActionsEnum, UpdateTaskDetails } from '@app-store';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { itemMasterMessages } from 'src/app/features/item-master/modal/item-master-messages.constants';
import { StagingCurationSaveForLaterWB, StagingEum } from '../../../store/actions';
import { StagingCurationState } from '../../../store/reducers';
import { stepList, stepListCompleteTask } from './escalated.constants';

@Component({
  selector: 'app-task-escalated-dialog',
  templateUrl: './task-escalated-dialog.component.html',
  styleUrls: ['./task-escalated-dialog.component.scss']
})
export class TaskEscalatedDialogComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  stepList: any[];
  finalStepMessage: string = '';
  showFinal: boolean = false;
  finalMessage:string ='';
  private readonly destroyed$ = new Subject<boolean>();
  constructor(
    public dialogRef: MatDialogRef<TaskEscalatedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected actions$: Actions,
    private readonly appStore: Store<ApplicationState>,
    private readonly StagingStore: Store<StagingCurationState>,   
    private readonly cd: ChangeDetectorRef,

  ) {}

  ngOnInit() {
   
   if(this.data?.isDialogFor && this.data?.isDialogFor == 'complete') {
      this.stepList = stepListCompleteTask;
   } else {
    this.stepList = stepList;
   }
   this.initChangeListeners();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }


  ngAfterViewInit() {
    if(this.data?.isDialogFor && this.data?.isDialogFor == 'complete') {
      this.makeAPICallsForStepsComplete(0);
    } else {
      this.makeAPICallsForSteps(0);

    }
  }

  private initChangeListeners(): void {
    this.initSaveForLaterChangeListeners();
    //this.initChangeListenersForTaskSubmission();
    this.initUpdateTaskChangeListners();
  }

  private initSaveForLaterChangeListeners(): void {
    const index = this.stepList.findIndex((step) => step.key === 'submit' || step.key === 'save');
    this.actions$.pipe(takeUntil(this.destroyed$), ofType(StagingEum.STAGING_CURATION_SAVE_FOR_LATER_WB_SUCCESS)).subscribe(({ message }: any) => {
     this.getNextStep(index);
    });
    this.actions$
      .pipe(takeUntil(this.destroyed$), ofType(StagingEum.STAGING_CURATION_SAVE_FOR_LATER_WB_FAIL))
      .subscribe(({ message }: any) => {
        this.stepList[index].isError = true;
        this.cd.detectChanges();
        this.closeDialog();
      });
  }

  private initChangeListenersForTaskSubmission(): void {
    // const index = this.stepList.findIndex((step) => step.key === 'save');
    // this.actions$.pipe(takeUntil(this.destroyed$), ofType(StagingEum.STAGING_CURATION__SUBMIT_FINAL_RECORDS)).subscribe(({ message }: any) => {
    //  this.getNextStep(index);
    // });
    // this.actions$
    //   .pipe(takeUntil(this.destroyed$), ofType(StagingEum.STAGING_CURATION__SUBMIT_FINAL_RECORDS_FAIL))
    //   .subscribe(({ message }: any) => {
    //     this.stepList[index].isError = true;
    //     this.cd.detectChanges();
    //     this.closeDialog();
    //   });
  }

  private initUpdateTaskChangeListners(): void {
    this.actions$
      .pipe(takeUntil(this.destroyed$), ofType(CommonActionsEnum.UPDATE_TASK_DETAILS_SUCCESS))
      .subscribe(({ payload, redirectionPath }) => {
        this.showFinal = true;
        this.stepper.selectedIndex = this.stepList.length;
        this.closeDialog();
      });
    this.actions$.pipe(takeUntil(this.destroyed$), ofType(CommonActionsEnum.UPDATE_TASK_DETAILS_FAIL)).subscribe((status) => {
      const key = status === 'COMPLETED' ? 'complete' : 'escalate';
      const index = this.stepList.findIndex((step) => step.key === key);
      this.stepList[index].isError = true;
      this.cd.detectChanges();
      this.closeDialog();
    });
  }

  private getNextStep(index) {
    index < this.stepList.length - 1 &&  (this.data?.isDialogFor ?  this.makeAPICallsForStepsComplete(index + 1) : this.makeAPICallsForSteps(index + 1));
  }

  private makeAPICallsForSteps(index: number): void {
    this.stepper.selectedIndex = index;
    switch (this.stepList[index].key) {
      case 'submit':
        this.StagingStore.dispatch(StagingCurationSaveForLaterWB({ payload: this.data.dataToSave }));
        break;
      case 'escalate':
        this.updateTask('ESCALATED');
        break;
    }
  }

  private makeAPICallsForStepsComplete(index: number): void {
    this.stepper.selectedIndex = index;
    switch (this.stepList[index].key) {
      case 'save':
        this.StagingStore.dispatch(StagingCurationSaveForLaterWB({ payload: this.data.dataToSave }));
        break;
      case 'complete':
        this.updateTask('COMPLETED');
        break;
    }
  }
  private updateTask(status: string): void {
    this.finalMessage = status == 'COMPLETED' ? itemMasterMessages.tasknavigationOnComplete : itemMasterMessages.tasknavigationOnEscalte;
    this.appStore.dispatch(
      new UpdateTaskDetails(
        {
          ...this.data.taskDetails,
          status: status,
          action: 'UPDATE'
        },
        true
      )
    );
  }

  private closeDialog(): void {
    setTimeout(() => {
      this.dialogRef.close();
    }, 3000);
  }
}
