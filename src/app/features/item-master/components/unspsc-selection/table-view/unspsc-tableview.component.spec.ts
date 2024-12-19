import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import * as exp from 'constants';
import { of } from 'rxjs';
import { mockTableViewResponse } from '../../../modal/item-master-mock-data.constants';
import { ItemMasterService } from '../../../services/item-master.service';
import { UnspscTableviewComponent } from './unspsc-tableview.component';

describe('UnspscTableviewComponent', () => {
  let component: UnspscTableviewComponent;
  let fixture: ComponentFixture<UnspscTableviewComponent>;
  let itemMasterService: ItemMasterService;

  const mockSelectedRecord = mockTableViewResponse.data[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnspscTableviewComponent],
      schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        AgGridModule.withComponents([]),
        MatInputModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnspscTableviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    itemMasterService = TestBed.inject(ItemMasterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit  should initialize the sear form', () => {
    component.ngOnInit();
    expect(component.formGroup.get('level').value).toBe('*');
    expect(component.formGroup.get('fieldName').value).toBe('*');
    expect(component.formGroup.get('searchText').value).toBe('');
  });

  it('ngOnInit  should initialize grid options', () => {
    component.ngOnInit();
    expect(component.gridOptions.columnDefs.length).toBe(4);
  });

  it('grid API is available after `detectChanges`', () => {
    fixture.detectChanges();
    expect(component.gridOptions.api).toBeTruthy();
  });

  it('the grid cells should be as expected', () => {
    const appElement = fixture.nativeElement;
    const cellElements = appElement.querySelectorAll('.ag-cell-value');
    expect(cellElements.length).toEqual(4);
  });

  it('Should update the data on Filter Changed', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      spyOn(itemMasterService, 'getAllUnspscRecords').and.returnValue(of(mockTableViewResponse));
      component.searchHandler();
      expect(itemMasterService.getAllUnspscRecords).toHaveBeenCalled();
    });
  });

  it('Backend api response should be reflected in UI', () => {
    fixture.whenStable().then(() => {
      spyOn(itemMasterService, 'getAllUnspscRecords').and.returnValue(of(mockTableViewResponse));
      component.searchHandler();
      let rowData = [];
      component.gridOptions.api.forEachNode((node) => rowData.push(node.data));
      expect(rowData.length).toBe(2);
    });
  });

  it('getSelectedRows methos should update the selectedRecord', () => {
    fixture.whenStable().then(() => {
      spyOn(itemMasterService, 'getAllUnspscRecords').and.returnValue(of(mockTableViewResponse));
      component.searchHandler();
      component.gridOptions.api.forEachNode((node) => {
        if (node.data.itemPGUID === 'urn:onto:247191') {
          node.setSelected(true);
        }
      });
      component.onSelectionChanged({});
      expect(component.selectedRecord.itemPGUID).toBe('urn:onto:247191');
    });
  });

  it('onSelectClick should emit the selected record', () => {
    component.selectedRecord = mockSelectedRecord;
    const emitParam = {
      unspscCode: '53131602',
      segmentCode: '53000000',
      segmentTitle: 'Apparel and Luggage and Personal Care Products',
      familyCode: '53130000',
      familyTitle: 'Personal care products',
      classCode: '53131600',
      classTitle: 'Bath and body',
      commodityCode: '53131602',
      commodityTitle: 'Hair care supplies',
      internalItemKey: 'urn:onto:247191'
    };
    spyOn(component.onDialogClose, 'emit');
    component.onSelectClick();
    expect(component.onDialogClose.emit).toHaveBeenCalledWith(emitParam);
  });

  xit('First level selection should work', () => {
    component.selectedRecord = {
      itemPGUID: 'urn:onto:247191',
      level1: {
        code: '53000000',
        title: 'Apparel and Luggage and Personal Care Products'
      }
    };
    const emitParam = {
      unspscCode: '53000000',
      segmentCode: '53000000',
      segmentTitle: 'Apparel and Luggage and Personal Care Products'
    };
    spyOn(component.onDialogClose, 'emit');
    component.onSelectClick();
    expect(component.onDialogClose.emit).toHaveBeenCalled();
  });

  it(`should display no records message `, () => {
    const mockParams = {
      successCallback: () => {
        return true;
      },
      endRow: 2
    };
    // @ts-ignore
    component.gridApi = component.gridOptions.api;
    spyOn(mockParams, 'successCallback');
    // @ts-ignore
    spyOn(component.gridApi, 'showNoRowsOverlay').and.returnValue(true);
    // @ts-ignore
    component.updateGrid({ totalRecords: 0, data: [] }, mockParams);
    expect(component.gridOptions.api.showNoRowsOverlay).toHaveBeenCalled();
  });

  it(`value formater should work `, () => {
    // @ts-ignore
    const columnDef = component.getColumnDefs();
    let formatedText = columnDef[0].valueFormatter({ value: { code: 10000000, title: 'level1' } });
    expect(formatedText).toEqual('10000000 | level1');
    formatedText = columnDef[1].valueFormatter({ value: { code: 10100000, title: 'level2' } });
    expect(formatedText).toEqual('10100000 | level2');
    formatedText = columnDef[2].valueFormatter({ value: { code: 10101000, title: 'level3' } });
    expect(formatedText).toEqual('10101000 | level3');
    formatedText = columnDef[3].valueFormatter({ value: { code: 10101010, title: 'level4' } });
    expect(formatedText).toEqual('10101010 | level4');
  });

  it(`should return Sort Criteria `, () => {
    const mockSortModel = [{ colId: 'level1', sort: 'asc' }];
    // @ts-ignore
    const sortCriteria = component.getSortCriteria(mockSortModel);
    expect(sortCriteria[0].orderBy).toBe('level1');
  });

  it(`externalFilterPass should be true `, () => {
    const param = {
      data: {
        filedToBeFiltered: {
          matches: () => {
            return true;
          }
        }
      }
    };
    // @ts-ignore
    expect(component.doesExternalFilterPass(param)).toBeTruthy();
  });
});
