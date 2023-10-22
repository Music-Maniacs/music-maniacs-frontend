import { MMColors, ModelValidations } from './Generic';

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
  reportable_id: string;
  reportable_type: ReportableType;
  original_reportable_id: string;
  created_at: string;
  updated_at: string;
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
  'doesnt_belong_to_event',
  'incorrect_artist',
  'incorrect_producer',
  'incorrect_venue'
] as const;

export type ReportCategory = (typeof reportCategories)[number];

export type ReportableType = 'Comment' | 'Venue' | 'Artist' | 'Producer' | 'Event' | 'Video' | 'Review' | 'Version';

export const reportCollectionByType: Readonly<Record<ReportableType, ReportCategory[]>> = {
  Comment: ['inappropriate_content', 'spam', 'other'],

  Venue: ['duplicated', 'fake', 'spam', 'other'],

  Artist: ['duplicated', 'fake', 'spam', 'other'],

  Producer: ['duplicated', 'fake', 'spam', 'other'],

  Event: ['incorrect_artist', 'incorrect_producer', 'incorrect_venue', 'duplicated', 'fake', 'spam', 'other'],

  Video: ['inappropriate_content', 'spam', 'doesnt_belong_to_event', 'other'],

  Review: ['inappropriate_content', 'spam', 'other'],

  Version: []
};

export const reportValidations: Readonly<ModelValidations<Report>> = {
  category: {
    required: {
      value: true,
      message: 'Debe seleccionar una categoría'
    }
  },
  user_comment: {
    required: {
      value: true,
      message: 'Debe ingresar el comentario del reporte'
    },
    maxLength: { value: 2048, message: 'El comentario debe ser menor a 2048 caracteres' }
  },
  moderator_comment: {
    maxLength: { value: 2048, message: 'El comentario debe ser menor a 2048 caracteres' }
  }
};
