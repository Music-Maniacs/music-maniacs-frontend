import React from 'react';
import { Skeleton } from '@mui/material';
import { StyledFlex, StyledFlexColumn } from '../../styles/styledComponents';

export const CommentsSkeleton = () => {
  const range = Array.from(Array(5).keys());

  return (
    <StyledFlexColumn>
      {range.map((index) => (
        <StyledFlexColumn key={index} $gap="10px">
          <StyledFlex $gap={'5px'}>
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton variant="rectangular" width={60} height={30} />
          </StyledFlex>

          <Skeleton variant="rectangular" width={'100%'} height={20} />
        </StyledFlexColumn>
      ))}
    </StyledFlexColumn>
  );
};
