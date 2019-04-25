import { Avatar } from "antd";
import { Card, Popover } from "antd";
import { Button } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { IUser } from "src/interfaces/IUser";
import { IUserState } from "src/redux/user/reducer";
import * as auth from "../../services/auth";

const { Meta } = Card;

const mapStateToProps = ({ user: userState }: { user: IUserState }) => {
  const { user } = userState;
  return {
    user
  };
};

const UserCard = ({ user }: { user: IUser }) => {
  const handleClickLogin = () => {
    return auth.signInWithGoogle();
  };

  const handleClickLogout = async () => {
    return auth.signOut();
  };

  return (
    <div style={{ width: 250, margin: 10 }}>
      <Meta
        avatar={
          <Avatar size="large" icon="user" src={user && user.profilePicture} />
        }
        title={(user && user.name) || "Anonymous"}
        description={(user && "add email here later") || "Please loggin"}
      />
      <br />
      {user && (
        <Button type="primary" onClick={handleClickLogout}>
          Disconnect
        </Button>
      )}
      {!user && (
        <Button type="primary" onClick={handleClickLogin}>
          Loggin with Google
        </Button>
      )}
    </div>
  );
};

const UserInfo = ({ user }: { user: IUser }) => (
  <Popover
    placement="topRight"
    content={<UserCard user={user} />}
    trigger="click"
  >
    <Avatar size="medium" icon="user" src={user && user.profilePicture} />
  </Popover>
);

export default connect(mapStateToProps)(UserInfo);
