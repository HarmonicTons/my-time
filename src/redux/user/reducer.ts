import { Reducer } from "react";
import { AnyAction } from "redux";
import { IUser } from "src/interfaces/IUser";
import { TYPES } from "./actions";

export interface IUserState {
  user: IUser | null;
}

const initialState: IUserState = {
  user: null
};

const loginUser = (state: IUserState, action: AnyAction) => {
  const { user } = action.payload;
  return {
    ...state,
    user
  };
};

const logoutUser = (state: IUserState) => {
  return {
    ...state,
    user: null
  };
};

export const userReducer: Reducer<IUserState, AnyAction> = (
  state = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case TYPES.LOGIN_USER:
      return loginUser(state, action);
    case TYPES.LOGOUT_USER:
      return logoutUser(state);
    default:
      return state;
  }
};
