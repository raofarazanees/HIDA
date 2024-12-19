import { ColDef, GridOptions } from "ag-grid-community";
import { cdxAgGridHeaderStyle } from "./parent-manf-column.constants";

export function GetMasteredMappedChangeLogColumn(height: any): GridOptions {
    return {
      columnDefs: [...getColumnDef()],
      rowData: [],
      pagination: true,
      paginationPageSize: 20,
      defaultColDef: {
        sortable: true,
        resizable: true,
        filter: false
      },
      rowHeight: height,
      overlayNoRowsTemplate: 'There are no records to show.',
      rowClassRules: { 'ag-row-modified': 'data.isModified' },
      editType: 'fullRow'
    };
  }

  const getColumnDef = (): ColDef[] => [
    // {
    //     field: 'manfMapID',
    //     headerName: 'Manuf Map ID',
    //     headerTooltip: 'Manuf Map ID',
    //     tooltipField: 'manfMapID',
    //     width: 120,
    //     filter: true,
    //     headerClass: cdxAgGridHeaderStyle
    //   },
    {
        field: 'manuPGUID',
        headerName: 'Manufacturer PGUID',
        headerTooltip: 'Unique ID of External Manufacturer',
        tooltipField: 'manuPGUID',
        width: 160,
        filter: true,
        headerClass: cdxAgGridHeaderStyle,
        hide:true
      },
      {
        field: 'distrPGUID',
        headerName: 'Distributor PGUID',
        headerTooltip: 'Unique ID of Distributor',
        tooltipField: 'distrPGUID',
        width: 150,
        maxWidth: 150,
        filter: true,
        headerClass: cdxAgGridHeaderStyle,
        hide:true
      },
      {
        field: 'distrName',
        headerName: 'Distributor Name',
        headerTooltip: 'Name of Distributor',
        tooltipField: 'distrName',
        width: 145,
        maxWidth: 145,
        filter: true,
        headerClass: cdxAgGridHeaderStyle
      },
      {
        field: 'extManufKey',
        headerName: 'External Manf Key',
        headerTooltip: 'External Manufacturer Key from Distributor',
        tooltipField: 'extManufKey',
        width: 170,
        maxWidth: 170,
        filter: true,
        headerClass: cdxAgGridHeaderStyle,
        hide:true
      },
      {
        field: 'extManufDesc',
        headerName: 'External Manf Desc',
        headerTooltip: 'External Manufacturer Description from Distributor',
        tooltipField: 'extManufDesc',
        width: 200,
        filter: true,
        headerClass: cdxAgGridHeaderStyle,
        hide:true
      },
      {
        field: 'manfID',
        headerName: 'Child Manf ID',
        headerTooltip: 'ID of Master Child Manufacturer',
        tooltipField: 'manfID',
        width: 150,
        filter: true,
        headerClass: cdxAgGridHeaderStyle,
        hide:true
      },
      {
        field: 'manfName',
        headerName: 'Child Manufacturer Name',
        headerTooltip: 'Name of Master Child Manufacturer',
        tooltipField: 'manfName',
        width: 250,
        minWidth:250,
        filter: true,
        headerClass: cdxAgGridHeaderStyle
      },
      {
        field: 'childDispName',
        headerName: 'Child Display Name',
        headerTooltip: 'Display Name of Master Child Manufacturer',
        tooltipField: 'childDispName',
        headerClass: cdxAgGridHeaderStyle,
        width: 180,
        minWidth:180
      },
      {
        field: 'parManfID',
        headerName: 'Parent Manf ID',
        headerTooltip: 'ID of Master Parent Manufacturer',
        tooltipField: 'parManfID',
        width: 120,
        filter: true,
        headerClass: cdxAgGridHeaderStyle,
        hide:true
      },
      {
        field: 'parManfName',
        headerName: 'Parent Manf Name',
        headerTooltip: 'Name of Master Parent Manufacturer',
        tooltipField: 'parManfName',
        width: 140,
        filter: true,
        headerClass: cdxAgGridHeaderStyle,
        hide:true
      },
      {
        field: 'parDispName',
        headerName: 'Parent Display Name',
        headerTooltip: 'Display Name of Master Parent Manufacturer',
        tooltipField: 'parDispName',
        headerClass: cdxAgGridHeaderStyle,
        width: 180,
        minWidth:180,
        hide:true
      },
      {
        field: 'topParDispName',
        headerName: 'Top Display Name',
        headerTooltip: 'Display Name of Top Parent Master Manufacturer',
        tooltipField: 'topParDispName',
        headerClass: cdxAgGridHeaderStyle,
        width: 180,
        minWidth:180,
        hide:true
      },
      {
        field: 'mapActiveFlag',
        headerName: 'Is Map Active ?',
        headerTooltip: 'Status of Mapping',
        tooltipField: 'mapActiveFlag',
        headerClass: cdxAgGridHeaderStyle,
        width: 150
      },
      {
        field: 'mappingComments',
        headerName: 'Mapping Comments',
        headerTooltip: 'Comments entered as part of mapping External Manufacturer Description to Master Child Manufacturer Name',
        tooltipField: 'mappingComments',
        width: 180,
        minWidth:180,
        filter: true,
        headerClass: cdxAgGridHeaderStyle
      },
      {
        field: 'blacklisted',
        headerName: 'Blacklisted Flag',
        headerTooltip: 'Blacklist status of Child Manufacturer',
        tooltipField: 'blacklisted',
        width: 130,
        filter: true,
        headerClass: cdxAgGridHeaderStyle,
        hide:true
      },
      {
        field: 'mapCreatedBy',
        headerName: 'Updated By (Effective)',
        headerTooltip: 'Who created the Mapping ?',
        tooltipField: 'mapCreatedBy',
        width: 170,
        filter: true,
        headerClass: cdxAgGridHeaderStyle,
      },
      {
        field: 'mapEffectiveDate',
        headerName: 'Updated When (Effective)',
        headerTooltip: 'When was the Mapping updated ?',
        tooltipField: 'mapEffectiveDate',
        width: 180,
        filter: true,
        headerClass: cdxAgGridHeaderStyle
      },
            {
        field: 'mapUpdatedBy',
        headerName: 'Updated By (End)',
        headerTooltip: 'Who updated the Master Parent Manufacturer ?',
        tooltipField: 'mapUpdatedBy',
        width: 180,
        filter: true,
        headerClass: cdxAgGridHeaderStyle,
      },
      {
        field: 'mapEndDate',
        headerName: 'Updated When (End)',
        headerTooltip: 'Updated When (End)',
        tooltipField: 'mapCreatedDate',
        width: 180,
        filter: true,
        headerClass: cdxAgGridHeaderStyle
      }

  ]