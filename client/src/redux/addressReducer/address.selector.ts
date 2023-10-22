import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const selectAddress = (state: RootState) => state.address;

export const selectAddressList = createSelector(
  [selectAddress],
  (item) => item.addressList
);
