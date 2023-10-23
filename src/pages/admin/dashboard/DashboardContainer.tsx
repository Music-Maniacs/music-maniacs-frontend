import React from 'react';
import { Dashboard } from './Dashboard';
import { DashboardProvider } from './context/dashboardContext';

const DashboardContainer = () => {
  return (
    <DashboardProvider>
      <Dashboard />
    </DashboardProvider>
  );
};

export default DashboardContainer;
