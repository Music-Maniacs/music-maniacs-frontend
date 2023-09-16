import React, { useEffect, useState } from 'react';
import { MMModal } from '../../../components/Modal/MMModal';
import { EventsForm } from '../../../components/forms/events/EventsForm';
import { Event } from '../../../models/Event';
import { useModal } from '../../../components/hooks/useModal';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { useNavigate, useParams } from 'react-router-dom';
import { getEvent as serviceGetEvent } from '../../../services/eventService';
import { errorSnackbar } from '../../../components/Snackbar/Snackbar';
import { EventInfoBox } from './components/EventInfoBox';
import { Loader } from '../../../components/Loader/Loader';
import { EventReviewBox } from './components/EventReviewBox';
import { Breadcrumb } from '../../../components/breadrumb/Breadcrumb';
import { Tooltip } from 'react-tooltip';
import { EventCommentBox } from './components/EventCommentBox';

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event>();
  const { isModalOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    if (!id) return;

    getEvent();
  }, []);

  const getEvent = async () => {
    if (!id) return;

    try {
      const event = await serviceGetEvent(id);

      setEvent(event);
    } catch (error) {
      errorSnackbar('Error al obtener el evento. Contacte a soporte.');
      navigate(-1);
    }
  };

  return (
    <>
      <MMModal isModalOpen={isModalOpen} closeModal={closeModal} title="Editar Evento" maxWidth="lg">
        <EventsForm
          isFormEdit={true}
          eventToEdit={event}
          closeFormModal={closeModal}
          useAdminController={false}
          successCallback={(event) => setEvent((prevEvent) => ({ ...prevEvent, ...event }))}
        />
      </MMModal>

      <MMContainer maxWidth="xxl" className="events-show-boxes-container ">
        {event ? (
          <>
            <Breadcrumb items={[{ label: 'Eventos', onClick: () => navigate(-1) }, { label: event.name }]} />

            <EventInfoBox event={event} openModal={openModal} />
            <EventReviewBox event={event} setEvent={setEvent} />
            <EventCommentBox event={event} />
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
