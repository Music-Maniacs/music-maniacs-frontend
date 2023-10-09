import React from 'react';
import { UsersProvider } from './context/usersContext';
import { Index } from './Index';

export const UsersContainer = () => {
  return (
    <UsersProvider>
      <Index />
    </UsersProvider>
  );
};

export default UsersContainer;
