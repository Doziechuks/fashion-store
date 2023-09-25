import { toggleActionType } from "./toggle.type";

interface ToggleState {
  [x: string]: string | boolean;
  authToggle: boolean;
  currency: string;
}

const INITIAL_STATE = {
  authToggle: false,
  currency: "USD",
};

const toggleReducer = (
  state: ToggleState = INITIAL_STATE,
  action: ToggleState
) => {
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
