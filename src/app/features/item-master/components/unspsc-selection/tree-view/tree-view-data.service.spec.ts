import { SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatTreeModule } from '@angular/material/tree';
import { of } from 'rxjs';
import { mockTreeViewData } from '../../../modal/item-master-mock-data.constants';
import { DynamicTreeViewNode } from '../../../modal/tree-view.modal';
import { ItemMasterService } from '../../../services/item-master.service';

import { TreeViewDataService } from './tree-view-data.service';

describe('TreeViewDataService', () => {
  let service: TreeViewDataService;
  let getLevel = (node: DynamicTreeViewNode) => node.level;
  let isExpandable = (node: DynamicTreeViewNode) => node.expandable;
  let itemMasterService: ItemMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [],
      imports: [HttpClientTestingModule, MatTreeModule]
    });
    itemMasterService = TestBed.inject(ItemMasterService);
    const treeControl = new FlatTreeControl<DynamicTreeViewNode>(getLevel, isExpandable);
    service = new TreeViewDataService(treeControl, itemMasterService);
  });

  it('should be created ', () => {
    expect(service).toBeTruthy();
  });

  it('Set data should trigger dataChange.next method ', () => {
    spyOn(service.dataChange, 'next');
    service.data = mockTreeViewData;
    expect(service.dataChange.next).toHaveBeenCalled();
  });

  it('Set data should be available in dataChange.value ', () => {
    service.data = mockTreeViewData;
    expect(service.dataChange.value.length).toBe(2);
  });

  it('handleTreeControl should called toggleNode method ', () => {
    const added = [
      {
        title: 'Apparel and Luggage and Personal Care Products',
        details: {
          code: '53000000',
          dataMode: 'ALL'
        },
        level: 0,
        expandable: true,
        isLoading: false
      }
    ];
    service.data = mockTreeViewData;
    spyOn(service, 'toggleNode');
    service.handleTreeControl({ added } as SelectionChange<DynamicTreeViewNode>);

    expect(service.toggleNode).toHaveBeenCalled();
  });

  it('Should fetch the unspsc libraries on expand ', async () => {
    service.data = mockTreeViewData;
    const selectedNode = {
      title: 'Apparel and Luggage and Personal Care Products',
      details: {
        code: '53000000',
        dataMode: 'ALL'
      },
      level: 0,
      expandable: true,
      isLoading: false
    };
    spyOn(itemMasterService, 'getUNSPSCForTreeView').and.returnValue(
      of({
        data: [
          {
            code: '53100000',
            title: 'Clothing'
          },
          {
            code: '53110000',
            title: 'Footwear'
          }
        ],
        totalRecords: 2
      })
    );
    service.toggleNode(selectedNode, true);
    expect(itemMasterService.getUNSPSCForTreeView).toHaveBeenCalled();
  });
});
