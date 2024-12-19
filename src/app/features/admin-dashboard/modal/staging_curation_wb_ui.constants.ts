import { ColDef, GridOptions } from 'ag-grid-community';
const getRejectReasonColumn = (scope, id?: any) => {
  if (id == 'taskLevelRecords') {
    return [
      {
        field: 'rejectReason',
        colId: 'RejectReason',
        headerName: 'Reject Reason',
        tooltipField: 'rejectReason',
        width: 140,
        filter: false,
        editable: (node: any = { data: {} }) => {
          return node.data.status && node.data.status === 'N';
        },
        singleClickEdit: true,
        pinned: 'right',
        lockPosition: false,
        lockPinned: false,
        cellStyle: {
          textAlign: 'center'
        },
        headerClass: 'grid-cell-centered',
        cellClass: (node) => {
          return node.data.status && node.data.status === 'N' ? 'focused-cell' : '';
        },
        onCellValueChanged: (rowNode: any): void => {
          scope.updateRejectReason(rowNode.node);
        },
        suppressMenu: true,
        sortable: false
      }
    ];
  } else {
    return [];
  }
};
const getActionColumn = (scope, isFinal?: boolean, id?: any) => {
  if (isFinal) {
    return [
      {
        field: 'status',
        colId: id,
        headerName: 'Approve',
        tooltipField: 'Approve',
        width: 65,
        filter: false,
        cellRenderer: 'checkboxSelector',
        onCellClicked: (node) => {
          scope.enabledSubmitButton();
        },
        pinned: 'right',
        lockPosition: true,
        lockPinned: true,
        cellStyle: {
          textAlign: 'center'
        },
        headerClass: 'grid-cell-centered',
        suppressMenu: true,
        sortable: false
      },
      {
        field: 'status',
        colId: id,
        headerName: 'Reject',
        tooltipField: 'Reject',
        width: 60,
        filter: false,
        cellRenderer: 'checkboxSelector',
        onCellClicked: (node) => {
          scope.enabledSubmitButton();
        },
        pinned: 'right',
        lockPinned: true,
        cellStyle: {
          textAlign: 'center'
        },
        headerClass: 'grid-cell-centered',
        suppressMenu: true,
        sortable: false
      }
    ];
  } else {
    return [];
  }
};

const ForStagingCurationWBUIColumn = (scope, isFinal?: boolean): ColDef[] => [
  { field: 'productID', headerName: 'Product ID', headerTooltip: 'Product ID', tooltipField: 'productID', width: 100, filter: true },
  { field: 'prodSKU', headerName: 'Product SKU', headerTooltip: 'Product SKU', tooltipField: 'prodSKU', width: 110, filter: true },
  { field: 'prodDesc', headerName: 'Product Desc', headerTooltip: 'Product Desc', tooltipField: 'prodDesc', width: 160, filter: true },
  { field: 'prodManf', headerName: 'Product Manf', headerTooltip: 'Product Manf', tooltipField: 'prodManf', width: 130, filter: true },
  {
    field: 'prodParentManf',
    headerName: 'Product Parent Manf',
    headerTooltip: 'Product Parent Manf',
    tooltipField: 'prodParentManf',
    width: 140,
    filter: true
  },
  {
    field: 'prodConvFactor',
    headerName: 'Product Conv Factor',
    headerTooltip: 'Product Conv Factor',
    tooltipField: 'prodConvFactor',
    width: 120,
    filter: true
  },
  {
    field: 'prodBrandMastered',
    headerName: 'Product Brand Mastered',
    headerTooltip: 'Product Brand Mastered',
    tooltipField: 'prodBrandMastered',
    width: 150,
    filter: true,
    hide: true
  },
  {
    field: 'currentUNSPSCCode',
    headerName: 'Current UNSPSC Code',
    headerTooltip: 'Current UNSPSC Code',
    tooltipField: 'currentUNSPSCCode',
    width: 140,
    filter: true
  },
  {
    field: 'currentUNSPSCDesc',
    headerName: 'Current UNSPSC Desc',
    headerTooltip: 'Current UNSPSC Desc',
    tooltipField: 'currentUNSPSCDesc',
    width: 160,
    filter: true
  },
  {
    field: 'newUNSPSCCode',
    headerName: 'New UNSPSC Code',
    headerTooltip: 'New UNSPSC Code',
    tooltipField: 'newUNSPSCCode',
    width: 140,
    filter: true,
    cellRenderer: 'unspscCodeRendererComponent',
    cellRendererParams: {
      onDropCell: (rowNode: any) => {
        scope.addToUpdatedRecords(rowNode, true);
      },
      details: 'manual',
      draggable: true,
      selectionValue: 'workbench other'
    },
    onCellDoubleClicked: (event: any): void => {
      scope.onCellDoubleClicked(event);
    }
  },
  {
    field: 'newUNSPSCDesc',
    headerName: 'New UNSPSC Desc',
    headerTooltip: 'New UNSPSC Desc',
    tooltipField: 'newUNSPSCDesc',
    width: 170,
    filter: true
  },
  { field: 'unspscAnalystName', headerName: 'Analyst Name', tooltipField: 'analystName', width: 140, filter: true },
  {
    field: 'unspscComments',
    headerName: 'Comments',
    tooltipField: 'comments',
    width: 140,
    filter: true,
    editable: (node: any = { data: {} }) => {
      return node.data.unspscSource;
    },
    resizable: true,
    onCellValueChanged: (rowNode: any): void => {
      scope.addToUpdatedRecords(rowNode.node, true);
      setTimeout(() => rowNode.api.redrawRows(), 0);
    }
  }
];

const ColumnForItemViewStagingCuration = (): ColDef[] => [
  { field: 'distributorName', headerName: 'Distributor Name', tooltipField: 'distributorName', width: 160, filter: true },
  { field: 'itemPGUID', headerName: 'Item Unique Key', tooltipField: 'itemKey', width: 185, filter: true },
  { field: 'itemKey', headerName: 'Distributor SKU', tooltipField: 'manfKey', width: 135, filter: true },
  { field: 'manfKey', headerName: 'Distributor OEM SKU', tooltipField: 'manfDesc', width: 160, filter: true },
  { field: 'manfDesc', headerName: 'Distributor OEM Name', tooltipField: 'manfDesc', width: 190, filter: true },
  { field: 'stdManfDesc', headerName: 'Standard OEM Name', tooltipField: 'stdManfDesc', width: 160, filter: true },
  { field: 'stdParentManf', headerName: 'Standard OEM Parent Name', tooltipField: 'stdParentManf', width: 195, filter: true },
  { field: 'itemDesc', headerName: 'Distributor Item Desc', tooltipField: 'itemDesc', width: 200, filter: true },
  { field: 'itemUNSPSC', headerName: 'Item UNSPSC', tooltipField: 'itemUNSPSC', width: 155, filter: true },
  { field: 'itemUNSPSCDesc', headerName: 'Item UNSPSC Desc', tooltipField: 'itemUNSPSCDesc', width: 200, filter: true }
];

export function ForStagingCurationWBUI(
  height: any,
  scope,
  renderForReview: boolean = false,
  colId: string = 'reviewFinalRecords'
): GridOptions {
  return {
    columnDefs: [
      ...getActionColumn(scope, renderForReview, colId),
      ...ForStagingCurationWBUIColumn(scope, renderForReview),
      ...getRejectReasonColumn(scope, colId)
    ],
    rowData: [],
    pagination: true,
    paginationPageSize: 20,
    defaultColDef: {
      sortable: true,
      resizable: true,
      filter: false
    },
    rowHeight: height,
    overlayNoRowsTemplate: 'There are no records to show.',
    rowClassRules: { 'ag-row-modified': 'data.isModified' }
  };
}

export function ForStagingCurationProductItemView(height: any): GridOptions {
  return {
    columnDefs: [...ColumnForItemViewStagingCuration()],
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
