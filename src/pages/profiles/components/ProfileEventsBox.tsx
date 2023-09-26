import React from 'react';
import { Artist } from '../../../models/Artist';
import { Producer } from '../../../models/Producer';
import { Venue } from '../../../models/Venue';
import '../Profiles.scss';
import { MMBox } from '../../../components/MMBox/MMBox';
import { Navtab } from '../../../components/Navtab/Navtab';
import { EventProfilesTab } from '../../../models/Event';
import { StyledFlex, StyledFlexColumn } from '../../../styles/styledComponents';
import { useNavigate } from 'react-router-dom';
import { MMButton } from '../../../components/MMButton/MMButton';
import moment from 'moment';

type ProfileEventsBoxProps = {
  profile: Artist | Producer | Venue;
};

export const ProfileEventsBox = ({ profile }: ProfileEventsBoxProps) => {
  return (
    <MMBox className="show-boxes">
      <Navtab
        items={[
          {
            label: 'Próximos Eventos',
            content: () => (
              <StyledFlexColumn>
                {profile.next_events.map((event) => (
                  <EventInfo key={event.id} event={event} />
                ))}
              </StyledFlexColumn>
            )
          },
          {
            label: 'Eventos Pasados',
            content: () => (
              <StyledFlexColumn>
                {profile.past_events.map((event) => (
                  <EventInfo key={event.id} event={event} />
                ))}
              </StyledFlexColumn>
            )
          }
        ]}
      />
    </MMBox>
  );
};
type EventInfoProps = {
  event: EventProfilesTab;
};

const EventInfo = ({ event }: EventInfoProps) => {
  const navigate = useNavigate();

  const capitalizeString = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <StyledFlex
      $justifyContent="space-between"
      $alignItems="center"
      $padding="5px"
      $cursor="pointer"
      onClick={() => navigate(`/events/${event.id}`)}
      className="event-box"
    >
      <div className="event-date">
        <span className="number">{moment(event.datetime).format('DD')}</span>
        <span className="date">{capitalizeString(moment(event.datetime).format('MMM'))}</span>
      </div>

      <div className="event-info">
        <span className="name">{event.name}</span>

        <span>{`${event.venue.name} | ${event.venue.short_address}`}</span>
      </div>

      <div>
        <MMButton>Ver Mas</MMButton>
      </div>
    </StyledFlex>
  );
};
