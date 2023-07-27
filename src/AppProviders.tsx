import React from 'react';
import { AuthProvider } from './context/authContext';

type Props = {
  children: React.ReactNode;
};

export const AppProviders = ({ children }: Props) => {
  return <AuthProvider>{children}</AuthProvider>;
};
