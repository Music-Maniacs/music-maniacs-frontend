import React from 'react';
import { useEvents } from '../context/eventsContext';
import { Event } from '../../../../models/Event';
import { EventsForm } from '../../../../components/forms/events/EventsForm';

export const Form = () => {
  const { setEvents, closeFormModal, isFormEdit, eventToEdit } = useEvents();

  const successCallback = (event: Event) => {
    if (isFormEdit) {
      setEvents((events) => events?.map((e) => (e.id === event.id ? event : e)));
    } else {
      setEvents((events) => [event, ...(events ?? [])]);
    }
  };

  return (
    <EventsForm
      eventToEdit={eventToEdit}
      isFormEdit={isFormEdit}
      closeFormModal={closeFormModal}
      successCallback={successCallback}
    />
  );
};
