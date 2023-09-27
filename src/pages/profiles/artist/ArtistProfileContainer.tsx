import React from 'react';
import { Outlet } from 'react-router-dom';
import { ArtistProvider } from './context/artistContext';

const ArtistProfileContainer = () => {
  return (
    <ArtistProvider>
      <Outlet />
    </ArtistProvider>
  );
};

export default ArtistProfileContainer;
