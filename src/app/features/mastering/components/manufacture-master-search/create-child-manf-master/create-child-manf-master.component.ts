import { ChangeDetectorRef, Component, ElementRef, Inject, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, filter, startWith, map } from 'rxjs/operators';
import { manfMasterState } from '../../../store/reducers';
import { CreateChildManfRecord, GetAllActiveManfRecords, CloseDialogAt as closeDialogAt } from '../../../store/actions';
import { CloseDialogAt, GetAllActiveParentManf } from '../../../store/selectors';
import { parentManfData } from '../../../model/manf-master-models/interface/manf-master.interface';
import { activeMappingData } from '../../../model/manf-master-models/ag-grid-columns/parent-manf-column.constants';
import { scopeDefaultValues } from '../../../model/manf-master-models/ag-grid-columns/child-parent-column.constants';
import { CreateParentManfDialogComponent } from '../create-parent-manf-dialog/create-parent-manf-dialog.component';

@Component({
  selector: 'app-create-child-manf-master',
  templateUrl: './create-child-manf-master.component.html',
  styleUrls: ['./create-child-manf-master.component.scss']
})
export class CreateChildManfMasterComponent implements OnInit {
  childManfForm!: FormGroup;
  public readonly destroyed$ = new Subject<boolean>();
  filteredParentManf: Observable<parentManfData[]>;
  ParentManfData: parentManfData[] = [];
  isNoResult: boolean = false;
  defaultYesNoOptions: string[] = activeMappingData;
  scopeOptions: string[] = scopeDefaultValues;
  @ViewChild('inputElement') inputElement: ElementRef;
  currentTypedParentValue: string = '';
  constructor(
    public dialogRef: MatDialogRef<CreateChildManfMasterComponent>,
    private dialogRefService: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { createdBy: string,value?:string,appendToId?:string,appendFor?:string },
    public fb: FormBuilder,
    private readonly store: Store<manfMasterState>,
    private cd:ChangeDetectorRef
  ) {}
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngAfterContentChecked() {
    this.cd.detectChanges();
  }
  ngOnInit() {
    this.store.dispatch(GetAllActiveManfRecords());

    this.childManfForm = this.fb.group({
      childManfCreatedBy: [this.data.createdBy, [Validators.required]],
      childDisplayName:['',[Validators.required]],
      childManfName: [this.data.value ? this.data.value :'', [Validators.required]],
      parentManfName: [''],
      parentManfID: [''],
      blacklistFlag: ['N', [Validators.required]],
    });

    this.filteredParentManf = this.childManfForm.get('parentManfName').valueChanges.pipe(
      startWith(''),
      map((state) => (state ? this._filterParentManf(state) : Array.isArray(this.ParentManfData) ?  this.ParentManfData.slice(0,100): []))
    );
    this.store
      .select(CloseDialogAt)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((data) => data.date != 0 && data.dialogType == 'child')
      )
      .subscribe((res) => {
        this.dialogRef.close();
        setTimeout(() => {
          this.store.dispatch(closeDialogAt({ date: 0, dialogType: '' }));
        }, 200);
      });

    this.store
      .select(GetAllActiveParentManf)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((data: any) => data)
      )
      .subscribe((r: parentManfData[]) => {
        this.ParentManfData = r;
        this.childManfForm.patchValue({ parentManfName: this.currentTypedParentValue });
      });
  }


  get childManfName() {
    return this.childManfForm.get('childManfName');
  }

  get childDisplayName() {
    return this.childManfForm.get('childDisplayName');
  }

  get ParentManfName() {
    return this.childManfForm.get('parentManfName').value;
  }

  handleEmptyInput(e) {
    this.childManfForm.patchValue({ parentManfID: '' });
    this.currentTypedParentValue = e.target.value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitParentForm(): void {
    if (this.childManfForm.valid) {
      const dataToPost = JSON.parse(JSON.stringify(this.childManfForm.value));
      delete dataToPost['parentManfName'];
      this.store.dispatch(CreateChildManfRecord({ payload: {childManfData:dataToPost,autoAppendFor: {id:this.data?.appendToId || '',appendFor:this.data?.appendFor || ''}}} ));
    } else {
      Object.values(this.childManfForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  displayFn(parent: any): string {
    if (typeof parent === 'string' && parent === 'no_result') {
      return this.currentTypedParentValue;
    } else {
      return parent && parent.parentManfName ? parent.parentManfName : this.currentTypedParentValue;
    }
  }

  openCreateParentDialog(val) {
    let dialogRef = this.dialogRefService.open(CreateParentManfDialogComponent, {
      height: '400px',
      width: '500px',
      position: { top: '10px' },
      data: { createdBy: this.data.createdBy, parentName: this.currentTypedParentValue }
    });

    dialogRef.afterClosed().subscribe((e) => {
      this.currentTypedParentValue = '';
    });
  }

  onSelectionChanged(e) {
    if (e.option.value && e.option.value != 'no_result') {
      this.childManfForm.patchValue({ parentManfID: e.option.value.parentManfID });
    }
  }

  private _filterParentManf(value: string | parentManfData): parentManfData[] {
    if (typeof value === 'string') {
      const results = this.ParentManfData.filter((data) => data.parentManfName.toLowerCase().includes(value.toLowerCase()));
      this.isNoResult = results.length === 0 ? true : false;
      return results;
    }
  }
}
