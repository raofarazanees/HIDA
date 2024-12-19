/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { FacilityRootComponent } from './facility-root.component';
import { of } from 'rxjs';
import { ModuleLandingPageComponent } from '@app-shared-components';
import { ForFacilityMappingComponent } from '../for-facility-mapping/for-facility-mapping.component';
import { FacilityMasterComponent } from '../facility-master-components/facility-master.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MatDialogModule } from '@angular/material/dialog';

class StoreMock {
  select = jasmine.createSpy().and.returnValue(of([]));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

xdescribe('FacilityRootComponent', () => {
  let component: FacilityRootComponent;
  let fixture: ComponentFixture<FacilityRootComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityRootComponent,ModuleLandingPageComponent,ForFacilityMappingComponent,FacilityMasterComponent ],
      imports:[FlexLayoutModule,BrowserAnimationsModule, ReactiveFormsModule, FormsModule,MatTabsModule,MatDialogModule],
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
    fixture = TestBed.createComponent(FacilityRootComponent);
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
