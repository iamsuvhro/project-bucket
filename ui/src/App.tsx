import React, { lazy } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { State } from "./state/reducers";
import Login from "./pages/Authentication/Login";
import PrivateRoute from "./PrivateRoute";
import DefaultLayout from "./layouts/DefaultLayout";

const MainLayout = lazy( () => import("./layouts/MainLayout"))

function App() {
  const authStatus = useSelector((state: State) => state.authStatus);
  console.log("AuthStatus", authStatus);
  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path="/*" element={<PrivateRoute><DefaultLayout/></PrivateRoute>} />
              <Route path="/login" element={<Login />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
