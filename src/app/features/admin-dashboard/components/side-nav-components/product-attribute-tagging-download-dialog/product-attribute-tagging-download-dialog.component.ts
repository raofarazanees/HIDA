import { Component, OnInit, SimpleChanges } from '@angular/core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { searchCriteriaOptions } from '../../../modal/product_attribute.constants';
import { ApplicationState, getUserProfile, UserProfileState } from '@app-store';

import { DashboardState } from '../../../store/reducers';
import { getActiveAttributesMaster, getProductAttributeFileUploadLoading, getProductAttributeFilter } from '../../../store/selectors';
import { DownloadProductAttributeTagFileSuccess, FacilityTypeCVsUploadFile, GetActiveAttributesMaster } from '../../../store/actions/common.actions';
import {
  AddSearchCriteriaProductAttribute,
  DownProductAttributeTagFile,
  ChangeProductAttributeFilterValue
} from './../../../store/actions/common.actions';
import { Attribute, ActiveAttributes, searchCriteriaInternal, ProductSearchCriteria } from './../../../store/reducers/common.reducer';
import { MessageService } from '../../../../../shared/services';
import * as moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { numberToMonth } from '../../../modal/product-graph_merged-constants';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MM_YYYY_FORMATS } from '../product-graph-merged-download-dialog/product-graph-merged-download-dialog.component';


@Component({
  selector: 'app-product-attribute-tagging-download-dialog',
  templateUrl: './product-attribute-tagging-download-dialog.component.html',
  styleUrls: ['./product-attribute-tagging-download-dialog.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MM_YYYY_FORMATS},
  ],
})
export class ProductAttributeTaggingDownloadDialogComponent implements OnInit {
  searchCriteriaOptionsData: searchCriteriaInternal[] = searchCriteriaOptions;
  activeAttributes$: Observable<ActiveAttributes> = this.store.select(getActiveAttributesMaster);
  activeAttributes: Attribute[];
  activeAttributesType: Attribute[] = [];
  activeAttributesLabel: Attribute[] = [];

  fileDownloadDataToPost: ProductSearchCriteria = ProductSearchCriteria.default();
  fileDownloadDataToPost$: Observable<ProductSearchCriteria> = this.store.select(getProductAttributeFilter);
  profile: UserProfileState;
  private readonly destroyed$ = new Subject<boolean>();
  loading$: Observable<any> = this.store.select(getProductAttributeFileUploadLoading);
  minDate: Date = new Date('01-01-2020');
  maxDate: Date = new Date();
  
  constructor(
    private readonly store: Store<DashboardState>,
    private readonly appStore: Store<ApplicationState>,
  ) {}

  ngOnInit() {
    this.store.dispatch(new GetActiveAttributesMaster());

    this.appStore
      .select(getUserProfile)
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((profile: UserProfileState) => {
        this.profile = profile;
      });

    this.activeAttributes$.subscribe((attributes: ActiveAttributes) => {
      attributes.response ? this.uniqueAttributesType(attributes.response) : null;
      this.activeAttributes = attributes.response;
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

  downloadProductAttrFile() {

    const dataToPostFile = this.fileDownloadDataToPost;
    const searchCriteriaData = dataToPostFile.searchCriteria.map((el) => {
       if (el.columnName === 'month_year') {
         el.completeDate = el.searchText;
         el.searchText = el.searchText ? moment(el.searchText).format('MM_YYYY') : '';
         return {columnName:el.columnName,searchText:el.searchText,completeDate : el.completeDate}
       }
       return {columnName:el.columnName,searchText:el.searchText}
     });  
 
     dataToPostFile.initiatedByUserName = `${this.profile.fullName}`;
     dataToPostFile.searchCriteria = searchCriteriaData;
    this.store.dispatch(new DownProductAttributeTagFile(this.fileDownloadDataToPost));
  }

  dateSelected(index: number, normalizedMonthAndYear: moment.Moment) {
    const date_ = `${numberToMonth[normalizedMonthAndYear.month()]}-${normalizedMonthAndYear.year()}`
    this.updateData(index, 'input', date_);
  }


  async updateData(index: number, type: string, value: string) {
    this.checkForAttributeTypeSelection(index, value);

      const datToUpdate = { index, type, value };
      this.store.dispatch(new ChangeProductAttributeFilterValue(datToUpdate));
  }

  private checkForAttributeTypeSelection(index: number, value: string): void {
    if(this.fileDownloadDataToPost.searchCriteria[index].columnName === 'attribute_type') {        
      this.activeAttributesLabel  = this.activeAttributes.filter( (item) => {
        return item.attributeType === value;
      }) 
    }

  }
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    this.store.dispatch(new DownloadProductAttributeTagFileSuccess({closed: true}));

  }

   uniqueAttributesType(data) {
    data.forEach( element => {
        const found = this.activeAttributesType.some( el => {
        return el.attributeType === element.attributeType;
      })
      if (!found) this.activeAttributesType = [...this.activeAttributesType,element];
    });
  }

  private toggleSelectedFilterOption() {

    this.searchCriteriaOptionsData.forEach( element => {
      const found = this.fileDownloadDataToPost.searchCriteria.some( el => {
      return el.columnName === element.columnName;
    })
      found ? element.isSelected = true : element.isSelected = false;
  });

  }
}
