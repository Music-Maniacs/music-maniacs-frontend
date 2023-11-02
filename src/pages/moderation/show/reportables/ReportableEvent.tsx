import React from 'react';
import { Report } from '../../../../models/Report';
import { Event } from '../../../../models/Event';
import { EventBasicInfo } from '../../../events/show/components/EventBasicInfo';
import { useNavigate } from 'react-router-dom';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { FaSearch } from 'react-icons/fa';

type ReportableEventProps = {
  report: Report;
};

export const ReportableEvent = ({ report }: ReportableEventProps) => {
  const navigate = useNavigate();
  const event = report.reportable as unknown as Event;

  return (
    <EventBasicInfo
      event={event}
      customActions={
        <MMButton onClick={() => navigate(`/events/${event.id}`)}>
          <FaSearch />
          Ver Evento
        </MMButton>
      }
    />
  );
};
