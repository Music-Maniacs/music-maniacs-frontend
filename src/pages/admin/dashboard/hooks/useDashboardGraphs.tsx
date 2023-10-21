import React from 'react';
import { useDashboard } from '../context/dashboardContext';

type Props = {
  [x: string]: number;
};

const getLabelsAndDatasets = (data: Props) => {
  const labels = Object.keys(data);
  const dataset = Object.values(data);

  return { labels, dataset };
};

export const useDashboardGraphs = () => {
  const { dashboardGraphs } = useDashboard();

  const graphs = [
    {
      title: 'Nuevos Usuarios',
      ...getLabelsAndDatasets(dashboardGraphs?.new_users || {})
    },
    {
      title: 'Respuestas',
      ...getLabelsAndDatasets(dashboardGraphs?.new_comments || {})
    },
    {
      title: 'Reseñas',
      ...getLabelsAndDatasets(dashboardGraphs?.reviews || {})
    },
    {
      title: 'Nuevos Eventos',
      ...getLabelsAndDatasets(dashboardGraphs?.new_profiles?.new_events || {})
    },
    {
      title: 'Nuevos Artistas',
      ...getLabelsAndDatasets(dashboardGraphs?.new_profiles?.new_artists || {})
    },
    {
      title: 'Nuevos Espacios de Eventos',
      ...getLabelsAndDatasets(dashboardGraphs?.new_profiles?.new_venues || {})
    }
  ];

  return { graphs };
};
