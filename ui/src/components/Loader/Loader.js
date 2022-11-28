import React, { useState } from "react";
import LoadingBar from 'react-top-loading-bar'

export default function Loader() {
  const [loading, setLoading] = useState(50);
//   const changeLoader = async () => {
//     await setTimeout(5000);
//     setLoading(100);
//   };
  return (
    <>
      <LoadingBar
        color="#1890ff"
        progress={loading}
        onLoaderFinished={setLoading(100)}
      />
    </>
  );
}
