import { ModelValidations } from './Generic';
import { Genre } from './Genre';
import { Image } from './Image';
import { Link } from './Link';

export interface Producer {
  id: string;
  name: string;
  nationality: string;
  description: string;
  created_at: string;
  updated_at: string;
  genres: Genre[];
  links: Link[];
  image?: Image;
}

export const producerValidations: Readonly<ModelValidations<Producer>> = {
  name: {
    required: {
      value: true,
      message: 'Debe ingresar el nombre de la productora'
    },
    maxLength: { value: 128, message: 'El nombre debe ser menor a 128 caracteres' }
  },
  nationality: {
    required: {
      value: true,
      message: 'Debe ingresar la nacionalidad de la productora'
    },
    maxLength: { value: 128, message: 'La nacionalidad debe ser menor a 128 caracteres' }
  },
  description: {
    required: {
      value: true,
      message: 'Debe ingresar la descripción de la productora'
    },
    maxLength: { value: 2048, message: 'La descripción debe ser menor a 2048 caracteres' }
  }
};
