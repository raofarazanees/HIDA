/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { UnspscMasterComponent } from './unspsc-master.component';
import { of } from 'rxjs';
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
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AgGridModule } from 'ag-grid-angular';
import { dialogMock } from '../manufacture-master-search/create-parent-manf-dialog/create-parent-manf-dialog.component.spec';
import { SearchFilterComponent } from '../../shared/search-filter/search-filter.component';
import { ModuleLandingPageComponent } from '@app-shared-components';
import { agParam } from '../manufacture-master-search/parent-manf-master/parent-manf-master.component.spec';
import { dialogRefSpyObj } from '../manufacture-master-search/master-mapped/master-mapped.component.spec';
import { HistoryLogDialogComponent } from '../../history-log-dialog/history-log-dialog.component';

class StoreMock {
  select = jasmine.createSpy().and.returnValue(of([{data:'mock'}]));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

const MOCK_UNSPSC_DATA =  {
  "unspscCodeID": 41572,
  "unspscCode": 10101501,
  "unspscLevel": 4,
  "unspscLevelName": "commodity",
  "unspscDescription": "Cats",
  "marketID": "MKT-103",
  "marketName": "DEMO 12",
  "submarketName": "DEMO 4",
  "unspscScope": "Exclude",
  "clusteringFlag": "N",
  "manualFlag": "Y",
  "unspscVersion": "UNSPSC v22_0601",
  "numProductsActive": 0,
  "unspscCreatedBy": "One Time - ETL",
  "unspscUpdatedBy": "Ijarda, Vijay",
  "unspscCreatedDate": "2023-05-09 18:59:23",
  "unspscUpdatedDate": "2023-06-12 14:40:30",
  isNewAdded:true
}

describe('UnspscMasterComponent', () => {
  let component: UnspscMasterComponent;
  let fixture: ComponentFixture<UnspscMasterComponent>;
  let modalService: MatDialog;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ ModuleLandingPageComponent,UnspscMasterComponent,SearchFilterComponent,HistoryLogDialogComponent ],
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
    })
    .compileComponents();
    modalService = TestBed.inject(MatDialog);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnspscMasterComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.gridApi = agParam.api;
  //  component.userProfile = { userName: 'Mock UserName' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call saveEditedChanges', () => {
    spyOn(component, 'saveEditedChanges').and.callThrough();
    component.saveEditedChanges();
    expect(component.saveEditedChanges).toHaveBeenCalled();
  });

  it('should call saveEditedChanges without username', () => {
    component.userProfile = {email:''}
    fixture.detectChanges();
    spyOn(component, 'saveEditedChanges').and.callThrough();
    component.saveEditedChanges();
    expect(component.saveEditedChanges).toHaveBeenCalled();
  });

  it('should call checkDeviceWithAndFitColumn', () => {
      //@ts-ignore
    spyOn(component, 'checkDeviceWithAndFitColumn').and.callThrough();
      //@ts-ignore
    component.checkDeviceWithAndFitColumn({columnModel:{bodyWidth:600}});
      //@ts-ignore
    expect(component.checkDeviceWithAndFitColumn).toHaveBeenCalled();
  });
  
  it('should call checkDeviceWithAndFitColumn', () => {
      //@ts-ignore
    spyOn(component, 'checkDeviceWithAndFitColumn').and.callThrough();
      //@ts-ignore
    component.checkDeviceWithAndFitColumn({columnModel:{bodyWidth:30000}});
      //@ts-ignore
    expect(component.checkDeviceWithAndFitColumn).toHaveBeenCalled();
  });

  it('should call setDataInAgGrid', () => {
    //@ts-ignore
    spyOn(component, 'setDataInAgGrid').and.callThrough();
    //@ts-ignore
    component.setDataInAgGrid([{ unspscCodeID: '1' }]);
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

  it('Page Size 20 when selected 0', () => {
    component.changePaginationSize(0);
    fixture.detectChanges();
    expect(component.pageSize).toBe(20);
  });

  it('Page Size 50 when selected 50', () => {
    component.changePaginationSize(50);
    fixture.detectChanges();
    expect(component.pageSize).toBe(50);
  });


  it('should call markAsNotified', () => {
    //@ts-ignore
    spyOn(component, 'markAsNotified').and.callThrough();
    //@ts-ignore
    component.markAsNotified({ node: { id: 0 } });
    //@ts-ignore
    expect(component.markAsNotified).toHaveBeenCalled();
  });
  
  it('should call OnEditIconsClicked', () => {
    //@ts-ignore
    spyOn(component, 'OnEditIconsClicked').and.callThrough();
    //@ts-ignore
    component.OnEditIconsClicked({ rowIndex: 0 });
    //@ts-ignore
    expect(component.OnEditIconsClicked).toHaveBeenCalled();
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

  it(`'openLogDialog' should called 'modalService.open'`, () => {
    spyOn(modalService, 'open').and.returnValue(dialogRefSpyObj);
    // @ts-ignore
    component.openLogDialog({data:MOCK_UNSPSC_DATA});
    expect(modalService.open).toHaveBeenCalled();
  });

   
  it('should call updateValue', () => {
    //@ts-ignore
    spyOn(component, 'updateValue').and.callThrough();
    component.UnspscRecordsRef = [MOCK_UNSPSC_DATA]
    fixture.detectChanges();
    //@ts-ignore
    component.updateValue({ id: 1, data: MOCK_UNSPSC_DATA});
    //@ts-ignore
    expect(component.updateValue).toHaveBeenCalled();
  });

  // it('should call updateValue', () => {
  //   //@ts-ignore
  //   spyOn(component, 'updateValue').and.callThrough();
  //   component.UnspscRecordsRef = [MOCK_UNSPSC_DATA]
  //   fixture.detectChanges();
  //   //@ts-ignore
  //   component.updateValue({ id: 1, data:{marketName:{id:'MKT-1',subMarketName:'SubMock Name',value:'Market Name'},unspscCodeID:MOCK_UNSPSC_DATA.unspscCodeID}});
  //   //@ts-ignore
  //   expect(component.updateValue).toHaveBeenCalled();
  // });

  it('should call updateValue with submarket object', () => {
    //@ts-ignore
    spyOn(component, 'updateValue').and.callThrough();
    component.UnspscRecordsRef = [MOCK_UNSPSC_DATA]
    fixture.detectChanges();
    //@ts-ignore
    component.updateValue({ id: 1, data:{submarketName :{id:'MKT-1',value:'Market Name'},unspscCodeID:MOCK_UNSPSC_DATA.unspscCodeID}});
    //@ts-ignore
    expect(component.updateValue).toHaveBeenCalled();
  });
  
  it(`'openMarketMasterDialog' should called 'modalService.open'`, () => {
    spyOn(modalService, 'open').and.returnValue(dialogRefSpyObj);
    component.userProfile = {email:'',userName:'Mock'}
    const node = {rowIndex:0,colDef:{field:'marketName'}}
    fixture.detectChanges();
    // @ts-ignore
    const data = {typeHeadRenderFor:'marketMaster',data:{submarketName:''}}
      // @ts-ignore
    component.openMarketMasterDialog(node,'');
    expect(modalService.open).toHaveBeenCalled();
  });

  it(`'openMarketMasterDialog' should called 'modalService.open' without key`, () => {
    spyOn(modalService, 'open').and.returnValue(dialogRefSpyObj);
    component.userProfile = {email:'',userName:'Mock'}
    const node = {rowIndex:0,colDef:{field:'marketName'}}
    fixture.detectChanges();
    // @ts-ignore
    const data = {typeHeadRenderFor:'submarketMaster',data:{submarketName:''}}
      // @ts-ignore
    component.openMarketMasterDialog(node,'');
    expect(modalService.open).toHaveBeenCalled();
  });
  

});
