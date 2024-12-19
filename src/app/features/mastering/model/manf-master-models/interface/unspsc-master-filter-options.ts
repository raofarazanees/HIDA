import { Params } from '@angular/router';
import { ColDef, GridOptions } from 'ag-grid-community';
import { InputType } from './../../../../admin-dashboard/store/reducers/common.reducer';
import { searchCriteriaInternal } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { cdxAgGridHeaderStyle, logIconColumn } from '../ag-grid-columns/parent-manf-column.constants';
import { ISelectCellEditorParams } from 'ag-grid-community/dist/lib/rendering/cellEditors/selectCellEditor';
import { CommonCreateUpdateOptions } from './common.search-options';
import { commonAgGridOption, rowStyle } from '../ag-grid-columns/row-style.utils';

export const UnspscScopeValues: string[] = ['IN SCOPE', 'OTHER', ''];
export const DefaultYesNoValues: string[] = ['Y', 'N'];

export const UnspscMasterFilterOptions = (): searchCriteriaInternal[] => [
  { columnLabel: 'Level 4 Code', columnName: 'unspsc_code', isSelected: false },
  { columnLabel: 'Level 1 Description', columnName: 'lvl_1_desc', isSelected: false, inputType: InputType.Text },
  { columnLabel: 'Level 2 Description', columnName: 'lvl_2_desc', isSelected: false, inputType: InputType.Text },
  { columnLabel: 'Level 3 Description', columnName: 'lvl_3_desc', isSelected: false, inputType: InputType.Text },
  { columnLabel: 'Level 4 Description', columnName: 'unspsc_description', isSelected: false, inputType: InputType.Text },
  // { columnLabel: 'Level 4 Description', columnName: 'lvl_4_desc', isSelected: false, inputType: InputType.Text },
  { columnLabel: 'UNSPSC Version', columnName: 'unspsc_version', isSelected: false, inputType: InputType.Text },
  { columnLabel: 'Market ID', columnName: 'market_id', isSelected: false, inputType: InputType.Text },
  { columnLabel: 'Market Name', columnName: 'market_name', isSelected: false, inputType: InputType.Text },
  { columnLabel: 'Submarket Name', columnName: 'submarket_name', isSelected: false, inputType: InputType.Text },
  { columnLabel: 'Extrapolation Scope', columnName: 'scope', isSelected: false, inputType: InputType.Select, dropdownValues: UnspscScopeValues,isAllowNull:true },
  {
    columnLabel: 'Clustering Flag',
    columnName: 'clustering_flag',
    isSelected: false,
    inputType: InputType.Select,
    dropdownValues: DefaultYesNoValues
  },
  {
    columnLabel: 'Manual Flag',
    columnName: 'manual_flag',
    isSelected: false,
    inputType: InputType.Select,
    dropdownValues: DefaultYesNoValues
  },
  { columnLabel: 'Products Active', columnName: 'n_products_active', isSelected: false,isContainSearch:true, inputType: InputType.RangeInput,isAllowNull:true },
  // { columnLabel: 'Number of Clients', columnName: 'num_clients', isSelected: false, inputType: InputType.RangeInput,isContainSearch:true,isAllowNull:true },
  { columnLabel: 'Revenue', columnName: 'revenue', isSelected: false, inputType: InputType.RangeInput,isContainSearch:true,isAllowFloat:true,isAllowNull:true },
  { columnLabel: 'Sellable', columnName: 'sellable', isSelected: false, inputType: InputType.Select,dropdownValues:['',...DefaultYesNoValues],isAllowNull:true },
  { columnLabel: 'Non-sellable Reason', columnName: 'non_sellable_reason', isSelected: false, inputType: InputType.Text},
  { columnLabel: 'Last Reviewed By', columnName: 'last_reviewed_by', isSelected: false, inputType: InputType.Text },
  { columnLabel: 'Last Reviewed Date', columnName: 'last_reviewed_date', isSelected: false, inputType: InputType.RangeDatepicker,isContainSearch:true, },
  { columnLabel: 'Brands', columnName: 'brands', isSelected: false, inputType: InputType.Select,dropdownValues:['',...DefaultYesNoValues],isAllowNull:true },
  { columnLabel: 'Attributes', columnName: 'attributes', isSelected: false, inputType: InputType.Select,dropdownValues:['',...DefaultYesNoValues],isAllowNull:true },
  ...CommonCreateUpdateOptions()
];

export function GetUnspscColumns(height: any, scope, readOnly = false): GridOptions {
  return {
    columnDefs: [...getColumnDef(scope,readOnly)],
    ...commonAgGridOption(height),
    getRowStyle: (params) => rowStyle(params, scope),
    suppressRowClickSelection:true,
    rowSelection:'multiple'

  };
}

const getColumnDef = (scope, readOnly:boolean): ColDef[] => [
  ...logIconColumn(scope,true,!readOnly),
  {
    field: 'unspscCodeID',
    headerName: 'UNSPSC Code ID',
    headerTooltip: 'Unique ID assigned to Master UNSPSC',
    tooltipField: 'unspscCodeID',
    width: 140,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true
  },
  {
    field: 'unspscCode',
    headerName: 'Level 4 Code',
    headerTooltip: 'Unique Commodity Code / Level 4 UNSPSC',
    tooltipField: 'unspscCode',
    width: 120,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  // {
  //   field: 'unspscLevel',
  //   headerName: 'UNSPSC Level',
  //   headerTooltip: 'UNSPSC Level',
  //   tooltipField: 'unspscLevel',
  //   width: 110,
  //   filter: true,
  //   headerClass: cdxAgGridHeaderStyle
  // },
  // {
  //   field: 'unspscLevelName',
  //   headerName: 'UNSPSC Level Name',
  //   headerTooltip: 'UNSPSC Level Name',
  //   tooltipField: 'unspscLevelName',
  //   width: 130,
  //   filter: true,
  //   headerClass: cdxAgGridHeaderStyle
  // },
  {
    field: 'unspscDescription',
    headerName: 'Level 4 Desc',
    headerTooltip: 'Description of Commodity Code / Level 4 UNSPSC',
    tooltipField: 'unspscDescription',
    width: 200,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  {
    field: 'marketID',
    headerName: 'Market ID',
    headerTooltip: 'ID of Master Market assigned to Master UNSPSC',
    tooltipField: 'marketID',
    width: 90,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true
  },
  {
    field: 'marketName',
    headerName: 'Market Name',
    headerTooltip: 'Market Name of Master Market assigned to Master UNSPSC',
    tooltipField: 'marketName',
    width: 200,
    minWidth: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    editable: !readOnly,
    cellEditor: readOnly ? '' : 'typeHeadEditor',
    cellClass: (params) => {
      return ( !params?.data.marketName)
        ? 'required-cell typeahead-editable-cell' 
        :'editable-cell-comment typeahead-editable-cell';
    },
    cellEditorParams: {
      mappingOptions: [],
      typeHeadRenderFor:'marketMaster'
    },
    cellRendererParams: (rowNode: any,text?:string) => {
      scope.openMarketMasterDialog(rowNode,text);
    },
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
    
  },
  {
    field: 'submarketName',
    headerName: 'Submarket Name',
    headerTooltip: 'Submarket Name of Master Market assigned to Master UNSPSC',
    tooltipField: 'submarketName',
    width: 180,
    minWidth:140,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    editable: !readOnly,
    cellEditor: readOnly ? '' : 'typeHeadEditor',
    cellEditorParams: {
      mappingOptions: [],
      typeHeadRenderFor:'submarketMaster'
    },
    cellRendererParams: (rowNode: any,text?:string) => {
      scope.openMarketMasterDialog(rowNode,text);
    },
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
    cellClass: (params) => {
      return ( params?.data.marketName && !params?.data.submarketName)
        ? 'required-cell typeahead-editable-cell' 
        :'editable-cell-comment typeahead-editable-cell';
    },
    hide:true
  },
  {
    field: 'level1Desc',
    headerName: 'Level 1 Desc',
    headerTooltip: 'Segment / Level 1 Description of UNSPSC',
    tooltipField: 'level1Desc',
    width: 180,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide:true
  },
  {
    field: 'level2Desc',
    headerName: 'Level 2 Desc',
    headerTooltip: 'Family / Level 2 Description of UNSPSC',
    tooltipField: 'level2Desc',
    width: 120,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide:true
  },
  {
    field: 'level3Desc',
    headerName: 'Level 3 Desc',
    headerTooltip: 'Class / Level 3 Description of UNSPSC',
    tooltipField: 'level3Desc',
    width: 120,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide:true
  },
  // {
  //   field: 'level4Desc',
  //   headerName: 'Level 4 Desc',
  //   headerTooltip: 'Commodity / Level 4 Description of UNSPSC',
  //   tooltipField: 'level4Desc',
  //   width: 120,
  //   filter: true,
  //   headerClass: cdxAgGridHeaderStyle,
  //   hide:true
  // },
  {
    field: 'unspscScope',
    headerName: 'Extrapolation Scope',
    headerTooltip: 'Extrapolation Scope',
    tooltipField: 'unspscScope',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    editable: !readOnly,
    cellEditor: readOnly ? '' : 'agSelectCellEditor',
    cellEditorPopup: false,
    cellEditorParams: {
      values: UnspscScopeValues
    } as ISelectCellEditorParams,
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    }
  },

  {
    field: 'clusteringFlag',
    headerName: 'Clustering Flag',
    headerTooltip: 'Clustering Flag',
    tooltipField: 'clusteringFlag',
    width: 140,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    editable: !readOnly,
    cellEditor: readOnly ? '' : 'agSelectCellEditor',
    cellEditorPopup: false,
    cellEditorParams: {
      values: DefaultYesNoValues
    } as ISelectCellEditorParams,
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
    hide:true
  },
  {
    field: 'manualFlag',
    headerName: 'Manual Flag',
    headerTooltip: 'Manual Flag',
    tooltipField: 'manualFlag',
    width: 130,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    editable: !readOnly,
    cellEditor: readOnly ? '' : 'agSelectCellEditor',
    cellEditorPopup: false,
    cellEditorParams: {
      values: DefaultYesNoValues
    } as ISelectCellEditorParams,
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
    hide:true
  },
  {
    field: 'unspscVersion',
    headerName: 'UNSPSC Version',
    headerTooltip: 'UNSPSC Version',
    tooltipField: 'unspscVersion',
    width: 140,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide:true
  },
  {
    field: 'numProductsActive',
    headerName: 'Products Active',
    headerTooltip: 'Number of active products assigned with Master UNSPSC',
    tooltipField: 'numProductsActive',
    width: 130,
    filter: true,
    headerClass: cdxAgGridHeaderStyle
  },
  // {
  //   field: 'numClients',
  //   headerName: 'Number of Clients',
  //   headerTooltip: 'Number of Clients',
  //   tooltipField: 'numClients',
  //   width: 140,
  //   filter: true,
  //   headerClass: cdxAgGridHeaderStyle,
  // },
  {
    field: 'unspscRevenue',
    headerName: 'Revenue',
    headerTooltip: 'Aggregated UNSPSC revenue of the underlying active products [which is the aggregated all time revenue of the underlying items]',
    tooltipField: 'unspscRevenue',
    width: 130,
    minWidth: 130,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    cellClass:'text-right'
  },
  {
    field: 'isSellable',
    headerName: 'Sellable',
    headerTooltip: 'Sellable',
    tooltipField: 'isSellable',
    width: 100,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    editable: !readOnly,
    cellEditor: readOnly ? '' : 'agSelectCellEditor',
    cellEditorPopup: false,
    cellEditorParams: {
      values: ['',...DefaultYesNoValues]
    } as ISelectCellEditorParams,
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
  },
  {
    field: 'nonSellableReason',
    headerName: 'Non-sellable Reason',
    headerTooltip: 'Non-sellable Reason',
    tooltipField: 'nonSellableReason',
    width: 180,
    filter: true,
    editable: (params) => { return checkIsSellable(params?.data.isSellable,readOnly) },
    headerClass: cdxAgGridHeaderStyle,
    cellClass: (params) => {
      return ( params?.data.isSellable === 'N' && !params.value)
        ? 'required-cell typeahead-editable-cell' 
        :'editable-cell-comment typeahead-editable-cell';
    },
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
  },
//   {
//     field: 'isReviewed',
//     headerName: 'Is Reviewed ?',
//     headerTooltip: 'Mark Master UNSPSC as reviewed (Check) or not reviewed (Uncheck)',
//     tooltipField: 'isReviewed',
//     width: 115,
//     filter: true,
//     cellRenderer: readOnly ? '' : 'checkboxSelector',
//     headerClass: cdxAgGridHeaderStyle,
//     onCellValueChanged: (rowNode: any): void => {
//       scope.updateValue(rowNode.node);
//     },
//     onCellClicked: (node) => {
//        scope.checkIsReview(node);
//     },
//     hide:true
//  },
 {
  field: 'lastReviewedBy',
  headerName: 'Last Reviewed By',
  headerTooltip: 'Who reviewed Master UNSPSC last ?',
  tooltipField: 'lastReviewedBy',
  width: 140,
  filter: true,
  headerClass: cdxAgGridHeaderStyle,
  cellRenderer: readOnly ? '' : 'inlineEdit',
   cellRendererParams: {
      cellRenderedFor: 'select'
    },
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
    cellClass: (params) => {
      return ( params?.data.lastReviewedDate && !params?.data.lastReviewedBy)
        ? 'required-cell-inline-date typeahead-editable-cell' 
        :'editable-cell-comment typeahead-editable-cell';
    }, 
},
 {
  field: 'lastReviewedDate',
  headerName: 'Last Reviewed Date',
  headerTooltip: 'When was Master UNSPSC last reviewed ?',
  width: 150,
  filter: true,
  headerClass: cdxAgGridHeaderStyle,
  cellRenderer: readOnly ? '' : 'inlineEdit',
  cellRendererParams: {
     cellRenderedFor: 'datepicker'
   },
   cellClass: (params) => {
    return ( params?.data.lastReviewedBy && !params?.data.lastReviewedDate)
      ? 'required-cell-inline-date typeahead-editable-cell' 
      :'editable-cell-comment typeahead-editable-cell';
  },
   onCellValueChanged: (rowNode: any): void => {
     scope.updateValue(rowNode.node);
   }
},
  {
    field: 'brands',
    headerName: 'Brands',
    headerTooltip: 'Brands',
    tooltipField: 'brands',
    width: 100,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    editable: !readOnly,
    cellEditor: readOnly ? '' : 'agSelectCellEditor',
    cellEditorPopup: false,
    cellEditorParams: {
      values: ['',...DefaultYesNoValues]
    } as ISelectCellEditorParams,
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },

  },
  {
    field: 'attributes',
    headerName: 'Attributes',
    headerTooltip: 'Attributes',
    tooltipField: 'attributes',
    width: 100,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    editable: !readOnly,
    cellEditor: readOnly ? '' : 'agSelectCellEditor',
    cellEditorPopup: false,
    cellEditorParams: {
      values: ['',...DefaultYesNoValues]
    } as ISelectCellEditorParams,
    onCellValueChanged: (rowNode: any): void => {
      scope.updateValue(rowNode.node);
    },
  },
  {
    field: 'unspscCreatedBy',
    headerName: 'Created By',
    tooltipField: 'unspscCreatedBy',
    headerTooltip:'Who created Master UNSPSC ?',
    width: 150,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide:true,
  },
  {
    field: 'unspscCreatedDate',
    headerName: 'Created Date',
    tooltipField: 'unspscCreatedDate',
    headerTooltip:'When was Master UNSPSC created ?',
    width: 150,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide:true,
  },
  {
    field: 'unspscUpdatedBy',
    headerName: 'Updated By',
    tooltipField: 'unspscUpdatedBy',
    headerTooltip:'Who updated Master UNSPSC ?',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true
  },
  {
    field: 'unspscUpdatedDate',
    headerName: 'Updated Date',
    tooltipField: 'unspscUpdatedDate',
    headerTooltip:'When was Master UNSPSC last updated ?',
    width: 160,
    filter: true,
    headerClass: cdxAgGridHeaderStyle,
    hide: true
  }
];

const checkIsSellable = (params,readOnly):boolean => {
  if(readOnly) {
    return false;
  }
  if(params === 'Y' || params === '') {
    return false;
  }
  return true;
}