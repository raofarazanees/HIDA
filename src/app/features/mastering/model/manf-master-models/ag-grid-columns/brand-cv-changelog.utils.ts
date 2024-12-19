import { ColDef, GridOptions } from "ag-grid-community";
import { cdxAgGridHeaderStyle } from "./parent-manf-column.constants";
import { rowStyle, commonAgGridOption } from "./row-style.utils";

export function BrandCVChangeLogGrid(): GridOptions {
    return {
      columnDefs: [...BrandCVColumns()],
      stopEditingWhenCellsLoseFocus:true,
      getRowStyle: (params) => rowStyle(params),
      ...commonAgGridOption(),
    };
  }
  
  const BrandCVColumns = (): ColDef[] => [
    {
      field: 'pmanfname',
      headerName: 'Parent Manufacturer',
      tooltipField: 'pmanfname',
      headerTooltip:'Parent Manufacturer',
      minWidth: 180,
      filter: true,
      headerClass: cdxAgGridHeaderStyle
    },
    {
      field: 'manfname',
      headerName: 'Manf Name',
      tooltipField: 'manfname',
      headerTooltip:'Manf Name',
      minWidth: 180,
      filter: true,
      headerClass: cdxAgGridHeaderStyle
    },
    {
      field: 'brandname',
      headerName: 'Brand Name',
      tooltipField: 'brandname',
      headerTooltip:'Brand Name',
      minWidth: 180,
      filter: true,
      headerClass: cdxAgGridHeaderStyle
    },
    {
      field: 'brandsource',
      headerName: 'Source',
      tooltipField: 'brandsource',
      headerTooltip:'Source',
      width: 160,
      filter: true,
      headerClass: cdxAgGridHeaderStyle
    },
    {
      field: 'brandfamily',
      headerName: 'Brand Family',
      tooltipField: 'brandfamily',
      headerTooltip:'Brand Family',
      minWidth: 180,
      filter: true,
      headerClass: cdxAgGridHeaderStyle
    },
    {
      field: 'brandmodel',
      headerName: 'Brand Model',
      tooltipField: 'brandmodel',
      headerTooltip:'Brand Model',
      minWidth: 180,
      filter: true,
      headerClass: cdxAgGridHeaderStyle
    },
    {
      field: 'brandfilter',
      headerName: 'Additional Brand Filter?',
      tooltipField: 'brandfilter',
      headerTooltip:'Additional Brand Filter',
      width: 180,
      filter: true,
      headerClass: cdxAgGridHeaderStyle
    },
    {
      field: 'manfasbrand',
      headerName: 'Manf as Brand?',
      tooltipField: 'manfasbrand',
      headerTooltip:'Manf as Brand',
      width: 130,
      filter: true,
      headerClass: cdxAgGridHeaderStyle
    },
    {
      field: 'rejectedFlag',
      headerName: 'Rejected?',
      tooltipField: 'rejectedFlag',
      headerTooltip:'Rejected',
      width: 100,
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
      field: 'brandEffectiveDate',
      headerName: 'Updated When (Effective)',
      tooltipField: 'brandEffectiveDate',
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
      field: 'brandEndDate',
      headerName: 'Updated When (End)',
      headerTooltip: 'Updated When (End)',
      tooltipField: 'brandEndDate',
      width: 140,
      filter: true,
      headerClass: cdxAgGridHeaderStyle
    }
  ]