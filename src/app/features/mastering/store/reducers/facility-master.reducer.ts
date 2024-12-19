import { loadingState } from './../../../item-to-product/store/reducers/staging-curation.reducer';
import { Action, State, createReducer, on } from "@ngrx/store";
import { CreateFacilityMasterRecords, CreateFacilityMasterRecordsFail, CreateFacilityMasterRecordsSuccess, GetActiveFacilityMasterRecords, GetActiveFacilityMasterRecordsFail, GetActiveFacilityMasterRecordsSuccess, GetAllFacRecords, GetAllFacRecordsFail, GetAllFacRecordsSuccess, GetFacilityMappedRecordChangeLog, GetFacilityMappedRecordChangeLogFail, GetFacilityMappedRecordChangeLogSuccess, GetFacilityMappedRecords, GetFacilityMappedRecordsFail, GetFacilityMappedRecordsSuccess, GetFacilityMasterRecords, GetFacilityMasterRecordsFail, GetFacilityMasterRecordsSuccess, GetFacilityRecordChangeLog, GetFacilityRecordChangeLogFail, GetFacilityRecordChangeLogSuccess, GetFacilityRecordsForMapping, GetFacilityRecordsForMappingFail, GetFacilityRecordsForMappingSuccess, ManageMappingFacAllRecords, ManageMappingFacAllRecordsFail, ManageMappingFacAllRecordsSuccess, UpdateFacilityMappedRecords, UpdateFacilityMappedRecordsFail, UpdateFacilityMappedRecordsSuccess, UpdateFacilityMasterRecords, UpdateFacilityMasterRecordsFail, UpdateFacilityMasterRecordsSuccess, autoAssignFacilityToRecord, createFacilityMapping, createFacilityMappingFail, createFacilityMappingSuccess, facilityMasterEnum } from "../actions";
import { FacilityMappedRecord, facilityMasterData, facilityMasterState, initialFacilityState } from "../../model/manf-master-models/interface/facility-master-state.interface";

const featureReducer = createReducer(
    initialFacilityState,
    on(GetFacilityMasterRecords, state => ({...state,loadingState:{loading:true}})),
    on(GetFacilityMasterRecordsSuccess,(state, action) => ({...state,loadingState:{loading:false},facilityMasterRecords:action.payload})),
    on(GetFacilityMasterRecordsFail,(state, action) => ({...state,loadingState:{loading:false},facilityMasterRecords:null})),
    on(CreateFacilityMasterRecords, (state) => ({ ...state, loadingState: { loading: true } })),
    on(CreateFacilityMasterRecordsSuccess, (state, action) => ({
      ...state,
      loadingState: { loading: false },
      facilityMasterRecords: { 
        ...state.facilityMasterRecords,
        totalRecords:state.facilityMasterRecords?.totalRecords ? Number(state.facilityMasterRecords.totalRecords) + 1 : 1,
        records: getAllFacRecords(action.payload, JSON.parse(JSON.stringify(state.facilityMasterRecords.records)) )
      },
      activeFacilityMasterRecords:[...state.activeFacilityMasterRecords,{...action.payload}]
    })),
    on(CreateFacilityMasterRecordsFail, (state) => ({ ...state, loadingState: { loading: false } })),
    on(UpdateFacilityMasterRecords, ( state ) => ({ ...state, loadingState:{loading : true}})),
    on(UpdateFacilityMasterRecordsSuccess, ( state, action ) => ({ ...state, loadingState:{loading : false}, 
      facilityMasterRecords: {
            ...state.facilityMasterRecords,
            records: reMappedUpdatedMarketRecords(action.payload, JSON.parse(JSON.stringify(state.facilityMasterRecords.records)))
          }
    })),
    on(UpdateFacilityMasterRecordsFail, ( state ) => ({ ...state, loadingState:{loading : false} })),
    on(GetActiveFacilityMasterRecords, ( state ) => ({ ...state, activeFacilityMasterRecords:[] })),
    on(GetActiveFacilityMasterRecordsSuccess, ( state, action ) => ({ ...state, activeFacilityMasterRecords:action.payload })),
    on(GetActiveFacilityMasterRecordsFail, ( state ) => ({ ...state, activeFacilityMasterRecords:[] })),
    on(GetFacilityRecordsForMapping, state => ({...state,loadingState:{loading:true}})),
    on(GetFacilityRecordsForMappingSuccess,(state, action) => ({...state,loadingState:{loading:false},facilityForMappingRecords:action.payload})),
    on(GetFacilityRecordsForMappingFail,(state, action) => ({...state,loadingState:{loading:false},facilityForMappingRecords:null})),
    on(GetFacilityRecordChangeLog, (state) => ({ ...state, loadingState: { loading: true }, facilityMasterChangeLogRecords: null })),
    on(GetFacilityRecordChangeLogSuccess, (state, action) => ({ ...state, loadingState: { loading: false }, facilityMasterChangeLogRecords: action.payload })),
    on(GetFacilityRecordChangeLogFail, (state) => ({ ...state, loadingState: { loading: false }, facilityMasterChangeLogRecords: null })),
    on(createFacilityMapping, state => ({...state,loadingState:{loading:true}})),
    on(createFacilityMappingSuccess, state => ({...state,loadingState:{loading:false}})),
    on(createFacilityMappingFail, state => ({...state,loadingState:{loading:false}})),
    on(GetFacilityMappedRecords, state => ({...state,loadingState:{loading:true}})),
    on(GetFacilityMappedRecordsSuccess, (state,action) => ({...state,loadingState:{loading:false},facilityMappedResponse:action.payload})),
    on(GetFacilityMappedRecordsFail, state => ({...state,loadingState:{loading:false},facilityMappedResponse:null})),
    on(GetFacilityMappedRecordChangeLog, (state) => ({ ...state, loadingState: { loading: true }, facilityMasterChangeLogRecords: null })),
    on(GetFacilityMappedRecordChangeLogSuccess, (state, action) => ({ ...state, loadingState: { loading: false }, facilityMasterChangeLogRecords: action.payload })),
    on(GetFacilityMappedRecordChangeLogFail, (state) => ({ ...state, loadingState: { loading: false }, facilityMasterChangeLogRecords: null })),
    on(UpdateFacilityMappedRecords, ( state ) => ({ ...state, loadingState:{loading : true}})),
    on(UpdateFacilityMappedRecordsSuccess, ( state, action ) => ({ ...state, loadingState:{loading : false}, 
      facilityMappedResponse: {
            ...state.facilityMappedResponse,
            records: reUpdatedFacilityMappedRecords(action.payload, JSON.parse(JSON.stringify(state.facilityMappedResponse.records)))
          }
    })),
    on(UpdateFacilityMappedRecordsFail, ( state ) => ({ ...state, loadingState:{loading : false} })),
    on(autoAssignFacilityToRecord,(state,action) => ({ ...state, autoAssignRecordFacility:action.payload})),
    on(GetAllFacRecords, state => ({...state,loadingState:{loading:true}})),
    on(GetAllFacRecordsSuccess, (state,action) => ({...state,loadingState:{loading:false},facilityAllRecordsResponse:action.payload})),
    on(GetAllFacRecordsFail, state => ({...state,loadingState:{loading:false},facilityAllRecordsResponse:null})),
    on(ManageMappingFacAllRecords, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: true }, updatedFacRecords: null })),
    on(ManageMappingFacAllRecordsSuccess, (state,action) => ({ ...state, loadingState: { ...state.loadingState,loading: false}, updatedFacRecords: action.payload })),
    on(ManageMappingFacAllRecordsFail, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: false}, updatedFacRecords: null })),
);

export function facilityReducer(state: facilityMasterState | undefined, action: Action) {
    return featureReducer(state, action);
}

function reMappedUpdatedMarketRecords(responseRecords: facilityMasterData[], FacilityMasterData:facilityMasterData[]) {
  FacilityMasterData.forEach(element => {
    delete element['isNewAdded']
  });

  FacilityMasterData.forEach((record, index) => {
    const data = responseRecords.find((el) => el.facilityID === record.facilityID);
    if (data) {
      const updateData = { ...data, isNewAdded: true };
      FacilityMasterData[index] = updateData;
    }
    delete record['isNewAdded'];
  });
  return FacilityMasterData;
}

function reUpdatedFacilityMappedRecords(responseRecords: FacilityMappedRecord[], FacilityMasterData:FacilityMappedRecord[]) {
  FacilityMasterData.forEach(element => {
    delete element['isNewAdded']
  });
  
  FacilityMasterData.forEach((record, index) => {
    const data = responseRecords.find((el) => el.facMapID === record.facMapID);
    if (data) {
      const updateData = { ...data, isNewAdded: true };
      FacilityMasterData[index] = updateData;
    }
    delete record['isNewAdded'];
  });
  return FacilityMasterData;
}

  function getAllFacRecords(newFc,fcRecArray) {
    fcRecArray.forEach(element => {
      delete element['isNewAdded']
    });
    return [newFc,...fcRecArray];
  } 
