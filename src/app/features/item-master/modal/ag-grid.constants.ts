import * as moment from 'moment';

export enum TaskType {
  P = 'predicted',
  UM = 'unpredicted',
  RC = 'reclassification',
  CC = 'clientcorrection'
}

export enum UNSPSCSource {
  DS = 'workbench DS',
  RE = 'workbench RE',
  M = 'workbench other',
  WM = 'workbench mastered',
  CC = 'client correction',
  RC = 'workbench requested reclassification'
}

export function getMasteredColumnDefs() {
  return [
    { field: 'productDesc', headerName: 'Product Description', tooltipField: 'productDesc', filter: 'text' },
    {
      field: 'taxonomy',
      headerName: 'Taxonomy',
      tooltipField: 'taxonomy',
      valueFormatter: (params: any): any => (params.value ? params.value : '-'),
      filter: 'text'
    },
    {
      field: 'manufacturerDesc',
      headerName: 'Manufacturer Name',
      tooltipField: 'manufacturerDesc',
      filter: 'text',
      valueFormatter: (params: any): any => (params.value ? params.value : '-')
    },
    { field: 'stdOemName', headerName: 'Standard OEM Name', tooltipField: 'stdOemName', filter: 'text' },
    { field: 'itemPguid', headerName: 'Item PGUID', tooltipField: 'itemPguid', filter: 'text' },
    { field: 'distributorSku', headerName: 'Distributor SKU', tooltipField: 'distributorSku', filter: 'text' },
    { field: 'oemSku', headerName: 'OEM SKU', tooltipField: 'oemSku', filter: 'text' },
    { field: 'updatedDate', headerName: 'Last Updated Date', tooltipValueGetter: timeFormatter, valueFormatter: timeFormatter },
    {
      headerName: 'UNSPSC Code',
      field: 'masteredUnspscCode',
      cellRenderer: 'unspscCodeRendererComponent',
      pinned: 'right',
      width: 130,
      cellRendererParams: {
        details: 'manual',
        draggable: false,
        readonly: true
      },
      filter: 'text'
    },
    { field: 'ambiguityFlag', headerName: 'Ambiguity', tooltipField: 'ambiguityFlag', pinned: 'right', width: 130, filter: 'text' },
    {
      field: 'unspscSource',
      headerName: 'UNSPSC Source',
      tooltipField: 'unspscSource',
      pinned: 'right',
      width: 150,
      valueFormatter: (params: any): any => (params.value ? params.value : '-'),
      filter: 'text'
    }
  ];
}

export function getUnmasteredColumnDefs() {
  return {
    columns: [
      { field: 'distributorSku', headerName: 'Distributor SKU', tooltipField: 'distributorSku', width: 140, disabled: true },
      { field: 'oemSku', headerName: 'OEM SKU', tooltipField: 'oemSku', width: 120, disabled: true },
      { field: 'oemName', headerName: 'Manufacturer Name', tooltipField: 'oemName', minWidth: 100, flex: 1, disabled: true },
      { field: 'productDesc', headerName: 'Product Description', tooltipField: 'productDesc', minWidth: 150, flex: 2, disabled: true },
      { field: 'taxonomy', headerName: 'Taxonomy', tooltipField: 'taxonomy', hide: true },
      { field: 'stdOemName', headerName: 'Standard OEM Name', tooltipField: 'stdOemName', hide: true },
      { field: 'clusterId', headerName: 'Cluster ID', tooltipField: 'clusterId', hide: true },
      { field: 'itemPguid', headerName: 'Item PGUID', tooltipField: 'itemPguid', hide: true },
      { field: 'dataSource', headerName: 'Data Source', tooltipField: 'dataSource', hide: true }
    ],
    visibleColumns: ['distributorSku', 'oemSku', 'oemName', 'productDesc'],
    hiddenColumns: ['taxonomy', 'stdOemName', 'clusterId', 'itemPguid', 'dataSource']
  };
}

export function getColumnDefsForChangeLog(attributeExtensions: any) {
  return [
    {
      headerName: 'UNSPSC Code',
      field: 'masteredUnspscCode',
      cellRenderer: 'unspscCodeRendererComponent',
      width: 130,
      cellRendererParams: {
        details: 'manual',
        draggable: false,
        readonly: true
      }
    },
    { field: 'ambiguityFlag', headerName: 'Ambiguity', tooltipField: 'ambiguityFlag' },
    {
      field: 'unspscSource',
      headerName: 'UNSPSC Source',
      tooltipField: 'unspscSource',
      valueFormatter: (params: any): any => (params.value ? params.value : '-')
    },
    {
      headerName: 'Item Attributes',
      headerTooltip: 'Item Attributes',
      field: 'unspscAttributes',
      cellRenderer: 'attributeColumnRendererComponent',
      cellRendererParams: {
        readonly: true,
        attributeExtensions
      },
      width: 200,
      sortable: false,
      filter: false,
      resizable: true
    },
    {
      field: 'comments',
      headerName: 'Comments',
      tooltipField: 'comments',
      valueFormatter: (params: any): any => (params.value ? params.value : '-')
    },
    {
      field: 'resourceName',
      headerName: 'Resource Name',
      tooltipField: 'resourceName',
      valueFormatter: (params: any): any => (params.value ? params.value : '-')
    },
    { field: 'effectiveDate', headerName: 'Updated When (Effective)', tooltipValueGetter: timeFormatter, valueFormatter: timeFormatter },
    { field: 'endDate', headerName: 'Updated When (End)', tooltipValueGetter: timeFormatter, valueFormatter: timeFormatter }
  ];
}

export function getColumnDefsForRejectLog() {
  return [
    {
      headerName: 'CC UNSPSC',
      headerTooltip: 'Client Correction Suggested UNSPSC Code',
      field: 'unspscForCC',
      cellRenderer: 'unspscCodeRendererComponent',
      width: 130,
      cellRendererParams: {
        details: 'unspscHierarchyForCC',
        draggable: false,
        readonly: true
      }
    },
    {
      field: 'customer',
      headerName: 'Customer',
      tooltipField: 'customer',
      valueFormatter: (params: any): any => (params.value ? params.value : '-')
    },
    {
      field: 'customerResourceName',
      headerName: 'Customer Resource Name',
      tooltipField: 'customerResourceName',
      valueFormatter: (params: any): any => (params.value ? params.value : '-')
    },
    {
      field: 'comments',
      headerName: 'Comments',
      tooltipField: 'comments',
      valueFormatter: (params: any): any => (params.value ? params.value : '-')
    },
    {
      field: 'resourceName',
      headerName: 'Resource Name',
      tooltipField: 'resourceName',
      valueFormatter: (params: any): any => (params.value ? params.value : '-')
    },
    {
      field: 'vendor',
      headerName: 'Vendor',
      tooltipField: 'vendor',
      valueFormatter: (params: any): any => (params.value ? params.value : '-')
    },
    { field: 'createdDate', headerName: 'Created Date', tooltipValueGetter: timeFormatter, valueFormatter: timeFormatter }
  ];
}

export function getDefaultColDef() {
  return {
    sortable: true,
    filter: true,
    resizable: true,
    filterParams: {
      suppressAndOrCondition: true,
      filterOptions: ['contains']
    }
  };
}

function timeFormatter(params: any): string {
  return params.value ? moment(params.value).format('YYYY-MM-DD HH:mm') : ' - ';
}
