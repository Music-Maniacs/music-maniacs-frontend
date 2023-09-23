import React, { createContext, useContext, useState } from 'react';
import { User } from '../../../models/User';

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
