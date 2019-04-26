import { Icon, Switch } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { IActivity } from "src/interfaces/IActivity";
import { IUser } from "src/interfaces/IUser";
import { IUserState } from "src/redux/user/reducer";
import { list } from "../../services/activity";
import ActivityButton from "../business/Activity/ActivityButton";
import AddActivityButton from "../business/Activity/AddActivityButton";
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

const Activities = ({ user }: { user: IUser }) => {
  const [activityFetching, setActivityFetching] = useState<
    IAsyncState<IActivity[]>
  >({
    loading: false,
    error: null,
    data: []
  });

  const [showRemoved, setShowRemoved] = useState(false);

  const onChangeShowRemoved = (checked: boolean) => {
    setShowRemoved(checked);
  };

  const refresh = async () => {
    setActivityFetching({
      loading: true,
      error: null,
      data: activityFetching.data
    });
    try {
      let filter = {};
      if (!showRemoved) {
        filter = {
          ...filter,
          removed: false
        };
      }
      const res = await list(user.id, { filter });
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
  }, [user, showRemoved]);

  return (
    <AppLayout
      pageName="activities"
      pageContent={
        <>
          <h1>
            <span style={{ marginRight: "20px" }}>{"Activities"}</span>
            <Switch onChange={onChangeShowRemoved} />
            {activityFetching.loading && <Icon type="loading" />}
          </h1>

          {user && (
            <>
              <div>
                {activityFetching.data &&
                  activityFetching.data.map(activity => (
                    <div
                      key={activity.id}
                      style={{ margin: "5px", display: "inline-block" }}
                    >
                      <ActivityButton
                        user={user}
                        activity={activity}
                        onActivityUpdate={refresh}
                      />
                    </div>
                  ))}
                <div style={{ margin: "5px", display: "inline-block" }}>
                  <AddActivityButton user={user} onActivityCreate={refresh} />
                </div>
              </div>
            </>
          )}
          {!user && <>Please loggin first</>}
        </>
      }
    />
  );
};

export default connect(mapStateToProps)(Activities);
