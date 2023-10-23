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
import { useModal } from '../../../components/hooks/useModal';
import { MMModal } from '../../../components/Modal/MMModal';
import { PDFViewer } from '@react-pdf/renderer';
import { ReportPDF } from './pdf/ReportPDF';
import { warningSnackbar } from '../../../components/Snackbar/Snackbar';
import { useDashboardTables } from './hooks/useDahboardTables';

export const Dashboard = () => {
  const { isGraphRequestLoading, isTableRequestLoading, lastSearchParams } = useDashboard();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { metricsTable, userTypesTable } = useDashboardTables();

  return (
    <MMContainer maxWidth="xxl">
      <MMModal closeModal={closeModal} isModalOpen={isModalOpen} maxWidth="xl">
        <div style={{ width: '100%', height: '95vh' }}>
          <PDFViewer width={'100%'} height={'100%'}>
            <ReportPDF
              startDate={lastSearchParams?.current?.startDate ?? ''}
              endDate={lastSearchParams?.current?.endDate ?? ''}
              metricsTable={metricsTable}
              userTypesTable={userTypesTable}
            />
          </PDFViewer>
        </div>
      </MMModal>

      <MMBox className="dashboard-box-container">
        <StyledFlex $justifyContent="space-between">
          <MMTitle content="Métricas y Reportes" />
          <MMButtonResponsive
            Icon={FaDownload}
            onClick={() => {
              if (isGraphRequestLoading || isTableRequestLoading) {
                warningSnackbar('Los datos aún se están cargando. Por favor espere.');
              } else {
                openModal();
              }
            }}
          >
            Exportar Reporte
          </MMButtonResponsive>
        </StyledFlex>

        <Searcher />

        {isGraphRequestLoading ? <DashboardGraphsSkeleton /> : <DashboardGraphs />}

        {isTableRequestLoading ? <DashboardTablesSkeleton /> : <DashboardTables />}
      </MMBox>
    </MMContainer>
  );
};