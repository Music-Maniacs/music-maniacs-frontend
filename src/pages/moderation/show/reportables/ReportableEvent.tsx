import React from 'react';
import { Report } from '../../../../models/Report';
import { Event } from '../../../../models/Event';
import { EventBasicInfo } from '../../../events/show/components/EventBasicInfo';
import { FaSearch } from 'react-icons/fa';
import { MMButtonLink } from '../../../../components/MMButton/MMButtonLink';

type ReportableEventProps = {
  report: Report;
};

export const ReportableEvent = ({ report }: ReportableEventProps) => {
  const event = report.reportable as unknown as Event;

  return (
    <EventBasicInfo
      event={event}
      customActions={
        <MMButtonLink to={`/events/${event.id}`}>
          <FaSearch />
          Ver Evento
        </MMButtonLink>
      }
    />
  );
};
