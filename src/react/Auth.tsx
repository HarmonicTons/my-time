import { message } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { IUser } from "src/interfaces/IUser";
import { loginUser, logoutUser, redirectResult } from "../redux/user/actions";
import * as auth from "../services/auth";

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (user: IUser) => dispatch(loginUser(user)),
    logout: () => dispatch(logoutUser()),
    onRedirectResult: (user: IUser | null) => dispatch(redirectResult(user))
  };
};

class Auth extends React.Component {
  constructor(props: {
    onRedirectResult: (user: IUser | null) => void;
    login: (user: IUser) => void;
    logout: () => void;
  }) {
    super(props);
    const hide = message.loading("loading...", 0);
    auth.getRedirectResult().then(user => {
      if (hide) {
        hide();
      }
      return props.onRedirectResult(user);
    });

    auth.onAuthStateChanged((user: IUser | null) => {
      if (user) {
        props.login(user);
      } else {
        props.logout();
      }
    });
  }

  public render() {
    return <></>;
  }
}

export default connect(
  () => ({}),
  mapDispatchToProps
)(Auth);
