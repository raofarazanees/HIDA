import { Action, createAction, props } from '@ngrx/store';

export enum CommonI2PActionsEnum {
  ITEM_TO_PRODUCT_TRIGGER_INCREMENTAL_PROCESS = '[DASHBOARDMODULE] I2P Trigger Incremental Process',
  ITEM_TO_PRODUCT_TRIGGER_INCREMENTAL_PROCESS_SUCCESS = '[DASHBOARDMODULE] I2P Trigger Incremental Process Success',
  ITEM_TO_PRODUCT_TRIGGER_INCREMENTAL_PROCESS_FAIL = '[DASHBOARDMODULE] I2P Trigger Incremental Process Fail',
  ITEM_TO_PRODUCT_TRIGGER_OUTBOUND_REFRESH = '[DASHBOARDMODULE] I2P Trigger Outbound Snowflake Refresh',
  ITEM_TO_PRODUCT_TRIGGER_OUTBOUND_REFRESH_SUCCESS = '[DASHBOARDMODULE] I2P Trigger Outbound Snowflake Refresh Success',
  ITEM_TO_PRODUCT_TRIGGER_OUTBOUND_REFRESH_FAIL = '[DASHBOARDMODULE] I2P Trigger Outbound Snowflake Refresh Fail'
}

export const ItemToProductIncrementalProcess = createAction(
    CommonI2PActionsEnum.ITEM_TO_PRODUCT_TRIGGER_INCREMENTAL_PROCESS,
    props<{ payload: any }>()
  );
  
  export const ItemToProductIncrementalProcessSuccess = createAction(
    CommonI2PActionsEnum.ITEM_TO_PRODUCT_TRIGGER_INCREMENTAL_PROCESS_SUCCESS,
    props<{ payload: any }>()
  );
  
  export const ItemToProductIncrementalProcessFail = createAction(
    CommonI2PActionsEnum.ITEM_TO_PRODUCT_TRIGGER_INCREMENTAL_PROCESS_FAIL,
    props<{ payload: any }>()
  );

  
export const I2POutboundSnowFlakeRefresh = createAction(
  CommonI2PActionsEnum.ITEM_TO_PRODUCT_TRIGGER_OUTBOUND_REFRESH,
  props<{ payload: any }>()
);

export const I2POutboundSnowFlakeRefreshSuccess = createAction(
  CommonI2PActionsEnum.ITEM_TO_PRODUCT_TRIGGER_OUTBOUND_REFRESH_SUCCESS,
  props<{ payload: any }>()
);

export const I2POutboundSnowFlakeRefreshFail = createAction(
  CommonI2PActionsEnum.ITEM_TO_PRODUCT_TRIGGER_OUTBOUND_REFRESH_FAIL,
  props<{ payload: any }>()
);
