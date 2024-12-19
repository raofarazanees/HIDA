import { InlineInputEditComponent } from './../../ag-grid-components/inline-input-edit/inline-input-edit.component';
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';

import { ParentChildManfMasterComponent } from './parent-child-manf-master.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AgGridModule } from 'ag-grid-angular';
import { of } from 'rxjs';
import { agParam } from '../parent-manf-master/parent-manf-master.component.spec';
import { dialogMock } from '../create-parent-manf-dialog/create-parent-manf-dialog.component.spec';
import { CreateParentManfDialogComponent } from '../create-parent-manf-dialog/create-parent-manf-dialog.component';
import { SearchFilterComponent } from '../../../shared/search-filter/search-filter.component';
import { AgGridActionCellComponent, AgGridTypeaheadComponent } from '@app-shared-components';

class StoreMock {
  select = jasmine.createSpy().and.returnValue(of([{data:'mock'}]));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

export const CHILD_MOCK:any[] =  [{
  "childManfID": "MF-7572",
  "childManfName": "ABC",
  blacklistFlag:'Y',
  childManfActive:"Y",
  childManfCreatedBy:"Mock",
  childManfCreatedDate:"Mock",
  childManfUpdatedBy:"Mock",
  childManfUpdatedDate:"Mock",
  parentManfActive:"N",
  isNewAdded:false
}];

describe('ParentChildManfMasterComponent', () => {
  let component: ParentChildManfMasterComponent;
  let fixture: ComponentFixture<ParentChildManfMasterComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ ParentChildManfMasterComponent,CreateParentManfDialogComponent,SearchFilterComponent,InlineInputEditComponent,AgGridTypeaheadComponent,AgGridActionCellComponent  ],
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
        AgGridModule.withComponents([InlineInputEditComponent,AgGridTypeaheadComponent,AgGridActionCellComponent])
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentChildManfMasterComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.gridApi = agParam.api;
    component.userProfile = { userName: 'Mock UserName' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render `Trigger OnChanges` Mock Else', () => {
    component.pageSize = '10';
    component.ngOnChanges({
      pageSize: new SimpleChange(10, 20, false)
    });
    fixture.detectChanges();
  });

  it('should render `Trigger OnChanges` Mock Else', () => {
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
    component.setDataInAgGrid(CHILD_MOCK);
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
    component.childParentManfRecordsRef = CHILD_MOCK
    fixture.detectChanges();
    //@ts-ignore
    component.updateValue({ id: 'MF-7572', data: { childManfID: 'MF-7572',blacklistFlag:0,isModified:true,isNewAdded:true } });
    //@ts-ignore
    expect(component.updateValue).toHaveBeenCalled();
  });

  it('should call updateValue with parentManf Obj', () => {
    //@ts-ignore
    spyOn(component, 'updateValue').and.callThrough();
    component.childParentManfRecordsRef = CHILD_MOCK
    fixture.detectChanges();
    //@ts-ignore
    component.updateValue({ id: 'MF-7572', data: { childManfID: 'MF-7572',parentManfName:{id:"PM-1",value:'Mock Parent'},blacklistFlag:0,isModified:true,isNewAdded:true } });
    //@ts-ignore
    expect(component.updateValue).toHaveBeenCalled();
  });


  it('should call searchChildParentManfRecords', () => {
    spyOn(component, 'searchChildParentManfRecords').and.callThrough();
    component.searchChildParentManfRecords({searchCondition:'AND',initiatedByUserName:'Mock, User',searchCriteria:[]});
    expect(component.searchChildParentManfRecords).toHaveBeenCalled();
  });


  
});
