import { cartActionType, CartItemProps } from "./cart.type";
import { addItem } from "./cart.utils";

interface CartItem {
  id?: number;
  title: string;
  img: string;
  price: number;
  quantity: number;
  desc: string;
  vendor: string;
}

interface CartState {
  cartItems: CartItemProps[];
}

interface AddItemAction {
  type: typeof cartActionType.ADD_ITEM;
  payload: CartItem;
}

interface RemoveItemAction {
  type: typeof cartActionType.REMOVE_ITEM;
  payload: CartItem;
}

type CartActionTypes = AddItemAction | RemoveItemAction;

const INITIAL_STATE: CartState = {
  cartItems: [],
};

const cartReducer = (
  state: CartState = INITIAL_STATE,
  action: CartActionTypes
): CartState => {
  switch (action.type) {
    case cartActionType.ADD_ITEM:
      return {
        ...state,
        cartItems: addItem(state.cartItems, action.payload),
      };
    case cartActionType.REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case cartActionType.RESET_CART:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
