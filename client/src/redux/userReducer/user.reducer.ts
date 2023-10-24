import { UserActionType, CurrentUserProps } from "./user.type";

interface UserState {
  currentUser: CurrentUserProps | null;
}
interface UserAction {
  type: UserActionType;
  payload: CurrentUserProps | null;
}

const INITIAL_STATE: UserState = {
  currentUser: null,
};

const userReducer = (state: UserState = INITIAL_STATE, action: UserAction) => {
  switch (action.type) {
    case UserActionType.USER_AUTH:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
