import React, { MutableRefObject, createRef } from 'react';
import { InputText } from '../../form/InputText/InputText';
import { SelectCollection } from '../../../models/Generic';

type Props = {
  label?: string;
  placeholder?: string;
  queryParams: MutableRefObject<Record<string, string | SelectCollection>>;
  paramKey: string;
};

export const SearchInputText = ({ placeholder, label, queryParams, paramKey }: Props) => {
  const inputValue = createRef<HTMLInputElement>();

  const onInputChange = () => {
    queryParams.current[paramKey] = inputValue.current?.value ?? '';
  };

  return (
    <InputText
      inputRef={inputValue}
      // @ts-ignore
      defaultValue={queryParams.current[paramKey] ?? ''}
      label={label}
      placeholder={placeholder}
      onChange={() => onInputChange()}
    />
  );
};
