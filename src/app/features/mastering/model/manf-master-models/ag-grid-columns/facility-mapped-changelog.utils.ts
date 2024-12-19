import { ColDef, GridOptions } from "ag-grid-community";
import { commonAgGridOption, rowStyle } from "./row-style.utils";
import { cdxAgGridHeaderStyle } from "./parent-manf-column.constants";

export function GetFacilityMappedChangeLogColumn(height: any): GridOptions {
    return {
      columnDefs: [...ColForMappedChangeLog()],
      getRowStyle: (params) => rowStyle(params),
      ...commonAgGridOption(),
    };
  }

  const ColForMappedChangeLog = (): ColDef[] => [
      {
        field: 'facID',
        headerName: 'Facility ID',
        headerTooltip: 'ID of Master Facility',
        tooltipField: 'facID',
        width: 120,
        filter: true,
        headerClass: cdxAgGridHeaderStyle,
      },
      {
        field: 'facSubgroupName',
        headerName: 'Facility Subgroup Name',
        tooltipField: 'facSubgroupName',
        headerTooltip: 'Name of Master Facility Subgroup',
        width: 220,
        filter: true,
        headerClass: cdxAgGridHeaderStyle     
      },
      {
        field: 'facGroupName',
        headerName: 'Facility Group Name',
        tooltipField: 'facGroupName',
        headerTooltip: 'Name of Master Facility Group',
        width: 180,
        filter: true,
        headerClass: cdxAgGridHeaderStyle,
      },
      {
        field: 'mapActiveFlag',
        headerName: 'Is Active ?',
        headerTooltip: 'Status of mapping',
        tooltipField: 'mapActiveFlag',
        width: 120,
        filter: true,
        headerClass: cdxAgGridHeaderStyle
      },
      {
        field: 'mappingComments',
        headerName: 'Comments',
        headerTooltip: 'Comments entered as part of mapping External Facility Description to Master Facility Subgroup and Group',
        tooltipField: 'mappingComments',
        width: 120,
        filter: true,
        headerClass: cdxAgGridHeaderStyle
      },
      {
        field: 'mapCreatedBy',
        headerName: 'Updated By (Effective)',
        tooltipField: 'mapCreatedBy',
        headerTooltip:'Who created the mapping ?',
        width: 140,
        filter: true,
        headerClass: cdxAgGridHeaderStyle
      },
      {
        field: 'mapEffectiveDate',
        headerName: 'Updated When (Effective)',
        headerTooltip:'When was the mapping updated ?',
        tooltipField: 'mapEffectiveDate',
        width: 150,
        filter: true,
        headerClass: cdxAgGridHeaderStyle
      },
      {
        field: 'mapUpdatedBy',
        headerName: 'Updated By (End)',
        tooltipField: 'mapUpdatedBy',
        headerTooltip:'Who updated the mapping ?',
        width: 140,
        filter: true,
        headerClass: cdxAgGridHeaderStyle
      },
      {
        field: 'mapEndDate',
        headerName: 'Updated When (End)',
        headerTooltip: 'Updated When (End)',
        tooltipField: 'mapEndDate',
        width: 160,
        filter: true,
        headerClass: cdxAgGridHeaderStyle
      }
  ]