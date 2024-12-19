
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
import { ProductGraphUploadDialogComponent } from './product-graph-upload-dialog.component';

class StoreMock {
  select = jasmine.createSpy().and.returnValue(of({}));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

xdescribe('BrandProductMappingUploadComponent', () => {
  let component: ProductGraphUploadDialogComponent;
  let fixture: ComponentFixture<ProductGraphUploadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [CommonModule, MatButtonModule, MatIconModule, MatListModule, FlexLayoutModule],
      declarations: [ProductGraphUploadDialogComponent, CommonUploadFileDialogComponent],
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

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGraphUploadDialogComponent);
    component = fixture.componentInstance;
    component.fileValidation = {
      fileName: 'HIDA_Common_File_UP_Env',
      loadingState$: null,
      fileNameShouldHave: 'HIDA_Product_Brand_Tagging_UP_[a-z]{1,8}$'
    };

    fixture.detectChanges();
  });

  it('should graph component create', () => {
    expect(component).toBeTruthy();
  });

  it('should called OnSubmit on EMIT', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    component.onSubmit(null);
    expect(component.onSubmit).toHaveBeenCalled();
  });
});
