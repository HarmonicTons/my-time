import * as React from "react";
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

interface IAsyncState<T> {
  loading: boolean;
  error: Error | null;
  data?: T;
}

const Report = ({ user }: { user: IUser }) => {
  const [activityFetching, setActivityFetching] = React.useState<
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

  React.useEffect(() => {
    if (user) {
      refresh();
    }
  }, [user]);

  return (
    <AppLayout
      pageName="report"
      pageContent={(() => (
        <>{JSON.stringify(activityFetching.data)}</>
      ))()}
    />
  );
};

export default connect(mapStateToProps)(Report);
