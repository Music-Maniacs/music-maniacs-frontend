import React from 'react';
import { UsersProvider } from './context/userContext';
import { Index } from './Index';

export const UsersContainer = () => {
  return (
    <UsersProvider>
      <Index />
    </UsersProvider>
  );
};

export default UsersContainer;
