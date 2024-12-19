import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AgGridModule } from 'ag-grid-angular';
import { of, throwError } from 'rxjs';
import { MessageService } from 'src/app/shared/services';
import { mockTaskResponse, mockSalesDataResponse } from '../modal/sales-restate-mock-data.constant';
import { SalesRestateService } from '../services/sales-restate.service';
import { SalesRestateComponent } from './sales-restate.component';
import { MatIconModule } from '@angular/material/icon';

describe('SalesRestateComponent', () => {
  let component: SalesRestateComponent;
  let fixture: ComponentFixture<SalesRestateComponent>;
  let salesRestateService: SalesRestateService;
  let modalService: MatDialog;
  let messageService: MessageService;

  class StoreMock {
    select = jasmine.createSpy().and.returnValue(of(null));
    dispatch = jasmine.createSpy();
    pipe = jasmine.createSpy().and.returnValue(of('success'));
  }
  const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });
  const mockParams = {
    successCallback: () => {
      return true;
    },
    failCallback: () => {
      return true;
    },
    sortModel: [],
    filterModel: {}
  };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SalesRestateComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatSnackBarModule,
        AgGridModule.withComponents([]),
        FormsModule,
        ReactiveFormsModule,
        MatIconModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
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
    }).compileComponents();
    salesRestateService = TestBed.inject(SalesRestateService);
    modalService = TestBed.inject(MatDialog);
    messageService = TestBed.inject(MessageService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesRestateComponent);
    component = fixture.componentInstance;
    component.distributorPguid = 1;
    component.taskDetails = mockTaskResponse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`'ngOnInit' should initialize initGridOption`, () => {
    component.ngOnInit();
    expect(component.gridOptions.datasource).toBeDefined();
  });

  it('grid API is available after `detectChanges`', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.gridOptions.api).toBeTruthy();
    });
  });

  it(`'hasExceptionLeadPermission' method should be truthy for ExceptionLead or WFadmin`, () => {
    // @ts-ignore
    component.checkExceptionLeadPermission(['Restating_WFadmin']);
    expect(component.hasExceptionLeadPermission).toBeTruthy();
  });

  it(`'openNoDataDialog' should called 'modalService.open'`, () => {
    spyOn(modalService, 'open').and.returnValue(dialogRefSpyObj);
    component.openNoDataDialog();
    expect(modalService.open).toHaveBeenCalled();
  });

  it(`'SalesRecordsSuccessHandler' should update grid data`, () => {
    // @ts-ignore
    component.gridApi = component.gridOptions.api;
    spyOn(mockParams, 'successCallback');
    // @ts-ignore
    spyOn(component.gridApi, 'hideOverlay').and.returnValue(true);
    // @ts-ignore
    component.SalesRecordsSuccessHandler(mockSalesDataResponse, mockParams);
    expect(component.gridOptions.api.hideOverlay).toHaveBeenCalled();
  });

  it(`should display no records message `, () => {
    // @ts-ignore
    component.gridApi = component.gridOptions.api;
    spyOn(mockParams, 'successCallback');
    // @ts-ignore
    spyOn(component.gridApi, 'showNoRowsOverlay').and.returnValue(true);
    // @ts-ignore
    component.SalesRecordsSuccessHandler({ totalRecords: 0, salesRestateList: [] }, mockParams);
    expect(component.gridOptions.api.showNoRowsOverlay).toHaveBeenCalled();
  });

  it(`'submitRecordsSuccessHandler' shoudl call setFilterModel and onFilterChanged method`, () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      component.gridApi = component.gridOptions.api;
      spyOn(component.gridApi, 'setFilterModel');
      spyOn(component.gridApi, 'onFilterChanged');
      // @ts-ignore
      component.submitRecordsSuccessHandler();
      expect(component.gridApi.setFilterModel).toHaveBeenCalled();
      expect(component.gridApi.onFilterChanged).toHaveBeenCalled();
    });
  });

  it(`should return Search Criteria `, () => {
    const mockFilterModel = { manufacturerKey: { filterType: 'text', type: 'contains', filter: 'car' } };
    // @ts-ignore
    const searchCriteria = component.getSearchCriteria(mockFilterModel);
    expect(searchCriteria[0].columnName).toBe('manufacturerKey');
    expect(searchCriteria[0].searchText).toBe('car');
  });

  it(`should return Sort Criteria `, () => {
    const mockSortModel = [{ colId: 'manufacturerKey', sort: 'asc' }];
    // @ts-ignore
    const sortCriteria = component.getSortCriteria(mockSortModel);
    expect(sortCriteria[0].orderBy).toBe('manufacturerKey');
  });
});
