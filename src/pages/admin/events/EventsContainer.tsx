import React from 'react';
import { Index } from './Index';
import { EventsProvider } from './context/eventsContext';

const EventsContainer = () => {
  return (
    <EventsProvider>
      <Index />
    </EventsProvider>
  );
};
export default EventsContainer;
