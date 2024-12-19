export function getColumnDefs() {
  return [
    { field: 'itemKey', headerName: 'Item Key', tooltipField: 'itemKey' },
    { field: 'manufacturerKey', headerName: 'Manufacturer Key', tooltipField: 'manufacturerKey' },
    { field: 'sku', headerName: 'SKU', tooltipField: 'sku' },
    { field: 'prodDesc', headerName: 'Product Description', tooltipField: 'prodDesc' },
    { field: 'shipTo', headerName: 'Ship To ', tooltipField: 'shipTo' },
    { field: 'soldTo', headerName: 'Sold To', tooltipField: 'soldTo' },
    { field: 'facKey', headerName: 'Fac Key', tooltipField: 'facKey' },
    { field: 'facKey2', headerName: 'Fac Key 2', tooltipField: 'facKey2' },
    { field: 'year', headerName: 'Year', tooltipField: 'year' },
    { field: 'month', headerName: 'Month', tooltipField: 'month' },
    { field: 'units', headerName: 'Units', tooltipField: 'units' },
    { field: 'uom', headerName: 'UOM', tooltipField: 'uom' },
    { field: 'convFactor', headerName: 'Conv factor', tooltipField: 'convFactor' },
    { field: 'revenue', headerName: 'Revenue', tooltipField: 'revenue' }
  ];
}

export function getDefaultColDef() {
  return {
    sortable: true,
    filter: true,
    resizable: true,
    filterParams: {
      suppressAndOrCondition: true,
      filterOptions: ['contains']
    }
  };
}
