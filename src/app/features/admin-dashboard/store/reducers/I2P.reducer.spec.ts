import { CommonI2PActionsEnum } from '../actions';
import {  I2PReducer, initialState,  } from './I2P.reducer';

describe('Reducer: I2P ', () => {

  it('should return loading true on ITEM_TO_PRODUCT_TRIGGER_INCREMENTAL_PROCESS', () => {
    const action = { type: CommonI2PActionsEnum.ITEM_TO_PRODUCT_TRIGGER_INCREMENTAL_PROCESS };
    const expected = { ...initialState, I2PLoadingState : { loading: true} };
    expect(I2PReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on ITEM_TO_PRODUCT_TRIGGER_INCREMENTAL_PROCESS_SUCCESS', () => {
    const action = { type: CommonI2PActionsEnum.ITEM_TO_PRODUCT_TRIGGER_INCREMENTAL_PROCESS_SUCCESS };
    const expected = { ...initialState, I2PLoadingState : { loading: false} };
    expect(I2PReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on ITEM_TO_PRODUCT_TRIGGER_INCREMENTAL_PROCESS_FAIL', () => {
    const action = { type: CommonI2PActionsEnum.ITEM_TO_PRODUCT_TRIGGER_INCREMENTAL_PROCESS_FAIL };
    const expected = { ...initialState, I2PLoadingState : { loading: false} };
    expect(I2PReducer(initialState, action)).toEqual(expected);
  });


  it('should return loading true on ITEM_TO_PRODUCT_TRIGGER_OUTBOUND_REFRESH', () => {
    const action = { type: CommonI2PActionsEnum. ITEM_TO_PRODUCT_TRIGGER_OUTBOUND_REFRESH };
    const expected = { ...initialState, I2PLoadingState : { loading: true} };
    expect(I2PReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on ITEM_TO_PRODUCT_TRIGGER_OUTBOUND_REFRESH_SUCCESS', () => {
    const action = { type: CommonI2PActionsEnum.ITEM_TO_PRODUCT_TRIGGER_OUTBOUND_REFRESH_SUCCESS };
    const expected = { ...initialState, I2PLoadingState : { loading: false} };
    expect(I2PReducer(initialState, action)).toEqual(expected);
  });

  it('should return loading false on ITEM_TO_PRODUCT_TRIGGER_OUTBOUND_REFRESH_FAIL', () => {
    const action = { type: CommonI2PActionsEnum.ITEM_TO_PRODUCT_TRIGGER_OUTBOUND_REFRESH_FAIL };
    const expected = { ...initialState, I2PLoadingState : { loading: false} };
    expect(I2PReducer(initialState, action)).toEqual(expected);
  });


})