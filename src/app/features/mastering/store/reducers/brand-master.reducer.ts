import { autoAppendFor } from './../../model/manf-master-models/interface/common.interface';
import { loadingState } from './../../../item-to-product/store/reducers/staging-curation.reducer';
import { createReducer, on, State, Action } from "@ngrx/store";
import { CreateBrandMasterRecord, CreateBrandMasterRecordFail, CreateBrandMasterRecordSuccess, GetActiveBrandMasterFail, GetActiveBrandMasterSuccess, GetBrandCVRecordChangeLog, GetBrandCVRecordChangeLogFail, GetBrandCVRecordChangeLogSuccess, GetBrandCVRecords, GetBrandCVRecordsFail, GetBrandCVRecordsSuccess, GetBrandMapRecordChangeLog, GetBrandMapRecordChangeLogFail, GetBrandMapRecordChangeLogSuccess, GetBrandMappingRecords, GetBrandMappingRecordsFail, GetBrandMappingRecordsSuccess, GetBrandSource, GetBrandSourceFail, GetBrandSourceSuccess, UpdateBrandMappingRecords, UpdateBrandMappingRecordsFail, UpdateBrandMappingRecordsSuccess, UpdateBrandMasterRecords, UpdateBrandMasterRecordsFail, UpdateBrandMasterRecordsSuccess, autoAssignBrandCVtoRecord } from "../actions";
import { BrandCVChangeLogModel, BrandCVRecord, BrandCVResponse, BrandMappingRecord, BrandMappingResponse, BrandSourceRecord } from "../../model/manf-master-models/interface/brand-cv-filter-options";

export const initialBrandState: BrandMasterState = {
  brandCVResponse: { totalRecords: null, records: [] },
  loadingState: { loading: false },
  brandChangeLogRecords: null,
  brandMappingResponse: null,
  activeBrandRecords: null,
  autoAssignRecord: null,
  brandSourceRecords: null
}

export interface BrandMasterState {
  brandCVResponse: BrandCVResponse,
  loadingState: loadingState;
  brandChangeLogRecords: BrandCVChangeLogModel[],
  brandMappingResponse: BrandMappingResponse,
  activeBrandRecords: BrandCVRecord[],
  brandSourceRecords:BrandSourceRecord[],
  autoAssignRecord: { autoAppendFor: autoAppendFor, data: BrandCVRecord }

}
const featureReducer = createReducer(
  initialBrandState,
  on(GetBrandCVRecords, state => ({ ...state, loadingState: { loading: true } })),
  on(GetBrandCVRecordsSuccess, (state, action) => ({ ...state, loadingState: { loading: false }, brandCVResponse: action.payload })),
  on(GetBrandCVRecordsFail, (state, action) => ({ ...state, loadingState: { loading: false }, brandCVResponse: null })),
  on(CreateBrandMasterRecord, (state) => ({ ...state, loadingState: { loading: true } })),
  on(CreateBrandMasterRecordSuccess, (state, action) => ({
    ...state,
    loadingState: { loading: false },
    brandCVResponse: {
      ...state.brandCVResponse,
      totalRecords: state.brandCVResponse?.totalRecords ? Number(state.brandCVResponse.totalRecords) + 1 : 1,
      records: [{ ...action.payload }, ...state.brandCVResponse.records]
    },
  })),
  on(CreateBrandMasterRecordFail, (state) => ({ ...state, loadingState: { loading: false } })),
  on(UpdateBrandMasterRecords, (state) => ({ ...state, loadingState: { loading: true } })),
  on(UpdateBrandMasterRecordsSuccess, (state, action) => ({
    ...state, loadingState: { loading: false },
    brandCVResponse: {
      ...state.brandCVResponse,
      records: reMappedUpdatedBrandRecords(action.payload, JSON.parse(JSON.stringify(state.brandCVResponse.records)))
    }
  })),
  on(UpdateBrandMasterRecordsFail, (state) => ({ ...state, loadingState: { loading: false } })),
  on(GetBrandCVRecordChangeLog, state => ({ ...state, loadingState: { loading: true }, brandChangeLogRecords: null })),
  on(GetBrandCVRecordChangeLogSuccess, (state, action) => ({ ...state, loadingState: { loading: false }, brandChangeLogRecords: action.payload })),
  on(GetBrandCVRecordChangeLogFail, (state) => ({ ...state, loadingState: { loading: false }, brandChangeLogRecords: null })),
  on(GetBrandMappingRecords, state => ({ ...state, loadingState: { loading: true }, autoAssignRecord: null })),
  on(GetBrandMappingRecordsSuccess, (state, action) => ({ ...state, loadingState: { loading: false }, brandMappingResponse: action.payload })),
  on(GetBrandMappingRecordsFail, (state, action) => ({ ...state, loadingState: { loading: false }, brandMappingResponse: null })),
  on(GetActiveBrandMasterSuccess, (state, action) => ({ ...state, activeBrandRecords: action.payload })),
  on(UpdateBrandMappingRecords, (state) => ({ ...state, loadingState: { loading: true } })),
  on(UpdateBrandMappingRecordsSuccess, (state, action) => ({
    ...state, loadingState: { loading: false },
    brandMappingResponse: {
      ...state.brandMappingResponse,
      totalRecords: action.payload.totalRecords,
      records: reUpdateBrandMappingRecords(action.payload.records, JSON.parse(JSON.stringify(state.brandMappingResponse.records)))
    }
  })),
  on(UpdateBrandMappingRecordsFail, (state) => ({ ...state, loadingState: { loading: false } })),
  on(GetBrandMapRecordChangeLog, state => ({ ...state, loadingState: { loading: true }, brandChangeLogRecords: null })),
  on(GetBrandMapRecordChangeLogSuccess, (state, action) => ({ ...state, loadingState: { loading: false }, brandChangeLogRecords: action.payload })),
  on(GetBrandMapRecordChangeLogFail, (state) => ({ ...state, loadingState: { loading: false }, brandChangeLogRecords: null })),
  on(autoAssignBrandCVtoRecord, (state, action) => ({ ...state, autoAssignRecord: action.payload })),
  on(GetBrandSourceSuccess, (state, action) => ({ ...state, brandSourceRecords: action.payload })),
);

export function brandReducer(state: BrandMasterState | undefined, action: Action) {
  return featureReducer(state, action);
}

function reMappedUpdatedBrandRecords(responseRecords: BrandCVRecord[], BrandMasterData: BrandCVRecord[]) {
  BrandMasterData.forEach((record, index) => {
    const data = responseRecords.find((el) => el.brandID === record.brandID);
    if (data) {
      const updateData = { ...data, isNewAdded: true };
      BrandMasterData[index] = updateData;
    }
    delete record['isNewAdded'];
  });
  return BrandMasterData;
}

function reUpdateBrandMappingRecords(responseRecords: BrandMappingRecord[], BrandMappingData: BrandMappingRecord[]) {
  BrandMappingData.forEach(element => {
    delete element['isNewAdded']
  });
  responseRecords.forEach((record) => {
    const index = BrandMappingData.findIndex((el) => el.brandMapID === record.brandMapID);
    if (index !== -1) {
      BrandMappingData[index] = { ...record, isNewAdded: true };
    } else {
      const dataToAdd = { ...record, isNewAdded: true }
      BrandMappingData.unshift(dataToAdd);
    }
  });
  return BrandMappingData;
}