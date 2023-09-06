import { Artist } from './Artist';
import { ModelValidations } from './Generic';
import { Image } from './Image';
import { Link } from './Link';
import { Producer } from './Producer';
import { Venue } from './Venue';

export interface Event {
  id: string;
  name: string;
  datetime: string;
  description: string;
  artist: Artist;
  venue: Venue;
  producer: Producer;
  links: Link[];
  image?: Image;
}
export const eventValidations: Readonly<ModelValidations<Event>> = {
  name: {
    required: {
      value: true,
      message: 'Debe ingresar el nombre del evento'
    },
    maxLength: { value: 128, message: 'El nombre debe ser menor a 128 caracteres' }
  },
  description: {
    required: {
      value: true,
      message: 'Debe ingresar la descripción del evento'
    },
    maxLength: { value: 2048, message: 'La descripción debe ser menor a 2048 caracteres' }
  },
  datetime: {
    valueAsDate: true,
    required: {
      value: true,
      message: 'Debe ingresar la fecha del evento'
    }
  },
  artist: {
    required: {
      value: true,
      message: 'Debe ingresar el artista del evento'
    }
  },
  venue: {
    required: {
      value: true,
      message: 'Debe ingresar el lugar del evento'
    }
  },
  producer: {
    required: {
      value: true,
      message: 'Debe ingresar la productora del evento'
    }
  }
};
