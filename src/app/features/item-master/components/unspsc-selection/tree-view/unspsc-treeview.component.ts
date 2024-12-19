import { MessageService } from 'src/app/shared/services';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';

import { ItemMasterState } from '../../../store/reducers';
import { getUnspscRootNodes, getUnspscRootNodesLoading } from '../../../store/selectors';
import { Observable, Subject } from 'rxjs';
import { TreeViewDataService } from './tree-view-data.service';
import { DynamicTreeViewNode, levelToType, TreeSearchModal } from '../../../modal/tree-view.modal';
import { ItemMasterService } from '../../../services/item-master.service';
import { SelectionModel } from '@angular/cdk/collections';
import { GetUNSPSCForTreeView, GetUNSPSCSearchForTreeView, SetTreeViewDataMode } from '../../../store/actions';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { itemMasterMessages } from '../../../modal/item-master-messages.constants';

@Component({
  selector: 'app-unspsc-treeview',
  templateUrl: './unspsc-treeview.component.html',
  styleUrls: ['./unspsc-treeview.component.scss']
})
export class UnspscTreeviewComponent implements OnInit, OnDestroy {
  @Input() unspscCode: any;
  @Input() level: any;
  @Output() readonly onDialogClose: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('paginator') paginator: MatPaginator;

  treeControl: FlatTreeControl<DynamicTreeViewNode>;
  dataSource: TreeViewDataService | any;
  checklistSelection = new SelectionModel<DynamicTreeViewNode>(true);
  treeSearch: TreeSearchModal = this.getDefaultSearchState();
  unspscTreeLoading$: Observable<boolean> = this.store.select(getUnspscRootNodesLoading);
  levelCodeConvertor: any = levelToType;
  itemPguidLoading: boolean = false;
  selectedPayload: any = {};
  selectedLastNode: any = {};
  previousSearchPayload: string = '';
  noRecordMsg: string = '';
  totalRecords: number = 0;
  disableReset: boolean = false;

  getLevel = (node: DynamicTreeViewNode) => node.level;
  isExpandable = (node: DynamicTreeViewNode) => node.expandable;
  hasChild = (_: number, _nodeData: DynamicTreeViewNode) => _nodeData.expandable;

  private readonly destroyed$ = new Subject<boolean>();

  constructor(private readonly store: Store<ItemMasterState>, private readonly itemMasterService: ItemMasterService,    private messageService: MessageService,    ) {
  this.store.dispatch(new GetUNSPSCForTreeView({ limit: 500, offset: 0, parentCode: '', targetLevel: 'segment' }, true));

  }

  ngOnInit(): void {
    this.resetPayload();
    this.treeControl = new FlatTreeControl<DynamicTreeViewNode>(this.getLevel, this.isExpandable);
    this.dataSource = new TreeViewDataService(this.treeControl, this.itemMasterService);

    this.store
    .select(getUnspscRootNodes)
    .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
    .subscribe(({ dataMode, data }: any) => {     
      if (data && Object.keys(data)?.length) {
             this.totalRecords = data?.totalRecords;
        if (dataMode === 'SEARCH' && Object.keys(data)?.length) {
          if (data && data.segments) {
            this.dataSource.data = data.segments.map(
              ({ title, code, families }: any) => new DynamicTreeViewNode(title, { code, childs: families, dataMode }, 0, true, false)
            );
            setTimeout(() => this.treeControl.expandAll(), 200);
            setTimeout(() => {
              this.disableReset = false;
              if (this.unspscCode) {
                const element = document.getElementById(this.unspscCode + '-input');
                element && element.click();
              }
            }, 2000);
          }
        } else if (dataMode === 'ALL') {
          if (data && data.data) {
            this.dataSource.data = data.data.map(
              ({ title, code }: any) => new DynamicTreeViewNode(title, { code, dataMode }, 0, true, false)
            );
          }
        }
      this.noRecordMsg = dataMode === 'SEARCH' ? itemMasterMessages.noRecordForSearch : itemMasterMessages.noRecordsFound;
      }  
    });

    // this.store
    //   .select(getUnspscRootNodes)
    //   .pipe(
    //     takeUntil(this.destroyed$),
    //     filter((response: any) => !!Object.keys(response)?.length)
    //   )
    //   .subscribe(({ dataMode, data }: any) => {
    //     if (dataMode === 'SEARCH' && Object.keys(data)?.length) {
    //       this.totalRecords = data.totalRecords;
    //       if (data && data.segments) {
    //         this.dataSource.data = data.segments.map(
    //           ({ title, code, families }: any) => new DynamicTreeViewNode(title, { code, childs: families, dataMode }, 0, true, false)
    //         );
    //         setTimeout(() => this.treeControl.expandAll(), 200);
    //         setTimeout(() => {
    //           this.disableReset = false;
    //           if (this.unspscCode) {
    //             const element = document.getElementById(this.unspscCode + '-input');
    //             element && element.click();
    //           }
    //         }, 2000);
    //       }
    //     } else if (dataMode === 'ALL') {
    //       this.totalRecords = data.totalRecords;
    //       if (data && data.data) {
    //         this.dataSource.data = data.data.map(
    //           ({ title, code }: any) => new DynamicTreeViewNode(title, { code, dataMode }, 0, true, false)
    //         );
    //       }
    //     }
    //     this.noRecordMsg = dataMode === 'SEARCH' ? itemMasterMessages.noRecordForSearch : itemMasterMessages.noRecordsFound;
    //   });

    if (this.unspscCode) {
      this.treeSearch.isLevelMode = true;
      this.treeSearch[levelToType[this.level]] = this.unspscCode;
      setTimeout(() => this.getSearchResults(0, true), 500);
    }
  }

  onSelectionToggle(event: any, node: DynamicTreeViewNode): void {
    this.resetPayload();
    this.checklistSelection.clear();
    this.selectAllParentNodes(event.checked ? node : node.details.parentNode);
  }

  resetTree(withSearch: boolean): void {
    this.treeControl.collapseAll();
    this.checklistSelection.clear();
    this.resetPayload();
    if (withSearch) {
      this.treeSearch = this.getDefaultSearchState();
      setTimeout(() => this.store.dispatch(new SetTreeViewDataMode('ALL')));
      this.paginator.pageIndex = 0;
      this.previousSearchPayload = '';
    }
  }

  proceedTogetPGUID(): void {

    if (this.selectedLastNode.code.slice(-2).toString() == '00') {
      this.messageService.showToast('Please select Level 4 / Commodity level UNSPSC', 'error');
      return;
    }

    this.itemPguidLoading = true;
    this.itemMasterService
      .getItemPguidByUnspsc({ code: this.selectedLastNode.code, level: levelToType[this.selectedLastNode.level], view: 'basic' })
      .subscribe((response: any) => {
        if (response) {
          this.selectedPayload.internalItemKey = response.ontologyItemPguid;
          this.onDialogClose.emit(this.selectedPayload);
          this.itemPguidLoading = false;
        }
      });
  }

  getSearchResults(offset: number = 0, clearPage: boolean = false): void {
    if (clearPage) {
      this.paginator.pageIndex = 0;
    }
    const payload: any = this.preparePayloadForSearch();
    if (this.previousSearchPayload === JSON.stringify({ ...payload, offset: offset })) {
      return;
    }
    this.previousSearchPayload = JSON.stringify({ ...payload, offset: offset });
    this.resetTree(false);
    this.disableReset = true;
    this.store.dispatch(
      new GetUNSPSCSearchForTreeView({
        limit: 500,
        offset: offset,
        searchCondition: this.treeSearch.isLevelMode ? 'AND' : 'OR',
        searchCriteria: payload
      })
    );
  }

  getSwitchTooltip(): string {
    return `Search will be on ${this.treeSearch.isLevelMode ? 'each level with AND condition' : 'all levels'}`;
  }

  clearSearchOnLevelChange(isLevelMode: any): void {
    if (isLevelMode) {
      this.treeSearch.globalSeach = '';
    } else {
      this.treeSearch = {
        ...this.treeSearch,
        segment: '',
        family: '',
        class: '',
        commodity: ''
      };
    }
  }

  onPaginationChange(event: PageEvent): void {
    this.getSearchResults(event.pageIndex * event.pageSize);
  }

  ngOnDestroy(): void {
    this.store.dispatch(new SetTreeViewDataMode('ALL'));
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private selectAllParentNodes(node: DynamicTreeViewNode): void {
    let currentNode: DynamicTreeViewNode = node;
    if (currentNode) {
      this.selectedLastNode = { code: currentNode.details.code, title: currentNode.title, level: currentNode.level };
      this.selectedPayload.unspscCode = currentNode.details.code;
    }
    while (currentNode !== undefined) {
      this.checklistSelection.select(currentNode);
      this.preparePayloadFromNode(currentNode.level, currentNode.details.code, currentNode.title);
      currentNode = currentNode.details.parentNode;
    }
  }

  private preparePayloadFromNode(level: number, code: string, title: string): void {
    switch (level) {
      case 0:
        this.selectedPayload.segmentCode = code;
        this.selectedPayload.segmentTitle = title;
        break;
      case 1:
        this.selectedPayload.familyCode = code;
        this.selectedPayload.familyTitle = title;
        break;
      case 2:
        this.selectedPayload.classCode = code;
        this.selectedPayload.classTitle = title;
        break;
      case 3:
        this.selectedPayload.commodityCode = code;
        this.selectedPayload.commodityTitle = title;
        break;
      default:
        break;
    }
  }

  private resetPayload(): void {
    this.selectedPayload = {
      unspscCode: '',
      segmentCode: '',
      segmentTitle: '',
      familyCode: '',
      familyTitle: '',
      classCode: '',
      classTitle: '',
      commodityCode: '',
      commodityTitle: ''
    };
    this.selectedLastNode = {};
  }

  private preparePayloadForSearch(): any {
    return this.treeSearch.isLevelMode
      ? [
          { level: '1', searchText: this.treeSearch.segment },
          { level: '2', searchText: this.treeSearch.family },
          { level: '3', searchText: this.treeSearch.class },
          { level: '4', searchText: this.treeSearch.commodity }
        ]
      : [{ level: '*', searchText: this.treeSearch.globalSeach }];
  }

  private getDefaultSearchState(): any {
    return {
      isLevelMode: false,
      globalSeach: '',
      segment: '',
      family: '',
      class: '',
      commodity: ''
    };
  }
}
