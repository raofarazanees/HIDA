import { ColDef, GridOptions } from 'ag-grid-community';
import { cdxAgGridHeaderStyle } from './parent-manf-column.constants';
import { commonAgGridOption, rowStyle } from './row-style.utils';

export function GetMarketChangelogColumn(height: any): GridOptions {
  return {
    columnDefs: [...getColumnDef()],
    getRowStyle: (params) => rowStyle(params),
    ...commonAgGridOption(),
  };
}

const getColumnDef = (): ColDef[] => [
  {
    field: 'marketName',
    headerName: 'Market Name',
    headerTooltip: 'Master Market Name',
    tooltipField: 'marketName',
    width: 210,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'submarketName',
    headerName: 'Submarket Name',
    headerTooltip: 'Master Submarket Name',
    tooltipField: 'submarketName',
    width: 220,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'active',
    headerName: 'Is Market Active ?',
    headerTooltip: 'Status of Master Market',
    tooltipField: 'active',
    width: 130,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'marketActiveFlag',
    headerName: 'Is Active ?',
    headerTooltip: 'Status of Master Market',
    tooltipField: 'marketActiveFlag',
    width: 110,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'createdBy',
    headerName: 'Updated By (Effective)',
    tooltipField: 'createdBy',
    headerTooltip:'Who created the Master Market ?',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
  },
  {
    field: 'marketEffectiveDate',
    headerName: 'Updated When (Effective)',
    tooltipField: 'marketEffectiveDate',
    headerTooltip: 'When was the Master Market last updated ?',
    width: 140,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'updatedBy',
    headerName: 'Updated By (End)',
    tooltipField: 'updatedBy',
    headerTooltip: 'Who updated the Master Market last ?',

    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
  },
  {
    field: 'marketEndDate',
    headerName: 'Updated When (End)',
    headerTooltip: 'Updated When (End)',
    tooltipField: 'marketEndDate',
    width: 120,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  }
];
