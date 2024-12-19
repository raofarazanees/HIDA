import { itemToProductMessages } from '../../modal/item-to-product-messages.constants';
import { GridOptions } from 'ag-grid-community';

const forPairsConfirmationColumnDefs = () => [
  {
    field: 'pairID',
    headerName: 'Pair ID',
    tooltipField: 'pairID',
    flex: 1,
    filter: true
  },
  {
    headerName: 'Item 1',
    headerClass: 'ag-group-cell-i2p-color1 first',
    lockPosition: true,
    children: [
      { field: 'cleanOEMSKU1', headerName: 'OEM SKU', tooltipField: 'cleanOEMSKU1', flex: 2, filter: true },
      { field: 'distributorName1', headerName: 'Distributor', tooltipField: 'distributorName1', flex: 2, filter: true, hide: true },
      {
        field: 'manfDesc1',
        headerName: 'Manf Desc',
        headerTooltip: 'Manufacturer Description',
        tooltipField: 'manfDesc1',
        flex: 2,
        filter: true
      },
      {
        field: 'stdInternalManf1',
        headerName: 'Internal Manf',
        headerTooltip: 'Std Internal Manufacturer',
        tooltipField: 'stdInternalManf1',
        flex: 2,
        filter: true,
        hide: true
      },
      {
        field: 'cleanItemDesc1',
        headerName: 'Item Desc',
        headerTooltip: 'Clean Item Description',
        tooltipField: 'cleanItemDesc1',
        flex: 2,
        filter: true
      },
      {
        field: 'stdParentManf1',
        headerName: 'Parent Manf',
        headerTooltip: 'Std Parent Manufacturer',
        tooltipField: 'stdParentManf1',
        flex: 2,
        filter: true,
        hide: true
      }
    ]
  },
  {
    headerName: 'Item 2',
    headerClass: 'ag-group-cell-i2p-color2 last',
    lockPosition: true,
    children: [
      { field: 'cleanOEMSKU2', headerName: 'OEM SKU', tooltipField: 'cleanOEMSKU2', flex: 2, filter: true },
      { field: 'distributorName2', headerName: 'Distributor', tooltipField: 'distributorName2', flex: 2, filter: true, hide: true },
      {
        field: 'manfDesc2',
        headerName: 'Manf Desc',
        headerTooltip: 'Manufacturer Description',
        tooltipField: 'manfDesc2',
        flex: 2,
        filter: true
      },
      {
        field: 'stdInternalManf2',
        headerName: 'Internal Manf',
        headerTooltip: 'Std Internal Manufacturer',
        tooltipField: 'stdInternalManf2',
        flex: 2,
        filter: true,
        hide: true
      },
      {
        field: 'cleanItemDesc2',
        headerName: 'Item Desc',
        headerTooltip: 'Clean Item Description',
        tooltipField: 'cleanItemDesc2',
        flex: 2,
        filter: true
      },
      {
        field: 'stdParentManf2',
        headerName: 'Parent Manf',
        headerTooltip: 'Std Parent Manufacturer',
        tooltipField: 'stdParentManf2',
        flex: 2,
        filter: true,
        hide: true
      }
    ]
  },
  { field: 'isPair', headerName: 'Is Pair', tooltipField: 'isPair', flex: 1 },
  { field: 'threshold', headerName: 'Threshold', tooltipField: 'threshold', flex: 2, hide: true },
  { field: 'analystName', headerName: 'Analyst Name', tooltipField: 'analystName', flex: 2, hide: true },
  { field: 'vendorName', headerName: 'Vendor', tooltipField: 'vendorName', flex: 2, hide: true },
  { field: 'comments', headerName: 'Comments', tooltipField: 'comments', flex: 2, hide: true },
  { field: 'businessRule', headerName: 'Rule', tooltipField: 'businessRule', flex: 2, hide: true }
];

export function forPairsConfirmationGridOptions(height: any): GridOptions {
  return {
    columnDefs: forPairsConfirmationColumnDefs(),
    groupHeaderHeight: 30,
    headerHeight: 35,
    defaultColDef: {
      sortable: true,
      resizable: true,
      filter: true,
      valueFormatter: (params: any): any => params.value || '-'
    },
    rowData: [],
    pagination: true,
    paginationPageSize: 50,
    rowHeight: height,
    overlayNoRowsTemplate: itemToProductMessages.noItemPairsForConfirmation,
    sideBar: {
      toolPanels: [
        {
          id: 'filters',
          labelDefault: 'Filters',
          labelKey: 'filters',
          iconKey: 'filter',
          toolPanel: 'agFiltersToolPanel',
          minWidth: 180,
          maxWidth: 400,
          width: 250
        }
      ],
      position: 'right',
      defaultToolPanel: ''
    }
  };
}
