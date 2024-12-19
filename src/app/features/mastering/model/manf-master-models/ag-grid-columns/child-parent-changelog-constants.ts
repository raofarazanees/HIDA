import { ColDef, GridOptions } from 'ag-grid-community';
import { cdxAgGridHeaderStyle } from './parent-manf-column.constants';
import { rowStyle, commonAgGridOption } from './row-style.utils';

const ForChildChangeLogColumn = (): ColDef[] => [
  {
    field: 'childManfName',
    headerName: 'Child Manufacturer Name',
    tooltipField: 'childManfName',
    headerTooltip: 'Name of Master Child Manufacturer',
    width: 260,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'childDisplayName',
    headerName: 'Child Display Name',
    tooltipField: 'childDisplayName',
    headerTooltip: 'Display Name of Master Child Manufacturer',
    width: 260,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'parentManfID',
    headerName: 'Parent Manufacturer ID',
    headerTooltip: 'ID of Parent Manufacturer assigned to Child Manufacturer',
    tooltipField: 'parentManfName',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide:true
  },
  {
    field: 'parentManfName',
    headerName: 'Parent Manufacturer Name',
    headerTooltip: 'Name of Master Parent Manufacturer assigned to Master Child Manufacturer',
    tooltipField: 'parentManfName',
    width: 260,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'blacklistFlag',
    headerName: 'Blacklist Flag',
    headerTooltip:'Blacklist status of Master Child Manufacturer',
    tooltipField: 'blacklistFlag',
    maxWidth: 140,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'childManfActive',
    headerName: 'Is Child Active ?',
    headerTooltip: 'Status of Master Child Manufacturer',
    tooltipField: 'childManfActive',
    maxWidth: 130,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'childManfActiveFlag',
    headerName: 'Is Active ?',
    tooltipField: 'childManfActiveFlag',
    headerTooltip:'Previous Status of Master Child Manufacturer',
    maxWidth: 130,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'childManfCreatedBy',
    headerName: 'Updated By (Effective)',
    tooltipField: 'childManfCreatedBy',
    headerTooltip:'Who created the Master Child Manufacturer ?',
    width: 190,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'childManfEffectiveDate',
    headerName: 'Updated When (Effective)',
    headerTooltip:'When was the Master Child Manufacturer updated ?',
    tooltipField: 'childManfEffectiveDate',
    width: 190,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'childManfUpdatedBy',
    headerName: 'Updated By (End)',
    tooltipField: 'childManfUpdatedBy',
    headerTooltip:'Who updated the Child Parent Manufacturer ?',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'childManfEndDate',
    headerName: 'Updated When (End)',
    headerTooltip: 'Updated When (End)',
    tooltipField: 'childManfEndDate',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  }
];

export function GetChildManfChangeLogGridOption(height: any): GridOptions {
  return {
    columnDefs: [...ForChildChangeLogColumn()],
    getRowStyle: (params) => rowStyle(params),
    ...commonAgGridOption(),
  };
}
