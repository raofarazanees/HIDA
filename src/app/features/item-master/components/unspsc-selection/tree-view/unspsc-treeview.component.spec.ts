import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { PageEvent } from '@angular/material/paginator';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { mockTreeViewNodeObj } from '../../../modal/item-master-mock-data.constants';
import { ItemMasterService } from '../../../services/item-master.service';
import { UnspscTreeviewComponent } from '../tree-view/unspsc-treeview.component';
import { MatIconModule } from '@angular/material/icon';
import { MessageService } from 'src/app/shared/services';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('UnspscTreeviewComponent', () => {
  let component: UnspscTreeviewComponent;
  let fixture: ComponentFixture<UnspscTreeviewComponent>;

  class StoreMock {
    select = jasmine.createSpy().and.returnValue(of({}));
    dispatch = jasmine.createSpy();
    pipe = jasmine.createSpy().and.returnValue(of('success'));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnspscTreeviewComponent],
      schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule, MatMenuModule,MatIconModule,MatSnackBarModule],
      providers: [
        {
          provide: Store,
          useClass: StoreMock
        },
        {
          provide: Actions,
          useClass: StoreMock
        },
        MessageService,
    
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnspscTreeviewComponent);
    component = fixture.componentInstance;
    component.selectedLastNode = {code:'45662001'}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call reset unspscCode', () => {
    component.ngOnInit();
    expect(component.selectedPayload.unspscCode).toEqual('');
  });

  it('onSelectionToggle should update the selectedPayload unspscCode', () => {
    component.onSelectionToggle({ checked: true }, mockTreeViewNodeObj);
    expect(component.selectedPayload.unspscCode).toEqual('53102903');
  });

  it('Should call reset selected paylod on unselect', () => {
    const node = {
      title: 'Apparel and Luggage and Personal Care Products',
      details: {
        code: '53000000',
        dataMode: 'ALL',
        childCount: 5
      },
      level: 0,
      expandable: true,
      isLoading: false
    };
    component.onSelectionToggle({ checked: false }, node);
    expect(component.selectedPayload.unspscCode).toEqual('');
  });

  it('"resetTree" Should call "treeControl.collapseAll"', () => {
    spyOn(component.treeControl, 'collapseAll');
    component.resetTree(false);
    expect(component.treeControl.collapseAll).toHaveBeenCalled();
  });

  it('"resetTree" with true param should work propetlly', () => {
    component.resetTree(true);
    expect(component.treeSearch.isLevelMode).toBeFalsy();
  });

  it('"resetTree" with true param should work propetlly', () => {
    component.resetTree(true);
    expect(component.treeSearch.isLevelMode).toBeFalsy();
  });

  it('"proceedTogetPGUID" should update internalItemKey', async () => {
    const itemMasterService: ItemMasterService = TestBed.inject(ItemMasterService);
    spyOn(itemMasterService, 'getItemPguidByUnspsc').and.returnValue(
      of({
        ontologyItemPguid: 123
      })
    );
    component.selectedLastNode = {code:'45662001'}
    fixture.detectChanges();
    await component.proceedTogetPGUID();
    expect(component.selectedPayload.internalItemKey).toBe(123);
  });

  it('"getSearchResults" should update previousSearchPayload ', () => {
    component.treeSearch = {
      isLevelMode: false,
      globalSeach: 'test',
      segment: '',
      family: '',
      class: '',
      commodity: ''
    };
    component.getSearchResults(0, true);
    expect(component.previousSearchPayload).toBe('{"0":{"level":"*","searchText":"test"},"offset":0}');
  });

  it('Should clear global search on level change ', () => {
    component.treeSearch = {
      isLevelMode: false,
      globalSeach: 'test',
      segment: '',
      family: '',
      class: '',
      commodity: ''
    };
    component.clearSearchOnLevelChange(true);
    expect(component.treeSearch.globalSeach).toBe('');
  });

  it('Should clear level search on level change ', () => {
    component.treeSearch = {
      isLevelMode: true,
      globalSeach: '',
      segment: 'test',
      family: '',
      class: '',
      commodity: ''
    };
    component.clearSearchOnLevelChange(false);
    expect(component.treeSearch.segment).toBe('');
  });

  it('"getSearchResults" Should call on page change', () => {
    spyOn(component, 'getSearchResults');
    component.onPaginationChange({ pageIndex: 1, pageSize: 10 } as PageEvent);
    expect(component.getSearchResults).toHaveBeenCalled();
  });
});
