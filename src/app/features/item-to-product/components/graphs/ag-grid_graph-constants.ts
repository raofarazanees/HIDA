import { GridOptions } from 'ag-grid-community';

const forGraphColumnDefs = () => [
  { field: 'productID', headerName: 'Product ID', tooltipField: 'productID', width: 140, suppressSizeToFit: true, filter: true },
  { field: 'productDesc', headerName: 'Product Desc', tooltipField: 'productDesc', filter: true },
  { field: 'productSKU', headerName: 'Product OEM SKU', tooltipField: 'productSKU', filter: true },
  { field: 'productManf', headerName: 'Product OEM Name', tooltipField: 'productManf', filter: true },
  { field: 'productParentManf', headerName: 'Product Parent OEM Name', tooltipField: 'productParentManf', filter: true },
  { field: 'productUNSPSC', headerName: 'Product UNSPSC', tooltipField: 'productUNSPSC', filter: true },
  { field: 'productUNSPSCDesc', headerName: 'Product UNSPSC Desc', tooltipField: 'productUNSPSCDesc', filter: true }
];

const forGraphItemColumnDefs = () => [
  { field: 'distributorName', headerName: 'Distributor Name', tooltipField: 'distributorName', width: 140, filter: true },
  { field: 'itemPGUID', headerName: 'Item Unique Key', tooltipField: 'itemKey', width: 135, filter: true },
  { field: 'itemKey', headerName: 'Distributor SKU', tooltipField: 'manfKey', width: 135, filter: true },
  { field: 'manfKey', headerName: 'Distributor OEM SKU', tooltipField: 'manfDesc', width: 150, filter: true },
  { field: 'manfDesc', headerName: 'Distributor OEM Name', tooltipField: 'manfDesc', width: 180, filter: true },
  { field: 'stdManfDesc', headerName: 'Standard OEM Name', tooltipField: 'stdManfDesc', width: 160, filter: true },
  { field: 'stdParentManf', headerName: 'Standard OEM Parent Name', tooltipField: 'stdParentManf', width: 185, filter: true },
  { field: 'itemDesc', headerName: 'Distributor Item Desc', tooltipField: 'itemDesc', width: 180, filter: true },
  { field: 'action', headerName: 'Action', tooltipField: 'action', width: 90, filter: true },
  { field: 'toProductID', headerName: 'From Product ID', tooltipField: 'toProductID', width: 130, filter: true },
  { field: 'productItemAnalystName', headerName: 'Analyst Name', tooltipField: 'productItemAnalystName', width: 140, filter: true },
  { field: 'productItemComments', headerName: 'Comments', tooltipField: 'productItemComments', width: 180, filter: true }
];

const forGraphProductDownloadView = () => [
  { field: 'distributorName', headerName: 'Distributor Name', tooltipField: 'distributorName', width: 160, filter: true },
  { field: 'itemPGUID', headerName: 'Item Unique Key', tooltipField: 'itemPGUID', width: 185, filter: true },
  { field: 'itemKey', headerName: 'Distributor SKU', tooltipField: 'itemKey', width: 135, filter: true },
  { field: 'manfKey', headerName: 'Distributor OEM SKU', tooltipField: 'manfKey', width: 160, filter: true },
  { field: 'manfDesc', headerName: 'Distributor OEM Name', tooltipField: 'manfDesc', width: 190, filter: true },
  { field: 'stdManfDesc', headerName: 'Standard OEM Name', tooltipField: 'stdManfDesc', width: 160, filter: true },
  { field: 'stdParentManf', headerName: 'Standard OEM Parent Name', tooltipField: 'stdParentManf', width: 195, filter: true },
  { field: 'itemDesc', headerName: 'Distributor Item Desc', tooltipField: 'itemDesc', width: 200, filter: true },
  { field: 'itemUNSPSC', headerName: 'Item UNSPSC', tooltipField: 'itemUNSPSC', width: 155, filter: true },
  { field: 'itemUNSPSCDesc', headerName: 'Item UNSPSC Desc', tooltipField: 'itemUNSPSCDesc', width: 200, filter: true },
  { field: 'productID', headerName: 'Product ID', tooltipField: 'productID', width: 110, filter: true },
  { field: 'productDesc', headerName: 'Product Desc', tooltipField: 'productDesc', width: 160, filter: true },
  { field: 'productSKU', headerName: 'Product SKU', tooltipField: 'productSKU', width: 130, filter: true },
  { field: 'productManf', headerName: 'Product Manf', tooltipField: 'productManf', width: 140, filter: true },
  { field: 'productParentManf', headerName: 'Product Parent Manf', tooltipField: 'productParentManf', width: 160, filter: true },
  { field: 'productUNSPSC', headerName: 'Product UNSPSC', tooltipField: 'productUNSPSC', width: 140, filter: true },
  { field: 'productUNSPSCDesc', headerName: 'Product UNSPSC Desc', tooltipField: 'productParentManf', width: 180, filter: true },
  { field: 'lastModifiedDate', headerName: 'Last Modified Date',headerTooltip:'Product Last Modified Date', tooltipField: 'lastModifiedDate', width: 145, filter: true },
  { field: 'analystName', headerName: 'Analyst Name', tooltipField: 'analystName', width: 140, filter: true },
  { field: 'comments', headerName: 'Comments', tooltipField: 'comments', width: 140, filter: true }
];

export function forGraphGridOptions(height: any): GridOptions {
  return {
    columnDefs: [...forGraphColumnDefs()],
    rowData: [],
    pagination: true,
    paginationPageSize: 20,
    defaultColDef: {
      sortable: true,
      resizable: true,
      filter: true
    },
    rowHeight: height,
    overlayNoRowsTemplate: 'There are no records to show.'
  };
}

export function forGraphItemGridOptions(height: any): GridOptions {
  return {
    columnDefs: [...forGraphItemColumnDefs()],
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

export function ForGraphProductReview(height: any): GridOptions {
  return {
    columnDefs: [...forGraphProductDownloadView()],
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