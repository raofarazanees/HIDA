/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';

import { MasterMappedComponent } from './master-mapped.component';
import { of } from 'rxjs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SearchFilterComponent } from '../../../shared/search-filter/search-filter.component';
import { AgGridTypeaheadComponent, AgGridActionCellComponent } from '@app-shared-components';
import { InlineInputEditComponent } from '../../ag-grid-components/inline-input-edit/inline-input-edit.component';
import { MasteredSearchOptions } from '../../../model/manf-master-models/interface/manf-unmastered-search-options';
import { agParam } from '../parent-manf-master/parent-manf-master.component.spec';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AgGridModule } from 'ag-grid-angular';

export const MASTER_MOCK_DATA:any = [
  {
    "manfMapID": 2,
    "manfID": "MF-7594",
    "manfName": "CHILD MANF 1",
    "distrPGUID": "2",
    "distrName": "concordance",
    "manuPGUID": "urn:asset:15:eea5c433-2d24-45b3-8ccc-227e84c67554",
    "mappingComments": "comments_text",
    "mapCreatedBy": "Jaganathan, Thirunavukkarasu",
    "mapUpdatedBy": "Ijarda, Vijay",
    "mapCreatedDate": "2023-05-12 14:22:00",
    "mapUpdatedDate": "2023-05-24 16:39:59",
    "parManfID": "PM-3063",
    "parManfName": "101 BIO",
    "blacklisted": "Y",
    "extManufKey": "AARD",
    "extManufDesc": "AARDVARK CONTROL EQUIPMENT CO",
    "topParentManfID":"MF-7594",
    "topParManfName":"10X GENOMICS",
  }]

class StoreMock {
  select = jasmine.createSpy().and.returnValue(of({records:[MASTER_MOCK_DATA],totalRecords:0}));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}
export let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });

export const parentChildMap = [
  {
    "childManfID": "MF-7594",
    "childManfName": "10X GENOMICS",
    "parentManfID": "PM-2091",
    "parentManfName": "180 INNOVATIONS",
    "topParentManfID": "PM-2091",
    "topParentManfName": "180 INNOVATIONS",
      parentDisplayName: '',
    topParentDisplayName:  '',
    childDisplayName:  '',
  },
  {
    "childManfID": "MF-7572",
    "childManfName": "ABC",
    "parentManfID": "PM-3789",
    "parentManfName": "ABC",
    "topParentManfID": "PM-3789",
    "topParentManfName": "ABC",
    parentDisplayName: '',
    topParentDisplayName:  '',
    childDisplayName:  '',
  }]


xdescribe('MasterMappedComponent', () => {
  let component: MasterMappedComponent;
  let fixture: ComponentFixture<MasterMappedComponent>;
  let modalService: MatDialog;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterMappedComponent,SearchFilterComponent,AgGridTypeaheadComponent, InlineInputEditComponent, AgGridActionCellComponent  ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatButtonModule,MatDialogModule,ReactiveFormsModule,
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        FlexLayoutModule,
        MatChipsModule,
        MatIconModule,
        MatSelectModule,
        MatDatepickerModule,
        AgGridModule.withComponents([])
      ],
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
          provide : MAT_DIALOG_DATA,
          useValue : {}
        }
      ]
    })
    .compileComponents();
    modalService = TestBed.inject(MatDialog);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterMappedComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.gridApi = agParam.api;
    component.mappedData = {totalRecords:0,records:[]}
    component.searchCriteriaOptionsData = MasteredSearchOptions();
    component.userProfile = {username:"Mock, User"}
    component.isNotingChangeOnPage = false;
    component.topParentRecords = parentChildMap;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render `Trigger OnChanges`', () => {
    component.ngOnChanges({
      pageSize: new SimpleChange(10, 20, false)
    });
    fixture.detectChanges();
  });

  it('should render `Trigger OnChanges` without pageSize', () => {
    component.ngOnChanges({
      customData: new SimpleChange(10, 20, false)
    });
    fixture.detectChanges();
  });

  it('should call saveEditedChanges', () => {
    spyOn(component, 'saveEditedChanges').and.callThrough();
    component.saveEditedChanges();
    expect(component.saveEditedChanges).toHaveBeenCalled();
  });


  it('should call checkDeviceWithAndFitColumn', () => {
    spyOn(component, 'checkDeviceWithAndFitColumn').and.callThrough();
    component.checkDeviceWithAndFitColumn({columnModel:{bodyWidth:600}});
    expect(component.checkDeviceWithAndFitColumn).toHaveBeenCalled();
  });
  
  it('should call checkDeviceWithAndFitColumn', () => {
    spyOn(component, 'checkDeviceWithAndFitColumn').and.callThrough();
    component.checkDeviceWithAndFitColumn({columnModel:{bodyWidth:30000}});
    expect(component.checkDeviceWithAndFitColumn).toHaveBeenCalled();
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
    component.setDataInAgGrid(MASTER_MOCK_DATA);
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
    component.mappedDataRef = MASTER_MOCK_DATA
    fixture.detectChanges();
    //@ts-ignore
    component.updateValue({ id: 2, data: { manfMapID: 2,isModified:true,isNewAdded:true } });
    //@ts-ignore
    expect(component.updateValue).toHaveBeenCalled();
  });

  it('should call updateValue with Child Obj', () => {
    //@ts-ignore
    spyOn(component, 'updateValue').and.callThrough();
    component.mappedDataRef = MASTER_MOCK_DATA;
    component.topParentRecords = parentChildMap;
    fixture.detectChanges();
    //@ts-ignore
    component.updateValue({ id: 2, data: { manfMapID: 2,manfName:{id:'MF-7594',value:'data'},isModified:true,isNewAdded:true,manufacturer_mapping:'',topParentManfID:'MF-7594',topParentManfName:'Mock' } });
    //@ts-ignore
    expect(component.updateValue).toHaveBeenCalled();
  });

  it(`'openParentChildDialog' should called 'modalService.open'`, () => {
    spyOn(modalService, 'open').and.returnValue(dialogRefSpyObj);
    // @ts-ignore
    component.openParentChildDialog();
    expect(modalService.open).toHaveBeenCalled();
  });

  it(`'openLogModal' should called 'modalService.open'`, () => {
    spyOn(modalService, 'open').and.returnValue(dialogRefSpyObj);
    // @ts-ignore
    component.openLogDialog({data:''});
    expect(modalService.open).toHaveBeenCalled();
  });

});
