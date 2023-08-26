import React, { MutableRefObject } from 'react';
import Select, { GroupBase, OptionsOrGroups } from 'react-select';
import { reactSelectCustomStyles } from '../../form/formStyles';

type Props = {
  label?: string;
  placeholder?: string;
  queryParams: MutableRefObject<Record<string, string>>;
  paramKey: string;
  options: OptionsOrGroups<unknown, GroupBase<unknown>>;
  containerWidth?: string;
};

export const SearchInputSelect = ({ placeholder, queryParams, paramKey, options, containerWidth = 'auto' }: Props) => {
  const onSelectChange = (newValue: any) => {
    queryParams.current[paramKey] = newValue?.value ?? '';
  };

  return (
    <div style={{ width: containerWidth }}>
      <Select
        isClearable={true}
        options={options}
        styles={reactSelectCustomStyles()}
        placeholder={placeholder}
        onChange={onSelectChange}
      />
    </div>
  );
};
