import { ModelValidations } from './Generic';
import { Genre } from './Genre';
import { Link } from './Link';

export interface Artist {
  id: string;
  name: string;
  nationality: string;
  description: string;
  created_at: string;
  updated_at: string;
  links: Link[];
  genres: Genre[];
  image?: {
    url: string;
  };
}

export const artistValidations: Readonly<ModelValidations<Artist>> = {
  name: {
    required: {
      value: true,
      message: 'Debe ingresar el nombre del artista'
    },
    maxLength: { value: 128, message: 'El nombre debe ser menor a 128 caracteres' }
  },
  nationality: {
    required: {
      value: true,
      message: 'Debe ingresar la nacionalidad del artista'
    },
    maxLength: { value: 128, message: 'La nacionalidad debe ser menor a 128 caracteres' }
  },
  description: {
    required: {
      value: true,
      message: 'Debe ingresar la descripción del artista'
    },
    maxLength: { value: 2048, message: 'La descripción debe ser menor a 2048 caracteres' }
  }
};
