import { userActionType } from "./user.type";

interface CurrentUser {
  token: string;
  email: string;
}

interface UserState {
  userAuth: null | CurrentUser;
}
export const handleUserAuth = (user: UserState) => ({
  type: userActionType.USER_AUTH,
  payload: user,
});
