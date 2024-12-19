/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';

import { ForFacilityMappingComponent } from './for-facility-mapping.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModuleLandingPageComponent } from '@app-shared-components';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AgGridModule } from 'ag-grid-angular';
import { SearchFilterComponent } from '../../../shared/search-filter/search-filter.component';
import { dialogMock } from '../../manufacture-master-search/create-parent-manf-dialog/create-parent-manf-dialog.component.spec';
import { of } from 'rxjs';
import { agParam } from '../../manufacture-master-search/parent-manf-master/parent-manf-master.component.spec';
import { dialogRefSpyObj } from '../../manufacture-master-search/master-mapped/master-mapped.component.spec';
import { CreateFacilityMasterComponent } from '../facility-master-components/create-facility-master/create-facility-master.component';

const FACILITY_MOCK:any[] = [ {
  "facilityPGUID": "urn:asset:14:b8313457-0037-4ebc-bd7a-80c60d109bac",
  "facilityDistPGUID": "2",
  "facilityDistName": "concordance",
  "extFacilityKey": 93,
  "extFacilityDesc": "ECOSYSTEM/SURGENCE",
  "extFacilityCreatedDate": "2022-11-08 08:38:13",
  "extFacilityUpdatedDate": "2023-04-28 05:58:55",
  "isNewAdded":true,
  "isModified": true
}]
class StoreMock {
  select = jasmine.createSpy().and.returnValue(of([{data:'mock'}]));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

describe('ForFacilityMappingComponent', () => {
  let component: ForFacilityMappingComponent;
  let fixture: ComponentFixture<ForFacilityMappingComponent>;
  let modalService: MatDialog;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleLandingPageComponent,ForFacilityMappingComponent,SearchFilterComponent,CreateFacilityMasterComponent ],
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
    fixture = TestBed.createComponent(ForFacilityMappingComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.gridApi = agParam.api;
    component.userProfile = { userName: 'Mock UserName',email:'test@mock.com' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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



  it('should call onClick', () => {
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

  it(`'openLogDialog' should called 'modalService.open'`, () => {
    spyOn(modalService, 'open').and.returnValue(dialogRefSpyObj);
    // @ts-ignore
    component.openCreateFacilityDialog({rowIndex: 0},'test');
    expect(modalService.open).toHaveBeenCalled();
  });

  it('should call setDataInAgGrid', () => {
    //@ts-ignore
    spyOn(component, 'setDataInAgGrid').and.callThrough();
    //@ts-ignore
    component.setDataInAgGrid(FACILITY_MOCK);
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
    component.facilityForMapRef = FACILITY_MOCK
    fixture.detectChanges();
    //@ts-ignore
    component.updateValue({ id: 1, data:{facilitySubGroupName:{id:'FC-1',facilityGroupName:'GroupName',value:'Subgroup Name'},facilityPGUID:FACILITY_MOCK[0].facilityPGUID,...FACILITY_MOCK[0]}});
    //@ts-ignore
    expect(component.updateValue).toHaveBeenCalled();
  });

  it('should call updateValue without obj', () => {
    //@ts-ignore
    spyOn(component, 'updateValue').and.callThrough();
    component.facilityForMapRef = FACILITY_MOCK
    fixture.detectChanges();
    //@ts-ignore
    component.updateValue({ id: 1, data:{facilityPGUID:FACILITY_MOCK[0].facilityPGUID,...FACILITY_MOCK[0]}});
    //@ts-ignore
    expect(component.updateValue).toHaveBeenCalled();
  });

});
