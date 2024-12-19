import { loadingState } from '../../../../item-to-product/store/reducers/staging-curation.reducer';
import { autoAppendFor } from './common.interface';
import { recordsCounts } from './manf-master.interface';

export const initialStateUnspsc: unspscMasterState = {
  loadingState: { loading: false },
  UnspscSearchedRecords: null,
  activeMarketRecords: [],
  unspscChangeLogRecords: null,
  MarketMasterData: { totalRecords: 0, records: [] },
  autoAssignRecordMarket: null,
  activeBusinessUsers: null
};

export interface unspscMasterState {
  loadingState: loadingState;
  UnspscSearchedRecords: UnspscMasterResponseData;
  activeMarketRecords: MarketMasterModel[];
  unspscChangeLogRecords: UnspscRecordInterface[] | MarketMasterModel[],
  MarketMasterData: MarketMasterResponseData,
  autoAssignRecordMarket: { autoAppendFor: autoAppendFor, data: MarketMasterModel },
  activeBusinessUsers: BusinessUsers[]

}

export interface UnspscMasterResponseData extends recordsCounts {
  records: UnspscRecordInterface[];
}

export interface MarketMasterResponseData extends recordsCounts {
  records: MarketMasterModel[];
}

export interface UnspscRecordInterface {
  unspscCodeID: number;
  unspscCode: number;
  unspscLevel: number;
  unspscLevelName: string;
  unspscDescription: string;
  marketID: string;
  marketName: string;
  submarketName: string;
  unspscScope: string;
  clusteringFlag: string;
  manualFlag: string;
  unspscVersion: string;
  numProductsActive: number | string;
  unspscCreatedBy: string;
  unspscUpdatedBy: string;
  unspscCreatedDate: string;
  unspscUpdatedDate: string;
  isNewAdded?: boolean;
  isModified?: boolean;
  unspscActiveFlag?: boolean;
  unspscEffectiveDate?: string;
  unspscEndDate?: string;
  attributes?: string;
  brands?: string;
  isSellable?: string;
  isReviewed?: string;
  nonSellableReason?: string
  lastReviewedDate?: string;
  lastReviewedBy?: string;
}

export interface MarketMasterModel {
  marketID: string;
  marketName: string;
  submarketName: string;
  active?: string;
  createdBy?: string;
  createdDate?: string;
  updatedBy?: string;
  updateDate?: string;
  isNewAdded?: boolean;
  isModified?: boolean;
  unspscDesc?: string;
}


export interface BusinessUsers {
  userid: string;
  email: string;
  first_name: string;
  last_name: string;
}