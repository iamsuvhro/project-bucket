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
  Button,
  Divider,
} from "antd";
import { Menu, Spin, Typography, List, Tag, Progress } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getGitRepoIssues } from "../../services/github";
import { useSelector, useDispatch } from "react-redux";
import { render } from "react-dom";

export default function FeedCard(cardData) {
  const { Title, Paragraph, Text, Link } = Typography;

  const confirm = (e) => {
    console.log(e);
    message.success("Card deleted successfully");
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Canceled");
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <>Edit</>,
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
  // const gitUser = useSelector((state) => state.githubProfile);
  // const gitConfig = useSelector((state) => state.githubToken);

  return (
    <>
      <Card
        title={<Tag color="blue">{cardData.data.project_title}</Tag>}
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
      >
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Project details" key="1">
            {cardData.data.project_title ? (
              <>
                <Title level={2}>{cardData.data.project_title}</Title>
                <Paragraph>
                  {cardData.data.project_drescriptions}
                </Paragraph>
              </>
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
          {/* // ----------------- Issue area ------------------------- */}
          <Tabs.TabPane tab="Issues" key="3">
            {/* {async () => {
              const response = await getGitRepoIssues(
                gitUser.username,
                gitConfig.token,
                "repository"
              );
              await console.log('Response', response.data)
              const issuesData = response.data;
              issuesData.map((name)=>(
                console.log(name,'addadda')
              ))
            }} */}
            <p>Hellp</p>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Commits" key="4">
            <p>Hellp</p>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Todo" key="5">
            <>
            <Paragraph>Progress Bar :</Paragraph>
            <Progress percent={30} status="active" />
            <Divider/>
            
            <Divider/>
            <Button style={{float:"right"}} type="primary">Add items</Button>
            </>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </>
  );
}
