import React from "react";
import { Button, Result, Layout } from "antd";
export default function Error() {
  return (
    <Layout style={{ padding: '10px 24px 24px' }}>
      <Result
        status="404"
        title="404"
        subTitle="Page does not exist."
        
      />
    </Layout>
  );
}
