import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApplicationState, CommonActionsEnum, UpdateTaskDetails } from 'src/app/store';
import { itemMasterMessages } from '../../../modal/item-master-messages.constants';
import { matStep } from '../../../modal/submission.modal';
import { SaveForLaterUnmasteredRecords, SubmitUnmasteredRecords, UnmasteredActionsEnum } from '../../../store/actions';
import { ItemMasterState } from '../../../store/reducers';
import { SubmissionDialogService } from './submission-dialog.service';

@Component({
  selector: 'app-submission-dialog',
  templateUrl: './submission-dialog.component.html',
  styleUrls: ['./submission-dialog.component.scss']
})
export class SubmissionDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('stepper') stepper: MatStepper;
  showFinal: boolean = false;
  finalStepMessage: string = '';
  stepList: matStep[] = [];
  isEscalate: boolean = false;

  private readonly destroyed$ = new Subject<boolean>();

  constructor(
    public dialogRef: MatDialogRef<SubmissionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private submissionService: SubmissionDialogService,
    protected actions$: Actions,
    private readonly store: Store<ItemMasterState>,
    private readonly appStore: Store<ApplicationState>
  ) {}

  ngOnInit() {
    this.isEscalate = this.data.totalRecords !== this.data.totalConfirmedRecords;
    this.stepList = this.submissionService.generateStepList(this.data);
    this.initChangeListners();
  }

  ngAfterViewInit(): void {
    this.callApiforStep(0);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private callApiforStep(index: number): void {
    this.stepper.selectedIndex = index;
    switch (this.stepList[index].key) {
      case 'saveForLater':
        this.store.dispatch(new SaveForLaterUnmasteredRecords(this.data.updatedRecords, this.data.saveForLaterPayload, this.data.taskType));
        break;
      case 'submit':
        this.store.dispatch(new SubmitUnmasteredRecords(this.data.submitPayload, this.data.taskType));
        break;
      default:
        this.updateTask();
        break;
    }
  }

  private updateTask(): void {
    this.finalStepMessage = this.isEscalate ? itemMasterMessages.tasknavigationOnEscalte : itemMasterMessages.tasknavigationOnComplete;
    this.appStore.dispatch(
      new UpdateTaskDetails(
        {
          ...this.data.taskDetails,
          status: this.isEscalate ? 'ESCALATED' : 'COMPLETED',
          action: 'UPDATE'
        },
        false
      )
    );
  }
  private initChangeListners(): void {
    this.initSaveForLaterChangeListners();
    this.initSubmitChangeListners();
    this.initUpdateTaskChangeListners();
  }

  private initSaveForLaterChangeListners(): void {
    const index = this.stepList.findIndex((step) => step.key === 'saveForLater');
    this.actions$
      .pipe(takeUntil(this.destroyed$), ofType(UnmasteredActionsEnum.SAVEFORLATER_UNMASTERED_RECORD_SUCCESS))
      .subscribe(({ message }: any) => {
        this.getNextStep(index);
      });
    this.actions$
      .pipe(takeUntil(this.destroyed$), ofType(UnmasteredActionsEnum.SAVEFORLATER_UNMASTERED_RECORD_FAIL))
      .subscribe(({ message }: any) => {
        this.stepList[index].isError = true;
        this.closeDialog();
      });
  }

  private initSubmitChangeListners(): void {
    const index = this.stepList.findIndex((step) => step.key === 'submit');
    this.actions$
      .pipe(takeUntil(this.destroyed$), ofType(UnmasteredActionsEnum.SUBMIT_UNMASTERED_RECORDS_SUCCESS))
      .subscribe(({ message }: any) => {
        this.getNextStep(index);
      });
    this.actions$
      .pipe(takeUntil(this.destroyed$), ofType(UnmasteredActionsEnum.SUBMIT_UNMASTERED_RECORDS_FAIL))
      .subscribe(({ message }: any) => {
        this.stepList[index].isError = true;
        this.closeDialog();
      });
  }

  private initUpdateTaskChangeListners(): void {
    this.actions$
      .pipe(takeUntil(this.destroyed$), ofType(CommonActionsEnum.UPDATE_TASK_DETAILS_SUCCESS))
      .subscribe(({ payload, redirectionPath }) => {
        this.showFinal = true;
        this.stepper.selectedIndex = this.stepList.length;
        if (!this.isEscalate) {
          window.open(redirectionPath, '_self');
        }
        this.closeDialog();
      });
    this.actions$.pipe(takeUntil(this.destroyed$), ofType(CommonActionsEnum.UPDATE_TASK_DETAILS_FAIL)).subscribe((status) => {
      const key = status === 'COMPLETED' ? 'complete' : 'escalate';
      const index = this.stepList.findIndex((step) => step.key === key);
      this.stepList[index].isError = true;
      // this.closeDialog();
    });
  }

  private getNextStep(index: number): void {
    index < this.stepList.length - 1 && this.callApiforStep(index + 1);
  }

  private closeDialog(): void {
    setTimeout(() => {
      this.dialogRef.close();
    }, 3000);
  }
}
