/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { CreateParentManfDialogComponent } from './create-parent-manf-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


class StoreMock {
  select = jasmine.createSpy().and.returnValue(of({}));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

export const dialogMock = {
  close: () => { },
  open:() => {}
 };

describe('CreateParentManfDialogComponent', () => {
  let component: CreateParentManfDialogComponent;
  let fixture: ComponentFixture<CreateParentManfDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateParentManfDialogComponent ],
      schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
      imports: [BrowserAnimationsModule, ReactiveFormsModule, FormsModule,MatDialogModule,MatIconModule,MatAutocompleteModule,MatDialogModule],
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
    fixture = TestBed.createComponent(CreateParentManfDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.parentManfForm.valid).toBeFalsy();
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
    expect(component.parentManfForm.valid).toBeFalsy();
    component.parentManfForm.controls['parentManfName'].setValue("Test Mock Data");
    component.parentManfForm.controls['createdBy'].setValue("123456789");
    expect(component.parentManfForm.valid).toBeTruthy();
});

it('calls submitParentForm()', waitForAsync(() => {
  spyOn(component, 'submitParentForm').and.callThrough();
  component.submitParentForm();
  expect(component.submitParentForm).toHaveBeenCalled();
}));


});
