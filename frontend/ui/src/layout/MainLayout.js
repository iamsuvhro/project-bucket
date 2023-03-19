import React from "react";
import DefaultLayout from "./DefaultLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/Login/Login";
import Registration from "../pages/Authentication/Registration";

export default function MainLayout() {
  const authState = useSelector((state) => state.authStatus);
  if (authState) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<DefaultLayout />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
