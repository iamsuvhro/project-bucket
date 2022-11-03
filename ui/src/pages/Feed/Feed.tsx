import React from "react";
import FeedCards from "../../components/FeedCards/Cards";
import {Card } from "antd";
import "antd/dist/antd.min.css";

export default function Feed() {
  const { Meta } = Card;
  return (
    <div className="Feed w-full h-full mr-56 mb-56">
      <FeedCards />
      <FeedCards />
      <FeedCards />
    </div>
  );
}
