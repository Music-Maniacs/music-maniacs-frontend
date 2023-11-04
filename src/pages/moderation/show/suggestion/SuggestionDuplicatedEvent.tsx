import React from 'react';
import { Report } from '../../../../models/Report';
import { MMSubTitle } from '../../../../components/MMTitle/MMTitle';
import { EventBasicInfo } from '../../../events/show/components/EventBasicInfo';
import { FaSearch } from 'react-icons/fa';
import { Event } from '../../../../models/Event';
import { MMButtonLink } from '../../../../components/MMButton/MMButtonLink';

type SuggestionDuplicatedEventProps = {
  report: Report;
};

export const SuggestionDuplicatedEvent = ({ report }: SuggestionDuplicatedEventProps) => {
  const event = report.suggestion as unknown as Event;

  return (
    <>
      <br />

      <MMSubTitle content="Evento Original" />

      <EventBasicInfo
        event={event}
        customActions={
          <MMButtonLink to={`/events/${event.id}`}>
            <FaSearch />
            Ver Evento
          </MMButtonLink>
        }
      />
    </>
  );
};
