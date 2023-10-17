import { userActionType } from "./user.type";

interface CurrentUser {
  token: string;
  email: string;
}

interface UserState {
  userAuth: null | CurrentUser;
}

interface UserAction {
  type: string;
  payload: object | null;
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
