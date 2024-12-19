
import { BrandMasterUploadDialogComponent } from './brand-master-upload-dialog.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { LoaderComponent } from '@app-shared-components';
import { By } from '@angular/platform-browser';

class StoreMock {
  select = jasmine.createSpy().and.returnValue(of({}));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

describe('BrandMasterUploadDialogComponent', () => {
  let component: BrandMasterUploadDialogComponent;
  let fixture: ComponentFixture<BrandMasterUploadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [CommonModule, MatButtonModule, MatIconModule, MatListModule, FlexLayoutModule],
      declarations: [BrandMasterUploadDialogComponent, LoaderComponent],
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
    fixture = TestBed.createComponent(BrandMasterUploadDialogComponent);
    component = fixture.componentInstance;
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
