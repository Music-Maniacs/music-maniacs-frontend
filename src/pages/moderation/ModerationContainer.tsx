import React from 'react';
import { Outlet } from 'react-router-dom';
import { ReportsProvider } from './context/moderationContext';

const ModerationContainer = () => {
  return (
    <ReportsProvider>
      <Outlet />
    </ReportsProvider>
  );
};

export default ModerationContainer;
