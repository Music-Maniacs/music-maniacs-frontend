import { useDashboard } from '../context/dashboardContext';
import {
  COMMENTS_CHART_ID,
  NEW_ARTISTS_CHART_ID,
  NEW_EVENTS_CHART_ID,
  NEW_VENUES_CHART_ID,
  REVIEWS_CHART_ID,
  USER_CHART_ID
} from '../context/types';

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
      id: USER_CHART_ID,
      ...getLabelsAndDatasets(dashboardGraphs?.new_users || {})
    },
    {
      title: 'Respuestas',
      id: COMMENTS_CHART_ID,
      ...getLabelsAndDatasets(dashboardGraphs?.new_comments || {})
    },
    {
      title: 'Reseñas',
      id: REVIEWS_CHART_ID,
      ...getLabelsAndDatasets(dashboardGraphs?.reviews || {})
    },
    {
      title: 'Nuevos Eventos',
      id: NEW_EVENTS_CHART_ID,
      ...getLabelsAndDatasets(dashboardGraphs?.new_profiles?.new_events || {})
    },
    {
      title: 'Nuevos Artistas',
      id: NEW_ARTISTS_CHART_ID,
      ...getLabelsAndDatasets(dashboardGraphs?.new_profiles?.new_artists || {})
    },
    {
      title: 'Nuevos Espacios de Eventos',
      id: NEW_VENUES_CHART_ID,
      ...getLabelsAndDatasets(dashboardGraphs?.new_profiles?.new_venues || {})
    }
  ];

  return { graphs };
};
