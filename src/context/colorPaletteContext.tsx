import React, { createContext, useContext } from 'react';
import { createTheme } from '@mui/material/styles';
import { Theme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import colors from './../styles/_colors.scss';

type Props = {
  children: React.ReactNode;
};

type StoreProps = {
  theme: Theme;
};

const ColorPalette = createContext<StoreProps | null>(null);

export const ColorPaletteProvider = ({ children }: Props) => {
  // Aca podemos en un momento alternar paletas 'dark' y 'light'
  const theme = createTheme({
    palette: {
      primary: {
        main: colors.primary
      },
      secondary: {
        main: colors.secondary
      },
      info: {
        main: colors.info
      },
      success: {
        main: colors.success
      },
      warning: {
        main: colors.warning
      },
      error: {
        main: colors.error
      }
    }
  });

  const store: StoreProps = {
    theme
  };

  return (
    <ColorPalette.Provider value={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorPalette.Provider>
  );
};

export const useColorPalette = (): StoreProps => {
  return useContext(ColorPalette) as StoreProps;
};
