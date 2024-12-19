import { CommonActionsEnum } from '../actions';
export interface CommonState {
  ontologyMappings: [];
  loading: boolean;
  changeLog: any;
  changeLogLoader: boolean;
  updateMasteredRecordLoader: boolean;
}

export const initialState: CommonState = {
  ontologyMappings: [],
  loading: false,
  changeLog: null,
  changeLogLoader: false,
  updateMasteredRecordLoader: false
};

export function commonReducer(state: CommonState = initialState, action: any): CommonState {
  switch (action.type) {
    case CommonActionsEnum.GET_ONTOLOGY_MAPPINGS:
      return {
        ...state,
        ontologyMappings: [],
        loading: true
      };
    case CommonActionsEnum.GET_ONTOLOGY_MAPPINGS_SUCCESS:
      return {
        ...state,
        ontologyMappings: action.payload,
        loading: false
      };
    case CommonActionsEnum.GET_ONTOLOGY_MAPPINGS_FAIL:
      return {
        ...state,
        ontologyMappings: [],
        loading: false
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
        changeLog: action.payload,
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
    case CommonActionsEnum.UPDATE_MASTERED_RECORD_SUCCESS:
      return {
        ...state,
        updateMasteredRecordLoader: false
      };
    case CommonActionsEnum.UPDATE_MASTERED_RECORD_FAIL:
      return {
        ...state,
        updateMasteredRecordLoader: false
      };
    default:
      return state;
  }
}
