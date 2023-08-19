import React, { MutableRefObject } from 'react';
import Select, { GroupBase, OptionsOrGroups, StylesConfig } from 'react-select';
import colors from '../../../styles/_colors.scss';

type Props = {
  label?: string;
  placeholder?: string;
  queryParams: MutableRefObject<Record<string, string>>;
  paramKey: string;
  options: OptionsOrGroups<unknown, GroupBase<unknown>>;
  containerWidth?: string;
};

export const SearchInputSelect = ({ placeholder, queryParams, paramKey, options, containerWidth = '200px' }: Props) => {
  const height = '33px';

  const onSelectChange = (newValue: any) => {
    queryParams.current[paramKey] = newValue?.value ?? '';
  };

  const customStyles: StylesConfig<any> = {
    control: (styles) => ({
      ...styles,
      minHeight: height,
      height: height,
      backgroundColor: colors.input_background,
      border: `1px solid ${colors.input_border}`,
      '&:hover': { border: `1px solid ${colors.primary}` }
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
      height: height,
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
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: height
    })
  };

  return (
    <div style={{ width: containerWidth }}>
      <Select
        isClearable={true}
        options={options}
        styles={customStyles}
        placeholder={placeholder}
        onChange={onSelectChange}
      />
    </div>
  );
};
