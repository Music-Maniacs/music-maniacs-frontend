import { ModelValidations } from './Generic';

export interface User {
  id: string;
  full_name: string;
  username: string;
  email: string;
  password: string;
  rol: string;
  state: string;
}

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
    minLength: { value: 6, message: 'La contraseña debe ser de más de 6 caracteres' }
  }
};
