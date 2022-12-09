import React, { useState } from "react";
import { Layout, Dropdown, Space, Badge, Popover, Divider } from "antd";
import { actionCreators } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import { BookOutlined, BellOutlined, LogoutOutlined } from "@ant-design/icons";
import { getNotifications } from "../../services/github";

export default function Headers() {
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const dispatch = useDispatch();
  const notficationState = useSelector((state) => state.gitNotification);
  const gitToken = useSelector((state) => state.githubToken);

  async function getNotification() {
    const response = await getNotifications(gitToken.token);
    if (response.data.length > 0) {
      const hoverCount = response.data.length;
      const notification_count = response.data.length;
      const notification_data = response.data;
      const payload = {
        hover_count: hoverCount,
        notificationCount: notification_count,
        notification: notification_data,
      };
      dispatch(actionCreators.notificationState(payload));
    }
  }

  //   getNotification()

  console.log(notficationState.notification);

  function logout() {
    dispatch(actionCreators.authState(false));
  }
  const { Header } = Layout;
  return (
    <Header
      style={{
        background: "white",
        borderBottom: "1px solid #cbcbcb",
        fontSize: 18,
      }}
    >
      <BookOutlined /> Project Lab
      <div style={{ float: "right" }}>
        <Popover
          content={notficationState.notification.map((notificationDetails) => (
            <>
              <p>
                {/* <a onClick={hide}>Close</a> */}
                <a href={notificationDetails.url}>
                  {notificationDetails.title}
                </a>
              </p>
              <p>
                Repository: <i>{notificationDetails.repository}</i>
              </p>
              <Divider style={{ margin: 0 }} />
            </>
          ))}
          title="Notification"
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <Space>
            <Badge count={notficationState.hover_count} offset={[-20, 2]}>
              <BellOutlined style={{ marginRight: 20, fontSize: 20 }} />
            </Badge>
          </Space>
        </Popover>
        <LogoutOutlined
          name="logout"
          onClick={() => {
            logout();
          }}
        />
      </div>
    </Header>
  );
}
