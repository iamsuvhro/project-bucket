import React from "react";
import { Layout, } from "antd";
import Sidebar from "../components/Sidebar/Sidebar";
import Feed from "../pages/Feed/Feed";
import Profile from "../pages/Profile/Profile.js";
import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Settings from "../pages/Settings/settings";
import Error from "../pages/404/404";
import CreateCard from "../pages/Card/CreateCard";
import GithubConfig from "../pages/Gtihub/GithubConfig";
import { BookOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { LogoutOutlined } from "@ant-design/icons";
import { actionCreators } from "../state";
import Notebook from "../pages/Notebook/notebook";

export default function DefaultLayout() {
  const dispatch = useDispatch();

  function logout() {
    dispatch(actionCreators.authState(false));
  }
  const { Content, Header } = Layout;
  return (
    <>
      <div className="universalBody">
        <Layout className="site-layout">
          <Header
            style={{
              background: "white",
              borderBottom: "1px solid #cbcbcb",
              fontSize: 18,
            }}
          >
            <BookOutlined /> Project Lab
            <div style={{ float: "right" }}>
              Logout{" "}
              <LogoutOutlined
                onClick={() => {
                  logout();
                }}
              />
            </div>
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
          </Layout>
        </Layout>
      </div>
    </>
  );
}
