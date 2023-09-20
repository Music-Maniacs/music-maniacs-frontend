import React from 'react';
import { UserProfile } from './UserProfile';
import { UserProvider } from './context/userContext';

export const UserProfileContainer = () => {
  return (
    <UserProvider>
      <UserProfile />
    </UserProvider>
  );
};

export default UserProfileContainer;
