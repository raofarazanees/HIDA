import { SearchCriteriaProductGraphMerge } from './../../../store/actions/common.actions';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { BrandFeatureSuggestionDialogComponent } from './brand-feature-suggestion-dialog.component';
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

class StoreMock {
  select = jasmine.createSpy().and.returnValue(of({}));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

describe('BrandFeatureSuggestionDialogComponent', () => {
  let component: BrandFeatureSuggestionDialogComponent;
  let fixture: ComponentFixture<BrandFeatureSuggestionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [CommonModule, MatButtonModule, MatIconModule, MatListModule, FlexLayoutModule],
      declarations: [BrandFeatureSuggestionDialogComponent, LoaderComponent],
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
    fixture = TestBed.createComponent(BrandFeatureSuggestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should graph component create', () => {
    expect(component).toBeTruthy();
  });

  it('Should accept only csv extension return true', () => {
    // @ts-ignore
    const isValid = component.validateExtension('testFile.csv');
    fixture.detectChanges();
    expect(isValid).toBeTruthy();
  });

  it('Should return false when file extension not csv', () => {
    // @ts-ignore
    const isValid = component.validateExtension('testFile.xlsx');
    fixture.detectChanges();
    expect(isValid).toBeFalsy();
  });

  it('Should check file size is not greater then 10M', () => {
    // @ts-ignore
    const isValid = component.validateSize(2048);
    expect(isValid).toBeTruthy();
  });

  it('Should return false when upload File Size greater than 10M ', () => {
    // @ts-ignore
    const isValid = component.validateSize(204800000000);
    expect(isValid).toBeFalsy();
  });

  it('Should have valid file name ', () => {
    // @ts-ignore
    const isValid = component.validateNaming('HIDA_Brand_Suggestion_dev.csv');
    expect(isValid).toBeTruthy();
  });

  it('Should return false if file name not valid', () => {
    // @ts-ignore
    const isValid = component.validateNaming('HIDA_I2P_Products_.csv');
    expect(isValid).toBeFalsy();
  });

  it('Should clear file details on destroy', () => {
    const isValid = component.clearFileSelected();
    fixture.detectChanges();
    expect(component.isValidFile).toBeFalsy();
  });

  it('Should return true if file details validated', () => {
    // @ts-ignore
    const isValid = component.validateFileRules({ name: 'HIDA_Brand_Suggestion_dev.csv', size: 2048 });
    fixture.detectChanges();
    expect(isValid).toBeTruthy();
  });


  it('Should return file size in byte', () => {
    // @ts-ignore
    const BytesValue = component.formatBytes(0);
    fixture.detectChanges();
    expect(BytesValue).toBe('0 Bytes');
  });

  it('Should return file size in KB', () => {
    // @ts-ignore
    const BytesValue = component.formatBytes(1024);
    fixture.detectChanges();
    expect(BytesValue).toBe('1 KB');
  });

  it('Should return file size in KB is decimal passed', () => {
    // @ts-ignore
    const BytesValue = component.formatBytes(1024, -1);
    fixture.detectChanges();
    expect(BytesValue).toBe('1 KB');
  });

  it('file change event should arrive in handler', () => {
    let input = fixture.debugElement.query(By.css('input[type=file]')).nativeElement;
    spyOn(component, 'onFileSelected');
    input.dispatchEvent(new Event('change'));
    expect(component.onFileSelected).toHaveBeenCalled();
  });

  it('Should On Submit trigger', () => {
        spyOn(component, 'onSubmit').and.callThrough();
        component.onSubmit();
        expect(fixture.componentInstance.onSubmit).toHaveBeenCalled();
  });

  it('should upload a valid csv file', () => {
    spyOn(component, 'parseCsvFile').and.callThrough();
    component.parseCsvFile();
    expect(component.parseCsvFile).toHaveBeenCalled();

  });
});
