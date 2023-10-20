import React, { ReactNode } from 'react';
import { useDashboard } from '../context/dashboardContext';
import { LineChart } from '../components/LineChart';

type DashboardGraph = {
  content: ReactNode;
};

export const useDashboardGraphs = () => {
  const { dashboardData } = useDashboard();

  const graphs: DashboardGraph[] = [
    {
      content: <LineChart />
    }
  ];

  return { graphs };
};
