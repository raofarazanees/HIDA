/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CreateChildManfMasterComponent } from './create-child-manf-master.component';
import { of } from 'rxjs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { activeMappingData } from '../../../model/manf-master-models/ag-grid-columns/parent-manf-column.constants';
import { scopeDefaultValues } from '../../../model/manf-master-models/ag-grid-columns/child-parent-column.constants';
import { MatSelectModule } from '@angular/material/select';
import { CdkFixedSizeVirtualScroll, CdkScrollableModule } from '@angular/cdk/scrolling';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

class StoreMock {
  select = jasmine.createSpy().and.returnValue(of([]));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

const dialogMock = {
  close: () => { }
 };

xdescribe('CreateChildManfMasterComponent', () => {
  let component: CreateChildManfMasterComponent;
  let fixture: ComponentFixture<CreateChildManfMasterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChildManfMasterComponent ],
      schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
      imports: [BrowserAnimationsModule, ReactiveFormsModule,CdkScrollableModule,MatFormFieldModule,MatInputModule, FormsModule,MatDialogModule,MatIconModule,MatButtonModule,MatSelectModule,MatAutocompleteModule],
      providers:[ {
        provide: MatDialogRef,
        useValue: dialogMock
      }, {
        provide : MAT_DIALOG_DATA,
        useValue : {}
      },
      {
        provide: Store,
        useClass: StoreMock
      },
      {
        provide: Actions,
        useClass: StoreMock
      },]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChildManfMasterComponent);
    component = fixture.componentInstance;
    component.defaultYesNoOptions =  ['Y','N'];
    component.scopeOptions =  ['Y','N'];
    component.ParentManfData = [{parentManfID:'1',parentManfName:'name'}];
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('No calls onNoClick() Spy', waitForAsync(() => {
    spyOn(component, 'onNoClick').and.callThrough();;
    component.onNoClick();
    expect(component.onNoClick).toHaveBeenCalled();
  }));

  it('calls displayFn()', waitForAsync(() => {
    spyOn(component, 'displayFn').and.callThrough();;
    component.displayFn({parentManfName:'Mock name',parentManfID:'12'});
    expect(component.displayFn).toHaveBeenCalled();
  }));

  it('calls displayFn() without obj', waitForAsync(() => {
    spyOn(component, 'displayFn').and.callThrough();
    component.currentTypedParentValue = 'Mock'
    component.displayFn('no_result');
    expect(component.displayFn).toHaveBeenCalled();
  }));
  
  it('it should call handleEmptyInput and set value', waitForAsync(() => {
    spyOn(component, 'handleEmptyInput').and.callThrough();;
    component.handleEmptyInput({target:{value:'Mock'}});
    expect(component.handleEmptyInput).toHaveBeenCalled();
    expect(component.currentTypedParentValue).toBe('Mock');
  }));

  it('it should call onSelectionChanged and set value', waitForAsync(() => {
    spyOn(component, 'onSelectionChanged').and.callThrough();;
    component.onSelectionChanged({option:{value:'Mock'}});
    expect(component.onSelectionChanged).toHaveBeenCalled();
  }));
  
  it('calls submitParentForm()', waitForAsync(() => {
    spyOn(component, 'submitParentForm').and.callThrough();
    component.submitParentForm();
    expect(component.submitParentForm).toHaveBeenCalled();
  }));
  
  


});
