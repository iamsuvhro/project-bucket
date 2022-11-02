import React from "react";
import Header from "../../components/Header/Header";
import TabLink from "../../components/TabLink/TabLink";
import { Suspense } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button, Tabs, Card, Popover, Divider, Dropdown, Space,Empty } from "antd";
import "antd/dist/antd.css";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu,Spin } from "antd";
import { useState } from "react";

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
          <a target="_blank" href="#">
            Delete
          </a>
        ),
        icon: <DeleteOutlined />,
      },
      //   {
      //     key: "3",
      //     label: (
      //       <a
      //         target="_blank"
      //         rel="noopener noreferrer"
      //         href="https://www.luohanacademy.com"
      //       >
      //         3rd menu item (disabled)
      //       </a>
      //     ),
      //     disabled: true,
      //   },
    ]}
  />
);

export default function FeedCards() {
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
            <Spin><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></Spin>
            
          </Tabs.TabPane>
          <Tabs.TabPane tab="Repository" key="2">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Issue" key="3">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
}
