/* tslint:disable:no-unused-variable */
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ItemProductIncrementalProcessComponent } from './item-product-incremental-process.component';
import { MatButtonModule } from '@angular/material/button';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

class StoreMock {
  select = jasmine.createSpy().and.returnValue(of({}));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

const widget =  {
  cols: 2,
  rows: 2,
  y: 0,
  x: 0,
  type: 'html',
  key: 'incremental_process',
  bottomKey: '',
  color: '#008000d1',
  title: 'Item To Product - Incremental Process',
  access: ['Dashboard_Item_Taxonomy_Admin'],
  genericTitle: '',
  config: {
    uploadBtnText: 'Trigger Incremental Process',
    genericBtnText: 'i2p_trigger',
    info: 'Manage Item to Product Incremental Process'
  }
}

describe('ItemProductIncrementalProcessComponent', () => {
  let component: ItemProductIncrementalProcessComponent;
  let fixture: ComponentFixture<ItemProductIncrementalProcessComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ ItemProductIncrementalProcessComponent ],
      imports:[MatButtonModule],
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
    fixture = TestBed.createComponent(ItemProductIncrementalProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call incremental function on click', fakeAsync( () => {
    component.widget = widget;
    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    spyOn(component, 'startIncrementProcess').and.callThrough();
    component.startIncrementProcess();
    expect(component.startIncrementProcess).toHaveBeenCalled();

  }))
  
  it('should call outbound function on click', fakeAsync( () => {
    spyOn(component, 'startOutBoundRefresh').and.callThrough();
    component.startOutBoundRefresh();
    expect(component.startOutBoundRefresh).toHaveBeenCalled();

  }))

  it('should call TriggerBrandDAG on click', fakeAsync( () => {
    spyOn(component, 'triggerBrandAirflowProcess').and.callThrough();
    component.triggerBrandAirflowProcess();
    expect(component.triggerBrandAirflowProcess).toHaveBeenCalled();

  }))

});

