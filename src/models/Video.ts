import { ModelValidations } from './Generic';

export interface Video {
  id: string;
  recorded_at: string;
  created_at: string;
  name: string;
  full_url: string;
  user: {
    id: string;
    username: string;
  };
}

export const videoValidations: Readonly<ModelValidations<Video>> = {
  recorded_at: {
    required: {
      value: true,
      message: 'Debe ingresar la fecha de grabación'
    }
  },
  name: {
    required: {
      value: true,
      message: 'Debe ingresar el título del video'
    },
    maxLength: { value: 128, message: 'El título debe ser menor a 128 caracteres' }
  }
};
