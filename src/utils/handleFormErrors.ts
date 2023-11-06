// @ts-nocheck
import axios, { AxiosError } from 'axios';
import { Dictionary, FormErrors } from '../models/Generic';
import { FieldValues, UseFormSetError } from 'react-hook-form';
import { errorSnackbar } from '../components/Snackbar/Snackbar';

const errors: Dictionary = {
  taken: 'está ocupado',
  too_short: 'es demasiado corta',
  confirmation: 'No coincide con la contraseña',
  not_a_number: 'no es un número',
  already_reviewed: 'Ya has realizado una reseña sobre esta opción',
  'restrict_dependent_destroy.has_many': 'No se puede eliminar porque tiene dependencias con',
  blank: 'no puede estar en blanco'
};

const fieldNames: Dictionary = {
  username: 'El usuario',
  email: 'El correo electrónico',
  password: 'La contraseña',
  password_confirmation: '',
  name: 'El nombre',
  penalty_score: 'La cantidad de penalizaciones',
  days_blocked: 'Los dias bloqueados',
  events: 'eventos',
  description: 'La descripción',
  users: 'usuarios',
  'genreable associations': 'perfiles'
};

function formatErrorMessage(error: string, field: string): string {
  const fieldName = fieldNames[field] || '';
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
      if (key === 'base') {
        return errorSnackbar(formatErrorMessage(error.response.data.errors[key][0].error));
      }

      setError(key, {
        type: 'custom',
        message: formatErrorMessage(error.response.data.errors[key][0].error, key)
      });
    });
  }

  return hasErrors;
}

function formatApiErrorMessage(error: string, field: string): string {
  const fieldName = fieldNames[field] || '';
  const message = errors[error] || error;
  return `${message} ${fieldName}`;
}

export function handleApiErrors<T extends FieldValues>(error: any | AxiosError<FormErrors<T>>): boolean {
  let hasErrors = false;

  if (axios.isAxiosError<FormErrors<T>>(error) && error.response?.data?.errors) {
    hasErrors = true;
    Object.keys(error.response.data.errors).forEach((key) => {
      if (key === 'base') {
        return errorSnackbar(
          formatApiErrorMessage(error.response.data.errors[key][0].error, error.response.data.errors[key][0].record)
        );
      }
    });
  }

  return hasErrors;
}
