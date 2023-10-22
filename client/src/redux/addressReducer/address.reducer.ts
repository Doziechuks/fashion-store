import { addressActionType, AddressProp } from "./address.type";

interface AddressState {
  addressList: AddressProp[];
}

interface AddAddressAction {
  type: typeof addressActionType.ADD_ADDRESS;
  payload: AddressProp;
}

interface RemoveAddressAction {
  type: typeof addressActionType.REMOVE_ADDRESS;
  payload: AddressProp;
}
type AddressActionType = AddAddressAction | RemoveAddressAction;

const INITIAL_STATE: AddressState = {
  addressList: [],
};

const addressReducer = (
  state: AddressState = INITIAL_STATE,
  action: AddressActionType
): AddressState => {
  switch (action.type) {
    case addressActionType.ADD_ADDRESS:
      return {
        ...state,
        addressList: [...state.addressList, action.payload],
      };
    case addressActionType.REMOVE_ADDRESS:
      return {
        ...state,
        addressList: state.addressList.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};
export default addressReducer;
