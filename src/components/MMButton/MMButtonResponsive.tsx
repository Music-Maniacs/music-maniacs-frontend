import React from 'react';
import { MMButton, MMButtonProps } from './MMButton';
import { IconType } from 'react-icons';
import { styled } from 'styled-components';
import breakpoints from '../../styles/_breakpoints.scss';

interface Props extends MMButtonProps {
  Icon: IconType;
}

const StyledResponsiveButton = styled(MMButton)`
  svg {
    display: none;
  }

  @media only screen and (max-width: ${breakpoints.sm}) {
    svg {
      display: block;
    }

    span {
      display: none;
    }
  }
`;

// On small devices, the button shows only the icon.
export const MMButtonResponsive = ({ Icon, children, ...props }: Props) => {
  return (
    <StyledResponsiveButton {...props}>
      <Icon />
      <span>{children}</span>
    </StyledResponsiveButton>
  );
};
