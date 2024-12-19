import { Action, createReducer, on } from "@ngrx/store";
import { MarketMasterModel, initialStateUnspsc, unspscMasterState } from "../../model/manf-master-models/interface/unspsc-master.interface";
import {  CloseDialogAt, CreateMarketMaster, CreateMarketMasterFail, CreateMarketMasterSuccess, GetAllActiveMarketRecordsFail, GetAllActiveMarketRecordsSuccess, GetMarketMasterRecords, GetMarketMasterRecordsFail, GetMarketMasterRecordsSuccess, GetMarketRecordChangeLog, GetMarketRecordChangeLogFail, GetMarketRecordChangeLogSuccess, GetUnspscChangeLog, GetUnspscChangeLogFail, GetUnspscChangeLogSuccess, GetUnspscMasterRecords, GetUnspscMasterRecordsFail, GetUnspscMasterRecordsSuccess, SearchUNSPSCCode, SearchUNSPSCCodeSuccess, UpdateMarketMasterRecord, UpdateMarketMasterRecordFail, UpdateMarketMasterRecordSuccess, UpdateUnspscRecord, UpdateUnspscRecordFail, UpdateUnspscRecordSuccess, autoAssignMarketToRecord, exportCSVFileMasters, exportCSVFileMastersFail, exportCSVFileMastersSuccess, getActiveBusinessUsers, getActiveBusinessUsersFail, getActiveBusinessUsersSuccess } from "../actions";


const featureReducer = createReducer(
    initialStateUnspsc,
    on(CloseDialogAt, (state, action) => ({ ...state, closeDialogAt: { date: action.date, dialogType: action.dialogType } })),
    on(GetUnspscMasterRecords, ( state ) => ({ ...state, loadingState:{loading : true},UnspscSearchedRecords:null })),
    on(GetUnspscMasterRecordsSuccess, ( state, action ) => ({ ...state, loadingState:{loading : false}, UnspscSearchedRecords:action.payload })),
    on(GetUnspscMasterRecordsFail, ( state, action ) => ({ ...state, loadingState:{loading : false}, UnspscSearchedRecords:null })),
    on(UpdateUnspscRecord, ( state ) => ({ ...state, loadingState:{loading : true}})),
    on(UpdateUnspscRecordSuccess, ( state, action ) => ({ ...state, loadingState:{loading : false}, 
        UnspscSearchedRecords: {
            ...state.UnspscSearchedRecords,
            records: reMappedUpdatedRecords(action.payload, JSON.parse(JSON.stringify(state.UnspscSearchedRecords.records)))
          }
    })),
    on(UpdateUnspscRecordFail, ( state, action ) => ({ ...state, loadingState:{loading : false} })),
    on(GetAllActiveMarketRecordsSuccess, (state, action) => ({ ...state, activeMarketRecords: action.payload })),
    on(GetAllActiveMarketRecordsFail, (state, action) => ({ ...state, activeMarketRecords: null })),
    on(GetUnspscChangeLog, (state) => ({ ...state, loadingState: { loading: true }, unspscChangeLogRecords: null })),
    on(GetUnspscChangeLogSuccess, (state, action) => ({ ...state, loadingState: { loading: false }, unspscChangeLogRecords: action.payload })),
    on(GetUnspscChangeLogFail, (state) => ({ ...state, loadingState: { loading: false }, unspscChangeLogRecords: null })),
    on(CreateMarketMaster, (state) => ({ ...state, loadingState: { loading: true } })),
    on(CreateMarketMasterSuccess, (state, action) => ({
      ...state,
      loadingState: { loading: false },
      MarketMasterData: { 
        ...state.MarketMasterData,
        totalRecords:state.MarketMasterData?.totalRecords ? Number(state.MarketMasterData.totalRecords) + 1 : 1,
        records: [{ ...action.payload }, ...state.MarketMasterData.records] 
      },
      activeMarketRecords:[...state.activeMarketRecords,{...action.payload}]
    })),
    on(CreateMarketMasterFail, (state) => ({ ...state, loadingState: { loading: false } })),
    on(GetMarketMasterRecords, ( state ) => ({ ...state, loadingState:{loading : true},MarketMasterData:null })),
    on(GetMarketMasterRecordsSuccess, ( state, action ) => ({ ...state, loadingState:{loading : false}, MarketMasterData:action.payload })),
    on(GetMarketMasterRecordsFail, ( state, action ) => ({ ...state, loadingState:{loading : false}, MarketMasterData:null })),

    on(UpdateMarketMasterRecord, ( state ) => ({ ...state, loadingState:{loading : true}})),
    on(UpdateMarketMasterRecordSuccess, ( state, action ) => ({ ...state, loadingState:{loading : false}, 
      MarketMasterData: {
            ...state.MarketMasterData,
            records: reMappedUpdatedMarketRecords(action.payload, JSON.parse(JSON.stringify(state.MarketMasterData.records)))
          }
    })),
    on(UpdateMarketMasterRecordFail, ( state, action ) => ({ ...state, loadingState:{loading : false} })),
    on(GetMarketRecordChangeLog, (state) => ({ ...state, loadingState: { loading: true }, unspscChangeLogRecords: null })),
    on(GetMarketRecordChangeLogSuccess, (state, action) => ({ ...state, loadingState: { loading: false }, unspscChangeLogRecords: action.payload })),
    on(GetMarketRecordChangeLogFail, (state) => ({ ...state, loadingState: { loading: false }, unspscChangeLogRecords: null })),
    on(autoAssignMarketToRecord,(state,action) => ({ ...state, autoAssignRecordMarket:action.payload})),
    on(exportCSVFileMasters, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: true } })),
    on(exportCSVFileMastersSuccess, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: false} })),
    on(exportCSVFileMastersFail, (state) => ({ ...state, loadingState: { ...state.loadingState,loading: false} })),
    on(getActiveBusinessUsers, ( state ) => ({ ...state, loadingState:{loading : true},activeBusinessUsers:null })),
    on(getActiveBusinessUsersSuccess, ( state, action ) => ({ ...state, activeBusinessUsers:action.payload })),
    on(getActiveBusinessUsersFail, ( state, action ) => ({ ...state, activeBusinessUsers:null })),
);

export function unspscReducer(state: unspscMasterState | undefined, action: Action) {
    return featureReducer(state, action);
}

function reMappedUpdatedRecords(responseRecords: any[], UnspscRecords) {
    UnspscRecords.forEach((record, index) => {
      const data = responseRecords.find((el) => el.unspscCodeID === record.unspscCodeID);
      if (data) {
        const updateData = { ...data, isNewAdded: true };
        UnspscRecords[index] = updateData;
      }
      delete record['isNewAdded'];
    });
    return UnspscRecords;
  }

  function reMappedUpdatedMarketRecords(responseRecords: MarketMasterModel[], MarketMasterData) {
    MarketMasterData.forEach((record, index) => {
      const data = responseRecords.find((el) => el.marketID === record.marketID);
      if (data) {
        const updateData = { ...data, isNewAdded: true };
        MarketMasterData[index] = updateData;
      }
      delete record['isNewAdded'];
    });
    return MarketMasterData;
  }