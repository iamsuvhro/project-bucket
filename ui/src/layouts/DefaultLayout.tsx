import "antd/dist/antd.css";
import {
  AppstoreOutlined,
  BarChartOutlined,
  UserOutlined,
  DeploymentUnitOutlined
} from "@ant-design/icons";
import { Link, Navigate, Route, Routes, NavLink } from "react-router-dom";
import * as lazyLoading from "antd-lazy-loading";
import { Suspense } from "react";
import type { MenuProps } from "antd";
import { Layout, Menu, Spin } from "antd";
import React from "react";
import Feed from "../pages/Feed/Feed";
import Login from "../pages/Authentication/Login";
import Profile from "../pages/Profile/Profile";

const { Header, Content, Footer, Sider } = Layout;


const menu : MenuProps['items'] = 
    [
      {
        key: "1",
        label: (
          <NavLink to={"/feed"}>
            Feed
            </NavLink>
        ),
        icon: <DeploymentUnitOutlined />,
      },
      {
        key: "2",
        label: (
         <NavLink to={"/profile"}>
            Profile
          </NavLink>
        ),
        icon: <UserOutlined />,
      },
    ]

function DefaultLayout() {
  return (
    <Layout hasSider>
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
          style={{height:"100%"}}
    
        />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200, background:"white" }}>
      </Layout>

      <Suspense>
        <Routes>
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to={`/404`} replace={true} />} />
        </Routes>
      </Suspense>
    </Layout>
    
  );
}

export default DefaultLayout;
