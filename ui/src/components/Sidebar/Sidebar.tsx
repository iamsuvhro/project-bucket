import {
  UserOutlined,
  DeploymentUnitOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";





const { Sider } = Layout;

const menu: MenuProps["items"] = [
  {
    key: "/",
    label: <NavLink to={"/"}>Feed</NavLink>,
    icon: <DeploymentUnitOutlined />,
  },
  {
    key: "/profile",
    label: <NavLink to={"/profile"}>Profile</NavLink>,
    icon: <UserOutlined />,
  },
  {
    key: "/settings",
    label: <NavLink to={"/settings"}>Settings</NavLink>,
    icon: <SettingOutlined />,
  },
];

function Hover() {
  const path = [useLocation().pathname];
  return path;
}

export default function Sidebar() {
  const path = Hover();
  const [loading, setLoading] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
  }


  return (

    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        background: "white",
      }}
    >
          <LoadingBar
        color="#1890ff"
        progress={loading}
        onLoaderFinished={()=>loading}
    />
      <div className="logo" />
      
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={path}
        items={menu}
        style={{ height: "100%", paddingTop: 20 }}
        onClick={async ()  => {         
          setLoading(50)
          await timeout(1000)
          setLoading(100) 
          // setLoading(0)         
        }}
      />
    </Sider>
    
  );
}
