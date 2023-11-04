import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useReports } from '../context/moderationContext';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { Loader } from '../../../components/Loader/Loader';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMSubTitle, MMTitle } from '../../../components/MMTitle/MMTitle';
import { StyledFlex } from '../../../styles/styledComponents';
import { MMButton } from '../../../components/MMButton/MMButton';
import '../Moderation.scss';
import { MMModal } from '../../../components/Modal/MMModal';
import { ResolveReportForm } from '../../../components/forms/report/ResolveReportForm';
import { useModal } from '../../../components/hooks/useModal';
import { MMChip } from '../../../components/MMChip/MMChip';
import { Report, ReportStatus, statusColors, statusNames } from '../../../models/Report';
import { MMColors } from '../../../models/Generic';
import { ShowInfo } from './ShowInfo';
import { ReportableContent } from './ReportableContent';
import { ReportableSuggestion } from './ReportableSuggestion';

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showReport, getShowReport, setShowReport, reports, setReports } = useReports();
  const { isModalOpen: isReportModalOpen, openModal: openReportModal, closeModal: closeReportModal } = useModal();

  useEffect(() => {
    if (!id) return navigate(-1);

    if (!showReport || showReport.id !== id) getShowReport(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getStatusColor(status: ReportStatus): MMColors {
    return statusColors[status];
  }

  function getStatusName(status: ReportStatus): string {
    return statusNames[status];
  }

  const handleResolveReportFormCallback = (report: Report) => {
    showReport && setShowReport({ ...showReport, ...report });

    // Actualizarlo en el index
    const index = reports ? reports.findIndex((r) => r.id === report.id) : -1;

    if (index && index !== -1 && reports) {
      const newReports = [...reports];
      newReports[index] = report;
      setReports(newReports);
    }
  };

  return (
    <>
      <MMModal closeModal={closeReportModal} isModalOpen={isReportModalOpen} maxWidth="sm">
        <ResolveReportForm
          reportId={showReport?.id || ''}
          closeModal={closeReportModal}
          successCallback={handleResolveReportFormCallback}
        />
      </MMModal>

      <MMContainer maxWidth="xxl">
        <MMBox className="moderation-box-container">
          {showReport ? (
            <>
              <div className="moderation-show--title-container">
                <StyledFlex $gap="10px" $width="100%" $alignItems="center">
                  <MMTitle content="Reporte" />
                  <MMChip color={getStatusColor(showReport.status)}>{getStatusName(showReport.status)}</MMChip>
                </StyledFlex>

                <StyledFlex $justifyContent="flex-end" $width="100%">
                  {showReport.status === 'pending' && (
                    <MMButton color="tertiary" onClick={() => openReportModal()}>
                      Resolver
                    </MMButton>
                  )}

                  <MMButton
                    onClick={() => {
                      setShowReport(undefined);
                      navigate(-1);
                    }}
                  >
                    Volver
                  </MMButton>
                </StyledFlex>
              </div>

              <ShowInfo report={showReport} />

              <MMSubTitle content="Contenido Reportado" />

              <ReportableContent report={showReport} />

              {showReport.suggestion && <ReportableSuggestion report={showReport} />}
            </>
          ) : (
            <Loader />
          )}
        </MMBox>
      </MMContainer>
    </>
  );
};

export default Show;
