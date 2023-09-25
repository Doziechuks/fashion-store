import { createSelector } from "reselect";
// import rootReducer from "../rootReducer";
import { RootState } from "../rootReducer";

const selectToggle = (state: RootState) => state.toggle;

export const selectToggleAuth = createSelector(
  [selectToggle],
  (toggle) => toggle.authToggle
);
export const selectToggleCurrency = createSelector(
  [selectToggle],
  (change) => change.currency
);
