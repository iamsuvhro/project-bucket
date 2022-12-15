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
  Popover,
} from "antd";
import { Menu, Spin, Typography, List, Tag, Progress } from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
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

  // Popup code

  const [uploadTodoData, setUploadTodoData] = useState([]);
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const onFinish = (values) => {
    console.log("Received values of form:", values.users);

    values.users.map((details) =>
    // setTheArray([...theArray, newElement]);
      setUploadTodoData([{...uploadTodoData},{details}])
      // console.log(details)
    );
    console.log('todo',uploadTodoData);
  };

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
                <Paragraph>{cardData.data.project_drescriptions}</Paragraph>
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
              <Divider />
              {/* {uploadTodoData} */}
              <Divider />
              <Popover
                content={
                  <>
                    <Form
                      name="dynamic_form_nest_item"
                      onFinish={onFinish}
                      autoComplete="off"
                    >
                      <Form.List name="users">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Space
                                key={key}
                                style={{
                                  display: "flex",
                                  marginBottom: 8,
                                }}
                                align="baseline"
                              >
                                <Form.Item
                                  {...restField}
                                  name={[name, "title"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing todo title",
                                    },
                                  ]}
                                >
                                  <Input placeholder="todo title" />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, "body"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing drescriptions",
                                    },
                                  ]}
                                >
                                  <Input placeholder="todo drescriptions" />
                                </Form.Item>
                                <MinusCircleOutlined
                                  onClick={() => remove(name)}
                                />
                              </Space>
                            ))}
                            <Form.Item>
                              <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                              >
                                Add field
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Add Todo Items
                        </Button>
                      </Form.Item>
                    </Form>
                  </>
                }
                title="Add Todo"
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
              >
                <Button type="primary" style={{ float: "right" }}>
                  Add items
                </Button>
              </Popover>
            </>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </>
  );
}
