import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [reload, setReload] = useState(false);
  

  async function easyRequest(route = 'user', body = null, method = 'GET', headers = {}, url = 'http://localhost:3000/') {
    try {
      if (body) {
        body = JSON.stringify(body);
      }

      const response = await fetch(`${url}${route}`, { method, body, headers: [
        ['Content-Type', 'application/json'],
        ['Authorization', 'Bearer ' + token],
        ['Access-Control-Allow-Origin', '*']
      ]});
      const data = await response.json();

      if (!response || !response.ok) {
        if (data?.statusCode === 401) {
          setToken('');
          setUser('');
          window.location.href = '/login';
        }
        return { statusCode: 500, message: response?.message || 'Something went wrong' };
      }

      if (data?.token) {
        setToken(data.token);

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      if (route.includes('user/')) {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
      }

      return data;
    } catch (error) {
      return { statusCode: 500, message: error.message || 'Something went wrong' };
    }
  }

  const clearContext = () => {
    setToken('');
    setUser(null);

    window.location.href = '/login';
  }

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, easyRequest, clearContext, setReload, reload }}>
      {children}
    </AuthContext.Provider>
  );
};
