import { ProductSearchCriteria } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { UserInitiatedData } from 'src/app/features/admin-dashboard/modal/user-initiated-interface';
import { createAction, props } from '@ngrx/store';
import { MasteredDataResponse, MasteredTabSearchForm, parentManfData } from '../../model/manf-master-models/interface/manf-master.interface';
import { activeChildMaf, childParentManfResponse } from '../../model/manf-master-models/interface/child-parent-manf.interface';
import { masteredMappedModel } from '../../model/manf-master-models/interface/mastered-mapped.interface';

export enum manfMasterEnum {
  MANF_UNMASTER_FORM_VALUE = '[MASTERING_MODULE] Manf Master Unmaster search form value change',
  MANF_MASTER_TAB_FORM_VALUE = '[MASTERING_MODULE] Manf master tab search form value change',
  GET_PARENT_MANF_RECORDS = '[MASTERING_MODULE] Get Parent Manufacture Records',
  GET_PARENT_MANF_RECORDS_SUCCESS = '[MASTERING_MODULE] Get Parent Manufacture Records Success',
  GET_PARENT_MANF_RECORDS_FAIL = '[MASTERING_MODULE] Get Parent Manufacture Records Fail',
  CREATE_PARENT_MANF_RECORD = '[MASTERING_MODULE] Create New Parent Manf Records',
  CREATE_PARENT_MANF_RECORD_SUCCESS = '[MASTERING_MODULE] Create New Parent Manf Records Success',
  CREATE_PARENT_MANF_RECORD_FAIL = '[MASTERING_MODULE] Create New Parent Manf Records Fail',
  CLOSE_DIALOG_AT = '[MASTERING_MODULE] Close Dialog screen',
  UPDATE_PARENT_MANF_RECORDS = '[MASTERING_MODULE] Update Parent Manf Records',
  UPDATE_PARENT_MANF_RECORDS_SUCCESS = '[MASTERING_MODULE] Update Parent Manf Records Success',
  UPDATE_PARENT_MANF_RECORDS_FAIL = '[MASTERING_MODULE] Update Parent Manf Records Fail',
  GET_ACTIVE_PARENT_MANF = '[MASTERING_MODULE] Get Active Parent Manf Records',
  GET_ACTIVE_PARENT_MANF_SUCCESS = '[MASTERING_MODULE] Get Active Parent Manf success',
  GET_ACTIVE_PARENT_MANF_FAIL = '[MASTERING_MODULE] Get Active Parent Manf Fail',
  GET_CHILD_PARENT_MANF_RECORDS = '[MASTERING_MODULE] Get Child Parent Manf Records',
  GET_CHILD_PARENT_MANF_RECORDS_SUCCESS = '[MASTERING_MODULE] Get Child Parent Manf success',
  GET_CHILD_PARENT_MANF_RECORDS_FAIL = '[MASTERING_MODULE] Get Child Parent Manf Fail',
  CREATE_CHILD_MANF_RECORD = '[MASTERING_MODULE] Create New child Manf Records',
  CREATE_CHILD_MANF_RECORD_SUCCESS = '[MASTERING_MODULE] Create New child Manf Records Success',
  CREATE_CHILD_MANF_RECORD_FAIL = '[MASTERING_MODULE] Create New child Manf Records Fail',
  GET_PARENT_MANF_CHANGE_LOG = '[MASTERING_MODULE] Get Parent Manf Change Log',
  GET_PARENT_MANF_CHANGE_LOG_SUCCESS = '[MASTERING_MODULE] Get Parent Manf Change Log Success',
  GET_PARENT_MANF_CHANGE_LOG_FAIL = '[MASTERING_MODULE] Get Parent Manf Change Log Fail',
  GET_CHILD_MANF_CHANGE_LOG = '[MASTERING_MODULE] Get Child Manf Change Log',
  GET_CHILD_MANF_CHANGE_LOG_SUCCESS = '[MASTERING_MODULE] Get Child Manf Change Log Success',
  GET_CHILD_MANF_CHANGE_LOG_FAIL = '[MASTERING_MODULE] Get Child Manf Change Log Fail',
  UPDATE_CHILD_PARENT_MANF_RECORDS = '[MASTERING_MODULE] Update Parent-Child Manf Records',
  UPDATE_CHILD_PARENT_MANF_RECORDS_SUCCESS = '[MASTERING_MODULE] Update Parent-Child Manf Records Success',
  UPDATE_CHILD_PARENT_MANF_RECORDS_FAIL = '[MASTERING_MODULE] Update Parent-Child Manf Records Fail',
  GET_ACTIVE_CHILD_PARENT_MANF = '[MASTERING_MODULE] Get Active All Child Parent Manf Records',
  GET_ACTIVE_CHILD_PARENT_MANF_SUCCESS = '[MASTERING_MODULE] Get Active All Child Parent Manf success',
  GET_ACTIVE_CHILD_PARENT_MANF_FAIL = '[MASTERING_MODULE] Get Active All Child Parent Manf Fail',
  GET_MANF_FOR_MAPPING = '[MASTERING_MODULE] Get Manf / mapped Records',
  GET_MANF_FOR_MAPPING_SUCCESS = '[MASTERING_MODULE] Get Manf / mapped Records Success',
  GET_MANF_FOR_MAPPING_FAIL = '[MASTERING_MODULE] Get Manf / mapped Records Fail',
  CREATE_MANUFACTURER_MAPPING = '[MASTERING_MODULE] Create Manufacturer Mapping',
  CREATE_MANUFACTURER_MAPPING_SUCCESS = '[MASTERING_MODULE] Create Manufacturer Mapping Success',
  CREATE_MANUFACTURER_MAPPING_FAIL = '[MASTERING_MODULE] Create Manufacturer Mapping Fail',
  GET_MASTERED_MANF_CHANGE_LOG = '[MASTERING_MODULE] Get Mastered Manf Change Log',
  GET_MASTERED_MANF_CHANGE_LOG_SUCCESS = '[MASTERING_MODULE] Get Mastered Manf Change Log Success',
  GET_MASTERED_MANF_CHANGE_LOG_FAIL = '[MASTERING_MODULE] Get Mastered Manf Change Log Fail',
  GET_MAPPED_MANF_RECORDS = '[MASTERING_MODULE] Get Mastered Manf Records',
  GET_MAPPED_MANF_RECORDS_SUCCESS = '[MASTERING_MODULE] Get Mastered Manf Records Success',
  GET_MAPPED_MANF_RECORDS_FAIL = '[MASTERING_MODULE] Get Mastered Manf Records Fail',
  UPDATE_MASTERED_MAPPED_RECORDS = '[MASTERING_MODULE] Update Mastered Manf Records',
  UPDATE_MASTERED_MAPPED_RECORDS_SUCCESS = '[MASTERING_MODULE] Update Mastered Manf Records Success',
  UPDATE_MASTERED_MAPPED_RECORDS_FAIL = '[MASTERING_MODULE] Update Mastered Manf Records Fail',
  GET_PARENT_CHILD_TOP_RECORD = '[MASTERING_MODULE] Get Parent Child Top Manf Records',
  GET_PARENT_CHILD_TOP_RECORD_SUCCESS = '[MASTERING_MODULE] Get Parent Child Top Records Success',
  GET_PARENT_CHILD_TOP_RECORD_FAIL = '[MASTERING_MODULE] Get Parent Child Top Records Fail',
  EXPORT_PARENT_CHILD_RECORDS_CSV = '[MASTERING_MODULE] Download Parent Child Records CSV',
  EXPORT_PARENT_CHILD_RECORDS_CSV_SUCCESS = '[MASTERING_MODULE] Download Parent Child Records CSV Success',
  EXPORT_PARENT_CHILD_RECORDS_CSV_FAIL = '[MASTERING_MODULE] Download Parent Child Records CSV Fail',
  AUTO_ASSIGN_CREATED_PARENT = '[MASTERING_MODULE] Auto Assign Created Parent or Child Manf',
  GET_ALL_MANF_RECORDS_SEARCH = '[MASTERING_MODULE] Search / Get All Manf Records',
  GET_ALL_MANF_RECORDS_SEARCH_SUCCESS = '[MASTERING_MODULE] Search / Get All Manf Records Success',
  GET_ALL_MANF_RECORDS_SEARCH_FAIL = '[MASTERING_MODULE] Search / Get All Manf Records Fail',
  MANAGE_MANF_MAPPING_ALL_RECORDS = '[MASTERING_MODULE] Manage Mapping all Records ',
  MANAGE_MANF_MAPPING_ALL_RECORDS_SUCCESS = '[MASTERING_MODULE] Manage Mapping all Records Success',
  MANAGE_MANF_MAPPING_ALL_RECORDS_FAIL = '[MASTERING_MODULE] Manage Mapping all Records Fail',
}

export const MasteredTabSearchFormAction = createAction(manfMasterEnum.MANF_MASTER_TAB_FORM_VALUE, props<MasteredTabSearchForm>());

export const GetParentManfRecords = createAction(manfMasterEnum.GET_PARENT_MANF_RECORDS, props<{ payload: any }>());
export const GetParentManfRecordsSuccess = createAction(manfMasterEnum.GET_PARENT_MANF_RECORDS_SUCCESS, props<{ payload: any }>());
export const GetParentManfRecordsFail = createAction(manfMasterEnum.GET_PARENT_MANF_RECORDS_FAIL, props<{ payload: any }>());

export const CreateParentManfRecord = createAction(manfMasterEnum.CREATE_PARENT_MANF_RECORD, props<{ payload: any }>());
export const CreateParentManfRecordSuccess = createAction(manfMasterEnum.CREATE_PARENT_MANF_RECORD_SUCCESS, props<{ payload: any }>());
export const CreateParentManfRecordFail = createAction(manfMasterEnum.CREATE_PARENT_MANF_RECORD_FAIL, props<{ payload: any }>());

export const UpdateParentManfRecords = createAction(manfMasterEnum.UPDATE_PARENT_MANF_RECORDS, props<{ payload: any }>());
export const UpdateParentManfRecordsSuccess = createAction(manfMasterEnum.UPDATE_PARENT_MANF_RECORDS_SUCCESS, props<{ payload: any }>());
export const UpdateParentManfRecordsFail = createAction(manfMasterEnum.UPDATE_PARENT_MANF_RECORDS_FAIL, props<{ payload: any }>());

export const CloseDialogAt = createAction(manfMasterEnum.CLOSE_DIALOG_AT, props<{ date: number; dialogType: string }>());

export const GetAllActiveManfRecords = createAction(manfMasterEnum.GET_ACTIVE_PARENT_MANF);
export const GetAllActiveManfRecordsSuccess = createAction(
  manfMasterEnum.GET_ACTIVE_PARENT_MANF_SUCCESS,
  props<{ payload: parentManfData[] }>()
);
export const GetAllActiveManfRecordsFail = createAction(manfMasterEnum.GET_ACTIVE_PARENT_MANF_FAIL, props<{ payload: any }>());

export const GetChildParentManfRecords = createAction(manfMasterEnum.GET_CHILD_PARENT_MANF_RECORDS, props<{ payload: any }>());
export const GetChildParentManfRecordsSuccess = createAction(
  manfMasterEnum.GET_CHILD_PARENT_MANF_RECORDS_SUCCESS,
  props<{ payload: any }>()
);
export const GetChildParentManfRecordsFail = createAction(manfMasterEnum.GET_CHILD_PARENT_MANF_RECORDS_FAIL, props<{ payload: any }>());

export const CreateChildManfRecord = createAction(manfMasterEnum.CREATE_CHILD_MANF_RECORD, props<{ payload: any }>());
export const CreateChildManfRecordSuccess = createAction(manfMasterEnum.CREATE_CHILD_MANF_RECORD_SUCCESS, props<{ payload: any }>());
export const CreateChildManfRecordFail = createAction(manfMasterEnum.CREATE_CHILD_MANF_RECORD_FAIL, props<{ payload: any }>());

export const getParentManfChangeLog = createAction(manfMasterEnum.GET_PARENT_MANF_CHANGE_LOG, props<{ payload: any }>());
export const getParentManfChangeLogSuccess = createAction(manfMasterEnum.GET_PARENT_MANF_CHANGE_LOG_SUCCESS, props<{ payload: any }>());
export const getParentManfChangeLogFail = createAction(manfMasterEnum.GET_PARENT_MANF_CHANGE_LOG_FAIL, props<{ payload: any }>());

export const getChildChangeLog = createAction(manfMasterEnum.GET_CHILD_MANF_CHANGE_LOG, props<{ payload: any }>());
export const getChildChangeLogSuccess = createAction(manfMasterEnum.GET_CHILD_MANF_CHANGE_LOG_SUCCESS, props<{ payload: any }>());
export const getChildChangeLogFail = createAction(manfMasterEnum.GET_CHILD_MANF_CHANGE_LOG_FAIL, props<{ payload: any }>());

export const UpdateChildParentRecords = createAction(manfMasterEnum.UPDATE_CHILD_PARENT_MANF_RECORDS, props<{ payload: any }>());
export const UpdateChildParentRecordsSuccess = createAction(
  manfMasterEnum.UPDATE_CHILD_PARENT_MANF_RECORDS_SUCCESS,
  props<{ payload: any }>()
);
export const UpdateChildParentRecordsFail = createAction(manfMasterEnum.UPDATE_CHILD_PARENT_MANF_RECORDS_FAIL, props<{ payload: any }>());

export const GetAllActiveChildManf = createAction(manfMasterEnum.GET_ACTIVE_CHILD_PARENT_MANF);
export const GetAllActiveChildManfSuccess = createAction(
  manfMasterEnum.GET_ACTIVE_CHILD_PARENT_MANF_SUCCESS,
  props<{ payload: activeChildMaf[] }>()
);
export const GetAllActiveChildManfFail = createAction(manfMasterEnum.GET_ACTIVE_CHILD_PARENT_MANF_FAIL, props<{ payload: any }>());

export const getManfForMapping = createAction(manfMasterEnum.GET_MANF_FOR_MAPPING, props<{ payload: any }>());
export const getManfForMappingSuccess = createAction(manfMasterEnum.GET_MANF_FOR_MAPPING_SUCCESS, props<{ payload: any }>());
export const getManfForMappingFail = createAction(manfMasterEnum.GET_MANF_FOR_MAPPING_FAIL, props<{ payload: any }>());

export const createManufacturerMapping = createAction(manfMasterEnum.CREATE_MANUFACTURER_MAPPING, props<{ payload: any }>());
export const createManufacturerMappingSuccess = createAction(manfMasterEnum.CREATE_MANUFACTURER_MAPPING_SUCCESS, props<{ payload: any }>());
export const createManufacturerMappingFail = createAction(manfMasterEnum.CREATE_MANUFACTURER_MAPPING_FAIL, props<{ payload: any }>());

export const getMasteredChangeLog = createAction(manfMasterEnum.GET_MASTERED_MANF_CHANGE_LOG, props<{ payload: any }>());
export const getMasteredChangeLogSuccess = createAction(manfMasterEnum.GET_MASTERED_MANF_CHANGE_LOG_SUCCESS, props<{ payload: any }>());
export const getMasteredChangeLogFail = createAction(manfMasterEnum.GET_MASTERED_MANF_CHANGE_LOG_FAIL, props<{ payload: any }>());


export const getMasteredManfRecords = createAction(manfMasterEnum.GET_MAPPED_MANF_RECORDS, props<{ payload: any }>());
export const getMasteredManfRecordsSuccess = createAction(manfMasterEnum.GET_MAPPED_MANF_RECORDS_SUCCESS, props<{ payload: any }>());
export const getMasteredManfRecordsFail = createAction(manfMasterEnum.GET_MAPPED_MANF_RECORDS_FAIL, props<{ payload: any }>());

export const updateMasteredMappedRecords = createAction(manfMasterEnum.UPDATE_MASTERED_MAPPED_RECORDS, props<{ payload: any }>());
export const updateMasteredMappedRecordsSuccess = createAction(manfMasterEnum.UPDATE_MASTERED_MAPPED_RECORDS_SUCCESS, props<{ payload: any }>());
export const updateMasteredMappedRecordsFail = createAction(manfMasterEnum.UPDATE_MASTERED_MAPPED_RECORDS_FAIL, props<{ payload: any }>());

export const getParentChildManfRecords = createAction(manfMasterEnum.GET_PARENT_CHILD_TOP_RECORD);
export const getParentChildManfRecordsSuccess = createAction(manfMasterEnum.GET_PARENT_CHILD_TOP_RECORD_SUCCESS, props<{ payload: any }>());
export const getParentChildManfRecordsFail = createAction(manfMasterEnum.GET_PARENT_CHILD_TOP_RECORD_FAIL, props<{ payload: any }>());

export const downloadParentChildRecordsCsv = createAction(manfMasterEnum.EXPORT_PARENT_CHILD_RECORDS_CSV, props<{payload: ProductSearchCriteria}>());
export const downloadParentChildRecordsCsvSuccess = createAction(manfMasterEnum.EXPORT_PARENT_CHILD_RECORDS_CSV_SUCCESS);
export const downloadParentChildRecordsCsvFail = createAction(manfMasterEnum.EXPORT_PARENT_CHILD_RECORDS_CSV_FAIL);

export const autoAssignManfToRecord = createAction(manfMasterEnum.AUTO_ASSIGN_CREATED_PARENT, props<{payload: any}>());

export const GetAllManfRecords = createAction(manfMasterEnum.GET_ALL_MANF_RECORDS_SEARCH, props<{payload: ProductSearchCriteria}>());
export const GetAllManfRecordsSuccess = createAction(manfMasterEnum.GET_ALL_MANF_RECORDS_SEARCH_SUCCESS, props<{payload: MasteredDataResponse}>());
export const GetAllManfRecordsFail = createAction(manfMasterEnum.GET_ALL_MANF_RECORDS_SEARCH_FAIL, props<{payload: any}>());

export const ManageMappingAllRecords = createAction(manfMasterEnum.MANAGE_MANF_MAPPING_ALL_RECORDS, props<{ payload: any }>());
export const ManageMappingAllRecordsSuccess = createAction(manfMasterEnum.MANAGE_MANF_MAPPING_ALL_RECORDS_SUCCESS, props<{ payload: masteredMappedModel[] }>());
export const ManageMappingAllRecordsFail = createAction(manfMasterEnum.MANAGE_MANF_MAPPING_ALL_RECORDS_FAIL, props<{ payload: any }>());



