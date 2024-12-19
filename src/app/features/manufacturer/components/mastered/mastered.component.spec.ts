import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AgGridModule } from 'ag-grid-angular';
import { of, throwError } from 'rxjs';
import { MessageService } from 'src/app/shared/services';
import { ManufacturerService } from '../../services/manufacturer.service';
import { MasteredComponent } from './mastered.component';
import { MatIconModule } from '@angular/material/icon';

describe('MasteredComponent', () => {
  let component: MasteredComponent;
  let fixture: ComponentFixture<MasteredComponent>;
  let modalService: MatDialog;
  let manufacturerService: ManufacturerService;
  let messageService: MessageService;

  const dialogMock = {
    close: () => {}
  };

  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });
  class StoreMock {
    select = jasmine.createSpy().and.returnValue(of({}));
    dispatch = jasmine.createSpy();
    pipe = jasmine.createSpy().and.returnValue(of('success'));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MasteredComponent],
      schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule,MatIconModule, MatDialogModule, MatSnackBarModule, AgGridModule.withComponents([])],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: 'Test profuct description'
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
    modalService = TestBed.inject(MatDialog);
    manufacturerService = TestBed.inject(ManufacturerService);
    messageService = TestBed.inject(MessageService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`'ngOnInit' should initialize initGridOption`, () => {
    component.ngOnInit();
    expect(component.gridOptions.columnDefs.length).toBe(5);
  });

  it('grid API is available after `detectChanges`', () => {
    fixture.detectChanges();
    expect(component.gridOptions.api).toBeTruthy();
  });

  it('the grid cells should be as expected', () => {
    const appElement = fixture.nativeElement;
    const cellElements = appElement.querySelectorAll('.ag-cell-value');
    expect(cellElements.length).toEqual(5);
  });

  it(`'getPayloadForMasteredManufacturerList', should return 'externalManufacturerKey' as default sortCriteria`, () => {
    const params = {
      sortModel: [],
      filterModel: {}
    };
    expect(component.getPayloadForMasteredManufacturerList(params).sortCriteria[0].orderBy).toEqual('externalManufacturerKey');
    expect(component.getPayloadForMasteredManufacturerList(params).sortCriteria[0].sortBy).toEqual('asc');
  });

  it(`'getPayloadForMasteredManufacturerList' should return correct payload`, () => {
    const params = {
      sortModel: [{ sort: 'asc', colId: 'distributorName' }],
      filterModel: {}
    };
    expect(component.getPayloadForMasteredManufacturerList(params).sortCriteria[0].orderBy).toEqual('distributorName');
    expect(component.getPayloadForMasteredManufacturerList(params).sortCriteria[0].sortBy).toEqual('asc');
  });

  it(`'getPayloadForMasteredManufacturerList' should return correct searchCriteria`, () => {
    const params = {
      sortModel: [],
      filterModel: { distributorName: { filterType: 'text', type: 'contains', filter: 'car' } }
    };
    expect(component.getPayloadForMasteredManufacturerList(params).searchCriteria[0].columnName).toEqual('distributorName');
    expect(component.getPayloadForMasteredManufacturerList(params).searchCriteria[0].searchText).toEqual('car');
  });

  it(`'getManufacturerMaster' should call successCallback method`, () => {
    const data = { list: [{ internalManufacturerKey: 'test', internalManufacturerDesc: 'test' }], totalRecords: 1 };
    const params = {
      successCallback: () => {
        return true;
      }
    };
    component.gridApi = component.gridOptions.api;
    spyOn(params, 'successCallback');
    spyOn(component.gridApi, 'hideOverlay').and.returnValue();
    component.getManufacturerMaster(data, params);
    expect(params.successCallback).toHaveBeenCalled();
  });

  it(`'getManufacturerMaster' should call showNoRowsOverlay method for zero records`, () => {
    const data = { list: [], totalRecords: 0 };
    const params = {
      successCallback: () => {
        return true;
      }
    };
    spyOn(component.gridOptions.api, 'showNoRowsOverlay');
    component.getManufacturerMaster(data, params);
    expect(component.gridOptions.api.showNoRowsOverlay).toHaveBeenCalled();
  });

  it(`Should display error message after getMasteredRecords error`, () => {
    // @ts-ignore
    component.gridApi = component.gridOptions.api;
    component.distributorPguid = 1;
    const params = {
      failCallback: () => {
        return true;
      }
    };
    spyOn(manufacturerService, 'getMasteredManufacturerList').and.returnValue(
      throwError({
        error: {
          message: 'Error  while saving'
        }
      })
    );
    spyOn(messageService, 'open');
    component.getMasteredManufacturerList(params, {});
    expect(messageService.open).toHaveBeenCalled();
  });

  xit(`Custom error message should display for getMasteredRecords`, () => {
    const params = {
      failCallback: () => {
        return true;
      }
    };
    // @ts-ignore
    component.gridApi = component.gridOptions.api;
    component.distributorPguid = 1;
    spyOn(manufacturerService, 'getMasteredManufacturerList').and.returnValue(throwError({ data: null }));
    spyOn(messageService, 'open');
    component.getMasteredManufacturerList(params, {});
    expect(messageService.open).toHaveBeenCalledWith('An error occured while fetching the mastered manufacturer records', 'Close');
  });

  it(`'openLogModal' should called 'modalService.open'`, () => {
    spyOn(modalService, 'open').and.returnValue(dialogRefSpyObj);
    // @ts-ignore
    component.openLogModal();
    expect(modalService.open).toHaveBeenCalled();
  });
});
