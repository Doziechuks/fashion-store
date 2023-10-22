import { toggleActionType } from "./toggle.type";

interface ToggleState {
  authToggle: boolean;
  currency: string;
}

interface CurrencyToggleAction {
  type: typeof toggleActionType.CURRENCY_TOGGLE;
  payload: string;
}
type ToggleActionTypes = CurrencyToggleAction;

const INITIAL_STATE = {
  authToggle: false,
  currency: "USD",
};

const toggleReducer = (
  state: ToggleState = INITIAL_STATE,
  action: ToggleActionTypes
): ToggleState => {
  switch (action.type) {
    case toggleActionType.AUTH_TOGGLE:
      return {
        ...state,
        authToggle: !state.authToggle,
      };
    case toggleActionType.CURRENCY_TOGGLE:
      return {
        ...state,
        currency: action.payload,
      };
    default:
      return state;
  }
};

export default toggleReducer;
