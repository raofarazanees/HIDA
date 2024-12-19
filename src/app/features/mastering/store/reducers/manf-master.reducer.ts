import { Action, State, createReducer, on } from '@ngrx/store';
import {
  CloseDialogAt,
  CreateChildManfRecord,
  CreateChildManfRecordFail,
  CreateChildManfRecordSuccess,
  CreateParentManfRecord,
  CreateParentManfRecordFail,
  CreateParentManfRecordSuccess,
  GetAllActiveChildManf,
  GetAllActiveChildManfFail,
  GetAllActiveChildManfSuccess,
  GetAllActiveManfRecords,
  GetAllActiveManfRecordsFail,
  GetAllActiveManfRecordsSuccess,
  GetAllManfRecords,
  GetAllManfRecordsFail,
  GetAllManfRecordsSuccess,
  GetChildParentManfRecords,
  GetChildParentManfRecordsFail,
  GetChildParentManfRecordsSuccess,
  GetParentManfRecords,
  GetParentManfRecordsFail,
  GetParentManfRecordsSuccess,
  ManageMappingAllRecords,
  ManageMappingAllRecordsFail,
  ManageMappingAllRecordsSuccess,
  MasteredTabSearchFormAction,
  UpdateChildParentRecords,
  UpdateChildParentRecordsFail,
  UpdateChildParentRecordsSuccess,
  UpdateParentManfRecords,
  UpdateParentManfRecordsFail,
  UpdateParentManfRecordsSuccess,
  autoAssignManfToRecord,
  createManufacturerMapping,
  createManufacturerMappingFail,
  createManufacturerMappingSuccess,
  downloadParentChildRecordsCsv,
  downloadParentChildRecordsCsvFail,
  downloadParentChildRecordsCsvSuccess,
  getChildChangeLog,
  getChildChangeLogFail,
  getChildChangeLogSuccess,
  getManfForMapping,
  getManfForMappingFail,
  getManfForMappingSuccess,
  getMasteredChangeLog,
  getMasteredChangeLogFail,
  getMasteredChangeLogSuccess,
  getMasteredManfRecords,
  getMasteredManfRecordsFail,
  getMasteredManfRecordsSuccess,
  getParentChildManfRecords,
  getParentChildManfRecordsFail,
  getParentChildManfRecordsSuccess,
  getParentManfChangeLog,
  getParentManfChangeLogSuccess,
  updateMasteredMappedRecords,
  updateMasteredMappedRecordsFail,
  updateMasteredMappedRecordsSuccess
} from '../actions';
import { initialState, manfMasterState } from '../../model/manf-master-models/interface/manf-master.interface';

const featureReducer = createReducer(
  initialState,
  on(CloseDialogAt, (state, action) => ({ ...state, closeDialogAt: { date: action.date, dialogType: action.dialogType } })),
  on(MasteredTabSearchFormAction, (state, action) => ({
    ...state,
    loadingState: { ...state.loadingState },
    masteredTabSearchFormState: { searchText: action.searchText, columnName: action.columnName, searchCondition: action.searchCondition }
  })),
  on(GetParentManfRecords, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: true }, parentManfRecords: null })),
  on(GetParentManfRecordsSuccess, (state, action) => ({ ...state, loadingState: { ...state.loadingState,loading: false}, parentManfRecords: action.payload })),
  on(GetParentManfRecordsFail, (state, action) => ({ ...state, loadingState: { ...state.loadingState,loading: false}, parentManfRecords: null })),
  on(CreateParentManfRecord, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: true } })),
  on(CreateParentManfRecordSuccess, (state, action) => ({
    ...state,
    loadingState: { ...state.loadingState,loading: false},
    parentManfRecords: { ...state.parentManfRecords, records: [{ ...action.payload }, ...state.parentManfRecords.records] },
    activeParentManfRecords: [{ ...action.payload }, ...state.activeParentManfRecords]
  })),
  on(CreateParentManfRecordFail, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: false} })),
  on(UpdateParentManfRecords, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: true } })),
  on(UpdateParentManfRecordsSuccess, (state, action) => ({
    ...state,
    loadingState: { ...state.loadingState,loading: false},
    parentManfRecords: {
      ...state.parentManfRecords,
      records: reMappedUpdatedRecords(action.payload, JSON.parse(JSON.stringify(state.parentManfRecords.records)))
    }
  })),
  on(UpdateParentManfRecordsFail, (state) => ({
    ...state,
    loadingState: { ...state.loadingState,loading: false},
    parentManfRecords: {
      ...state.parentManfRecords,
      records: reMappedUpdatedRecords([], JSON.parse(JSON.stringify(state.parentManfRecords.records)))
    }
  })),
  on(GetAllActiveManfRecords, (state) => ({ ...state,loadingState:{...state.loadingState,parentLoading:true} })),
  on(GetAllActiveManfRecordsSuccess, (state, action) => ({ ...state, activeParentManfRecords: action.payload,loadingState:{...state.loadingState,parentLoading:false} })),
  on(GetAllActiveManfRecordsFail, (state, action) => ({ ...state, activeParentManfRecords: null,loadingState:{...state.loadingState,parentLoading:false} })),
  on(GetChildParentManfRecords, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: true } })),
  on(GetChildParentManfRecordsSuccess, (state, action) => ({
    ...state,
    loadingState: { ...state.loadingState,loading: false},
    childParentManfRecords: action.payload
  })),
  on(GetChildParentManfRecordsFail, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: false}, childParentManfRecords: null })),
  on(CreateChildManfRecord, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: true } })),
  on(CreateChildManfRecordSuccess, (state, action) => ({
    ...state,
    loadingState: { ...state.loadingState,loading: false},
    childParentManfRecords: {
      ...state.parentManfRecords,
      totalRecords: state.childParentManfRecords?.totalRecords ? Number(state.childParentManfRecords.totalRecords) + 1 : 1,
      records: [{ ...action.payload }, ...state.childParentManfRecords.records]
    },
    activeChildManfRecords: [{ ...action.payload }, ...state.activeChildManfRecords]
  })),
  on(CreateChildManfRecordFail, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: false} })),
  on(getParentManfChangeLog, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: true }, ManfChangeLogRecords: null })),
  on(getParentManfChangeLogSuccess, (state, action) => ({
    ...state,
    loadingState: { ...state.loadingState,loading: false},
    ManfChangeLogRecords: action.payload
  })),
  on(getParentManfChangeLog, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: true }, ManfChangeLogRecords: null })),
  on(getChildChangeLog, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: true }, ManfChangeLogRecords: null })),
  on(getChildChangeLogSuccess, (state, action) => ({ ...state, loadingState: { ...state.loadingState,loading: false}, ManfChangeLogRecords: action.payload })),
  on(getChildChangeLogFail, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: false}, ManfChangeLogRecords: null })),
  on(UpdateChildParentRecords, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: true } })),
  on(UpdateChildParentRecordsSuccess, (state, action) => ({
    ...state,
    loadingState: { ...state.loadingState,loading: false},
    childParentManfRecords: {
      ...state.childParentManfRecords,
      records: reMappedChildUpdatedRecords(action.payload, JSON.parse(JSON.stringify(state.childParentManfRecords.records)))
    }
  })),
  on(UpdateChildParentRecordsFail, (state) => ({
    ...state,
    loadingState: { ...state.loadingState,loading: false},
    childParentManfRecords: {
      ...state.childParentManfRecords,
      records: reMappedChildUpdatedRecords([], JSON.parse(JSON.stringify(state.childParentManfRecords.records)))
    }
  })),
  on(GetAllActiveChildManf, (state) => ({ ...state,loadingState:{...state.loadingState,parentChildLoading:true} })),
  on(GetAllActiveChildManfSuccess, (state, action) => ({ ...state, activeChildManfRecords: action.payload,loadingState:{...state.loadingState,parentChildLoading:false} })),
  on(GetAllActiveChildManfFail, (state, action) => ({ ...state, activeChildManfRecords: null,loadingState:{...state.loadingState,parentChildLoading:false} })),
  on(getManfForMapping, (state) => ({ ...state, manfRecordsForMapping: null, loadingState: { ...state.loadingState,loading: true } })),
  on(getManfForMappingSuccess, (state, action) => ({ ...state, manfRecordsForMapping: action.payload, loadingState: { ...state.loadingState,loading: false} })),
  on(getManfForMappingFail, (state) => ({ ...state, manfRecordsForMapping: null, loadingState: { ...state.loadingState,loading: false} })),
  on(createManufacturerMapping, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: true } })),
  on(createManufacturerMappingSuccess, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: false} })),
  on(createManufacturerMappingFail, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: false} })),
  on(getMasteredChangeLog, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: true }, ManfChangeLogRecords: null })),
  on(getMasteredChangeLogSuccess, (state, action) => ({
    ...state,
    loadingState: { ...state.loadingState,loading: false},
    ManfChangeLogRecords: action.payload
  })),
  on(getMasteredChangeLogFail, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: false}, ManfChangeLogRecords: null })),
  on(getMasteredManfRecords, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: true } })),
  on(getMasteredManfRecordsSuccess, (state, action) => ({
    ...state,
    loadingState: { ...state.loadingState,loading: false},
    mappedMasteredRecords: action.payload
  })),
  on(getMasteredManfRecordsFail, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: false}, mappedMasteredRecords: null })),
  on(updateMasteredMappedRecords, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: true } })),
  on(updateMasteredMappedRecordsSuccess, (state, action) => ({
    ...state,
    loadingState: { ...state.loadingState,loading: false},
    mappedMasteredRecords: {
      ...state.mappedMasteredRecords,
      records: updateModifiedMasteredRecords(action.payload, JSON.parse(JSON.stringify(state.mappedMasteredRecords.records)))
    }
  })),
  on(updateMasteredMappedRecordsFail, (state) => ({
    ...state,
    loadingState: { ...state.loadingState,loading: false},
    mappedMasteredRecords: {
      ...state.mappedMasteredRecords,
      records: updateModifiedMasteredRecords([], JSON.parse(JSON.stringify(state.mappedMasteredRecords.records)))
    }
  })),
  on(getParentChildManfRecords, (state) => ({ ...state, parentChildTopMapping: null,loadingState:{...state.loadingState,parentChildRelLoading:true} })),
  on(getParentChildManfRecordsSuccess, (state, action) => ({ ...state, parentChildTopMapping: action.payload,loadingState:{...state.loadingState,parentChildRelLoading:false} })),
  on(getParentChildManfRecordsFail, (state) => ({ ...state, parentChildTopMapping: null,loadingState:{...state.loadingState,parentChildRelLoading:false} })),
  on(downloadParentChildRecordsCsv, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: true } })),
  on(downloadParentChildRecordsCsvSuccess, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: false} })),
  on(downloadParentChildRecordsCsvFail, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: false} })),
  on(autoAssignManfToRecord, (state, action) => ({
    ...state,
    loadingState: { ...state.loadingState,loading: false},
    manfAutoAssignRecords: action.payload,
    ...(action.payload?.autoAppendFor.appendFor === 'unmasteredManf' &&
   {  manfRecordsForMapping: {
      ...state.manfRecordsForMapping,
      records: appendCreatedManf(action.payload, JSON.parse(JSON.stringify(state.manfRecordsForMapping.records)))
    }}),
    ...(action.payload?.autoAppendFor.appendFor === 'masteredManf' &&
    {  mappedMasteredRecords: {
       ...state.mappedMasteredRecords,
       records: appendCreatedManf(action.payload, JSON.parse(JSON.stringify(state.mappedMasteredRecords.records)))
     }}),
     ...(action.payload?.autoAppendFor.appendFor === 'parentChild' &&
     {  childParentManfRecords: {
        ...state.childParentManfRecords,
        records: appendCreatedManf(action.payload, JSON.parse(JSON.stringify(state.childParentManfRecords.records)))
      }}),

  })),
  on(GetAllManfRecords, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: true }, allManfRecords: null })),
  on(GetAllManfRecordsSuccess, (state,action) => ({ ...state, loadingState: { ...state.loadingState,loading: false},allManfRecords:action.payload })),
  on(GetAllManfRecordsFail, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: false},allManfRecords:null })),
  on(ManageMappingAllRecords, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: true }, updatedManfRecords: null })),
  on(ManageMappingAllRecordsSuccess, (state,action) => ({ ...state, loadingState: { ...state.loadingState,loading: false}, updatedManfRecords: action.payload })),
  on(ManageMappingAllRecordsFail, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: false}, updatedManfRecords: null })),

);

function reMappedUpdatedRecords(responseRecords: any[], parentManfRecords) {
  parentManfRecords.forEach((record, index) => {
    const data = responseRecords.find((el) => el.parentManfID === record.parentManfID);
    if (data) {
      const updateData = { ...data, isNewAdded: true };
      parentManfRecords[index] = updateData;
    }
    delete record['isNewAdded'];
  });
  return parentManfRecords;
}

function reMappedChildUpdatedRecords(responseRecords: any[], childParentManfRecords) {
  childParentManfRecords.forEach((record, index) => {
    const data = responseRecords.find((el) => el.childManfID === record.childManfID);
    if (data) {
      const updateData = { ...data, isNewAdded: true };
      childParentManfRecords[index] = updateData;
    }
    delete record['isNewAdded'];
  });
  return childParentManfRecords;
}

function updateModifiedMasteredRecords(responseRecords: any[], masteredMappedRecords) {
  masteredMappedRecords.forEach((record, index) => {
    const data = responseRecords.find((el) => el.manfMapID === record.manfMapID);
    if (data) {
      const updateData = { ...data, isNewAdded: true };
      masteredMappedRecords[index] = updateData;
    }
    delete record['isNewAdded'];
  });
  return masteredMappedRecords;
}

function appendCreatedManf(responseRecords, recordsData) {
  const { autoAppendFor, data } = responseRecords;
  switch (autoAppendFor.appendFor) {
    case 'unmasteredManf':
      recordsData.forEach((record, index) => {
        if (autoAppendFor.id === record.manfPGUID) {
          const updateData = {
            ...recordsData[index],
            isModified: true,
            manfID: data.childManfID,
            manfName: data.childManfName,
            manufacturer_mapping: data.childManfName,
            topParentManfID: data.topParentManfID,
            topParentManfName: data.topParentManfName,
            parentManfName: data.parentManfName,
            childDisplayName: data.childDisplayName,
            topDisplayName: data.topParentDisplayName,
            parentDisplayName: data.parentDisplayName, 
          };
          recordsData[index] = updateData;
        }
      });
      return recordsData;
      break;
    case 'masteredManf':
      recordsData.forEach((record, index) => {
        if (autoAppendFor.id === record.manfMapID) {
          const updateData = {
            ...recordsData[index],
            isModified: true,
            manfID: data.childManfID,
            manfName: data.childManfName,
            topParManfID: data.topParentManfID,
            topParManfName: data.topParentManfName,
            parManfName: data.parentManfName,
            parManfID:data.parentManfID,
            childDispName: data.childDisplayName,
            topParDispName: data.parentDisplayName,
            parDispName: data.topParentDisplayName,
          };
          recordsData[index] = updateData;
        }
      });
      return recordsData;
      break;
      case 'parentChild':
        recordsData.forEach((record, index) => {
          if (autoAppendFor.id === record.childManfID) {
            const updateData = {
              ...recordsData[index],
              isModified: true,
              topParentManfID: data.topParentManfID,
              topParentManfName: data.topParentManfName,
              parentManfName: data.parentManfName,
              parentManfID:data.parentManfID
            };
            recordsData[index] = updateData;
          }
        });
        return recordsData;
        break;
    default:
      return recordsData;
      break;
  }

}

export function manfMasterReducer(state: manfMasterState | undefined, action: Action) {
  return featureReducer(state, action);
}
