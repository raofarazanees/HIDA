import { ColDef, GridOptions, ValueGetterParams } from 'ag-grid-community';
import { logIconColumn, cdxAgGridHeaderStyle } from './parent-manf-column.constants';
import { rowStyle, commonAgGridOption } from './row-style.utils';
import { createUpdateColumn } from './market-master.utils';

export function ProductEntitlementOptions(height: any, scope, readOnly = false, email: string, hidePId = true): GridOptions {
  return {
    columnDefs: [...getColumnDef(scope, readOnly, hidePId)],
    rowBuffer: 100,
    getRowStyle: (params) => rowStyle(params, scope, false),
    suppressColumnVirtualisation: false,
    animateRows: false,
    suppressAnimationFrame: false,
    ...commonAgGridOption(height, email.toUpperCase()),
  };
}

const getColumnDef = (scope, readOnly, hidePId): ColDef[] => [
  ...logIconColumn(scope, true, false,false,true),
  {
    field: 'prodID',
    headerName: 'Product ID',
    headerTooltip: 'Unique ID of product',
    tooltipField: 'prodID',
    width: 100,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: hidePId,
    suppressKeyboardEvent: () => true
  },
  {
    field: 'unspscCode',
    headerName: 'UNSPSC Code',
    headerTooltip: 'Unique ID of Master Commodity / Level 4 UNSPSC',
    tooltipField: 'unspscCode',
    width: 130,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    cellRenderer: readOnly ? '' : 'inlineEdit',
    cellRendererParams: {
      cellRenderedFor: 'input',
      inputValidation: {
        maxLength: 8,
        minLength: 8,
        isNumber: true
      }
    },
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node, true);
    },
    suppressKeyboardEvent: () => true

  },
  {
    field: 'unspscDesc',
    headerName: 'UNSPSC Desc',
    headerTooltip: 'Description of Master Commodity / Level 4 UNSPSC',
    tooltipField: 'unspscDesc',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true
  },
  {
    field: 'unspscID',
    headerName: 'UNSPSC ID',
    headerTooltip: 'Internal ID of Master UNSPSC',
    tooltipField: 'unspscID',
    width: 125,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true,
    suppressKeyboardEvent: () => true
  },
  {
    field: 'unspscSource',
    headerName: 'UNSPSC Datasource',
    headerTooltip: 'Internal Source of UNSPSC assignment (HIDA / MANUAL) to product',
    tooltipField: 'unspscSource',
    width: 170,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: true
  },
  {
    field: 'unspscFlag',
    headerName: 'UNSPSC Flag',
    headerTooltip: 'UNSPSC Flag',
    tooltipField: 'unspscFlag',
    width: 130,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: true
  },
  {
    field: 'prodDesc',
    headerName: 'Product Description',
    headerTooltip: 'Description of product',
    tooltipField: 'prodDesc',
    width: 240,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    cellRenderer: readOnly ? '' : 'inlineEdit',
    cellRendererParams: {
      cellRenderedFor: 'autocomplete'
    },
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
    suppressKeyboardEvent: () => true,
    cellClass: (params) => {
      return (!params.data?.prodDesc && params.data?.isModified)
        ? 'required-cell-inline'
        : 'editable-cell-comment';
    },
  },
  {
    field: 'prodSKU',
    headerName: 'Product SKU',
    headerTooltip: 'Product SKU',
    tooltipField: 'prodSKU',
    width: 130,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    cellRenderer: readOnly ? '' : 'inlineEdit',
    cellRendererParams: {
      cellRenderedFor: 'autocomplete',
    },
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
    cellClass: (params) => {
      return (!params.data?.prodSKU && params.data?.isModified)
        ? 'required-cell-inline'
        : 'editable-cell-comment';
    },
  },
  {
    field: 'manfID',
    headerName: 'Child Manf ID',
    headerTooltip: 'ID of Master Child Manufacturer',
    tooltipField: 'manfID',
    width: 120,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true,
    suppressKeyboardEvent: () => true,

  },
  {
    field: 'manfName',
    headerName: 'Child Manufacturer Name',
    headerTooltip: 'Name of Master Child Manufacturer',
    tooltipField: 'manfName',
    width: 220,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    cellRenderer: readOnly ? '' : 'typeHeadEditor',
    cellEditorParams: {
      mappingOptions: [],
      typeHeadRenderFor: 'productManfMappingChild',
      onRecordsCreateClick: (node: any, typedText?: string) => {
        scope.openParentChildDialog(node, typedText);
      }
    },
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
    suppressKeyboardEvent: () => true,
    cellClass: (params) => {
      return (!params.value && params.data?.isModified)
        ? 'required-cell-inline'
        : 'editable-cell-comment';
    }
  },
  {
    field: 'manfDisplayName',
    headerName: 'Child Display Name',
    headerTooltip: 'Display Name of Master Child Manufacturer',
    tooltipField: 'manfDisplayName',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
  },
  {
    field: 'parentManfID',
    headerName: 'Parent Manf ID',
    headerTooltip: 'ID of Parent Manufacturer assigned to Child Manufacturer',
    tooltipField: 'parentManfID',
    width: 125,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true,
    suppressKeyboardEvent: () => true
  },
  {
    field: 'parentManfName',
    headerName: 'Parent Manf Name',
    headerTooltip: 'Name of Master Parent Manufacturer assigned to Master Child Manufacturer',
    tooltipField: 'parentManfName',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: true

  },
  {
    field: 'parentManfDisplayName',
    headerName: 'Parent Display Name',
    headerTooltip: 'Display Name of Master Parent Manufacturer assigned to Master Child Manufacturer',
    tooltipField: 'parentManfDisplayName',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
  },
  {
    field: 'topParentManfID',
    headerName: 'Top Parent Manf ID',
    headerTooltip: 'ID of Top Parent Master Manufacturer based on Master Manufacturer Parent Child relationship',
    tooltipField: 'topParentManfID',
    width: 150,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true,
    suppressKeyboardEvent: () => true,
  },
  {
    field: 'topParentManfName',
    headerName: 'Top Parent Manf Name',
    headerTooltip: 'Name of Top Parent Master Manufacturer based on Master Manufacturer Parent Child relationship',
    tooltipField: 'topParentManfName',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: true
  },
  {
    field: 'topParentManfDisplayName',
    headerName: 'Top Parent Display Name',
    headerTooltip: 'Display Name of Top Parent Master Manufacturer based on Master Manufacturer Parent Child relationship',
    tooltipField: 'topParentManfDisplayName',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    valueFormatter: (params) => params.value ? params.value : '-',

  },
  {
    field: 'prodRevenue',
    headerName: 'Revenue',
    headerTooltip: 'Product revenue based on the aggregated all time revenue of the underlying items',
    tooltipField: 'prodRevenue',
    width: 130,
    minWidth: 130,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    cellClass: 'text-right'
  },
  {
    field: 'comments',
    headerName: 'Comments',
    headerTooltip: 'User comments',
    tooltipField: 'comments',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    cellRenderer: readOnly ? '' : 'inlineEdit',
    suppressKeyboardEvent: () => true
  },
  {
    field: 'prodUNSPSCUpdatedBy',
    headerName: 'UNSPSC Updated By',
    headerTooltip: 'Who updated the product UNSPSC last ?',
    tooltipField: 'prodUNSPSCUpdatedBy',
    width: 175,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: false
  },
  {
    field: 'prodUNSPSCUpdatedDate',
    headerName: 'UNSPSC Updated Date',
    headerTooltip: 'When was the product UNSPSC last updated ?',
    tooltipField: 'prodUNSPSCUpdatedDate',
    width: 175,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: false
  },
  {
    field: 'unspscMarketID',
    headerName: 'Market ID',
    headerTooltip: 'ID assigned to Master Market',
    tooltipField: 'unspscMarketID',
    width: 200,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: true,
  },
  {
    field: 'unspscMarketName',
    headerName: 'Market Name',
    headerTooltip: 'Master Market Name',
    tooltipField: 'unspscMarketName',
    width: 200,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true,
  },
  {
    field: 'unspscSubmarketName',
    headerName: 'Submarket Name',
    headerTooltip: 'Master Submarket Name',
    tooltipField: 'unspscSubmarketName',
    width: 200,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true,
  },
  {
    field: 'brandname',
    headerName: 'Brand Name',
    headerTooltip: 'Name of Master Brand',
    // tooltipField: `${params.brandname.value}`,
    width: 189,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    cellRenderer: readOnly ? '' : 'typeHeadEditor',
    cellEditorParams: {
      mappingOptions: [],
      typeHeadRenderFor: 'brandMasterInlineForPIM'
    },
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
    suppressKeyboardEvent: () => true,
    cellClass: (params) => {
      return (!params.value && params.data?.isModified)
        ? 'required-cell-inline'
        : 'editable-cell-comment';
    }
  },
  {
    field: 'customFlag',
    headerName: 'Custom Flag',
    headerTooltip: 'Custom Flag',
    tooltipField: 'customFlag',
    width: 120,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: true

  },
  {
    field: 'privateFlag',
    headerName: 'Private Flag',
    headerTooltip: 'Private Flag',
    tooltipField: 'privateFlag',
    width: 120,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: true
  },
  {
    field: 'kptFlag',
    headerName: 'KPT Flag',
    headerTooltip: 'Kits, Packs, Trays Flag',
    tooltipField: 'kptFlag',
    width: 120,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: true
  },
  {
    field: 'checkedStatus',
    headerName: 'Checked Status',
    headerTooltip: 'Checked Status',
    tooltipField: 'checkedStatus',
    width: 130,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
  },
  {
    field: 'checkedOutUserName',
    headerName: 'Checked Out User Name',
    headerTooltip: '',
    tooltipField: 'checkedOutUserName',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
  },
  {
    field: 'checkedOutUserEmail',
    headerName: 'Checked Out User Email',
    headerTooltip: '',
    tooltipField: 'checkedOutUserEmail',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: true
  },
  {
    field: 'checkedOutDate',
    headerName: 'Checked Out Date',
    headerTooltip: '',
    tooltipField: 'checkedOutDate',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
  },
  {
    field: 'checkedInUserName',
    headerName: 'Checked In User Name',
    headerTooltip: '',
    tooltipField: 'checkedInUserName',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
  },
  {
    field: 'checkedInUserEmail',
    headerName: 'Checked In User Email',
    headerTooltip: '',
    tooltipField: 'checkedInUserEmail',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: true
  },
  {
    field: 'checkedInDate',
    headerName: 'Checked In Date',
    headerTooltip: '',
    tooltipField: 'checkedInDate',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
  },
  ...createUpdateColumn(true, ...helpTextDtColumns)
];

const helpTextDtColumns = ['Who created the product ?', 'When was the product created ?', 'Who updated the product last ?', 'When was the product last updated ?']

function brandValueGetter(params: any) {
  return params.node.data.brandname ? params.node.data.brandname.value.toString() : null;
}