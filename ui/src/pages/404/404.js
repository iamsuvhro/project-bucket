import React from "react";
import { Button, Result } from "antd";

export default function Error() {
  return (
    <>
      <Result
        status="error"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        style={{
          marginTop: 40,
          fontSize:40
        }}
      />
    </>
  );
}
