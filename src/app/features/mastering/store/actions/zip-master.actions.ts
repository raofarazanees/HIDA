import { ProductSearchCriteria } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { createAction, props } from "@ngrx/store";
export enum zipMasterEnum {
    GET_ZIP_MASTER_RECORDS = '[MASTERING_MODULE] Get Zip Master Records',
    GET_ZIP_MASTER_RECORDS_SUCCESS = '[MASTERING_MODULE] Get Zip Master Records Success',
    GET_ZIP_MASTER_RECORDS_FAIL = '[MASTERING_MODULE] Get Zip Master Records Fail',
    UPDATE_ZIP_MASTER_RECORDS = '[MASTERING_MODULE] Update Zip Master Records',
    UPDATE_ZIP_MASTER_RECORDS_SUCCESS = '[MASTERING_MODULE] Update Zip Master Records Success',
    UPDATE_ZIP_MASTER_RECORDS_FAIL = '[MASTERING_MODULE] Update Zip Master Records Fail',
    GET_ZIP_MASTER_CHANGE_LOG = '[MASTERING_MODULE] Get Zip Master Change Log',
    GET_ZIP_MASTER_CHANGE_LOG_SUCCESS = '[MASTERING_MODULE] Get Zip Master Change Log Success',
    GET_ZIP_MASTER_CHANGE_LOG_FAIL = '[MASTERING_MODULE] Get Zip Master Change Log Fail',

}

export const GetZipMasterRecords = createAction(zipMasterEnum.GET_ZIP_MASTER_RECORDS, props<{payload: ProductSearchCriteria}>());
export const GetZipMasterRecordsSuccess = createAction(zipMasterEnum.GET_ZIP_MASTER_RECORDS_SUCCESS, props<{payload: any}>());
export const GetZipMasterRecordsFail = createAction(zipMasterEnum.GET_ZIP_MASTER_RECORDS_FAIL, props<{payload: any}>());

export const UpdateZipRecord = createAction(zipMasterEnum.UPDATE_ZIP_MASTER_RECORDS, props<{payload: any}>());
export const UpdateZipRecordSuccess = createAction(zipMasterEnum.UPDATE_ZIP_MASTER_RECORDS_SUCCESS, props<{payload: any}>());
export const UpdateZipRecordFail = createAction(zipMasterEnum.UPDATE_ZIP_MASTER_RECORDS_FAIL, props<{payload: any}>());

export const GetZipChangeLog = createAction(zipMasterEnum.GET_ZIP_MASTER_CHANGE_LOG, props<{payload: any}>());
export const GetZipChangeLogSuccess = createAction(zipMasterEnum.GET_ZIP_MASTER_CHANGE_LOG_SUCCESS, props<{payload: any}>());
export const GetZipChangeLogFail = createAction(zipMasterEnum.GET_ZIP_MASTER_CHANGE_LOG_FAIL, props<{payload: any}>());
