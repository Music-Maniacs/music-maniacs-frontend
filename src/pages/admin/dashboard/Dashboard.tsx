import React from 'react';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMTitle } from '../../../components/MMTitle/MMTitle';
import { MMButtonResponsive } from '../../../components/MMButton/MMButtonResponsive';
import { FaDownload } from 'react-icons/fa';
import { Searcher } from './searcher/Searcher';
import '../Admin.scss';
import './Dashboard.scss';
import { DashboardGraphs } from './components/DashboardGraphs';
import { DashboardTables } from './components/DashboardTables';
import { useDashboard } from './context/dashboardContext';
import { DashboardGraphsSkeleton } from './components/DashboardGraphsSkeleton';
import { DashboardTablesSkeleton } from './components/DashboardTablesSkeleton';
import { StyledFlex } from '../../../styles/styledComponents';

export const Dashboard = () => {
  const { isGraphRequestLoading, isTableRequestLoading } = useDashboard();

  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="dashboard-box-container">
        <StyledFlex $justifyContent="space-between">
          <MMTitle content="Métricas y Reportes" />
          <MMButtonResponsive Icon={FaDownload}>Exportar Reporte</MMButtonResponsive>
        </StyledFlex>

        <Searcher />

        {isGraphRequestLoading ? <DashboardGraphsSkeleton /> : <DashboardGraphs />}

        {isTableRequestLoading ? <DashboardTablesSkeleton /> : <DashboardTables />}
      </MMBox>
    </MMContainer>
  );
};
