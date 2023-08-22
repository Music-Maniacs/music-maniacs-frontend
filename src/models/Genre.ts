import { Dictionary, MMColors, ModelValidations } from './Generic';

export interface Genre {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export const stateColors: Record<string, MMColors> = {
  active: 'success',
  blocked: 'primary',
  deleted: 'error'
};

export const stateNames: Dictionary = {
  active: 'Activo',
  blocked: 'Bloqueado',
  deleted: 'Eliminado'
};

export const genreValidations: Readonly<ModelValidations<Genre>> = {
  name: {
    required: {
      value: true,
      message: 'Debe ingresar su nombre completo'
    },
    maxLength: { value: 128, message: 'El nombre debe ser menor a 128 caracteres' }
  }
};
