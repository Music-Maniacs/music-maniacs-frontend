import React, { createContext, useContext, useEffect, useState } from 'react';
import { errorSnackbar } from '../../../components/Snackbar/Snackbar';
import { User } from '../../../models/User';
import { getUserProfile } from '../../../services/userService';

type StoreProps = {
  userProfile: User | undefined;
  setUserProfile: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const UserContext = createContext<StoreProps | null>(null);

type Props = {
  children: React.ReactNode;
};
export const UserProvider = ({ children }: Props) => {
  const [userProfile, setUserProfile] = useState<User>();
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile();
      setUserProfile(response);
    } catch (error) {
      errorSnackbar('Error al obtener los datos del perfil');
    }
  };

  const store = {
    userProfile,
    setUserProfile
  };

  return <UserContext.Provider value={store}> {children} </UserContext.Provider>;
};

export const useUser = (): StoreProps => {
  const userContext = useContext(UserContext) as StoreProps;
  if (!userContext) {
    throw new Error('Add UserProvider to CombineProviders.');
  } else {
    return userContext;
  }
};
