import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AgGridModule } from 'ag-grid-angular';
import { of } from 'rxjs';
import { mockMasterRecord } from '../../../modal/facility-type-mock-data.constants';
import { LogDialogComponent } from './log-dialog.component';
import { MatIconModule } from '@angular/material/icon';

describe('LogDialogComponent', () => {
  let component: LogDialogComponent;
  let fixture: ComponentFixture<LogDialogComponent>;

  class StoreMock {
    select = jasmine.createSpy().and.returnValue(of({}));
    dispatch = jasmine.createSpy();
    pipe = jasmine.createSpy().and.returnValue(of('success'));
  }

  const dialogMock = {
    close: () => {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogDialogComponent],
      schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule,MatIconModule, MatDialogModule, AgGridModule.withComponents([])],
      providers: [
        {
          provide: Store,
          useClass: StoreMock
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: mockMasterRecord
        },
        {
          provide: MatDialogRef,
          useValue: dialogMock
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogDialogComponent);
    component = fixture.componentInstance;
    // @ts-ignore
    spyOn(component, 'listenDataChanges').and.callFake(() => true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('grid API is available after `detectChanges`', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.gridOptions.api).toBeTruthy();
    });
  });
});
