import { ProductSearchCriteria } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { createAction, props } from "@ngrx/store";
import { MarketMasterModel, MarketMasterResponseData } from '../../model/manf-master-models/interface/unspsc-master.interface';
import { autoAppendFor } from '../../model/manf-master-models/interface/common.interface';

export enum unspscMasterEnum {
    GET_UNSPSC_MASTER_RECORDS = '[MASTERING_MODULE] Get UNSPSC Master Records',
    GET_UNSPSC_MASTER_RECORDS_SUCCESS = '[MASTERING_MODULE] Get UNSPSC Master Records Success',
    GET_UNSPSC_MASTER_RECORDS_FAIL = '[MASTERING_MODULE] Get UNSPSC Master Records Fail',
    UPDATE_UNSPSC_MASTER_RECORDS = '[MASTERING_MODULE] Update UNSPSC Master Records',
    UPDATE_UNSPSC_MASTER_RECORDS_SUCCESS = '[MASTERING_MODULE] Update UNSPSC Master Records Success',
    UPDATE_UNSPSC_MASTER_RECORDS_FAIL = '[MASTERING_MODULE] Update UNSPSC Master Records Fail',
    GET_ACTIVE_MARKET_RECORDS = '[MASTERING_MODULE] Get All Active Market Records',
    GET_ACTIVE_MARKET_RECORDS_SUCCESS = '[MASTERING_MODULE] Get All Active Market Records Success',
    GET_ACTIVE_MARKET_RECORDS_FAIL = '[MASTERING_MODULE] Get All Active Market Records Fail',
    GET_UNSPSC_MASTER_CHANGE_LOG = '[MASTERING_MODULE] Get UNSPSC Master Manf Change Log',
    GET_UNSPSC_MASTER_CHANGE_LOG_SUCCESS = '[MASTERING_MODULE] Get UNSPSC Master Manf Change Log Success',
    GET_UNSPSC_MASTER_CHANGE_LOG_FAIL = '[MASTERING_MODULE] Get UNSPSC Master Manf Change Log Fail',
    CREATE_MARKET_MASTER_RECORD =  '[MASTERING_MODULE] Create Market Master Record',
    CREATE_MARKET_MASTER_RECORD_SUCCESS =  '[MASTERING_MODULE] Create Market Master Record Success',
    CREATE_MARKET_MASTER_RECORD_FAIL =  '[MASTERING_MODULE] Create Market Master Record Fail',
    GET_MARKET_MASTER_RECORDS = '[MASTERING_MODULE] Get Market Master Records',
    GET_MARKET_MASTER_RECORDS_SUCCESS = '[MASTERING_MODULE] Get Market Master Records Success',
    GET_MARKET_MASTER_RECORDS_FAIL = '[MASTERING_MODULE] Get Market Master Records Fail',
    UPDATE_MARKET_MASTER_RECORDS = '[MASTERING_MODULE] Update Market Master Records',
    UPDATE_MARKET_MASTER_RECORDS_SUCCESS = '[MASTERING_MODULE] Update Market Master Records Success',
    UPDATE_MARKET_MASTER_RECORDS_FAIL = '[MASTERING_MODULE] Update Market Master Records Fail',
    GET_MARKET_MASTER_CHANGE_LOG = '[MASTERING_MODULE] Get Market Mater record Change Log',
    GET_MARKET_MASTER_CHANGE_LOG_SUCCESS = '[MASTERING_MODULE] Get Market Mater record Change log Success',
    GET_MARKET_MASTER_CHANGE_LOG_FAIL = '[MASTERING_MODULE] Get Market Mater record Change Log Fail',
    AUTO_ASSIGN_MARKET_RECORDS = '[AUTO_ASSIGN] Auto Assign Market Mater Record',
    EXPORT_MASTERS_RECORDS_CSV =  '[AUTO_ASSIGN] Export Masters CSV Record',
    EXPORT_MASTERS_RECORDS_CSV_SUCCESS =  '[AUTO_ASSIGN] Export Masters CSV Record Success',
    EXPORT_MASTERS_RECORDS_CSV_FAIL =  '[AUTO_ASSIGN] Export Masters CSV Record Fail',
    GET_ACTIVE_BUSINESS_USERS =  '[MASTERING_MODULE] Get Active Business Users Record',
    GET_ACTIVE_BUSINESS_USERS_SUCCESS =  '[MASTERING_MODULE] Get Active Business Users Record Success',
    GET_ACTIVE_BUSINESS_USERS_FAIL =  '[MASTERING_MODULE] Get Active Business Users Record Fail',

}

export const GetUnspscMasterRecords = createAction(unspscMasterEnum.GET_UNSPSC_MASTER_RECORDS, props<{payload: ProductSearchCriteria}>());
export const GetUnspscMasterRecordsSuccess = createAction(unspscMasterEnum.GET_UNSPSC_MASTER_RECORDS_SUCCESS, props<{payload: any}>());
export const GetUnspscMasterRecordsFail = createAction(unspscMasterEnum.GET_UNSPSC_MASTER_RECORDS_FAIL, props<{payload: any}>());

export const UpdateUnspscRecord = createAction(unspscMasterEnum.UPDATE_UNSPSC_MASTER_RECORDS, props<{payload: any}>());
export const UpdateUnspscRecordSuccess = createAction(unspscMasterEnum.UPDATE_UNSPSC_MASTER_RECORDS_SUCCESS, props<{payload: any}>());
export const UpdateUnspscRecordFail = createAction(unspscMasterEnum.UPDATE_UNSPSC_MASTER_RECORDS_FAIL, props<{payload: any}>());

export const GetAllActiveMarketRecords = createAction(unspscMasterEnum.GET_ACTIVE_MARKET_RECORDS);
export const GetAllActiveMarketRecordsSuccess = createAction(unspscMasterEnum.GET_ACTIVE_MARKET_RECORDS_SUCCESS, props<{payload: any}>());
export const GetAllActiveMarketRecordsFail = createAction(unspscMasterEnum.GET_ACTIVE_MARKET_RECORDS_FAIL, props<{payload: any}>());

export const GetUnspscChangeLog = createAction(unspscMasterEnum.GET_UNSPSC_MASTER_CHANGE_LOG, props<{payload: any}>());
export const GetUnspscChangeLogSuccess = createAction(unspscMasterEnum.GET_UNSPSC_MASTER_CHANGE_LOG_SUCCESS, props<{payload: any}>());
export const GetUnspscChangeLogFail = createAction(unspscMasterEnum.GET_UNSPSC_MASTER_CHANGE_LOG_FAIL, props<{payload: any}>());

//Market Master
export const CreateMarketMaster = createAction(unspscMasterEnum.CREATE_MARKET_MASTER_RECORD, props<{payload: {marketData:any,autoAppendFor:autoAppendFor}}>());
export const CreateMarketMasterSuccess = createAction(unspscMasterEnum.CREATE_MARKET_MASTER_RECORD_SUCCESS, props<{payload: any}>());
export const CreateMarketMasterFail = createAction(unspscMasterEnum.CREATE_MARKET_MASTER_RECORD_FAIL, props<{payload: any}>());

export const GetMarketMasterRecords = createAction(unspscMasterEnum.GET_MARKET_MASTER_RECORDS, props<{payload: ProductSearchCriteria}>());
export const GetMarketMasterRecordsSuccess = createAction(unspscMasterEnum.GET_MARKET_MASTER_RECORDS_SUCCESS, props<{payload: MarketMasterResponseData}>());
export const GetMarketMasterRecordsFail = createAction(unspscMasterEnum.GET_MARKET_MASTER_RECORDS_FAIL, props<{payload: any}>());

export const UpdateMarketMasterRecord = createAction(unspscMasterEnum.UPDATE_MARKET_MASTER_RECORDS, props<{payload: any}>());
export const UpdateMarketMasterRecordSuccess = createAction(unspscMasterEnum.UPDATE_MARKET_MASTER_RECORDS_SUCCESS, props<{payload: any}>());
export const UpdateMarketMasterRecordFail = createAction(unspscMasterEnum.UPDATE_MARKET_MASTER_RECORDS_FAIL, props<{payload: any}>());

export const GetMarketRecordChangeLog = createAction(unspscMasterEnum.GET_MARKET_MASTER_CHANGE_LOG, props<{payload: any}>());
export const GetMarketRecordChangeLogSuccess = createAction(unspscMasterEnum.GET_MARKET_MASTER_CHANGE_LOG_SUCCESS, props<{payload: any}>());
export const GetMarketRecordChangeLogFail = createAction(unspscMasterEnum.GET_MARKET_MASTER_CHANGE_LOG_FAIL, props<{payload: any}>());

export const autoAssignMarketToRecord = createAction(unspscMasterEnum.AUTO_ASSIGN_MARKET_RECORDS, props<{payload: {autoAppendFor:autoAppendFor,data:MarketMasterModel}}>());

export const exportCSVFileMasters = createAction(unspscMasterEnum.EXPORT_MASTERS_RECORDS_CSV, props<{filterParams:ProductSearchCriteria,url:string}>());
export const exportCSVFileMastersSuccess = createAction(unspscMasterEnum.EXPORT_MASTERS_RECORDS_CSV_SUCCESS);
export const exportCSVFileMastersFail = createAction(unspscMasterEnum.EXPORT_MASTERS_RECORDS_CSV_FAIL);

//market end

export const getActiveBusinessUsers = createAction(unspscMasterEnum.GET_ACTIVE_BUSINESS_USERS);
export const getActiveBusinessUsersSuccess = createAction(unspscMasterEnum.GET_ACTIVE_BUSINESS_USERS_SUCCESS, props<{payload: any}>());
export const getActiveBusinessUsersFail = createAction(unspscMasterEnum.GET_ACTIVE_BUSINESS_USERS_FAIL, props<{payload: any}>());