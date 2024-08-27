import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Login from "../Login/Login";

export default function ({ children }) {
  const { userToken } = useContext(AuthContext);
  return <>{userToken ? children : <Login />}</>;
}
