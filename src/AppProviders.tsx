import React from 'react';
import { AuthProvider } from './context/authContext';
import { SnackbarProvider, MaterialDesignContent } from 'notistack';
import { ThemeProvider, createTheme, styled } from '@mui/material';
import { esES } from '@mui/material/locale';
import { CollectionProvider } from './context/collectionContext';
import colors from './styles/_colors.scss';
import { BrowserRouter } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

const theme = createTheme({}, esES);

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-warning': {
    backgroundColor: colors.warning
  },
  '&.notistack-MuiContent-info': {
    backgroundColor: colors.primary
  },
  '&.notistack-MuiContent-success': {
    backgroundColor: colors.success
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: colors.error
  }
}));

export const AppProviders = ({ children }: Props) => {
  return (
    <AuthProvider>
      <CollectionProvider>
        <SnackbarProvider
          Components={{
            warning: StyledMaterialDesignContent,
            info: StyledMaterialDesignContent,
            success: StyledMaterialDesignContent,
            error: StyledMaterialDesignContent
          }}
          maxSnack={3}
          autoHideDuration={3000}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          preventDuplicate
        >
          <ThemeProvider theme={theme}>
            <BrowserRouter>{children}</BrowserRouter>
          </ThemeProvider>
        </SnackbarProvider>
      </CollectionProvider>
    </AuthProvider>
  );
};
