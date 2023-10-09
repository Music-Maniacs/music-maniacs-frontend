import React, { useEffect, useRef } from 'react';
import { IconBaseProps, IconType } from 'react-icons';
import { styled } from 'styled-components';
import { MMColors } from '../../models/Generic';
import breakpoints from '../../styles/_breakpoints.scss';
import { MMChip } from '../MMChip/MMChip';

const StyledSidenavTabAnchor = styled.a<{ $active?: boolean }>`
  padding: 10px;
  color: white;
  text-decoration: none;
  display: flex;
  gap: 10px;
  align-self: stretch;
  align-items: center;
  border-radius: 10px;
  background: ${({ $active }) => ($active ? '#4e504e' : 'none')};
  border: none;
  list-style-type: none;
  position: relative;
  overflow-anchor: none;

  svg {
    min-width: 0.5rem;
  }
  &:hover {
    background: ${({ $active }) => ($active ? '#4e504e' : 'rgba(255, 255, 255, 0.1)')};
  }
  .tab-text {
    width: 70%;
  }

  @media screen and (max-width: ${breakpoints.md}) {
    align-self: center;
    .tab-text {
      display: none;
    }
  }
`;
const ChipSidenavTabAnchor = styled.div`
  display: block;
  width: fit-content;
  height: fit-content;
  border: none;
  margin-left: auto;
  @media screen and (max-width: ${breakpoints.md}) {
    position: absolute;
    top: -10px;
    right: -10px;
  }
`;

export interface MMTabProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  Icon?: IconType | ((props: IconBaseProps) => JSX.Element);
  label: String;
  chip?: {
    color?: MMColors;
    value: number;
  };
  active?: boolean;
}
export const MMTab = ({ Icon, label, chip, href, active, ...props }: MMTabProps) => {
  const tabRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (tabRef.current && active) tabRef.current.click();
  }, [tabRef]);

  return (
    <StyledSidenavTabAnchor $active={active} href={href} ref={tabRef} {...props}>
      {Icon && <Icon />}
      <span className="tab-text">{label}</span>

      {chip && (
        <ChipSidenavTabAnchor>
          <MMChip color={chip.color}>{chip.value.toString()}</MMChip>
        </ChipSidenavTabAnchor>
      )}
    </StyledSidenavTabAnchor>
  );
};
