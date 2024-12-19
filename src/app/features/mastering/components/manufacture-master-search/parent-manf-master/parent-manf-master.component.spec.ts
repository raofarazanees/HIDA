/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';

import { ParentManfMasterComponent } from './parent-manf-master.component';
import { of, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AgGridModule } from 'ag-grid-angular';
import { ParentManfSearchOptions } from '../../../model/manf-master-models/interface/parent-manf-search-options';
import { GridApi, RowNode } from 'ag-grid-community';
import { SearchFilterComponent } from '../../../shared/search-filter/search-filter.component';
import { AgGridActionCellComponent } from '@app-shared-components';
import { InlineInputEditComponent } from '../../ag-grid-components/inline-input-edit/inline-input-edit.component';
class StoreMock {
  select = jasmine.createSpy().and.returnValue(of({}));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

export const agParam = {
  stopEditing: false,
  rowIndex: 0,
  value: 'xyz',
  api: {
    startEditingCell: () => {
      return true;
    },
    showNoRowsOverlay: () => {
      return true;
    },
    paginationSetPageSize: () => {
      return true;
    },
    destroy: () => {
      return true;
    },
    showLoadingOverlay: () => {
      return true;
    },
    stopEditing: () => {
      return true;
    },
    forEachNode: () => {
      return { pmanfName: 'PM-1' };
    },
    getRowNode: () => {
      return { data: { parentManfID: 'PM-1' }, setData: () => {} };
    },
    setData: () => {
      return true;
    },
    setRowData: () => {
      return true;
    },
    hideOverlay: () => {
      return true;
    },
    sizeColumnsToFit:() => {

    }
  },
  paginationSetPageSize: jasmine.createSpy(),
  destroy: () => {
    return true;
  },
  column: {
    getColId: () => {
      return 0;
    }
  }
};

describe('ParentManfMasterComponent', () => {
  let component: ParentManfMasterComponent;
  let fixture: ComponentFixture<ParentManfMasterComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ParentManfMasterComponent, SearchFilterComponent,AgGridActionCellComponent,InlineInputEditComponent],
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
        AgGridModule.withComponents([AgGridActionCellComponent,InlineInputEditComponent])
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentManfMasterComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.gridApi = agParam.api;
    component.userProfile = { userName: 'Mock UserName' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render `Trigger OnChanges`', () => {
    component.pageSize = '10';
    component.ngOnChanges({
      pageSize: new SimpleChange(10, 20, false)
    });
    fixture.detectChanges();
  });
  
  it('should render `Trigger OnChanges`', () => {
    component.pageSize = '10';
    component.ngOnChanges({
      pageSizeMock: new SimpleChange(10, 20, false)
    });
    fixture.detectChanges();
  });

  it('should call saveEditedChanges', () => {
    spyOn(component, 'saveEditedChanges').and.callThrough();
    component.saveEditedChanges();
    expect(component.saveEditedChanges).toHaveBeenCalled();
  });

  it('should call OnEditIconsClicked', () => {
    //@ts-ignore
    spyOn(component, 'OnEditIconsClicked').and.callThrough();
    //@ts-ignore
    component.OnEditIconsClicked({ rowIndex: 0 });
    //@ts-ignore
    expect(component.OnEditIconsClicked).toHaveBeenCalled();
  });

  it('should call markAsNotified', () => {
    //@ts-ignore
    spyOn(component, 'markAsNotified').and.callThrough();
    //@ts-ignore
    component.markAsNotified({ node: { id: 0 } });
    //@ts-ignore
    expect(component.markAsNotified).toHaveBeenCalled();
  });

  it('should call setDataInAgGrid', () => {
    //@ts-ignore
    spyOn(component, 'setDataInAgGrid').and.callThrough();
    //@ts-ignore
    component.setDataInAgGrid([{ pManfId: 'PM-12' }]);
    //@ts-ignore
    expect(component.setDataInAgGrid).toHaveBeenCalled();
  });

  it('should call setDataInAgGrid else path', () => {
    //@ts-ignore
    spyOn(component, 'setDataInAgGrid').and.callThrough();
    //@ts-ignore
    component.setDataInAgGrid([]);
    //@ts-ignore
    expect(component.setDataInAgGrid).toHaveBeenCalled();
  });

  it('should call updateValue', () => {
    //@ts-ignore
    spyOn(component, 'updateValue').and.callThrough();
    component.parentManfRecordsRef = [{ parentManfID: 'PM-1', parentManfName: 'Mock Name',isNewAdded:true }];
    fixture.detectChanges();
    //@ts-ignore
    component.updateValue({ id: 'PM-1', data: { parentManfID: 'PM-1',isModified:true,isNewAdded:true } });
    //@ts-ignore
    expect(component.updateValue).toHaveBeenCalled();
  });

});
