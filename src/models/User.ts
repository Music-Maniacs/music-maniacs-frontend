import { ModelValidations } from './Generic';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
}

export const userValidations: Readonly<ModelValidations<User>> = {
  name: {
    required: {
      value: true,
      message: 'Debe ingresar su nombre completo'
    }
  },
  username: {
    required: { value: true, message: 'Debe ingresar su nombre de usuario' },
    maxLength: { value: 10, message: 'El usuario debe ser menor a 10 caracteres' }
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
    minLength: { value: 8, message: 'La contraseña debe ser de más de 8 caracteres' }
  }
};
