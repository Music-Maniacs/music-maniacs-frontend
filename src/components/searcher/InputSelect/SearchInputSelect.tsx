import React, { MutableRefObject } from 'react';
import Select, { GroupBase, OptionsOrGroups } from 'react-select';
import { reactSelectCustomStyles } from '../../form/formStyles';
import { SelectCollection } from '../../../models/Generic';

type Props = {
  label?: string;
  placeholder?: string;
  queryParams: MutableRefObject<Record<string, string | SelectCollection>>;
  paramKey: string;
  options: OptionsOrGroups<unknown, GroupBase<unknown>>;
  containerWidth?: string;
};

export const SearchInputSelect = ({ placeholder, queryParams, paramKey, options, containerWidth = 'auto' }: Props) => {
  const onSelectChange = (newValue: SelectCollection | null) => {
    queryParams.current[paramKey] = newValue ?? '';
  };

  return (
    <div style={{ width: containerWidth }}>
      <Select
        isClearable={true}
        defaultValue={queryParams.current[paramKey]}
        options={options}
        styles={reactSelectCustomStyles()}
        placeholder={placeholder}
        onChange={onSelectChange}
      />
    </div>
  );
};
