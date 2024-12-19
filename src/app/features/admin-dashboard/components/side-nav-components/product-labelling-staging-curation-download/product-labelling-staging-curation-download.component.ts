import { retrieveProductStagingUNSPSCs } from './../../../store/selectors/product-staging.selector';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileState, ApplicationState, getUserProfile } from '@app-store';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { DownloadProductAttributeTagFileSuccess, GetProductStagingUNSPSCs, ProductStagingUNSPSCsFail } from '../../../store/actions';
import { DashboardState } from '../../../store/reducers';
import { searchCriteriaInternal, ProductSearchCriteria } from '../../../store/reducers/common.reducer';
import {  GetProductStagingLoading } from '../../../store/selectors';
import { ProductStagingInterface } from '../../../store/reducers/product-staging.reducer';
import { ProductStagingReviewRecordsComponent } from './product-staging-review-records/product-staging-review-records.component';
import { ProductStagingDownloadFilter } from '../../../modal/product_staging_download.modal';

@Component({
  selector: 'app-product-labelling-staging-curation-download',
  templateUrl: './product-labelling-staging-curation-download.component.html',
  styleUrls: ['./product-labelling-staging-curation-download.component.scss']
})
export class ProductLabellingStagingCurationDownloadComponent implements OnInit {
  
  private readonly destroyed$ = new Subject<boolean>();
  searchCriteriaOptionsData: searchCriteriaInternal[] = ProductStagingDownloadFilter();

  profile: UserProfileState;

  loading$: Observable<any> = this.store.select(GetProductStagingLoading);
  minDate: Date = new Date('01-01-2020');
  maxDate: Date = new Date();

  searchCondition:string ='AND';
  filterData:searchCriteriaInternal[] = ProductSearchCriteria.default().searchCriteria;
  currentSearchedFilter:ProductSearchCriteria;

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
      .select(retrieveProductStagingUNSPSCs)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((data: ProductStagingInterface[]) => {
        if (data) { this.openItemViewDialog(data); }
      });

  }

  removeFilterItem(index: number) {
    this.filterData.splice(index,1);
    this.toggleSelectedFilterOption();
  }

  addCriteria() {
   this.filterData = [...this.filterData,ProductSearchCriteria.default().searchCriteria[0]];
   this.toggleSelectedFilterOption();
  }

  retrieveProductStagingUNSPSCs() {
    const searchCriteriaData = this.filterData.map((el) => {
      if (el.columnName === 'created_date' || el.columnName === 'updated_date') {
        const date = el.dateRange;
        if (!date.begin) {
          el.searchText = `${moment(date).format('YYYY-MM-DD')}`;
        } else {
          el.searchText = `${moment(date.begin).format('YYYY-MM-DD')}||${moment(date.end).format('YYYY-MM-DD')}`;
        }
        return { columnName: el.columnName, searchText: el.searchText};
      }
      return { columnName: el.columnName, searchText: el.searchText };
    });

    this.currentSearchedFilter = {searchCondition:this.searchCondition,initiatedByUserName:this.profile.fullName,searchCriteria:searchCriteriaData};
    this.store.dispatch(GetProductStagingUNSPSCs({ payload: this.currentSearchedFilter }));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    this.store.dispatch(new DownloadProductAttributeTagFileSuccess({ closed: true }));
    this.store.dispatch(ProductStagingUNSPSCsFail({payload:{}}));

  }

  filterColumnSelected(e,item,index) {
    (item.columnName === 'created_date' || item.columnName === 'updated_date') ? this.filterData[index].containSearchType = 'EQUALS' : '';
    item.searchText = '';
    item.dateRange = null;
    this.toggleSelectedFilterOption();
  }

  resetDate(i: number) {
    this.filterData[i].dateRange = null;
  }

  private toggleSelectedFilterOption() {
    this.searchCriteriaOptionsData.forEach((element) => {
      const found = this.filterData.some((el) => {
        return el.columnName === element.columnName;
      });
      found ? (element.isSelected = true) : (element.isSelected = false);
    });
  }

  private openItemViewDialog(data: ProductStagingInterface[]) {
    const dialogRef = this.dialog.open(ProductStagingReviewRecordsComponent, {
      width: '100%',
      minHeight: '100vh',
      maxWidth: '96vw',
      position: { top: '20px' },
      disableClose: true,
      data: { data: data }
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res && res.userClose) {
      }
    });
  }
}
