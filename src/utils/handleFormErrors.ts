// @ts-nocheck
import axios, { AxiosError } from 'axios';
import { Dictionary, FormErrors } from '../models/Generic';
import { FieldValues, UseFormSetError } from 'react-hook-form';

const errors: Dictionary = {
  taken: 'está ocupado',
  too_short: 'es demasiado corta',
  confirmation: 'No coincide con la contraseña'
};

const fieldNames: Dictionary = {
  username: 'El usuario',
  email: 'El correo electrónico',
  password: 'La contraseña',
  password_confirmation: ''
};

function formatErrorMessage(error: string, field: string): string {
  const fieldName = fieldNames[field] || field;
  const message = errors[error] || error;
  return `${fieldName} ${message}`;
}
/*
 * This function is used to handle form errors from the API
 * @param error - The error object
 * @param setError - The setError function from react-hook-form
 * @returns boolean - If the error was handled or not
 */
export function handleFormErrors<T extends FieldValues>(
  error: any | AxiosError<FormErrors<T>>,
  setError: UseFormSetError<T>
): boolean {
  let hasErrors = false;

  if (axios.isAxiosError<FormErrors<T>>(error) && error.response?.data?.errors) {
    hasErrors = true;
    Object.keys(error.response.data.errors).forEach((key) => {
      setError(key, {
        type: 'custom',
        message: formatErrorMessage(error.response.data.errors[key][0].error, key)
      });
    });
  }

  return hasErrors;
}
