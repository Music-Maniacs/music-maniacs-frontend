import React, { MutableRefObject, createRef } from 'react';
import { InputText } from '../../form/InputText/InputText';

type Props = {
  label?: string;
  placeholder?: string;
  queryParams: MutableRefObject<Record<string, string>>;
  paramKey: string;
};

export const SearchInputText = ({ placeholder, label, queryParams, paramKey }: Props) => {
  const inputValue = createRef<HTMLInputElement>();

  const onInputChange = () => {
    queryParams.current[paramKey] = inputValue.current?.value ?? '';
  };

  return <InputText inputRef={inputValue} label={label} placeholder={placeholder} onChange={() => onInputChange()} />;
};
