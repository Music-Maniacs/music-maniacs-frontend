import React from 'react';
import { Index } from './Index';
import { ProducersProvider } from './context/producerContext';

const ProducersContainer = () => {
  return (
    <ProducersProvider>
      <Index />
    </ProducersProvider>
  );
};

export default ProducersContainer;
