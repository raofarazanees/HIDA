import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridApi, GridOptions, GridReadyEvent, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { AgGridActionCellComponent } from './../../../../shared/components';
import { MessageService, UtilityService } from './../../../../shared/services';
import { getDefaultColDef, getMasteredColumnDefs } from '../../modal/ag-grid.constants';

import { FacilityTypeService } from '../../services/facility-type.service';
import { EditComponent } from './edit/edit.component';
import { LogDialogComponent } from './log-dialog/log-dialog.component';

@Component({
  selector: 'app-facility-type-mastered-records',
  templateUrl: './mastered.component.html',
  styleUrls: ['./mastered.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MasteredComponent implements OnInit {
  @Input() distributorPguid: number;

  private dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      const payload = this.getPayloadForMasteredFacilityList(params);
      this.gridApi.showLoadingOverlay();
      this.getMasteredRecords(params, payload);
    }
  } as IDatasource;

  constructor(
    private facilityTypeService: FacilityTypeService,
    private utilityService: UtilityService,
    private messageService: MessageService,
    public matDialog: MatDialog
  ) {}

  gridOptions: GridOptions;
  private gridApi: GridApi;
  private cacheBlockSize = 100;

  frameworkComponents = {
    actionCellRenderer: AgGridActionCellComponent
  };

  ngOnInit() {
    this.initGridOption();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  private initGridOption() {
    this.gridOptions = {
      cacheBlockSize: this.cacheBlockSize,
      columnDefs: this.getColumnDefs(),
      datasource: this.dataSource,
      defaultColDef: getDefaultColDef(),
      pagination: true,
      paginationPageSize: 20,
      rowData: [],
      rowHeight: this.utilityService.getAgGridRowHeight(),
      rowModelType: 'infinite',
      overlayNoRowsTemplate: 'There is no mastered records to show'
    };
  }

  private getColumnDefs() {
    return [
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
    ];
  }

  private updateGrid(data: any, params: any): void {
    let lastRow = -1;
    let list = [];
    if (data.list.length) {
      list = data.list;
      lastRow = data.totalRecords <= params.endRow ? data.totalRecords : -1;
      this.gridApi.hideOverlay();
    } else {
      lastRow = 0;
      this.gridOptions.api.showNoRowsOverlay();
    }
    params.successCallback(list, lastRow);
  }

  private getMasteredRecords(params: any, payload: any) {
    if (this.gridApi && this.distributorPguid) {
      this.gridApi.showLoadingOverlay();
      this.facilityTypeService.getMasteredRecords(payload).subscribe({
        next: (data) => {
          this.updateGrid(data, params);
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

  private getSearchCriteria(filterModel: any): any {
    const searchCriteria = [];
    if (filterModel) {
      for (const property in filterModel) {
        const columnName = property;
        const searchText = filterModel[property].filter;
        searchCriteria.push({ columnName, searchText });
      }
    }
    return searchCriteria;
  }

  private getSortCriteria(sortModel: any): any {
    const orderBy = sortModel.length ? sortModel[0].colId : 'externalFacilityKey';
    const sortBy = sortModel.length === 0 ? 'asc' : sortModel[0].sort;
    return [{ orderBy, sortBy }];
  }

  private getPayloadForMasteredFacilityList(params) {
    return {
      limit: this.cacheBlockSize,
      offset: Math.floor(params.endRow - this.cacheBlockSize),
      searchCriteria: this.getSearchCriteria(params.filterModel),
      sortCriteria: this.getSortCriteria(params.sortModel)
    };
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
      rowNode.updateData({ ...rowData, ...mapping });
    });
  }

  private openLogModal(data: any): void {
    this.matDialog.open(LogDialogComponent, {
      width: '80%',
      data
    });
  }
}
