import { Layout } from "antd";
import * as React from "react";
import AppHeader from "./AppHeader";
import * as styles from "./AppLayout.css";

const { Content, Footer } = Layout;
const AppLayout = ({
  pageName,
  pageContent
}: {
  pageName: string;
  pageContent: any;
}) => (
  <Layout className={styles.layout}>
    <AppHeader current={pageName} />
    <Content className={styles.content}>{pageContent}</Content>
    <Footer className={styles.footer}>My Time</Footer>
  </Layout>
);

export default AppLayout;
