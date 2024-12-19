import { AgGridTypeaheadComponent } from '@app-shared-components';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AgGridModule } from 'ag-grid-angular';
import { FilterChangedEvent } from 'ag-grid-community';
import { of, throwError } from 'rxjs';
import { MessageService } from 'src/app/shared/services';
import { mockTaskResponse, mockUnmasteredDataResponse, mockUpdatedRecords } from '../../modal/manufacturer-mock-data.constants';
import { ManufacturerService } from '../../services/manufacturer.service';
import { UnmasteredComponent } from './unmastered.component';
import { MatIconModule } from '@angular/material/icon';

describe('UnmasteredComponent', () => {
  let component: UnmasteredComponent;
  let fixture: ComponentFixture<UnmasteredComponent>;
  let manufacturerService: ManufacturerService;
  let modalService: MatDialog;
  let messageService: MessageService;

  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });
  class StoreMock {
    select = jasmine.createSpy().and.returnValue(of({}));
    dispatch = jasmine.createSpy();
    pipe = jasmine.createSpy().and.returnValue(of('success'));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnmasteredComponent,AgGridTypeaheadComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule, BrowserAnimationsModule, MatDialogModule,MatIconModule, MatSnackBarModule, AgGridModule.withComponents([AgGridTypeaheadComponent])],
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
    manufacturerService = TestBed.inject(ManufacturerService);
    modalService = TestBed.inject(MatDialog);
    messageService = TestBed.inject(MessageService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnmasteredComponent);
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

  it('the grid cells should be as expected', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const appElement = fixture.nativeElement;
      const cellElements = appElement.querySelectorAll('.ag-cell-value');
      expect(cellElements.length).toEqual(4);
    });
  });

  it(`'isExceptionLead' method should be truthy for ExceptionLead or WFadmin`, () => {
    component.checkExceptionLeadPermission(['Mastering_WFadmin']);
    expect(component.isExceptionLead).toBeTruthy();
  });

  it(`'isEscalatedTask' should work`, () => {
    // @ts-ignore
    expect(component.isEscalatedTask()).toBeFalsy();
  });

  it(`Should return correct payload for SaveForLater `, () => {
    component.updatedRecords = mockUpdatedRecords;
    const payload = component.getPayloadForSaveForLater();
    expect(payload.distributorPguid).toEqual(1);
    expect(payload.masterData[0].internalManufacturerDesc).toBe('1888 MILLS');
  });

  it(`Should clear the updated records after SaveForLater success`, () => {
    component.updatedRecords = mockUpdatedRecords;
    spyOn(manufacturerService, 'saveForLater').and.returnValue(
      of({ message: 'HIDA Task object is Save For Later successfully', totalMappedRecords: 1 })
    );
    component.manufacturerSaveForLater();
    expect(component.updatedRecords.length).toBe(0);
  });

  it(`'openEscalateButton' should called 'modalService.open'`, () => {
    spyOn(modalService, 'open').and.returnValue(dialogRefSpyObj);
    component.openEscalateDialog();
    expect(modalService.open).toHaveBeenCalled();
  });

  it(`'openNoDataDialog' should called 'modalService.open'`, () => {
    spyOn(modalService, 'open').and.returnValue(dialogRefSpyObj);
    component.openNoDataDialog();
    expect(modalService.open).toHaveBeenCalled();
  });

  it(`'closeTaskOnForce' should called 'modalService.open'`, () => {
    spyOn(modalService, 'open').and.returnValue(dialogRefSpyObj);
    component.closeTaskOnForce();
    expect(modalService.open).toHaveBeenCalled();
  });

  it(`'getTotalMappedRecordsCount' should update the totalMappedRecords `, () => {
    spyOn(manufacturerService, 'getTotalMappedRecordsCount').and.returnValue(of({ totalMappedRecords: 1 }));
    // @ts-ignore
    component.getTotalMappedRecordsCount();
    // @ts-ignore
    expect(component.totalMappedRecords).toBe(1);
  });

  it(`'manufacturerSubmitRecords' should called 'manufacturerService.updateManufacturer'`, () => {
    spyOn(manufacturerService, 'updateManufacturer').and.returnValue(of({ message: 'Success' }));
    // @ts-ignore
    spyOn(component, 'getAllRows').and.returnValue(mockUpdatedRecords);
    component.gridApi = component.gridOptions.api;
    component.manufacturerSubmitRecords();
    expect(manufacturerService.updateManufacturer).toHaveBeenCalled();
  });

  it(`'unmasteredRecordsSuccessHandler' should update grid data`, () => {
    const mockParams = {
      successCallback: () => {
        return true;
      },
      sortModel: [],
      filterModel: { distributorName: { filterType: 'text', type: 'contains', filter: 'car' } }
    };
    // @ts-ignore
    component.gridApi = component.gridOptions.api;
    spyOn(mockParams, 'successCallback');
    // @ts-ignore
    spyOn(component.gridApi, 'hideOverlay').and.returnValue(true);
    // @ts-ignore
    component.unmasteredRecordsSuccessHandler(mockUnmasteredDataResponse, mockParams);
    expect(component.gridOptions.api.hideOverlay).toHaveBeenCalled();
  });

  it(`should display no records message `, () => {
    const mockParams = {
      successCallback: () => {
        return true;
      },
      sortModel: [],
      filterModel: {}
    };
    // @ts-ignore
    component.gridApi = component.gridOptions.api;
    spyOn(mockParams, 'successCallback');
    // @ts-ignore
    spyOn(component.gridApi, 'showNoRowsOverlay').and.returnValue(true);
    // @ts-ignore
    component.unmasteredRecordsSuccessHandler({ totalRecords: 0, list: [] }, mockParams);
    expect(component.gridOptions.api.showNoRowsOverlay).toHaveBeenCalled();
  });

  it(`should enable submit suttion `, () => {
    // @ts-ignore
    component.addToUpdatedRecords({ data: mockUpdatedRecords[0] });
    expect(component.isEnabledSubmitButton).toBeTruthy();
  });

  it(`should enable submit suttion after reupdating records `, () => {
    component.updatedRecords = mockUpdatedRecords;
    // @ts-ignore
    component.addToUpdatedRecords({ data: mockUpdatedRecords[0] });
    expect(component.isEnabledSubmitButton).toBeTruthy();
  });

  it(`submitRecordsSuccessHandler should display success message `, () => {
    component.gridApi = component.gridOptions.api;
    spyOn(messageService, 'open');
    // @ts-ignore
    component.submitRecordsSuccessHandler('Test message');
    // @ts-ignore
    expect(messageService.open).toHaveBeenCalledWith('Test message', 'Close');
  });

  it(`submitRecordsSuccessHandler should display custom message `, () => {
    component.gridApi = component.gridOptions.api;
    spyOn(messageService, 'open');
    // @ts-ignore
    component.submitRecordsSuccessHandler();
    // @ts-ignore
    expect(messageService.open).toHaveBeenCalledWith('Records are submited successfully', 'Close');
  });

  it(`saveForLaterSuccessHandler should display success message `, () => {
    component.gridApi = component.gridOptions.api;
    // @ts-ignore
    component.totalRecords = 1;
    spyOn(messageService, 'open');
    // @ts-ignore
    component.saveForLaterSuccessHandler({ totalMappedRecords: 1, message: 'Test message' });
    // @ts-ignore
    expect(messageService.open).toHaveBeenCalledWith('Test message', 'Close');
  });

  it(`saveForLaterSuccessHandler should display custom message `, () => {
    component.gridApi = component.gridOptions.api;
    // @ts-ignore
    component.totalRecords = 1;
    spyOn(messageService, 'open');
    // @ts-ignore
    component.saveForLaterSuccessHandler({ totalMappedRecords: 1 });
    // @ts-ignore
    expect(messageService.open).toHaveBeenCalledWith('Records are saved successfully', 'Close');
  });

  it(`should return Sort Criteria `, () => {
    const mockSortModel = [{ colId: 'externalManufacturerKey', sort: 'asc' }];
    // @ts-ignore
    const sortCriteria = component.getSortCriteria(mockSortModel);
    expect(sortCriteria[0].orderBy).toBe('externalManufacturerKey');
  });

  it(`Should display error message after submitRecords error`, () => {
    spyOn(manufacturerService, 'updateManufacturer').and.returnValue(
      throwError({
        data: null
      })
    );
    // @ts-ignore
    component.gridApi = component.gridOptions.api;
    spyOn(messageService, 'open');
    component.manufacturerSubmitRecords();
    expect(messageService.open).toHaveBeenCalled();
  });

  it(`Should display error message after getUnmasteredRecords error`, () => {
    // @ts-ignore
    component.gridApi = component.gridOptions.api;
    component.distributorPguid = 1;
    const params = {
      failCallback: () => {
        return true;
      }
    };
    spyOn(manufacturerService, 'getUnmasteredRecords').and.returnValue(
      throwError({
        error: {
          message: 'Error  while fetching'
        }
      })
    );
    spyOn(messageService, 'open');
    // @ts-ignore
    component.getUnmasteredRecords(params, {});
    expect(messageService.open).toHaveBeenCalled();
  });

  it(`Should display custom error message for getUnmasteredRecords`, () => {
    // @ts-ignore
    component.gridApi = component.gridOptions.api;
    component.distributorPguid = 1;
    const params = {
      failCallback: () => {
        return true;
      }
    };
    spyOn(manufacturerService, 'getUnmasteredRecords').and.returnValue(throwError({ data: null }));
    spyOn(messageService, 'open');
    // @ts-ignore
    component.getUnmasteredRecords(params, {});
    expect(messageService.open).toHaveBeenCalledWith('An error occured while fetching the mastered records', 'Close');
  });

  it(`Should display error message after getTotalMappedRecordsCount error`, () => {
    spyOn(manufacturerService, 'getTotalMappedRecordsCount').and.returnValue(
      throwError({
        error: {
          message: 'Error  while fetching count'
        }
      })
    );
    spyOn(messageService, 'open');
    // @ts-ignore
    component.getTotalMappedRecordsCount();
    expect(messageService.open).toHaveBeenCalled();
  });

  it(`Should display custom error message for getTotalMappedRecordsCount`, () => {
    spyOn(manufacturerService, 'getTotalMappedRecordsCount').and.returnValue(throwError({ data: null }));
    spyOn(messageService, 'open');
    // @ts-ignore
    component.getTotalMappedRecordsCount();
    expect(messageService.open).toHaveBeenCalledWith('An error occured while fetching the record count', 'Close');
  });

  it(`Should display error message after SaveForLater error`, () => {
    component.updatedRecords = mockUpdatedRecords;
    spyOn(manufacturerService, 'saveForLater').and.returnValue(
      throwError({
        error: {
          message: 'Error  while saving'
        }
      })
    );
    spyOn(messageService, 'open');
    component.manufacturerSaveForLater();
    expect(messageService.open).toHaveBeenCalled();
  });

  it(`Custom error message should display for SaveForLater`, () => {
    component.updatedRecords = mockUpdatedRecords;
    spyOn(manufacturerService, 'saveForLater').and.returnValue(throwError({ data: null }));
    spyOn(messageService, 'open');
    component.manufacturerSaveForLater();
    expect(messageService.open).toHaveBeenCalledWith('An error occured while saving manufacturer records', 'Close');
  });
});
