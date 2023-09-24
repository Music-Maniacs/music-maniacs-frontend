import { ModelValidations } from './Generic';
import { Image } from './Image';
import { Link } from './Link';
import { Review } from './Review';
import { Version } from './Version';

export interface Event {
  id: string;
  name: string;
  datetime: string;
  description: string;
  artist: {
    id?: string;
    name: string;
  };
  venue: {
    id?: string;
    name: string;
  };
  producer: {
    id?: string;
    name: string;
  };
  links: Link[];
  image?: Image;
  versions: Version[];
  reviews_info?: {
    artist: {
      rating: number;
      reviews_count: number;
      last_reviews: Review[];
    };
    producer: {
      rating: number;
      reviews_count: number;
      last_reviews: Review[];
    };
    venue: {
      rating: number;
      reviews_count: number;
      last_reviews: Review[];
    };
  };
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
