import { loadingState } from './../../../../item-to-product/store/reducers/staging-curation.reducer';
import { ChildParentRecord, activeChildMaf, childManfChangeLogModel, childParentManfResponse, parentManfChangeLogModel } from './child-parent-manf.interface';
import { autoAppendFor } from './common.interface';
import { masteredMappedModel } from './mastered-mapped.interface';

export class MasteredTabSearchForm {
  searchText: string | number;
  columnName: string;
  searchCondition: string;
  minValue?: number | string;
  maxValue?: number | string;
  dateRange?:{begin:Date | null, end:Date | null}
  containSearch?:string
  public static default(): MasteredTabSearchForm {
    return {
      searchText: '',
      columnName: '',
      searchCondition: 'AND',
      minValue:'',
      maxValue:'',
      dateRange:{begin:null, end:null},
      containSearch:'Equals',
    };
  }
}

export const initialState: manfMasterState = {
  closeDialogAt: { date: 0, dialogType: '' },
  masteredTabSearchFormState: MasteredTabSearchForm.default(),
  loadingState: { loading: false,parentChildLoading:false,parentChildRelLoading:false,parentLoading:false },
  parentManfRecords: {totalRecords:0,records:[]},
  activeParentManfRecords: [],
  childParentManfRecords: {totalRecords:0,records:[]},
  ManfChangeLogRecords: null,
  activeChildManfRecords: [],
  manfRecordsForMapping: null,
  mappedMasteredRecords:null,
  parentChildTopMapping:null,
  manfAutoAssignRecords:null,
  allManfRecords:null,
  updatedManfRecords:null

};

export interface manfLoading extends loadingState {
  parentLoading:boolean;
  parentChildLoading:boolean;
  parentChildRelLoading:boolean;
}

export interface manfMasterState {
  closeDialogAt: { date: number; dialogType: string };
  masteredTabSearchFormState: MasteredTabSearchForm;
  loadingState: manfLoading;
  parentManfRecords: ParentManfResponseData;
  activeParentManfRecords: parentManfData[];
  childParentManfRecords: childParentManfResponse;
  ManfChangeLogRecords: parentManfChangeLogModel[] | childManfChangeLogModel[];
  activeChildManfRecords: activeChildMaf[];
  manfRecordsForMapping: UnMasteredDataResponse;
  mappedMasteredRecords: MasteredDataResponse;
  parentChildTopMapping:parentChildTopMapping[],
  manfAutoAssignRecords: {autoAppendFor:autoAppendFor,data:any},
  allManfRecords: MasteredDataResponse;
  updatedManfRecords:masteredMappedModel[]
}

export interface ParentManfResponseData extends recordsCounts {
  records: parentManfData[];
}

export interface recordsCounts {
  totalRecords: number | string;
}

export interface parentManfData {
  parentManfID: string;
  parentManfName: string;
  active?: string;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: string;
  updatedDate?: string;
  isNewAdded?: boolean;
  isModified?: boolean;
}


export interface UnMasteredDataResponse extends recordsCounts {
  records: UnMasteredRecords[];
}

export interface MasteredDataResponse extends recordsCounts {
  records: masteredMappedModel[];
}

export interface UnMasteredRecords {
  manfPGUID: string;
  distPGUID: string;
  distName: string;
  extManfKey: string;
  extManfDesc: string;
  extManfCreatedDate: string;
  extManfUpdatedDate: string;
  isModified?: boolean;
  isNewAdded?: boolean;
  manfID?: string;
  manfName?: string;
  manufacturer_mapping: string;
  childDisplayName?: string;
  comments?: string
  parentManfName?:string,
  parentManfID?:string,
  parentDisplayName?:string,
  topDisplayName?:string,

}


export interface  parentChildTopMapping {
  childManfID: string;
  childManfName:string;
  parentManfID: string;
  parentManfName: string;
  topParentManfID: string;
  topParentManfName: string;
  parentDisplayName: string;
  topParentDisplayName: string;
  childDisplayName: string;
}