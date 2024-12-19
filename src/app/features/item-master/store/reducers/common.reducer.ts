import { UNSPSCSource } from '../../modal/ag-grid.constants';
import { CommonActionsEnum, UnmasteredActionsEnum } from '../actions';

declare let jsonata: any;
export interface TreeViewState {
  rootNodes: any;
  loading?: boolean;
  searchLoading?: boolean;
  dataMode?: string;
  searchedNodes?: any;
}

export interface Loaders {
  getUnmastered?: boolean;
  saveForLater?: boolean;
  submit?: boolean;
  changeTaskStatus?: boolean;
  attributeExtensions?: boolean;
}
export interface RejectLogState {
  log: any;
  loading?: boolean;
}
export interface CommonState {
  changeLog: any;
  changeLogLoader: boolean;
  unmasteredData: any;
  attributeExtensions: any;
  updateMasteredRecordLoader: boolean;
  treeView?: TreeViewState;
  loaders?: Loaders;
  rejectLog: RejectLogState;
}

export const initialTreeState: TreeViewState = {
  rootNodes: {},
  loading: false,
  searchLoading: false,
  dataMode: 'ALL',
  searchedNodes: {}
};

export const initialLoaders: Loaders = {
  getUnmastered: undefined,
  saveForLater: undefined,
  submit: undefined,
  changeTaskStatus: undefined
};

export const initialRejectLogState: RejectLogState = {
  log: null,
  loading: false
};

export const initialState: CommonState = {
  changeLog: null,
  changeLogLoader: false,
  unmasteredData: null,
  attributeExtensions: null,
  updateMasteredRecordLoader: false,
  treeView: initialTreeState,
  loaders: initialLoaders,
  rejectLog: initialRejectLogState
};

export function commonReducer(state: CommonState = initialState, action: any = {}): CommonState {
  switch (action.type) {
    case CommonActionsEnum.GET_UNMASTERED_DATA:
      return {
        ...state,
        unmasteredData: null,
        loaders: {
          ...state.loaders,
          getUnmastered: true
        }
      };
    case CommonActionsEnum.GET_UNMASTERED_DATA_SUCCESS:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          getUnmastered: false
        },
        unmasteredData: getNormalizeData(action.payload)
      };
    case CommonActionsEnum.GET_UNMASTERED_DATA_FAIL:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          getUnmastered: false
        },
        unmasteredData: null
      };
    case UnmasteredActionsEnum.SAVEFORLATER_UNMASTERED_RECORD:
      return {
        ...state,
        unmasteredData: saveUpdatedRecords(action.updatedRecords, JSON.parse(JSON.stringify(state.unmasteredData))),
        loaders: {
          ...state.loaders,
          saveForLater: true
        }
      };
    case UnmasteredActionsEnum.SAVEFORLATER_UNMASTERED_RECORD_SUCCESS:
    case UnmasteredActionsEnum.SAVEFORLATER_UNMASTERED_RECORD_FAIL:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          saveForLater: false
        }
      };
    case CommonActionsEnum.GET_UNSPSC_ATTRIBUTE_EXTENSIONS:
      return {
        ...state,
        attributeExtensions: null,
        loaders: {
          ...state.loaders,
          attributeExtensions: true
        }
      };
    case CommonActionsEnum.GET_UNSPSC_ATTRIBUTE_EXTENSIONS_SUCCESS:
      const forDropdown = `{"attributes":$merge({attributeGroup:[[attributeValue[]],[id[]]]}~>$each(function($v,$k){{$k:$zip($v[0],$v[1]){$[1]:$[0]}}}))}`;
      const forValues = `{"attributes":$merge({id:$}~>$each(function($v,$k){{$k: {"attributeGroup":$v.attributeGroup, "attributeValue": $v.attributeValue}}}))}`;
      return {
        ...state,
        attributeExtensions: [
          jsonata(forDropdown).evaluate(action.payload).attributes,
          jsonata(forValues).evaluate(action.payload).attributes
        ],
        loaders: {
          ...state.loaders,
          attributeExtensions: false
        }
      };
    case CommonActionsEnum.GET_UNSPSC_ATTRIBUTE_EXTENSIONS_FAIL:
      return {
        ...state,
        attributeExtensions: null,
        loaders: {
          ...state.loaders,
          attributeExtensions: false
        }
      };
    case UnmasteredActionsEnum.SUBMIT_UNMASTERED_RECORDS:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          submit: true
        }
      };
    case UnmasteredActionsEnum.SUBMIT_UNMASTERED_RECORDS_SUCCESS:
    case UnmasteredActionsEnum.SUBMIT_UNMASTERED_RECORDS_FAIL:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          submit: false
        }
      };
    case CommonActionsEnum.UPDATE_MASTERED_RECORD_SUCCESS:
    case CommonActionsEnum.UPDATE_MASTERED_RECORD_FAIL:
      return {
        ...state,
        updateMasteredRecordLoader: false
      };
    case CommonActionsEnum.GET_CHANGE_LOG_BY_MAPID:
      return {
        ...state,
        changeLog: null,
        changeLogLoader: true
      };
    case CommonActionsEnum.GET_CHANGE_LOG_BY_MAPID_SUCCESS:
      return {
        ...state,
        changeLog: getNormalizeDataForChangeLog(action.payload),
        changeLogLoader: false
      };
    case CommonActionsEnum.GET_CHANGE_LOG_BY_MAPID_FAIL:
      return {
        ...state,
        changeLog: [],
        changeLogLoader: false
      };
    case CommonActionsEnum.UPDATE_MASTERED_RECORD:
      return {
        ...state,
        updateMasteredRecordLoader: true
      };
    case CommonActionsEnum.GET_UNSPSC_FOR_TREE_VIEW:
      return action.isRoot
        ? {
            ...state,
            treeView: {
              ...state.treeView,
              ...initialTreeState,
              loading: true
            }
          }
        : state;
    case CommonActionsEnum.GET_UNSPSC_FOR_TREE_VIEW_SUCCESS:
      return action.isRoot
        ? {
            ...state,
            treeView: {
              ...state.treeView,
              rootNodes: action.payload,
              loading: false
            }
          }
        : state;
    case CommonActionsEnum.GET_UNSPSC_FOR_TREE_VIEW_FAIL:
      return action.isRoot
        ? {
            ...state,
            treeView: {
              ...state.treeView,
              ...initialTreeState
            }
          }
        : state;
    case CommonActionsEnum.GET_UNSPSC_SEARCH_FOR_TREE_VIEW:
      return {
        ...state,
        treeView: {
          ...state.treeView,
          searchLoading: true,
          searchedNodes: {},
          dataMode: 'SEARCH'
        }
      };
    case CommonActionsEnum.GET_UNSPSC_SEARCH_FOR_TREE_VIEW_SUCCESS:
    case CommonActionsEnum.GET_UNSPSC_SEARCH_FOR_TREE_VIEW_FAIL:
      return {
        ...state,
        treeView: {
          ...state.treeView,
          searchLoading: false,
          searchedNodes: action.payload,
          dataMode: 'SEARCH'
        }
      };
    case CommonActionsEnum.SET_TREE_VIEW_DATA_MODE:
      return {
        ...state,
        treeView: {
          ...state.treeView,
          dataMode: action.payload
        }
      };
    case CommonActionsEnum.GET_REJECT_LOG_BY_ITEM_PGUID:
      return {
        ...state,
        rejectLog: {
          log: null,
          loading: true
        }
      };
    case CommonActionsEnum.GET_REJECT_LOG_BY_ITEM_PGUID_SUCCESS:
      return {
        ...state,
        rejectLog: {
          log: action.payload,
          loading: false
        }
      };
    case CommonActionsEnum.GET_REJECT_LOG_BY_ITEM_PGUID_FAIL:
      return {
        ...state,
        rejectLog: {
          log: null,
          loading: false
        }
      };
    default:
      return state;
  }
}

function saveUpdatedRecords(updatedRecords: any, unmasteredData: any): void {
  for (const record of updatedRecords) {
    const index = unmasteredData.findIndex((item: any) => item.itemPguid === record.itemPguid);
    unmasteredData[index] = record;
  }
  return unmasteredData;
}

function getNormalizeData(data: any): any {
  return data.map((item: any) => {
    return {
      ...item,
      ...clearManualUnspscForDsReRcAndCC(item),
      unspscAttributes: item.unspscAttributes ? JSON.parse(item.unspscAttributes) : []
    };
  });
}

function getNormalizeDataForChangeLog(data: any): any {
  return data.map((item: any) => {
    return {
      ...item,
      unspscAttributes: item.unspscAttributes ? JSON.parse(item.unspscAttributes) : []
    };
  });
}

function clearManualUnspscForDsReRcAndCC(item: any): any {
  const emptyManualObj = {
    unspscCode: '',
    segmentCode: '',
    segmentTitle: '',
    familyCode: '',
    familyTitle: '',
    classCode: '',
    classTitle: '',
    commodityCode: '',
    commodityTitle: '',
    internalItemKey: ''
  };
  if (item.unspscSource === UNSPSCSource.RC || item.unspscSource === UNSPSCSource.CC) {
    if (
      (item.unspscCode && item.unspscSource === UNSPSCSource.RC && item.unspscCode === item.reclassifySuggestedUNSPSC) ||
      (item.unspscSource === UNSPSCSource.CC && item.unspscCode === item.unspscForCC)
    ) {
      return emptyManualObj;
    } else if (item.unspscCode) {
      return { unspscSource: UNSPSCSource.M };
    }
    if (item.clientCorrectionAction === 'Reject') {
      return { unspscSource: '' };
    }
  } else if (item.unspscSource !== UNSPSCSource.M) {
    return emptyManualObj;
  }
  return {};
}
