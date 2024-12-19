import { CheckboxSelectionCallbackParams, ColDef, GridOptions } from 'ag-grid-community';
import { ProductStagingInterface } from './../store/reducers/product-staging.reducer';

const ForProductStagingView= ():ColDef[] => [
    { field: 'productID', headerName: 'Product ID', tooltipField: 'productID', width: 140, filter: true, headerCheckboxSelection: true, checkboxSelection: true},  
    { field: 'prodSKU', headerName: 'Product SKU', tooltipField: 'productSKU', width: 130, filter: true },  
    { field: 'prodDesc', headerName: 'Product Description', tooltipField: 'productDesc', width: 200, filter: true },  
    { field: 'prodManf', headerName: 'Product Manf', tooltipField: 'productManf', width: 150, filter: true },  
    { field: 'prodParentManf', headerName: 'Product Parent Manf', tooltipField: 'productParentManf', width: 180, filter: true }, 
    { field: 'prodBrandMastered', headerName: 'Product Brand Master', tooltipField: 'prodBrandMastered', width: 160, filter: true },   
    { field: 'currentUNSPSCCode', headerName: 'Current UNSPSC Code', tooltipField: 'prodUNSPSCCode', width: 170, filter: true }, 
    { field: 'currentUNSPSCDesc', headerName: 'Current UNSPSC Desc', tooltipField: 'currentUNSPSCDesc', width: 170, filter: true }, 
    { field: 'prodConvFactor', headerName: 'Product Conv Factor', tooltipField: 'prodConvFactor', width: 140, filter: true },  
    { field: 'unspscAnalystName', headerName: 'Analyst Name', tooltipField: 'analystName', width: 140, filter: true }, 
    { field: 'unspscComments', headerName: 'Comments', tooltipField: 'comments', width: 140, filter: true }  
  ];

  
  export function ForProductStagingReview(height: any): GridOptions {
    return {
      columnDefs: [...ForProductStagingView()],
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
  