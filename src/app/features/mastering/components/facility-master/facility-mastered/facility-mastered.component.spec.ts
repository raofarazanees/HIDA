/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FacilityMasteredComponent } from './facility-mastered.component';

xdescribe('FacilityMasteredComponent', () => {
  let component: FacilityMasteredComponent;
  let fixture: ComponentFixture<FacilityMasteredComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityMasteredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityMasteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should complete destroyed$ subject', () => {
    spyOn(component.gridApi, 'destroy');
    spyOn(component.destroyed$, 'next');
    spyOn(component.destroyed$, 'complete');
    component.ngOnDestroy();
    expect(component.gridApi.destroy).toHaveBeenCalled();
    expect(component.destroyed$.next).toHaveBeenCalledWith(true);
    expect(component.destroyed$.complete).toHaveBeenCalled();
  });

});
