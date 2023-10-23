import { Grid } from '@mui/material';
import React from 'react';
import { DashboardTable } from './DashboardTable';
import { useDashboardTables } from '../hooks/useDahboardTables';

export const DashboardTables = () => {
  const { metricsTable, userTypesTable } = useDashboardTables();

  return (
    <Grid container spacing={3}>
      <Grid item sm={12} md={6}>
        <h4>
          <h4>Estadísticas</h4>
        </h4>

        <DashboardTable headers={metricsTable.headers} rows={metricsTable.rows} />
      </Grid>
      <Grid item sm={12} md={6}>
        <h4>Tipos de Usuarios</h4>

        <DashboardTable headers={userTypesTable.headers} rows={userTypesTable.rows} />
      </Grid>
    </Grid>
  );
};
