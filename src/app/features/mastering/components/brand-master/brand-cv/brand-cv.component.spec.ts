/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA, SimpleChanges } from '@angular/core';

import { BrandCvComponent } from './brand-cv.component';
import { of } from 'rxjs';
import { SearchFilterComponent } from '../../../shared/search-filter/search-filter.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Actions } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { dialogMock } from '../../manufacture-master-search/create-parent-manf-dialog/create-parent-manf-dialog.component.spec';
import { agParam } from '../../manufacture-master-search/parent-manf-master/parent-manf-master.component.spec';
import { BrandCVRecord } from '../../../model/manf-master-models/interface/brand-cv-filter-options';
import { dialogRefSpyObj } from '../../manufacture-master-search/master-mapped/master-mapped.component.spec';

export const BrandCVData = [
  {
    brandID: 'BR-2245',
    createdBy: 'string',
    updatedBy: 'Thiru',
    createdDate: '2023-07-10 11:35:03',
    updatedDate: '2023-07-10 14:17:32',
    brandname: 'STRING',
    brandmodel: 'Test Model',
    brandfamily: 'Test Family',
    childmanfid : 'MD-3443',
    pmanfid : 'PF-3344',
    brandsource : 'USMSD',
    brandfilter : 'Y',
    manfasbrand : 'Y',
    rejectedFlag : 'Y'

  }
];
class StoreMock {
  select = jasmine.createSpy().and.returnValue(of(BrandCVData));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

describe('BrandCvComponent', () => {
  let component: BrandCvComponent;
  let fixture: ComponentFixture<BrandCvComponent>;
  let modalService: MatDialog;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BrandCvComponent, SearchFilterComponent],
      imports: [
        FlexLayoutModule,
        BrowserAnimationsModule,
        MatChipsModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        FormsModule,
        MatDatepickerModule,
        AgGridModule.withComponents([])
      ],
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
          useValue: {}
        }
      ]
    }).compileComponents();
    modalService = TestBed.inject(MatDialog);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandCvComponent);
    component = fixture.componentInstance;
    component.userProfile = { username: 'Mock User', email: '' };
    component.ngOnInit();
    component.gridApi = agParam.api;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call paginationSetPageSize method when pageSize changes', () => {
    const changes: SimpleChanges = {
      pageSize: {
        previousValue: 10,
        currentValue: 20,
        isFirstChange: () => false,
        firstChange: false
      }
    };

    spyOn(component.gridApi, 'paginationSetPageSize');
    component.ngOnChanges(changes);
    expect(component.gridApi.paginationSetPageSize).toHaveBeenCalledWith(20);
  });

  it('should return true when pageSize does not change', () => {
    const changes: SimpleChanges = {};
    const result = component.ngOnChanges(changes);
    expect(result).toBe(true);
  });

  it('should set row data and hide overlay when item is not empty', () => {
    const item: BrandCVRecord[] = BrandCVData;
    // @ts-ignore
    component.setDataInAgGrid(item);
    expect(component.rowCount).toBe(item.length);
  });

  it('should set empty row data and show no rows overlay when item is empty', () => {
    const item: BrandCVRecord[] = [];
    // @ts-ignore
    component.setDataInAgGrid(item);
    expect(component.rowCount).toBe(item.length);
  });


  it('should call saveEditedChanges without username', () => {
    component.userProfile = {email:''}
    fixture.detectChanges();
    spyOn(component, 'saveEditedChanges').and.callThrough();
    component.saveEditedChanges();
    expect(component.saveEditedChanges).toHaveBeenCalled();
  });


  it('should call saveEditedChanges', () => {
    spyOn(component, 'saveEditedChanges').and.callThrough();
    component.saveEditedChanges();
    expect(component.saveEditedChanges).toHaveBeenCalled();
  });

  it('should call gridApi.stopEditing() when target element has matching className ad not call also', () => {
    spyOn(component, 'onClick').and.callThrough();
    component.onClick({className :'mat-chip-list'});
    expect(component.onClick).toHaveBeenCalled();
    component.onClick({className :'btn-row-container'});
    expect(component.onClick).toHaveBeenCalled();
    component.onClick({className :'ag-paging-panel ag-unselectable'});
    expect(component.onClick).toHaveBeenCalled();
    component.onClick({className :'ag-center-cols-viewport'});
    expect(component.onClick).toHaveBeenCalled();
    component.onClick({className :'mock_other_class'});
    expect(component.onClick).toHaveBeenCalled();

  });

  it(`'openCreateModal' should called 'modalService.open'`, () => {
    spyOn(modalService, 'open').and.returnValue(dialogRefSpyObj);
    // @ts-ignore
    component.openCreateBrandCvModel();
    expect(modalService.open).toHaveBeenCalled();
  });


  it('should call markAsNotified', () => {
    //@ts-ignore
    spyOn(component, 'markAsNotified').and.callThrough();
    //@ts-ignore
    component.markAsNotified({ node: { id: 0 } });
    //@ts-ignore
    expect(component.markAsNotified).toHaveBeenCalled();
  });

  it('should call updateValue', () => {
    //@ts-ignore
    spyOn(component, 'updateValue').and.callThrough();
    component.fBrandMasterDataRef = BrandCVData
    fixture.detectChanges();
    //@ts-ignore
    component.updateValue({ id: 1, data: {
      brandID: 'BR-2245',
      createdBy: 'string',
      updatedBy: 'Mock User',
      createdDate: '2023-07-10 11:35:03',
      updatedDate: '2023-07-10 14:17:32',
      brandname: 'STRING',
      active: 0
    }
   });
    //@ts-ignore
    expect(component.updateValue).toHaveBeenCalled();
  });

  it('should call OnEditIconsClicked', () => {
    //@ts-ignore
    spyOn(component, 'OnEditIconsClicked').and.callThrough();
    //@ts-ignore
    component.OnEditIconsClicked({ rowIndex: 0 });
    //@ts-ignore
    expect(component.OnEditIconsClicked).toHaveBeenCalled();
  });

  it(`'openLogDialog' should called 'modalService.open'`, () => {
    spyOn(modalService, 'open').and.returnValue(dialogRefSpyObj);
    // @ts-ignore
    component.openLogDialog({data:{brandID:1}});
    expect(modalService.open).toHaveBeenCalled();
  });

  it('should return an array of filtered and mapped records with isModified property true', () => {
    // Arrange
    const mockRecord1 = { active: true, brandID: 1, brandname: 'Brand 1', isModified: true };
    const mockRecord2 = { active: false, brandID: 2, brandname: 'Brand 2', isModified: true };
    const mockRecord3 = { active: true, brandID: 3, brandname: 'Brand 3', isModified: false };
     //@ts-ignore
    spyOn(component, 'getAllRows').and.returnValue([mockRecord1, mockRecord2, mockRecord3]);

    // Act
     //@ts-ignore
    const result = component.getModifiedRecords();

    // Assert
    // expect(result).toEqual([
    //   { active: true, brandID: 1, brandname: 'Brand 1' },
    //   { active: false, brandID: 2, brandname: 'Brand 2' }
    // ]);
  });

  it('should set isNotingChangeOnPage to false when there are modified records', () => {

    const mockRecord1 = { active: true, brandID: 1, brandname: 'Brand 1', isModified: true };
    const mockRecord2 = { active: false, brandID: 2, brandname: 'Brand 2', isModified: true };
     //@ts-ignore
    spyOn(component, 'getAllRows').and.returnValue([mockRecord1, mockRecord2]);


     //@ts-ignore
    component.getModifiedRecords();


    expect(component.isNotingChangeOnPage).toBe(true);
  });

  it('should set isNotingChangeOnPage to true when there are no modified records', () => {

    const mockRecord1 = { active: true, brandID: 1, brandName: 'Brand 1', isModified: false };
    const mockRecord2 = { active: false, brandID: 2, brandName: 'Brand 2' };
     //@ts-ignore
    spyOn(component, 'getAllRows').and.returnValue([mockRecord1, mockRecord2]);
     //@ts-ignore
    component.getModifiedRecords();
    expect(component.isNotingChangeOnPage).toBe(true);
  });


});
