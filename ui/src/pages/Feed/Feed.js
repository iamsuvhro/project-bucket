import React, { useState } from "react";
import { Divider, Skeleton, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import FeedCard from "../../components/FeedCard/FeedCard";
import { useSelector, useDispatch } from "react-redux";

const getCards = async (id) => {
  var myHeaders = new Headers();
  var formdata = new FormData();
  formdata.append("user_id", id);

  var requestOptions = {
    method: "POST",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  let res = await fetch(
    "http://localhost:8000/api/feed/get-cards",
    requestOptions
  );

  const data = await res.json();
  return data;
};

export default function Feed() {
  const user = useSelector((state) => state.user);
  const [CardData, setCardData] = useState();

  async function getFeedData() {
    const response = await getCards(user.user_id);
    setCardData(response);
  }

  if (!CardData) {
    getFeedData();
  } else {
    if (CardData.length > 0) {
      return (
        <>
          {CardData.map((card) => (
            <FeedCard key={card.card_id} data={card} />
          ))}
          <Divider />
        </>
      );
    } else {
      return (
        <>
          <Spin tip="Loading..." style={{ marginLeft: "50%" }} />
        </>
      );
    }
  }
}
