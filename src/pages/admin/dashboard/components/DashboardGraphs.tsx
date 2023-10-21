import { Grid, GridProps } from '@mui/material';
import React from 'react';
import { useDashboardGraphs } from '../hooks/useDashboardGraphs';
import { LineChart } from './LineChart';

export const DashboardGraphs = () => {
  const { graphs } = useDashboardGraphs();

  const gridProps: GridProps = {
    item: true,
    sm: 12,
    md: 6,
    lg: 4,
    height: '250px',
    maxWidth: '100%'
  };

  return (
    <Grid container spacing={1}>
      {graphs.map((graph) => (
        <Grid key={graph.title} {...gridProps}>
          <LineChart title={graph.title} dataset={graph.dataset} labels={graph.labels} />
        </Grid>
      ))}
    </Grid>
  );
};
