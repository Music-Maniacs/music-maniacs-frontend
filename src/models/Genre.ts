import { ModelValidations } from './Generic';

export interface Genre {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export const genreValidations: Readonly<ModelValidations<Genre>> = {
  name: {
    required: {
      value: true,
      message: 'Debe ingresar su nombre completo'
    },
    maxLength: { value: 128, message: 'El nombre debe ser menor a 128 caracteres' }
  }
};
