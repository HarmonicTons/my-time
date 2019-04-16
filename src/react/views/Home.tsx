import { Button } from "antd";
import * as React from "react";
import { useState } from "react";
import { create, list } from "../../services/activity/SDK";
import AppLayout from "../business/AppLayout";
const Home = () => {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    const res = await list();
    console.log(res);
    const activity = {
      date: new Date(),
      duration: 10,
      name: "hello"
    };
    const res2 = await create(activity);
    console.log(res2);
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
        </>
      }
    />
  );
};

export default Home;
