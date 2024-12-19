import { Component, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, filter } from 'rxjs/operators';
import { CreateMarketMaster, CreateParentManfRecord, CloseDialogAt as closeDialogAt } from '../../../store/actions';
import { manfMasterState, unspscMasterState } from '../../../store/reducers';
import { CreateParentManfDialogComponent } from '../../manufacture-master-search/create-parent-manf-dialog/create-parent-manf-dialog.component';
import { CloseDialogAt } from '../../../store/selectors';

@Component({
  selector: 'app-create-market-master',
  templateUrl: './create-market-master.component.html',
  styleUrls: ['./create-market-master.component.scss']
})
export class CreateMarketMasterComponent implements OnInit {

  marketMasterForm!: FormGroup;
  public readonly destroyed$ = new Subject<boolean>();
  @ViewChild('inputMarketName', { read: ViewContainerRef }) public input: ViewContainerRef;

  constructor(
    public dialogRef: MatDialogRef<CreateParentManfDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { createdBy: string; name: string,marketName:string,appendToId?:string,appendFor?:string },
    public fb: FormBuilder,
    private readonly store: Store<manfMasterState>,
    private readonly marketStore: Store<unspscMasterState>

  ) {}

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngOnInit() {

    this.marketMasterForm = this.fb.group({
      createdBy: [this.data.createdBy, [Validators.required]],
      marketName: [this.data.marketName ? this.data.marketName :'' , [Validators.required]],
      submarketName: [this.data.name ? this.data.name : '', [Validators.required]]
    });

    this.store
      .select(CloseDialogAt)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((data) => data.date != 0 && data.dialogType == 'market')
      )
      .subscribe((res) => {
        this.dialogRef.close();
        setTimeout(() => {
          this.store.dispatch(closeDialogAt({ date: 0, dialogType: '' }));
        }, 200);
      });
  }
  
  ngAfterViewInit() {
    if(this.data?.name)  setTimeout(() => this.input.element.nativeElement.focus(),300);
  }

  get marketName() {
    return this.marketMasterForm.get('marketName');
  }
  get submarketName() {
    return this.marketMasterForm.get('submarketName');
  }

  onNoClick(): void {
    this.dialogRef.close({ marketName: this.data.name });
  }

  submitMarketForm(): void {


    if (this.marketMasterForm.valid) {
      this.marketStore.dispatch(CreateMarketMaster({ payload: {marketData: this.marketMasterForm.value,autoAppendFor: {id:this.data?.appendToId || '',appendFor:this.data?.appendFor || ''}}} ));
    } else {
      Object.values(this.marketMasterForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}