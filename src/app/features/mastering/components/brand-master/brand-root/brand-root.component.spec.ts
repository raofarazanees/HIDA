/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { BrandRootComponent } from './brand-root.component';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, Subject } from 'rxjs';
import { ModuleLandingPageComponent } from '@app-shared-components';
import { MatIconModule } from '@angular/material/icon';
import { BrandCvComponent } from '../brand-cv/brand-cv.component';

class StoreMock {
  select = jasmine.createSpy().and.returnValue(of([]));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

describe('BrandRootComponent', () => {
  let component: BrandRootComponent;
  let fixture: ComponentFixture<BrandRootComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandRootComponent,ModuleLandingPageComponent,BrandCvComponent ],
      imports:[FlexLayoutModule,BrowserAnimationsModule, ReactiveFormsModule,MatIconModule, FormsModule,MatTabsModule,MatDialogModule],
      schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
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
    fixture = TestBed.createComponent(BrandRootComponent);
    component = fixture.componentInstance;
    component.userProfile = {username:'Mock User',email:''}
    component.selectedTab = 4;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('unmasteredRecords tab selection should work', () => {
    component.onTabChange({ index: 4 } as MatTabChangeEvent);
    expect(component.selectedTab).toBe(4);
  });

  it('Page Size 20 when selected 0', () => {
    component.userProfile = {username:'Mock User',email:''}
    component.changePaginationSize(0);
    fixture.detectChanges();
    expect(component.pageSize).toBe(20);
  });

  it('Page Size 50 when selected 50', () => {
    component.changePaginationSize(50);
    component.userProfile = {username:'Mock User',email:''}
    fixture.detectChanges();
    expect(component.pageSize).toBe(50);
  });
  
});
