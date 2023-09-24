import { ModelValidations } from './Generic';
import { Image } from './Image';
import { Link } from './Link';
import { Location } from './Location';
import { Version } from './Version';

export interface Venue {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  address?: string;
  links: Link[];
  location?: Location;
  image?: Image;
  versions: Version[];
}

export const venueValidations: Readonly<ModelValidations<Venue>> = {
  name: {
    required: {
      value: true,
      message: 'Debe ingresar el nombre del espacio de eventos'
    },
    maxLength: { value: 128, message: 'El nombre debe ser menor a 128 caracteres' }
  },
  description: {
    required: {
      value: true,
      message: 'Debe ingresar la descripción del espacio de eventos'
    },
    maxLength: { value: 2048, message: 'La descripción debe ser menor a 2048 caracteres' }
  }
};
