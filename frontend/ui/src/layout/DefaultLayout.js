import React from "react";
import { Layout, Dropdown, Space, Badge } from "antd";
import Sidebar from "../components/Sidebar/Sidebar";
import Feed from "../pages/Feed/Feed";
import CardsDeck from "../pages/CardDeck/CardDeck.js";
import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Settings from "../pages/Settings/settings";
import Error from "../pages/404/404";
import CreateCard from "../pages/Card/CreateCard";
import GithubConfig from "../pages/Gtihub/GithubConfig";
import { BookOutlined, BellOutlined, LogoutOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { actionCreators } from "../state";
import DiagramDrawingTool from "../pages/Notebook/notebook.js";

import RightSidebar from "../components/layout/rightSidebar/RightSidebar";
import Headers from "../components/Header/Header";

export default function DefaultLayout() {
  const { Content } = Layout;
  return (
    <>
      <div className="universalBody">
        <Layout className="site-layout">
          
          <Layout className="site-layout">
            <Sidebar />
            {/* <Headers /> */}
            <Content
              style={{
                margin: "12 16px",
                padding: 24,
                minHeight: "100vh",
                overflow: "initial",
                marginRight:"16%",
                marginTop:"-2%",
                marginLeft:"10%",
                backgroundColor:"white"
              }}
              className="site-layout-background"
            >
              <Suspense>
                <Routes>
                  <Route path="/" element={<Feed />} />
                  <Route path="/cards" element={<CardsDeck />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/create-card" element={<CreateCard />} />
                  <Route path="/github-config" element={<GithubConfig />} />
                  <Route path="/notebook" element={<DiagramDrawingTool />} />
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
