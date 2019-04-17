import { Button } from "antd";
import * as React from "react";
import { useState } from "react";
import { IActivity } from "src/interfaces/IActivity";
import { list } from "../../services/activity/SDK";
import AppLayout from "../business/AppLayout";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [activities, setActivities] = useState<IActivity[]>([]);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await list();
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

export default Home;
