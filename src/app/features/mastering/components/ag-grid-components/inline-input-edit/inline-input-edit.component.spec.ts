/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InlineInputEditComponent } from './inline-input-edit.component';
import { MatIconModule } from '@angular/material/icon';

xdescribe('InlineInputEditComponent', () => {
  let component: InlineInputEditComponent;
  let fixture: ComponentFixture<InlineInputEditComponent>;

  const agParam = {
    stopEditing: false,
    rowIndex:0,
    value: 'xyz',
    api:{ 
      startEditingCell: jasmine.createSpy()
    },
    column: {
      getColId: () => { return 0 }
    }
  };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineInputEditComponent ],
      imports:[MatIconModule]
     })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineInputEditComponent);
    component = fixture.componentInstance;
    component.agInit(agParam);
    fixture.detectChanges();
  });

  it('should create', () => {
    component.agInit(agParam);
    expect(component).toBeTruthy();
  });

    
  it('should call onEditIconClicked function', () => {
    spyOn(component, 'onEditIconClicked').and.callThrough();
    component.onEditIconClicked();
    expect(component.onEditIconClicked).toHaveBeenCalled();
  });

  it('refresh method should return false', () => {
    expect(component.refresh()).toBeFalsy();
  });

});
