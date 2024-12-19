import { ColDef, GridOptions } from 'ag-grid-community';
import { cdxAgGridHeaderStyle } from './parent-manf-column.constants';
import { rowStyle, commonAgGridOption } from './row-style.utils';

export function GetUnspscChangelogColumn(height: any): GridOptions {
    return {
      columnDefs: [...getColumnDef()],
      getRowStyle: (params) => rowStyle(params),
      ...commonAgGridOption(),
    };
  }
  
const getColumnDef = (): ColDef[] => [
  {
    field: 'unspscCode',
    headerName: 'UNSPSC Code',
    headerTooltip: 'Unique Commodity Code / Level 4 UNSPSC',
    tooltipField: 'unspscCode',
    width: 120,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide:true
  },
  {
    field: 'marketID',
    headerName: 'Market ID',
    headerTooltip: 'ID of Master Market assigned to Master UNSPSC',
    tooltipField: 'marketID',
    width: 90,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true
  },  
  {
    field: 'marketName',
    headerName: 'Market Name',
    headerTooltip: 'Market Name of Master Market assigned to Master UNSPSC',
    tooltipField: 'marketName',
    width: 160,
    minWidth: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'submarketName',
    headerName: 'Submarket Name',
    headerTooltip: 'Submarket Name of Master Market assigned to Master UNSPSC',
    tooltipField: 'submarketName',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide:true
  },
  {
    field: 'unspscActiveFlag',
    headerName: 'Is UNSPSC Active ?',
    headerTooltip: 'Status of UNSPSC Code',
    tooltipField: 'unspscActiveFlag',
    width: 155,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'unspscScope',
    headerName: 'Extrapolation Scope',
    headerTooltip: 'Extrapolation Scope',
    tooltipField: 'unspscScope',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },

  {
    field: 'clusteringFlag',
    headerName: 'Clustering Flag',
    headerTooltip: 'Clustering Flag',
    tooltipField: 'clusteringFlag',
    width: 140,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide:true
  },
  {
    field: 'manualFlag',
    headerName: 'Manual Flag',
    headerTooltip: 'Manual Flag',
    tooltipField: 'manualFlag',
    width: 130,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide:true
  },
  {
    field: 'isSellable',
    headerName: 'Sellable',
    headerTooltip: 'Sellable',
    tooltipField: 'isSellable',
    width: 100,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
  },
  {
    field: 'nonSellableReason',
    headerName: 'Non-sellable Reason',
    headerTooltip: 'Non-sellable Reason',
    tooltipField: 'nonSellableReason',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
  },

  {
    field: 'brands',
    headerName: 'Brands',
    headerTooltip: 'Brands',
    tooltipField: 'brands',
    width: 100,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
  },
  {
    field: 'attributes',
    headerName: 'Attributes',
    headerTooltip: 'Attributes',
    tooltipField: 'attributes',
    width: 100,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
  },
  {
    field: 'lastReviewedBy',
    headerName: 'Last Reviewed By',
    headerTooltip: 'Who reviewed Master UNSPSC last ?',
    tooltipField: 'lastReviewedBy',
    width: 150,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,  
  },
   {
    field: 'lastReviewedDate',
    headerName: 'Last Reviewed Date',
    headerTooltip: 'When was Master UNSPSC last reviewed ?',
    tooltipField: 'lastReviewedDate',
    width: 150,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
  },
  {
    field: 'unspscCreatedBy',
    headerName: 'Updated By (Effective)',
    tooltipField: 'unspscCreatedBy',
    headerTooltip:'Who created Master UNSPSC ?',
    width: 170,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
  },
  {
    field: 'unspscEffectiveDate',
    headerName: 'Updated When (Effective)',
    tooltipField: 'unspscEffectiveDate',
    headerTooltip: 'When was Master UNSPSC updated ?',
    width: 185,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'unspscUpdatedBy',
    headerName: 'Updated By (End)',
    tooltipField: 'unspscUpdatedBy',
    headerTooltip:'Who updated Master UNSPSC ?',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'unspscEndDate',
    headerName: 'Updated When (End)',
    headerTooltip: 'Updated When (End)',
    tooltipField: 'unspscEndDate',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  }
];
