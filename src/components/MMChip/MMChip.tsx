import React, { useCallback } from 'react';
import { styled } from 'styled-components';
import colors from '../../styles/_colors.scss';
import { getColorVariant } from '../../utils/getColorVariant';
import { MMColors } from '../../models/Generic';

type Props = {
  color?: MMColors;
  children: string;
};

const StyledChip = styled.span<{ $bg?: string }>`
  color: white;
  font-size: 12px;
  border-radius: 20px;
  padding: 3px 6px;
  background-color: ${({ $bg }) => $bg ?? colors.primary};
  width: fit-content;
`;

export const MMChip = ({ children, color }: Props) => {
  const getColors = useCallback(() => {
    return getColorVariant(color);
  }, [color]);

  return <StyledChip {...getColors()}>{children}</StyledChip>;
};
