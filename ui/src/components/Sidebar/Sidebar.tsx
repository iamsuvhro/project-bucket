import {
  UserOutlined,
  DeploymentUnitOutlined,
  SettingOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {Layout, Menu } from "antd";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const { Sider } = Layout;

const menu: MenuProps["items"] = [
  {
    key: "1",
    label: <NavLink to={"/"}>Feed</NavLink>,
    icon: <DeploymentUnitOutlined />,
  },
  {
    key: "2",
    label: <NavLink to={"/profile"}>Profile</NavLink>,
    icon: <UserOutlined />,
  },
  {
    key: "3",
    label: <NavLink to={"/settings"}>Settings</NavLink>,
    icon: <SettingOutlined />,
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider

      
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          background:"white"
        }}
      >
        <div className="logo" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menu}
          
          style={{height:"100%", paddingTop:20}}
    
        />
      </Sider>
  );
}
