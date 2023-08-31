import React from 'react';
import { RolesProvider } from './context/roleContext';
import { Index } from './Index';

export const UsersContainer = () => {
  return (
    <RolesProvider>
      <Index />
    </RolesProvider>
  );
};

export default UsersContainer;
