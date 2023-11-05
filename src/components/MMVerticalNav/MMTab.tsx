import React from 'react';
import { IconBaseProps, IconType } from 'react-icons';
import { styled } from 'styled-components';
import { MMColors } from '../../models/Generic';
import breakpoints from '../../styles/_breakpoints.scss';
import { MMChip } from '../MMChip/MMChip';

const StyledSidenavTabAnchor = styled.a<{ $active?: boolean }>`
  padding: 10px;
  color: var(--text_color);
  text-decoration: none;
  display: flex;
  gap: 10px;
  align-self: stretch;
  align-items: center;
  border-radius: 10px;
  background: ${({ $active }) => ($active ? `var(--highlight)` : 'none')};
  border: none;
  list-style-type: none;
  position: relative;
  overflow-anchor: none;

  svg {
    min-width: 0.5rem;
  }
  &:hover {
    background: var(--highlight);
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
  return (
    <StyledSidenavTabAnchor $active={active} {...props}>
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
