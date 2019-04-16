import { Reducer } from "react";
import { AnyAction } from "redux";
import { LOGIN_USER, LOGOUT_USER } from "./actions";

const initialState = {
  loggedIn: false,
  userInfo: null
};

const loginUser = (state: any, action: any) => {
  const { userInfo } = action.payload;
  return {
    ...state,
    loggedIn: true,
    userInfo
  };
};

const logoutUser = (state: any) => {
  return {
    ...state,
    loggedIn: false,
    userInfo: null
  };
};

export const userReducer: Reducer<{}, AnyAction> = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case LOGIN_USER:
      return loginUser(state, action);
    case LOGOUT_USER:
      return logoutUser(state);
    default:
      return state;
  }
};
