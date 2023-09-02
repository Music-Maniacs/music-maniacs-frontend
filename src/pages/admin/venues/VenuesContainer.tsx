import React from 'react';
import { Index } from './Index';
import { VenuesProvider } from './context/venueContext';

const VenuesContainer = () => {
  return (
    <VenuesProvider>
      <Index />
    </VenuesProvider>
  );
};
export default VenuesContainer;
