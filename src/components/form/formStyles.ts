import { styled } from 'styled-components';
import colors from '../../styles/_colors.scss';
import { StylesConfig } from 'react-select';

const reactSelectHeight = '32px';

export const reactSelectCustomStyles = (hasErrors = false, isMultiSelect = false) => {
  const customHeight = { ...(!isMultiSelect ? { height: reactSelectHeight } : {}) };

  const styles: StylesConfig<any> = {
    control: (styles) => ({
      ...styles,
      minHeight: reactSelectHeight,
      ...customHeight,
      backgroundColor: colors.input_background,
      boxShadow: 'none',
      border: `1px solid ${hasErrors ? colors.error : colors.input_border}`,
      borderRadius: '3px',
      '&:hover': { border: `1px solid ${hasErrors ? colors.error : colors.primary}` }
    }),
    placeholder: (styles) => ({
      ...styles,
      color: 'rgba(var(--text_color), 0.5)',
      fontSize: '14px'
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: colors.dropdown_background
    }),
    option: (styles, { isFocused }) => ({
      ...styles,
      color: isFocused ? 'white' : `var(--text_color)`,
      backgroundColor: isFocused ? 'var(--primary)' : 'transparent'
    }),
    singleValue: (styles) => ({
      ...styles,
      color: `var(--text_color)`
    }),
    valueContainer: (provided) => ({
      ...provided,
      ...customHeight,
      padding: '0px 3px',
      fontSize: '14px'
    }),
    input: (provided) => ({
      ...provided,
      color: `var(--text_color)`,
      margin: '0px'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      ...customHeight
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: colors.primary,
      border: `1px solid ${colors.sweet_alert_background}`,
      color: 'white'
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: `white`
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      '&:hover': { backgroundColor: colors.primary_dark, color: `white`, cursor: 'pointer' }
    })
  };
  return styles;
};

export const StyledLabel = styled.label`
  color: var(--text_color);
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
  color: var(--text_color);
  color-scheme: dark;

  /* prettier-ignore */
  &[type=number]::-webkit-inner-spin-button,
  &[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  /* prettier-ignore */
  &[type=number] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
  }

  &::placeholder {
    color: rgba(var(--text_color), 0.5);
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
  gap: 4px;
  width: ${({ $containerWidth }) => $containerWidth ?? '100%'};
`;

export const StyledDropzoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-end;
`;

export const StyledDropzoneBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 30px 10px;
  background-color: var(--input_background);
  color: var(--text_color);
  font-weight: 400;
  border-radius: 3px;
  box-sizing: border-box;
  cursor: pointer;
`;

export const StyledDropzoneImagePreviewContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledDropzoneImagePreview = styled.img<{ $type?: 'cover' | 'profile'; $width?: string }>`
  width: ${({ $width }) => ($width ? $width : '100%')};
  height: ${({ $width, $type }) => {
    if ($width) {
      if (!$type) return $width;
      if ($type === 'cover') {
        const [value, unit] = $width.split(/(?=\D)(?<=\d)/);
        return +value / 7 + unit;
      } else {
        return $width;
      }
    }
    return '100%';
  }};
  object-fit: fill;
  border-radius: ${({ $type }) => {
    if ($type) {
      if ($type === 'profile') {
        return '50%';
      } else {
        return '0';
      }
    }
    return '0';
  }};
`;
