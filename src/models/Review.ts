import { ModelValidations } from './Generic';

export interface Review {
  id: string;
  rating: number;
  description: string;
  reviewable_type: string;
  created_at: string;
  anonymous: boolean;
  user: {
    id: string;
    full_name: string;
  };
}

export const reviewValidations: Readonly<ModelValidations<Review>> = {
  rating: {
    valueAsNumber: true,
    required: {
      value: true,
      message: 'Debe ingresar una calificación en la reseña'
    },
    min: { value: 0.5, message: 'La calificación debe ser mayor a 0' },
    max: { value: 5, message: 'La calificación debe ser menor a 6' }
  },
  description: {
    required: {
      value: true,
      message: 'Debe ingresar una descripción en la reseña'
    },
    maxLength: { value: 2048, message: 'La descripción debe ser menor a 2048 caracteres' }
  }
};
