import { ColDef, GridOptions } from 'ag-grid-community';
import { cdxAgGridHeaderStyle, logIconColumn } from './parent-manf-column.constants';
import { rowStyle, commonAgGridOption } from './row-style.utils';

export function GetMasteredMappedColumn(height: any, scope, isRenderForAll = false,readOnly = false): GridOptions {
  return {
    columnDefs: [...getColumnDef(scope, isRenderForAll,readOnly)],
    getRowStyle: (params) => rowStyle(params, scope),
    ...commonAgGridOption(),
    rowBuffer:100
  };
}

const getColumnDef = (scope, isRenderForAll,readOnly): ColDef[] => [
  ...actionColumn(isRenderForAll,scope,!readOnly),
  {
    field: 'manfMapID',
    headerName: 'Manf Map ID',
    headerTooltip: 'ID generated to map External Manufacturer Description to Master Child Manufacturer Name',
    tooltipField: 'manfMapID',
    width: 115,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true
  },
  {
    field: 'manuPGUID',
    headerName: 'Manufacturer PGUID',
    headerTooltip: 'Unique ID of External Manufacturer',
    tooltipField: 'manuPGUID',
    width: 155,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true
  },
  {
    field: 'distrPGUID',
    headerName: 'Distributor PGUID',
    headerTooltip: 'Unique ID of Distributor',
    tooltipField: 'distrPGUID',
    width: 150,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true
  },
  {
    field: 'distrName',
    headerName: 'Distributor Name',
    headerTooltip: 'Name of Distributor',
    tooltipField: 'distrName',
    width: 145,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'extManufKey',
    headerName: 'External Manf Key',
    headerTooltip: 'External Manufacturer Key from Distributor',
    tooltipField: 'extManufKey',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'extManufDesc',
    headerName: 'External Manf Desc',
    headerTooltip: 'External Manufacturer Description from Distributor',
    tooltipField: 'extManufDesc',
    width: 200,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'revenue',
    headerName: 'Revenue',
    headerTooltip: 'Aggregated all time revenue across items belonging to External Manufacturer',
    tooltipField: 'revenue',
    width: 130,
    minWidth: 130,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide:!isRenderForAll,
    cellClass:'text-right'
  },
  {
    field: 'manfID',
    headerName: 'Child Manf ID',
    headerTooltip: 'ID of Master Child Manufacturer',
    tooltipField: 'manfID',
    width: 150,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true
  },
  {
    field: 'manfName',
    headerName: 'Child Manf Name',
    headerTooltip: 'Name of Master Child Manufacturer',
    tooltipField: 'manfName',
    width: 250,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    cellRenderer: !readOnly ? 'typeHeadEditor' : '',
    cellEditorParams: {
      mappingOptions: [],
      typeHeadRenderFor: 'productManfMappingChild',
      onRecordsCreateClick: (node: any,typedText?:string) => {
        scope.openParentChildDialog(node,typedText);
      }
    },
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
    suppressKeyboardEvent: () => true,
    cellClass: (params) => {
      return ( !params.value && params.data?.isModified )
        ? 'required-cell-inline' 
        :'editable-cell-comment';
    }
  },
  {
    field: 'childDispName',
    headerName: 'Child Display Name',
    headerTooltip: 'Display Name of Master Child Manufacturer',
    tooltipField: 'childDispName',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    valueFormatter: (params) => (params.value ? params.value : '-')
  },
  {
    field: 'parManfID',
    headerName: 'Parent Manf ID',
    headerTooltip: 'ID of Master Parent Manufacturer',
    tooltipField: 'parManfID',
    width: 120,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true
  },
  {
    field: 'parManfName',
    headerName: 'Parent Manf Name',
    headerTooltip: 'Name of Master Parent Manufacturer',
    tooltipField: 'parManfName',
    width: 140,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true
  },
  {
    field: 'parDispName',
    headerName: 'Parent Display Name',
    headerTooltip: 'Display Name of Master Parent Manufacturer',
    tooltipField: 'parDispName',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    valueFormatter: (params) => (params.value ? params.value : '-'),
    hide: true
  },
  {
    field: 'topParManfID',
    headerName: 'Top Parent Manf ID',
    headerTooltip: 'ID of Top Parent Master Manufacturer',
    tooltipField: 'topParManfID',
    width: 150,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true
  },
  {
    field: 'topParManfName',
    headerName: 'Top Parent Manf Name',
    headerTooltip: 'Name of Top Parent Master Manufacturer',
    tooltipField: 'topParManfName',
    width: 170,
    maxWidth: 170,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true
  },
  {
    field: 'topParDispName',
    headerName: 'Top Parent Display Name',
    headerTooltip: 'Display Name of Top Parent Master Manufacturer',
    tooltipField: 'topParDispName',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    valueFormatter: (params) => (params.value ? params.value : '-'),
    hide: true
  },
  ...getAllRecordsExtraColumns(isRenderForAll),
  {
    field: 'mappingComments',
    headerName: 'Mapping Comments',
    headerTooltip: 'Comments entered as part of mapping External Manufacturer Description to Master Child Manufacturer Name',
    tooltipField: 'mappingComments',
    width: 180,
    minWidth: 180,
    filter: true,
    editable: !readOnly,
    cellClass: (params) => {
      return params?.data.manfName && (params.data.manfMapID ? ( !params.data?.mappingComments ? true : false ) : false) && params.data?.isModified ? 'required-cell' : 'editable-cell-comment';
    },
    valueFormatter: (params) => (params.value ? params.value : '-'),
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'blacklisted',
    headerName: 'Blacklist Flag',
    headerTooltip: 'Blacklist status of Child Manufacturer',
    tooltipField: 'blacklisted',
    width: 130,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true
  },
  ...mapCreatedUpdateColumn(isRenderForAll ? true : false,isRenderForAll),
  ...getAllRecordsExtraColumnsDate(isRenderForAll),

];

const getAllRecordsExtraColumnsDate = (isForAll) => {
  if (isForAll) {
    return [
      {
        field: 'extManfCreatedDate',
        headerName: 'Ext Manf Created Date',
        headerTooltip: 'When was the External Manufacturer created in the system ?',
        tooltipField: 'extManfCreatedDate',
        width: 180,
        filter: true,
        headerClass: cdxAgGridHeaderStyle
      },
      {
        field: 'extManfUpdatedDate',
        headerName: 'Ext Manf Updated Date',
        headerTooltip: 'When was the External Manufacturer last updated in the system ?',
        tooltipField: 'extManfUpdatedDate',
        width: 180,
        filter: true,
        headerClass: cdxAgGridHeaderStyle
      }
    ];
  } else {
    return [];
  }
};

const getAllRecordsExtraColumnsRen_ = (isForAll) => {
  if (isForAll) {
    return [
      {
        field: 'revenue',
        headerName: 'Revenue',
        headerTooltip: 'Revenue',
        tooltipField: 'revenue',
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

export const getAllRecordsExtraColumns = (isForAll, name = 'Manufacturer') => {
  if (isForAll) {
    return [
      {
        field: 'isMastered',
        headerName: 'Is Mastered ?',
        headerTooltip: `Status of External ${name} - Mastered (Y) / Unmastered (N)`,
        tooltipField: 'isMastered',
        width: 120,
        filter: true,
        headerClass: cdxAgGridHeaderStyle
      }
    ];
  } else {
    return [];
  }
};

const actionColumn = (onAllRender,scope,readOnly) => {
  if (!onAllRender) {
  return logIconColumn(scope,true,readOnly)
  } else {
    return  logIconColumn(scope,true,false,onAllRender)
    ;
  }
}
export const mapCreatedUpdateColumn = (hide = false,map = false) => [
  {
    field: 'mapCreatedBy',
    headerName: map ? 'Map Created By' : 'Created By',
    headerTooltip: 'Who created the mapping ?',
    tooltipField: 'mapCreatedBy',
    width: 140,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide:hide
  },
  {
    field: 'mapCreatedDate',
    headerName: map ? 'Map Created Date' : 'Created Date',
    headerTooltip: 'When was the mapping created ?',
    tooltipField: 'mapCreatedDate',
    width: 140,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide:hide
  },
  {
    field: 'mapUpdatedBy',
    headerName: map ? 'Map Updated By': 'Updated By',
    headerTooltip: 'Who updated the mapping last ?',
    tooltipField: 'mapUpdatedBy',
    width: 140,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide:hide
  },
  {
    field: 'mapUpdatedDate',
    headerName: map ? 'Map Updated Date' : 'Updated Date',
    headerTooltip: 'When was the mapping last updated ?',
    tooltipField: 'mapUpdatedDate',
    width: 140,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide:hide
  }
];
