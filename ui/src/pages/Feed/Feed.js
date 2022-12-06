import React from "react";
import { Divider,Skeleton } from 'antd';
import FeedCard from "../../components/FeedCard/FeedCard";

export default function Feed() {
  const data = "test data"
  return (
    <>
      <FeedCard data={data}/>
    </>
  );
}
