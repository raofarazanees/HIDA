import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { CreateBrandCvComponent } from './create-brand-cv.component';
import { of } from 'rxjs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { dialogMock } from '../../../manufacture-master-search/create-parent-manf-dialog/create-parent-manf-dialog.component.spec';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

class StoreMock {
  select = jasmine.createSpy().and.returnValue(of([]));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

describe('CreateBrandCvComponent', () => {
  let component: CreateBrandCvComponent;
  let fixture: ComponentFixture<CreateBrandCvComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBrandCvComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        MatIconModule,
        MatAutocompleteModule,
        MatDialogModule,
        MatSelectModule,
        MatInputModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogMock
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { name: 'SubGrpName' }
        },
        {
          provide: Store,
          useClass: StoreMock
        },
        {
          provide: Actions,
          useClass: StoreMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBrandCvComponent);
    component = fixture.componentInstance;
    component.activeChildManufactureList = [];
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty', () => {
    expect(component.brandCVMasterForm.valid).toBeFalsy();
  });

  it('No calls onNoClick()', waitForAsync(() => {
    spyOn(component, 'onNoClick');
    const button = fixture.debugElement.nativeElement.querySelector('#cancel');
    button.click();
    expect(component.onNoClick).toHaveBeenCalled();
  }));

  it('No calls onNoClick() Spy', waitForAsync(() => {
    spyOn(component, 'onNoClick').and.callThrough();
    component.onNoClick();
    expect(component.onNoClick).toHaveBeenCalled();
  }));

  it('submitting a form emits a user', () => {
    expect(component.brandCVMasterForm.valid).toBeFalsy();
    component.brandCVMasterForm.controls['createdBy'].setValue('Test Mock Data');
    component.brandCVMasterForm.controls['brandName'].setValue('Mock Market Name');
    component.brandCVMasterForm.controls['brandFamily'].setValue('Mock brandFamily Name');
    component.brandCVMasterForm.controls['brandModel'].setValue('Mock brandModel Name');
    component.brandCVMasterForm.controls['brandSource'].setValue('Mock brandSource Name');
    component.brandCVMasterForm.controls['childManufacturerId'].setValue('Mock childManufacturerId Name');
    expect(component.brandCVMasterForm.valid).toBeTruthy();
  });

  it('submitting a form emits a user', () => {
    expect(component.brandCVMasterForm.valid).toBeFalsy();
    component.brandCVMasterForm.controls['createdBy'].setValue('');
    component.brandCVMasterForm.controls['brandName'].setValue('');
    expect(component.brandCVMasterForm.valid).toBeFalsy();
  });

  it('calls submitParentForm()', waitForAsync(() => {
    spyOn(component, 'submitBrandForm').and.callThrough();
    component.submitBrandForm();
    expect(component.submitBrandForm).toHaveBeenCalled();
  }));
});
