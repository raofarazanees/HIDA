import { ColDef, GridOptions } from "ag-grid-community";
import { commonAgGridOption, rowStyle } from "./row-style.utils";
import { cdxAgGridHeaderStyle } from "./parent-manf-column.constants";

export function I2PGraphHistoryOptions(height: any, scope): GridOptions {
  return {
    columnDefs: [...getColumnDef(scope)],
    getRowStyle: (params) => rowStyle(params, scope),
    suppressColumnVirtualisation: true,
    animateRows: false,
    suppressAnimationFrame: false,
    ...commonAgGridOption(height),
    rowBuffer: 20,
  };
}

const getColumnDef = (scope): ColDef[] => [
  
  {
    field: 'itemPguid',
    headerName: 'Item Key',
    headerTooltip: 'Unique ID of product',
    tooltipField: 'itemPguid',
    width: 250,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: true
  },
  {
    field: 'distributorName',
    headerName: 'Distributor',
    headerTooltip: 'Distributor',
    tooltipField: 'distributorName',
    width: 150,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
  },
  {
    field: 'itemDistSku',
    headerName: 'Dist Sku',
    headerTooltip: 'Dist Sku',
    tooltipField: 'itemDistSku',
    width: 100,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true
  },
  {
    field: 'sku',
    headerName: 'OEM Sku',
    headerTooltip: 'OEM Sku',
    tooltipField: 'sku',
    width: 150,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
  },
  {
    field: 'manufacturerDesc',
    headerName: 'Item Manf',
    headerTooltip: 'Item Manf',
    tooltipField: 'manufacturerDesc',
    width: 200,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
  },
  {
    field: 'itemDesc',
    headerName: 'Item Desc',
    headerTooltip: 'Item Desc',
    tooltipField: 'itemDesc',
    width: 300,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
  },
  {
    field: 'effectiveDate',
    headerName: 'Start Date',
    headerTooltip: 'Start Date',
    tooltipField: 'effectiveDate',
    width: 200,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
  },
  {
    field: 'endDate',
    headerName: 'End Date',
    headerTooltip: 'End Date',
    tooltipField: 'endDate',
    width: 200,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
  },
  {
    field: 'etlActiveFlag',
    headerName: 'Active Flag',
    headerTooltip: 'Active Flag',
    tooltipField: 'etlActiveFlag',
    width: 150,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
  },
  {
    field: 'productId',
    headerName: 'Current Product Id',
    headerTooltip: 'Current Product Id',
    tooltipField: 'productId',
    width: 150,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true
  },
];