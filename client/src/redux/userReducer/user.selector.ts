import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const selectUser = (state: RootState) => state.user;

export const selectUserAuth = createSelector(
  [selectUser],
  (user) => user.userAuth
);
