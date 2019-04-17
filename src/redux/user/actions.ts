import { Dispatch } from "react";
import { IUser } from "src/interfaces/IUser";

export enum TYPES {
  LOGIN_USER = "LOGIN_USER",
  LOGOUT_USER = "LOGOUT_USER"
}

interface IDispatchElement {
  type: TYPES;
  [key: string]: any;
}

export const loginUser = (user: IUser) => (
  dispatch: Dispatch<IDispatchElement>
) =>
  dispatch({
    payload: { user },
    type: TYPES.LOGIN_USER
  });

export const logoutUser = () => (dispatch: Dispatch<IDispatchElement>) =>
  dispatch({
    type: TYPES.LOGOUT_USER
  });
