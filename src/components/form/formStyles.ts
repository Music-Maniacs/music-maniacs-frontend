import { styled } from 'styled-components';
import colors from '../../styles/_colors.scss';

export const StyledLabel = styled.label`
  font-size: 16px;
`;

export const StyledInput = styled.input<{ $hasErrors?: boolean }>`
  width: 100%;
  border: 1px solid ${({ $hasErrors }) => ($hasErrors ? colors.error : 'black')};
  border-radius: 3px;
  outline: none;
  background: transparent;
  padding: 7px 5px;
  font-size: 14px;

  color: white;

  &:active,
  &:hover,
  &:focus,
  &:target {
    border: 1px solid ${({ $hasErrors }) => ($hasErrors ? colors.error : colors.primary)};
  }
`;

export const StyledError = styled.span`
  color: ${colors.error};
`;
