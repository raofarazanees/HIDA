/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { HistoryLogDialogComponent } from './history-log-dialog.component';
import { of } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { dialogMock } from '../components/manufacture-master-search/create-parent-manf-dialog/create-parent-manf-dialog.component.spec';
import { agParam } from '../components/manufacture-master-search/parent-manf-master/parent-manf-master.component.spec';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GetParentManfChangeLogGridOption } from '../model/manf-master-models/ag-grid-columns/parent-manf-changelog.constants';
import { GetChildManfChangeLogGridOption } from '../model/manf-master-models/ag-grid-columns/child-parent-changelog-constants';
import { AgGridModule } from 'ag-grid-angular';

class StoreMock {
  select = jasmine.createSpy().and.returnValue(of([]));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

describe('HistoryLogDialogComponent', () => {
  let component: HistoryLogDialogComponent;
  let fixture: ComponentFixture<HistoryLogDialogComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ HistoryLogDialogComponent ],
      imports: [BrowserAnimationsModule,MatButtonModule,MatDialogModule,MatIconModule,AgGridModule.withComponents([])],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
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
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {dialogTriggeredFor: 'ParentManf_', title: 'Parent Manf',subTitle: 'PM-1', agGridOptions: GetParentManfChangeLogGridOption(30)}
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(HistoryLogDialogComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.gridApi = agParam.api;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should call agGridInit', () => {
    new StoreMock().select.and.returnValue(of([]));
    spyOn(component,'onGridReady').and.callThrough();
    component.onGridReady(agParam);
    expect(component.onGridReady).toHaveBeenCalled();
  });

  it('should call agGridInit with no triggerData', () => {
    
    spyOn(component,'onGridReady').and.callThrough();
    component.data = {...component.data,dialogTriggeredFor:''}
    component.onGridReady(agParam);
    expect(component.onGridReady).toHaveBeenCalled();
  });
});
