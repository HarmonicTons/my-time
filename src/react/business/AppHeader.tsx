import { Icon, Layout, Menu } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import * as styles from "./AppHeader.css";
import AppIcon from "./AppIcon";

const { Header } = Layout;

const AppHeader = ({ current }: { current: string }) => (
  <Header className={styles.header}>
    <AppIcon className={styles.icon} />
    <h1 className={styles.title}>My Time</h1>
    <Menu mode="horizontal" selectedKeys={[current]} className={styles.menu}>
      <Menu.Item key="home" className={styles["menu-item"]}>
        <Link to="/home">
          <Icon type="home" />
          {"Home"}
        </Link>
      </Menu.Item>
      <Menu.Item key="login" className={styles["menu-item"]}>
        <Link to="/login">
          <Icon type="user" />
          {"Profile"}
        </Link>
      </Menu.Item>
    </Menu>
  </Header>
);

export default AppHeader;
