import React from "react";
import Header from "../../components/Header/Header";
import TabLink from "../../components/TabLink/TabLink";
import { Suspense } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import FeedCards from "../../components/FeedCards/Cards";
import {
  TeamOutlined
} from "@ant-design/icons";
import { Avatar, Card, Divider, Descriptions, Button } from "antd";

export default function Feed() {
  const { Meta } = Card;
  return (
    <div className="Feed">
      {/* <Header /> */}
      <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-10">
        <div className="col-span-2">
          <FeedCards />
          {/* <FeedCards /> */}
        </div>
        <Card
          style={{
            width: "90%",
            marginTop: 50,
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
          <Descriptions
            title="Github Details"
            extra={<Button>View Github</Button>}
          > 
          
            <Descriptions.Item label="Followers"><TeamOutlined/><span style={{marginLeft:20}}>300</span></Descriptions.Item>
            
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
