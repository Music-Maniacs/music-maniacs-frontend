import React, { BaseSyntheticEvent } from 'react';
import { FieldErrors, RegisterOptions, UseFormGetFieldState, UseFormRegister } from 'react-hook-form';
import { InputText } from '../InputText/InputText';

interface Props {
  name: string;
  label?: string;
  type?: 'datetime-local' | 'date';
  options?: RegisterOptions;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  containerWidth?: string;
  getFieldState: UseFormGetFieldState<any>;
}

export const InputDate = ({ type = 'datetime-local', ...props }: Props) => {
  return (
    <InputText
      onClick={(e: BaseSyntheticEvent) => e.target.showPicker()}
      type={type}
      style={{ cursor: 'pointer' }}
      {...props}
    />
  );
};
