import { DashboardTableProps } from '../components/DashboardTable';
import { useDashboard } from '../context/dashboardContext';

export const useDashboardTables = () => {
  const { dashboardTables } = useDashboard();

  const metricsTable: DashboardTableProps = {
    headers: ['', 'Hoy', '7 días', '30 días'],
    rows: [
      [
        { content: 'Cantidad de videos subidos', cellProps: { style: { textAlign: 'start' } } },
        dashboardTables?.metrics?.videos?.today ?? 0,
        dashboardTables?.metrics?.videos?.days7 ?? 0,
        dashboardTables?.metrics?.videos?.days30 ?? 0
      ],
      [
        { content: 'Cantidad de likes', cellProps: { style: { textAlign: 'start' } } },
        dashboardTables?.metrics?.likes?.today ?? 0,
        dashboardTables?.metrics?.likes?.days7 ?? 0,
        dashboardTables?.metrics?.likes?.days30 ?? 0
      ],
      [
        { content: 'Cantidad de eventos creados', cellProps: { style: { textAlign: 'start' } } },
        dashboardTables?.metrics?.events?.today ?? 0,
        dashboardTables?.metrics?.events?.days7 ?? 0,
        dashboardTables?.metrics?.events?.days30 ?? 0
      ]
    ]
  };

  const userTypesTable: DashboardTableProps = {
    headers: dashboardTables?.user_type ? Object.keys(dashboardTables.user_type) : [],
    rows: dashboardTables?.user_type ? [Object.values(dashboardTables.user_type)] : []
  };

  return { metricsTable, userTypesTable };
};
