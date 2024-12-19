import { ColDef, GridOptions } from "ag-grid-community";
import { cdxAgGridHeaderStyle, logIconColumn } from "./parent-manf-column.constants";
import { rowStyle, commonAgGridOption } from "./row-style.utils";

export function ItemToProductGraphDetailsGrid(height: any, scope, readOnly = false): GridOptions {
  return {
    columnDefs: [...ItemToProductGraphDetailsColumns(scope, readOnly)],
    stopEditingWhenCellsLoseFocus: true,
    getRowStyle: (params) => rowStyle(params),
    ...commonAgGridOption(),
  };
}

const ItemToProductGraphDetailsColumns = (scope, readOnly): ColDef[] => [
  {
    field: 'productId',
    headerName: 'Product ID',
    tooltipField: 'productId',
    headerTooltip: 'Product ID',
    width: 100,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'itemPguid',
    headerName: 'Item Key',
    tooltipField: 'itemPguid',
    headerTooltip: 'Item Key',
    minWidth: 270,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true
  },
  {
    field: 'itemDist',
    headerName: 'Distributor',
    tooltipField: 'itemDist',
    headerTooltip: 'Distributor',
    minWidth: 200,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'itemDistSku',
    headerName: 'Dist SKU',
    tooltipField: 'itemDistSku',
    headerTooltip: 'Dist SKU',
    width: 200,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'itemSKU',
    headerName: 'OEM SKU',
    tooltipField: 'itemSKU',
    headerTooltip: 'OEM SKU',
    width: 200,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'manufacturerDesc',
    headerName: 'Item Manf',
    tooltipField: 'manufacturerDesc',
    headerTooltip: 'Item Manf',
    minWidth: 250,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'itemDesc',
    headerName: 'Item Desc',
    tooltipField: 'itemDesc',
    headerTooltip: 'Item Desc',
    minWidth: 550,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  }
]