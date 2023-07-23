import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../models/User';

type Props = {
  children: React.ReactNode;
};

type StoreProps = {
  user?: User;
  userLogin: (user: User) => void;
  userLogout: () => void;
};

const Auth = createContext<StoreProps | null>(null);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    // todo: verificar si hay un usuario logueado en el localStorage
  }, []);

  const userLogin = (user: User) => {
    setUser(user);
    // todo: addLocalStorage
    // todo: axios.defaults.headers.common['Authorization'] = ...
  };

  const userLogout = () => {
    setUser(undefined);
    // todo: removeLocalStorage
    // todo: axios.defaults.headers.common['Authorization'] = ...
  };

  const store = {
    user,
    userLogin,
    userLogout
  };

  return <Auth.Provider value={store}>{children}</Auth.Provider>;
};

export const useAuth = (): StoreProps => {
  return useContext(Auth) as StoreProps;
};
