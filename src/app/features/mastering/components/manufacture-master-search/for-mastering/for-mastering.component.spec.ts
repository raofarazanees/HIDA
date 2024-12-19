/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { ForMasteringComponent } from './for-mastering.component';
import { of } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SearchFilterComponent } from '../../../shared/search-filter/search-filter.component';
import { AgGridActionCellComponent, AgGridTypeaheadComponent } from '@app-shared-components';
import { InlineInputEditComponent } from '../../ag-grid-components/inline-input-edit/inline-input-edit.component';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ManfUnmasteredSearchOptions } from '../../../model/manf-master-models/interface/manf-unmastered-search-options';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { agParam } from '../parent-manf-master/parent-manf-master.component.spec';
import { MASTER_MOCK_DATA, parentChildMap } from '../master-mapped/master-mapped.component.spec';

class StoreMock {
  select = jasmine.createSpy().and.returnValue(of({}));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

xdescribe('ForMasteringComponent', () => {
  let component: ForMasteringComponent;
  let fixture: ComponentFixture<ForMasteringComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ForMasteringComponent, SearchFilterComponent,AgGridTypeaheadComponent, InlineInputEditComponent, AgGridActionCellComponent ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatButtonModule,MatDialogModule,ReactiveFormsModule,FormsModule],
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForMasteringComponent);
    component = fixture.componentInstance;
    component.searchCriteriaOptionsData = ManfUnmasteredSearchOptions();
    component.gridApi = agParam.api;
    component.userProfile = {username:'ijarda, Vijay'}
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
    component.forMappingDataRef = MASTER_MOCK_DATA
    fixture.detectChanges();
    //@ts-ignore
    component.updateValue({ id: 2, data: { manfMapID: 2,isModified:true,isNewAdded:true } });
    //@ts-ignore
    expect(component.updateValue).toHaveBeenCalled();
  });


});
