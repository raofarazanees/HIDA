import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { mockMappingOptions } from 'src/app/features/facility-type/modal/facility-type-mock-data.constants';

import { AgGridTypeaheadComponent } from './ag-grid-typeahead.component';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

class StoreMock {
  select = jasmine.createSpy().and.returnValue(of({}));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

describe('AgGridTypeaheadComponent', () => {
  let component: AgGridTypeaheadComponent;
  let fixture: ComponentFixture<AgGridTypeaheadComponent>;
  const agParam = {
    stopEditing: false,
    value: 'xyz',
    data: {userRole:'ADMIN'},
    colDef: {
      cellEditorParams: {
        mappingOptions: [
          {
            id: 1,
            value: 'abc'
          },
          {
            id: 2,
            value: 'xyz'
          }
        ]
      }
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatAutocompleteModule, ReactiveFormsModule,MatIconModule],
      declarations: [AgGridTypeaheadComponent],
      providers:  [
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('agInit method should update the initial values', () => {
    component.agInit(agParam);
    expect(component.stopEditing).toBeFalsy();
  });

  it('refresh method should returns true', () => {
    expect(component.refresh(agParam)).toBeTruthy();
  });

  it('getValue method should returns true', () => {
    component.control.setValue({ id: 2, value: 'xyz' });
    expect(component.getValue().id).toBe(2);
  });

  it('getValue method should returns initial param value', () => {
    component.agInit(agParam);
    expect(component.getValue()).toBe('xyz');
  });

  it('trackByID method should returns id property value', () => {
    expect(component.trackByID(1, { id: 2, value: 'xyz' })).toBe(2);
  });

  it('getDisplayValue method should returns corrent display value', () => {
    expect(component.getDisplayValue({ id: 2, value: 'xyz' })).toBe('xyz');
  });

  it('mappingOptions should filter by serach text', () => {
    component.mappingOptions = mockMappingOptions;
    // @ts-ignore
    const filteredList = component.filterMappings({ value: 'AS' });
    expect(filteredList.length).toBe(1);
  });

  it('should return all mappingOptions for clear search text', () => {
    component.mappingOptions = mockMappingOptions;
    // @ts-ignore
    const filteredList = component.filterMappings('');
    expect(filteredList.length).toBe(2);
  });

  it('sortBystring method should work as expected', () => {
    // @ts-ignore
    expect(component.sortBystring({ value: 'ASC | OUTPATIENT' }, { value: 'ASC | AMBULATORY' })).toBe(1);
  });
});
