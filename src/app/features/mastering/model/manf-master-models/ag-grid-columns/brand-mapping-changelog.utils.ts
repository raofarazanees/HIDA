import { ColDef, GridOptions } from 'ag-grid-community';
import { commonAgGridOption, rowStyle } from './row-style.utils';
import { cdxAgGridHeaderStyle, logIconColumn } from './parent-manf-column.constants';
import { createUpdateColumn } from './market-master.utils';

export function BrandMappingChangelogGridOptions(height: any, scope): GridOptions {
  return {
    columnDefs: [...BrandMappingColumn(scope)],
    getRowStyle: (params) => rowStyle(params, scope),
    ...commonAgGridOption()
  };
}

const BrandMappingColumn = (scope): ColDef[] => [
  {
    field: 'brandID',
    headerName: 'Brand ID',
    headerTooltip: 'ID of Master Brand',
    tooltipField: 'brandID',
    width: 100,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true,
    suppressKeyboardEvent: () => true
  },
  {
    field: 'brandname',
    headerName: 'Brand Name',
    headerTooltip: 'Name of Master Brand',
    tooltipField: 'brandname',
    width: 210,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true
  },
  {
    field: 'manfID',
    headerName: 'Child Manf ID',
    headerTooltip: 'ID of Master Child Manufacturer',
    tooltipField: 'manfID',
    width: 130,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true,
    suppressKeyboardEvent: () => true
  },
  {
    field: 'manfName',
    headerName: 'Child Manufacturer Name',
    headerTooltip: 'Name of Master Child Manufacturer',
    tooltipField: 'manfName',
    width: 220,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'childDisplayName',
    headerName: 'Child Display Name',
    headerTooltip: 'Display Name of Master Child Manufacturer',
    tooltipField: 'childDisplayName',
    width: 220,
    filter: true,
    hide:true,
    headerClass: cdxAgGridHeaderStyle,
  },
  {
    field: 'parentManfID',
    headerName: 'Parent Manf ID',
    headerTooltip: 'ID of Parent Manufacturer assigned to Child Manufacturer',
    tooltipField: 'parentManfID',
    width: 140  ,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true,
    suppressKeyboardEvent: () => true
  },
  {
    field: 'parentManfName',
    headerName: 'Parent Manf Name',
    headerTooltip: 'Name of Master Parent Manufacturer assigned to Master Child Manufacturer',
    tooltipField: 'parentManfName',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide:true,
  },
  {
    field: 'parentDisplayName',
    headerName: 'Parent Display Name',
    headerTooltip: 'Display Name of Master Parent Manufacturer assigned to Master Child Manufacturer',
    tooltipField: 'parentDisplayName',
    width: 220,
    filter: true,
    hide:true,
    headerClass: cdxAgGridHeaderStyle,
  },
  {
    field: 'topParentManfID',
    headerName: 'Top Parent Manf ID',
    headerTooltip: 'ID of Top Parent Master Manufacturer based on Master Manufacturer Parent Child relationship',
    tooltipField: 'topParentManfID',
    width: 155,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true,
    suppressKeyboardEvent: () => true,
    
  },
  {
    field: 'topParentManfName',
    headerName: 'Top Parent Manf Name',
    headerTooltip: 'Name of Top Parent Master Manufacturer based on Master Manufacturer Parent Child relationship',
    tooltipField: 'topParentManfName',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide:true,
  },
  {
    field: 'topParentDisplayName',
    headerName: 'Top Parent Display Name',
    headerTooltip: 'Display Name of Top Parent Master Manufacturer based on Master Manufacturer Parent Child relationship',
    tooltipField: 'topParentDisplayName',
    width: 220,
    filter: true,
    hide:true,
    headerClass: cdxAgGridHeaderStyle,
  },
  {
    field: 'marketID',
    headerName: 'Market ID',
    headerTooltip: 'ID assigned to Master Market',
    tooltipField: 'marketID',
    width: 100,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true,
    suppressKeyboardEvent: () => true
  },
  {
    field: 'marketName',
    headerName: 'Market Name',
    headerTooltip: 'Master Market Name',
    tooltipField: 'marketName',
    width: 180,
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
    headerClass: cdxAgGridHeaderStyle,
    hide:true
  },
  {
    field: 'isBrandMapActive',
    headerName: 'Is Map Active?',
    tooltipField: 'isBrandMapActive',
    headerTooltip:'Current Status of Brand Mapping',
    width: 120,
    minWidth: 80,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'brandMapActiveFlag',
    headerName: 'Is Active?',
    tooltipField: 'brandMapActiveFlag',
    headerTooltip:'Status of Brand Mapping',
    width: 120,
    minWidth: 80,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'comments',
    headerName: 'Comments',
    headerTooltip: 'Comments entered as part of Brand Mapping',
    tooltipField: 'comments',
    width: 140,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  { field: 'createdBy', headerName: 'Updated By (Effective)',headerTooltip:'Who created the Brand Mapping ?', tooltipField: 'createdBy', width: 180, filter: true,headerClass: cdxAgGridHeaderStyle },
  { field: 'brandMapEffectiveDate', headerName: 'Updated When (Effective)',headerTooltip:'When was the Brand Mapping updated ?', tooltipField: 'prodEffectiveDate', width: 190, filter: true,headerClass: cdxAgGridHeaderStyle },
  { field: 'updatedBy', headerName: 'Updated By (End)',headerTooltip:'Who updated the Brand Mapping ?', tooltipField: 'updatedBy', width: 180, filter: true,headerClass: cdxAgGridHeaderStyle },
  { field: 'brandMapEndDate', headerName: 'Updated When (End)',headerTooltip:'', tooltipField: 'prodEndDate', width: 180, filter: true,headerClass: cdxAgGridHeaderStyle },
];
