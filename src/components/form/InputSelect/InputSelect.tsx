import React from 'react';
import { Control, Controller, FieldErrors, RegisterOptions } from 'react-hook-form';
import { SelectCollection } from '../../../models/Generic';
import { StyledError, StyledInputContainer, StyledLabel, reactSelectCustomStyles } from '../formStyles';
import Select from 'react-select';

interface Props {
  name: string;
  label?: string;
  options?: RegisterOptions;
  control: Control<any>;
  errors: FieldErrors<any>;
  containerWidth?: string;
  collection: SelectCollection[];
  isClearable?: boolean;
  isMultiSelect?: boolean;
}

export const InputSelect = ({
  name,
  label,
  options,
  control,
  errors,
  containerWidth = '100%',
  collection,
  isClearable = true,
  isMultiSelect = false
}: Props) => {
  const hasErrors = !!errors?.[`${name}`];

  return (
    <StyledInputContainer $containerWidth={containerWidth}>
      {label && <StyledLabel>{label}</StyledLabel>}

      <Controller
        name={name}
        control={control}
        rules={options}
        render={({ field }) => {
          return (
            <Select
              {...field}
              options={collection}
              isClearable={isClearable}
              styles={reactSelectCustomStyles(hasErrors)}
              placeholder={''}
              isMulti={isMultiSelect}
              menuPosition="fixed"
            />
          );
        }}
      />

      {hasErrors && <StyledError>{errors[`${name}`]?.message?.toString()}</StyledError>}
    </StyledInputContainer>
  );
};
