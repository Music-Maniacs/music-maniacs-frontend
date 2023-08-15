import React from 'react';
import { AuthProvider } from './context/authContext';
import { SnackbarProvider } from 'notistack';

type Props = {
  children: React.ReactNode;
};

export const AppProviders = ({ children }: Props) => {
  return (
    <AuthProvider>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        preventDuplicate
      >
        {children}
      </SnackbarProvider>
    </AuthProvider>
  );
};
