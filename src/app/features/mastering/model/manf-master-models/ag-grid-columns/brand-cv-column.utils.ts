import { ColDef, GridOptions } from "ag-grid-community";
import { commonAgGridOption, rowStyle } from "./row-style.utils";
import { logIconColumn, cdxAgGridHeaderStyle, activeMappingData } from "./parent-manf-column.constants";
import { createUpdateColumn } from "./market-master.utils";
import { ISelectCellEditorParams } from "ag-grid-community/dist/lib/rendering/cellEditors/selectCellEditor";

export function BrandCVGridOptions(height: any, scope, readOnly = false): GridOptions {
  return {
    columnDefs: [...ForBrandCvColumn(scope, readOnly)],
    stopEditingWhenCellsLoseFocus: true,
    getRowStyle: (params) => rowStyle(params, scope),
    ...commonAgGridOption(),
  };
}

const ForBrandCvColumn = (scope, readOnly): ColDef[] => [
  ...logIconColumn(scope, false, !readOnly),
  {
    field: 'pmanfname',
    headerName: 'Parent Manufacturer',
    headerTooltip: 'Name of Master Parent Manufacturer assigned to Master Child Manufacturer',
    tooltipField: 'pmanfname',
    width: 350,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true
  },
  {
    field: 'manfname',
    headerName: 'Manf Name',
    headerTooltip: 'Name of Master Child Manufacturer',
    tooltipField: 'manfname',
    width: 260,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true
  },
  {
    field: 'brandID',
    headerName: 'Brand ID',
    tooltipField: 'brandID',
    headerTooltip: 'Unique ID assigned to Master Brand',
    width: 100,
    minWidth: 80,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true
  },
  {
    field: 'brandname',
    headerName: 'Brand Name',
    tooltipField: 'brandname',
    headerTooltip: 'Master Brand Name',
    width: 260,
    minWidth: 80,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    cellRenderer: readOnly ? '' : 'inlineEdit',
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
  },
  {
    field: 'brandsource',
    headerName: 'Source',
    tooltipField: 'brandsource',
    headerTooltip: 'brandsource',
    width: 260,
    minWidth: 80,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    cellRenderer: readOnly ? '' : 'typeHeadEditor',
    cellEditorParams: {
      mappingOptions: [],
      typeHeadRenderFor: 'source',
    },
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
    cellClass: (params) => {
      return (!params.value && params.data?.isModified)
        ? 'required-cell-inline'
        : 'editable-cell-comment';
    },
    suppressKeyboardEvent: () => true
  },
  {
    field: 'brandfamily',
    headerName: 'Brand Family',
    tooltipField: 'brandfamily',
    headerTooltip: 'Brand Family',
    width: 260,
    minWidth: 80,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    cellRenderer: readOnly ? '' : 'inlineEdit',
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
  },
  {
    field: 'brandmodel',
    headerName: 'Brand Model',
    tooltipField: 'brandmodel',
    headerTooltip: 'Brand Model',
    width: 260,
    minWidth: 80,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    cellRenderer: readOnly ? '' : 'inlineEdit',
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
  },
  {
    field: 'brandfilter',
    headerName: 'Additional Brand Filter?',
    tooltipField: 'brandfilter',
    headerTooltip: 'Additional Brand Filter',
    width: 400,
    minWidth: 80,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    cellRenderer: readOnly ? '' : 'inlineEdit',
    cellRendererParams: {
      cellRenderedFor: 'select',
      cellForYesNo: true,
    },
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
    suppressKeyboardEvent: () => true
  },
  {
    field: 'manfasbrand',
    headerName: 'Manf as Brand?',
    tooltipField: 'manfasbrand',
    headerTooltip: 'Manf as Brand',
    width: 280,
    minWidth: 80,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    cellRenderer: readOnly ? '' : 'inlineEdit',
    cellRendererParams: {
      cellRenderedFor: 'select',
      cellForYesNo: true,
    },
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
    suppressKeyboardEvent: () => true
  },
  {
    field: 'rejectedFlag',
    headerName: 'Rejected?',
    tooltipField: 'rejectedFlag',
    headerTooltip: 'Rejected',
    width: 280,
    minWidth: 80,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    cellRenderer: readOnly ? '' : 'inlineEdit',
    cellRendererParams: {
      cellRenderedFor: 'select',
      cellForYesNo: true,
    },
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
    suppressKeyboardEvent: () => true
  },
  //   {
  //     field: 'active',
  //     headerName: 'Is Brand Active ?',
  //     tooltipField: 'active',
  //     headerTooltip:'Status of Master Brand',
  //     width: 180,
  //     minWidth:80,
  //     filter: true,
  //     headerClass: cdxAgGridHeaderStyle,
  //     editable: !readOnly,
  //     cellEditor: readOnly ? '' : 'agSelectCellEditor',
  //     cellEditorPopup: false,
  //     cellEditorParams: {
  //       values: activeMappingData
  //     } as ISelectCellEditorParams,
  //     onCellValueChanged: (rowNode: any): void => {
  //       scope.updateValue(rowNode.node);
  //     },
  //   },
  ...createUpdateColumn(false, ...helpTextForColumns)

]

const helpTextForColumns = ['Who created the Master Brand ?', 'When was the Master Brand created ?', 'Who updated the Master Brand last ?', 'When was the Master Brand last updated ?']