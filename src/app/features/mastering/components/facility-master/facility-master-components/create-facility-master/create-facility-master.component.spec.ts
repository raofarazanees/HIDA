/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { CreateFacilityMasterComponent } from './create-facility-master.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { dialogMock } from '../../../manufacture-master-search/create-parent-manf-dialog/create-parent-manf-dialog.component.spec';
import { of } from 'rxjs';

class StoreMock {
  select = jasmine.createSpy().and.returnValue(of({date:1234,dialogType:'market'}));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}


describe('CreateFacilityMasterComponent', () => {
  let component: CreateFacilityMasterComponent;
  let fixture: ComponentFixture<CreateFacilityMasterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFacilityMasterComponent ],
      schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
      imports: [BrowserAnimationsModule, ReactiveFormsModule, FormsModule,MatDialogModule,MatIconModule,MatAutocompleteModule,MatDialogModule],
      providers:[ {
        provide: MatDialogRef,
        useValue: dialogMock
      }, {
        provide : MAT_DIALOG_DATA,
        useValue : {name:'SubGrpName'}
      },
      {
        provide: Store,
        useClass: StoreMock
      },
      {
        provide: Actions,
        useClass: StoreMock
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFacilityMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty', () => {
    expect(component.facilityMasterForm.valid).toBeFalsy();
});

  it('No calls onNoClick()', waitForAsync(() => {
    spyOn(component, 'onNoClick');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('#cancel');
    button.click();
    expect(component.onNoClick).toHaveBeenCalled();
  }));

  it('No calls onNoClick() Spy', waitForAsync(() => {
    spyOn(component, 'onNoClick').and.callThrough();;
    component.onNoClick();
    expect(component.onNoClick).toHaveBeenCalled();
  }));


  it('submitting a form emits a user', () => {
    expect(component.facilityMasterForm.valid).toBeFalsy();
    component.facilityMasterForm.controls['createdBy'].setValue("Test Mock Data");
    component.facilityMasterForm.controls['facilityGroupName'].setValue("Mock Market Name");
    component.facilityMasterForm.controls['facilitySubgroupName'].setValue("Mock submarket Name");
    expect(component.facilityMasterForm.valid).toBeTruthy();
});

it('calls submitParentForm()', waitForAsync(() => {
  spyOn(component, 'submitFacilityForm').and.callThrough();
  component.submitFacilityForm();
  expect(component.submitFacilityForm).toHaveBeenCalled();
}));


});
