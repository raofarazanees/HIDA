/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { CreateMarketMasterComponent } from './create-market-master.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

class StoreMock {
  select = jasmine.createSpy().and.returnValue(of({date:1234,dialogType:'market'}));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

export const dialogMock = {
  close: () => { },
  open:() => {}
 };


describe('CreateMarketMasterComponent', () => {
  let component: CreateMarketMasterComponent;
  let fixture: ComponentFixture<CreateMarketMasterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMarketMasterComponent ],
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
    fixture = TestBed.createComponent(CreateMarketMasterComponent);
    component = fixture.componentInstance;
    component.ngOnInit();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.marketMasterForm.valid).toBeFalsy();
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

  
it('calls submitParentForm()', waitForAsync(() => {
  spyOn(component, 'submitMarketForm').and.callThrough();
  component.submitMarketForm();
  expect(component.submitMarketForm).toHaveBeenCalled();
}));

  it('submitting a form emits a user', () => {
    expect(component.marketMasterForm.valid).toBeFalsy();
    component.marketMasterForm.controls['createdBy'].setValue("Test Mock Data");
    component.marketMasterForm.controls['marketName'].setValue("Mock Market Name");
    component.marketMasterForm.controls['submarketName'].setValue("Mock submarket Name");
    expect(component.marketMasterForm.valid).toBeTruthy();
});



});
