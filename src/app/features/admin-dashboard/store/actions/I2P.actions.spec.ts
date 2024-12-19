import {
  CommonI2PActionsEnum,
  I2POutboundSnowFlakeRefresh,
  I2POutboundSnowFlakeRefreshFail,
  I2POutboundSnowFlakeRefreshSuccess,
  ItemToProductIncrementalProcess,
  ItemToProductIncrementalProcessFail,
  ItemToProductIncrementalProcessSuccess
} from './I2P.actions';

describe('Actions :: I2P', () => {
  it('should create an ITEM_TO_PRODUCT_TRIGGER_INCREMENTAL_PROCESS action', () => {
    const action = ItemToProductIncrementalProcess({ payload: '' });
    expect(action.type).toEqual(CommonI2PActionsEnum.ITEM_TO_PRODUCT_TRIGGER_INCREMENTAL_PROCESS);
  });

  it('should create an ITEM_TO_PRODUCT_TRIGGER_INCREMENTAL_PROCESS_SUCCESS action', () => {
    const action = ItemToProductIncrementalProcessSuccess({ payload: '' });
    expect(action.type).toEqual(CommonI2PActionsEnum.ITEM_TO_PRODUCT_TRIGGER_INCREMENTAL_PROCESS_SUCCESS);
  });

  it('should create an ITEM_TO_PRODUCT_TRIGGER_INCREMENTAL_PROCESS_FAIL action', () => {
    const action = ItemToProductIncrementalProcessFail({ payload: '' });
    expect(action.type).toEqual(CommonI2PActionsEnum.ITEM_TO_PRODUCT_TRIGGER_INCREMENTAL_PROCESS_FAIL);
  });

  it('should create an ITEM_TO_PRODUCT_TRIGGER_OUTBOUND_REFRESH action', () => {
    const action = I2POutboundSnowFlakeRefresh({ payload: '' });
    expect(action.type).toEqual(CommonI2PActionsEnum.ITEM_TO_PRODUCT_TRIGGER_OUTBOUND_REFRESH);
  });

  it('should create an ITEM_TO_PRODUCT_TRIGGER_OUTBOUND_REFRESH_SUCCESS action', () => {
    const action = I2POutboundSnowFlakeRefreshSuccess({ payload: '' });
    expect(action.type).toEqual(CommonI2PActionsEnum.ITEM_TO_PRODUCT_TRIGGER_OUTBOUND_REFRESH_SUCCESS);
  });

  it('should create an ITEM_TO_PRODUCT_TRIGGER_OUTBOUND_REFRESH_FAIL action', () => {
    const action = I2POutboundSnowFlakeRefreshFail({ payload: '' });
    expect(action.type).toEqual(CommonI2PActionsEnum.ITEM_TO_PRODUCT_TRIGGER_OUTBOUND_REFRESH_FAIL);
  });

});
