import { Icon, Layout, Menu } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import * as styles from "./AppHeader.css";
import AppIcon from "./AppIcon";

const { Header } = Layout;

const AppHeader = ({ current, size }: { current: string; size: number }) => (
  <Header
    className={styles.header}
    style={{
      height: size
    }}
  >
    <AppIcon
      className={styles.icon}
      style={{
        height: size - 14,
        margin: 7
      }}
    />
    <Menu
      mode="horizontal"
      selectedKeys={[current]}
      className={styles.menu}
      style={{ lineHeight: size - 2 + "px" }}
    >
      <Menu.Item key="home" className={styles["menu-item"]}>
        <Link to="/home">
          <Icon type="home" />
          {"Home"}
        </Link>
      </Menu.Item>
      <Menu.Item key="other" className={styles["menu-item"]}>
        <Link to="/other">
          <Icon type="star" />
          {"Other"}
        </Link>
      </Menu.Item>
    </Menu>
  </Header>
);

export default AppHeader;
