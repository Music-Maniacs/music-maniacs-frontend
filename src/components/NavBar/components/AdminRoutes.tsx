import React from 'react';
import MMLink from '../../MMLink/MMLink';
import { useAuth } from '../../../context/authContext';

export const AdminRoutes = () => {
  const { navigationPolicies } = useAuth();

  return (
    <>
      {navigationPolicies.includes('Admin::MetricsController') && (
        <MMLink to={'/admin/dashboard'} content="Métricas y Reportes" />
      )}

      {navigationPolicies.includes('Admin::UsersController') && <MMLink to={'/admin/users'} content="Usuarios" />}

      {navigationPolicies.includes('Admin::EventsController') && <MMLink to={'/admin/events'} content="Eventos" />}

      {navigationPolicies.includes('Admin::ArtistsController') && <MMLink to={'/admin/artists'} content="Artistas" />}

      {navigationPolicies.includes('Admin::ProducersController') && (
        <MMLink to={'/admin/producers'} content="Productoras" />
      )}

      {navigationPolicies.includes('Admin::VenuesController') && (
        <MMLink to={'/admin/venues'} content="Espacios de eventos" />
      )}

      {navigationPolicies.includes('Admin::GenresController') && (
        <MMLink to={'/admin/genres'} content="Generos Musicales" />
      )}

      {navigationPolicies.includes('Admin::RolesController') && <MMLink to={'/admin/roles'} content="Roles" />}

      {navigationPolicies.includes('Admin::TrustLevelsController') && (
        <MMLink to={'/admin/trust_levels'} content="Niveles de Confianza" />
      )}

      {navigationPolicies.includes('Admin::PenaltyThresholdsController') && (
        <MMLink to={'/admin/thresholds'} content="Umbrales Penalizacion" />
      )}

      {navigationPolicies.includes('Admin::BackupsController') && (
        <MMLink to={'/admin/backups'} content="Copias de Seguridad" />
      )}
    </>
  );
};
