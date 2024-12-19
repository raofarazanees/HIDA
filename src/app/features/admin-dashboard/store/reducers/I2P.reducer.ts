import { Action, createReducer, on } from '@ngrx/store';
import {  I2POutboundSnowFlakeRefresh, I2POutboundSnowFlakeRefreshFail, I2POutboundSnowFlakeRefreshSuccess, ItemToProductIncrementalProcess, ItemToProductIncrementalProcessFail, ItemToProductIncrementalProcessSuccess } from '../actions';
import { FileUploadState, initialFileUpload } from './common.reducer';

export interface I2PState {
    I2PLoadingState: FileUploadState
};

export const initialState: I2PState = {
    I2PLoadingState: initialFileUpload
};

export const reducer = createReducer(
    initialState,
    on(ItemToProductIncrementalProcess, state => ({ ...state, I2PLoadingState: { loading: true }})),
    on(ItemToProductIncrementalProcessSuccess, state => ({ ...state, I2PLoadingState: { loading: false } })),
    on(ItemToProductIncrementalProcessFail, state => ({ ...state, I2PLoadingState: { loading: false } })),
    on(I2POutboundSnowFlakeRefresh, state => ({ ...state, I2PLoadingState: { loading: true } })),
    on(I2POutboundSnowFlakeRefreshFail, state => ({ ...state, I2PLoadingState: { loading: false } })),
    on(I2POutboundSnowFlakeRefreshSuccess, state => ({ ...state, I2PLoadingState: { loading: false }})),
);

export function I2PReducer(state: I2PState | undefined, action: Action) {
    return reducer(state, action);
  }