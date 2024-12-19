import { recordsCounts } from './manf-master.interface';

export interface ChildParentRecord {
  childManfID: string;
  childManfName: string;
  blacklistFlag: string;
  childManfActive: string;
  childDisplayName: string;
  childManfCreatedBy: string;
  childManfUpdatedBy: string;
  childManfCreatedDate: string;
  childManfUpdatedDate: string;
  parentManfID?: string;
  parentManfName?: string;
  parentManfActive?: string;
  parentManfCreatedBy?: string;
  parentManfUpdatedBy?: string;
  parentManfCreatedDate?: string;
  parentManfUpdatedDate?: string;
  isNewAdded?: boolean;
  isModified?: boolean;
  topParentManfName?:string;
  topParentManfID?: string;
}

export interface activeChildMaf {
  childManfID: string;
  childManfName: string;
  childDisplayName: string; 
}

export interface childParentManfResponse extends recordsCounts {
  records: ChildParentRecord[];
}

export interface parentManfChangeLogModel {
  active: string;
  createdBy: string;
  updatedBy: string;
  activeFlag: string;
  effectiveDate: string;
  endDate: string;
  skParentManfID: string;
  parentManfID: string;
  parentManfName: string;
}

export interface childManfChangeLogModel {
  childManfID: string;
  childManfName: string;
  blacklistFlag: string;
  childManfActive: string;
  childManfCreatedBy: string;
  childManfUpdatedBy: string;
  parentManfID: string;
  parentManfName: string;
  parentManfActive: string;
  parentManfCreatedBy: string;
  parentManfUpdatedBy: string;
  parentManfCreatedDate: string;
  parentManfUpdatedDate: string;
  childManfActiveFlag: string;
  childManfEffectiveDate: string;
  childManfEndDate: string;
}
