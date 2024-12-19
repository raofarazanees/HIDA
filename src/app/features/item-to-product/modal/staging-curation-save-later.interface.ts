import { confirmedByUser } from '../../interface/task-submit';

export interface StagingCurationSaveForLater {
  docPGUID: string;
  newUNSPSCList: Array<ListArray>;
  unspscAnalyst: string;
  unspscAnalystEmail: string;
}

export interface ListArray {
  code: string;
  productID: string | number;
  title: string;
  unspscComments: string;
}

export interface ConfirmCuratedProduct extends confirmedByUser {
  records: Array<CuratedRecords>;
  taskID: string;
  taskTitle: string;
  workflowID: string;
}
export interface CuratedRecords {
  confirmationStatus?: string;
  productID: string | number;
  actionPerformed?: string;
  rejectReason?: string;
}
