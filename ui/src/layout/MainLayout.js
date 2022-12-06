import React from "react";
import DefaultLayout from "./DefaultLayout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "../pages/Login/Login";

export default function MainLayout() {

  const authState = useSelector((state) => state.authStatus);

  
  if (authState) {
    return(
      <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={<DefaultLayout />}
        />
      </Routes>
    </BrowserRouter>
    )
  }
  else{
    return(
      <Login/>
    )
  }
}
