/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { UomUploadDialogComponent } from './uom-upload-dialog.component';
import { CommonModule } from '@angular/common';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { CommonUploadFileDialogComponent } from '../../../shared/common-upload-file-dialog/common-upload-file-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
class StoreMock {
  select = jasmine.createSpy().and.returnValue(of({}));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}
describe('UomUploadDialogComponent', () => {
  let component: UomUploadDialogComponent;
  let fixture: ComponentFixture<UomUploadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [CommonModule,MatMenuModule],
      declarations: [UomUploadDialogComponent, CommonUploadFileDialogComponent],
      providers: [
        {
          provide: Store,
          useClass: StoreMock
        },
        {
          provide: Actions,
          useClass: StoreMock
        },
        {
          provide: Window,
          useValue: { location: { href: 'https://localhost-dev.dev.com' } }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UomUploadDialogComponent);
    component = fixture.componentInstance;
    component.fileValidation = {
      fileName: 'HIDA_UOM_Workflow_Initiation_UP_',
      loadingState$: null,
      fileNameShouldHave: 'HIDA_UOM_Workflow_Initiation_UP_[a-z]{1,8}$'
    };
    component.base_url = 'https://localhost-dev.dev.com';
    component.widget = {alternateSideNav:false}
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

  it('should called OnSubmit on EMIT For Correction', () => {
    component.widget = {alternateSideNav:false}
    fixture.detectChanges();
    spyOn(component, 'onSubmit').and.callThrough();
    component.onSubmit(null);
    expect(component.onSubmit).toHaveBeenCalled();
  });


  it('should return dev if running on dev/local', () => {
    // @ts-ignore
    spyOn(component, 'getAppRunningEnv').and.callThrough();
    // @ts-ignore
    component.getAppRunningEnv();
    // @ts-ignore
    expect(component.getAppRunningEnv).toHaveBeenCalled();
    expect(component.env).toBe('dev');
    component.base_url = 'http://localhost-int.int.com';
  });

  it('should return int if running on int env', () => {
    component.base_url = 'http://localhost-int.int.com';
    fixture.detectChanges();
    // @ts-ignore
    spyOn(component, 'getAppRunningEnv').and.callThrough();
    // @ts-ignore
    component.getAppRunningEnv();
    expect(component.env).toBe('int');
  });

  it('should return uat if running on uat env', () => {
    component.base_url = 'http://localhost-uat.uat.com';
    fixture.detectChanges();
    // @ts-ignore
    spyOn(component, 'getAppRunningEnv').and.callThrough();
    // @ts-ignore
    component.getAppRunningEnv();
    expect(component.env).toBe('uat');
  });

  it('should return prod if running on prod env', () => {
    component.base_url = 'http://localhost-prod.prod.com';
    fixture.detectChanges();
    // @ts-ignore
    spyOn(component, 'getAppRunningEnv').and.callThrough();
    // @ts-ignore
    component.getAppRunningEnv();
    expect(component.env).toBe('prod');
  });

  it('should return dev if running on default env', () => {
    component.base_url = 'http://localhost.com';
    fixture.detectChanges();
    // @ts-ignore
    spyOn(component, 'getAppRunningEnv').and.callThrough();
    // @ts-ignore
    component.getAppRunningEnv();
    expect(component.env).toBe('dev');
  });
});
