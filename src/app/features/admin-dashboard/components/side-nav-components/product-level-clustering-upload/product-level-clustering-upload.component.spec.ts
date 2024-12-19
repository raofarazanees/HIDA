/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ProductLevelClusteringUploadComponent } from './product-level-clustering-upload.component';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CommonUploadFileDialogComponent } from '../../../shared/common-upload-file-dialog/common-upload-file-dialog.component';

class StoreMock {
  select = jasmine.createSpy().and.returnValue(of({}));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

describe('ProductLevelClusteringUploadComponent', () => {
  let component: ProductLevelClusteringUploadComponent;
  let fixture: ComponentFixture<ProductLevelClusteringUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [CommonModule],
      declarations: [ProductLevelClusteringUploadComponent, CommonUploadFileDialogComponent],
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
    fixture = TestBed.createComponent(ProductLevelClusteringUploadComponent);
    component = fixture.componentInstance;
    component.fileValidation = {
      fileName: 'HIDA_Common_File_UP_Env',
      loadingState$: null,
      fileNameShouldHave: 'HIDA_Product_Level_Clustering_UP_[a-z]{1,8}$'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should called OnSubmit on EMIT', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    component.onSubmit(null);
    expect(component.onSubmit).toHaveBeenCalled();
  });
});
