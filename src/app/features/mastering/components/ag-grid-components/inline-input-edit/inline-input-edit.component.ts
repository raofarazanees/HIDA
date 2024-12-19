import { userProfileModel } from './../../../../item-to-product/containers/base.container';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ICellRendererParams } from 'ag-grid-community';
import { DefaultYesNoValues } from '../../../model/manf-master-models/interface/unspsc-master-filter-options';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith, takeUntil } from 'rxjs/operators';
import { State, Store } from '@ngrx/store';
import { ProductEntitlementState, unspscMasterState } from '../../../store/reducers';
import { ActiveBrandMapping } from '../../../model/manf-master-models/interface/product-entitlement.interface';
import { GetActiveBrandMapping$ } from '../../../store/selectors/product-entitlement.selector';
import { DialogModel, ModelDialogueComponent } from '@app-shared-components';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from 'saturn-datepicker-ext';
import { MM_YYYY_FORMATS } from 'src/app/features/admin-dashboard/components/side-nav-components/product-graph-merged-download-dialog/product-graph-merged-download-dialog.component';
import { getListOfBusinessUsers } from '../../../store/selectors';
import { BusinessUsers } from '../../../model/manf-master-models/interface/unspsc-master.interface';
import { BaseContainer } from 'src/app/features/item-to-product/containers/base.container';
import { ApplicationState, getWbDashboardRoles } from '@app-store';

@Component({
  selector: 'app-inline-input-edit',
  templateUrl: './inline-input-edit.component.html',
  styleUrls: ['./inline-input-edit.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MM_YYYY_FORMATS }
  ]
})
export class InlineInputEditComponent extends BaseContainer {
  params!: ICellRendererParams | any;
  inputValue: FormControl;
  selectedBrand = new FormControl([]);
  public readonly destroyed$ = new Subject<boolean>();
  componentRenderFor: string = 'input';
  defaultSelectOption: string[] = DefaultYesNoValues;
  isAllowedNumber: boolean = false;
  minLength: number = 0;
  maxLength: number = 25000;
  dropdownList: string[] = [];
  brandMapRecords: any[] = [];
  userProfile: userProfileModel
  filteredOptions: Observable<string[]>;
  selectedItems: any[];
  activeBrandsMapping: ActiveBrandMapping[];
  maxDate = moment().utc().format('YYYY-MM-DD');
  minDate = moment().subtract(364, 'days').utc().format('YYYY-MM-DD'); //new Date(new Date().setFullYear(new Date().getFullYear() - 1))
  isCheckout = false;
  btnTextForCreateMaster: { btnText: string };
  userRoles: string[] = [];
  isForInline: boolean = false;

  agInit(params: any): void {
    this.userProfile = BaseContainer.prototype.userProfile;
    this.getLoggedInUserRoles();
    this.params = params;
    this.isCheckout = this.params.data?.userRole === 'ADMIN' ? false : (this.params.data?.checkedStatus === 'OUT' && this.params.data?.checkedOutUserEmail.toLowerCase() !== this.userProfile.email.toLowerCase()) ? true : false;
    this.inputValue = new FormControl({ value: '', disabled: this.isCheckout }, []);

    this.params?.cellRenderedFor === 'datepicker' ? this.inputValue.setValue(this.params.value) : this.inputValue.setValue(moment(this.params.value).format('YYYY-MM-DD'));
    this.inputValue.setValue(this.params.value);
    this.componentRenderFor = this.params?.cellRenderedFor ? this.params?.cellRenderedFor : 'input';
    if (this.componentRenderFor == 'autocomplete') {
      if (params.colDef?.field === 'prodSKU') {
        this.dropdownList = params.data.itemSKUs ? this.covertStringToArray(params.data.itemSKUs) : [];
      }

      if (params.colDef?.field === 'prodDesc') {
        this.dropdownList = params.data.itemDescriptions ? this.covertStringToArray(params.data.itemDescriptions) : [];
      }
    }

    if (this.componentRenderFor == 'multiselect') {
      if (params.colDef?.field === 'brandName') {
        this.brandMapRecords = params.data.brandMapIDName ? this.covertStringToArrayBrandMap(params.data.brandMapIDName) : [];
        this.selectedBrand.patchValue(this.brandMapRecords);
        this.getBrandRecords();
      }
    }

    if (this.params?.inputValidation) {
      this.minLength = this.params?.inputValidation?.minLength ? this.params?.inputValidation.minLength : 0;
      this.maxLength = this.params?.inputValidation?.maxLength ? this.params?.inputValidation.maxLength : 25000;
      this.inputValue.setValidators([Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)]);
      this.inputValue.markAsDirty();
      this.isAllowedNumber = this.params?.inputValidation.isNumber;
    }

    if (this.params?.cellRenderedFor === 'datepicker') {

    }

    if (this.params?.cellRenderedFor === 'select' && !this.params.cellForYesNo) {
      this.listenActiveUsers();
    }

  }

  constructor(private readonly productStore: Store<ProductEntitlementState>, private readonly unsscStore: Store<unspscMasterState>, private cd: ChangeDetectorRef, public readonly matDialog: MatDialog,
    private readonly appStore: Store<ApplicationState>,
  ) {
    super();
    // this.listenBrandMappingChanges();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngOnInit() {
    if (this.componentRenderFor === 'autocomplete') {
      this.filteredOptions = this.inputValue.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
    }

  }

  onEditIconClicked() {
    this.params.api.startEditingCell({
      rowIndex: this.params.rowIndex,
      colKey: this.params.column.getColId()
    });
  }

  onSelectionChanged(e) {
    this.params.setValue(e.option.value);
    this.inputValue.setValue(e.option.value);
    this.updateDataOnAgNode();
  }

  onSelectionChangedSelect(e: string) {
    if (this.params.value !== e) {
      this.params.setValue(e);
      this.inputValue.setValue(e);
      this.updateDataOnAgNode();
    }
  }

  onBlur() {
    if (this.inputValue.value !== this.params.value) {

      if (this.params.colDef?.field === 'unspscCode' && this.params.data.unspscSourceHist === 'MANUAL' && this.inputValue.value !== this.params.data.unspscCodeHist) {
        const message = `The product is changing UNSPSC for the second time, conflicting with the historical change. UNSPSC was changed by ${this.params.data.updatedBy} on ${this.params.data.updatedDate}. Do you want to proceed further ?`;
        const dialogData = new DialogModel(message, true, 'Proceed');
        const modalRef = this.matDialog.open(ModelDialogueComponent, {
          width: '500px',
          data: dialogData,
          position: { top: '20px' }
        });
        modalRef.afterClosed().subscribe((data: any) => {
          if (data) {
            this.params.setValue(this.inputValue.value);
            this.updateDataOnAgNode()
          } else {
            this.params.setValue(this.params.value);
            return false;
          }
        });

      } else {
        this.params.setValue(this.inputValue.value);
        this.updateDataOnAgNode();
      }
    }
  }

  onBlurSelection() {
    if (this.selectedBrand.value != this.params.data.brandName) {
      //this.params.setValue(this.selectedBrand.value);
      this.updateDataOnAgNode();
    }
  }

  onCloseMethod() {
    if (this.selectedBrand.value != this.params.value) {
      this.params.setValue(this.selectedBrand.value);
      this.updateDataOnAgNode();
    }
  }

  refresh() {
    return true;
  }

  reviewDateChange(event) {
    const date = moment(event.value).format('YYYY-MM-DD HH:mm:ss');

    if (date !== this.params.value) {
      this.params.setValue(date);
      this.updateDataOnAgNode();
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.dropdownList.filter((option) => option.toLowerCase().includes(filterValue));
  }
  private updateDataOnAgNode() {
    this.params.node.data = { ...this.params.node.data, isModified: true };
  }

  private covertStringToArray(value: string): string[] {
    return value
      .split('~~~~~~~~~')
      .map((item) => {
        return item;
      })
      .sort();
  }

  private covertStringToArrayBrandMap(value: string): any[] {
    const data = value.split('~~~~~~~~~').map((item) => {
      return item;
    });

    return data.map((item) => {
      const d = item.replace('||||', ':').replace('####', ':').split(':');
      return { brandMapID: d[0], brandID: d[1], brandName: d[2] };
    });
  }

  // private listenBrandMappingChanges() {
  //   this.productStore
  //     .select(GetActiveBrandMapping$)
  //     .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
  //     .subscribe((item: ActiveBrandMapping[]) => {
  //       if (item != null) {
  //         this.activeBrandsMapping = item;
  //       }
  //     });
  // }

  getBrandRecords() {
    const brandMapData = this.activeBrandsMapping
      .filter((brand) => brand.manfID === this.params.data.manfID && brand.marketID === this.params.data.unspscMarketID)
      .sort();

    const d = brandMapData.filter((element) => {
      if (!this.brandMapRecords.some((data) => data.brandMapID.toString() === element.brandMapID.toString())) {
        return element;
      }
    });

    this.brandMapRecords = [...this.brandMapRecords, ...d];
    this.cd.detectChanges();
  }


  private listenActiveUsers() {
    this.unsscStore
      .select(getListOfBusinessUsers)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$), filter(item => item !== null))
      .subscribe((item: BusinessUsers[]) => {
        if (item != null) {
          this.defaultSelectOption = item.map(item => `${item.last_name}, ${item.first_name}`.toUpperCase());
        }
      });
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
        this.userRoles = roles;
      });
  }

  openCreateMasterDialog() {
    this.params.colDef.cellEditorParams.onRecordsCreateClick(this.params, '');
  }
}
