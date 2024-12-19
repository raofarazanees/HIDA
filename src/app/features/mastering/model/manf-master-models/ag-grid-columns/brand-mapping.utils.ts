import { ColDef, GridOptions } from "ag-grid-community";
import { commonAgGridOption, rowStyle } from "./row-style.utils";
import { cdxAgGridHeaderStyle, logIconColumn } from "./parent-manf-column.constants";
import { createUpdateColumn } from "./market-master.utils";

export function BrandMappingGridOptions(height: any, scope, readOnly = false): GridOptions {
    return {
      columnDefs: [...BrandMappingColumn(scope,readOnly)],
      stopEditingWhenCellsLoseFocus:true,
      getRowStyle: (params) => rowStyle(params, scope),
      ...commonAgGridOption(),
    };
  }

  const BrandMappingColumn = (scope,readOnly:boolean): ColDef[] => [
    ...logIconColumn(scope,true,false),
    {
        field: 'brandMapID',
        headerName: 'Brand Map ID',
        tooltipField: 'brandMapID',
        headerTooltip: 'Unique ID assigned to Brand Mapping',
        width: 120,
        filter: true,
        headerClass: cdxAgGridHeaderStyle,
        hide:true
      },
      {
        field: 'brandID',
        headerName: 'Brand ID',
        headerTooltip: 'ID of Master Brand',
        tooltipField: 'brandID',
        width: 100,
        filter: true,
        headerClass: cdxAgGridHeaderStyle,
        hide:true,
        suppressKeyboardEvent: () => true
      },
      {
        field: 'brandname',
        headerName: 'Brand Name',
        headerTooltip: 'Name of Master Brand',
        tooltipField: 'brandname',
        width: 189,
        filter: true,
        headerClass: cdxAgGridHeaderStyle,
        cellRenderer:readOnly ? '' : 'typeHeadEditor',
        cellEditorParams: {
          mappingOptions: [],
          typeHeadRenderFor: 'brandMasterInline',
          onRecordsCreateClick: (node: any,typedText?:string) => {
            scope.openCreateBrandCvModel(node,typedText);
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
            field: 'manfID',
            headerName: 'Child Manf ID',
            headerTooltip: 'ID of Master Child Manufacturer',
            tooltipField: 'manfID',
            width: 120,
            filter: true,
            headerClass: cdxAgGridHeaderStyle,
            hide:true,
            suppressKeyboardEvent: () => true
        
          },
          {
            field: 'manfName',
            headerName: 'Child Manufacturer Name',
            headerTooltip: 'Name of Master Child Manufacturer',
            tooltipField: 'manfName',
            width: 180,
            filter: true,
            headerClass: cdxAgGridHeaderStyle,
            cellRenderer: readOnly ? '' : 'typeHeadEditor',
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
            cellClass: (params) => {
              return ( !params.value && params.data?.isModified )
                ? 'required-cell-inline' 
                :'editable-cell-comment';
            },
            suppressKeyboardEvent: () => false
        
          },
          {
            field: 'childDisplayName',
            headerName: 'Child Display Name',
            headerTooltip: 'Display Name of Master Child Manufacturer',
            tooltipField: 'childDisplayName',
            width: 220,
            filter: true,
            hide:true,
            headerClass: cdxAgGridHeaderStyle,
          },
          {
            field: 'parentManfID',
            headerName: 'Parent Manf ID',
            headerTooltip: 'ID of Parent Manufacturer assigned to Child Manufacturer',
            tooltipField: 'parentManfID',
            width: 120,
            filter: true,
            headerClass: cdxAgGridHeaderStyle,
            hide:true,
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
            hide:true,
        
          },
          {
            field: 'parentDisplayName',
            headerName: 'Parent Display Name',
            headerTooltip: 'Display Name of Master Parent Manufacturer assigned to Master Child Manufacturer',
            tooltipField: 'parentDisplayName',
            width: 220,
            filter: true,
            hide:true,
            headerClass: cdxAgGridHeaderStyle,
          },
          {
            field: 'topParentManfID',
            headerName: 'Top Parent Manf ID',
            headerTooltip: 'ID of Top Parent Master Manufacturer based on Master Manufacturer Parent Child relationship',
            tooltipField: 'topParentManfID',
            width: 155,
            filter: true,
            headerClass: cdxAgGridHeaderStyle,
            hide:true,
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
            hide:true,
          },
          {
            field: 'topParentDisplayName',
            headerName: 'Top Parent Display Name',
            headerTooltip: 'Display Name of Top Parent Master Manufacturer based on Master Manufacturer Parent Child relationship',
            tooltipField: 'topParentDisplayName',
            width: 220,
            filter: true,
            hide:true,
            headerClass: cdxAgGridHeaderStyle,
          },
          {
            field: 'marketID',
            headerName: 'Market ID',
            headerTooltip: 'ID assigned to Master Market',
            tooltipField: 'marketID',
            width: 100,
            filter: true,
            headerClass: cdxAgGridHeaderStyle,
            hide:true,
            suppressKeyboardEvent: () => true
        
          },
          {
            field: 'marketName',
            headerName: 'Market Name',
            headerTooltip: 'Master Market Name',
            tooltipField: 'marketName',
            width: 200,
            filter: true,
            headerClass: cdxAgGridHeaderStyle,
            cellRenderer: readOnly ? '' : 'typeHeadEditor',
            cellEditorParams: {
              mappingOptions: [],
              typeHeadRenderFor: 'marketMasterInline',
              onRecordsCreateClick: (node: any,typedText?:string) => {
                scope.openMarketMasterDialog(node,typedText);
              }
            },
            onCellValueChanged: (rowNode: any): void => {
              scope.updateValue(rowNode.node);
            },
            cellClass: (params) => {
              return ( !params.value && params.data?.isModified )
                ? 'required-cell-inline' 
                :'editable-cell-comment';
            },
            suppressKeyboardEvent: () => true
          },
          {
            field: 'submarketName',
            headerName: 'Submarket Name',
            headerTooltip: 'Master Submarket Name',
            tooltipField: 'submarketName',
            width: 180,
            filter: true,
            headerClass: cdxAgGridHeaderStyle,
            cellRenderer:readOnly ? '' :  'typeHeadEditor',
            cellEditorParams: {
              mappingOptions: [],
              typeHeadRenderFor: 'submarketMasterInline',
              onRecordsCreateClick: (node: any,typedText?:string) => {
                scope.openMarketMasterDialog(node,typedText);
              }
            },
            onCellValueChanged: (rowNode: any): void => {
              scope.updateValue(rowNode.node);
            },
            cellClass: (params) => {
              return ( !params.value && params.data?.isModified )
                ? 'required-cell-inline' 
                :'editable-cell-comment';
            },
            suppressKeyboardEvent: () => true,
            hide:true
        
          },
          // {
          //   field: 'rank',
          //   headerName: 'Rank',
          //   headerTooltip: 'Rank',
          //   tooltipField: 'rank',
          //   width: 90,
          //   minWidth:80,
          //   filter: true,
          //   headerClass: cdxAgGridHeaderStyle,
          //   cellRenderer: 'inlineEdit',
          //   cellRendererParams: {
          //     cellRenderedFor: 'input',
          //     inputValidation: {
          //       maxLength: 4,
          //       minLength: 0,
          //       isNumber: true
          //     }
          //   },
          //   onCellValueChanged: (rowNode: any): void => {
          //     scope.updateValue(rowNode.node);
          //   },
          //   suppressKeyboardEvent: () => true
          // },
        {
          field: 'isBrandMapActive',
          headerName: 'Is Map Active?',
          tooltipField: 'isBrandMapActive',
          headerTooltip:'Status of Brand Mapping',
          width: 100,
          filter: true,
          headerClass: cdxAgGridHeaderStyle,
          cellRenderer:readOnly ? '' :  'inlineEdit',
          cellRendererParams: {
            cellRenderedFor: 'select',
            cellForYesNo:true,
          },
          onCellValueChanged: (rowNode: any): void => {
            scope.updateValue(rowNode.node);
          },
          suppressKeyboardEvent: () => true
              },
        {
            field: 'comments',
            headerName: 'Comments',
            headerTooltip: 'Comments entered as part of Brand Mapping',
            tooltipField: 'comments',
            width: 140,
            filter: true,
            headerClass: cdxAgGridHeaderStyle,
            cellRenderer: readOnly ? '' : 'inlineEdit',
            cellRendererParams: {
              cellRenderedFor: 'input'
            },
            onCellValueChanged: (rowNode: any): void => {
              scope.updateValue(rowNode.node);
            },
            suppressKeyboardEvent: () => true
          },
        ...createUpdateColumn(true,...helpTextForDtColumns)
  ]

  const helpTextForDtColumns = ['Who created the Brand Mapping ?','When was the Brand Mapping created ?','Who updated the Brand Mapping last ?','When was the Brand Mapping last updated ?']