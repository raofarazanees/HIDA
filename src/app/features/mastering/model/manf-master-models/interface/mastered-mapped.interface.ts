export interface masteredMappedModel {
  manfMapID: number;
  manfID: string;
  manfName: string | object;
  distrPGUID: string;
  distrName: string;
  manuPGUID: string;
  mappingComments: string;
  mapCreatedBy: string;
  mapUpdatedBy: string;
  parManfID: string;
  parManfName: string;
  blacklisted: string;
  extManufKey: string;
  extManufDesc: string;
  mapActiveFlag: string;
  mapEffectiveDate: string;
  mapEndDate: string;
  mapUpdatedDate: string;
  mapCreatedDate: string;
  isNewAdded?: boolean;
  isModified?: boolean;
  topParManfID?: string;
  topParManfName?: string;
  childDispName?: string;
  parDispName?: string;
  topParDispName?: string;
  isMastered?:string;
  revenue?:string;
  rowIndexUI?:number;
  manufacturerPGUID?:string
}
