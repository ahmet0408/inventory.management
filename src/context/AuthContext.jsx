import { createContext, useState, useContext } from "react";
import { api } from "../env";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(localStorage.getItem("user"));

  const login = async (username, password) => {
    try {
      const response = await fetch(`${api}/user/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: username, password }),
        credentials: "include",
      });

      const data = await response.json();
      if (data.isAuthenticated) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        localStorage.setItem("user", data.userName);
        setUser(data.userName);
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch(`${api}/user/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
