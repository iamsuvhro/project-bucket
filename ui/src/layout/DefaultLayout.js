import React from "react";
import { Divider, Layout, Menu } from "antd";
import Sidebar from "../components/Sidebar/Sidebar";
import Feed from "../pages/Feed/Feed";
import Profile from "../pages/Profile/Profile.js";
import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Settings from "../pages/Settings/settings";
import Error from "../pages/404/404";
import CreateCard from "../pages/Card/CreateCard";
import GithubConfig from "../pages/Gtihub/GithubConfig";
import Login from "../pages/Login/Login";



const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

export default function DefaultLayout() {
  const { Content, Header } = Layout;
  return (
    <>
    <div className="universalBody">
    <Layout className="site-layout">
      <Header style={{background:"white",borderBottom: "1px solid #cbcbcb"}}>
        <div className="logo" />
        <Menu style={{background:"white",borderBottom: "1px solid #cbcbcb"}} mode="horizontal" items={items1} />
      </Header>
        <Layout className="site-layout">
          <Sidebar />
          <Content
            style={{
              margin: "0 16px",
              padding: 24,
              minHeight: "100vh",
            }}
            className="site-layout-background"
          >
            <Suspense>
              <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/create-card" element={<CreateCard />} />
                <Route path="/github-config" element={<GithubConfig />} />
                <Route path="/404" element={<Error />} />
                {/* <Route path="/system/login" element={<Login />} /> */}
                <Route
                  path="*"
                  element={<Navigate to={`/404`} replace={true} />}
                />
              </Routes>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </div>

    </>
  );
}
