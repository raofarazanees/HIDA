import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions, EffectsModule } from '@ngrx/effects';
import { Action, Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';

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
      imports: [MatDialogModule, FormsModule,MatIconModule, ReactiveFormsModule, StoreModule.forRoot({}), HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { manufacturerInternalId: 1, internalManufacturerDesc: 'xyz' }
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`'onValueChanged' should enable submit button`, () => {
    component.defaultOption = {
      id: 0,
      value: 'N/A'
    };
    component.onValueChanged({ id: 1, value: 'test' });
    expect(component.isEnabledSubmitButton).toBeTruthy();
  });

  it(`'getPayload' should return the updated info`, () => {
    component.onValueChanged({ id: 1, value: 'test1' });
    // @ts-ignore
    const payload = component.getPayload();
    expect(payload.internalManufacturerDesc).toBe('test1');
    expect(payload.manufacturerInternalId).toBe(1);
  });
});
