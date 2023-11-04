import { MMColors, ModelValidations, SelectCollection } from './Generic';

export type Report = {
  id: string;
  moderator_comment: string;
  user_comment: string;
  penalization_score: number;
  status: ReportStatus;
  category: ReportCategory;
  reporter: {
    id: string;
    full_name: string;
  };
  resolver?: {
    id: string;
    full_name: string;
  };
  author?: {
    id: string;
    full_name: string;
  };
  reportable_id: string;
  reportable_type: ReportableType;
  original_reportable_id: string;
  created_at: string;
  updated_at: string;
  reportable: any;
  suggestion?: any;
};

export const statusColors: Record<ReportStatus, MMColors> = {
  resolved: 'success',
  pending: 'tertiary',
  ignored: 'error'
};

export const statusNames: Record<ReportStatus, string> = {
  pending: 'Pendiente',
  resolved: 'Resuelto',
  ignored: 'Ignorado'
};

export type ReportStatus = 'pending' | 'resolved' | 'ignored';

export const reportCategories = [
  'inappropriate_content',
  'spam',
  'other',
  'fake',
  'duplicated',
  'does_not_belong_to_event',
  'incorrect_artist',
  'incorrect_producer',
  'incorrect_venue'
] as const;

export const reportCategoriesTranslated = {
  inappropriate_content: 'Contenido inapropiado',
  spam: 'Spam',
  other: 'Otro',
  fake: 'Falso',
  duplicated: 'Duplicado',
  does_not_belong_to_event: 'No pertenece al evento',
  incorrect_artist: 'Artista incorrecto',
  incorrect_producer: 'Productor incorrecto',
  incorrect_venue: 'Espacio de Evento incorrecto'
};

export type ReportCategory = (typeof reportCategories)[number];

export type ReportableType = 'Comment' | 'Venue' | 'Artist' | 'Producer' | 'Event' | 'Video' | 'Review' | 'Version';

export const reportableTypeTranslated = {
  Comment: 'Comentario',
  Venue: 'Espacio de Evento',
  Artist: 'Artista',
  Producer: 'Productora',
  Event: 'Evento',
  Video: 'Video',
  Review: 'Reseña',
  Version: 'Versión'
};

export const reportCollectionByType: Readonly<Record<ReportableType, ReportCategory[]>> = {
  Comment: ['inappropriate_content', 'spam', 'other'],

  Venue: ['duplicated', 'fake', 'spam', 'other'],

  Artist: ['duplicated', 'fake', 'spam', 'other'],

  Producer: ['duplicated', 'fake', 'spam', 'other'],

  Event: ['incorrect_artist', 'incorrect_producer', 'incorrect_venue', 'duplicated', 'fake', 'spam', 'other'],

  Video: ['inappropriate_content', 'spam', 'does_not_belong_to_event', 'other'],

  Review: ['inappropriate_content', 'spam', 'other'],

  Version: ['inappropriate_content', 'fake', 'spam', 'other']
};

export const reportCategoriesCollection: SelectCollection[] = [
  {
    label: reportCategoriesTranslated.inappropriate_content,
    value: '0'
  },
  {
    label: reportCategoriesTranslated.spam,
    value: '1'
  },
  {
    label: reportCategoriesTranslated.other,
    value: '2'
  },
  {
    label: reportCategoriesTranslated.fake,
    value: '3'
  },
  {
    label: reportCategoriesTranslated.duplicated,
    value: '4'
  },
  {
    label: reportCategoriesTranslated.incorrect_artist,
    value: '5'
  },
  {
    label: reportCategoriesTranslated.incorrect_venue,
    value: '6'
  },
  {
    label: reportCategoriesTranslated.incorrect_producer,
    value: '7'
  },
  {
    label: reportCategoriesTranslated.does_not_belong_to_event,
    value: '8'
  }
];

export const reportValidations: Readonly<ModelValidations<Report>> = {
  category: {
    required: {
      value: true,
      message: 'Debe seleccionar una categoría'
    }
  },
  user_comment: {
    maxLength: { value: 2048, message: 'El comentario debe ser menor a 2048 caracteres' }
  },
  moderator_comment: {
    maxLength: { value: 2048, message: 'El comentario debe ser menor a 2048 caracteres' }
  }
};
