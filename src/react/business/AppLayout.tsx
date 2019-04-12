import { Layout } from "antd";
import * as React from "react";
import AppHeader from "./AppHeader";

const { Content, Footer } = Layout;
const AppLayout = ({
  pageName,
  pageContent
}: {
  pageName: string;
  pageContent: any;
}) => (
  <Layout style={{ height: "100%" }}>
    <AppHeader current={pageName} size={64} />
    <Content>{pageContent}</Content>
    <Footer style={{ textAlign: "center" }}>My Time</Footer>
  </Layout>
);

export default AppLayout;
