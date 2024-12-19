/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ProductLabellingStagingCurationDownloadComponent } from './product-labelling-staging-curation-download.component';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductSearchCriteria, searchCriteriaInternal } from '../../../store/reducers/common.reducer';
import { LoaderComponent } from '@app-shared-components';
import { ProductStagingReviewRecordsComponent } from './product-staging-review-records/product-staging-review-records.component';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';


class StoreMock {
  select = jasmine.createSpy().and.returnValue(of({}));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

const DEFAULT_OPTION: searchCriteriaInternal[] = [{ columnLabel: 'Test Data', columnName: 'test_data', isSelected: false }];
export const SEARCH_DATA = [{columnName:'month_year',searchText:'01-01-2023'},{columnName:'product_id',searchText:'0'}]
export const PROFILE = {firstName:'',lastName:'',email:'',faciliyTypeRoles:[],fullName:'Test, Developer',itemMasterRoles:[],itemToProductRoles:[],manufacturerRoles:[],restatingSalesRoles:[],vendorName:'',wbDashboardRoles:[]};

xdescribe('ProductLabellingStagingCurationDownloadComponent', () => {
  let component: ProductLabellingStagingCurationDownloadComponent;
  let fixture: ComponentFixture<ProductLabellingStagingCurationDownloadComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ProductLabellingStagingCurationDownloadComponent, LoaderComponent,ProductStagingReviewRecordsComponent],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        FlexLayoutModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatDividerModule,
        MatRadioModule,
        MatSnackBarModule
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: Store,
          useClass: StoreMock
        },
        {
          provide: Actions,
          useClass: StoreMock
        },
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
        {
          provide: MatDialogRef,
          useValue: { close: () => {} }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: []
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLabellingStagingCurationDownloadComponent);
    component = fixture.componentInstance;
    component.searchCriteriaOptionsData = DEFAULT_OPTION;
    component.filterData = [ {
      columnLabel: '',
      columnName: '',
      searchText: '',
      containSearchType:'EQUALS',
      dateRange:null
    }]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

;

  it('Should called removeFilterItem Function', () => {
    spyOn(component, 'removeFilterItem').and.callThrough();
    component.removeFilterItem(0);
    expect(component.removeFilterItem).toHaveBeenCalled();
  });

  it('Should called addCriteria Function', () => {
    spyOn(component, 'addCriteria').and.callThrough();
    component.addCriteria();
    expect(component.addCriteria).toHaveBeenCalled();
  });

  it('Should called retrieveProductStagingUNSPSCs Function', () => {
    spyOn(component, 'retrieveProductStagingUNSPSCs');
    const button = fixture.debugElement.queryAll(By.css('.upload-btn'));
    button[0].triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.retrieveProductStagingUNSPSCs).toHaveBeenCalled();
  });

  it('Should called retrieveProductStagingUNSPSCs Function', () => {
    component.currentSearchedFilter = {searchCondition:'AND',searchCriteria:SEARCH_DATA};
    component.profile = PROFILE
    fixture.detectChanges();
    spyOn(component, 'retrieveProductStagingUNSPSCs').and.callThrough();
    component.retrieveProductStagingUNSPSCs();
    expect(component.retrieveProductStagingUNSPSCs).toHaveBeenCalled();
  })

  it('Should called retrieveProductStagingUNSPSCs Check Date Blank Function', () => {
    SEARCH_DATA[0].searchText = '';
    component.currentSearchedFilter = {searchCondition:'AND',searchCriteria:SEARCH_DATA};
    component.profile = PROFILE
    fixture.detectChanges();
    spyOn(component, 'retrieveProductStagingUNSPSCs').and.callThrough();
    component.retrieveProductStagingUNSPSCs();
    expect(component.retrieveProductStagingUNSPSCs).toHaveBeenCalled();
    
  })

  xit('Should called toggleSelectedFilterOption Function', () => {
    component.searchCriteriaOptionsData = DEFAULT_OPTION;
    component.currentSearchedFilter = {searchCondition:'AND',searchCriteria:SEARCH_DATA};
    fixture.detectChanges();
    // @ts-ignore
    spyOn(component, 'toggleSelectedFilterOption').and.callThrough();
    // @ts-ignore
    component.toggleSelectedFilterOption();   
  })
  
  
});
