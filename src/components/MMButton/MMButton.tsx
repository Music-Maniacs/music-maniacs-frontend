import React, { ButtonHTMLAttributes, useCallback } from 'react';
import colors from './../../styles/_colors.scss';
import { styled } from 'styled-components';
import { getColorVariant } from '../../utils/getColorVariant';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'error' | 'info' | 'warning';
  children: React.ReactNode;
}

const StyledButton = styled.button<{ $bg?: string; $bgDark?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background-color: ${({ $bg }) => $bg ?? colors.primary};
  cursor: pointer;
  border-radius: 4px;
  line-height: 1.75;
  color: white;
  font-family: Roboto;
  border: 0;
  text-transform: uppercase;
  font-weight: 500;
  padding: 4px 10px;
  box-shadow: -2px 2px 2px 0px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ $bgDark }) => $bgDark ?? colors.primary_dark};
  }
`;

export const MMButton = ({ children, color, ...props }: Props) => {
  const getColors = useCallback(() => {
    return getColorVariant(color);
  }, [color]);

  return (
    <StyledButton {...getColors()} {...props}>
      {children}
    </StyledButton>
  );
};
