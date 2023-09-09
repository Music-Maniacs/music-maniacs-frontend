import React from 'react';
import { Outlet } from 'react-router-dom';
import { EventsProvider } from './context/eventsContext';
import './Events.scss';

const EventsContainer = () => {
  return (
    <EventsProvider>
      <Outlet />
    </EventsProvider>
  );
};

export default EventsContainer;
