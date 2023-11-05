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

  const defaultValue = getDefaultValue();

  function getDefaultValue() {
    const paramValue = queryParams.current[paramKey];

    if (!paramValue) {
      return null;
    }

    // @ts-ignore
    const option = options.find((option) => option.value === paramValue);

    return option;
  }

  return (
    <div style={{ width: containerWidth }}>
      <Select
        isClearable={true}
        defaultValue={defaultValue ?? null}
        options={options}
        styles={reactSelectCustomStyles()}
        placeholder={placeholder}
        onChange={onSelectChange}
      />
    </div>
  );
};
