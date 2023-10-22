import { userActionType } from "./user.type";

interface CurrentUser {
  token: string;
  email: string;
}

interface UserState {
  userAuth: CurrentUser | null;
}

interface UserAction {
  type: typeof userActionType.USER_AUTH;
  payload: CurrentUser | null;
}
const INITIAL_STATE: UserState = {
  userAuth: null,
};

const userReducer = (state: UserState = INITIAL_STATE, action: UserAction) => {
  switch (action.type) {
    case userActionType.USER_AUTH:
      return {
        ...state,
        userAuth: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
