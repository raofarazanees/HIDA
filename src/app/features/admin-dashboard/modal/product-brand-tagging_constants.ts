import { GridOptions } from 'ag-grid-community';
import { searchCriteriaInternal } from '../store/reducers/common.reducer';

export const BrandTaggingSearchCriteriaOptions: Array<searchCriteriaInternal> = [
  {
    columnLabel: 'Product ID',
    columnName: 'product_id',
    isSelected: false
  },
  {
    columnLabel: 'Product SKU',
    columnName: 'prod_sku',
    isSelected: false
  },
  {
    columnLabel: 'Product Description',
    columnName: 'prod_desc',
    isSelected: false
  },
  {
    columnLabel: 'Product Manf',
    columnName: 'prod_manf',
    isSelected: false
  },
  {
    columnLabel: 'Product Parent Manf',
    columnName: 'prod_parent_manf',
    isSelected: false
  },
  {
    columnLabel: 'Product UNSPSC',
    columnName: 'prod_unspsc_code',
    isSelected: false
  },
  {
    columnLabel: 'Product UNSPSC Desc',
    columnName: 'prod_unspsc_desc',
    isSelected: false
  },
  {
    columnLabel: 'Product Brand',
    columnName: 'prod_brand',
    isSelected: false
  },
  {
    columnLabel: 'Product Conv Factor',
    columnName: 'prod_conv_factor',
    isSelected: false
  },
  {
    columnLabel: 'Master Brand',
    columnName: 'brand_name',
    isSelected: false
  },
  {
    columnLabel: 'Analyst Name',
    columnName: 'brand_analyst_name',
    isSelected: false
  },
  {
    columnLabel: 'Analyst Comments',
    columnName: 'brand_comments',
    isSelected: false
  },
  {
    columnLabel: 'Created Month',
    columnName: 'month_year',
    isSelected: false
  }
];

const ForProductBrandTaggingView = () => [
  { field: 'productID', headerName: 'Product ID', tooltipField: 'productID', width: 110, filter: true },
  { field: 'prodSKU', headerName: 'Product SKU', tooltipField: 'productSKU', width: 130, filter: true },
  { field: 'prodDesc', headerName: 'Product Desc', tooltipField: 'productDesc', width: 200, filter: true },
  { field: 'prodManf', headerName: 'Product Manf', tooltipField: 'productManf', width: 160, filter: true },
  { field: 'prodParentManf', headerName: 'Product Parent Manf', tooltipField: 'productParentManf', width: 180, filter: true },
  { field: 'prodUNSPSCCode', headerName: 'Product UNSPSC', tooltipField: 'prodUNSPSCCode', width: 140, filter: true },
  { field: 'prodUNSPSCDesc', headerName: 'Product UNSPSC Desc', tooltipField: 'productParentManf', width: 170, filter: true },
  { field: 'prodBrand', headerName: 'Product Brand', tooltipField: 'prodBrand', width: 140, filter: true },
  { field: 'prodConvFactor', headerName: 'Product Conv Factor', tooltipField: 'prodBrand', width: 130, filter: true },
  { field: 'masterBrand', headerName: 'Master Brand', tooltipField: 'masterBrand', width: 150, filter: true },
  { field: 'analystName', headerName: 'Analyst Name', tooltipField: 'analystName', width: 140, filter: true },
  { field: 'analystComments', headerName: 'Comment', tooltipField: 'comments', width: 140, filter: true }
];

export function ForProductBrandTaggingReview(height: any): GridOptions {
  return {
    columnDefs: [...ForProductBrandTaggingView()],
    rowData: [],
    pagination: true,
    paginationPageSize: 20,
    defaultColDef: {
      sortable: true,
      resizable: true,
      filter: false
    },
    rowHeight: height,
    overlayNoRowsTemplate: 'There are no records to show.'
  };
}
