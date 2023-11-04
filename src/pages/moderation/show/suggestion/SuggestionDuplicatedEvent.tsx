import React from 'react';
import { Report } from '../../../../models/Report';
import { MMSubTitle } from '../../../../components/MMTitle/MMTitle';
import { useNavigate } from 'react-router-dom';
import { EventBasicInfo } from '../../../events/show/components/EventBasicInfo';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { FaSearch } from 'react-icons/fa';
import { Event } from '../../../../models/Event';

type SuggestionDuplicatedEventProps = {
  report: Report;
};

export const SuggestionDuplicatedEvent = ({ report }: SuggestionDuplicatedEventProps) => {
  const navigate = useNavigate();
  const event = report.suggestion as unknown as Event;

  return (
    <>
      <br />

      <MMSubTitle content="Evento Original" />

      <EventBasicInfo
        event={event}
        customActions={
          <MMButton onClick={() => navigate(`/events/${event.id}`)}>
            <FaSearch />
            Ver Evento
          </MMButton>
        }
      />
    </>
  );
};
