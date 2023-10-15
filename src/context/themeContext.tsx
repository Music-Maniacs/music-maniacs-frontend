import React, { createContext, useContext, useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

type StoreProps = {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
};

const ThemeContext = createContext<StoreProps | null>(null);

export const MMThemeProvider = ({ children }: Props) => {
  const storedTheme = localStorage.getItem('theme') as null | 'dark' | 'light';

  const [theme, setTheme] = useState<'dark' | 'light'>(storedTheme ?? 'dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);

    const html = document.getElementsByTagName('html')[0];
    if (!html) return;

    html.className = `theme--${theme}`;
  }, [theme]);

  const store: StoreProps = {
    theme,
    toggleTheme
  };

  return <ThemeContext.Provider value={store}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): StoreProps => {
  return useContext(ThemeContext) as StoreProps;
};
