import { ColDef, GridOptions, IRichCellEditorParams } from 'ag-grid-community';
import { ISelectCellEditorParams } from 'ag-grid-community/dist/lib/rendering/cellEditors/selectCellEditor';
import { rowStyle, commonAgGridOption } from './row-style.utils';
export const activeMappingData: string[] = ['Y', 'N'];
export const cdxAgGridHeaderStyle = 'ag-cdx-header';
export const logIconColumn = (scope, isLogShow = true, isEdit = true, isForAll = false, isPIMScreen = false): ColDef[] => [
  {
    headerName: 'Action',
    cellRenderer: 'actionCellRenderer',
    pinned: 'left',
    headerClass: cdxAgGridHeaderStyle,
    cellRendererParams: {
      isExceptionLead: isLogShow,
      isEditEnabled: isEdit,
      isPIMScreen : isPIMScreen,
      isActionRenderForAllRecords: isForAll,
      onLogClick: (node: any) => {
        scope.openLogDialog(node);
      },
      onEditClick: (node: any) => {
        scope.OnEditIconsClicked(node);
      },
      onI2PClick:  (node: any) => {
        scope.openI2PDetails(node);
      },
    },
    width: 80,
    maxWidth: 80,
    minWidth: 80,
    sortable: false,
    filter: false,
    resizable: false
  }
];

const ForParentColumns = (scope, readOnly: boolean): ColDef[] => [
  ...logIconColumn(scope, true, !readOnly),
  {
    field: 'parentManfID',
    headerName: 'Parent Manufacturer ID',
    tooltipField: 'parentManfID',
    headerTooltip: 'Unique ID assigned to Master Parent Manufacturer',
    width: 170,
    maxWidth: 170,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'parentManfName',
    headerName: 'Parent Manufacturer Name',
    tooltipField: 'parentManfName',
    headerTooltip: 'Name of Master Parent Manufacturer',
    minWidth: 300,
    filter: true,
    editable: !readOnly,
    // cellRenderer: 'inlineEdit',
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'active',
    headerName: 'Is Parent Active ?',
    tooltipField: 'active',
    headerTooltip: 'Status of Master Parent Manufacturer',
    width: 160,
    maxWidth: 160,
    filter: true,
    editable: !readOnly,
    cellEditor: 'agSelectCellEditor',
    cellEditorPopup: false,
    //  cellRenderer: 'inlineEdit',
    cellEditorParams: {
      values: activeMappingData
    } as ISelectCellEditorParams,
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'createdBy',
    headerTooltip: 'Who created the Master Parent Manufacturer ?',
    headerName: 'Created By',
    tooltipField: 'createdBy',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'createdDate',
    headerName: 'Created Date',
    tooltipField: 'createdDate',
    headerTooltip: 'When was the Master Parent Manufacturer created ?',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'updatedBy',
    headerTooltip: 'Who updated the Master Parent Manufacturer last ?',
    headerName: 'Updated By',
    tooltipField: 'updatedBy',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'updatedDate',
    headerName: 'Updated Date',
    tooltipField: 'updatedDate',
    headerTooltip: 'When was the Master Parent Manufacturer last updated ?',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  }
];

export function GetParentColumnOptions(height: any, scope, readOnly = false): GridOptions {
  console.log(readOnly);
  return {
    columnDefs: [...ForParentColumns(scope, readOnly)],
    stopEditingWhenCellsLoseFocus: true,
    getRowStyle: (params) => rowStyle(params, scope),
    ...commonAgGridOption()
  };
}
