export const addressActionType = {
  ADD_ADDRESS: "ADD_ADDRESS",
  REMOVE_ADDRESS: "REMOVE_ADDRESS",
};

export interface AddressProp {
  id?: number;
  fullName: string;
  phoneNumber: number;
  address: string;
}
