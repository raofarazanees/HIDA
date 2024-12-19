import { DefaultYesNoValues } from './unspsc-master-filter-options';
import { searchCriteriaInternal } from 'src/app/features/admin-dashboard/store/reducers/common.reducer';
import { CommonCreateUpdateOptions } from './common.search-options';
import { recordsCounts } from './manf-master.interface';
import { updatedCreatedModel } from './common.interface';

export const BrandCvSearchOptions = (): searchCriteriaInternal[] => [
  
  {
    columnName: 'pmanfname',
    columnLabel: 'Parent Manufacturer',
    isSelected: false
  },
  {
    columnName: 'manfname',
    columnLabel: 'Manf Name',
    isSelected: false
  },
  {
    columnName: 'brand_name',
    columnLabel: 'Brand Name',
    isSelected: false
  },
  {
    columnName: 'brandsource',
    columnLabel: 'Source',
    isSelected: false
  },
  {
    columnName: 'brandfamily',
    columnLabel: 'Brand Family',
    isSelected: false
  },
  {
    columnName: 'brandmodel',
    columnLabel: 'Brand Model',
    isSelected: false
  },
  {
    columnName: 'brandfilter',
    columnLabel: 'Additional Brand Filter?',
    isSelected: false,
    inputType: 'dropdown',
    dropdownValues: DefaultYesNoValues
  },
  {
    columnName: 'manfasbrand',
    columnLabel: 'Manf as Brand?',
    isSelected: false,
    inputType: 'dropdown',
    dropdownValues: DefaultYesNoValues
  },
  {
    columnName: 'rejectedFlag',
    columnLabel: 'Rejected?',
    isSelected: false,
    inputType: 'dropdown',
    dropdownValues: DefaultYesNoValues
  },
  ...CommonCreateUpdateOptions()
];

export interface BrandCVResponse extends recordsCounts {
  records: BrandCVRecord[];
}

export interface BrandCVRecord extends updatedCreatedModel {
  brandID: string;
  brandfamily:string,
  brandmodel:string,
  brandname:string,
  childmanfid:string,
  brandsource:string,
  brandfilter: string,
  manfasbrand: string,
  rejectedFlag:string,
  pmanfid: string;
}

export interface BrandSourceRecord extends updatedCreatedModel {
  sourceId: string;
  sourceName:string;
  active:string;
}

export interface BrandCVChangeLogModel {
  brandID: string;
  brandActiveFlag: string;
  brandEffectiveDate: string;
  brandEndDate: string;
  createdBy: string;
  updatedBy: string;
  brandname: string;
  active: string;
}

export interface BrandMappingResponse extends recordsCounts {
  records: BrandMappingRecord[];
}

export interface BrandMappingRecord extends updatedCreatedModel {
  brandID: string;
  brandname: string;
  brandMapID:number;
  rank:number;
  isBrandMapActive: string;
  manfID:string;
  manfName:string;
  parentManfID:string;
  parentManfName:string;
  topParentManfID:string;
  topParentManfName:string;
  marketID:String;
  marketName:string;
  submarketName:string;
  comments:string;
  totalCount?:string,
  brandMapEffectiveDate?:string;
  brandMapEndDate?:string;
  brandMapActiveFlag?:string;
  childDisplayName?:string;
  parentDisplayName?:string;
  topParentDisplayName?:string;
}

export interface CreateBrandCvData {

  brandfamily:string,
  brandmodel:string,
  brandname:string,
  childmanfid:string,
  brandsource:string,
  brandfilter: string,
  manfasbrand: string,
  createdBy:string
}