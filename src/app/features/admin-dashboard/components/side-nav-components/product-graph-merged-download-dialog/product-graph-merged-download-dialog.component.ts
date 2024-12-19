import { Component, OnInit } from '@angular/core';
import { UserProfileState, ApplicationState, getUserProfile } from '@app-store';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { searchCriteriaOptionsGraph } from '../../../modal/product-graph_merged-constants';
import { DashboardState } from '../../../store/reducers';
import { searchCriteriaInternal, ProductSearchCriteria, GraphProductItem } from '../../../store/reducers/common.reducer';
import { getGraphProductViewItemData, getGraphProductViewItemLoading } from '../../../store/selectors';
import {
  DownloadProductMergeUnmergedGraphFileSuccess,
  GetGraphProductItemReview,
  CloseDialogAt
} from './../../../store/actions/common.actions';

import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { DownloadGraphProductPreviewComponent } from './download-graph-product-preview/download-graph-product-preview.component';

export const MM_YYYY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

const moments = moment as unknown as { suppressDeprecationWarnings: boolean };
moments.suppressDeprecationWarnings = true;

@Component({
  selector: 'app-product-graph-merged-download-dialog',
  templateUrl: './product-graph-merged-download-dialog.component.html',
  styleUrls: ['./product-graph-merged-download-dialog.component.scss']
})
export class ProductGraphMergedDownloadDialogComponent implements OnInit {
  searchCriteriaOptionsData: searchCriteriaInternal[] = searchCriteriaOptionsGraph();

  profile: UserProfileState;
  private readonly destroyed$ = new Subject<boolean>();
  minDate: Date = new Date('01-01-2020');
  maxDate: Date = new Date();

  graphItemData$: Observable<GraphProductItem[]> = this.store.select(getGraphProductViewItemData);
  loading$: Observable<any> = this.store.select(getGraphProductViewItemLoading);
  searchCondition: string = 'AND';
  filterData: searchCriteriaInternal[] = ProductSearchCriteria.default().searchCriteria;
  currentSearchedFilter: ProductSearchCriteria;

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
      .select(getGraphProductViewItemData)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((data: GraphProductItem[]) => {
        if (data) {
          this.openItemViewDialog(data);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    this.store.dispatch(new CloseDialogAt(0));
    this.store.dispatch(new DownloadProductMergeUnmergedGraphFileSuccess({ closed: true }));
  }

  removeFilterItem(index: number) {
    this.filterData.splice(index, 1);
    this.toggleSelectedFilterOption();
  }

  addCriteria() {
    this.filterData = [...this.filterData, ProductSearchCriteria.default().searchCriteria[0]];
    this.toggleSelectedFilterOption();
  }

  downloadProductGraphFile(): void {
    const searchCriteriaData = this.filterData.map((el) => {
      if (el.columnName === 'created_date' || el.columnName === 'updated_date') {
        const date = el.dateRange;
        if (!date.begin) {
          el.searchText = `${moment(date).format('YYYY-MM-DD')}`;
        } else {
          el.searchText = `${moment(date.begin).format('YYYY-MM-DD')}||${moment(date.end).format('YYYY-MM-DD')}`;
        }
        return { columnName: el.columnName, searchText: el.searchText };
      }
      return { columnName: el.columnName, searchText: el.searchText };
    });

    this.currentSearchedFilter = {
      searchCondition: this.searchCondition,
      initiatedByUserName: this.profile.fullName,
      searchCriteria: searchCriteriaData
    };
    this.store.dispatch(new GetGraphProductItemReview(this.currentSearchedFilter));
  }

  openItemViewDialog(data: GraphProductItem[]) {
    const dialogRef = this.dialog.open(DownloadGraphProductPreviewComponent, {
      width: '100%',
      minHeight: '100vh',
      maxWidth: '96vw',
      position: { top: '20px' },
      data: { data: data, searchCriteria: this.currentSearchedFilter }
    });
  }

  filterColumnSelected(e, item, index) {
    item.columnName === 'created_date' || item.columnName === 'updated_date' ? (this.filterData[index].containSearchType = 'EQUALS') : '';
    item.searchText = '';
    item.dateRange = null;
    this.toggleSelectedFilterOption();
  }

  resetDate(i: number) {
    this.filterData[i].dateRange = null;
  }
  private toggleSelectedFilterOption() {
    this.searchCriteriaOptionsData.forEach((element) => {
      const found = this.filterData?.some((el) => {
        return el.columnName === element.columnName;
      });
      found ? (element.isSelected = true) : (element.isSelected = false);
    });
  }
}
