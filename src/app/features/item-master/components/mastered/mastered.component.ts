import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IDatasource, IGetRowsParams } from 'ag-grid-community';

import { MessageService } from './../../../../shared/services';
import { AgGridActionCellComponent } from './../../../../shared/components';
import { ItemMasterService } from '../../services/item-master.service';
import { UserProfileState } from './../../../../store';
import { UnspscColumnRendererComponent } from '../unspsc-selection/aggrid-column-renderer/unspsc-column-renderer.component';
import { MasteredContainer } from '../../containers/mastered.container';
import { TaskType, UNSPSCSource } from '../../modal/ag-grid.constants';
import { AttributeExtensionColumnRendererComponent } from '../attribute-extension-renderer/attribute-extension-renderer.component';

@Component({
  selector: 'app-mastered',
  templateUrl: './mastered.component.html',
  styleUrls: ['./mastered.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MasteredComponent extends MasteredContainer implements OnInit {
  @Input('userProfile')
  set userProfile(value: UserProfileState) {
    value && value.itemMasterRoles && this.checkExceptionLeadPermission(value.itemMasterRoles);
  }

  _attributeExtensions: any = [];
  @Input() set attributeExtensions(value: any) {
    value && this._attributeExtensions.push(...value);
  }

  frameworkComponents = {
    actionCellRenderer: AgGridActionCellComponent,
    unspscCodeRendererComponent: UnspscColumnRendererComponent,
    attributeColumnRendererComponent: AttributeExtensionColumnRendererComponent
  };

  private dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      this.setMasteredGridFilters();
      const payload = this.getPayloadForMasteredItemList(params);
      this.gridApi.showLoadingOverlay();
      this.getMasteredRecords(params, payload);
    }
  } as IDatasource;

  constructor(private itemMasterService: ItemMasterService, private messageService: MessageService, public matDialog: MatDialog) {
    super(matDialog);
  }

  ngOnInit() {
    this.initGridOption(this.dataSource, this._attributeExtensions);
  }

  private updateGrid(data: any, params: any): void {
    let lastRow = -1;
    let itemMasterValuesList = [];
    if (data.itemMasterValuesList.length) {
      itemMasterValuesList = data.itemMasterValuesList;
      lastRow = data.totalRecords <= params.endRow ? data.totalRecords : -1;
      this.gridApi.hideOverlay();
    } else {
      lastRow = 0;
      this.gridOptions.api.showNoRowsOverlay();
    }
    params.successCallback(itemMasterValuesList, lastRow);
  }

  private getMasteredRecords(params: any, payload: any) {
    if (this.gridApi) {
      this.gridApi.showLoadingOverlay();
      this.itemMasterService.getAllItemMasteredRecords(payload).subscribe({
        next: (data) => {
          this.updateGrid({ ...data, itemMasterValuesList: this.normalizeItemMasteredRecords(data.itemMasterValuesList) }, params);
        },
        error: (error) => {
          const message = error.error && error.error.message ? error.error.message : 'An error occured while fetching the mastered records';
          this.messageService.open(message, 'Close');
          params.failCallback();
          this.gridOptions.api.showNoRowsOverlay();
        }
      });
    }
  }

  private setMasteredGridFilters(): void {
    if (this.onComponentInit) {
      this.taskType === TaskType.RC && this.setGridFilters(UNSPSCSource.RC);
      this.taskType === TaskType.CC && this.setGridFilters(UNSPSCSource.CC);
    }
    this.onComponentInit = false;
  }

  private getPayloadForMasteredItemList(params) {
    return {
      limit: this.cacheBlockSize,
      offset: Math.floor(params.endRow - this.cacheBlockSize),
      searchCriteria: this.getSearchCriteria(params.filterModel),
      sortCriteria: this.getSortCriteria(params.sortModel)
    };
  }

  private setGridFilters(taskType: string): void {
    this.gridApi.setFilterModel({ unspscSource: { filter: taskType, filterType: 'text', type: 'contains' } });
  }

  private normalizeItemMasteredRecords(records: any): any {
    return records.map((item: any) => {
      return {
        ...item,
        unspscAttributes: JSON.parse(item.unspscAttributes || '[]')
      };
    });
  }
}
