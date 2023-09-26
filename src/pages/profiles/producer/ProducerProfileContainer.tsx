import React from 'react';
import { Outlet } from 'react-router-dom';
import { ProducerProvider } from './context/producerContext';

const ProducerProfileContainer = () => {
  return (
    <ProducerProvider>
      <Outlet />
    </ProducerProvider>
  );
};

export default ProducerProfileContainer;
