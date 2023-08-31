import React from 'react';
import { ThresholdProvider } from './context/ThresholdProvider';
import Index from './Index';

export const ThresholdContainer = () => {
  return (
    <ThresholdProvider>
      <Index />
    </ThresholdProvider>
  );
};

export default ThresholdContainer;
