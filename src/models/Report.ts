import { ModelValidations } from './Generic';

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

type ReportStatus = 'pending' | 'resolved' | 'ignored';

export const reportCategories = ['inappropriate_content', 'spam', 'other', 'fake', 'duplicated'] as const;
export type ReportCategory = (typeof reportCategories)[number];

export type ReportableType = 'Comment' | 'Venue' | 'Artist' | 'Producer' | 'Event' | 'Video' | 'Review';

export const reportCollectionByType: Readonly<Record<ReportableType, ReportCategory[]>> = {
  Comment: ['inappropriate_content', 'spam', 'other'],
  Venue: ['duplicated', 'fake', 'spam', 'other'],
  Artist: ['duplicated', 'fake', 'spam', 'other'],
  Producer: ['duplicated', 'fake', 'spam', 'other'],
  Event: ['duplicated', 'fake', 'spam', 'other'],
  Video: ['inappropriate_content', 'spam', 'other'],
  Review: ['inappropriate_content', 'spam', 'other']
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
    required: {
      value: true,
      message: 'Debe ingresar el comentario del reporte'
    },
    maxLength: { value: 2048, message: 'El comentario debe ser menor a 2048 caracteres' }
  },
  penalization_score: {
    required: {
      value: true,
      message: 'Debe ingresar el puntaje de penalización'
    }
  }
};
