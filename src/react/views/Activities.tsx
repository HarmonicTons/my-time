import { Button, Icon } from "antd";
import { useEffect, useState } from "react";
import * as React from "react";
import { connect } from "react-redux";
import { IActivity } from "src/interfaces/IActivity";
import { IUser } from "src/interfaces/IUser";
import { IUserState } from "src/redux/user/reducer";
import { list } from "../../services/activity";
import ActivityButton from "../business/Activity/ActivityButton";
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
          <h1>
            Activities {activityFetching.loading && <Icon type="loading" />}
          </h1>

          {user && (
            <>
              <div>
                {activityFetching.data &&
                  activityFetching.data.map(activity => (
                    <div
                      key={activity.id}
                      style={{ marginRight: "10px", display: "inline-block" }}
                    >
                      <ActivityButton
                        user={user}
                        activity={activity}
                        onActivityUpdate={refresh}
                      />
                    </div>
                  ))}
                <Button type="dashed" size="large" icon="plus">
                  Add
                </Button>
              </div>
            </>
          )}
          {!user && <>Please loggin first</>}
        </>
      }
    />
  );
};

export default connect(mapStateToProps)(Home);
