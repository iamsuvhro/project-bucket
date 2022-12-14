import React from "react";
import { Layout, Dropdown, Space, Badge } from "antd";
import Sidebar from "../components/Sidebar/Sidebar";
import Feed from "../pages/Feed/Feed";
import Profile from "../pages/Profile/Profile.js";
import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Settings from "../pages/Settings/settings";
import Error from "../pages/404/404";
import CreateCard from "../pages/Card/CreateCard";
import GithubConfig from "../pages/Gtihub/GithubConfig";
import { BookOutlined, BellOutlined, LogoutOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { actionCreators } from "../state";
import Notebook from "../pages/Notebook/notebook";

import RightSidebar from "../components/layout/rightSidebar/RightSidebar";
import Headers from "../components/Header/Header";

export default function DefaultLayout() {
  const { Content } = Layout;
  return (
    <>
      <div className="universalBody">
        <Layout className="site-layout">
          <Headers />
          <Layout className="site-layout">
            <Sidebar />
            <Content
              style={{
                margin: "0 16px",
                padding: 24,
                minHeight: "100vh",
                overflow: "initial",
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
                  <Route path="/notebook" element={<Notebook />} />
                  <Route path="/404" element={<Error />} />
                  {/* <Route path="/system/login" element={<Login />} /> */}
                  <Route
                    path="*"
                    element={<Navigate to={`/404`} replace={true} />}
                  />
                </Routes>
              </Suspense>
            </Content>
            <RightSidebar />
          </Layout>
        </Layout>
      </div>
    </>
  );
}
