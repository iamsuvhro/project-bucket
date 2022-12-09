import React from "react";
import { Divider, Layout, Menu, Empty, Avatar, Tag } from "antd";
import { UserOutlined, GithubOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

export default function RightSidebar() {
  const state = useSelector((state) => state.githubProfile);
  const { Sider } = Layout;
  return (
    <>
      <Sider
        color="light"
        style={{
          background: "white",
          width: "700px",
          paddingTop: "100px",
        }}
        width={300}
      >
        {state.avatar_url ? (
          <>
            <center>
              <img src={state.avatar_url} width={"60%"} className="profile" />
            </center>
          </>
        ) : (
          <Avatar size={174} icon={<UserOutlined />} />
        )}
        <center>
          <Tag color="purple"><GithubOutlined /> {state.username}</Tag>
          <p style={{ flow: "center", fontSize:'24px' }}>Suvhradip Ghosh</p>
        </center>

        {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> */}
      </Sider>
    </>
  );
}
