import { ModelValidations } from './Generic';

export interface Comment {
  id: string;
  body: string;
  created_at: string;
  likes_count: number;
  liked_by_current_user: boolean;
  anonymous: boolean;
  user: {
    id: string;
    full_name: string;
    profile_image_full_url?: string;
  };
}

export const commentValidations: Readonly<ModelValidations<Comment>> = {
  body: {
    required: {
      value: true,
      message: 'Debe ingresar un cuerpo al comentario'
    },
    maxLength: { value: 2048, message: 'El comentario debe ser menor a 2048 caracteres' }
  }
};
