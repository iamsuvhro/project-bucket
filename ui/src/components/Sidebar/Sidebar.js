import {
  UserOutlined,
  DeploymentUnitOutlined,
  SettingOutlined,
  GithubOutlined,
  PlusOutlined,
  BookOutlined
} from "@ant-design/icons";
import { Divider, Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { DownOutlined } from "@ant-design/icons";



export default function Sidebar() {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const menu = [
    // {
    //   key: "",
    //   label: "Project Lab",
    //   icon: <DeploymentUnitOutlined />,
    // },
    {
      key: "/",
      label: <NavLink to={"/"}>Feed</NavLink>,
      icon: <DeploymentUnitOutlined />,
    },
    {
      key: "/create-card",
      label: <NavLink to={"/create-card"}>Card</NavLink>,
      icon: <PlusOutlined />,
    },
    {
      key: "/profile",
      label: <NavLink to={"/profile"}>Profile</NavLink>,
      icon: <UserOutlined />,
    },
    {
      key: "/github-config",
      label: <NavLink to={"/github-config"}>Github</NavLink>,
      icon: <GithubOutlined />,
    },
    {
      key: "/notebook",
      label: <NavLink to={"/notebook"}>Notebook</NavLink>,
      icon: <SettingOutlined />,
    },
    {
      key: "/settings",
      label: <NavLink to={"/settings"}>Settings</NavLink>,
      icon: <SettingOutlined />,
    }
  ];

  const path = useLocation().pathname;
  const [loading, setLoading] = useState(0);

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  return (
    <>
    <Sider
      // collapsible
      collapsed={collapsed}
      // onCollapse={(value) => setCollapsed(value)}
      color="light"
      style={{
        position:"fixed",
        height:"100vh"
      }}
    >
      <LoadingBar
        color="#1890ff"
        progress={loading}
        onLoaderFinished={() => loading}
      />
      <div className="logo" style={{
        backgroundColor:"white",
        textAlign:"center",
        fontSize:"20px",
        paddingTop:30
      }}>
      <img src={require("./logo.png")} width="90%"/>
      </div>
      <Menu
        theme="light"
        // mode="inline"
        defaultSelectedKeys={path}
        items={menu}
        style={{ height: "100%", paddingTop: 20 }}
        onClick={async () => {
          setLoading(50);
          await timeout(1000);
          setLoading(100);
        }}
      />
    </Sider>
    
    </>
  );
}
