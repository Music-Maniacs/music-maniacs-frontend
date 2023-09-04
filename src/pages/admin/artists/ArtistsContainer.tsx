import React from 'react';
import { Index } from './Index';
import { ArtistsProvider } from './context/artistContext';

const ArtistsContainer = () => {
  return (
    <ArtistsProvider>
      <Index />
    </ArtistsProvider>
  );
};

export default ArtistsContainer;
