import React from 'react';
import { Outlet } from 'react-router-dom';
import { VenueProvider } from './context/venueContext';

const VenueProfileContainer = () => {
  return (
    <VenueProvider>
      <Outlet />
    </VenueProvider>
  );
};

export default VenueProfileContainer;
