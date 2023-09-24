import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../../../models/User';
import { userInfo } from '../../../services/userService';

type Tabs = 'profile' | 'follows' | 'password' | 'edit';
type StoreProps = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  currentTab: Tabs;
  setCurrentTab: React.Dispatch<React.SetStateAction<Tabs>>;
};

const UserContext = createContext<StoreProps | null>(null);

type Props = {
  children: React.ReactNode;
};
export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>();
  const [currentTab, setCurrentTab] = useState<Tabs>('profile');
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  useEffect(() => {
    // TODO: userInfo se usa en el login. Ahora me trae reviews, portada, links.
    // ¿Hay que hacer otro endpoint para el login?
    // try {
    //   const user = userInfo();
    // } catch (error) {
    // }
  }, []);

  const store = {
    user,
    setUser,
    currentTab,
    setCurrentTab
  };

  return <UserContext.Provider value={store}> {children} </UserContext.Provider>;
};

export const useUser = (): StoreProps => {
  return useContext(UserContext) as StoreProps;
};
