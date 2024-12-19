import { ColDef, GridOptions } from 'ag-grid-community';
import { commonAgGridOption, rowStyle } from './row-style.utils';
import { cdxAgGridHeaderStyle, logIconColumn } from './parent-manf-column.constants';
import { getAllRecordsExtraColumns, mapCreatedUpdateColumn } from './master-mapped-column.utils';

export function GetFacilityMappedColumn(height: any = 30, scope, readOnly = false, renderForAll = false): GridOptions {
  return {
    columnDefs: [...ForFacilityMappedColumn(scope,readOnly,renderForAll)],
    getRowStyle: (params) => rowStyle(params,scope),
    ...commonAgGridOption()
  };
}

const ForFacilityMappedColumn = (scope,readOnly:boolean,renderForAll:boolean): ColDef[] => [
  ...logIconColumn(scope,true, !readOnly,renderForAll),
  {
    field: 'facMapID',
    headerName: 'Facility Map ID',
    tooltipField: 'facMapID',
    headerTooltip: 'ID generated to map External Facility Description to Master Facility Subgroup and Group',
    width: 125,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true
  },
  {
    field: 'facPGUID',
    headerName: 'Facility PGUID',
    tooltipField: 'facPGUID',
    headerTooltip: 'Unique ID of External Facility',
    width: 135,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true
  },
  {
    field: 'distrPGUID',
    headerName: 'Distributor PGUID',
    tooltipField: 'distrPGUID',
    width: 145,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    headerTooltip: 'Unique ID of Distributor',
    hide: true
  },
  {
    field: 'distrName',
    headerName: 'Distributor Name',
    headerTooltip: 'Name of Distributor',
    tooltipField: 'distrName',
    width: 120,
    minWidth: 80,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'extFacKey',
    headerName: 'Ext Facility Key',
    headerTooltip: 'External Facility Key from Distributor',
    tooltipField: 'extFacKey',
    width: 110,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'extFacDesc',
    headerName: 'Ext Facility Desc',
    headerTooltip: 'External Facility Description from Distributor',
    tooltipField: 'extFacDesc',
    width: 150,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'facID',
    headerName: 'Facility ID',
    headerTooltip: 'ID of Master Facility',
    tooltipField: 'facID',
    width: 120,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide:true
  },
  {
    field: 'facSubgroupName',
    headerName: 'Facility Subgroup Name',
    tooltipField: 'facSubgroupName',
    headerTooltip: 'Name of Master Facility Subgroup',
    width: 220,
    minWidth: 80,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    cellClass: 'typeahead-editable-cell',
    cellEditor: readOnly ? '' : 'typeHeadEditor',
    editable: !readOnly,
    cellEditorParams: {
      mappingOptions: [],
      typeHeadRenderFor: 'facilityMaster'
    },
    cellRendererParams: (rowNode: any,text?:string) => {
      scope.openCreateFacilityDialog(rowNode,text);
    },
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
    valueFormatter: (params) => (params.value ? params.value : '-')
  },
  {
    field: 'facGroupName',
    headerName: 'Facility Group Name',
    tooltipField: 'facGroupName',
    headerTooltip: 'Name of Master Facility Group',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    valueFormatter: (params) => (params.value ? params.value : '-')
  },
  ...getAllRecordsExtraColumns(renderForAll, 'Facility'),
  {
    field: 'mappingComments',
    headerName: 'Comments',
    headerTooltip: 'Comments entered as part of mapping External Facility Description to Master Facility Subgroup and Group',
    tooltipField: 'mappingComments',
    width: 120,
    filter: true,
    editable:!readOnly,
    valueFormatter: (params) => (params.value ? params.value : '-'),
    headerClass: cdxAgGridHeaderStyle,
    // cellClass: (params) => { 
    //   return ( params?.data.facSubgroupName && !params.data?.mappingComments && params.data?.isModified )
    //     ? 'required-cell' 
    //     :'editable-cell-comment';
    // },
    cellClass: (params) => {
      return params?.data.facSubgroupName && (params.data.facMapID ? ( !params.data?.mappingComments ? true : false ) : false) && params.data?.isModified ? 'required-cell' : 'editable-cell-comment';
    },
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
  },
  ...mapCreatedUpdateColumn(renderForAll,renderForAll),
  ...getAllRecordsExtraColumnsDate(renderForAll)
];


const getAllRecordsExtraColumnsDate = (isForAll) => {
  if (isForAll) {
    return [
      {
        field: 'extFacCreatedDate',
        headerName: 'Ext Facility Created Date',
        headerTooltip: 'When was the External Facility created in the system ?',
        tooltipField: 'extFacCreatedDate',
        width: 130,
        minWidth: 130,
        filter: true,
        headerClass: cdxAgGridHeaderStyle
      },
      {
        field: 'extFacUpdatedDate',
        headerName: 'Ext Facility Updated Date',
        headerTooltip: 'When was the External Facility last updated in the system ?',
        tooltipField: 'extFacUpdatedDate',
        width: 130,
        minWidth: 130,
        filter: true,
        headerClass: cdxAgGridHeaderStyle
      }
    ];
  } else {
    return [];
  }
};
