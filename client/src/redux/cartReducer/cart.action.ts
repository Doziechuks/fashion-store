import { cartActionType, CartItemProps } from "./cart.type";

export const addItemToCart = (item: CartItemProps) => ({
  type: cartActionType.ADD_ITEM,
  payload: item,
});

export const resetCart = () => ({
  type: cartActionType.RESET_CART,
});

export const removeItemFromCart = (id: CartItemProps) => ({
  type: cartActionType.REMOVE_ITEM,
  payload: id,
});
