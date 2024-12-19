import { ColDef, GridOptions } from "ag-grid-community";
import { commonAgGridOption, rowStyle } from "./row-style.utils";
import { cdxAgGridHeaderStyle } from "./parent-manf-column.constants";

export function GetFacilityForMapColumnOptions(height: any, scope, readOnly = false): GridOptions {
    return {
      columnDefs: [...ForFacilityForMappingColumns(scope,readOnly)],
      getRowStyle: (params) => rowStyle(params, scope),
      ...commonAgGridOption(),
    };
  }

  
  const ForFacilityForMappingColumns = (scope,readOnly:boolean): ColDef[] => [
    {
      field: 'facilityPGUID',
      headerName: 'FacilityType PGUID',
      tooltipField: 'facilityPGUID',
      headerTooltip:'Unique ID of External Facility',
      width: 150,
      filter: true,
      headerClass: cdxAgGridHeaderStyle,
      hide:true
    },
    {
        field: 'facilityDistPGUID',
        headerName: 'Distributor PGUID',
        tooltipField: 'facilityDistPGUID',
        width: 150,
        filter: true,
        headerClass: cdxAgGridHeaderStyle,
        headerTooltip:'Unique ID of Distributor',
        hide:true
      },
      {
        field: 'facilityDistName',
        headerName: 'Distributor Name',
        headerTooltip:'Name of Distributor',
        tooltipField: 'facilityDistName',
        width: 120,
        filter: true,
        headerClass: cdxAgGridHeaderStyle,
      },
      {
        field: 'extFacilityKey',
        headerName: 'Ext Facility Key',
        headerTooltip:'External Facility Key from Distributor',
        tooltipField: 'extFacilityKey',
        width: 120,
        filter: true,
        headerClass: cdxAgGridHeaderStyle,
      },
      {
        field: 'extFacilityDesc',
        headerName: 'External Facility Desc',
        headerTooltip: 'External Facility Description from Distributor',
        tooltipField: 'extFacilityDesc',
        width: 150,
        filter: true,
        headerClass: cdxAgGridHeaderStyle,
      },
      {
        field: 'facilitySubGroupName',
        headerName: 'Facility Subgroup Name',
        tooltipField: 'facilitySubGroupName',
        headerTooltip: 'Name of Master Facility Subgroup',
        width: 220,
        minWidth:80,
        filter: true,
        headerClass: cdxAgGridHeaderStyle,
        cellClass: 'typeahead-editable-cell',
        cellEditor: readOnly ? '' :'typeHeadEditor',
        editable:!readOnly,
        cellEditorParams: {
          mappingOptions: [],
          typeHeadRenderFor:'facilityMaster'

        },
        cellRendererParams: (rowNode: any,text?:string) => {
          scope.openCreateFacilityDialog(rowNode,text);
        },
        onCellValueChanged: (rowNode: any): void => {
          scope.updateValue(rowNode.node);
        },
        valueFormatter: (params) => params.value ? params.value : '-',
      },
      {
        field: 'facilityGroupName',
        headerName: 'Facility Group Name',
        tooltipField: 'facilityGroupName',
        headerTooltip: 'Name of Master Facility Group',
        width: 180,
        minWidth:80,
        filter: true,
        headerClass: cdxAgGridHeaderStyle,
        valueFormatter: (params) => params.value ? params.value : '-',
      },
      {
        field: 'comments',
        headerName: 'Comments',
        headerTooltip: 'Comments entered as part of mapping External Facility Description to Master Facility Subgroup and Group',
        width: 180,
        minWidth:180,
        filter: true,
        editable: !readOnly,
        valueFormatter: (params) => params.value ? params.value : '-',
        onCellValueChanged: (rowNode: any): void => {
          scope.updateValue(rowNode.node);
        },
        headerClass: cdxAgGridHeaderStyle
      },
      {
        field: 'extFacilityCreatedDate',
        headerName: 'Ext Created Date',
        tooltipField: 'extFacilityCreatedDate',
        headerTooltip: 'When was the External Facility created in the system ?',
        width: 130,
        filter: true,
        headerClass: cdxAgGridHeaderStyle,
      },
      {
        field: 'extFacilityUpdatedDate',
        headerName: 'Ext Updated Date',
        tooltipField: 'extFacilityUpdatedDate',
        headerTooltip: 'When was the External Facility last updated in the system ?',
        width: 130,
        filter: true,
        headerClass: cdxAgGridHeaderStyle,
      },
  ]