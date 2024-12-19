import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, filter, startWith, map } from 'rxjs/operators';
import {
  MarketMasterModel,
  unspscMasterState,
} from 'src/app/features/mastering/model/manf-master-models/interface/unspsc-master.interface';
import { GetActiveMarketData$, GetAllActiveChildManfRecords } from 'src/app/features/mastering/store/selectors';
import { DashboardState } from '../../../store/reducers';
import { GenericWidgetModal } from '../../../modal/generic-widget-interface';
import { BrandFeatureSuggestion, CommonActionsEnum } from '../../../store/actions';
import { parentManfData } from 'src/app/features/mastering/model/manf-master-models/interface/manf-master.interface';
import { activeChildMaf } from 'src/app/features/mastering/model/manf-master-models/interface/child-parent-manf.interface';
import { GetAllActiveChildManf } from 'src/app/features/mastering/store/actions';

export interface BrandFeatureSuggestionModel {
  initiatedByUserEmail: string,
  initiatedByUserName: string,
  marketOrManufacturer: string,
  searchAttribute: string
}

@Component({
  selector: 'app-brand-feature-suggestion',
  templateUrl: './brand-feature-suggestion.component.html',
  styleUrls: ['./brand-feature-suggestion.component.scss']
})

export class BrandFeatureSuggestionComponent implements OnInit {
  marketCtrl = new FormControl('', [Validators.required]);
  manufacturerCtrl = new FormControl('', [Validators.required]);
  filteredMarketOption: Observable<MarketMasterModel[]>;
  allActiveMarket!: MarketMasterModel[];
  widget: GenericWidgetModal | any;
  manufacturerRecordsData: parentManfData[];
  public readonly destroyed$ = new Subject<boolean>();
  selectedFeature = new FormControl('MARKET', [Validators.required]);
  selectedMarket: MarketMasterModel[] = [];
  isAllSelected = false;
  activeChildManufactureList: activeChildMaf[];
  filteredManfList: Observable<activeChildMaf[]>;
  currentTypedValueManf: string = '';

  selectedManf: activeChildMaf[] = [];
  isAllManfSelected = false;
  private unsubscribe$ = new Subject<void>();


  constructor(private marketStore: Store<unspscMasterState>, private readonly store: Store<DashboardState>,
    private cd: ChangeDetectorRef, private actions$: Actions
  ) { }

  ngOnInit() {
    this.actions$
      .pipe(
        ofType<any>(CommonActionsEnum.BRAND_FEATURE_SUGGESTION_SUCCESS),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.selectedManf = [];
        this.selectedMarket = [];
      });
    this.store.dispatch(GetAllActiveChildManf());
    this.getActiveChildChanges();
    this.filteredManfList = this.manufacturerCtrl.valueChanges.pipe(
      startWith(''),
      map((manf) => (manf && typeof manf !== 'object' ? this._filterManf(manf) : this.activeChildManufactureList.slice(0, 100)))
    );
    this.listenActiveMarketChanges();
    this.listenSelectedFeatureChange();
  }

  private getActiveChildChanges() {
    this.store
      .select(GetAllActiveChildManfRecords)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((item: activeChildMaf[]) => {
        this.activeChildManufactureList = item;
      });
  }

  private _filterManf(value: string): activeChildMaf[] {
    this.currentTypedValueManf = value;
    const filterValue = value.toLowerCase();
    return this.activeChildManufactureList.filter((item) => item.childManfName.toLowerCase().indexOf(filterValue) === 0).slice(0, 100)
  }

  listenSelectedFeatureChange() {
    this.selectedFeature.valueChanges.subscribe(data => {
      switch (data) {
        case 'MARKET':
          this.selectedManf = [];
          break;
        case 'MANUFACTURER':
          this.selectedMarket = [];
          break;
        default:
          break;
      }
    });
  }

  initWorkflow() {
    if (this.selectedMarket.length > 0 || this.selectedManf.length > 0) {
      const dataToPost: BrandFeatureSuggestionModel = {
        marketOrManufacturer: this.selectedFeature.value == 'MARKET' ? this.selectedMarket.map(x => x.marketName).join(',') : this.selectedManf.map(x => x.childManfName).join(','),
        initiatedByUserEmail: this.widget.config.userEmail,
        initiatedByUserName: this.widget.config.userName,
        searchAttribute: this.selectedFeature.value
      };
      this.store.dispatch(BrandFeatureSuggestion({ payload: dataToPost }));
    }
  }

  displayFn(value: MarketMasterModel) {
    return value ? value.marketName : '';
  }

  displayManufacturerFn(value: parentManfData) {
    return value ? value.parentManfName : '';
  }

  displayFnManf(manf: any): string {
    if (typeof manf === 'string' && manf === 'no_result') {
      return this.currentTypedValueManf;
    } else {
      this.currentTypedValueManf = '';
      return manf && manf.childManfName ? manf.childManfName : '';
    }
  }

  private listenActiveMarketChanges() {
    this.marketStore
      .select(GetActiveMarketData$)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
        filter((item) => item != null)
      )
      .subscribe((item: MarketMasterModel[]) => {
        this.allActiveMarket = item;
        this.filteredMarketOption = this.marketCtrl.valueChanges.pipe(
          startWith(''),
          map((value) => (value?.length > 0 ? this._filterMarket(value) : this.allActiveMarket.slice()))
        );
      });
  }

  private _filterMarket(value: string): MarketMasterModel[] {
    if (value?.length > 0) {
      const filterValue = value?.toLowerCase();
      return this.allActiveMarket.filter((market) => market.marketName.toLowerCase().indexOf(filterValue) === 0);
    }
  }

  isMarketSelected(market: MarketMasterModel): boolean {
    return this.selectedMarket.includes(market);
  }

  toggleSelection(item: MarketMasterModel) {
    let marketAlreadyExist = this.selectedMarket.findIndex(x => x.marketID == item.marketID);
    if (marketAlreadyExist == -1) {
      this.selectedMarket.push(item);
    } else {
      const i = this.selectedMarket.findIndex(value => value.marketID === item.marketID);
      this.selectedMarket.splice(i, 1);
    }
  }

  optionClicked(event: Event, item: MarketMasterModel) {
    event.stopPropagation();
    this.toggleSelection(item);
  }

  toggleSelectAll() {
    this.isAllSelected = !this.isAllSelected;
    let len = this.allActiveMarket.length;
    if (this.isAllSelected) {
      this.selectedMarket = this.allActiveMarket;
      this.cd.markForCheck();
    } else {
      this.selectedMarket = [];
    }
  }

  remove(market: MarketMasterModel) {
    const index = this.selectedMarket.findIndex(x => x.marketID == market.marketID);
    if (index > -1) {
      this.selectedMarket.splice(index, 1);
    }
  }

  toggleManfSelection(item: activeChildMaf) {
    let manfAlreadyExist = this.selectedManf.findIndex(x => x.childManfID == item.childManfID);
    if (manfAlreadyExist == -1) {
      this.selectedManf.push(item);
    } else {
      const i = this.selectedManf.findIndex(value => value.childManfID === item.childManfID);
      this.selectedManf.splice(i, 1);
    }
  }

  isManfSelected(manf: activeChildMaf): boolean {
    return this.selectedManf.includes(manf);
  }

  optionManfClicked(event: Event, item: activeChildMaf) {
    event.stopPropagation();
    this.toggleManfSelection(item);
  }

  toggleManfSelectAll() {
    this.isAllManfSelected = !this.isAllManfSelected;
    if (this.isAllManfSelected) {
      this.selectedManf = this.activeChildManufactureList;
      this.cd.markForCheck();
    } else {
      this.selectedManf = [];
    }
  }

  removeManf(manf: activeChildMaf) {
    const index = this.selectedManf.findIndex(x => x.childManfID == manf.childManfID);
    if (index > -1) {
      this.selectedManf.splice(index, 1);
    }
  }
}