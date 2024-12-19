import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions, EffectsModule } from '@ngrx/effects';
import { Action, Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mockMasterRecord } from '../../../modal/facility-type-mock-data.constants';

import { EditComponent } from './edit.component';
import { MatIconModule } from '@angular/material/icon';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  const dialogMock = {
    close: () => {}
  };

  class StoreMock {
    select = jasmine.createSpy().and.returnValue(of({}));
    dispatch = jasmine.createSpy();
    pipe = jasmine.createSpy().and.returnValue(of('success'));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditComponent],
      imports: [MatDialogModule, FormsModule,MatIconModule, ReactiveFormsModule, StoreModule.forRoot({}), HttpClientTestingModule, MatAutocompleteModule],
      schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: mockMasterRecord
        },
        {
          provide: MatDialogRef,
          useValue: dialogMock
        },
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
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    component.mapping = {
      id: 2,
      value: 'group description | sub-group description'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`'onValueChanged' should enable submit button`, () => {
    component.defaultOption = {
      id: 2,
      value: 'group description | sub-group description'
    };
    component.onValueChanged({ id: 1, value: 'test1 | test2' });
    expect(component.isEnabledSubmitButton).toBeTruthy();
  });

  it(`'getPayload' should return the updated info`, () => {
    component.onValueChanged({ id: 1, value: 'test1 | test2' });
    // @ts-ignore
    const payload = component.getPayload();
    expect(payload.internalFacilityGroupDesc).toBe('test1');
    expect(payload.internalFacilitySubgroupDesc).toBe('test2');
  });

  it(`'internalFacilitySubgroupDesc' should be empty`, () => {
    component.onValueChanged({ id: 1, value: 'test1' });
    // @ts-ignore
    const payload = component.getPayload();
    expect(payload.internalFacilityGroupDesc).toBe('test1');
    expect(payload.internalFacilitySubgroupDesc).toBe('');
  });
});
