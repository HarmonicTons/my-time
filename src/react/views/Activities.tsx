import { Button } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { IActivity } from "src/interfaces/IActivity";
import { IUser } from "src/interfaces/IUser";
import { IUserState } from "src/redux/user/reducer";
import { create, list } from "../../services/activity";
import AppLayout from "../business/AppLayout";

const mapStateToProps = ({ user: userState }: { user: IUserState }) => {
  const { user } = userState;
  return {
    user
  };
};

interface IAsyncState<T> {
  loading: boolean;
  error: Error | null;
  data?: T;
}

const Home = ({ user }: { user: IUser }) => {
  const [activityFetching, setActivityFetching] = useState<
    IAsyncState<IActivity[]>
  >({
    loading: false,
    error: null,
    data: []
  });

  const [activityAdding, setActivityAdding] = useState<IAsyncState<undefined>>({
    loading: false,
    error: null
  });

  const refresh = async () => {
    setActivityFetching({
      loading: true,
      error: null,
      data: activityFetching.data
    });
    try {
      const res = await list(user.id);
      setActivityFetching({
        loading: false,
        error: null,
        data: res
      });
    } catch (error) {
      setActivityFetching({
        loading: false,
        error,
        data: activityFetching.data
      });
    }
  };

  const add = async () => {
    setActivityAdding({
      loading: true,
      error: null
    });
    try {
      const activity = {
        name: "hello",
        description: "why not",
        color: "#00FF11"
      };
      await create(user.id, activity);
      setActivityAdding({
        loading: false,
        error: null
      });
      refresh();
    } catch (error) {
      setActivityAdding({
        loading: false,
        error
      });
    }
  };

  useEffect(() => {
    if (user) {
      refresh();
    }
  }, [user]);

  return (
    <AppLayout
      pageName="activities"
      pageContent={
        <>
          <h1>Activities</h1>
          {user && (
            <>
              <ul>
                {activityFetching.data &&
                  activityFetching.data.map(activity => (
                    <li key={activity.id} style={{ color: activity.color }}>
                      {activity.name}
                    </li>
                  ))}
              </ul>
              <Button loading={activityFetching.loading} onClick={refresh}>
                Refresh
              </Button>
              {activityFetching.error && activityFetching.error.message}

              <Button loading={activityAdding.loading} onClick={add}>
                Add
              </Button>
              {activityAdding.error && activityAdding.error.message}
            </>
          )}
          {!user && <>Please loggin first</>}
        </>
      }
    />
  );
};

export default connect(mapStateToProps)(Home);
