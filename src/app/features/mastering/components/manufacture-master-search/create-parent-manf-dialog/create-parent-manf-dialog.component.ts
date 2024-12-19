import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { manfMasterState } from '../../../store/reducers';
import { Store } from '@ngrx/store';
import { CreateParentManfRecord, CloseDialogAt as closeDialogAt } from '../../../store/actions';
import { CloseDialogAt } from '../../../store/selectors';
import { distinctUntilChanged, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create-parent-manf-dialog',
  templateUrl: './create-parent-manf-dialog.component.html',
  styleUrls: ['./create-parent-manf-dialog.component.scss']
})
export class CreateParentManfDialogComponent implements OnInit {
  parentManfForm!: FormGroup;
  public readonly destroyed$ = new Subject<boolean>();

  constructor(
    public dialogRef: MatDialogRef<CreateParentManfDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { createdBy: string; parentName: string,appendToId?:string,appendFor?:string},
    public fb: FormBuilder,
    private readonly store: Store<manfMasterState>
  ) {}

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngOnInit() {
    const isParentHasName = this.data.parentName ? this.data.parentName : '';
    this.parentManfForm = this.fb.group({
      createdBy: [this.data.createdBy, [Validators.required]],
      parentManfName: [isParentHasName, [Validators.required]]
    });

    this.store
      .select(CloseDialogAt)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((data) => data.date != 0 && data.dialogType == 'parent')
      )
      .subscribe((res) => {
        this.dialogRef.close();
        setTimeout(() => {
          this.store.dispatch(closeDialogAt({ date: 0, dialogType: '' }));
        }, 200);
      });
  }

  get parentManfName() {
    return this.parentManfForm.get('parentManfName');
  }

  onNoClick(): void {
    this.dialogRef.close({ parentName: this.data.parentName });
  }

  submitParentForm(): void {
    if (this.parentManfForm.valid) {
      this.store.dispatch(CreateParentManfRecord({ payload: {parentManfData:this.parentManfForm.value,autoAppendFor: {id:this.data?.appendToId || '',appendFor:this.data?.appendFor || ''}}}));
    } else {
      Object.values(this.parentManfForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
