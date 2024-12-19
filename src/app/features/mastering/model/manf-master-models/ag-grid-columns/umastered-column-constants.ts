import { ColDef, GridOptions } from 'ag-grid-community';
import { cdxAgGridHeaderStyle, logIconColumn } from './parent-manf-column.constants';
import { rowStyle, commonAgGridOption } from './row-style.utils';

const getColumnDef = (scope,readOnly): ColDef[] => [
  {
    field: 'manfPGUID',
    headerName: 'Manufacturer PGUID',
    headerTooltip: 'Unique ID of External Manufacturer',
    tooltipField: 'manfPGUID',
    width: 165,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide:true
  },
  {
    field: 'distPGUID',
    headerName: 'Distributor PGUID',
    headerTooltip: 'Unique ID of Distributor',
    tooltipField: 'distPGUID',
    width: 150,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide:true
  },
  {
    field: 'distName',
    headerName: 'Distributor Name',
    headerTooltip: 'Name of Distributor',
    tooltipField: 'distName',
    width: 145,
    maxWidth: 145,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'extManfKey',
    headerName: 'External Manf Key',
    headerTooltip: 'External Manufacturer Key from Distributor',
    tooltipField: 'extManfKey',
    width: 170,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'extManfDesc',
    headerName: 'External Manf Desc',
    headerTooltip: 'External Manufacturer Description from Distributor',
    tooltipField: 'extManfDesc',
    width: 200,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'revenue',
    headerName: 'Revenue',
    headerTooltip: 'Aggregated all time revenue across items belonging to External Manufacturer',
    tooltipField: 'revenue',
    width: 130,
    minWidth:130,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    cellClass:'text-right'
  },
  {
    field: 'manufacturer_mapping',
    headerName: 'Child Manufacturer Name',
    headerTooltip: 'Name of Master Child Manufacturer',
    tooltipField: 'manufacturer_mapping',
    editable: !readOnly,
    cellClass: 'typeahead-editable-cell',
    cellEditor: 'typeHeadEditor',
    cellEditorParams: {
      mappingOptions: scope.activeParentRecords,
      typeHeadRenderFor:'manfMappingChild'

    },
    cellRendererParams: (rowNode: any,text?:string) => {
      scope.openParentChildDialog(rowNode,text);
    },
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
    valueFormatter: (params) => params.value ? params.value : '-',
    width: 250,
    minWidth:250,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'childDisplayName',
    headerName: 'Child Display Name',
    headerTooltip: 'Display Name of Master Child Manufacturer',
    tooltipField: 'childDisplayName',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    valueFormatter: (params) => params.value ? params.value : '-',
  },
  {
    field: 'parentManfID',
    headerName: 'Parent Manf ID',
    headerTooltip: 'ID of Master Parent Manufacturer',
    tooltipField: 'parManfID',
    width: 120,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide:true
  },
  {
    field: 'parentManfName',
    headerName: 'Parent Manf Name',
    headerTooltip: 'Name of Master Parent Manufacturer',
    tooltipField: 'parentManfName',
    width: 170,
    maxWidth: 170,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    valueFormatter: (params) => params.value ? params.value : '-',
    hide:true
  },
  {
    field: 'parentDisplayName',
    headerName: 'Parent Display Name',
    headerTooltip: 'Display Name of Master Parent Manufacturer',
    tooltipField: 'parentDisplayName',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    valueFormatter: (params) => params.value ? params.value : '-',
    hide:true
  },
  {
    field: 'topParentManfID',
    headerName: 'Top Parent Manf ID',
    headerTooltip: 'ID of Top Parent Master Manufacturer',
    tooltipField: 'topParentManfID',
    width: 150,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    valueFormatter: (params) => params.value ? params.value : '-',
    hide:true
  },
  {
    field: 'topParentManfName',
    headerName: 'Top Parent Manf Name',
    headerTooltip: 'Name of Top Parent Master Manufacturer',
    tooltipField: 'topParentManfName',
    width: 170,
    maxWidth: 170,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    valueFormatter: (params) => params.value ? params.value : '-',
    hide:true
  },
  {
    field: 'topDisplayName',
    headerName: 'Top Parent Display Name',
    headerTooltip: 'Display Name of Top Parent Master Manufacturer',
    tooltipField: 'topDisplayName',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    valueFormatter: (params) => params.value ? params.value : '-',
    hide:true
  },
  {
    field: 'comments',
    headerName: 'Comments',
    headerTooltip: 'Comments entered as part of mapping External Manufacturer Description to Master Child Manufacturer Name',
    tooltipField: 'extManfCreatedDate',
    width: 180,
    minWidth:180,
    filter: true,
    editable: !readOnly,
    // cellClass: (params) => {
    //   return !params?.data.manufacturer_mapping
    //     ?  'editable-cell-comment' 
    //     :'required-cell';
    // },
    valueFormatter: (params) => params.value ? params.value : '-',
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'extManfCreatedDate',
    headerName: 'Ext Created Date',
    headerTooltip: 'When was the External Manufacturer created in the system ?',
    tooltipField: 'extManfCreatedDate',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'extManfUpdatedDate',
    headerName: 'Ext Updated Date',
    headerTooltip: 'When was the External Manufacturer last updated in the system ?',
    tooltipField: 'extManfUpdatedDate',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  }
];
export function GetUmMasteredColumn(height: any, scope, readOnly = false): GridOptions {
  return {
    columnDefs: [...getColumnDef(scope,readOnly)],
    getRowStyle: (params) => rowStyle(params,scope),
    ...commonAgGridOption(),
  };
}