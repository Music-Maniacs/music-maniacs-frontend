import React, { useEffect, useState } from 'react';
import { MMModal } from '../../../components/Modal/MMModal';
import { EventsForm } from '../../../components/forms/events/EventsForm';
import { useModal } from '../../../components/hooks/useModal';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { useNavigate, useParams } from 'react-router-dom';
import { EventInfoBox } from './components/EventInfoBox';
import { Loader } from '../../../components/Loader/Loader';
import { EventReviewBox } from './components/EventReviewBox';
import { Breadcrumb } from '../../../components/breadrumb/Breadcrumb';
import { Tooltip } from 'react-tooltip';
import { EventCommentBox } from './components/EventCommentBox';
import { useEvents } from '../context/eventsContext';
import { EventAdvancedInfo } from './components/EventAdvancedInfo';
import { VersionBox } from '../../../components/versions/VersionBox';
import { ReportForm } from '../../../components/forms/report/ReportForm';
import { reportEvent } from '../../../services/eventService';
import { Version } from '../../../models/Version';
import { reportVersions } from '../../../services/versionService';
import { warningSnackbar } from '../../../components/Snackbar/Snackbar';

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { showEvent, getShowEvent, setShowEvent, eventPolicies, versionsPolicies, commentsPolicies, reviewsPolicies } =
    useEvents();
  const { isModalOpen: isReportModalOpen, openModal: openReportModal, closeModal: closeReportModal } = useModal();
  const [versionsToReport, setVersionsToReport] = useState<Version>();
  const {
    isModalOpen: isVersionsReportModalOpen,
    openModal: openVersionsReportModal,
    closeModal: closeVersionsReportModal
  } = useModal();

  useEffect(() => {
    if (!id) return navigate(-1);

    if (!showEvent || showEvent.id !== id) getShowEvent(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReportVersion = (version: Version) => {
    if (versionsPolicies?.report) {
      setVersionsToReport(version);

      openVersionsReportModal();
    } else {
      warningSnackbar(
        'No tienes permisos para reportar versiones. Debes alcanzar un nivel de confianza más alto para desbloquear esta función.'
      );
    }
  };

  const handleEditEvent = () => {
    if (eventPolicies?.update) {
      openModal();
    } else {
      warningSnackbar(
        'No tienes permisos para editar eventos. Debes alcanzar un nivel de confianza más alto para desbloquear esta función.'
      );
    }
  };

  const handleReportEvent = () => {
    if (eventPolicies?.report) {
      openReportModal();
    } else {
      warningSnackbar(
        'No tienes permisos para reportar eventos. Debes alcanzar un nivel de confianza más alto para desbloquear esta función.'
      );
    }
  };

  return (
    <>
      <MMModal isModalOpen={isModalOpen} closeModal={closeModal} title="Editar Evento" maxWidth="lg">
        <EventsForm
          isFormEdit={true}
          eventToEdit={showEvent}
          closeFormModal={closeModal}
          useAdminController={false}
          successCallback={(event) => setShowEvent((prevEvent) => ({ ...prevEvent, ...event }))}
        />
      </MMModal>

      <MMModal closeModal={closeReportModal} isModalOpen={isReportModalOpen} maxWidth="sm">
        <ReportForm
          reportableId={showEvent?.id || ''}
          service={reportEvent}
          closeModal={closeReportModal}
          reportTitleText="el evento"
          reportableType="Event"
        />
      </MMModal>

      <MMModal closeModal={closeVersionsReportModal} isModalOpen={isVersionsReportModalOpen} maxWidth="sm">
        <ReportForm
          reportableId={versionsToReport?.id || ''}
          service={reportVersions}
          closeModal={closeVersionsReportModal}
          reportTitleText="la versión"
          reportableType="Version"
        />
      </MMModal>

      <MMContainer maxWidth="xxl" className="events-show-boxes-container ">
        {showEvent ? (
          <>
            <Breadcrumb
              items={[
                { label: 'Eventos', to: '/events', onClick: () => setShowEvent(undefined) },
                { label: showEvent.name }
              ]}
            />

            <EventInfoBox
              event={showEvent}
              handleEditEvent={handleEditEvent}
              setEvent={setShowEvent}
              handleReportEvent={handleReportEvent}
            />
            <EventAdvancedInfo event={showEvent} />
            <EventReviewBox event={showEvent} reviewsPolicies={reviewsPolicies} />
            <EventCommentBox event={showEvent} commentsPolicies={commentsPolicies} />

            <VersionBox versions={showEvent.versions} handleReportVersion={handleReportVersion} />
          </>
        ) : (
          <Loader />
        )}
      </MMContainer>

      <Tooltip id="tooltip" place="top" />
    </>
  );
};

export default Show;
