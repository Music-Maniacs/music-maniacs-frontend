import React from 'react';
import { Link, To } from 'react-router-dom';
import { MMButton, MMButtonProps } from './MMButton';
import styled from 'styled-components';

interface Props extends MMButtonProps {
  to: To;
}

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const MMButtonLink = ({ to, children, ...props }: Props) => {
  return (
    <StyledLink to={to}>
      <MMButton {...props}>{children}</MMButton>
    </StyledLink>
  );
};
