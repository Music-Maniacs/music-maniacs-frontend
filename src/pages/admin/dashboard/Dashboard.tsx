import React from 'react';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMTitle } from '../../../components/MMTitle/MMTitle';
import { MMButtonResponsive } from '../../../components/MMButton/MMButtonResponsive';
import { FaDownload } from 'react-icons/fa';
import { Searcher } from './searcher/Searcher';
import { Grid, GridProps } from '@mui/material';
import '../Admin.scss';
import './Dashboard.scss';
import { LineChart } from './components/LineChart';
import { DashboardTable, DashboardTableRow } from './components/DashboardTable';

export const Dashboard = () => {
  const gridProps: GridProps = {
    item: true,
    sm: 12,
    md: 6,
    lg: 4,
    height: '240px',
    maxWidth: '100%'
  };

  const graphs = [
    {
      title: 'Nuevos Usuarios',
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      dataset: [1, 9, 3, 20, 5, 6]
    },
    {
      title: 'Nuevos Eventos',
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      dataset: [1, 2, 3, 4, 5, 6]
    },
    {
      title: 'Visitas',
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      dataset: [1, 2, 3, 4, 5, 6]
    },
    {
      title: 'Respuestas',
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      dataset: [1, 2, 3, 4, 5, 6]
    },
    {
      title: 'Reseñas',
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      dataset: [1, 2, 3, 4, 5, 6]
    },
    {
      title: 'Reportes',
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      dataset: [1, 200, 3, 50, 500, 6]
    }
  ];

  const metrics = {
    videos: {
      today: 0,
      days7: 5,
      days30: 5
    },
    likes: {
      today: 0,
      days7: 8,
      days30: 8
    },
    events: {
      today: 0,
      days7: 16,
      days30: 16
    }
  };

  type Arr = {
    value: DashboardTableRow;
  };

  const metricsTable: Arr[] = [
    {
      value: [
        { content: 'Cantidad de videos subidos', cellProps: { style: { textAlign: 'start' } } },
        metrics.videos.today,
        metrics.videos.days7,
        metrics.videos.days30
      ]
    },
    {
      value: [
        { content: 'Cantidad de likes', cellProps: { style: { textAlign: 'start' } } },
        metrics.likes.today,
        metrics.likes.days7,
        metrics.likes.days30
      ]
    },
    {
      value: [
        { content: 'Cantidad de eventos', cellProps: { style: { textAlign: 'start' } } },
        metrics.events.today,
        metrics.events.days7,
        metrics.events.days30
      ]
    }
  ];

  const usersTypesTable = [
    {
      title: 'Admin',
      value: 1
    },
    {
      title: 'Usuario',
      value: 20
    },
    {
      title: 'Moderador',
      value: 4
    }
  ];

  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="admin-box-container">
        <div className="admin-title-container">
          <MMTitle content="Métricas y Reportes" />
          <MMButtonResponsive Icon={FaDownload}>Exportar Reporte</MMButtonResponsive>
        </div>

        <Searcher />

        <Grid container spacing={1}>
          {graphs.map((graph) => (
            <Grid key={graph.title} {...gridProps}>
              <LineChart title={graph.title} dataset={graph.dataset} labels={graph.labels} />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid item sm={12} md={6}>
            <h4>Métricas</h4>

            <DashboardTable headers={['', 'Hoy', '7 días', '30 días']} rows={metricsTable.map((item) => item.value)} />
          </Grid>
          <Grid item sm={12} md={6}>
            <h4>Tipos de Usuarios</h4>

            <DashboardTable
              headers={usersTypesTable.map((item) => item.title)}
              rows={[usersTypesTable.map((item) => item.value)]}
            />
          </Grid>
        </Grid>
      </MMBox>
    </MMContainer>
  );
};
