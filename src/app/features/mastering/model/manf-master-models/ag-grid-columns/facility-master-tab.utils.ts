import { ColDef, GridOptions, IRichCellEditorParams } from 'ag-grid-community';
import { ISelectCellEditorParams } from 'ag-grid-community/dist/lib/rendering/cellEditors/selectCellEditor';
import { createUpdateColumn } from './market-master.utils';
import { commonAgGridOption, rowStyle } from './row-style.utils';
import { logIconColumn } from './parent-manf-column.constants';
export const activeMappingData: string[] = ['Y', 'N'];
export const cdxAgGridHeaderStyle = 'ag-cdx-header';
// export const logIconColumn = (scope,isLogShow = true): ColDef[] => [
//   {
//     headerName: 'Action',
//     cellRenderer: 'actionCellRenderer',
//     pinned: 'left',
//     headerClass: cdxAgGridHeaderStyle,
//     cellRendererParams: {
//       isExceptionLead: isLogShow,
//       onLogClick: (node: any) => {
//         scope.openLogDialog(node);
//       },
//       onEditClick: (node: any) => {
//         scope.OnEditIconsClicked(node);
//       }
//     },
//     width: 80,
//     maxWidth: 80,
//     minWidth:80,
//     sortable: false,
//     filter: false,
//     resizable: false
//   }
// ];

//  ...logIconColumn(scope),

const ForFacilityMasterColumns = (scope,readOnly): ColDef[] => [
  ...logIconColumn(scope,true,!readOnly),
  {
    field: 'facilityID',
    headerName: 'Facility ID',
    tooltipField: 'facilityID',
    headerTooltip:'Unique ID assigned to Master Facility',
    width: 100,
    minWidth:80,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'facilitySubgroupName',
    headerName: 'Facility Subgroup Name',
    tooltipField: 'facilitySubgroupName',
    headerTooltip:'Master Subgroup Name',
    minWidth: 260,
    filter: true,
    editable: !readOnly,
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'facilityGroupName',
    headerName: 'Facility Group Name',
    tooltipField: 'facilityGroupName',
    headerTooltip:'Master Group Name',
    minWidth: 280,
    filter: true,
    editable: !readOnly,
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'active',
    headerName: 'Is Facility Active ?',
    tooltipField: 'active',
    headerTooltip:'Status of Master Facility',
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
  ...createUpdateColumn(false,...helpTextDtColumns)
];

const helpTextDtColumns = ['Who created the Master Facility ?','When was the Master Facility created ?','Who updated the Master Facility last ?','When was the Master Facility last updated ?']

export function GetFacilityColumnOptions(height: any, scope, readOnly = false): GridOptions {
  return {
    columnDefs: [...ForFacilityMasterColumns(scope,readOnly)],
    stopEditingWhenCellsLoseFocus:true,
    getRowStyle: (params) => rowStyle(params, scope),
    ...commonAgGridOption(),
  };
}


export function GetFacilityColumnOptionsChangeLog(height: any): GridOptions {
  return {
    columnDefs: [...ForFacilityMasterColumnsChangeLog()],
    stopEditingWhenCellsLoseFocus:true,
    getRowStyle: (params) => rowStyle(params),
    ...commonAgGridOption(),
  };
}

const ForFacilityMasterColumnsChangeLog = (): ColDef[] => [
  {
    field: 'facilityID',
    headerName: 'Facility ID',
    tooltipField: 'facilityID',
    headerTooltip:'Unique ID assigned to Master Facility',
    width: 100,
    minWidth:80,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide:true
  },
  {
    field: 'facilitySubgroupName',
    headerName: 'Facility Subgroup Name',
    tooltipField: 'facilitySubgroupName',
    headerTooltip:'Master Subgroup Name',
    minWidth: 260,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'facilityGroupName',
    headerName: 'Facility Group Name',
    tooltipField: 'facilityGroupName',
    headerTooltip:'Master Group Name',
    minWidth: 280,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
   {
    field: 'active',
    headerName: 'Is Facility Active ?',
    tooltipField: 'active',
    headerTooltip:'Current Status of Master Facility',
    minWidth: 120,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'facilityActiveFlag',
    headerName: 'Is Active ?',
    tooltipField: 'facilityActiveFlag',
    headerTooltip:'Status of Master Facility',
    minWidth: 120,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'createdBy',
    headerName: 'Updated By (Effective)',
    tooltipField: 'createdBy',
    headerTooltip:'Who created the Master Facility ?',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'facilityEffectiveDate',
    headerName: 'Updated When (Effective)',
    tooltipField: 'facilityEffectiveDate',
    headerTooltip: 'When was the Master Facility updated ?',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'updatedBy',
    headerName: 'Updated By (End)',
    tooltipField: 'updatedBy',
    headerTooltip: 'Who updated the Master Facility ?',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'facilityEndDate',
    headerName: 'Updated When (End)',
    headerTooltip: 'Updated When (End)',
    tooltipField: 'facilityEndDate',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  }
]