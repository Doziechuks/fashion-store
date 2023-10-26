import { UserActionType, CurrentUserProps } from "./user.type";

// interface UserState {
//   currentUser: CurrentUserProps | null;
// }

export const handleUserAuth = (user: CurrentUserProps | null) => ({
  type: UserActionType.USER_AUTH,
  payload: user,
});
