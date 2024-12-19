import { ColDef, GridOptions } from 'ag-grid-community';
import { searchCriteriaInternal } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { cdxAgGridHeaderStyle, logIconColumn } from '../ag-grid-columns/parent-manf-column.constants';
import { CommonCreateUpdateOptions } from './common.search-options';
import { commonAgGridOption, rowStyle } from '../ag-grid-columns/row-style.utils';
import { createUpdateColumn } from '../ag-grid-columns/market-master.utils';

export const UnspscScopeValues: string[] = ['IN SCOPE', 'OTHER', ''];
export const DefaultYesNoValues: string[] = ['Y', 'N'];

export const ZipMasterFilterOptions = (): searchCriteriaInternal[] => [
  { columnLabel: 'Zip', columnName: 'zip', isSelected: false },
  { columnLabel: 'STATE_ABBR', columnName: 'stateAbbr', isSelected: false },
  { columnLabel: 'STATE_DISPLAY', columnName: 'stateDisplay', isSelected: false },
  { columnLabel: 'DISPLAY_NAME_2', columnName: 'displayName2', isSelected: false },
  ...CommonCreateUpdateOptions()
];

export function GetZipColumns(height: any, scope, readOnly = false): GridOptions {
  return {
    columnDefs: [...getColumnDef(scope,readOnly)],
    ...commonAgGridOption(height),
    getRowStyle: (params) => rowStyle(params, scope),
    suppressRowClickSelection:true,
    rowSelection:'multiple'

  };
}

const getColumnDef = (scope, readOnly:boolean): ColDef[] => [
  ...logIconColumn(scope,false,!readOnly),

  {

    field: 'zip',
    headerName: 'Zip',
    headerTooltip: 'Zip',
    tooltipField: 'zip',
    width: 140,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
  },
  {
    field: 'stateAbbr',
    headerName: 'STATE_ABBR',
    headerTooltip: 'STATE_ABBR',
    tooltipField: 'stateAbbr',
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
    field: 'stateDisplay',
    headerName: 'STATE_DISPLAY',
    headerTooltip: 'STATE_DISPLAY',
    tooltipField: 'stateDisplay',
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
    field: 'displayName2',
    headerName: 'DISPLAY_NAME_2',
    headerTooltip: 'DISPLAY_NAME_2',
    tooltipField: 'displayName2',
    width: 260,
    minWidth: 80,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    cellRenderer: readOnly ? '' : 'inlineEdit',
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
  },
  ...createUpdateColumn(false, ...helpTextForColumns)
];

const helpTextForColumns = ['Who created the Master Brand ?', 'When was the Master Brand created ?', 'Who updated the Master Brand last ?', 'When was the Master Brand last updated ?']
