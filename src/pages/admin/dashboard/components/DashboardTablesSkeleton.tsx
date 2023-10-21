import React from 'react';
import { Grid, GridProps, Skeleton } from '@mui/material';

export const DashboardTablesSkeleton = () => {
  const gridProps: GridProps = {
    item: true,
    sm: 12,
    md: 6,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '20px'
  };

  return (
    <Grid container spacing={3}>
      <Grid {...gridProps}>
        <Skeleton variant="rectangular" width={200} height={30} />

        <Skeleton variant="rectangular" width={'100%'} height={200} />
      </Grid>
      <Grid {...gridProps}>
        <Skeleton variant="rectangular" width={200} height={30} />

        <Skeleton variant="rectangular" width={'100%'} height={200} />
      </Grid>
    </Grid>
  );
};
