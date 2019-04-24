import { Button } from "antd";
import * as React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { IActivity } from "src/interfaces/IActivity";
import { IUser } from "src/interfaces/IUser";
import { IUserState } from "src/redux/user/reducer";
import { list } from "../../services/activity";
import AppLayout from "../business/AppLayout";

const mapStateToProps = ({ user: userState }: { user: IUserState }) => {
  const { user } = userState;
  return {
    user
  };
};

const Home = ({ user }: { user: IUser }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [activities, setActivities] = useState<IActivity[]>([]);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await list(user.id);
      setActivities(res);
      setError(null);
    } catch (error) {
      setError(error);
      setActivities([]);
    }
    setLoading(false);
  };
  return (
    <AppLayout
      pageName="home"
      pageContent={
        <>
          <h1>My Time</h1>
          <Button loading={loading} onClick={handleClick}>
            Send
          </Button>
          <br />
          {JSON.stringify(activities)}
          <br />
          {error && error.message}
        </>
      }
    />
  );
};

export default connect(mapStateToProps)(Home);
