import { EventProfilesTab } from './Event';
import { ModelValidations } from './Generic';
import { Image } from './Image';
import { Link } from './Link';
import { Location } from './Location';
import { Review } from './Review';
import { Version } from './Version';

export interface Venue {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  followed_by_current_user: boolean;
  address?: string;
  links: Link[];
  location?: Location;
  image?: Image;
  history: Version[];
  last_reviews: Review[];
  rating: number;
  next_events: EventProfilesTab[];
  past_events: EventProfilesTab[];
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
    maxLength: { value: 2048, message: 'La descripción debe ser menor a 2048 caracteres' }
  }
};
