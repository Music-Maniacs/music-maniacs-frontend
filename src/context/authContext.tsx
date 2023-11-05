import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../models/User';
import axios from 'axios';
import { userInfo } from '../services/userProfileService';

type Props = {
  children: React.ReactNode;
};

type StoreProps = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  isUserLoading: boolean;
  handleUserLogin: (user: User, authToken: string) => void;
  handleUserLogout: () => void;
};

const Auth = createContext<StoreProps | null>(null);

export const AuthProvider = ({ children }: Props) => {
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      return setIsUserLoading(false);
    }

    getUserInfo(token);
  }, []);

  const getUserInfo = async (token: string) => {
    try {
      const user = await userInfo(token);

      axios.defaults.headers.common['Authorization'] = token;
      setUser(user);

      getNav();
      getPermisos();
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setIsUserLoading(false);
    }
  };

  const getNav = async () => {
    try {
      const reponse = await axios.get(`${process.env.REACT_APP_API_URL}/navigation_policy`);
      console.log('Permisos de navegacion', reponse.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getPermisos = async () => {
    try {
      const reponse = await axios.get(`${process.env.REACT_APP_API_URL}/check_policy?class=ArtistsController`);

      console.log('Permisos de ArtistsController', reponse.data);

      const reponse2 = await axios.get(`${process.env.REACT_APP_API_URL}/check_policy?class=Admin::ArtistsController`);

      console.log('Permisos de Admin::ArtistsController', reponse2.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserLogin = (user: User, authToken: string) => {
    axios.defaults.headers.common['Authorization'] = authToken;

    localStorage.setItem('token', authToken);

    setUser(user);
  };

  const handleUserLogout = () => {
    axios.defaults.headers.common['Authorization'] = undefined;

    localStorage.removeItem('token');

    setUser(undefined);
  };

  const store: StoreProps = {
    user,
    setUser,
    isUserLoading,
    handleUserLogin,
    handleUserLogout
  };

  return <Auth.Provider value={store}>{children}</Auth.Provider>;
};

export const useAuth = (): StoreProps => {
  return useContext(Auth) as StoreProps;
};
