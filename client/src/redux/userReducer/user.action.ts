import { userActionType } from "./user.type";

export const handleUserAuth = (user: object | null) => ({
  type: userActionType.USER_AUTH,
  payload: user,
});
