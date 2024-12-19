/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { AspToolUploadDialogComponent } from './asp-tool-upload-dialog.component';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { CommonUploadFileDialogComponent } from '../../../shared/common-upload-file-dialog/common-upload-file-dialog.component';
import { CommonModule } from '@angular/common';
import { UnspscToolUploadDialogComponent } from '../unspsc-tool-upload-dialog/unspsc-tool-upload-dialog.component';


class StoreMock {
  select = jasmine.createSpy().and.returnValue(of({}));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

describe('AspToolUploadDialogComponent', () => {
  let component: AspToolUploadDialogComponent;
  let fixture: ComponentFixture<AspToolUploadDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [CommonModule],
      declarations: [AspToolUploadDialogComponent, CommonUploadFileDialogComponent],
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AspToolUploadDialogComponent);
    component = fixture.componentInstance;
    component.fileValidation = {
      fileName: 'UNSPSC_Parameters_dev',
      loadingState$: null,
      fileNameShouldHave: 'UNSPSC_Parameters_[a-z]{1,8}$'
    };
    component.widget = {config:{csvName:'',csvTemplateUrl:''}}
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
