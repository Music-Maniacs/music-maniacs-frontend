import React, { BaseSyntheticEvent } from 'react';
import { Control, Controller, FieldErrors, RegisterOptions } from 'react-hook-form';
import { StyledError, StyledInputContainer, StyledLabel } from '../formStyles';
import { Rating } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';

interface Props {
  name: string;
  label?: string;
  options?: RegisterOptions;
  control: Control<any>;
  errors: FieldErrors<any>;
  containerWidth?: string;
  precision?: number;
}

export const InputRating = ({
  name,
  label,
  options,
  control,
  errors,
  containerWidth = '100%',
  precision = 0.5
}: Props) => {
  return (
    <StyledInputContainer $containerWidth={containerWidth}>
      {label && <StyledLabel>{label}</StyledLabel>}

      <Controller
        name={name}
        control={control}
        rules={options}
        render={({ field }) => {
          const { onChange } = field;
          return (
            <Rating {...field} onChange={(e: BaseSyntheticEvent) => onChange(+e.target.value)} precision={precision} />
          );
        }}
      />

      <ErrorMessage errors={errors} name={name} render={({ message }) => <StyledError>{message}</StyledError>} />
    </StyledInputContainer>
  );
};
