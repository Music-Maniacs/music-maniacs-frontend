import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../models/User';
import axios from 'axios';

type Props = {
  children: React.ReactNode;
};

type StoreProps = {
  user?: User;
  handleUserLogin: (user: User, authToken: string) => void;
  handleUserLogout: () => void;
};

const Auth = createContext<StoreProps | null>(null);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user && token) {
      axios.defaults.headers.common['Authorization'] = token;
      setUser(JSON.parse(user));
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, []);

  const handleUserLogin = (user: User, authToken: string) => {
    axios.defaults.headers.common['Authorization'] = authToken;

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', authToken);

    setUser(user);
  };

  const handleUserLogout = () => {
    axios.defaults.headers.common['Authorization'] = undefined;

    localStorage.removeItem('user');
    localStorage.removeItem('token');

    setUser(undefined);
  };

  const store = {
    user,
    handleUserLogin,
    handleUserLogout
  };

  return <Auth.Provider value={store}>{children}</Auth.Provider>;
};

export const useAuth = (): StoreProps => {
  return useContext(Auth) as StoreProps;
};
