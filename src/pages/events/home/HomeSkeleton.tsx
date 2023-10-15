import React from 'react';
import { StyledFlex, StyledFlexColumn } from '../../../styles/styledComponents';
import { Skeleton } from '@mui/material';

export const HomeSkeleton = () => {
  const range = Array.from(Array(3).keys());
  const range2 = Array.from(Array(5).keys());

  return (
    <StyledFlexColumn $gap="20px">
      {range.map((_v, index: number) => (
        <StyledFlexColumn key={index}>
          <Skeleton variant="rectangular" width={500} height={50} sx={{ bgcolor: 'var(--highlight)' }} />

          <StyledFlex $gap="20px" $overflowY="hidden" $overflowX="hidden" $padding="25px 0 5px 0" $height={'370px'}>
            {range2.map((_v, index: number) => (
              <div style={{ width: '270px', minWidth: '270px' }} key={index}>
                <Skeleton variant="rectangular" width={'100%'} height={'100%'} sx={{ bgcolor: 'var(--highlight)' }} />
              </div>
            ))}
          </StyledFlex>
        </StyledFlexColumn>
      ))}
    </StyledFlexColumn>
  );
};
