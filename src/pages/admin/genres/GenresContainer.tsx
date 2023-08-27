import React from 'react';
import { GenresProvider } from './context/genreContext';
import { Index } from './Index';

export const GenresContainer = () => {
  return (
    <GenresProvider>
      <Index />
    </GenresProvider>
  );
};

export default GenresContainer;
