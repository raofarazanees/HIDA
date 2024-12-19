import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, filter, startWith, map } from 'rxjs/operators';
import { CloseDialogAt, GetActiveMarketData$, GetAllActiveChildManfRecords, getCratedManfRecord, getCreatedMarketForAssign } from '../../../../store/selectors';
import { manfMasterState, BrandMasterState } from 'src/app/features/mastering/store/reducers';
import { UpdateBrandMappingRecords, autoAssignBrandCVtoRecord, autoAssignManfToRecord, autoAssignMarketToRecord, CloseDialogAt as closeDialogAt } from './../../../../store/actions';
import { activeChildMaf } from './../../../../model/manf-master-models/interface/child-parent-manf.interface';
import { MarketMasterModel, unspscMasterState } from './../../../../model/manf-master-models/interface/unspsc-master.interface';
import { BrandCVRecord } from './../../../../model/manf-master-models/interface/brand-cv-filter-options';
import { GetActiveBrandRecords$, getCreatedBrandCVForAssign } from 'src/app/features/mastering/store/selectors/brand-master.selector';
import { BrandMappingUpdateModel, BrandMasterUpdateData } from '../brand-mapping.component';
import { CreateChildManfMasterComponent } from '../../../manufacture-master-search/create-child-manf-master/create-child-manf-master.component';
import { CreateMarketMasterComponent } from '../../../market-master/create-market-master/create-market-master.component';
import { CreateBrandCvComponent } from '../../brand-cv/create-brand-cv/create-brand-cv.component';
import { autoAppendFor } from 'src/app/features/mastering/model/manf-master-models/interface/common.interface';
import { ApplicationState, getWbDashboardRoles } from '@app-store';

@Component({
  selector: 'app-create-brand-mapping-dialog',
  templateUrl: './create-brand-mapping-dialog.component.html',
  styleUrls: ['./create-brand-mapping-dialog.component.scss']
})
export class CreateBrandMappingDialogComponent implements OnInit,OnDestroy {
  brandCVMasterForm!: FormGroup;
  public readonly destroyed$ = new Subject<boolean>();
  activeBrandList: BrandCVRecord[];
  activeManufactureList: activeChildMaf[];
  marketDataRef: MarketMasterModel[] = [];
  activeSubmarketList: MarketMasterModel[] = [];
  activeMarketList: MarketMasterModel[] = [];
  marketList: MarketMasterModel[];
  filteredBrandList: Observable<BrandCVRecord[]>;
  filteredManfList: Observable<activeChildMaf[]>;
  filteredSubMarketList: Observable<MarketMasterModel[]>;
  filteredMarketList: Observable<MarketMasterModel[]>;

  currentTypedValueBrand: string = '';
  currentTypedValueManf: string = '';
  currentTypedValueMarket: string = '';
  currentTypedValueSubmarket: string = '';
  @ViewChild('brandInput') brandInput: ElementRef;  
  @ViewChild('manfInput') manfInput: ElementRef;  
  @ViewChild('marketInput') marketInput: ElementRef;  
  @ViewChild('subInput') subInput: ElementRef;  
  allowManfCreate = true;
  allowMarketCreate = true;
  constructor(
    public dialogRef: MatDialogRef<CreateBrandMappingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { createdBy: string; name: string },
    public fb: FormBuilder,
    private readonly store: Store<manfMasterState>,
    public readonly brandStore: Store<BrandMasterState>,
    public readonly unspscStore: Store<unspscMasterState>,
    private dialogRef_: MatDialog,
    private readonly appStore:Store<ApplicationState>
  ) {
    this.getLoggedInUserRoles();

  }

  ngOnInit() {
    this.brandCVMasterForm = this.fb.group({
      createdBy: [this.data.createdBy, [Validators.required]],
      brandName: ['', [Validators.required,forbiddenStringValidator()]],
      manufacturerValue: ['', [Validators.required, forbiddenStringValidator()]],
      submarketValue: ['', [Validators.required,forbiddenStringValidator()]],
      marketValue: ['', [Validators.required,forbiddenStringValidator()]],
      comments: ['']
    });

    this.filteredBrandList = this.brandCVMasterForm.controls['brandName'].valueChanges.pipe(
      startWith(''),
      map((brand) => (brand && typeof brand !== 'object' ? this._filterBrand(brand) : this.activeBrandList.slice(0,100)))
    );

    this.filteredManfList = this.brandCVMasterForm.controls['manufacturerValue'].valueChanges.pipe(
      startWith(''),
      map((manf) => (manf && typeof manf !== 'object' ? this._filterManf(manf) : this.activeManufactureList.slice(0,100)))
    );

    this.filteredMarketList = this.brandCVMasterForm.controls['marketValue'].valueChanges.pipe(
      startWith(''),
      map((market) => (market && typeof market !== 'object' ? this._filterMarket(market) : this.activeMarketList.slice(0,100)))
    );

    this.filteredSubMarketList = this.brandCVMasterForm.controls['submarketValue'].valueChanges.pipe(
      startWith(''),
      map((submarket) => (submarket && typeof submarket !== 'object' ? this._filterSubmarket(submarket) : this.activeSubmarketList.slice(0,100)))
    );

    this.filteredSubMarketList = this.brandCVMasterForm.controls['submarketValue'].valueChanges.pipe(
      startWith(''),
      map((submarket) => (submarket && typeof submarket !== 'object' ? this._filterSubmarket(submarket) : this.activeSubmarketList.slice()))
    );

    this.getActiveChildChanges();
    this.getActiveBrandChanges();
    this.getAllActiveSubMarket();
    this.listenDialogCloseChanges();

    this.listenAutoAssignBrand();
    this.listenForNewManf();
    this.listenAutoAssignMarket();
  }

  listenDialogCloseChanges() {
    this.store
      .select(CloseDialogAt)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((data) => data.date != 0 && data.dialogType === 'brandMap')
      )
      .subscribe((res) => {
        this.dialogRef.close();
        setTimeout(() => {
          this.store.dispatch(closeDialogAt({ date: 0, dialogType: '' }));
        }, 200);
      });
  }

  ngOnDestroy(): void {
    this.brandStore.dispatch(autoAssignBrandCVtoRecord({payload:null}))
    this.store.dispatch(autoAssignManfToRecord({payload:null}))
    this.unspscStore.dispatch(autoAssignMarketToRecord({payload:null}))

    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  get getBrandName() {
    return this.brandCVMasterForm.get('brandName');
  }

  get getManfName() {
    return this.brandCVMasterForm.get('manufacturerValue');
  }

  get getSubMktName() {
    return this.brandCVMasterForm.get('submarketValue');
  }

  get getMktName() {
    return this.brandCVMasterForm.get('marketValue');
  }

  onNoClick(): void {
    this.dialogRef.close({ marketName: this.data.name });
  }

  submitBrandForm() {
    const { brandName, manufacturerValue, marketValue, submarketValue, comments } = this.brandCVMasterForm.value;

    const mapToCreate: BrandMasterUpdateData = {
      brandID: brandName.brandID,
      brandname: brandName.brandname,
      brandMapID: null,
      comments: comments || '',
      isBrandMapActive: 'Y',
      manfID: manufacturerValue.childManfID,
      manfName: manufacturerValue.childManfName,
      marketID: marketValue.marketID,
      marketName: marketValue.marketName,
      submarketName: submarketValue.submarketName
    };
    const editedRecords: BrandMappingUpdateModel = {
      userName: this.data?.createdBy,
      records: [mapToCreate]
    };
    this.store.dispatch(UpdateBrandMappingRecords({ payload: editedRecords }));
  }

  displayFn(brand: any): string {
    if (typeof brand === 'string' && brand === 'no_result') {
      return this.currentTypedValueBrand;
    } else {
      this.currentTypedValueBrand = '';
      return brand && brand.brandname ? brand.brandname : '';
    }
  }

  displayFnManf(manf: any): string {
    if (typeof manf === 'string' && manf === 'no_result') {
      return this.currentTypedValueManf;
    } else {
      this.currentTypedValueManf = '';
      return manf && manf.childManfName ? manf.childManfName : '';
    }
  }

  displayFnSub(submarket: any): string {
    if (typeof submarket === 'string' && submarket === 'no_result') {
      return this.currentTypedValueSubmarket;
    } else {
      this.currentTypedValueSubmarket = '';
      return submarket && submarket.submarketName ? submarket.submarketName : '';
    }
  }

  displayFnMrt(market: any): string {
    if (typeof market === 'string' && market === 'no_result') {
      return this.currentTypedValueMarket;
    } else {
      this.currentTypedValueMarket = '';
      return market && market.marketName ? market.marketName : '';
    }
  }

  submarketSelected(e) {
    if(!e.option?.value) {
      return false;
    }
    this.activeSubmarketList = [];
    this.activeSubmarketList = this.marketDataRef.filter((market) => {
      return market.marketName === e.option.value.marketName;
    });
    if (this.activeSubmarketList.length === 1) {
      this.brandCVMasterForm.patchValue({ submarketValue: this.activeSubmarketList[0] });
    } else {
      this.brandCVMasterForm.patchValue({ submarketValue: '' });
    }
    this.filteredSubMarketList = this.brandCVMasterForm.controls['submarketValue'].valueChanges.pipe(
      startWith(''),
      map((submarket) => (submarket && typeof submarket !== 'object' ? this._filterSubmarket(submarket) : this.activeSubmarketList.slice()))
    );

    // this.filteredMarketList = this.brandCVMasterForm.controls['marketValue'].valueChanges.pipe(
    //   startWith('')
    //   map((market) => (market && typeof market !== 'object' ? this._filterMarket(market) : this.activeMarketList.slice()))
    // );
  }

  
  openMarketMasterDialog(type,typeText:string = '') {
    
    let submarket = type === 'submarketName' ? this.currentTypedValueSubmarket :'';
    let marketName = type === 'marketName' ? this.currentTypedValueMarket :'';
     marketName = type === 'submarketName' ? this.brandCVMasterForm.value?.marketValue?.marketName : this.currentTypedValueMarket;

     this.marketInput.nativeElement.blur();
     this.subInput.nativeElement.blur();

    let dialogRef = this.dialogRef_.open(CreateMarketMasterComponent, {
      height: '400px',
      width: '500px',
      disableClose: true,
      position: { top: '10px' },
      data: { createdBy: this.data.createdBy,name:submarket,marketName:marketName,appendToId:-1,appendFor:'marketBrandMapDialog' }
    });
    dialogRef.afterClosed().subscribe( data => {
      this.currentTypedValueSubmarket ='';
      this.currentTypedValueMarket ='';
    })
  }
  
 openParentChildDialog(text?:string) {
  this.manfInput.nativeElement.blur();

   const dialogRef = this.dialogRef_.open(CreateChildManfMasterComponent, {
      height: '400px',
      width: '500px',
      disableClose: true,
      position: { top: '10px' },
      data: { createdBy: this.data.createdBy,value:this.currentTypedValueManf,appendToId:-1,appendFor:'brandMapManfDialog'}
    });
    dialogRef.afterClosed().subscribe( data => {
      this.currentTypedValueManf ='';
    })
  }
  openCreateBrandCvModel():void {

    this.brandInput.nativeElement.blur();
    let dialogRef = this.dialogRef_.open(CreateBrandCvComponent, {
      height: '400px',
      width: '500px',
      disableClose: true,
      position: { top: '10px' },
      data: { createdBy: this.data.createdBy,name:this.currentTypedValueBrand,appendToId:-1,appendFor:'brandMasterCVDialog' }
    });
    dialogRef.afterClosed().subscribe( data => {
      this.currentTypedValueBrand ='';
    })
  }


  private getActiveChildChanges() {
    this.store
      .select(GetAllActiveChildManfRecords)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: activeChildMaf[]) => {
        this.activeManufactureList = item;
        //   this.setDataInAgGrid(item);
      });
  }

  private getAllActiveSubMarket() {
    this.unspscStore
      .select(GetActiveMarketData$)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: MarketMasterModel[]) => {
        this.marketDataRef = item;
        item.map((market: MarketMasterModel) => {
          const isAlreadyExits = this.activeSubmarketList.some((options) => {
            return options.marketName === market.marketName;
          });
          if (!isAlreadyExits) {
            this.activeMarketList = [market, ...this.activeMarketList];
          }
        });
      });
  }

  private getActiveBrandChanges() {
    this.brandStore
      .select(GetActiveBrandRecords$)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: any[]) => {
        this.activeBrandList = item;
      });
  }

  private _filterBrand(value: string): BrandCVRecord[] {
    this.currentTypedValueBrand = value;
    const filterValue = value.toLowerCase();
    return this.activeBrandList.filter((item) => item.brandname.toLowerCase().indexOf(filterValue) === 0).slice(0,100);
  }

  private _filterManf(value: string): activeChildMaf[] {

    this.currentTypedValueManf = value;
    const filterValue = value.toLowerCase();
    return this.activeManufactureList.filter((item) => item.childManfName.toLowerCase().indexOf(filterValue) === 0).slice(0,100)
  }

  private _filterSubmarket(value: string): MarketMasterModel[] {

    this.currentTypedValueSubmarket = value;
    const filterValue = value.toLowerCase();
    return this.activeSubmarketList.filter((submarket) => submarket.submarketName.toLowerCase().indexOf(filterValue) === 0).splice(0,100);
  }

  private _filterMarket(value: string): MarketMasterModel[] {
    this.currentTypedValueMarket = value;
    const filterValue = value.toLowerCase();
    return this.activeMarketList.filter((market) => market.marketName.toLowerCase().indexOf(filterValue) === 0).splice(0,100);
  }

  private listenAutoAssignBrand() {
    this.brandStore
      .select(getCreatedBrandCVForAssign)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: {autoAppendFor:autoAppendFor,data:BrandCVRecord}) => {
        
        if (item != null && item.autoAppendFor.appendFor === 'brandMasterCVDialog') {
          const {id, appendFor} = item.autoAppendFor;
          const {brandID,brandname} = item.data;
           this.brandCVMasterForm.patchValue({brandName:{brandID,brandname}})     
        } 
      });
  }

  private listenForNewManf() {
    this.store
      .select(getCratedManfRecord)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$),filter( (data:any)=> data != null))
      .subscribe((item: {autoAppendFor:autoAppendFor,data:any}) => {
        if(item.autoAppendFor.appendFor === 'brandMapManfDialog') {
        const {id, appendFor} = item.autoAppendFor;
        const {childManfName,childManfID} = item.data;
        this.brandCVMasterForm.patchValue({manufacturerValue:{childManfName,childManfID}}) 
      }
      });
  }

  private listenAutoAssignMarket() {
    this.unspscStore
      .select(getCreatedMarketForAssign)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: {autoAppendFor:autoAppendFor,data:MarketMasterModel}) => {
        if (item != null && item.autoAppendFor.appendFor === 'marketBrandMapDialog') {
          const {id, appendFor} = item.autoAppendFor;
          const {marketID,marketName,submarketName} = item.data;
          this.brandCVMasterForm.patchValue({marketValue:{marketID,marketName}}) 
          this.brandCVMasterForm.patchValue({submarketValue:{submarketName}}) 
        } 
      });
  }
  
  private checkBrandKeys(group: FormGroup) {
    return Object.keys(group.controls).some(x => group.controls[x].value === true) ? 
    null : { notValid: true }
  }

  private getLoggedInUserRoles() {
    this.appStore
      .select(getWbDashboardRoles)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((data: any) => data)
      )
      .subscribe((roles: string[]) => {
        console.log('---');
        console.dir(roles);
        
        if(roles.indexOf('Mastering_Manager') === -1 && roles.indexOf('Mastering_WFadmin') === -1) {
          if(roles.indexOf('Mastering_Manufacturer_Read_Only') !== -1 &&  roles.indexOf('Mastering_Manufacturer') === -1) {
            console.log('00')
            this.allowManfCreate = false;
          }
          if(roles.indexOf('Mastering_Market_Read_Only') !== -1 &&  roles.indexOf('Mastering_Market') === -1) {
            this.allowMarketCreate = false;
          }
        }
       });
  }


}

export function forbiddenStringValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return typeof control.value === 'string' ? { invalid: true,dirty:true,keyMissing: true } : null;
  };
}

