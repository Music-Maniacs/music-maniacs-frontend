import React from 'react';
import { Grid, GridProps, Skeleton } from '@mui/material';

export const DashboardGraphsSkeleton = () => {
  const range = Array.from(Array(6).keys());

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
      {range.map((_, index) => (
        <Grid key={index} {...gridProps}>
          <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
        </Grid>
      ))}
    </Grid>
  );
};
