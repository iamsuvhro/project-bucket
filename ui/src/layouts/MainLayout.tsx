import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Authentication/Login";
import Feed from "../pages/Feed/Feed";
import DefaultLayout from "./DefaultLayout";
import { State } from "../state/reducers"
import { Provider, useSelector } from "react-redux";

export default function MainLayout() {
  const authStatus = useSelector((state: State) => state.authStatus)
  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path="/*" element={<DefaultLayout />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}
