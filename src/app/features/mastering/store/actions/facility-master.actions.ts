import { createAction, props } from "@ngrx/store";
import { FacilityForMappingResponseData, FacilityMappedRecord, FacilityMappedRecordsRes, FacilityMasterResponseData, createFacilityMaster, facilityMasterData } from '../../model/manf-master-models/interface/facility-master-state.interface';
import { facilityMasterDataToUpdate, facilityMasterUpdateRecords } from '../../components/facility-master/facility-master-components/facility-master.component';
import { ProductSearchCriteria } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { facilityMasterDataToUpdate_ } from "../../components/facility-master/for-facility-mapping/for-facility-mapping.component";
import { facilityDataToUpdate } from "../../components/facility-master/facility-mastered/facility-mastered.component";
import { autoAppendFor } from "../../model/manf-master-models/interface/common.interface";

export enum facilityMasterEnum {
    GET_FACILITY_MASTER_RECORDS = '[MASTERING_MODULE] Get Facility Master Records',
    GET_FACILITY_MASTER_RECORDS_SUCCESS = '[MASTERING_MODULE] Get Facility Master Records Success',
    GET_FACILITY_MASTER_RECORDS_FAIL = '[MASTERING_MODULE] Get Facility Master Records Fail',
    CREATE_FACILITY_MASTER_RECORDS = '[MASTERING_MODULE] Create Facility Master Records',
    CREATE_FACILITY_MASTER_RECORDS_SUCCESS = '[MASTERING_MODULE] Create Facility Master Records Success',
    CREATE_FACILITY_MASTER_RECORDS_FAIL = '[MASTERING_MODULE] Create Facility Master Records Fail',
    UPDATE_FACILITY_MASTER_RECORDS = '[MASTERING_MODULE] Update Facility Master Records',
    UPDATE_FACILITY_MASTER_RECORDS_SUCCESS = '[MASTERING_MODULE] Update Facility Master Records Success',
    UPDATE_FACILITY_MASTER_RECORDS_FAIL= '[MASTERING_MODULE] Update Facility Master Records Fail',
    GET_ACTIVE_FACILITY_MASTERS = '[MASTERING_MODULE] Get All Active Facility master records',
    GET_ACTIVE_FACILITY_MASTERS_SUCCESS = '[MASTERING_MODULE] Get All Active Facility master records Success',
    GET_ACTIVE_FACILITY_MASTERS_FAIL = '[MASTERING_MODULE] Get All Active Facility master records Fail',
    GET_FACILITY_MASTER_FOR_MAPPING = '[MASTERING_MODULE] Get Facility Master Records For Mapping',
    GET_FACILITY_MASTER_FOR_MAPPING_SUCCESS = '[MASTERING_MODULE] Get Facility Master Records For Mapping Success',
    GET_FACILITY_MASTER_FOR_MAPPING_FAIL = '[MASTERING_MODULE] Get Facility Master Records For Mapping Fail',
    GET_FACILITY_MASTER_CHANGE_LOG = '[MASTERING_MODULE] Get Facility Master record Change Log',
    GET_FACILITY_MASTER_CHANGE_LOG_SUCCESS = '[MASTERING_MODULE] Get Facility Master record Change log Success',
    GET_FACILITY_MASTER_CHANGE_LOG_FAIL = '[MASTERING_MODULE] Get Facility Master record Change Log Fail',
    CREATE_FACILITY_MAPPING = '[MASTERING_MODULE] Create Facility Mapping Records',
    CREATE_FACILITY_MAPPING_SUCCESS = '[MASTERING_MODULE] Create Facility Mapping Records Success',
    CREATE_FACILITY_MAPPING_FAIL = '[MASTERING_MODULE] Create Facility Mapping Records Fail',
    GET_FACILITY_MASTERED_RECORD = '[MASTERING_MODULE] Get Facility Mastered Mapped record',
    GET_FACILITY_MASTERED_RECORD_SUCCESS = '[MASTERING_MODULE] Get Facility Mastered Mapped record Success',
    GET_FACILITY_MASTERED_RECORD_FAIL = '[MASTERING_MODULE] Get Facility Mastered Mapped record Fail',
    GET_FACILITY_MAPPED_CHANGE_LOG = '[MASTERING_MODULE] Get Facility mapped record Change Log',
    GET_FACILITY_MAPPED_CHANGE_LOG_SUCCESS = '[MASTERING_MODULE] Get Facility mapped record Change log Success',
    GET_FACILITY_MAPPED_CHANGE_LOG_FAIL = '[MASTERING_MODULE] Get Facility mapped record Change Log Fail',
    UPDATE_FACILITY_MAPPED_RECORDS = '[MASTERING_MODULE] Update Facility mapped Records',
    UPDATE_FACILITY_MAPPED_RECORDS_SUCCESS = '[MASTERING_MODULE] Update Facility mapped Records Success',
    UPDATE_FACILITY_MAPPED_RECORDS_FAIL = '[MASTERING_MODULE] Update Facility mapped Records Fail',
    AUTO_ASSIGN_FACILITY_RECORDS =  '[MASTERING_MODULE] Auto Assign facility Master',
    GET_ALL_FACILITY_RECORDS_SEARCH = '[MASTERING_MODULE] Get All Facility Records',
    GET_ALL_FACILITY_RECORDS_SEARCH_SUCCESS = '[MASTERING_MODULE] Get All Facility Records Success',
    GET_ALL_FACILITY_RECORDS_SEARCH_FAIL = '[MASTERING_MODULE] Get All Facility Records Fail',
    MANAGE_FAC_MAPPING_ALL_RECORDS = '[MASTERING_MODULE] Manage Facility All Records Mapping',
    MANAGE_FAC_MAPPING_ALL_RECORDS_SUCCESS = '[MASTERING_MODULE] Manage Facility All Records Mapping Success',
    MANAGE_FAC_MAPPING_ALL_RECORDS_FAIL = '[MASTERING_MODULE] Manage Facility All Records Mapping Fail',

}


export const GetFacilityMasterRecords = createAction(facilityMasterEnum.GET_FACILITY_MASTER_RECORDS, props<{payload: ProductSearchCriteria}>());
export const GetFacilityMasterRecordsSuccess = createAction(facilityMasterEnum.GET_FACILITY_MASTER_RECORDS_SUCCESS, props<{payload: FacilityMasterResponseData}>());
export const GetFacilityMasterRecordsFail = createAction(facilityMasterEnum.GET_FACILITY_MASTER_RECORDS_FAIL, props<{payload: any}>());

export const CreateFacilityMasterRecords = createAction(facilityMasterEnum.CREATE_FACILITY_MASTER_RECORDS, props<{payload: {facilityData:createFacilityMaster,autoAppendFor:autoAppendFor}}>());
export const CreateFacilityMasterRecordsSuccess = createAction(facilityMasterEnum.CREATE_FACILITY_MASTER_RECORDS_SUCCESS, props<{payload: any}>());
export const CreateFacilityMasterRecordsFail = createAction(facilityMasterEnum.CREATE_FACILITY_MASTER_RECORDS_FAIL, props<{payload: any}>());

export const UpdateFacilityMasterRecords = createAction(facilityMasterEnum.UPDATE_FACILITY_MASTER_RECORDS, props<{payload: facilityMasterDataToUpdate}>());
export const UpdateFacilityMasterRecordsSuccess = createAction(facilityMasterEnum.UPDATE_FACILITY_MASTER_RECORDS_SUCCESS, props<{payload: facilityMasterData[]}>());
export const UpdateFacilityMasterRecordsFail = createAction(facilityMasterEnum.UPDATE_FACILITY_MASTER_RECORDS_FAIL, props<{payload: any}>());

export const GetActiveFacilityMasterRecords = createAction(facilityMasterEnum.GET_ACTIVE_FACILITY_MASTERS);
export const GetActiveFacilityMasterRecordsSuccess = createAction(facilityMasterEnum.GET_ACTIVE_FACILITY_MASTERS_SUCCESS, props<{payload: facilityMasterUpdateRecords[]}>());
export const GetActiveFacilityMasterRecordsFail = createAction(facilityMasterEnum.GET_ACTIVE_FACILITY_MASTERS_FAIL, props<{payload: any}>());

export const GetFacilityRecordsForMapping = createAction(facilityMasterEnum.GET_FACILITY_MASTER_FOR_MAPPING, props<{payload: ProductSearchCriteria}>());
export const GetFacilityRecordsForMappingSuccess = createAction(facilityMasterEnum.GET_FACILITY_MASTER_FOR_MAPPING_SUCCESS, props<{payload: FacilityForMappingResponseData}>());
export const GetFacilityRecordsForMappingFail = createAction(facilityMasterEnum.GET_FACILITY_MASTER_FOR_MAPPING_FAIL, props<{payload: any}>());

export const GetFacilityRecordChangeLog = createAction(facilityMasterEnum.GET_FACILITY_MASTER_CHANGE_LOG, props<{payload: any}>());
export const GetFacilityRecordChangeLogSuccess = createAction(facilityMasterEnum.GET_FACILITY_MASTER_CHANGE_LOG_SUCCESS, props<{payload: any}>());
export const GetFacilityRecordChangeLogFail = createAction(facilityMasterEnum.GET_FACILITY_MASTER_CHANGE_LOG_FAIL, props<{payload: any}>());


export const createFacilityMapping = createAction(facilityMasterEnum.CREATE_FACILITY_MAPPING, props<{payload: any}>());
export const createFacilityMappingSuccess = createAction(facilityMasterEnum.CREATE_FACILITY_MAPPING_SUCCESS, props<{payload: any}>());
export const createFacilityMappingFail = createAction(facilityMasterEnum.CREATE_FACILITY_MAPPING_FAIL, props<{payload: any}>());

export const GetFacilityMappedRecords = createAction(facilityMasterEnum.GET_FACILITY_MASTERED_RECORD, props<{payload: ProductSearchCriteria}>());
export const GetFacilityMappedRecordsSuccess = createAction(facilityMasterEnum.GET_FACILITY_MASTERED_RECORD_SUCCESS, props<{payload: FacilityMappedRecordsRes}>());
export const GetFacilityMappedRecordsFail = createAction(facilityMasterEnum.GET_FACILITY_MASTERED_RECORD_FAIL, props<{payload: any}>());

export const GetFacilityMappedRecordChangeLog = createAction(facilityMasterEnum.GET_FACILITY_MAPPED_CHANGE_LOG, props<{payload: any}>());
export const GetFacilityMappedRecordChangeLogSuccess = createAction(facilityMasterEnum.GET_FACILITY_MAPPED_CHANGE_LOG_SUCCESS, props<{payload: any}>());
export const GetFacilityMappedRecordChangeLogFail = createAction(facilityMasterEnum.GET_FACILITY_MAPPED_CHANGE_LOG_FAIL, props<{payload: any}>());

export const UpdateFacilityMappedRecords = createAction(facilityMasterEnum.UPDATE_FACILITY_MAPPED_RECORDS, props<{payload: facilityDataToUpdate}>());
export const UpdateFacilityMappedRecordsSuccess = createAction(facilityMasterEnum.UPDATE_FACILITY_MAPPED_RECORDS_SUCCESS, props<{payload: FacilityMappedRecord[]}>());
export const UpdateFacilityMappedRecordsFail = createAction(facilityMasterEnum.UPDATE_FACILITY_MAPPED_RECORDS_FAIL, props<{payload: any}>());
export const autoAssignFacilityToRecord = createAction(facilityMasterEnum.AUTO_ASSIGN_FACILITY_RECORDS, props<{payload: {autoAppendFor:autoAppendFor,data:facilityMasterData}}>());

export const GetAllFacRecords = createAction(facilityMasterEnum.GET_ALL_FACILITY_RECORDS_SEARCH, props<{payload: ProductSearchCriteria}>());
export const GetAllFacRecordsSuccess = createAction(facilityMasterEnum.GET_ALL_FACILITY_RECORDS_SEARCH_SUCCESS, props<{payload: FacilityMappedRecordsRes}>());
export const GetAllFacRecordsFail = createAction(facilityMasterEnum.GET_ALL_FACILITY_RECORDS_SEARCH_FAIL, props<{payload: any}>());

export const ManageMappingFacAllRecords = createAction(facilityMasterEnum.MANAGE_FAC_MAPPING_ALL_RECORDS, props<{ payload: any }>());
export const ManageMappingFacAllRecordsSuccess = createAction(facilityMasterEnum.MANAGE_FAC_MAPPING_ALL_RECORDS_SUCCESS, props<{ payload: FacilityMappedRecord[] }>());
export const ManageMappingFacAllRecordsFail = createAction(facilityMasterEnum.MANAGE_FAC_MAPPING_ALL_RECORDS_FAIL, props<{ payload: any }>());