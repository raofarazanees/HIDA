import * as moment from 'moment';

export function getMasteredColumnDefs() {
  return [
    { field: 'distributorName', headerName: 'Distributor', tooltipField: 'distributorName', filter: 'text' },
    { field: 'externalFacilityKey', headerName: 'key', tooltipField: 'externalFacilityKey', filter: 'text' },
    { field: 'externalFacilityDesc', headerName: 'Description', tooltipField: 'externalFacilityDesc', filter: 'text' },
    { field: 'internalFacilityGroupDesc', headerName: 'Mapped Group Description', tooltipField: 'internalFacilityGroupDesc', filter: 'text' },
    { field: 'internalFacilitySubgroupDesc', headerName: 'Mapped Sub-Group Description', tooltipField: 'internalFacilitySubgroupDesc', filter: 'text' }
  ];
}

export function getColumnDefsForChangeLog() {
  return [
    { field: 'internalFacilityGroupDesc', headerName: 'Mapped Group Description', tooltipField: 'internalFacilityGroupDesc' },
    { field: 'internalFacilitySubgroupDesc', headerName: 'Mapped Sub-Group Description', tooltipField: 'internalFacilitySubgroupDesc' },
    { field: 'comments', headerName: 'Comments', tooltipField: 'comments' },
    { field: 'userName', headerName: 'User Name', tooltipField: 'userName' },
    { field: 'effectiveDate', headerName: 'Updated When (Effective)',tooltipValueGetter: timeFormatter,  valueFormatter: timeFormatter },
    { field: 'endDate', headerName: 'Updated When (End)', tooltipValueGetter: timeFormatter,  valueFormatter: timeFormatter }
  ];
}

export function getDefaultColDef() {
  return {
    sortable: true,
    filter: true,
    filterParams: {
      suppressAndOrCondition: true,
      filterOptions: ['contains']
    },
    resizable: true
  };
}

function timeFormatter(params: any): string {
  return params.value ? moment(params.value).format('YYYY-MM-DD HH:mm') : ' - ';
}
