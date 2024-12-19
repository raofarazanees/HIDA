import { GridOptions, ColDef } from "ag-grid-community";
import { activeMappingData, cdxAgGridHeaderStyle, logIconColumn } from "./parent-manf-column.constants";
import { ISelectCellEditorParams } from "ag-grid-community/dist/lib/rendering/cellEditors/selectCellEditor";
import { rowStyle, commonAgGridOption } from "./row-style.utils";


export const createUpdateColumn = (isHide = false,...helpText): ColDef[] => [
  { field: 'createdBy', headerName: 'Created By', headerTooltip:helpText[0], tooltipField: 'createdBy', width: 160, filter: true, headerClass: cdxAgGridHeaderStyle,hide:isHide },
  {
    field: 'createdDate',
    headerName: 'Created Date',
    tooltipField: 'createdDate',
    headerTooltip:helpText[1],
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide:isHide
  },
  { field: 'updatedBy', headerName: 'Updated By',headerTooltip:helpText[2], tooltipField: 'updatedBy', width: 160, filter: true, headerClass: cdxAgGridHeaderStyle,hide:isHide },
  {
    field: 'updatedDate',
    headerName: 'Updated Date',
    tooltipField: 'updatedDate',
    width: 160,
    filter: true,
    headerTooltip:helpText[3],
    headerClass: cdxAgGridHeaderStyle,
    hide:isHide
  }
];


export function GetMarketMaster(height: any, scope, readOnly = false): GridOptions {
    return {
      columnDefs: [...getColumnDef(scope,readOnly)],
      getRowStyle: (params) => rowStyle(params,scope),
      ...commonAgGridOption(),
    };
  }
  
const getColumnDef = (scope,readOnly): ColDef[] => [
  ...logIconColumn(scope,true,!readOnly),
    {
      field: 'marketID',
      headerName: 'Market ID',
      headerTooltip: 'Unique ID assigned to Master Market',
      tooltipField: 'marketID',
      width: 100,
      filter: true,
      headerClass: cdxAgGridHeaderStyle,
    },
    {
      field: 'marketName',
      headerName: 'Market Name',
      headerTooltip: 'Master Market Name',
      tooltipField: 'marketName',
      width: 240,
      filter: true,
      headerClass: cdxAgGridHeaderStyle,
      editable:!readOnly,
      onCellValueChanged: (rowNode: any): void => {
        scope.updateValue(rowNode.node);
      },
      cellClass: (params) => {
        return ( !params?.data.marketName)
          ? 'required-cell' 
          :'editable-cell-comment';
      },
    },
      {
        field: 'submarketName',
        headerName: 'Submarket Name',
        headerTooltip: 'Master Submarket Name',
        tooltipField: 'submarketName',
        width: 220,
        filter: true,
        headerClass: cdxAgGridHeaderStyle,
        editable:!readOnly,
        onCellValueChanged: (rowNode: any): void => {
          scope.updateValue(rowNode.node);
        },
        cellClass: (params) => {
          return ( !params?.data.submarketName)
            ? 'required-cell' 
            :'editable-cell-comment';
        },
      },
      {
        field: 'active',
        headerName: 'Is Market Active ?',
        headerTooltip: 'Status of Master Market',
        tooltipField: 'active',
        width: 110,
        filter: true,
        headerClass: cdxAgGridHeaderStyle,
        editable: !readOnly,
        cellEditor: 'agSelectCellEditor',
        cellEditorPopup: false,
        cellEditorParams: {
          values: activeMappingData
        } as ISelectCellEditorParams,
        onCellValueChanged: (rowNode: any): void => {
          scope.updateValue(rowNode.node);
        },
      },
      ...createUpdateColumn(true,...helpTextForDate)
]

const helpTextForDate = ['Who created the Master Market ?','When was the Master Market created ?','Who updated the Master Market last ?','When was the Master Market last updated ?']