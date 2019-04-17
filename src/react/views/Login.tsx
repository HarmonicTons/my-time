import { Button } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { IUser } from "src/interfaces/IUser";
import { IUserState } from "src/redux/user/reducer";
import * as auth from "../../services/auth";
import AppLayout from "../business/AppLayout";

const mapStateToProps = ({ user: userState }: { user: IUserState }) => {
  const { user } = userState;
  return {
    user
  };
};

const Login = ({ user }: { user: IUser }) => {
  const handleClickLogin = () => {
    return auth.signInWithGoogle();
  };

  const handleClickLogout = async () => {
    return auth.signOut();
  };

  return (
    <AppLayout
      pageName="login"
      pageContent={(() => {
        if (!user) {
          return (
            <Button type="primary" onClick={handleClickLogin}>
              Login via Google
            </Button>
          );
        }
        return (
          <>
            <p>{user.name}</p>
            <Button onClick={handleClickLogout}>Logout</Button>
          </>
        );
      })()}
    />
  );
};

export default connect(mapStateToProps)(Login);
