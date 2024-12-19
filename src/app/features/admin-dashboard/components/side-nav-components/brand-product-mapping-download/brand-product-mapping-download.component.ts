import { Component, OnInit } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileState, ApplicationState, getUserProfile } from '@app-store';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { BrandTaggingSearchCriteriaOptions } from '../../../modal/product-brand-tagging_constants';
import { numberToMonth } from '../../../modal/product-graph_merged-constants';
import {
  AddSearchCriteriaProductAttribute,
  ChangeProductAttributeFilterValue,
  DownloadProductAttributeTagFileSuccess,
  BrandMasterRecords,
  GetBrandProductReview
} from '../../../store/actions';
import { DashboardState } from '../../../store/reducers';
import { ProductBrand } from '../../../store/reducers/brand.reducer';
import { searchCriteriaInternal, ProductSearchCriteria } from '../../../store/reducers/common.reducer';
import {
  getProductAttributeFilter,
  getProductAttributeFileUploadLoading,
  getProductBrandRecords,
  retrieveProductBrand,
  retrieveProductBrandLoading
} from '../../../store/selectors';
import { MM_YYYY_FORMATS } from '../product-graph-merged-download-dialog/product-graph-merged-download-dialog.component';
import { BrandProductMappingReviewDialogComponent } from './brand-product-mapping-review-dialog/brand-product-mapping-review-dialog.component';

@Component({
  selector: 'app-brand-product-mapping-download',
  templateUrl: './brand-product-mapping-download.component.html',
  styleUrls: ['./brand-product-mapping-download.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MM_YYYY_FORMATS }
  ]
})
export class BrandProductMappingDownloadComponent implements OnInit {
  private readonly destroyed$ = new Subject<boolean>();
  searchCriteriaOptionsData: searchCriteriaInternal[] = BrandTaggingSearchCriteriaOptions;
  activeBrandProducts: string[];

  fileDownloadDataToPost: ProductSearchCriteria = ProductSearchCriteria.default();
  fileDownloadDataToPost$: Observable<ProductSearchCriteria> = this.store.select(getProductAttributeFilter);
  profile: UserProfileState;

  loading$: Observable<any> = this.store.select(retrieveProductBrandLoading);
  minDate: Date = new Date('01-01-2020');
  maxDate: Date = new Date();

  constructor(
    private readonly store: Store<DashboardState>,
    private readonly appStore: Store<ApplicationState>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.appStore
      .select(getUserProfile)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((profile: UserProfileState) => {
        this.profile = profile;
      });

    this.store
      .select(retrieveProductBrand)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((data: ProductBrand[]) => {
        if (data) this.openItemViewDialog(data);
      });

    this.store
      .select(getProductBrandRecords)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((data: string[]) => {
        if (data) {
          this.activeBrandProducts = data;
        } else if (data === null) {
          this.store.dispatch(BrandMasterRecords());
        }
      });

    this.fileDownloadDataToPost$.subscribe((item: ProductSearchCriteria) => {
      this.fileDownloadDataToPost = JSON.parse(JSON.stringify(item));
      this.toggleSelectedFilterOption();
    });
  }

  addCriteria(): void {
    const addItem = { action: 'add', data: { columnName: '', columnLabel: '', searchText: '' } };
    this.store.dispatch(new AddSearchCriteriaProductAttribute(addItem));
  }

  removeFilterItem(index: number): void {
    const itemToRemove = { action: 'remove', index: index };
    this.store.dispatch(new AddSearchCriteriaProductAttribute(itemToRemove));
  }

  retrieveBrandTaggingRecords() {
    const dataToPostFile = this.fileDownloadDataToPost;
    const searchCriteriaData = dataToPostFile.searchCriteria.map((el) => {
      if (el.columnName === 'month_year') {
        el.completeDate = el.searchText;
        el.searchText = el.searchText ? moment(el.searchText).format('MM_YYYY') : '';
        return { columnName: el.columnName, searchText: el.searchText, completeDate: el.completeDate };
      }
      return { columnName: el.columnName, searchText: el.searchText };
    });

    dataToPostFile.initiatedByUserName = `${this.profile.fullName}`;
    dataToPostFile.searchCriteria = searchCriteriaData;
    this.store.dispatch(GetBrandProductReview({ payload: this.fileDownloadDataToPost }));
  }

  dateSelected(index: number, normalizedMonthAndYear: moment.Moment) {
    const date_ = `${numberToMonth[normalizedMonthAndYear.month()]}-${normalizedMonthAndYear.year()}`;
    this.updateData(index, 'input', date_);
  }

  async updateData(index: number, type: string, value: string) {
    const datToUpdate = { index, type, value };
    this.store.dispatch(new ChangeProductAttributeFilterValue(datToUpdate));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    this.store.dispatch(new DownloadProductAttributeTagFileSuccess({ closed: true }));
  }

  private toggleSelectedFilterOption() {
    this.searchCriteriaOptionsData.forEach((element) => {
      const found = this.fileDownloadDataToPost.searchCriteria.some((el) => {
        return el.columnName === element.columnName;
      });
      found ? (element.isSelected = true) : (element.isSelected = false);
    });
  }

  private openItemViewDialog(data: ProductBrand[]) {
    const dialogRef = this.dialog.open(BrandProductMappingReviewDialogComponent, {
      width: '100%',
      minHeight: '100vh',
      maxWidth: '96vw',
      position: { top: '20px' },
      disableClose: true,
      data: { data: data }
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res && res.userClose) {
        this.updateData(0, 'radio', this.fileDownloadDataToPost.searchCondition);
      }
    });
  }
}
