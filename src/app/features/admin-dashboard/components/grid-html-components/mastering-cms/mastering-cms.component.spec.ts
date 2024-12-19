import { MasteringCmsComponent } from './mastering-cms.component';
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { UserProfileService } from '@sgty/services/userprofile';
import { of } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

const userRolesMock = ['Mastering_Attribute','Mastering_Market','Mastering_Manager','Mastering_WFadmin'];
const userRolesMockWOManger = ['Mastering_Attribute','Mastering_Market','Mastering_Manager']
const userRoles = ['Mastering_Attribute','Mastering_Market'];
class StoreMock {
  select = jasmine.createSpy().and.returnValue(of([]));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

describe('MasteringCmsComponent', () => {
  let component: MasteringCmsComponent;
  let fixture: ComponentFixture<MasteringCmsComponent>;
  let userProfileService: UserProfileService

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MasteringCmsComponent ],
      imports:[FlexLayoutModule,MatButtonModule],
      schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        UserProfileService,
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
    userProfileService = TestBed.inject(UserProfileService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasteringCmsComponent);
    component = fixture.componentInstance;
    component.allowedMasteringRoles = userRolesMock;
    fixture.detectChanges();
  });

  it('should create', () => {
     component.allowedMasteringRoles = userRolesMock;
     fixture.detectChanges();
     expect(component).toBeTruthy();
  });

  it('should called masteringRoleLabel Fn', () => {
    fixture.detectChanges();
    spyOn(component, 'masteringRoleLabel').and.callThrough();
    component.masteringRoleLabel('Mastering_Manufacturer','');
    expect(component.masteringRoleLabel).toHaveBeenCalled();  
    
  });

  it('should called checkRolesAndAssign Fn', () => {
    component.allowedMasteringRoles = userRolesMock;
    fixture.detectChanges();
    spyOn(component, 'checkRolesAndAssign').and.callThrough();
    component.checkRolesAndAssign();
    expect(component.checkRolesAndAssign).toHaveBeenCalled();  
  });

  it('should called checkRolesAndAssign Fn', () => {
    component.allowedMasteringRoles = userRolesMockWOManger;
    fixture.detectChanges();
    spyOn(component, 'checkRolesAndAssign').and.callThrough();
    component.checkRolesAndAssign();
    expect(component.checkRolesAndAssign).toHaveBeenCalled();  
  });

  it('should called checkRolesAndAssign Fn', () => {
    component.allowedMasteringRoles = userRoles;
    fixture.detectChanges();
    spyOn(component, 'checkRolesAndAssign').and.callThrough();
    component.checkRolesAndAssign();
    expect(component.checkRolesAndAssign).toHaveBeenCalled();  
  });

  // it('should called getDynamicFlex Fn FxColumn Width 50', () => {
  //   component.allowedMasteringRoles = userRolesMock;
  //   fixture.detectChanges();
  //   spyOn(component, 'getDynamicFlex').and.callThrough();
  //   component.getDynamicFlex;
  //   expect(component.getDynamicFlex).toEqual(50);  
  // });

  // it('should called getDynamicFlex Fn FxColumn Width 33', () => {
  //   component.allowedMasteringRoles = [...userRolesMock,...userRolesMock];
  //   fixture.detectChanges();
  //   spyOn(component, 'getDynamicFlex').and.callThrough();
  //   component.getDynamicFlex;
  //   expect(component.getDynamicFlex).toEqual(33);  
  // });

  // it('should called getDynamicFlex Fn FxColumn Width 100', () => {
  //   component.allowedMasteringRoles = ['Mastering'];
  //   fixture.detectChanges();
  //   spyOn(component, 'getDynamicFlex').and.callThrough();
  //   component.getDynamicFlex;
  //   expect(component.getDynamicFlex).toEqual(100);  
  // });


  
  
});
