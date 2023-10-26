export const cartActionType = {
  ADD_ITEM: "ADD_ITEMS",
  REMOVE_ITEM: "REMOVE_ITEM",
  RESET_CART: "RESET_CART",
};

export interface CartItemProps {
  id?: number;
  title: string;
  img: string;
  price: number;
  quantity: number;
  desc: string;
  vendor: string;
}
