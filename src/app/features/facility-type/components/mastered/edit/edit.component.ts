import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApplicationState, getUserProfile } from './../../../../../store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FacilityTypeService } from '../../../services/facility-type.service';
import { CommonActionsEnum, UpdateMasteredRecord } from '../../../store/actions';
import { FacilityTypeState } from '../../../store/reducers';
import { getOntologyMappings, getUpdateMasteredRecordLoader } from '../../../store/selectors';

declare let jsonata: any;
@Component({
  selector: 'app-edit-facility-mastered-record',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditComponent>,
    private facilityTypeService: FacilityTypeService,
    private readonly store: Store<FacilityTypeState>,
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
      id: this.data.facilityInternalId,
      value: this.facilityTypeService.getMappingValue(this.data)
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
      const values = this.mapping.value.split('|');
      this.dialogRef.close({
        facilityInternalId: this.mapping.id,
        internalFacilityGroupDesc: values[0].trim(),
        internalFacilitySubgroupDesc: values.length > 1 ? values[1].trim() : ''
      });
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
    const values = this.mapping.value.split('|');
    return {
      comments: this.commentCtrl.value,
      internalFacilityGroupDesc: values[0].trim(),
      internalFacilitySubgroupDesc: values.length > 1 ? values[1].trim() : '',
      facilityInternalId: this.mapping.id,
      facilityTypePguid: this.data.facilityTypePguid,
      facilityMapId: this.data.facilityMapId,
      userName: this.userName
    };
  }
}
