import {  autoAppendFor } from './../../model/manf-master-models/interface/common.interface';
import { ProductSearchCriteria } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { createAction, props } from "@ngrx/store";
import { BrandCVChangeLogModel, BrandCVRecord, BrandCVResponse, BrandMappingRecord, BrandMappingResponse, BrandSourceRecord } from '../../model/manf-master-models/interface/brand-cv-filter-options';
import { BrandUpdateModel } from '../../components/brand-master/brand-cv/brand-cv.component';
import { BrandMappingUpdateModel } from '../../components/brand-master/brand-mapping/brand-mapping.component';

export enum BrandMasterEnum {
    GET_BRAND_CV_RECORDS= '[MASTERING_MODULE] Get Brand CV Master Records',
    GET_BRAND_CV_RECORDS_SUCCESS= '[MASTERING_MODULE] Get Brand CV Master Records Success',
    GET_BRAND_CV_RECORDS_FAIL= '[MASTERING_MODULE] Get Brand CV Master Records Fail',
    CREATE_BRAND_CV_RECORD= '[MASTERING_MODULE] Create Brand CV Master Record',
    CREATE_BRAND_CV_RECORD_SUCCESS= '[MASTERING_MODULE] Create Brand CV Master Record Success',
    CREATE_BRAND_CV_RECORD_FAIL = '[MASTERING_MODULE] Create Brand CV Master Record Fail',
    UPDATE_BRAND_CV_RECORDS = '[MASTERING_MODULE] update Brand CV Master Records',
    UPDATE_BRAND_CV_RECORDS_SUCCESS= '[MASTERING_MODULE] Update Brand CV Master Records Success',
    UPDATE_BRAND_CV_RECORDS_FAIL = '[MASTERING_MODULE] Update Brand CV Master Records Fail',
    GET_BRAND_CV_CHANGELOG_RECORDS = '[MASTERING_MODULE] Get Brand CV Master Change log Records',
    GET_BRAND_CV_CHANGELOG_RECORDS_SUCCESS= '[MASTERING_MODULE] Get Brand CV Master Change log Records Success',
    GET_BRAND_CV_CHANGELOG_RECORDS_FAIL = '[MASTERING_MODULE] Get Brand CV Master Change log Records Fail',
    GET_BRAND_MAPPING_RECORDS= '[MASTERING_MODULE] Get Brand Mapping Master Records',
    GET_BRAND_MAPPING_RECORDS_SUCCESS= '[MASTERING_MODULE] Get Brand Mapping Master Records Success',
    GET_BRAND_MAPPING_RECORDS_FAIL= '[MASTERING_MODULE] Get Brand Mapping Master Records Fail',
    GET_ACTIVE_BRAND_RECORDS= '[MASTERING_MODULE] Get All Active Brand CV Master Records',
    GET_ACTIVE_BRAND_RECORDS_SUCCESS= '[MASTERING_MODULE] Get All Active CV Master Records Success',
    GET_ACTIVE_BRAND_RECORDS_FAIL= '[MASTERING_MODULE] Get All Active CV Master Records Fail',
    UPDATE_BRAND_MAPPING_RECORDS= '[MASTERING_MODULE] Update Brand Mapping Records',
    UPDATE_BRAND_MAPPING_RECORDS_SUCCESS= '[MASTERING_MODULE] Update Brand Mapping Records Success',
    UPDATE_BRAND_MAPPING_RECORDS_FAIL= '[MASTERING_MODULE] Update Brand Mapping Records Fail',
    GET_BRAND_MAP_CHANGELOG_RECORDS = '[MASTERING_MODULE] Get Brand MAP Master Change log Records',
    GET_BRAND_MAP_CHANGELOG_RECORDS_SUCCESS= '[MASTERING_MODULE] Get Brand MAP Master Change log Records Success',
    GET_BRAND_MAP_CHANGELOG_RECORDS_FAIL = '[MASTERING_MODULE] Get Brand MAP Master Change log Records Fail',
    AUTO_ASSIGN_BRAND_CV_RECORDS = '[MASTERING_MODULE] Auto Assign created brand to records',
    GET_BRAND_SOURCE= '[MASTERING_MODULE] Get All Brnad source Records',
    GET_BRAND_SOURCE_SUCCESS= '[MASTERING_MODULE] Get All Brnad source Records Success',
    GET_BRAND_SOURCE_FAIL= '[MASTERING_MODULE] Get All Brnad source Records Fail',
}

export const GetBrandCVRecords = createAction(BrandMasterEnum.GET_BRAND_CV_RECORDS, props<{payload: ProductSearchCriteria}>());
export const GetBrandCVRecordsSuccess = createAction(BrandMasterEnum.GET_BRAND_CV_RECORDS_SUCCESS, props<{payload: BrandCVResponse}>());
export const GetBrandCVRecordsFail = createAction(BrandMasterEnum.GET_BRAND_CV_RECORDS_FAIL, props<{payload: any}>());

export const CreateBrandMasterRecord = createAction(BrandMasterEnum.CREATE_BRAND_CV_RECORD, props<{payload: {brandMasterData:{brandname:string
    brandfamily: string,brandmodel: string,childmanfid:string, brandsource: string, brandfilter:string, manfasbrand:string,createdBy:string},autoAppendFor:autoAppendFor}}>());
export const CreateBrandMasterRecordSuccess = createAction(BrandMasterEnum.CREATE_BRAND_CV_RECORD_SUCCESS, props<{payload: BrandCVRecord}>());
export const CreateBrandMasterRecordFail = createAction(BrandMasterEnum.CREATE_BRAND_CV_RECORD_FAIL, props<{payload: any}>());

export const UpdateBrandMasterRecords = createAction(BrandMasterEnum.UPDATE_BRAND_CV_RECORDS, props<{payload: BrandUpdateModel}>());
export const UpdateBrandMasterRecordsSuccess = createAction(BrandMasterEnum.UPDATE_BRAND_CV_RECORDS_SUCCESS, props<{payload: BrandCVRecord[]}>());
export const UpdateBrandMasterRecordsFail = createAction(BrandMasterEnum.UPDATE_BRAND_CV_RECORDS_FAIL, props<{payload: any}>());


export const GetBrandCVRecordChangeLog = createAction(BrandMasterEnum.GET_BRAND_CV_CHANGELOG_RECORDS, props<{payload: {brandID:string}}>());
export const GetBrandCVRecordChangeLogSuccess = createAction(BrandMasterEnum.GET_BRAND_CV_CHANGELOG_RECORDS_SUCCESS, props<{payload: BrandCVChangeLogModel[]}>());
export const GetBrandCVRecordChangeLogFail = createAction(BrandMasterEnum.GET_BRAND_CV_CHANGELOG_RECORDS_FAIL, props<{payload: any}>());

export const GetBrandMappingRecords = createAction(BrandMasterEnum.GET_BRAND_MAPPING_RECORDS, props<{payload: ProductSearchCriteria}>());
export const GetBrandMappingRecordsSuccess = createAction(BrandMasterEnum.GET_BRAND_MAPPING_RECORDS_SUCCESS, props<{payload: BrandMappingResponse}>());
export const GetBrandMappingRecordsFail = createAction(BrandMasterEnum.GET_BRAND_MAPPING_RECORDS_FAIL, props<{payload: any}>());

export const GetActiveBrandMaster = createAction(BrandMasterEnum.GET_ACTIVE_BRAND_RECORDS);
export const GetActiveBrandMasterSuccess = createAction(BrandMasterEnum.GET_ACTIVE_BRAND_RECORDS_SUCCESS, props<{payload: BrandCVRecord[]}>());
export const GetActiveBrandMasterFail = createAction(BrandMasterEnum.GET_ACTIVE_BRAND_RECORDS_FAIL, props<{payload: any}>());

export const GetBrandSource = createAction(BrandMasterEnum.GET_BRAND_SOURCE);
export const GetBrandSourceSuccess = createAction(BrandMasterEnum.GET_BRAND_SOURCE_SUCCESS, props<{payload: BrandSourceRecord[]}>());
export const GetBrandSourceFail = createAction(BrandMasterEnum.GET_BRAND_SOURCE_FAIL, props<{payload: any}>());

export const UpdateBrandMappingRecords = createAction(BrandMasterEnum.UPDATE_BRAND_MAPPING_RECORDS, props<{payload: BrandMappingUpdateModel}>());
export const UpdateBrandMappingRecordsSuccess = createAction(BrandMasterEnum.UPDATE_BRAND_MAPPING_RECORDS_SUCCESS, props<{payload: any}>());
export const UpdateBrandMappingRecordsFail = createAction(BrandMasterEnum.UPDATE_BRAND_MAPPING_RECORDS_FAIL, props<{payload: any}>());

export const GetBrandMapRecordChangeLog = createAction(BrandMasterEnum.GET_BRAND_MAP_CHANGELOG_RECORDS, props<{payload: {brandMapID:string}}>());
export const GetBrandMapRecordChangeLogSuccess = createAction(BrandMasterEnum.GET_BRAND_MAP_CHANGELOG_RECORDS_SUCCESS, props<{payload: BrandMappingRecord[]}>());
export const GetBrandMapRecordChangeLogFail = createAction(BrandMasterEnum.GET_BRAND_MAP_CHANGELOG_RECORDS_FAIL, props<{payload: any}>());

export const autoAssignBrandCVtoRecord = createAction(BrandMasterEnum.AUTO_ASSIGN_BRAND_CV_RECORDS, props<{payload: {autoAppendFor:autoAppendFor,data:BrandCVRecord}}>());
