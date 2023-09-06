import React, { BaseSyntheticEvent, MutableRefObject } from 'react';
import { InputText } from '../../form/InputText/InputText';

type Props = {
  placeholder?: string;
  queryParams: MutableRefObject<Record<string, string>>;
  paramKey: string;
  type?: 'datetime-local' | 'date';
  label?: string;
};

export const SearchInputDate = ({ placeholder, queryParams, paramKey, type = 'date', label }: Props) => {
  const onInputChange = (e: BaseSyntheticEvent) => {
    queryParams.current[paramKey] = e.target.value;
  };

  return (
    <InputText
      type={'text'}
      label={label}
      style={{ cursor: 'pointer' }}
      placeholder={placeholder}
      onClick={(e: BaseSyntheticEvent) => {
        e.target.type = type;
        e.target.showPicker();
      }}
      onBlur={(e: BaseSyntheticEvent) => {
        if (e.target.value === '') e.target.type = 'text';
      }}
      onChange={(e: BaseSyntheticEvent) => onInputChange(e)}
    />
  );
};
