import { ColDef, GridOptions } from 'ag-grid-community';
import { cdxAgGridHeaderStyle } from './parent-manf-column.constants';
const ForParentChangeLogColumn = (): ColDef[] => [
  {
    field: 'parentManfName',
    headerName: 'Parent Manufacturer Name',
    headerTooltip: 'Name of Master Parent Manufacturer',
    tooltipField: 'parentManfName',
    width: 320,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'active',
    headerName: 'Is Parent Active ?',
    headerTooltip: 'Status of Master Parent Manufacturer',
    tooltipField: 'active',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'activeFlag',
    headerName: 'Is Active ?',
    headerTooltip: 'Pervious Status of Master Parent Manufacturer',
    tooltipField: 'activeFlag',
    width: 140,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'createdBy',
    headerName: 'Updated By (Effective)',
    headerTooltip: 'Who created the Master Parent Manufacturer ?',
    tooltipField: 'createdBy',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'effectiveDate',
    headerName: 'Updated When (Effective)',
    headerTooltip: 'When was the Master Parent Manufacturer updated ?',
    tooltipField: 'effectiveDate',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'updatedBy',
    headerName: 'Updated By (End)',
    headerTooltip: 'Who updated the Master Parent Manufacturer ?',
    tooltipField: 'updatedBy',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'endDate',
    headerName: 'Updated When (End)',
    tooltipField: 'endDate',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  }
];

export function GetParentManfChangeLogGridOption(height: any): GridOptions {
  return {
    columnDefs: [...ForParentChangeLogColumn()],
    rowData: [],
    pagination: true,
    paginationPageSize: 20,
    defaultColDef: {
      sortable: true,
      resizable: true,
      filter: false
    },
    rowHeight: height,
    overlayNoRowsTemplate: 'There are no records to show.'
  };
}
