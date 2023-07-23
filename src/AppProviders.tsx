import React from 'react';
import { ColorPaletteProvider } from './context/colorPaletteContext';
import { AuthProvider } from './context/authContext';

type Props = {
  children: React.ReactNode;
};

export const AppProviders = ({ children }: Props) => {
  return (
    <AuthProvider>
      <ColorPaletteProvider>{children}</ColorPaletteProvider>
    </AuthProvider>
  );
};
