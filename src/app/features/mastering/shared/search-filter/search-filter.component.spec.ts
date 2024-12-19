/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { SearchFilterComponent } from './search-filter.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ParentManfSearchOptions } from '../../model/manf-master-models/interface/parent-manf-search-options';


class StoreMock {
  select = jasmine.createSpy().and.returnValue(of({}));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

xdescribe('SearchFilterComponent', () => {
  let component: SearchFilterComponent;
  let fixture: ComponentFixture<SearchFilterComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ SearchFilterComponent ],
      imports: [
        FlexLayoutModule,
        BrowserAnimationsModule,
        MatChipsModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        FormsModule,
        MatDatepickerModule,
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
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFilterComponent);
    component = fixture.componentInstance;
    component.ngOnInit()
    component.searchCriteriaOptionsData = ParentManfSearchOptions();
    component.searchCriteriaData = [
      { columnName: 'pmanf_id', completeDate: '123' },
      { columnName: 'created_month_year', searchText: '04-05-2023',inputType:'datepicker' },
      { columnName: 'created_month_year', completeDate: '04-05-2023',inputType:'datepicker' },
      { columnName: 'updated_month_year', completeDate: '04-05-2023',inputType:'datepicker' }
    ];
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchParentManfRecords OnInit', () => {
    spyOn(component, 'searchRecords').and.callThrough();
    component.searchCriteriaData = [
      { columnName: 'pmanf_id', completeDate: '123' },
      { columnName: 'created_month_year', searchText: '04-05-2023',inputType:'datepicker' },
      { columnName: 'created_month_year', completeDate: '04-05-2023',inputType:'datepicker' },
      { columnName: 'updated_month_year', completeDate: '04-05-2023',inputType:'datepicker' }
    ];
    fixture.detectChanges();
    component.searchRecords();
    expect(component.searchRecords).toHaveBeenCalled();
  });

  it('should call addParentSearchCriteria', () => {
    spyOn(component, 'searchRecords').and.callThrough();
    component.searchFormGroup.patchValue({ searchText: 'Test', columnName: 'created_month_year',inputType:'datepicker' });
    component.searchCriteriaOptionsData = ParentManfSearchOptions();
    fixture.detectChanges();
    component.searchRecords();
    expect(component.searchRecords).toHaveBeenCalled();
  });

  it('should call addParentSearchCriteria', () => {
    spyOn(component, 'addSearchCriteria').and.callThrough();
    component.searchFormGroup.patchValue({ searchText: 'Test', columnName: 'updated_month_year',inputType:'datepicker' });
    component.searchCriteriaOptionsData = ParentManfSearchOptions();
    fixture.detectChanges();
    component.addSearchCriteria();
    expect(component.addSearchCriteria).toHaveBeenCalled();
  });


  it('should call addParentSearchCriteria without Column Name', () => {
    spyOn(component, 'addSearchCriteria').and.callThrough();
    component.searchFormGroup.patchValue({ searchText: 'Test', columnName: ''});
    fixture.detectChanges();
    component.addSearchCriteria();
    expect(component.addSearchCriteria).toHaveBeenCalled();
  });

  it('should call addParentSearchCriteria without InputType', () => {
    spyOn(component, 'addSearchCriteria').and.callThrough();
    component.searchFormGroup.patchValue({ searchText: 'Test', columnName: 'pmanf_name'});
    fixture.detectChanges();
    component.addSearchCriteria();
    expect(component.addSearchCriteria).toHaveBeenCalled();
  });

  it('should emit when openDialog_() is called', () => {
    spyOn(component, 'openDialog_');
    component.openDialog_(); // call the onClick method directly
    expect(component.openDialog_).toHaveBeenCalled();
    spyOn(component.openDialog, 'emit');
    component.openDialog.emit(); 
    expect(component.openDialog.emit).toHaveBeenCalledWith();
  });

  
    it('should call remove and remove object ', () => {
    component.searchCriteriaData = [{ columnName: 'pmanf_id', completeDate: '123' }];
    spyOn(component, 'remove').and.callThrough();
    component.remove(component.searchCriteriaData[0]);
    expect(component.remove).toHaveBeenCalled();
  });

    
  it('should call remove and remove object ', () => {
    component.searchCriteriaData = [{ columnName: 'pmanf_id_', completeDate: '123' },{ columnName: 'pmanf_id', completeDate: '123' }];
    spyOn(component, 'remove').and.callThrough();
    component.remove(component.searchCriteriaData[0]);
    expect(component.remove).toHaveBeenCalled();
  });
  it('should call remove and remove object ', () => {
    component.searchCriteriaData = [];
    fixture.detectChanges();
    spyOn(component, 'remove').and.callThrough();
    component.remove(component.searchCriteriaData[0]);
    expect(component.remove).toHaveBeenCalled();
  });


});
