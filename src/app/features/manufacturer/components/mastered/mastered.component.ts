import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { GridApi, GridOptions, GridReadyEvent, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { AgGridActionCellComponent } from './../../../../shared/components';
import { MessageService } from './../../../../shared/services';
import { getDefaultColDef, getMasteredColumnDefs } from './../../modal/ag-grid.constants';

import { ManufacturerService } from '../../services/manufacturer.service';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from './edit/edit.component';
import { LogDialogComponent } from './log-dialog/log-dialog.component';

@Component({
  selector: 'app-manf-mastered-records',
  templateUrl: './mastered.component.html',
  styleUrls: ['./mastered.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MasteredComponent implements OnInit {
  @Input() distributorPguid: number;

  private dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      const payload = this.getPayloadForMasteredManufacturerList(params);
      this.gridApi.showLoadingOverlay();
      this.getMasteredManufacturerList(params, payload);
    }
  } as IDatasource;

  constructor(private manufacturerService: ManufacturerService, private messageService: MessageService, public matDialog: MatDialog) {}

  gridOptions: GridOptions;
  gridApi: GridApi;
  cacheBlockSize = 100;

  frameworkComponents = {
    actionCellRenderer: AgGridActionCellComponent
  };

  ngOnInit() {
    this.initGridOption();
  }

  initGridOption() {
    this.gridOptions = {
      defaultColDef: getDefaultColDef(),
      columnDefs: [
        {
          headerName: 'Action',
          cellRenderer: 'actionCellRenderer',
          cellRendererParams: {
            isExceptionLead: true,
            onEditClick: (node: any) => {
              this.openEditModal(node);
            },
            onLogClick: (node: any) => {
              this.openLogModal(node.data);
            }
          },
          sortable: false,
          filter: false,
          resizable: false,
          width: 80,
          maxWidth: 80
        },
        ...getMasteredColumnDefs()
      ],
      rowData: [],
      pagination: true,
      paginationPageSize: 20,
      rowHeight: 30,
      rowModelType: 'infinite',
      cacheBlockSize: this.cacheBlockSize,
      datasource: this.dataSource,
      overlayNoRowsTemplate: 'There is no mastered records to show'
    };
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  getPayloadForMasteredManufacturerList(params) {
    let orderBy: string;
    if (params.sortModel.length === 0) {
      orderBy = 'externalManufacturerKey';
    } else {
      orderBy = params.sortModel[0].colId;
    }
    const sortBy = params.sortModel.length === 0 ? 'asc' : params.sortModel[0].sort;
    const sortCriteria = [{ orderBy, sortBy }];
    const searchCriteria = [];
    if (params.filterModel) {
      for (const property in params.filterModel) {
        const columnName = property;
        const searchText = params.filterModel[property].filter;
        searchCriteria.push({ columnName, searchText });
      }
    }
    return {
      limit: this.cacheBlockSize,
      offset: Math.floor(params.endRow - this.cacheBlockSize),
      searchCriteria,
      sortCriteria
    };
  }
  getManufacturerMaster(data, params) {
    const response: any = data;
    let lastRow = -1;
    let list = [];
    if (response.list.length) {
      list = response.list;
      lastRow = response.totalRecords <= params.endRow ? response.totalRecords : -1;
      this.gridApi.hideOverlay();
    } else {
      lastRow = 0;
      this.gridOptions.api.showNoRowsOverlay();
    }
    params.successCallback(list, lastRow);
  }

  getMasteredManufacturerList(params: any, payload: any) {
    if (this.gridApi && this.distributorPguid) {
      this.gridApi.showLoadingOverlay();
      this.manufacturerService.getMasteredManufacturerList(payload).subscribe({
        next: (data) => {
          this.getManufacturerMaster(data, params);
        },
        error: (error) => {
          this.messageService.open('An error occurred while fetching the mastered manufacturer records', 'Close');
          params.failCallback();
          this.gridOptions.api.showNoRowsOverlay();
        }
      });
    }
  }

  private openEditModal(node: any): void {
    const modalRef = this.matDialog.open(EditComponent, {
      width: '65%',
      data: node.data
    });
    modalRef.afterClosed().subscribe((mapping: any) => {
      if (!mapping) {
        return;
      }
      const rowNode = this.gridApi.getRowNode(node.id);
      const rowData = this.gridApi.getRowNode(node.id).data;
      rowData.internalManufacturerDesc = mapping.value;
      rowNode.updateData(rowData);
    });
  }

  private openLogModal(data: any): void {
    const modalRef = this.matDialog.open(LogDialogComponent, {
      width: '80%',
      data
    });
  }
}
