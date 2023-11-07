import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../models/User';
import axios from 'axios';
import { userInfo } from '../services/userProfileService';
import { ControllerClassNames } from '../models/Role';
import { errorSnackbar } from '../components/Snackbar/Snackbar';
import { navigationPolicy } from '../services/policyService';

type Props = {
  children: React.ReactNode;
};

type StoreProps = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  isUserLoading: boolean;
  handleUserLogin: (user: User, authToken: string) => void;
  handleUserLogout: () => void;
  navigationPolicies: ControllerClassNames[];
};

const Auth = createContext<StoreProps | null>(null);

export const AuthProvider = ({ children }: Props) => {
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>();
  const [navigationPolicies, setNavigationPolicies] = useState<ControllerClassNames[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      return setIsUserLoading(false);
    }

    getUserInfo(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserInfo = async (token: string) => {
    try {
      const user = await userInfo(token);

      axios.defaults.headers.common['Authorization'] = token;

      setUser(user);
      getNavigationPolicy();
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setIsUserLoading(false);
    }
  };

  const getNavigationPolicy = async () => {
    try {
      const reponse = await navigationPolicy();

      setNavigationPolicies(reponse);
    } catch (err) {
      errorSnackbar('Error al obtener los permisos de navegación. Contacte a soporte');
    }
  };

  const handleUserLogin = (user: User, authToken: string) => {
    axios.defaults.headers.common['Authorization'] = authToken;

    localStorage.setItem('token', authToken);

    setUser(user);
    getNavigationPolicy();
  };

  const handleUserLogout = () => {
    axios.defaults.headers.common['Authorization'] = undefined;

    localStorage.removeItem('token');

    setUser(undefined);
    setNavigationPolicies([]);
  };

  const store: StoreProps = {
    user,
    setUser,
    isUserLoading,
    navigationPolicies,
    handleUserLogin,
    handleUserLogout
  };

  return <Auth.Provider value={store}>{children}</Auth.Provider>;
};

export const useAuth = (): StoreProps => {
  return useContext(Auth) as StoreProps;
};
