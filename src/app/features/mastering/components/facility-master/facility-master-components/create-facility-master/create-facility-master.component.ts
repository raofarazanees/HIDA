import { Component, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, filter } from 'rxjs/operators';
import { manfMasterState, facilityMasterState } from 'src/app/features/mastering/store/reducers';
import { CreateParentManfDialogComponent } from '../../../manufacture-master-search/create-parent-manf-dialog/create-parent-manf-dialog.component';
import { CreateFacilityMasterRecords, CloseDialogAt as closeDialogAt } from './../../../../store/actions';
import { CloseDialogAt } from '../../../../store/selectors';

@Component({
  selector: 'app-create-facility-master',
  templateUrl: './create-facility-master.component.html',
  styleUrls: ['./create-facility-master.component.scss']
})
export class CreateFacilityMasterComponent implements OnInit {
  facilityMasterForm!: FormGroup;
  public readonly destroyed$ = new Subject<boolean>();
  @ViewChild('inputFacilitySubGrpName', { read: ViewContainerRef }) public input: ViewContainerRef;

  constructor(
    public dialogRef: MatDialogRef<CreateParentManfDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { createdBy: string; name: string,appendToId?:string,appendFor?:string },
    public fb: FormBuilder,
    private readonly store: Store<manfMasterState>,
    public readonly facilityStore: Store<facilityMasterState>
  ) {}

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngOnInit() {
    this.facilityMasterForm = this.fb.group({
      createdBy: [this.data.createdBy, [Validators.required]],
      facilityGroupName: ['', [Validators.required]],
      facilitySubgroupName: [this.data.name ? this.data.name : '', [Validators.required]]
    });

    this.store
      .select(CloseDialogAt)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((data) => data.date != 0 && data.dialogType === 'facilityMaster')
      )
      .subscribe((res) => {
        this.dialogRef.close();
        setTimeout(() => {
          this.store.dispatch(closeDialogAt({ date: 0, dialogType: '' }));
        }, 200);
      });
  }

  ngAfterViewInit() {
    if (this.data?.name) setTimeout(() => this.input.element.nativeElement.focus(), 300);
  }

  get getGroupName() {
    return this.facilityMasterForm.get('facilityGroupName');
  }
  get getSubGroupName() {
    return this.facilityMasterForm.get('facilitySubgroupName');
  }

  onNoClick(): void {
    this.dialogRef.close({ marketName: this.data.name });
  }

  submitFacilityForm(): void {
    if (this.facilityMasterForm.valid) {
      this.facilityStore.dispatch(CreateFacilityMasterRecords({ payload:{ facilityData:this.facilityMasterForm.value,autoAppendFor: {id:this.data?.appendToId || '',appendFor:this.data?.appendFor || ''}}}) );
    } else {
      Object.values(this.facilityMasterForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
