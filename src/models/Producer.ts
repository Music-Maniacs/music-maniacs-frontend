import { EventProfilesTab } from './Event';
import { ModelValidations } from './Generic';
import { Genre } from './Genre';
import { Image } from './Image';
import { Link } from './Link';
import { Review } from './Review';
import { Version } from './Version';

export interface Producer {
  id: string;
  name: string;
  nationality: string;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  followed_by_current_user: boolean;
  genres: Genre[];
  links: Link[];
  image?: Image;
  history: Version[];
  last_reviews: Review[];
  rating: number;
  next_events: EventProfilesTab[];
  past_events: EventProfilesTab[];
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
    maxLength: { value: 2048, message: 'La descripción debe ser menor a 2048 caracteres' }
  }
};
