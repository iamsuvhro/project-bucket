import React, { lazy, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { State } from "./state/reducers";
import Login from "./pages/Authentication/Login";
import PrivateRoute from "./PrivateRoute";
import DefaultLayout from "./layouts/DefaultLayout";
import { UserContext } from "./context/user/userContext";
import MainLayout from "./layouts/MainLayout";
// import UserState from "./context/user/userState.js";

function App() {
  const authStatus = false;
  return (
    <>
      <MainLayout/>
    </>
  );
}

export default App;
