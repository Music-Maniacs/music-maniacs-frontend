import { ModelValidations } from './Generic';

export interface Role {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  permission_ids: string[];
}

export interface Permission {
  id: string;
  name: string;
  action: string;
  subject_class: string;
}

export type ControllerClassNames =
  | 'Admin::ArtistsController'
  | 'Admin::BackupsController'
  | 'Admin::EventsController'
  | 'Admin::GenresController'
  | 'Admin::MetricsController'
  | 'Admin::PenaltyThresholdsController'
  | 'Admin::ProducersController'
  | 'Admin::RolesController'
  | 'Admin::TrustLevelsController'
  | 'Admin::UsersController'
  | 'Admin::VenuesController'
  | 'ArtistsController'
  | 'CommentsController'
  | 'EventsController'
  | 'ProducersController'
  | 'ReportsController'
  | 'ReviewsController'
  | 'VenuesController'
  | 'VersionsController'
  | 'VideosController';

export const roleValidation: Readonly<ModelValidations<Role>> = {
  name: {
    required: { value: true, message: 'Debe ingresar el nombre de Rol' },
    maxLength: { value: 20, message: 'El nombre debe ser menor a 20 caracteres' }
  }
};
