import React, { useEffect } from 'react';
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

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { showEvent, getShowEvent, setShowEvent } = useEvents();
  const { isModalOpen: isReportModalOpen, openModal: openReportModal, closeModal: closeReportModal } = useModal();

  useEffect(() => {
    if (!id) return navigate(-1);

    if (!showEvent || showEvent.id !== id) getShowEvent(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      <MMModal isModalOpen={isModalOpen} closeModal={closeModal} title="Editar Evento" maxWidth="lg">
        <EventsForm
          isFormEdit={true}
          eventToEdit={showEvent}
          closeFormModal={closeModal}
          useAdminController={false}
          successCallback={(event) => setShowEvent((prevEvent) => ({ ...prevEvent, ...event }))}
        />
      </MMModal>

      <MMContainer maxWidth="xxl" className="events-show-boxes-container ">
        {showEvent ? (
          <>
            <Breadcrumb items={[{ label: 'Eventos', to: '/events' }, { label: showEvent.name }]} />

            <EventInfoBox
              event={showEvent}
              openModal={openModal}
              setEvent={setShowEvent}
              openReportModal={openReportModal}
            />
            <EventAdvancedInfo event={showEvent} />
            <EventReviewBox event={showEvent} />
            <EventCommentBox event={showEvent} />

            <VersionBox versions={showEvent.versions} />
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
