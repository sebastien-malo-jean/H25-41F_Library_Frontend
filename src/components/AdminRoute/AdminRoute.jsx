import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContextProvider";

function AdminRoute() {
  const { loginToken, user, validateLoginToken } = useContext(AuthContext);

  // Affiche les informations du token et de l'utilisateur
  console.log("loginToken:", loginToken);
  console.log("user:", user);
  console.log("Token is valid:", validateLoginToken(loginToken));

  if (user && validateLoginToken(loginToken) && user.role === 0) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
}

export default AdminRoute;
