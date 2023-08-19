import { styled } from 'styled-components';
import colors from '../../styles/_colors.scss';

export const StyledLabel = styled.label`
  font-size: 16px;
`;

export const StyledInput = styled.input<{ $hasErrors?: boolean }>`
  border: 1px solid ${({ $hasErrors }) => ($hasErrors ? colors.error : colors.input_border)};
  border-radius: 3px;
  outline: none;
  background: transparent;
  padding: 7px 5px;
  font-size: 14px;
  background-color: ${colors.input_background};
  color: white;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:active,
  &:hover,
  &:focus,
  &:target {
    border: 1px solid ${({ $hasErrors }) => ($hasErrors ? colors.error : colors.primary)};
  }
`;

export const StyledTextArea = styled(StyledInput)`
  resize: vertical;
  max-width: 100%;
`;

export const StyledError = styled.span`
  color: ${colors.error};
`;

export const StyledInputContainer = styled.div<{ $containerWidth?: string }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: ${({ $containerWidth }) => $containerWidth ?? '100%'};
`;
