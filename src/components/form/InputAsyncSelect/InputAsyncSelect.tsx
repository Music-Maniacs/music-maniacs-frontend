import React from 'react';
import { StyledError, StyledInputContainer, StyledLabel, reactSelectCustomStyles } from '../formStyles';
import { Control, Controller, FieldErrors, RegisterOptions, UseFormGetFieldState } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import { errorSnackbar } from '../../Snackbar/Snackbar';
import axios from 'axios';
import { ErrorMessage } from '@hookform/error-message';

interface Props {
  name: string;
  label?: string;
  options?: RegisterOptions;
  control: Control<any>;
  errors: FieldErrors<any>;
  getFieldState: UseFormGetFieldState<any>;
  containerWidth?: string;
  isClearable?: boolean;
  typeaheadUrl: string;
}

export const InputAsyncSelect = ({
  name,
  label,
  options,
  control,
  errors,
  containerWidth = '100%',
  isClearable = true,
  getFieldState,
  typeaheadUrl
}: Props) => {
  let hasErrors = getFieldState(name).invalid;

  const loadOptions = async (inputValue: string) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}${typeaheadUrl}${inputValue}`);

      return response.data;
    } catch (error) {
      errorSnackbar('Error al obtener los datos');
      return [];
    }
  };

  return (
    <StyledInputContainer $containerWidth={containerWidth}>
      {label && <StyledLabel>{label}</StyledLabel>}
      <Controller
        name={name}
        control={control}
        rules={options}
        render={({ field }) => {
          return (
            <AsyncSelect
              {...field}
              cacheOptions
              loadOptions={loadOptions}
              isClearable={isClearable}
              styles={reactSelectCustomStyles(hasErrors, false)}
              placeholder={''}
              menuPosition="fixed"
              noOptionsMessage={({ inputValue }) =>
                inputValue && inputValue.length > 0 ? 'No hay resultados' : 'Empieza a escribir para buscar'
              }
              loadingMessage={() => 'Cargando...'}
            />
          );
        }}
      />

      <ErrorMessage errors={errors} name={name} render={({ message }) => <StyledError>{message}</StyledError>} />
    </StyledInputContainer>
  );
};
