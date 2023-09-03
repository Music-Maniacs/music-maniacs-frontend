import React, { useEffect, useState } from 'react';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';
import { Loader } from '../../../../components/Loader/Loader';
import { useEvents } from '../context/eventsContext';
import { Event } from '../../../../models/Event';
import { adminGetEvent } from '../../../../services/eventService';
import { EventsForm } from '../../../../components/forms/events/EventsForm';

export const Form = () => {
  const { setEvents, closeFormModal, isFormEdit, eventIdToEdit, isFormModalOpen } = useEvents();
  const [isShowRequestLoading, setIsShowRequestLoading] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<Event>();

  useEffect(() => {
    getEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFormModalOpen]);

  const getEvent = async () => {
    if (!eventIdToEdit) return;

    setIsShowRequestLoading(true);
    try {
      const event = await adminGetEvent(eventIdToEdit);

      setEventToEdit(event);
    } catch (errror) {
      errorSnackbar('Error al obtener el evento. Contacte a soporte.');
      closeFormModal();
    } finally {
      setIsShowRequestLoading(false);
    }
  };

  const successCallback = (event: Event) => {
    if (isFormEdit) {
      setEvents((events) => events?.map((e) => (e.id === event.id ? event : e)));
    } else {
      setEvents((events) => [event, ...(events ?? [])]);
    }
  };

  return isShowRequestLoading ? (
    <Loader />
  ) : (
    <EventsForm
      eventToEdit={eventToEdit}
      isFormEdit={isFormEdit}
      closeFormModal={closeFormModal}
      successCallback={successCallback}
    />
  );
};
