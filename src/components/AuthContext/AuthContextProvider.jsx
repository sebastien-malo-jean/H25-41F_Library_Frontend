import React, { useEffect } from "react";
import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

function AuthContextProvider(props) {
  const { children } = props;
  const [loginToken, setLoginToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("loginToken");
    if (savedToken && validateLoginToken(savedToken)) {
      setLoginToken(savedToken);
    } else {
      logout();
    }
  }, []);

  useEffect(() => {
    if (validateLoginToken(loginToken)) {
      const { name, email, role } = jwtDecode(loginToken);
      setUser({ name, email, role });
    } else {
      setUser(null);
    }
  }, [loginToken]);

  function validateLoginToken(loginToken) {
    if (!loginToken) return false;
    try {
      const decoded = jwtDecode(loginToken);
      return decoded.exp * 1000 > Date.now();
    } catch (error) {
      return false;
    }
  }
  function login(newToken) {
    if (validateLoginToken(newToken)) {
      localStorage.setItem("loginToken", newToken);
      setLoginToken(newToken);
    }
  }
  function logout() {
    localStorage.removeItem("loginToken");
    setLoginToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ loginToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
