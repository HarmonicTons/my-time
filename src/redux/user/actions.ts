export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const loginUser = (userInfo: any) => (dispatch: any) =>
  dispatch({
    payload: { userInfo },
    type: LOGIN_USER
  });

export const logoutUser = () => (dispatch: any) =>
  dispatch({
    type: LOGOUT_USER
  });
