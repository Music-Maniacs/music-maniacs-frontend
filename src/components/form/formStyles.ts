import { styled } from 'styled-components';
import colors from '../../styles/_colors.scss';
import { StylesConfig } from 'react-select';

const reactSelectHeight = '33px';

export const reactSelectCustomStyles = (hasErrors = false) => {
  const styles: StylesConfig<any> = {
    control: (styles) => ({
      ...styles,
      minHeight: reactSelectHeight,
      height: reactSelectHeight,
      backgroundColor: colors.input_background,
      border: `1px solid ${hasErrors ? colors.error : colors.input_border}`,
      '&:hover': { border: `1px solid ${hasErrors ? colors.error : colors.primary}` }
    }),
    placeholder: (styles) => ({
      ...styles,
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: '14px'
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: colors.sweet_alert_background
    }),
    option: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: isFocused ? colors.primary : 'transparent'
    }),
    singleValue: (styles) => ({
      ...styles,
      color: 'white'
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: reactSelectHeight,
      padding: '0px 3px',
      fontSize: '14px'
    }),
    input: (provided) => ({
      ...provided,
      margin: '0px'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: reactSelectHeight
    })
  };
  return styles;
};

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
