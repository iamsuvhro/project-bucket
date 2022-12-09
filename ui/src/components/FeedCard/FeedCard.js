import React, { useState } from "react";
import {
  Card,
  Tabs,
  Empty,
  Dropdown,
  Space,
  Popconfirm,
  message,
  Form,
  Input,
  Skeleton,
} from "antd";
import { Menu, Spin } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function FeedCard(cardData) {
  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a target="_blank" href="#">
              Edit
            </a>
          ),
          icon: <EditOutlined />,
        },
        {
          key: "2",
          label: (
            <Popconfirm
              title="Are you sure to delete this card?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <a target="_blank" href="#">
                Delete
              </a>
            </Popconfirm>
          ),
          icon: <DeleteOutlined />,
        },
      ]}
    />
  );

  const [loading, setLoading] = useState(true);
  const onChange = (checked) => {
    setLoading(!checked);
  };

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  async function loader() {
    await timeout(1000);
    setLoading(false);
    return loading;
  }

  return (
    <>
      <Card
        title={cardData.data.project_title}
        bordered={false}
        style={{
          width: "100%",
          marginTop: 50,
          boxShadow: "5px 0px 10px 1px rgba(0, 0, 0, 0.2)",
        }}
        className=""
        extra={
          <Dropdown overlay={menu}>
            <MoreOutlined style={{ color: "black", fontSize: "18px" }} />
          </Dropdown>
        }
        // loading={
        //   // {loading},
        //   {loader()}
        // }
      >
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Project details" key="1">
            {cardData.data.project_title ? (
              cardData.data.project_drescriptions
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Repository" key="2">
            {cardData.data.project_title ? (
              cardData.data.repository
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Issues" key="3">
            {cardData.data.project_title ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </>
  );
}
