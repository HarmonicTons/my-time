import { Button } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { loginUser, logoutUser } from "../../redux/user/actions";
import { firebase } from "../../services/firebase";
import AppLayout from "../business/AppLayout";

const mapStateToProps = (state: any) => {
  const { loggedIn, userInfo } = state.user;
  return {
    loggedIn,
    userInfo
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (userInfo: any) => dispatch(loginUser(userInfo)),
    logout: () => dispatch(logoutUser())
  };
};

const Login = ({ loggedIn, userInfo, login, logout }: any) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      login(user);
    } else {
      logout();
    }
  });

  const handleClickLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithRedirect(provider);
  };

  const handleClickLogout = async () => {
    firebase.auth().signOut();
  };

  return (
    <AppLayout
      pageName="login"
      pageContent={(() => {
        if (!loggedIn) {
          return (
            <Button type="primary" onClick={handleClickLogin}>
              Login via Google
            </Button>
          );
        }
        return <Button onClick={handleClickLogout}>Logout</Button>;
      })()}
    />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
