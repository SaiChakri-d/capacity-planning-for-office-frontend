import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <br />
        <br />
        <br />
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
