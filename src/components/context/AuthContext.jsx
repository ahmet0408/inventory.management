// AuthContext.js
import { createContext, useState, useContext } from 'react';
import { api } from '../../env';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await fetch(`${api}/user/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }),
        credentials: 'include'
      });

      const data = await response.json();
      
      if (data.isAuthenticated) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser({
          username: data.userName,
          email: data.email,
          roles: data.roles
        });
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);