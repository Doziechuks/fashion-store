export enum UserActionType {
  USER_AUTH = "USER_AUTH",
  // Add other action types here
}

export interface CurrentUserProps {
  token: string;
  id: number;
  name: string;
  userEmail: string;
}
