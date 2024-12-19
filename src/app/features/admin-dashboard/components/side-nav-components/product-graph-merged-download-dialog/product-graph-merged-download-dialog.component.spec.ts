/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ProductGraphMergedDownloadDialogComponent } from './product-graph-merged-download-dialog.component';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoaderComponent } from '@app-shared-components';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatRadioModule} from '@angular/material/radio';
import { MessageService } from 'src/app/shared/services';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductSearchCriteria, searchCriteriaInternal } from './../../../store/reducers/common.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


class StoreMock {
  select = jasmine.createSpy().and.returnValue(of(null));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

export const DEFAULT_OPTION: searchCriteriaInternal[] =  [{columnLabel:'Test Data',columnName:"test_data",isSelected:false},{columnName:'product_id',searchText:'0'}];
export const SEARCH_DATA = [{columnName:'month_year',searchText:'01-01-2023'},{columnName:'product_id',searchText:'0'}]
export const PROFILE = {firstName:'',lastName:'',email:'',faciliyTypeRoles:[],fullName:'Test, Developer',itemMasterRoles:[],itemToProductRoles:[],manufacturerRoles:[],restatingSalesRoles:[],vendorName:'',wbDashboardRoles:[]};

describe('ProductGraphMergedDownloadDialogComponent', () => {
  let component: ProductGraphMergedDownloadDialogComponent;
  let fixture: ComponentFixture<ProductGraphMergedDownloadDialogComponent>;

  beforeEach(() => {
     TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
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
      declarations: [LoaderComponent,ProductGraphMergedDownloadDialogComponent],
      providers: [
        {
          provide: Store,
          useClass: StoreMock
        },
        {
          provide: Actions,
          useClass: StoreMock
        },
        MessageService
      ]
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ProductGraphMergedDownloadDialogComponent);
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


  it('Should called removeFilterItem Function', () => {
    spyOn(component, 'removeFilterItem').and.callThrough();
    component.removeFilterItem(0);
    expect(component.removeFilterItem).toHaveBeenCalled();
    
  })

  it('Should called addCriteria Function', () => {
    spyOn(component, 'addCriteria').and.callThrough();
    component.addCriteria();
    expect(component.addCriteria).toHaveBeenCalled();
    
  })

  
  it('Should called filterColumnSelected Function with created_date', () => {

    spyOn(component, 'filterColumnSelected').and.callThrough();
    component.filterColumnSelected('',{columnName:'created_date'},0);
    expect(component.filterData[0].containSearchType).toBe('EQUALS');
    expect(component.filterColumnSelected).toHaveBeenCalled();
    
  })

  it('Should called filterColumnSelected Function with updated_date', () => {

    spyOn(component, 'filterColumnSelected').and.callThrough();
    component.filterColumnSelected('',{columnName:'updated_date'},0);
    expect(component.filterData[0].containSearchType).toBe('EQUALS');
    expect(component.filterData[0].searchText).toBe('');
    expect(component.filterData[0].dateRange).toBe(null);
    expect(component.filterColumnSelected).toHaveBeenCalled();
    
  })

  it('Should called filterColumnSelected Function with other', () => {

    spyOn(component, 'filterColumnSelected').and.callThrough();
    component.filterColumnSelected('',{columnName:'other_selection'},0);
    expect(component.filterData[0].searchText).toBe('');
    expect(component.filterData[0].dateRange).toBe(null);
    expect(component.filterColumnSelected).toHaveBeenCalled();
    
  })
  it('Should called filterColumnSelected resetDate with dateRange Value Null', () => {
    spyOn(component, 'resetDate').and.callThrough();
    component.resetDate(0);
    expect(component.filterData[0].dateRange).toBe(null);
  })

  
  

  xit('Should called downloadProductGraphFile Function', () => {
    component.currentSearchedFilter = {searchCondition:'AND',searchCriteria:SEARCH_DATA};
    component.profile = PROFILE
    fixture.detectChanges();
    spyOn(component, 'downloadProductGraphFile').and.callThrough();
    component.downloadProductGraphFile();
    expect(component.downloadProductGraphFile).toHaveBeenCalled();
  })

  it('Should called downloadProductGraphFile Check Date Blank Function', () => {
    SEARCH_DATA[0].searchText = '';
    component.currentSearchedFilter = {searchCondition:'AND',searchCriteria:SEARCH_DATA};
    component.profile = PROFILE
    fixture.detectChanges();
    spyOn(component, 'downloadProductGraphFile').and.callThrough();
    component.downloadProductGraphFile();
    expect(component.downloadProductGraphFile).toHaveBeenCalled();
    
  })

  // xit('Should called toggleSelectedFilterOption Function', () => {
  //   component.searchCriteriaOptionsData = DEFAULT_OPTION;
  //   component.fileDownloadDataToPost = {searchCondition:'AND',searchCriteria:SEARCH_DATA};
  //   fixture.detectChanges();
  //   // @ts-ignore
  //   spyOn(component, 'toggleSelectedFilterOption').and.callThrough();
  //   // @ts-ignore
  //   component.toggleSelectedFilterOption();   
  // })
  

});
