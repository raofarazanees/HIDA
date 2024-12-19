import { CommonActionsEnum } from '../actions';
export interface FileUploadState {
  loading?: boolean;
  response?: any;
}

export interface UploadedFileHistoryState {
  loading?: boolean;
  response?: any;
  detailsLoading?: boolean;
  detailsResponse?: any;
}

export interface searchCriteriaInternal {
  columnName: string;
  columnLabel?: string;
  isSelected?: boolean;
  searchText?: string;
  completeDate?: string;
  dropdownValues?: string[] | number[] | any[],
  inputType?: string | InputType;
  dateRange?: any,
  alternetName?: string;
  isContainSearch?: boolean;
  containSearchType?: string;
  isAllowNull?: boolean;
  isAllowFloat?: boolean;
}

export enum InputType {
  Text = '',
  Date = 'datepicker',
  RangeInput = 'rangeInput',
  Select = 'dropdown',
  RangeDatepicker = 'rangePicker',

}

export class ProductSearchCriteria {
  initiatedByUserName?: string;
  initiatedByUserEmail?: string;
  searchCondition: string;
  userRole?: string;
  searchCriteria: searchCriteriaInternal[];
  public static default = (): ProductSearchCriteria => {
    return {
      initiatedByUserName: '',
      searchCondition: 'AND',
      searchCriteria: [
        {
          columnLabel: '',
          columnName: '',
          searchText: '',
          containSearchType: '',
          dateRange: ''
        }
      ]
    };
  };
}

export interface CommonState {
  selectedWidget: any;
  closeDrawerAt: number;
  reclassifiedFileUpload: FileUploadState;
  attributeFileUpload: FileUploadState;
  unspscClientCorrectionFileUpload: FileUploadState;
  facilityTypeCVsFileUpload: FileUploadState;
  manufacturerCVsFileUpload: FileUploadState;
  manufacturerParentChildFileUpload: FileUploadState;
  i2pItemPairsForResolutionFileUpload: FileUploadState;
  uploadedFileHistory: UploadedFileHistoryState;
  productAttributeFileUpload: FileUploadState;
  activeAttributes: ActiveAttributes;
  productDownloadFilter: ProductSearchCriteria;
  productManageGraphUpload: FileUploadState;
  ProductGraphMergeUnMergedFilter: ProductSearchCriteria;
  ItemToProductIncrementalProcess: FileUploadState;
  GraphItemProductView: GraphProductItemViewModal,
  closeDialogAt: number;
  uomFileLoading: boolean;
  brandFeatureSuggestionFileUpload: FileUploadState;
}

export const initialFileUpload: FileUploadState = {
  loading: false,
  response: null
};

export const initialUploadedFileHistory: UploadedFileHistoryState = {
  loading: false,
  response: null,
  detailsLoading: false,
  detailsResponse: null
};

export interface Attribute {
  id: number;
  attributeType: string;
  attributeLabel: string;
}


export interface GraphProductItem {
  distributorName: string;
  itemPGUID: string;
  itemKey: string;
  manfKey: string;
  manfDesc: string;
  stdManfDesc: string;
  stdParentManf: string;
  itemDesc: string;
  itemUNSPSC: string;
  itemUNSPSCDesc: string;
  productID: number | string;
  productDesc: string;
  productSKU: string | number;
  productManf: string;
  productParentManf: string;
  productUNSPSC: string;
  productUNSPSCDesc: string;
  analystName: string;
  comments: string
}



export interface ActiveAttributes {
  loading?: boolean;
  response?: Array<Attribute>;
}

export const initialActiveAttributes: ActiveAttributes = {
  loading: false,
  response: null
};

export interface GraphProductItemViewModal {
  loading?: boolean;
  response?: Array<GraphProductItem>;
}

export const InitialGraphProductItem: GraphProductItemViewModal = {
  loading: false,
  response: null
}

export const initialState: CommonState = {
  selectedWidget: null,
  closeDrawerAt: 0,
  reclassifiedFileUpload: initialFileUpload,
  attributeFileUpload: initialFileUpload,
  unspscClientCorrectionFileUpload: initialFileUpload,
  facilityTypeCVsFileUpload: initialFileUpload,
  manufacturerCVsFileUpload: initialFileUpload,
  manufacturerParentChildFileUpload: initialFileUpload,
  i2pItemPairsForResolutionFileUpload: initialFileUpload,
  uploadedFileHistory: initialUploadedFileHistory,
  productAttributeFileUpload: initialFileUpload,
  activeAttributes: initialActiveAttributes,
  productDownloadFilter: ProductSearchCriteria.default(),
  productManageGraphUpload: initialFileUpload,
  ProductGraphMergeUnMergedFilter: ProductSearchCriteria.default(),
  ItemToProductIncrementalProcess: initialFileUpload,
  GraphItemProductView: InitialGraphProductItem,
  closeDialogAt: 0,
  uomFileLoading: false,
  brandFeatureSuggestionFileUpload: initialFileUpload,
};

export function commonReducer(state: CommonState = initialState, action: any): CommonState {
  switch (action.type) {
    case CommonActionsEnum.WIDGET_SELECTION_CHANGE:
      return {
        ...state,
        selectedWidget: action.payload,
        reclassifiedFileUpload: initialFileUpload,
        unspscClientCorrectionFileUpload: initialFileUpload,
        facilityTypeCVsFileUpload: initialFileUpload,
        manufacturerCVsFileUpload: initialFileUpload,
        manufacturerParentChildFileUpload: initialFileUpload,
        uploadedFileHistory: initialUploadedFileHistory,
        closeDialogAt: 0
      };
    case CommonActionsEnum.CLOSE_DRAWER_AT:
      return {
        ...state,
        closeDrawerAt: action.time,
        closeDialogAt: 0
      };
    case CommonActionsEnum.CLOSE_DIALOG_AT:
      return {
        ...state,
        closeDialogAt: action.time
      };
    case CommonActionsEnum.UPLOAD_UNSPSC_RECLASSIFICATION_FILE:
      return {
        ...state,
        reclassifiedFileUpload: {
          ...state.reclassifiedFileUpload,
          ...initialFileUpload,
          loading: true
        }
      };
    case CommonActionsEnum.UPLOAD_UNSPSC_RECLASSIFICATION_FILE_SUCCESS:
    case CommonActionsEnum.UPLOAD_UNSPSC_RECLASSIFICATION_FILE_FAIL:
      return {
        ...state,
        reclassifiedFileUpload: {
          response: action.payload,
          loading: false
        }
      };
    case CommonActionsEnum.UPLOAD_ATTRIBUTE_MASTER_FILE:
      return {
        ...state,
        attributeFileUpload: {
          ...state.attributeFileUpload,
          ...initialFileUpload,
          loading: true
        }
      };
    case CommonActionsEnum.UPLOAD_ATTRIBUTE_MASTER_FILE_SUCCESS:
    case CommonActionsEnum.UPLOAD_ATTRIBUTE_MASTER_FILE_FAIL:
      return {
        ...state,
        attributeFileUpload: {
          response: action.payload,
          loading: false
        }
      };
    case CommonActionsEnum.FACILITY_TYPE_CVS_UPLOAD_FILE:
      return {
        ...state,
        facilityTypeCVsFileUpload: {
          ...state.facilityTypeCVsFileUpload,
          ...initialFileUpload,
          loading: true
        }
      };
    case CommonActionsEnum.FACILITY_TYPE_CVS_UPLOAD_FILE_SUCCESS:
    case CommonActionsEnum.FACILITY_TYPE_CVS_UPLOAD_FILE_FAIL:
      return {
        ...state,
        facilityTypeCVsFileUpload: {
          response: action.payload,
          loading: false
        }
      };
    case CommonActionsEnum.MANUFACTURER_CVS_UPLOAD_FILE:
      return {
        ...state,
        manufacturerCVsFileUpload: {
          ...state.manufacturerCVsFileUpload,
          ...initialFileUpload,
          loading: true
        }
      };
    case CommonActionsEnum.MANUFACTURER_CVS_UPLOAD_FILE_SUCCESS:
    case CommonActionsEnum.MANUFACTURER_CVS_UPLOAD_FILE_FAIL:
      return {
        ...state,
        manufacturerCVsFileUpload: {
          response: action.payload,
          loading: false
        }
      };
    case CommonActionsEnum.MANUFACTURER_PARENT_CHILD_UPLOAD_FILE:
      return {
        ...state,
        manufacturerParentChildFileUpload: {
          ...state.manufacturerParentChildFileUpload,
          ...initialFileUpload,
          loading: true
        }
      };
    case CommonActionsEnum.MANUFACTURER_PARENT_CHILD_UPLOAD_FILE_SUCCESS:
    case CommonActionsEnum.MANUFACTURER_PARENT_CHILD_UPLOAD_FILE_FAIL:
      return {
        ...state,
        manufacturerParentChildFileUpload: {
          response: action.payload,
          loading: false
        }
      };
    case CommonActionsEnum.I2P_ITEM_PAIRS_FOR_RESOLUTION_FILE_UPLOAD_FILE:
      return {
        ...state,
        i2pItemPairsForResolutionFileUpload: {
          ...state.i2pItemPairsForResolutionFileUpload,
          ...initialFileUpload,
          loading: true
        }
      };
    case CommonActionsEnum.I2P_ITEM_PAIRS_FOR_RESOLUTION_FILE_UPLOAD_FILE_SUCCESS:
    case CommonActionsEnum.I2P_ITEM_PAIRS_FOR_RESOLUTION_FILE_UPLOAD_FILE_FAIL:
      return {
        ...state,
        i2pItemPairsForResolutionFileUpload: {
          response: action.payload,
          loading: false
        }
      };
    case CommonActionsEnum.GET_UPLOADED_FILE_HISTORY:
      return {
        ...state,
        uploadedFileHistory: {
          ...initialUploadedFileHistory,
          loading: true
        }
      };
    case CommonActionsEnum.GET_UPLOADED_FILE_HISTORY_SUCCESS:
      return {
        ...state,
        uploadedFileHistory: {
          ...initialUploadedFileHistory,
          response: action.payload.map((item: any) => ({
            ...item,
            statusCode: ['', 'Initial', 'AvailableInS3', 'In Progress', 'Success', 'Failed'].indexOf(item.status)
          }))
        }
      };
    case CommonActionsEnum.GET_UPLOADED_FILE_HISTORY_FAIL:
      return {
        ...state,
        uploadedFileHistory: {
          ...initialUploadedFileHistory
        }
      };
    case CommonActionsEnum.GET_UPLOADED_FILE_DETAILS:
      return {
        ...state,
        uploadedFileHistory: {
          ...state.uploadedFileHistory,
          detailsLoading: true,
          detailsResponse: null
        }
      };
    case CommonActionsEnum.GET_UPLOADED_FILE_DETAILS_SUCCESS:
      return {
        ...state,
        uploadedFileHistory: {
          ...state.uploadedFileHistory,
          detailsLoading: false,
          detailsResponse: action.payload
        }
      };
    case CommonActionsEnum.GET_UPLOADED_FILE_DETAILS_FAIL:
      return {
        ...state,
        uploadedFileHistory: {
          ...state.uploadedFileHistory,
          detailsLoading: false,
          detailsResponse: null
        }
      };
    case CommonActionsEnum.GET_ACTIVE_ATTRIBUTE_MASTER_SUCCESS:
      return {
        ...state,
        activeAttributes: {
          ...state.activeAttributes,
          response: [...action.payload]
        }
      };
    case CommonActionsEnum.ADD_SEARCH_CRITERIA_PRODUCT_ATTRIBUTE:
      let searchCriteria;
      if (action.payload.action == 'add') {
        searchCriteria = [...state.productDownloadFilter.searchCriteria, action.payload.data];
      } else {
        const searchCriteriaData = [...state.productDownloadFilter.searchCriteria];
        searchCriteriaData.splice(action.payload.index, 1);
        searchCriteria = [...searchCriteriaData];
      }
      return {
        ...state,
        productDownloadFilter: {
          ...state.productDownloadFilter,
          searchCriteria: searchCriteria
        }
      };
    case CommonActionsEnum.DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE:
      return {
        ...state,
        productAttributeFileUpload: {
          loading: true
        }
      };
    case CommonActionsEnum.DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_FAIL:
      return {
        ...state,
        productAttributeFileUpload: {
          loading: false
        },
        productDownloadFilter: {
          ...state.productDownloadFilter
        }
      };
    case CommonActionsEnum.UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_FAIL:
      return {
        ...state,
        productAttributeFileUpload: {
          loading: false
        }
      };
    case CommonActionsEnum.UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE:
      return {
        ...state,
        productAttributeFileUpload: {
          loading: true
        }
      };
    case CommonActionsEnum.UPLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_SUCCESS:
      return {
        ...state,
        productAttributeFileUpload: {
          loading: false
        }
      };
    case CommonActionsEnum.DOWNLOAD_PRODUCT_ATTRIBUTE_TAGGING_FILE_SUCCESS:
      return {
        ...state,
        productAttributeFileUpload: {
          loading: false
        },
        productDownloadFilter: ProductSearchCriteria.default()
      };
    case CommonActionsEnum.CHANGE_CRITERIA_PRODUCT_ATTRIBUTE_VALUE:
      let searchCriteriaData: ProductSearchCriteria = JSON.parse(JSON.stringify(state.productDownloadFilter));
      const index = action.payload?.index;
      if (action.payload.type == 'select') {
        searchCriteriaData.searchCriteria[index].columnName = action.payload.value;
        searchCriteriaData.searchCriteria[index].searchText = '';

      } else if (action.payload.type == 'input') {
        searchCriteriaData.searchCriteria[index].searchText = action.payload.value;
      } else {
        searchCriteriaData.searchCondition = action.payload.value;
      }

      return {
        ...state,
        productDownloadFilter: {
          ...state.productDownloadFilter,
          ...searchCriteriaData
        }
      };

    case CommonActionsEnum.UPLOAD_PRODUCT_GRAPH_MANAGE_FILE:
      return {
        ...state,
        productManageGraphUpload: {
          loading: true
        }
      };
    case CommonActionsEnum.UPLOAD_PRODUCT_GRAPH_MANAGE_FILE_SUCCESS:
      return {
        ...state,
        productManageGraphUpload: {
          loading: false
        }
      };
    case CommonActionsEnum.UPLOAD_PRODUCT_GRAPH_MANAGE_FILE_FAIL:
      return {
        ...state,
        productManageGraphUpload: {
          loading: false
        },
        ProductGraphMergeUnMergedFilter: {
          ...state.ProductGraphMergeUnMergedFilter
        }
      };

    case CommonActionsEnum.SEARCH_CRITERIA_PRODUCT_GRAPH_MERGE_UNMERGED:
      let searchCriteriaGraph;
      if (action.payload.action == 'add') {
        searchCriteriaGraph = [...state.ProductGraphMergeUnMergedFilter.searchCriteria, action.payload.data];
      } else {
        const searchCriteriaData = [...state.ProductGraphMergeUnMergedFilter.searchCriteria];
        searchCriteriaData.splice(action.payload.index, 1);
        searchCriteriaGraph = [...searchCriteriaData];
      }
      return {
        ...state,
        ProductGraphMergeUnMergedFilter: {
          ...state.ProductGraphMergeUnMergedFilter,
          searchCriteria: searchCriteriaGraph
        }
      };
    case CommonActionsEnum.CHANGE_CRITERIA_PRODUCT_GRAPH_FILTER_VALUE:
      let searchCriteriaDataGraph: ProductSearchCriteria = JSON.parse(JSON.stringify(state.ProductGraphMergeUnMergedFilter));
      const i = action.payload?.index;
      if (action.payload.type == 'select') {
        searchCriteriaDataGraph.searchCriteria[i].columnName = action.payload.value;
        searchCriteriaDataGraph.searchCriteria[i].searchText = '';
      } else if (action.payload.type == 'input') {
        searchCriteriaDataGraph.searchCriteria[i].searchText = action.payload.value;
      } else {
        searchCriteriaDataGraph.searchCondition = action.payload.value;
      }

      return {
        ...state,
        ProductGraphMergeUnMergedFilter: {
          ...state.ProductGraphMergeUnMergedFilter,
          ...searchCriteriaDataGraph
        }
      };

    case CommonActionsEnum.DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE:
      return {
        ...state,
        productManageGraphUpload: {
          ...state.productManageGraphUpload,
          loading: true
        }
      };
    case CommonActionsEnum.DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE_SUCCESS:
      return {
        ...state,
        productManageGraphUpload: {
          loading: false
        },
        ProductGraphMergeUnMergedFilter: ProductSearchCriteria.default(),
        GraphItemProductView: {
          loading: false,
          response: null
        }
      };
    case CommonActionsEnum.DOWNLOAD_PRODUCT_GRAPH_MERGE_UNMERGED_FILE_FAIL:
      return {
        ...state,
        productManageGraphUpload: {
          loading: false
        },
        ProductGraphMergeUnMergedFilter: {
          ...state.ProductGraphMergeUnMergedFilter
        }
      };
    case CommonActionsEnum.GET_GRAPH_PRODUCT_ITEM_VIEW:
      return {
        ...state,
        GraphItemProductView: {
          ...state.GraphItemProductView,
          loading: true,
          response: null
        }
      };
    case CommonActionsEnum.GET_GRAPH_PRODUCT_ITEM_VIEW_SUCCESS:
      return {
        ...state,
        GraphItemProductView: {
          response: action.payload,
          loading: false
        },
        ProductGraphMergeUnMergedFilter: {
          ...state.ProductGraphMergeUnMergedFilter
        }
      };
    case CommonActionsEnum.GET_GRAPH_PRODUCT_ITEM_VIEW_FAIL:
      return {
        ...state,
        GraphItemProductView: {
          response: null,
          loading: false
        },
        ProductGraphMergeUnMergedFilter: {
          ...state.ProductGraphMergeUnMergedFilter
        }
      };
    case CommonActionsEnum.DOWNLOAD_UOM_DATA_FILE:
      return {
        ...state,
        uomFileLoading: true
      };
    case CommonActionsEnum.DOWNLOAD_UOM_DATA_FILE_SUCCESS:
      return {
        ...state,
        uomFileLoading: false
      };
    case CommonActionsEnum.DOWNLOAD_UOM_DATA_FILE_FAIL:
      return {
        ...state,
        uomFileLoading: false
      };
    default:
      return state;

    case CommonActionsEnum.UPLOAD_BRAND_SUGGESTION_FILE_UPLOAD_FILE:
      return {
        ...state,
        brandFeatureSuggestionFileUpload: {
          ...state.brandFeatureSuggestionFileUpload,
          ...initialFileUpload,
          loading: true
        }
      };
    case CommonActionsEnum.UPLOAD_BRAND_SUGGESTION_FILE_UPLOAD_FILE_SUCCESS:
    case CommonActionsEnum.UPLOAD_BRAND_SUGGESTION_FILE_UPLOAD_FILE_FAIL:
      return {
        ...state,
        brandFeatureSuggestionFileUpload: {
          response: action.payload,
          loading: false
        }
      };
  }
}

//ASP tool and UNSPSC Tool state moved to product staging file due to new method implementation..