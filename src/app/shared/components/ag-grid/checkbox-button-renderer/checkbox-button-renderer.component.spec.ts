import { NgModule } from '@angular/core';
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CheckboxButtonRendererComponent } from './checkbox-button-renderer.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

describe('CheckboxButtonRendererComponent', () => {
  let component: CheckboxButtonRendererComponent;
  let fixture: ComponentFixture<CheckboxButtonRendererComponent>;

  let params: any = {
    value: 'A',
    api: {
      getRowNode: () => {
        return { productId: 15, setData: () => {} };
      }
    },
    node: {
      id: 1
    },
    data: {
      productID: 12
    },
    colDef: {
      headerName: 'Approve'
    },
    column: {
      colId:'taskLevelRecords'
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxButtonRendererComponent],
      imports: [MatCheckboxModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxButtonRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`'agInit' should update params and status `, () => {
    component.agInit(params);
    expect(component.status).toBe('A');
    expect(component.selectionColor).toBe('primary');
  });

  it(`'agInit' should update params and header should Approve `, () => {
    params.colDef = {
      headerName: 'Approve'
    };
    fixture.detectChanges();
    component.agInit(params);
    expect(component.status).toBe('A');
    expect(component.selectionColor).toBe('primary');
  });

  it(`'agInit' should update params and header should Reject `, () => {
    params.colDef = {
      headerName: 'Reject'
    };
    component.agInit(params);
    component.status = 'N';
    expect(component.status).toBe('N');
    expect(component.value).toBe('N');
    expect(component.selectionColor).toBe('warn');
  });

  it(`'agInit' should update params and status `, () => {
    fixture.detectChanges();
    component.agInit(params);
    expect(component.status).toBe('A');
  });

  it(`'refresh' should return true `, () => {
    expect(component.refresh(params)).toBeTruthy();
  });

  it('Should trigger onChange fn', () => {
    component.agInit(params);
    spyOn(component, 'onChange').and.callThrough();
    component.onChange({ checked: false, source: { value: 'N' } });
    expect(fixture.componentInstance.onChange).toHaveBeenCalled();
  });

  it('Should trigger onChange fn', () => {
    component.agInit(params);
    spyOn(component, 'onChange').and.callThrough();
    component.onChange({ checked: true, source: { value: 'A' } });
    expect(fixture.componentInstance.onChange).toHaveBeenCalled();
  });
});
