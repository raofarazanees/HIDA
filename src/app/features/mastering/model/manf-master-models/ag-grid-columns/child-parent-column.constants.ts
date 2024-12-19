import { ColDef, GridOptions, IRichCellEditorParams } from 'ag-grid-community';
import { ISelectCellEditorParams } from 'ag-grid-community/dist/lib/rendering/cellEditors/selectCellEditor';
import { activeMappingData, cdxAgGridHeaderStyle, logIconColumn } from './parent-manf-column.constants';
import { rowStyle, commonAgGridOption } from './row-style.utils';
export const scopeDefaultValues: string[] = ['DEFAULT', 'SMALL MANUFACTURER'];

const GetChildGridColumns = (scope,readOnly): ColDef[] => [
  ...logIconColumn(scope,true,!readOnly),
  {
    field: 'childManfID',
    headerName: 'Child Manufacturer ID',
    headerTooltip: 'Unique ID of Master Child Manufacturer',
    tooltipField: 'childManfID',
    width: 165,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide:true
  },
  {
    field: 'childManfName',
    headerName: 'Child Manufacturer Name',
    headerTooltip: 'Name of Master Child Manufacturer',
    tooltipField: 'childManfName',
    width: 260,
    filter: true,
    editable: !readOnly,
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'childDisplayName',
    headerName: 'Child Display Name',
    headerTooltip: 'Display Name of Master Child Manufacturer',
    tooltipField: 'childDisplayName',
    width: 220,
    filter: true,
    editable: !readOnly,
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
    headerClass: cdxAgGridHeaderStyle,
    cellClass: (params) => {
      return ( !params.data?.childDisplayName && params.data?.isModified )
        ? 'required-cell' 
        :'editable-cell-comment';
    },
  },
  {
    field: 'parentManfID',
    headerName: 'Parent Manufacturer ID',
    headerTooltip: 'ID of Parent Manufacturer assigned to Child Manufacturer',
    tooltipField: 'parentManfID',
    width: 170,
    maxWidth: 170,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide:true
  },
  {
    field: 'parentManfName',
    headerName: 'Parent Manufacturer Name',
    headerTooltip: 'Name of Master Parent Manufacturer assigned to Master Child Manufacturer',
    tooltipField: 'parentManfName',
    width: 240,
    filter: true,
    editable: !readOnly,
    cellClass: 'typeahead-editable-cell',
    cellEditor: 'typeHeadEditor',
    cellEditorParams: {
      mappingOptions: scope.activeParentRecords,
      typeHeadRenderFor:'parentManfData'

    },
    cellRendererParams: (rowNode: any,text?:string) => {
      scope.openParentChildDialog(rowNode,text);
    },
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'parentDisplayName',
    headerName: 'Parent Display Name',
    headerTooltip: 'Display Name of Master Parent Manufacturer assigned to Master Child Manufacturer',
    tooltipField: 'parentDisplayName',
    width: 220,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide:true
  },
  {
    field: 'topParentManfID',
    headerName: 'Top Parent Manf ID',
    headerTooltip: 'ID of Top Parent Master Manufacturer based on Master Manufacturer Parent Child relationship',
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
    headerTooltip: 'Name of Top Parent Master Manufacturer based on Master Manufacturer Parent Child relationship',
    tooltipField: 'topParentManfName',
    width: 170,
    maxWidth: 170,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    valueFormatter: (params) => params.value ? params.value : '-',
  },
  {
    field: 'topParentDisplayName',
    headerName: 'Top Parent Display Name',
    headerTooltip: 'Display Name of Top Parent Master Manufacturer based on Master Manufacturer Parent Child relationship',
    tooltipField: 'topParentDisplayName',
    width: 220,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide:true
  },
  {
    field: 'blacklistFlag',
    headerName: 'Blacklist Flag',
    headerTooltip: 'Blacklist status of Master Child Manufacturer',
    tooltipField: 'blacklistFlag',
    maxWidth: 120,
    filter: true,
    editable: !readOnly,
    cellEditor: 'agSelectCellEditor',
    cellEditorPopup: false,
    cellEditorParams: {
      values: activeMappingData
    } as ISelectCellEditorParams,
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'childManfActive',
    headerName: 'Is Child Active ?',
    headerTooltip: 'Status of Master Child Manufacturer',
    tooltipField: 'childManfActive',
    maxWidth: 130,
    filter: true,
    editable: !readOnly,
    cellEditor: 'agSelectCellEditor',
    cellEditorPopup: false,
    cellEditorParams: {
      values: activeMappingData
    } as ISelectCellEditorParams,
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'childManfCreatedBy',
    headerName: 'Created By',
    headerTooltip: 'Who created the Master Child Manufacturer ?',
    tooltipField: 'childManfCreatedBy',
    width: 130,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'childManfCreatedDate',
    headerName: 'Created Date',
    headerTooltip: 'When was the Master Child Manufacturer created ?',
    tooltipField: 'childManfCreatedDate',
    width: 150,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'childManfUpdatedBy',
    headerName: 'Updated By',
    headerTooltip: 'Who updated the Master Child Manufacturer last ?',
    tooltipField: 'childManfUpdatedBy',
    width: 140,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'childManfUpdatedDate',
    headerName: 'Updated Date',
    headerTooltip: 'When was the Master Child Manufacturer last updated ?',
    tooltipField: 'childManfUpdatedDate',
    width: 160,
    filter: true,
    hide: true,
    headerClass: cdxAgGridHeaderStyle
  }
];

export function GetChildParentColumnAgGrid(height: any, scope, readOnly = false): GridOptions {
  return {
    columnDefs: [...GetChildGridColumns(scope,readOnly)],
    getRowStyle: (params) => rowStyle(params,scope),
    ...commonAgGridOption(),
  };
}
