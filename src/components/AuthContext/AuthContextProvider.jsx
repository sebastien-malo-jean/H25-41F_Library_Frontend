import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

function AuthContextProvider(props) {
  const { children } = props;
  const [loginToken, setLoginToken] = useState(null);
  const [user, setUser] = useState(null);

  // Effet pour vérifier le token stocké dans localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("loginToken");
    if (savedToken && validateLoginToken(savedToken)) {
      setLoginToken(savedToken);
    } else {
      logout();
    }
  }, []);

  // Effet pour mettre à jour l'utilisateur lorsqu'un token valide est trouvé
  useEffect(() => {
    if (loginToken && validateLoginToken(loginToken)) {
      try {
        const decodedToken = jwtDecode(loginToken);
        console.log("Token décodé:", decodedToken);

        const { name, email, role } = jwtDecode(loginToken);
        // console.log({ name, email, role });
        setUser({ name, email, role });
      } catch (error) {
        console.error("Erreur lors du décodage du token:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [loginToken]);

  // Fonction de validation du token
  function validateLoginToken(loginToken) {
    if (!loginToken) return false;
    try {
      const decoded = jwtDecode(loginToken);
      // console.log("Token décodé:", decoded);
      return decoded.exp * 1000 > Date.now();
    } catch (error) {
      console.error("Erreur de décodage du token:", error);
      return false;
    }
  }

  // Fonction de connexion
  function login(newToken) {
    if (validateLoginToken(newToken)) {
      localStorage.setItem("loginToken", newToken);
      setLoginToken(newToken);
    }
  }

  //fonction de déconnexion
  function logout() {
    localStorage.removeItem("loginToken");
    setLoginToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ loginToken, validateLoginToken, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
