import { createSelector } from "@ngrx/store";
import { getI2PState, I2PState } from "../reducers";

export const getItemToProductLoadingState = createSelector(getI2PState, (state: I2PState) => state.I2PLoadingState?.loading);

