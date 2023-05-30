import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import {
  executeBasicAuthenticationService,
  executeJwtAuthenticationService,
} from "../api/AuthenticationApiService";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [number, setNumber] = useState(10);

  const [isAuthenticated, setAuthenticated] = useState(false);

  const [username, setUsername] = useState(null);

  const [token, setToken] = useState(null);

  setInterval(() => setNumber(number + 1), 10000);

  /*  const login = (username, password) => {
    if (username === "in28minutes" && password === "dummy") {
      setAuthenticated(true);
      setUsername(username);
      return true;
    } else {
      setAuthenticated(false);
      setUsername(null);
      return false;
    }
  }; */

  /*   const login = async (username, password) => {
    const baToken = "Basic " + window.btoa(username + ":" + password);

    try {
      const response = await executeBasicAuthenticationService(baToken);

      if (response.status === 200) {
        setAuthenticated(true);
        setUsername(username);
        setToken(baToken);

        apiClient.interceptors.request.use((config) => {
          console.log("intercepting and adding a token");
          config.headers.Authorization = baToken;
          return config;
        });

        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }; */

  const login = async (username, password) => {
    try {
      const response = await executeJwtAuthenticationService(
        username,
        password
      );

      if (response.status === 200) {
        const jwtToken = "Bearer " + response.data.token;
        setAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);

        apiClient.interceptors.request.use((config) => {
          console.log("intercepting and adding a token");
          config.headers.Authorization = jwtToken;
          return config;
        });

        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  };

  const logout = () => {
    setAuthenticated(false);
    setUsername(null);
    setToken(null);
  };

  const valuesBeShared = {
    number,
    isAuthenticated,
    login,
    logout,
    username,
    token,
  };
  return (
    <AuthContext.Provider value={valuesBeShared}>
      {children}
    </AuthContext.Provider>
  );
};
