import * as React from "react";
import AppLayout from "../business/AppLayout";

const Home = () => (
  <AppLayout
    pageName="home"
    pageContent={
      <>
        <h1>My Time</h1>
        {"Hello World"}
      </>
    }
  />
);

export default Home;
