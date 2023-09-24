import React, { useEffect, useRef } from 'react';
import { IconType } from 'react-icons';
import { styled } from 'styled-components';

const StyledSidenavTabAnchor = styled.a<{ $active: boolean }>`
  padding: 10px;
  color: white;
  text-decoration: none;
  display: flex;
  gap: 10px;
  height: 100%;
  align-self: stretch;
  border-radius: 10px;
  background: ${({ $active }) => ($active ? '#4e504e' : 'none')};
  border: none;
  list-style-type: none;
  &:hover {
    background: ${({ $active }) => ($active ? '#4e504e' : 'rgba(255, 255, 255, 0.1)')};
  }
`;
const ChipSidenavTabAnchor = styled.div`
  margin-left: auto;
`;
export interface MMTabProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  Icon?: IconType;
  label: String;
  chip?: React.ReactNode;
  active: boolean;
}
export const MMTab = ({ Icon, label, chip, href, active, ...props }: MMTabProps) => {
  const tabRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (tabRef.current && active) tabRef.current.click();
  }, [tabRef]);

  return (
    <StyledSidenavTabAnchor $active={active} href={href} ref={tabRef} {...props}>
      {Icon && <Icon />}
      {label}
      {chip && <ChipSidenavTabAnchor>{chip}</ChipSidenavTabAnchor>}
    </StyledSidenavTabAnchor>
  );
};
