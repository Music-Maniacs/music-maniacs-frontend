import React from 'react';
import { AuthProvider } from './context/authContext';
import { SnackbarProvider, MaterialDesignContent } from 'notistack';
import { ThemeProvider, createTheme, styled } from '@mui/material';
import { esES } from '@mui/material/locale';
import { CollectionProvider } from './context/collectionContext';
import colors from './styles/_colors.scss';
import { BrowserRouter } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';
import { MMThemeProvider } from './context/themeContext';

moment.locale('es');

type Props = {
  children: React.ReactNode;
};

const cssVar = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const theme = createTheme(
  {
    palette: {
      primary: {
        main: cssVar('--primary') || '#6c26ed'
      },
      text: {
        primary: cssVar('--text_color') || '#fff'
      }
    },
    components: {
      MuiTab: {
        defaultProps: {
          sx: {
            color: colors.text_color,
            '&.Mui-selected': {
              color: colors.text_color,
              fontWeight: 'bold'
            }
          }
        }
      },
      MuiPaper: {
        defaultProps: {
          sx: {
            color: colors.text_color,
            backgroundColor: colors.dropdown_background
          }
        }
      },
      MuiTablePagination: {
        defaultProps: {
          sx: {
            color: colors.text_color
          }
        }
      }
    }
  },
  esES
);

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
            <ThemeProvider theme={theme}>
              <BrowserRouter>{children}</BrowserRouter>
            </ThemeProvider>
          </SnackbarProvider>
        </CollectionProvider>
      </MMThemeProvider>
    </AuthProvider>
  );
};
