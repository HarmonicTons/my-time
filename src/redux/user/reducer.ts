import { Reducer } from "react";
import { AnyAction } from "redux";
import { IUser } from "src/interfaces/IUser";
import { TYPES } from "./actions";

export interface IUserState {
  user: IUser | null;
  waitingRedirectResult: boolean;
}

const initialState: IUserState = {
  user: null,
  waitingRedirectResult: true
};

const loginUser = (state: IUserState, action: AnyAction) => {
  const { user } = action.payload;
  if (state.user && user.id === state.user.id) {
    return state;
  }
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

const redirectResult = (state: IUserState, action: AnyAction) => {
  // already got redirect result?
  if (!state.waitingRedirectResult) {
    return state;
  }
  const { user } = action.payload;
  return {
    ...state,
    user,
    waitingRedirectResult: false
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
    case TYPES.REDIRECT_RESULT:
      return redirectResult(state, action);
    default:
      return state;
  }
};
