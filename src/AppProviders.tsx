import React from 'react';
import { AuthProvider } from './context/authContext';
import { SnackbarProvider, MaterialDesignContent } from 'notistack';
import { ThemeProvider, styled } from '@mui/material';
import { CollectionProvider } from './context/collectionContext';
import colors from './styles/_colors.scss';
import { BrowserRouter } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';
import { MMThemeProvider } from './context/themeContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { muiTheme } from './styles/muiTheme';

moment.locale('es');

type Props = {
  children: React.ReactNode;
};

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
      <MMThemeProvider>
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
            <ThemeProvider theme={muiTheme}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <BrowserRouter>{children}</BrowserRouter>
              </LocalizationProvider>
            </ThemeProvider>
          </SnackbarProvider>
        </CollectionProvider>
      </MMThemeProvider>
    </AuthProvider>
  );
};
