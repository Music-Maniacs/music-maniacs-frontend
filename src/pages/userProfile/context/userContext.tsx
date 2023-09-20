import React, { createContext, useContext, useState } from 'react';
import { User } from '../../../models/User';

type Props = {
  children: React.ReactNode;
};

type StoreProps = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const UserContext = createContext<StoreProps | null>(null);

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>();

  const store = {
    user,
    setUser
  };

  return <UserContext.Provider value={store}> {children} </UserContext.Provider>;
};

export const useUser = (): StoreProps => {
  return useContext(UserContext) as StoreProps;
};
