import React from "react";
import Header from "../../components/Header/Header";
import TabLink from "../../components/TabLink/TabLink";
import { Suspense } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Button,
  Tabs,
  Card,
  Popover,
  Divider,
  Dropdown,
  Space,
  Empty,
  Popconfirm,
  message,
  Form,
  Input,
} from "antd";
import "antd/dist/antd.css";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu, Spin } from "antd";
import { useState } from "react";

const confirm = (e: any) => {
  console.log(e);
  message.success("Click on Yes");
};

const cancel = (e: any) => {
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

export default function FeedCards() {
  const onFinish = (values: any) => {
    message.success("Received values of form:", values);
  };
  return (
    <div className="site-card-border-less-wrapper">
      <Card
        title="Projects Name"
        bordered={false}
        style={{
          width: "100%",
          marginTop: 50,
          marginLeft: 40,
          boxShadow: "5px 0px 10px 1px rgba(0, 0, 0, 0.2)",
        }}
        extra={
          <Dropdown overlay={menu}>
            <MoreOutlined style={{ color: "black", fontSize: "18px" }} />
          </Dropdown>
        }
      >
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Project Details" key="1">
            <Spin>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </Spin>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Repository" key="2">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Issue" key="3">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Todo" key="4">
            {/* Adding items in todo */}
            <Form
              name="dynamic_form_nest_item"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.List name="todo">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "Title"]}
                          rules={[
                            { required: true, message: "Missing title" },
                          ]}
                        >
                          <Input placeholder="Title" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "Task"]}
                          rules={[
                            { required: true, message: "Missing Task" },
                          ]}
                        >
                          <Input placeholder="Task" value={"sddsd"}/>
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Items
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
}
