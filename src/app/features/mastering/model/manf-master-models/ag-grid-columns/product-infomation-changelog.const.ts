import { ColDef, GridOptions } from "ag-grid-community";
import { commonAgGridOption, rowStyle } from "./row-style.utils";
import { cdxAgGridHeaderStyle } from "./parent-manf-column.constants";

export function ProductEntitlementChangeLogOptions(height: any, scope): GridOptions {
  return {
    columnDefs: [...getColumnDef(scope)],
    getRowStyle: (params) => rowStyle(params, scope),
    suppressColumnVirtualisation: true,
    animateRows: false,
    suppressAnimationFrame: false,
    ...commonAgGridOption(height),
    rowBuffer: 20,
  };
}

const getColumnDef = (scope): ColDef[] => [
  {
    field: 'prodID',
    headerName: 'Product ID',
    headerTooltip: 'Unique ID of product',
    tooltipField: 'prodID',
    width: 100,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true,
    suppressKeyboardEvent: () => true
  },
  {
    field: 'unspscCode',
    headerName: 'UNSPSC Code',
    headerTooltip: 'Unique ID of Master Commodity / Level 4 UNSPSC',
    tooltipField: 'unspscCode',
    width: 130,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
  },
  {
    field: 'unspscDesc',
    headerName: 'UNSPSC Desc',
    headerTooltip: 'Description of Master Commodity / Level 4 UNSPSC',
    tooltipField: 'unspscDesc',
    width: 200,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true
  },
  {
    field: 'unspscSource',
    headerName: 'UNSPSC Datasource',
    headerTooltip: 'Internal Source of UNSPSC assignment (HIDA / MANUAL) to product',
    tooltipField: 'unspscSource',
    width: 170,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: true
  },
  {
    field: 'prodDesc',
    headerName: 'Product Description',
    headerTooltip: 'Description of product',
    tooltipField: 'prodDesc',
    width: 220,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
  },
  {
    field: 'prodSKU',
    headerName: 'Product SKU',
    headerTooltip: 'Product SKU',
    tooltipField: 'prodSKU',
    width: 120,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
  },
  { field: 'prodActiveFlag', headerName: 'Is Product Active ?', headerTooltip: 'Status of Product', tooltipField: 'prodActiveFlag', width: 150, filter: true, headerClass: cdxAgGridHeaderStyle },
  {
    field: 'manfID',
    headerName: 'Child Manf ID',
    headerTooltip: 'ID of Master Child Manufacturer',
    tooltipField: 'manfID',
    width: 120,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true,
    suppressKeyboardEvent: () => true,
  },
  {
    field: 'manfName',
    headerName: 'Child Manufacturer Name',
    headerTooltip: 'Name of Master Child Manufacturer',
    tooltipField: 'manfName',
    width: 210,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'manfDisplayName',
    headerName: 'Child Display Name',
    headerTooltip: 'Display Name of Master Child Manufacturer',
    tooltipField: 'manfDisplayName',
    width: 155,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: true
  },
  {
    field: 'parentManfID',
    headerName: 'Parent Manf ID',
    headerTooltip: 'ID of Parent Manufacturer assigned to Child Manufacturer',
    tooltipField: 'parentManfID',
    width: 130,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true,
    suppressKeyboardEvent: () => true
  },
  {
    field: 'parentManfName',
    headerName: 'Parent Manf Name',
    headerTooltip: 'Name of Master Parent Manufacturer assigned to Master Child Manufacturer',
    tooltipField: 'parentManfName',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: true
  },
  {
    field: 'parentManfDisplayName',
    headerName: 'Parent Display Name',
    headerTooltip: 'Display Name of Master Parent Manufacturer assigned to Master Child Manufacturer',
    tooltipField: 'parentManfDisplayName',
    width: 170,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true,
    suppressKeyboardEvent: () => true,
  },
  {
    field: 'topParentManfID',
    headerName: 'Top Parent Manf ID',
    headerTooltip: 'ID of Top Parent Master Manufacturer based on Master Manufacturer Parent Child relationship',
    tooltipField: 'topParentManfID',
    width: 150,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true,
    suppressKeyboardEvent: () => true,
  },
  {
    field: 'topParentManfName',
    headerName: 'Top Parent Manf Name',
    headerTooltip: 'Name of Top Parent Master Manufacturer based on Master Manufacturer Parent Child relationship',
    tooltipField: 'topParentManfName',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: true
  },
  {
    field: 'topParentManfDisplayName',
    headerName: 'Top Parent Display Name',
    headerTooltip: 'Display Name of Top Parent Master Manufacturer based on Master Manufacturer Parent Child relationship',
    tooltipField: 'topParentManfDisplayName',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true,
    suppressKeyboardEvent: () => true,
    valueFormatter: (params) => params.value ? params.value : '-',

  },
  {
    field: 'unspscID',
    headerName: 'UNSPSC ID',
    headerTooltip: 'Internal ID of Master UNSPSC',
    tooltipField: 'unspscID',
    width: 130,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true,
    suppressKeyboardEvent: () => true
  },
  {
    field: 'unspscMarketID',
    headerName: 'Market ID',
    headerTooltip: 'ID assigned to Master Market',
    tooltipField: 'unspscMarketID',
    width: 200,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: true,
  },
  {
    field: 'unspscMarketName',
    headerName: 'Market Name',
    headerTooltip: 'Master Market Name',
    tooltipField: 'unspscMarketName',
    width: 200,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true,
  },
  {
    field: 'unspscSubmarketName',
    headerName: 'Submarket Name',
    headerTooltip: 'Master Submarket Name',
    tooltipField: 'unspscSubmarketName',
    width: 200,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true,
  },
  {
    field: 'brandName',
    headerName: 'Brand Name',
    headerTooltip: 'Master Brand Name assigned to product',
    tooltipField: 'brandName',
    width: 200,
    filter: false,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    valueGetter: (row: any) => {
      return covertStringToArrayBrandMap(row.data.brandMapIDName);
    },
    hide: false
  },
  {
    field: 'customFlag',
    headerName: 'Custom Flag',
    headerTooltip: 'Custom Flag',
    tooltipField: 'customFlag',
    width: 120,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true,
  },
  {
    field: 'privateFlag',
    headerName: 'Private Flag',
    headerTooltip: 'Private Flag',
    tooltipField: 'privateFlag',
    width: 120,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true,
  },
  {
    field: 'kptFlag',
    headerName: 'KPT Flag',
    headerTooltip: 'Kits, Packs, Trays Flag',
    tooltipField: 'kptFlag',
    width: 120,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: true,
  },
  {
    field: 'prodUNSPSCUpdatedBy',
    headerName: 'UNSPSC Updated By',
    headerTooltip: 'Who updated the product UNSPSC last ?',
    tooltipField: 'prodUNSPSCUpdatedBy',
    width: 175,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: true
  },
  {
    field: 'prodUNSPSCUpdatedDate',
    headerName: 'UNSPSC Updated Date',
    headerTooltip: 'When was the product UNSPSC last updated ?',
    tooltipField: 'prodUNSPSCUpdatedDate',
    width: 175,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: true
  },
  {
    field: 'comments',
    headerName: 'Comments',
    headerTooltip: 'User comments',
    tooltipField: 'comments',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true
  },
  {
    field: 'checkedStatus',
    headerName: 'Checked Status',
    headerTooltip: 'Checked Status',
    tooltipField: 'checkedStatus',
    width: 130,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: true
  },
  {
    field: 'checkedOutUserName',
    headerName: 'Checked Out User Name',
    headerTooltip: '',
    tooltipField: 'checkedOutUserName',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: true
  },
  {
    field: 'checkedOutUserEmail',
    headerName: 'Checked Out User Email',
    headerTooltip: '',
    tooltipField: 'checkedOutUserEmail',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: true,
  },
  {
    field: 'checkedOutDate',
    headerName: 'Checked Out Date',
    headerTooltip: '',
    tooltipField: 'checkedOutDate',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: true
  },
  {
    field: 'checkedInUserName',
    headerName: 'Checked In User Name',
    headerTooltip: '',
    tooltipField: 'checkedInUserName',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: true
  },
  {
    field: 'checkedInUserEmail',
    headerName: 'Checked In User Email',
    headerTooltip: '',
    tooltipField: 'checkedInUserEmail',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: true
  },
  {
    field: 'checkedInDate',
    headerName: 'Checked In Date',
    headerTooltip: '',
    tooltipField: 'checkedInDate',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    suppressKeyboardEvent: () => true,
    hide: true
  },
  { field: 'createdBy', headerName: 'Updated By (Effective)', headerTooltip: 'Who created the product ?', tooltipField: 'createdBy', width: 190, filter: true, headerClass: cdxAgGridHeaderStyle },
  { field: 'prodEffectiveDate', headerName: 'Updated When (Effective)', headerTooltip: 'When was the product updated ?', tooltipField: 'prodEffectiveDate', width: 190, filter: true, headerClass: cdxAgGridHeaderStyle },
  { field: 'updatedBy', headerName: 'Updated By (End)', headerTooltip: 'Who updated the product ?', tooltipField: 'updatedBy', width: 170, filter: true, headerClass: cdxAgGridHeaderStyle },
  { field: 'prodEndDate', headerName: 'Updated When (End)', headerTooltip: 'Updated When (End)', tooltipField: 'prodEndDate', width: 170, filter: true, headerClass: cdxAgGridHeaderStyle },
]

const covertStringToArrayBrandMap = (value: string): string => {
  const data = value.split('~~~~~~~~~').map((item) => {
    return item;
  });
  const res = data.map((item) => {
    const d = item.replace('||||', ':').replace('####', ':').split(':');
    return d[2];
  });

  return res.toString()
}