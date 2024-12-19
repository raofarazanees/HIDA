import { MatDialog } from '@angular/material/dialog';
import { GridReadyEvent } from 'ag-grid-community';
import { GridApi, GridOptions, IDatasource } from 'ag-grid-enterprise';
import { masteredDialogs } from '../dialogs/mastered.dialogs';
import { getDefaultColDef, getMasteredColumnDefs, TaskType } from '../modal/ag-grid.constants';
import { itemMasterMessages } from '../modal/item-master-messages.constants';
import { BaseContainer } from './base.container';

export class MasteredContainer extends BaseContainer {
  gridOptions: GridOptions;
  gridApi: GridApi;
  onComponentInit: boolean = true;

  constructor(public matDialog: MatDialog) {
    super();
  }

  initGridOption(dataSource: IDatasource, attributeExtensions: any) {
    this.gridOptions = {
      cacheBlockSize: this.cacheBlockSize,
      columnDefs: this.getColumnDefs(attributeExtensions),
      datasource: dataSource,
      headerHeight: 40,
      defaultColDef: getDefaultColDef(),
      pagination: true,
      paginationPageSize: 20,
      rowData: [],
      rowHeight: this.gridRowHeight,
      rowModelType: 'infinite',
      overlayNoRowsTemplate: itemMasterMessages.noMasteredRecords
    };
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  getSearchCriteria(filterModel: any): any {
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

  getSortCriteria(sortModel: any): any {
    const orderBy = sortModel.length ? sortModel[0].colId : 'oemSku';
    const sortBy = !sortModel.length ? 'asc' : sortModel[0].sort;
    return [{ orderBy, sortBy }];
  }

  resetFilters(): void {
    this.gridApi.setFilterModel(null);
  }

  private getColumnDefs(attributeExtensions: any) {
    return [
      {
        headerName: 'Action',
        cellRenderer: 'actionCellRenderer',
        pinned: 'left',
        cellRendererParams: {
          isExceptionLead: this.taskType === TaskType.RC || this.taskType === TaskType.CC ? false : this.isExceptionLead,
          onEditClick: (node: any) => {
            masteredDialogs.changeLog
              .edit({ ...node.data, attributeExtensions }, this.matDialog)
              .afterClosed()
              .subscribe((updatedData: any) => {
                if (!updatedData) {
                  return;
                }
                const rowNode = this.gridApi.getRowNode(node.id);
                rowNode.setData(updatedData);
              });
          },
          onLogClick: (node: any) => {
            masteredDialogs.changeLog.view({ ...node.data, attributeExtensions }, this.matDialog);
          },
          onDetailsClick: (node: any) => {
            masteredDialogs.itemDetails({ ...node.data, attributeExtensions }, this.matDialog);
          }
        },
        width: 100,
        sortable: false,
        filter: false,
        resizable: false
      },
      ...getMasteredColumnDefs(),
      {
        headerName: 'Item Attributes',
        headerTooltip: 'Item Attributes',
        field: 'unspscAttributes',
        cellRenderer: 'attributeColumnRendererComponent',
        cellRendererParams: {
          readonly: true,
          attributeExtensions
        },
        pinned: 'right',
        width: 200,
        filter: 'text'
      }
    ];
  }
}
