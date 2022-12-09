import React from "react";
// import {JupyterViewer} from "react-jupyter-notebook";
import nb_test from "./test.json";
import Iframe from "react-iframe";

export default function Notebook() {
  return (
    <>
      <div>Notebook</div>
      {/* <Iframe
      url="http://localhost:8080"
      allow="X-Frame-Options: same"
      /> */}
      <Iframe url="http://localhost:8080"
        width="640px"
        height="320px"
        id=""
        className=""
        display="block"
        position="relative"
        allow="Access-Control-Allow-Origin: localhost:8080"
        />
    </>
  );
}
