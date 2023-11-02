import React from 'react';
import { StyledFlex, StyledFlexColumn } from '../../../styles/styledComponents';
import { Skeleton } from '@mui/material';

export const UserProfileSkeleton = () => {
  return (
    <StyledFlex $justifyContent="space-between" $gap="10px">
      <StyledFlexColumn $width="250px">
        <Skeleton variant="rectangular" width="100%" height="610px" />
      </StyledFlexColumn>

      <StyledFlexColumn $width="100%" $gap="10px">
        <Skeleton variant="rectangular" width="100%" height="130px" />

        <StyledFlex $gap="10px" $alignItems="center">
          <Skeleton variant="circular" width="150px" height="150px" />

          <Skeleton variant="rectangular" width="250px" height="100px" />
        </StyledFlex>

        <Skeleton variant="rectangular" width="100%" height="100px" />

        <Skeleton variant="rectangular" width="100%" height="200px" />
      </StyledFlexColumn>
    </StyledFlex>
  );
};
