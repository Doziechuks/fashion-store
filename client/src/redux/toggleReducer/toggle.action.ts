import { toggleActionType } from "./toggle.type";

export const handleToggleAuth = () => ({
  type: toggleActionType.AUTH_TOGGLE,
});

export const handleCurrencyToggle = (currency: string) => ({
  type: toggleActionType.CURRENCY_TOGGLE,
  payload: currency,
});
