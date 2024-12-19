import { ColDef, GridOptions } from 'ag-grid-community';
import { cdxAgGridHeaderStyle } from './parent-manf-column.constants';
import { rowStyle, commonAgGridOption } from './row-style.utils';

export function GetZipChangelogColumn(height: any): GridOptions {
    return {
      columnDefs: [...getColumnDef()],
      getRowStyle: (params) => rowStyle(params),
      ...commonAgGridOption(),
    };
  }
  
const getColumnDef = (): ColDef[] => [
  {
    field: 'zip',
    headerName: 'Zip Code',
    headerTooltip: 'Zip Code',
    tooltipField: 'zip',
    width: 120,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'stateAbbr',
    headerName: 'STATE_ABBR',
    headerTooltip: 'STATE_ABBR',
    tooltipField: 'stateAbbr',
    width: 90,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },  
  {
    field: 'stateDisplay',
    headerName: 'STATE_DISPLAY',
    headerTooltip: 'STATE_DISPLAY',
    tooltipField: 'stateDisplay',
    width: 160,
    minWidth: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'displayName2',
    headerName: 'DISPLAY_NAME_2',
    headerTooltip: 'DISPLAY_NAME_2',
    tooltipField: 'displayName2',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'createdBy',
    headerName: 'Updated By (Effective)',
    tooltipField: 'createdBy',
    headerTooltip:'Who created the Master Brand ?',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'effectiveDate',
    headerName: 'Updated When (Effective)',
    tooltipField: 'effectiveDate',
    headerTooltip: 'When was the Master Brand updated ?',
    width: 140,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'updatedBy',
    headerName: 'Updated By (End)',
    tooltipField: 'updatedBy',
    headerTooltip:'Who updated the Master Brand ?',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'endDate',
    headerName: 'Updated When (End)',
    headerTooltip: 'Updated When (End)',
    tooltipField: 'endDate',
    width: 140,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  }
];
