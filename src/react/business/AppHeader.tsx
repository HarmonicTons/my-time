import { Icon, Menu } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import * as styles from "./AppHeader.css";
import AppIcon from "./AppIcon";
import UserInfo from "./UserInfo";

const AppHeader = ({ current }: { current: string }) => (
  <div className={styles.header}>
    <div className={styles["header-content"]}>
      <div className={styles["left-part"]}>
        <AppIcon className={styles.icon} />
        <h1 className={styles.title}>My Time</h1>
        <Menu
          mode="horizontal"
          selectedKeys={[current]}
          className={styles.menu}
        >
          <Menu.Item key="activities" className={styles["menu-item"]}>
            <Link to="/activities">
              <Icon type="book" />
              {"Activities"}
            </Link>
          </Menu.Item>
          <Menu.Item key="report" className={styles["menu-item"]}>
            <Link to="/report">
              <Icon type="pie-chart" />
              {"Report"}
            </Link>
          </Menu.Item>
        </Menu>
      </div>
      <div className={styles["right-part"]}>
        <div>
          <UserInfo />
        </div>
      </div>
    </div>
  </div>
);

export default AppHeader;
