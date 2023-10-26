import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const selectCart = (state: RootState) => state.cart;

export const selectCartItem = createSelector(
  [selectCart],
  (item) => item.cartItems
);
