import { ModelValidations } from './Generic';
import { Role } from './Role';

export interface TrustLevel extends Role {
  created_at: string;
  updated_at: string;
  order: number;
  days_visited: number;
  viewed_events: number;
  likes_received: number;
  likes_given: number;
  comments_count: number;
}

export const trustLevelValidation: Readonly<ModelValidations<TrustLevel>> = {
  name: {
    required: { value: true, message: 'Debe ingresar el nombre de nivel de confianza' },
    maxLength: { value: 20, message: 'El nombre debe ser menor a 20 caracteres' }
  },
  days_visited: {
    required: { value: true, message: 'Debe ingresar un valor de dias visitados' },
    min: { value: 0, message: 'El valor ingresado debe ser mayor o igual a cero' }
  },
  viewed_events: {
    required: { value: true, message: 'Debe ingresar un valor de eventos consultados' },
    min: { value: 0, message: 'El valor ingresado debe ser mayor o igual a cero' }
  },
  likes_received: {
    required: { value: true, message: 'Debe ingresar un valor de me gusta recibidos' },
    min: { value: 0, message: 'El valor ingresado debe ser mayor o igual a cero' }
  },
  likes_given: {
    required: { value: true, message: 'Debe ingresar un valor de me gusta otorgados' },
    min: { value: 0, message: 'El valor ingresado debe ser mayor o igual a cero' }
  },
  comments_count: {
    required: { value: true, message: 'Debe ingresar un valor de comentarios realizados' },
    min: { value: 0, message: 'El valor ingresado debe ser mayor o igual a cero' }
  },
  order: {
    required: { value: true, message: 'Debe ingresar un orden para el nivel de confianza' },
    min: { value: 1, message: 'El valor ingresado debe ser mayor a cero' }
  }
};
