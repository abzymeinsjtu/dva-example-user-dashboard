import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';

function Header({ location }) {
  return (
    <Menu
      selectedKeys={[location.pathname]}
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key="/users">
        <Link to="/users"><Icon type="user" />用户</Link>
      </Menu.Item>
      <Menu.Item key="/">
        <Link to="/"><Icon type="setting" />角色</Link>
      </Menu.Item>
    </Menu>
  );
}

export default Header;
