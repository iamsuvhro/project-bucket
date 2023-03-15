import React from "react";
import { Divider, Layout, Menu, Empty, Avatar, Tag } from "antd";
import { UserOutlined, GithubOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

export default function RightSidebar() {
  const state = useSelector((state) => state.githubProfile);
  const user = useSelector((state) => state.user);
  const { Sider } = Layout;
  return (
    <>
      <Sider
        color="light"
        style={{
          background: "white",
          width: "700px",
          height: '100vh',
          position: 'fixed',
          marginLeft:"1604px",
          
          paddingTop:80
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
          <center>
            <Avatar size={174} style={{marginBottom:20}} icon={<UserOutlined />} />
          </center>
          
        )}
        <center>
          <Tag color="purple">
            <GithubOutlined /> {state.username}
          </Tag>
          <p style={{ flow: "center", fontSize: "24px" }}>Suvhradip Ghosh</p>
        </center>
        <div style={{marginLeft:20, marginRight:5}}>
          <p><b>User Id</b>: {user.user_id}</p>
          <p><b>Username</b>: {user.username}</p>
          <p><b>User Email</b>: {user.email}</p>
          <p><b>Last Login</b>: {user.last_login}</p>
        </div>

        {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> */}
      </Sider>
    </>
  );
}
