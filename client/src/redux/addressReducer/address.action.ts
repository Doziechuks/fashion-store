import { addressActionType, AddressProp } from "./address.type";

export const addAddress = (item: AddressProp) => ({
  type: addressActionType.ADD_ADDRESS,
  payload: item,
});

export const removeAddress = (item: AddressProp) => ({
  type: addressActionType.REMOVE_ADDRESS,
  payload: item,
});
