import React from 'react';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMTitle } from '../../../components/MMTitle/MMTitle';
import { MMButtonResponsive } from '../../../components/MMButton/MMButtonResponsive';
import { FaDownload } from 'react-icons/fa';
import { Searcher } from './searcher/Searcher';
import { Grid } from '@mui/material';
import { useDashboardGraphs } from './hooks/useDashboardGraphs';
import '../Admin.scss';

export const Dashboard = () => {
  const { graphs } = useDashboardGraphs();

  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="admin-box-container">
        <div className="admin-title-container">
          <MMTitle content="Métricas y Reportes" />
          <MMButtonResponsive Icon={FaDownload}>Exportar Reporte</MMButtonResponsive>
        </div>

        <Searcher />

        <Grid container spacing={1}>
          {graphs.map((graph, index) => (
            <Grid key={index} item sm={12} md={6} lg={4}>
              {graph.content}
            </Grid>
          ))}
        </Grid>
      </MMBox>
    </MMContainer>
  );
};
