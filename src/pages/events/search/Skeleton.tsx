import React from 'react';
import { Grid, Skeleton } from '@mui/material';

export const SearcherSkeleton = () => {
  const range = Array.from(Array(10).keys());

  return (
    <>
      {range.map((_v, index: number) => (
        <Grid key={index} item container xs={12} sm={4} md={3} lg={2}>
          <Skeleton variant="rectangular" width={'100%'} height={310} />
        </Grid>
      ))}
    </>
  );
};
