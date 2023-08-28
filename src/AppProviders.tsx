import React from 'react';
import { AuthProvider } from './context/authContext';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, createTheme } from '@mui/material';
import { esES } from '@mui/material/locale';
import { CollectionProvider } from './context/collectionContext';

type Props = {
  children: React.ReactNode;
};

const theme = createTheme({}, esES);

export const AppProviders = ({ children }: Props) => {
  return (
    <AuthProvider>
      <CollectionProvider>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={3000}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          preventDuplicate
        >
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </SnackbarProvider>
      </CollectionProvider>
    </AuthProvider>
  );
};
