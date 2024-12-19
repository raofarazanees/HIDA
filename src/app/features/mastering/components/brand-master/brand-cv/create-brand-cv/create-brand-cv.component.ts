import { BrandMasterState } from './../../../../store/reducers/brand-master.reducer';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, filter, startWith, map } from 'rxjs/operators';
import { CreateBrandMasterRecord, CloseDialogAt as closeDialogAt } from './../../../../store/actions';
import { CloseDialogAt, GetAllActiveChildManfRecords, GetChildParentsManf, GetParentChildTopMap } from '../../../../store/selectors';
import { manfMasterState, parentChildTopMapping, parentManfData } from '../../../../model/manf-master-models/interface/manf-master.interface';
import { activeChildMaf, childParentManfResponse, ChildParentRecord } from 'src/app/features/mastering/model/manf-master-models/interface/child-parent-manf.interface';
import { BrandSourceRecord, CreateBrandCvData } from 'src/app/features/mastering/model/manf-master-models/interface/brand-cv-filter-options';
import { GetBrandSourceRecords, GetLoadingState } from '../../../../store/selectors/brand-master.selector';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-create-brand-cv',
  templateUrl: './create-brand-cv.component.html',
  styleUrls: ['./create-brand-cv.component.scss']
})
export class CreateBrandCvComponent implements OnInit {
  loading$: Observable<boolean> = this.brandStore.select(GetLoadingState);
  brandCVMasterForm!: FormGroup;
  public readonly destroyed$ = new Subject<boolean>();
  activeChildManufactureList: activeChildMaf[] = [];
  filteredManfList: Observable<activeChildMaf[]>;
  currentTypedValueManf: string = '';
  brandSourceRecords: BrandSourceRecord[] = [];
  constructor(
    public dialogRef: MatDialogRef<CreateBrandCvComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { createdBy: string; name: string, appendToId: number, appendFor: string },
    public fb: FormBuilder,
    private readonly store: Store<manfMasterState>,
    public readonly brandStore: Store<BrandMasterState>
  ) { }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  sources = [
    { id: 'PriceTrack', name: 'PriceTrack' },
    { id: 'Web Scrapping', name: 'Web Scrapping' },
    { id: 'CA Input', name: 'CA Input' },
    { id: 'AccessGUDID', name: 'AccessGUDID' },
    { id: 'USMSD', name: 'USMSD' }
  ];

  booleanArray = [
    'Y','N'
  ];

  ngOnInit() {
    this.brandCVMasterForm = this.fb.group({
      createdBy: [this.data.createdBy, [Validators.required]],
      brandName: ['', [Validators.required]],
      brandFamily: ['', [Validators.required]],
      brandModel: [''],
      brandSource: ['', [Validators.required]],
      childManufacturerId: ['', [Validators.required]],
      additionalBrandFilter: [this.booleanArray[1]],
      manfAsBrand: [this.booleanArray[1]],
      searchInput: ['']
    });

    this.store
      .select(CloseDialogAt)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((data) => data.date != 0 && data.dialogType === 'brandMaster')
      )
      .subscribe((res) => {
        this.dialogRef.close();
        setTimeout(() => {
          this.store.dispatch(closeDialogAt({ date: 0, dialogType: '' }));
        }, 200);
      });

    this.getActiveChildChanges();
    this.getActiveBrandSources();

    this.filteredManfList = this.brandCVMasterForm.controls['childManufacturerId'].valueChanges.pipe(
      startWith(''),
      map((manf) => (manf && typeof manf !== 'object' ?
          this._filterManf(manf) : this.activeChildManufactureList).slice(0, 100))
    );
  }

  private _filterManf(value: string): activeChildMaf[] {
    this.currentTypedValueManf = value;
    const filterValue = value.toLowerCase();
    return this.activeChildManufactureList.filter((item) => item.childManfName.toLowerCase().indexOf(filterValue) === 0).slice(0, 100)
  }



  private getActiveBrandSources() {
    this.store
      .select(GetBrandSourceRecords)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: BrandSourceRecord[]) => {
        this.brandSourceRecords = item;
      });
  }

  private getActiveChildChanges() {
    this.store
      .select(GetAllActiveChildManfRecords)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: activeChildMaf[]) => {
        this.activeChildManufactureList = item;
      });
  }

  displayFnManf(manf: any): string {
    if (typeof manf === 'string' && manf === 'no_result') {
      return this.currentTypedValueManf;
    } else {
      this.currentTypedValueManf = '';
      return manf && manf.childManfName ? manf.childManfName : '';
    }
  }

  get getBrandName() {
    return this.brandCVMasterForm.get('brandName');
  }

  get getBrandFamily() {
    return this.brandCVMasterForm.get('brandFamily');
  }

  get getSourceModel() {
    return this.brandCVMasterForm.get('brandSource');
  }

  get getChildManufacturerModel() {
    return this.brandCVMasterForm.get('childManufacturerId');
  }

  onNoClick(): void {
    this.dialogRef.close({ marketName: this.data.name });
  }

  submitBrandForm(): void {

    const { brandName, brandFamily, brandModel, childManufacturerId, brandSource,additionalBrandFilter, manfAsBrand} = this.brandCVMasterForm.value;

    const mapToCreate: CreateBrandCvData = {
      brandname: brandName,
      brandfamily: brandFamily,
      brandmodel: brandModel,
      childmanfid: childManufacturerId.childManfID,
      brandsource: brandSource,
      createdBy: this.data?.createdBy,
      brandfilter: additionalBrandFilter,
      manfasbrand : manfAsBrand
    };

    if (this.brandCVMasterForm.valid) {
      this.brandStore.dispatch(CreateBrandMasterRecord({ payload: { brandMasterData: mapToCreate, autoAppendFor: { id: this.data?.appendToId || '', appendFor: this.data?.appendFor || '' } } }));
    } else {
      Object.values(this.brandCVMasterForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}