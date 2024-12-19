import { loadingState } from '../../../../item-to-product/store/reducers/staging-curation.reducer';
import { recordsCounts } from './manf-master.interface';

export const initialStateZip: zipMasterState = {
  loadingState: { loading: false },
  zipSearchedRecords: null,
  zipChangeLogRecords: null,
};

export interface zipMasterState {
  loadingState: loadingState;
  zipSearchedRecords: ZipMasterResponseData;
  zipChangeLogRecords: ZipRecordInterface[],
}

export interface ZipMasterResponseData extends recordsCounts {
  records: ZipRecordInterface[];
}

export interface ZipRecordInterface {
  zip: number;
  stateAbbr: number;
  stateDisplay: number;
  displayName2: string;
  active : string;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate : string;
  activeFlag: string;
  manueffectiveDate: string;
  endDate: string;
  isNewAdded?: boolean;
  isModified?: boolean;
}


export interface BusinessUsers {
  userid: string;
  email: string;
  first_name: string;
  last_name: string;
}