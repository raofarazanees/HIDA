import * as moment from 'moment';

export function getMasteredColumnDefs() {
  return [
    { field: 'distributorName', headerName: 'Distributor', tooltipField: 'distributorName', filter: 'text' },
    { field: 'externalManufacturerKey', headerName: 'Key', tooltipField: 'externalManufacturerKey', filter: 'text' },
    { field: 'externalManufacturerDesc', headerName: 'Description', tooltipField: 'externalManufacturerDesc', filter: 'text' },
    { field: 'internalManufacturerDesc', headerName: 'Mapped Description', tooltipField: 'internalManufacturerDesc', filter: 'text' }
  ];
}

export function getUnmasteredColumnDefs() {
  return [
    { field: 'revenue', headerName: 'Revenue', tooltipField: 'revenue', filter: false },
    { field: 'externalManufacturerKey', headerName: 'Key', tooltipField: 'externalManufacturerKey', filter: 'text' },
    { field: 'externalManufacturerDesc', headerName: 'Description', tooltipField: 'externalManufacturerDesc', filter: 'text' }
  ];
}

export function getColumnDefsForChangeLog() {
  return [
    { field: 'internalManufacturerDesc', headerName: 'Mapped Description', tooltipField: 'internalManufacturerDesc' },
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
