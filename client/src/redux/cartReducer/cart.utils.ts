import { CartItemProps } from "./cart.type";

export const addItem = (
  cartItems: CartItemProps[],
  itemToAdd: CartItemProps
): CartItemProps[] => {
  const existingItem = cartItems.find((item) => item.id === itemToAdd.id);

  if (existingItem) {
    // If the item already exists in the cart, increase its quantity
    return cartItems.map((item) =>
      item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  // If the item is not in the cart, add it with a quant.quantity  return [...cartItems, { ...itemToAdd, quantity: 1 }];
  return [{ ...itemToAdd }, ...cartItems];
};

// export const removeItem = (
//   cartItems: CartItemProps[],
//   itemToRemove: CartItemProps
// ): CartItemProps[] => {
//   const existingItem = cartItems.find((item) => item.id === itemToRemove.id);

//   if (existingItem) {
//     // If the item quantity is 1, remove it from the cart
//     if (existingItem.quantity === 1) {
//       return cartItems.filter((item) => item.id !== itemToRemove.id);
//     }

//     // If the item quantity is more than 1, decrease its quantity
//     return cartItems.map((item) =>
//       item.id === itemToRemove.id
//         ? { ...item, quantity: item.quantity - 1 }
//         : item
//     );
//   }

//   // If the item is not in the cart, return the cart unchanged
//   return cartItems;
// };
