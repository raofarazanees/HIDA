import { createdByModel } from 'src/app/model/staging-curation/create-update.interface';
import { loadingState } from './../../../../item-to-product/store/reducers/staging-curation.reducer';
import { recordsCounts } from './manf-master.interface';
import { facilityMasterUpdateRecords } from '../../../components/facility-master/facility-master-components/facility-master.component';
import { autoAppendFor } from './common.interface';

export const initialFacilityState: facilityMasterState = {
  closeDialogAt: { date: 0, dialogType: '' },
  loadingState: { loading: true },
  facilityMasterRecords: null,
  activeFacilityMasterRecords: [],
  facilityForMappingRecords: null,
  facilityMasterChangeLogRecords: null,
  facilityMappedResponse:null,
  autoAssignRecordFacility:null,
  facilityAllRecordsResponse:null,
  updatedFacRecords:null,

};

export interface facilityMasterState {
  closeDialogAt: { date: number; dialogType: string };
  loadingState: loadingState;
  facilityMasterRecords: FacilityMasterResponseData;
  activeFacilityMasterRecords: facilityMasterUpdateRecords[];
  facilityForMappingRecords: FacilityForMappingResponseData;
  facilityMasterChangeLogRecords: facilityMasterChangeLogData[];
  facilityMappedResponse:FacilityMappedRecordsRes;
  autoAssignRecordFacility:{autoAppendFor:autoAppendFor,data:facilityMasterData},
  facilityAllRecordsResponse:FacilityMappedRecordsRes;
  updatedFacRecords:FacilityMappedRecord[]
}

export interface FacilityMasterResponseData extends recordsCounts {
  records: facilityMasterData[];
}

export interface facilityMasterData {
  facilityID: string;
  facilityGroupName: string;
  facilitySubgroupName: string;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
  active: string;
  isNewAdded?: boolean;
  isModified?: boolean;
}
export interface createFacilityMaster extends createdByModel {
  facilityGroupName: string;
  facilitySubgroupName: string;
}

export interface FacilityForMappingResponseData extends recordsCounts {
  records: facilityMappingRecords[];
}

export interface facilityMappingRecords {
  facilityPGUID: string;
  facilityDistPGUID: string;
  facilityDistName: string;
  extFacilityKey: string;
  extFacilityDesc: string;
  extFacilityCreatedDate: string;
  extFacilityUpdatedDate: string;
  isNewAdded?: boolean;
  isModified?: boolean;
  facilitySubGroupName?: string;
  facilityGroupName?: string;
  facilityID?: string;
  comments?: string;
}

export interface facilityMasterChangeLogData {
  facilityID: string;
  facilityGroupName: string;
  facilitySubgroupName: string;
  createdBy: string;
  updatedBy: string;
  facilityActiveFlag: string;
  facilityEffectiveDate: string;
  active: string;
  facilityEndDate?: string;
}

export interface FacilityMappedRecordsRes extends recordsCounts {
  records: FacilityMappedRecord[];
}

export interface FacilityMappedRecord {
  distrPGUID: string;
  distrName: string;
  mappingComments: string;
  mapCreatedBy: string;
  mapUpdatedBy: string;
  mapCreatedDate: string;
  mapUpdatedDate: string;
  facMapID: number;
  facID: string;
  facGroupName: string;
  facSubgroupName: string;
  facPGUID: string;
  extFacKey: string;
  extFacDesc: string;
  isModified?: boolean;
  isNewAdded?:boolean;
  isMastered?: string;
  extFacCreatedDate?: string;
  extFacUpdatedDate?: string;
}


export interface facilityMappedChangeLogData {
  facMapID: string;
  facID: string;
  facGroupName: string;
  facSubgroupName: string;
  mappingComments: string;
  mapCreatedBy: string;
  mapUpdatedBy: string;
  mapActiveFlag: string;
  mapEffectiveDate: string;
  mapEndDate: string;

}

export interface facilityMasterChangeLogData {
  facilityID: string;
  facilityGroupName: string;
  facilitySubgroupName: string;
  createdBy: string;
  updatedBy: string;
  facilityActiveFlag: string;
  facilityEffectiveDate: string;
  active: string;
  facilityEndDate?: string;
}
