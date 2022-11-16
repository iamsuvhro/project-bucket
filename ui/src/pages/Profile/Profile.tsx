import React, { useState, useEffect, Fragment } from "react";
import { TeamOutlined } from "@ant-design/icons";
import { Avatar, Card, Divider, Descriptions, Button } from "antd";
import DefaultLayout from "../../layouts/DefaultLayout";

function logout() {
  localStorage.setItem("dataKey", JSON.stringify(Boolean(false)));
}

export default function Profile() {
  const { Meta } = Card;
  return (
    <div className="Profile">
      {/* <Header /> */}
      <div className="grid grid-flow-row-dense grid-cols-0 grid-rows-3">
        <Card
          style={{
            width: "90%",
            marginTop: 30,
            boxShadow: "5px 0px 10px 1px rgba(0, 0, 0, 0.2)",
            marginLeft: 25,
          }}
        >
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="Suvhradip Ghosh"
            description="This is the description"
          />
          <Divider />
          <Descriptions title="Github Details" extra={<Button onClick={() => localStorage.setItem("dataKey", JSON.stringify(Boolean(false)))}>Logout</Button>}>
            <Descriptions.Item label="Followers">
              <TeamOutlined />
              <span style={{ marginLeft: 20 }}>300</span>
            </Descriptions.Item>
          </Descriptions>
          <Descriptions>
            <Descriptions.Item label="Following">2000</Descriptions.Item>
          </Descriptions>
          <Descriptions>
            <Descriptions.Item label="Repositories">2000</Descriptions.Item>
          </Descriptions>
          <Descriptions>
            <Descriptions.Item label="Disk Usage">2000</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </div>
  );
}
