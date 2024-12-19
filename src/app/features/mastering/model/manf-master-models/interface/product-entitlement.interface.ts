import { loadingState } from 'src/app/features/item-to-product/store/reducers/staging-curation.reducer';
import { updatedCreatedModel } from './common.interface';
import { recordsCounts } from './manf-master.interface';
import { MarketMasterModel } from './unspsc-master.interface';

export const initialProductState: ProductEntitlementState = {
  productEntitlementRecord: null,
  loadingState: { loading: true },
  unspscSearchRecord: null,
  activeBrandMappings: [],
  productChangeLogRecords: null,
  closeUploadDrawerPim: null,
  prodManfSkuDuplicateRecords: null,
  productDuplicateList: null,
  I2PGrahHistoryChangeLogRecords: null,
  itemToProductGraphDetails:null,
};

export interface ProductEntitlementState {
  productEntitlementRecord: productEntitlementResponse;
  loadingState: loadingState;
  unspscSearchRecord: unspscResponse;
  activeBrandMappings: ActiveBrandMapping[],
  productChangeLogRecords: productEntitlementRecord[],
  closeUploadDrawerPim: number,
  prodManfSkuDuplicateRecords: Array<{ manfSKU: string, productIDs: number[] }>,
  productDuplicateList: productEntitlementResponse,
  I2PGrahHistoryChangeLogRecords: i2pGraphHistoryChangeLogModel[],
  itemToProductGraphDetails:ItemToProductGraphDetailsResponse,
}
export interface productEntitlementResponse extends recordsCounts {
  records: productEntitlementRecord[];
}

export interface productEntitlementRecord extends updatedCreatedModel {
  brandMapIDName: string;
  unspscID: number;
  unspscDesc: string;
  unspscSource: string;
  id: number;
  prodID: number;
  prodSKU: string;
  prodDesc: string;
  itemSKUs: string;
  itemDescriptions: string;
  manfID: string;
  manfName: string;
  parentManfID: string;
  parentManfName: string;
  topParentManfID: string;
  topParentManfName: string;
  brandID: string;
  brandname: any;
  unspscCode: string;
  privateFlag: string;
  customFlag: string;
  kptFlag: string;
  comments: string;
  isLoading?: boolean;
  unspscMarketID: string;
  unspscMarketName: string;
  unspscSubmarketName: string;
  invalidUNSPSC?: boolean;
  manfDisplayName?: string;
  parentManfDisplayName?: string;
  topParentManfDisplayName?: string;
  prodActiveFlag?: string;
  prodEffectiveDate?: string;
  prodEndDate?: string;
  isUNSPSCUpdated?: string;
  userRole?: string;
  unspscFlag: string;
  prodUNSPSCUpdatedBy: string;
  prodUNSPSCUpdatedDate: string;
  checkedStatus: string;
  checkedOutUserName: string;
  checkedOutUserEmail: string;
  checkedOutDate: string;
  checkedInUserName: string;
  checkedInUserEmail: string;
  checkedInDate: string;
}

export interface SearchUnspsc {
  UNSPSCCode: string;
  nodeId: number;
  prodID: number;
}
export interface unspscResponse {
  initiatedData: SearchUnspsc;
  responseData: MarketMasterModel;
}

export interface ActiveBrandMapping {
  brandID: string;
  brandMapID: number | string;
  brandName: string;
  manfID: string;
  manfName: string;
  marketID: string;
  marketName: string;
  submarketName: string;
}


export interface i2pGraphHistoryChangeLogModel {
  sku: string;
  groupID: number;
  itemPguid: string;
  manufacturerDesc: string;
  itemDesc: string;
  itemDistSku: string;
  distributorName: string;
  effectiveDate: string;
  endDate: string;
  etlActiveFlag: string
}
export interface ItemToProductGraphDetails {

  groupID: string,
  id : string,
  itemPguid : string,
  manufacturerDesc : string,
  itemDesc : string,
  itemSKU : string,
  itemDist : string,
  itemDistSku : string,
  productId: string
}

export interface ItemToProductGraphDetailsResponse extends recordsCounts{
  itemToProductList: ItemToProductGraphDetails[];
}