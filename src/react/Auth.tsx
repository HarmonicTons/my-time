import * as React from "react";
import { connect } from "react-redux";
import { IUser } from "src/interfaces/IUser";
import { IUserState } from "src/redux/user/reducer";
import { loginUser, logoutUser } from "../redux/user/actions";
import * as auth from "../services/auth";

const mapStateToProps = ({ user: userState }: { user: IUserState }) => {
  const { user } = userState;
  return {
    user
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (user: IUser) => dispatch(loginUser(user)),
    logout: () => dispatch(logoutUser())
  };
};

const Auth = ({
  user: loggedInUser,
  login,
  logout
}: {
  user: IUser | null;
  login: (user: IUser) => void;
  logout: () => void;
}) => {
  auth.onAuthStateChanged((user: IUser | null) => {
    if (user) {
      if (!loggedInUser || loggedInUser.id !== user.id) {
        login(user);
      }
    } else {
      if (loggedInUser) {
        logout();
      }
    }
  });

  return <></>;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
