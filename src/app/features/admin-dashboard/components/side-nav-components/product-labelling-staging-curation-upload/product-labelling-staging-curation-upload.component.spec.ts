/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { LoaderComponent } from '@app-shared-components';
import { By } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonUploadFileDialogComponent } from '../../../shared/common-upload-file-dialog/common-upload-file-dialog.component';
import { ProductLabellingStagingCurationUploadComponent } from './product-labelling-staging-curation-upload.component';
import { UploadFileValidation } from 'src/app/features/interface/upload-file-validation';

class StoreMock {
  select = jasmine.createSpy().and.returnValue(of({}));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

const fileValid: UploadFileValidation = {
  fileName: 'HIDA_Common_File_UP_Env',
  loadingState$: null,
  fileNameShouldHave: 'HIDA_Product_Brand_Tagging_UP_[a-z]{1,8}$'
};

xdescribe('ProductLabellingStagingCurationUploadComponent', () => {
  let component: ProductLabellingStagingCurationUploadComponent;
  let fixture: ComponentFixture<ProductLabellingStagingCurationUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [CommonModule, MatButtonModule, MatIconModule, MatListModule, FlexLayoutModule],
      declarations: [ProductLabellingStagingCurationUploadComponent, LoaderComponent, CommonUploadFileDialogComponent],
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
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ProductLabellingStagingCurationUploadComponent);
    component = fixture.componentInstance;
    component.fileValidation = fileValid;

    fixture.detectChanges();
  });

  it('should upload component create', () => {
    expect(component).toBeTruthy();
  });

  it('should called OnSubmit on EMIT', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    component.onSubmit(null);
    expect(component.onSubmit).toHaveBeenCalled();
  });
});
