import { filter } from 'rxjs/operators';
import * as moment from 'moment';
import { itemToProductMessages } from '../../modal/item-to-product-messages.constants';
import { GridOptions } from 'ag-grid-community';

function timeFormatter(params: any): string {
  return params.value ? moment(params.value).format('YYYY-MM-DD HH:mm') : ' - ';
}

const pairDetailsKeys = [
  { key: 'itemPGUID', value: 'Item PGUID' },
  { key: 'cleanDistributorSKU', value: 'Clean Distributor SKU' },
  { key: 'distributorName', value: 'Distributor' },
  { key: 'stdInternalManufacturer', value: 'Internal Company Name' },
  { key: 'stdParentManufacturerName', value: 'Internal Parent Company Name' },
  { key: 'cleanOEMSKU', value: 'Clean OEM SKU' },
  { key: 'cleanItemDesc', value: 'Clean Item Description' },
  { key: 'rawDistributorSKU', value: 'Raw Distributor SKU' },
  { key: 'rawOEMSKU', value: 'Raw OEM SKU' },
  { key: 'rawItemDesc', value: 'Raw Item Description' },
  { key: 'rawManufacturerKey', value: 'Raw Manufacturer Key' },
  { key: 'rawManufacturerDesc', value: 'Raw Manufacturer Description' }
];

const forPairingListColumnDefs = (onChangeCallback: Function) => [
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
      { field: 'rawOEMSKU1', headerName: 'OEM SKU', tooltipField: 'rawOEMSKU1', flex: 2, filter: true },
      { field: 'distributorName1', headerName: 'Distributor', tooltipField: 'distributorName1', flex: 2, filter: true },
      {
        field: 'stdInternalManufacturer1',
        headerName: 'Manufacturer',
        tooltipField: 'stdInternalManufacturer1',
        flex: 2,
        filter: true
      }
    ]
  },
  {
    headerName: 'Item 2',
    headerClass: 'ag-group-cell-i2p-color2 last',
    lockPosition: true,
    children: [
      { field: 'rawOEMSKU2', headerName: 'OEM SKU', tooltipField: 'rawOEMSKU2', flex: 2, filter: true },
      { field: 'distributorName2', headerName: 'Distributor', tooltipField: 'distributorName2', flex: 2, filter: true },
      { field: 'stdInternalManufacturer2', headerName: 'Manufacturer', tooltipField: 'stdInternalManufacturer2', flex: 2, filter: true }
    ]
  },
  {
    field: 'threshold',
    headerName: 'Threshold',
    tooltipField: 'threshold',
    flex: 2
  },
  {
    field: 'formattedStatus',
    headerName: 'Status',
    flex: 2,
    cellRenderer: 'toggleButtonRendererComponent',
    cellRendererParams: {
      refKey: 'status',
      onChange: onChangeCallback
    }
  },
  {
    field: 'pairID',
    headerName: '',
    tooltipValueGetter: () => 'Expand to View Details',
    valueFormatter: (): any => '',
    cellRenderer: 'agGroupCellRenderer',
    width: 40,
    filter: false,
    sortable: false,
    resizable: false,
    suppressMenu: true
  }
];

export function forPairingListGridOptions(height: any, onChangeCallback: Function): GridOptions {
  return {
    columnDefs: forPairingListColumnDefs(onChangeCallback),
    groupHeaderHeight: 30,
    headerHeight: 35,
    pivotMode: false,
    masterDetail: true,
    detailRowHeight: 355,
    detailCellRendererParams: {
      detailGridOptions: {
        headerHeight: 30,
        rowHeight: 25,
        columnDefs: [
          { field: 'attribute', headerName: 'Attributes', tooltipField: 'attribute', flex: 2 },
          {
            field: 'itemDetail1',
            headerName: 'Item 1 - Details',
            tooltipField: 'itemDetail1',
            flex: 4,
            headerClass: 'ag-group-cell-i2p-color1 first'
          },
          {
            field: 'itemDetail2',
            headerName: 'Item 2 - Details',
            tooltipField: 'itemDetail2',
            flex: 4,
            headerClass: 'ag-group-cell-i2p-color2 last'
          }
        ],
        defaultColDef: {
          flex: 1,
          valueFormatter: (params: any): any => params.value || '-'
        }
      },
      getDetailRowData: ({ data, successCallback }: any) => {
        successCallback(
          pairDetailsKeys.reduce((acc, item) => {
            return [...acc, { attribute: item.value, itemDetail1: data[item.key + '1'], itemDetail2: data[item.key + '2'] }];
          }, [])
        );
      }
    },
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
    overlayNoRowsTemplate: itemToProductMessages.noPairsAvailable,
    rowClassRules: { 'ag-row-modified': 'data.isModified' },
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
