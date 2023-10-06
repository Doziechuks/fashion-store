import { userActionType } from "./user.type";

interface UserState {
  userAuth: null | object; // Adjust the type according to your use case
}

interface UserAction {
  type: string; // Replace 'string' with your actual action types
  payload: object | null; // Adjust the type according to your use case
}
const INITIAL_STATE = {
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
