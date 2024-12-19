import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { DynamicTreeViewNode, levelToType, levelToTypeProps } from '../../../modal/tree-view.modal';
import { ItemMasterService } from '../../../services/item-master.service';

@Injectable()
export class TreeViewDataService {
  constructor(private _treeControl: FlatTreeControl<DynamicTreeViewNode>, private readonly itemMasterService: ItemMasterService) {}

  dataChange = new BehaviorSubject<DynamicTreeViewNode[]>([]);

  get data(): DynamicTreeViewNode[] {
    return this.dataChange.value;
  }
  set data(value: DynamicTreeViewNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  connect(collectionViewer: CollectionViewer): Observable<DynamicTreeViewNode[]> {
    this._treeControl.expansionModel.changed.subscribe((change: SelectionChange<DynamicTreeViewNode>) => {
      if (change.added || change.removed) {
        this.handleTreeControl(change);
      }
    });
    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  handleTreeControl(change: SelectionChange<DynamicTreeViewNode>) {
    if (change.added) {
      change.added.forEach((node) => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed
        .slice()
        .reverse()
        .forEach((node) => this.toggleNode(node, false));
    }
  }

  toggleNode(node: DynamicTreeViewNode, expand: boolean) {
    const index = this.data.indexOf(node);
    if (!expand) {
      let count = 0;
      for (let i = index + 1; i < this.data.length && this.data[i].level > node.level; i++) {
        count++;
      }
      this.data.splice(index + 1, count);
      this.dataChange.next(this.data);
    } else {
      node.isLoading = true;
      if (node.details.dataMode === 'ALL') {
        this.itemMasterService
          .getUNSPSCForTreeView({ limit: 500, offset: 0, parentCode: node.details.code, targetLevel: levelToType[node.level + 1] })
          .subscribe(({ data, totalRecords }: any) => this.onUNSPSCResponseFromAPI({ data, totalRecords, index, expand }, node));
      } else {
        this.onUNSPSCResponseFromNode({ index, expand }, node);
      }
    }
  }

  private onUNSPSCResponseFromAPI({ data, totalRecords, index, expand }: any, node: DynamicTreeViewNode): void {
    if (!data || index < 0) {
      node.isLoading = false;
      return;
    }
    if (expand) {
      node.details.childCount = totalRecords;
      const nodes = data.map(({ title, code }: any) => {
        const details = { code, parentNode: node, dataMode: node.details.dataMode };
        return new DynamicTreeViewNode(title, details, node.level + 1, node.level !== 2);
      });
      this.data.splice(index + 1, 0, ...nodes);
    }
    node.isLoading = false;
    this.dataChange.next(this.data);
  }

  private onUNSPSCResponseFromNode({ expand, index }: any, node: DynamicTreeViewNode): void {
    if (expand && node.details.childs) {
      node.details.childCount = node.details.childs.length;
      const nodes = node.details.childs.map((item: any) => {
        const childs = item[levelToTypeProps[node.level + 2]];
        const details = { code: item.code, parentNode: node, childs, dataMode: node.details.dataMode };
        return new DynamicTreeViewNode(item.title, details, node.level + 1, node.level !== 2);
      });
      this.data.splice(index + 1, 0, ...nodes);
    }
    this.dataChange.next(this.data);
    setTimeout(() => {
      this._treeControl.expandAll();
      node.isLoading = false;
    }, 200);
  }
}
