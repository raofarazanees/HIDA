import { Action, createReducer, on } from "@ngrx/store";
import {  CloseDialogAt, GetUnspscChangeLog, GetUnspscChangeLogFail, GetUnspscChangeLogSuccess,} from "../actions";
import { GetZipChangeLog, GetZipChangeLogFail, GetZipChangeLogSuccess, GetZipMasterRecords, GetZipMasterRecordsFail, GetZipMasterRecordsSuccess, UpdateZipRecord, UpdateZipRecordFail, UpdateZipRecordSuccess } from "../actions/zip-master.actions";
import { initialStateZip, zipMasterState } from "../../model/manf-master-models/interface/zip-master.interface";


const featureReducer = createReducer(
    initialStateZip,
    on(CloseDialogAt, (state, action) => ({ ...state, closeDialogAt: { date: action.date, dialogType: action.dialogType } })),
    on(GetZipMasterRecords, ( state ) => ({ ...state, loadingState:{loading : true},zipSearchedRecords:null })),
    on(GetZipMasterRecordsSuccess, ( state, action ) => ({ ...state, loadingState:{loading : false}, zipSearchedRecords:action.payload })),
    on(GetZipMasterRecordsFail, ( state, action ) => ({ ...state, loadingState:{loading : false}, zipSearchedRecords:null })),
    on(UpdateZipRecord, ( state ) => ({ ...state, loadingState:{loading : true}})),
    on(UpdateZipRecordSuccess, ( state, action ) => ({ ...state, loadingState:{loading : false}, 
        zipSearchedRecords: {
            ...state.zipSearchedRecords,
            records: reMappedUpdatedRecords(action.payload, JSON.parse(JSON.stringify(state.zipSearchedRecords.records)))
          }
    })),
    on(UpdateZipRecordFail, ( state, action ) => ({ ...state, loadingState:{loading : false} })),
    on(GetZipChangeLog, (state) => ({ ...state, loadingState: { loading: true }, zipChangeLogRecords: null })),
    on(GetZipChangeLogSuccess, (state, action) => ({ ...state, loadingState: { loading: false }, zipChangeLogRecords: action.payload })),
    on(GetZipChangeLogFail, (state) => ({ ...state, loadingState: { loading: false }, zipChangeLogRecords: null })),
    
);

export function zipReducer(state: zipMasterState | undefined, action: Action) {
    return featureReducer(state, action);
}

function reMappedUpdatedRecords(responseRecords: any[], ZipRecords) {
    ZipRecords.forEach((record, index) => {
      const data = responseRecords.find((el) => el.zip === record.zip);
      if (data) {
        const updateData = { ...data, isNewAdded: true };
        ZipRecords[index] = updateData;
      }
      delete record['isNewAdded'];
    });
    return ZipRecords;
  }
