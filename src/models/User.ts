import { Dictionary, MMColors, ModelValidations } from './Generic';
import { Image } from './Image';
import { Link } from './Link';
import { Role } from './Role';

export interface User {
  id: string;
  full_name: string;
  username: string;
  email: string;
  password?: string;
  role: Role;
  state: string;
  biography?: string;
  created_at: string;
  updated_at: string;
  links?: Link[];
  deleted_at?: string;
  blocked_until?: string;
  profile_image: Image;
  cover_image: Image;
  user_stat: {
    comments_count: number;
    days_visited: number;
    last_day_visited: string;
    last_session: string;
    likes_given: number;
    likes_received: number;
    penalty_score: number;
    viewed_events: number;
  };
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

export const userValidations: Readonly<ModelValidations<User>> = {
  full_name: {
    required: {
      value: true,
      message: 'Debe ingresar su nombre completo'
    },
    maxLength: { value: 128, message: 'El nombre debe ser menor a 128 caracteres' }
  },
  username: {
    required: { value: true, message: 'Debe ingresar su nombre de usuario' },
    maxLength: { value: 128, message: 'El usuario debe ser menor a 128 caracteres' }
  },
  email: {
    required: { value: true, message: 'Debe ingresar su correo electrónico' },
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Debe ingresar un correo valido de la forma nombre@mail.com'
    }
  },
  password: {
    required: { value: true, message: 'Debe ingresar su contraseña' },
    minLength: { value: 8, message: 'La contraseña debe ser de más de 8 o más caracteres' },
    pattern: {
      value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[^\s]+$/,
      message: 'La contraseña debe contener al menos un número y un caracter especial'
    }
  },
  role: {
    required: { value: true, message: 'Debe seleccionar un rol' }
  }
};
