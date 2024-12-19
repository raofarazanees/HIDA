import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApplicationState, getUserProfile } from './../../../../../store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonActionsEnum, UpdateMasteredRecord } from '../../../store/actions';
import { ManufacturerState } from '../../../store/reducers';
import { getOntologyMappings, getUpdateMasteredRecordLoader } from '../../../store/selectors';

declare let jsonata: any;
@Component({
  selector: 'app-edit-manf-mastered-record',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditComponent>,
    private readonly store: Store<ManufacturerState>,
    private readonly appStore: Store<ApplicationState>,
    protected actions$: Actions
  ) {}

  commentCtrl = new FormControl('');
  mappingOptions = [];
  defaultOption: any;
  isEnabledSubmitButton = false;
  mapping: any;
  loader$: Observable<boolean> = this.store.select(getUpdateMasteredRecordLoader);
  private userName: string;
  private readonly destroyed$ = new Subject<boolean>();

  ngOnInit() {
    this.listenDataChanges();
    this.defaultOption = {
      id: this.data.manufacturerInternalId,
      value: this.data.internalManufacturerDesc
    };
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private listenDataChanges(): void {
    this.store
      .select(getOntologyMappings)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: any) => {
        if (data && data.length) {
          this.mappingOptions = jsonata(`*.([{"value": internalMappingDescription, "id": internalMappingId }])`).evaluate(data);
        }
      });

    this.appStore
      .select(getUserProfile)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((userInfo: any) => {
        this.userName = `${userInfo.lastName}, ${userInfo.firstName}`;
      });

    this.actions$.pipe(takeUntil(this.destroyed$), ofType(CommonActionsEnum.UPDATE_MASTERED_RECORD_SUCCESS)).subscribe(() => {
      this.dialogRef.close(this.mapping);
    });
  }

  update() {
    this.store.dispatch(new UpdateMasteredRecord(this.getPayload()));
  }

  onValueChanged(event: any): void {
    this.mapping = event;
    this.isEnabledSubmitButton = false;
    if (event && event.id && event.value && event.id !== this.defaultOption.id && event.value !== this.defaultOption.value) {
      this.isEnabledSubmitButton = true;
    }
  }

  private getPayload(): any {
    return {
      comments: this.commentCtrl.value,
      internalManufacturerDesc: this.mapping.value,
      manufacturerInternalId: this.mapping.id,
      manufacturerMapId: this.data.manufacturerMapId,
      manufacturerPguid: this.data.manufacturerPguid,
      userName: this.userName
    };
  }
}
