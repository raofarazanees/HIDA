import { userProfileModel } from './../../../../features/item-to-product/containers/base.container';
import { GetActiveBrandMaster } from './../../../../features/mastering/store/actions/brand-master.actions';
import { facilityMasterUpdateRecords } from './../../../../features/mastering/components/facility-master/facility-master-components/facility-master.component';
import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { AgEditorComponent } from '@ag-grid-community/angular';
import { distinctUntilChanged, filter, map, startWith, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { GetActiveMarketData$, GetAllActiveParentManf } from 'src/app/features/mastering/store/selectors';
import { ColDef } from 'ag-grid-community';
import { ApplicationState, getWbDashboardRoles } from '@app-store';
import { BrandMasterState, facilityMasterState } from 'src/app/features/mastering/store/reducers';
import {
  MarketMasterModel,
  unspscMasterState
} from './../../../../features/mastering/model/manf-master-models/interface/unspsc-master.interface';
import { GetAllActiveChildManfRecords } from './../../../../features/mastering/store/selectors/manf-master.selector';
import {
  activeChildMaf
} from './../../../../features/mastering/model/manf-master-models/interface/child-parent-manf.interface';
import {
  manfMasterState,
  parentManfData
} from './../../../../features/mastering/model/manf-master-models/interface/manf-master.interface';
import { getActiveFacilityMasterRecords$ } from './../../../../features/mastering/store/selectors';
import { GetActiveBrandRecords$, GetBrandSourceRecords } from 'src/app/features/mastering/store/selectors/brand-master.selector';
import { BaseContainer } from 'src/app/features/item-to-product/containers/base.container';
import { BrandSourceRecord } from 'src/app/features/mastering/model/manf-master-models/interface/brand-cv-filter-options';
import { BrandCVRecord } from 'src/app/features/mastering/model/manf-master-models/interface/brand-cv-filter-options';

@Component({
  selector: 'app-ag-grid-typeahead',
  templateUrl: './ag-grid-typeahead.component.html',
  styleUrls: ['./ag-grid-typeahead.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgGridTypeaheadComponent extends BaseContainer implements AgEditorComponent, AfterViewInit {
  mappingOptions: any[] = [];
  control: FormControl = new FormControl({ value: '', disabled: false });
  filteredMappingOptions: Observable<any[]>;
  @ViewChild('input', { read: ViewContainerRef }) public input: ViewContainerRef;
  stopEditing: any;
  paramValue: any;
  public readonly destroyed$ = new Subject<boolean>();

  params: any;
  userRoles: string[] = [];
  btnTextForCreateMaster: { btnText: string }
  isForInline: boolean = false;
  typedString: string = '';
  isCheckout = false;
  userProfile: userProfileModel;
  constructor(
    private readonly store: Store<manfMasterState>,
    private readonly unspscStore: Store<unspscMasterState>,
    private readonly appStore: Store<ApplicationState>,
    private readonly facilityStore: Store<facilityMasterState>,
    private readonly brandStore: Store<BrandMasterState>

  ) { super() }

  agInit(params: any): void {
    this.userProfile = BaseContainer.prototype.userProfile;
    this.stopEditing = params.stopEditing;
    this.params = params;
    this.isCheckout = this.params.data?.userRole === 'ADMIN' ? false : (this.params.data?.checkedStatus === 'OUT' && this.params.data?.checkedOutUserEmail.toLowerCase() !== this.userProfile.email.toLowerCase()) ? true : false;
    this.control = new FormControl({ value: '', disabled: this.isCheckout });
    this.getLoggedInUserRoles();
    this.setInitialState(params);
    this.paramValue = params.value;
    if (this.paramValue?.value) {
      this.paramValue = this.paramValue.value;
    }

    this.filteredMappingOptions = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => {
        return this.filterMappings(value);
      })
    );

    switch (params.colDef.cellEditorParams.typeHeadRenderFor) {
      case 'parentManfData':
        this.btnTextForCreateMaster = { btnText: 'Create Parent Manufacturer' };
        this.listenActiveParentRecords(params);
        break;
      case 'manfMappingChild':
        this.btnTextForCreateMaster = { btnText: 'Create Child Manufacturer' };
        this.getActiveChildChanges();
        break;
      case 'submarketMaster':
        this.getAllActiveSubmarketMarket(params.data.marketName);
        this.checkCreateMasterAccess('Submarket');
        break;
      case 'marketMaster':
        this.getAllActiveMarket();
        this.checkCreateMasterAccess('Market');
        break;
      case 'facilityMaster':
        this.btnTextForCreateMaster = { btnText: 'Create Facility Master' };
        this.listenFacilityMasterRecords();
        break;
      case 'productManfMappingChild':
        this.isForInline = true;
        this.control.setValue(this.params.value)
        this.getActiveChildChanges();
        this.checkCreateManfAccess();
        break;
      case 'brandMasterInline':
        this.isForInline = true;
        this.control.setValue(this.params.value)
        this.getActiveBrandChanges();
        this.checkCreateBrandAccess();
        break;
      case 'submarketMasterInline':
        this.isForInline = true;
        this.control.setValue(this.params.value)
        this.getAllActiveSubmarketMarket(params.data.marketName);
        this.checkCreateMasterAccess('Submarket');
        break;
      case 'marketMasterInline':
        this.isForInline = true;
        this.control.setValue(this.params.value)
        this.getAllActiveMarket();
        this.checkCreateMasterAccess('Market');
        break;
      case 'brandMasterChild':
        this.isForInline = true;
        this.control.setValue(this.params.value)
        this.getBrands();
        this.checkCreateBrandAccess();
        break;
      case 'source':
        this.isForInline = true;
        this.control.setValue(this.params.value)
        this.getAllActiveSources();
        break;
      case 'brandMasterInlineForPIM':
        this.isForInline = true;
        this.control.setValue(this.params.value)
        this.getActiveBrandChangesForPIM(params.data.parentManfID);
        break;
      default:
        break;
    }

    // if (params.colDef.field == 'parentManfData') {
    //   this.shouldAllowParentCreate = true;
    //   this.drownDownCss = true;
    //   this.listenActiveParentRecords(params);
    // }

    // if (params.colDef.field == 'manfMappingChild' || params.colDef.field == 'manfName') {
    //   this.shouldAllowChildCreate = true;
    //   this.drownDownCss = true;
    //   this.getActiveChildChanges();
    // }

    // if (params.colDef.cellEditorParams.typeHeadRenderFor === 'submarketMaster') {
    //   this.getAllActiveSubMarket();
    //   this.checkCreateMasterAccess();
    // }

    // if (params.colDef.cellEditorParams.typeHeadRenderFor === 'marketMaster') {
    //   this.getAllActiveMarket(params.data.submarketName);
    //   this.checkCreateMasterAccess();
    // }
  }

  refresh(params: any): boolean {
    this.setInitialState(params);
    return true;
  }

  getValue(): any {
    return this.control.value && this.control.value.value ? this.control.value : this.paramValue;
  }

  trackByID(index: number, item: any): number {
    return item.id;
  }

  ngAfterViewInit() {
    // if (!this.shouldAllowChildCreate && !this.shouldAllowParentCreate && !this.shouldAllowMarketCreate)
    //   setTimeout(() => this.input.element.nativeElement.focus());
  }
  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  getDisplayValue(option: any): string {
    return option && option.value || option;
  }

  onSelectionChanged(e) {
    if (this.isForInline) {
      this.control.setValue(e.option.value)
      this.params.setValue(e.option.value);
    } else {
      this.stopEditing();
    }
  }

  openCreateMasterDialog() {
    (this.isForInline) ? this.params.colDef.cellEditorParams.onRecordsCreateClick(this.params, this.typedString) : this.params.colDef.cellRendererParams(this.params, this.typedString);
  }

  private setInitialState(params: any): void {
    this.mappingOptions = params.colDef.cellEditorParams.mappingOptions;
  }

  private filterMappings(value: any): any {
    if (typeof value === 'object') {
      value = value.value;
    }
    if (value) this.typedString = value;
    return this.mappingOptions
      .filter((item) => this.normalizeValue(item.value).includes(this.normalizeValue(value)))
      .sort(this.sortBystring)
      .splice(0, 100);
  }

  private normalizeValue(value: string = ''): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  private sortBystring(first: any, second: any): any {
    var firstDesc = first?.value?.toUpperCase();
    var secondDesc = second?.value?.toUpperCase();
    if (firstDesc === 'NOT AVAILABLE') {
      return -1;
    }
    return firstDesc < secondDesc ? -1 : firstDesc > secondDesc ? 1 : 0;
  }

  private getAllActiveMarket() {
    this.unspscStore
      .select(GetActiveMarketData$)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: MarketMasterModel[]) => {
        item.map((market: MarketMasterModel) => {
          const isAlreadyExits = this.mappingOptions.some((options) => {
            return options.value === market.marketName;
          });
          if (!isAlreadyExits) {
            this.mappingOptions = [{ value: market.marketName, id: market.marketID, submarketName: market.submarketName }, ...this.mappingOptions];
          }
        });
      });
  }

  private getAllActiveSources() {
    this.brandStore
      .select(GetBrandSourceRecords)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: BrandSourceRecord[]) => {
        this.mappingOptions = item
          .map((item) => {
            return { value: item.sourceName, id: item.sourceName};
          });
      });
  }

  private getAllActiveSubmarketMarket(marketName: string) {
    this.unspscStore
      .select(GetActiveMarketData$)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: MarketMasterModel[]) => {
        this.mappingOptions = item
          .filter((market: MarketMasterModel) => {
            return market.marketName.toLowerCase() == marketName.toLowerCase();
          })
          .map((item) => {
            return { value: item.submarketName, id: item.marketID, marketName: item.marketName };
          });
      });
  }

  private getActiveChildChanges() {
    this.store
      .select(GetAllActiveChildManfRecords)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: activeChildMaf[]) => {
        this.mappingOptions = item.map((item: activeChildMaf) => {
          return { value: item.childManfName, id: item.childManfID };
        });
        //   this.setDataInAgGrid(item);
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

  private listenActiveParentRecords(params: ColDef) {
    this.store
      .select(GetAllActiveParentManf)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((data: any) => data)
      )
      .subscribe((r: parentManfData[]) => {
        this.mappingOptions = r.map((item: parentManfData) => {
          return { value: item.parentManfName, id: item.parentManfID };
        });
      });
  }

  private listenFacilityMasterRecords() {
    this.facilityStore
      .select(getActiveFacilityMasterRecords$)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((data: any) => data)
      )
      .subscribe((res: facilityMasterUpdateRecords[]) => {

        res.map((item: facilityMasterUpdateRecords) => {
          const isAlreadyExits = this.mappingOptions.some((options) => {
            return options.value === item.facilitySubgroupName;
          });
          if (!isAlreadyExits) {
            this.mappingOptions = [{ value: item.facilitySubgroupName, id: item.facilityID, facilityGroupName: item.facilityGroupName }, ...this.mappingOptions];
          }
        });

      });
  }
  private checkCreateMasterAccess(text: string = 'Market') {
    this.userRoles.includes('Mastering_Market') ||
      this.userRoles.includes('Mastering_Manager') ||
      this.userRoles.includes('Mastering_WFadmin')
      ? this.btnTextForCreateMaster = { btnText: `Create ${text} Master` }
      : this.btnTextForCreateMaster = null;
  }

  private checkCreateManfAccess(text: string = 'Child') {
    this.userRoles.includes('Mastering_Manufacturer') ||
      this.userRoles.includes('Mastering_Manager') ||
      this.userRoles.includes('Mastering_WFadmin')
      ? this.btnTextForCreateMaster = { btnText: `Create ${text} Manufacturer` }
      : this.btnTextForCreateMaster = null;
  }

  private checkCreateBrandAccess(text: string = 'Brand') {
    this.userRoles.includes('Mastering_Brand') ||
      this.userRoles.includes('Mastering_Manager') ||
      this.userRoles.includes('Mastering_WFadmin')
      ? this.btnTextForCreateMaster = { btnText: `Create ${text} Master` }
      : this.btnTextForCreateMaster = null;
  }

  private getActiveBrandChanges() {
    this.brandStore
      .select(GetActiveBrandRecords$)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: any[]) => {
        this.mappingOptions = item.map((item: any) => {
          return { value: item.brandname, id: item.brandID };
        });
      });
  }

  private getActiveBrandChangesForPIM(pmanfId: string = '') {
    this.brandStore
      .select(GetActiveBrandRecords$)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: any[]) => {
        this.mappingOptions = item
          .filter((brand: BrandCVRecord) => {
            return brand.pmanfid.toLowerCase() == pmanfId.toLowerCase();
          })
          .map((item) => {
            return { value: item.brandname, id: item.brandID, brandManfID: item.brandManfID };
          });
      });
  }

  private getBrands() {
    this.mappingOptions = this.params.data.brandname.map((item: any) => {
      return { value: item.brandname, id: item.brandID }
    });
  }
}