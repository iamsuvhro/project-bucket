import React, { useState, useEffect } from "react";
import { Space, Table, Tag, Divider, message, Button } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { BACKEND_URL } from "../../config";

const columns = [
  {
    title: "Card Id",
    dataIndex: "card_id",
    key: "card_id",
    render: (text) => <a>#{text}</a>,
  },
  {
    title: "Project",
    dataIndex: "project_title",
    key: "project_title",
  },
  {
    title: "Repository",
    dataIndex: "repository",
    key: "repository",
  },
  // {
  //   title: "Tags",
  //   key: "tags",
  //   dataIndex: "tags",
  //   render: (_, { tags }) => (
  //     <>
  //       {tags.map((tag) => {
  //         let color = tag.length > 5 ? "geekblue" : "green";
  //         if (tag === "loser") {
  //           color = "volcano";
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
  {
    title: "Created on",
    key: "card_created",
    dataIndex: "card_created",
  },
  {
    title: "Clipped",
    key: "clipped",
    dataIndex: "clipped",
    render: (_, { clipped }) => (
      <>
        {clipped === 1 ? (
          <a>
            <PaperClipOutlined style={{ color: "#1cb514", fontSize: 20 }} />
          </a>
        ) : (
          <a
            onClick={() => {
              message.success(
                "Success! Your card has been pinned and can now be found on your feed."
              );
            }}>
            <PaperClipOutlined style={{ color: "black", fontSize: 20 }} />
          </a>
        )}
      </>
    ),
  },
];

export default function CardsDeck() {
  const [cardData, setcardData] = useState([]);
  const user = useSelector((state) => state.user);
  console.log(user);
  useEffect(() => {
    async function getAllCards() {
      var myHeaders = new Headers();
      var formdata = new FormData();
      formdata.append("user_id", user.user_id);

      var requestOptions = {
        method: "POST",
        body: formdata,
        headers: myHeaders,
        redirect: "follow",
      };
      let res = await fetch(
        `${BACKEND_URL}/api/feed/get-cards`,
        requestOptions
      );
      const data = await res.json();
      setcardData(data);
    }
    getAllCards();
  }, []);
  return (
    <div style={{ marginLeft: 4, marginTop: 75 }}>
      <div style={{ display: "flex" }}>
        <h1 style={{ fontSize: 24, marginBottom: 20 }}>Cards</h1>
      </div>
      <a href="/create-card">
        <Button type="primary" style={{ float: "right", marginTop: -50 }}>
          Create Card
        </Button>
      </a>
      <Divider />
      <Table columns={columns} dataSource={cardData} />
    </div>
  );
}
