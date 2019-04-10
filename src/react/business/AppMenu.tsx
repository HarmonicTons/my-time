import { Affix, Icon, Menu } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";

const AppMenu = ({ current }: { current: string }) => (
  <Affix offsetTop={0}>
    <Menu mode="horizontal" selectedKeys={[current]}>
      <Menu.Item key="home">
        <Link to="/home">
          <Icon type="home" />
          {"Home"}
        </Link>
      </Menu.Item>
      <Menu.Item key="other">
        <Link to="/other">
          <Icon type="star" />
          {"Other"}
        </Link>
      </Menu.Item>
    </Menu>
  </Affix>
);

export default AppMenu;
