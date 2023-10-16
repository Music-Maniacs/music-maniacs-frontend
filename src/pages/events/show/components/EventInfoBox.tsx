import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MMBox } from '../../../../components/MMBox/MMBox';
import { Event } from '../../../../models/Event';
import { Grid } from '@mui/material';
import { MMDateIcon } from '../../../../components/icons/MMDateIcon';
import { formatDate } from '../../../../utils/formatDate';
import { MMArtistIcon } from '../../../../components/icons/MMArtistIcon';
import { MMVenueIcon } from '../../../../components/icons/MMVenueIcon';
import { MMProducerIcon } from '../../../../components/icons/MMProducerIcon';
import '../../Events.scss';
import MMLink from '../../../../components/MMLink/MMLink';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';
import { useAuth } from '../../../../context/authContext';
import { followEvent, unfollowEvent } from '../../../../services/eventService';

type Props = {
  event: Event;
  setEvent: Dispatch<SetStateAction<Event | undefined>>;
  openModal?: () => void;
  hideActions?: boolean;
};

export const EventInfoBox = ({ event, setEvent, openModal, hideActions = false }: Props) => {
  const { user } = useAuth();
  const [src, setSrc] = useState<string | undefined>(event.image?.full_url);

  useEffect(() => {
    if (event.image?.full_url) setSrc(event.image.full_url);
  }, [event]);

  const handleFollow = () => {
    try {
      followEvent(event.id);

      setEvent((prevEvent) => (prevEvent ? { ...prevEvent, followed_by_current_user: true } : undefined));
    } catch (error) {
      errorSnackbar('Error al seguir el evento. Contacte a soporte.');
    }
  };

  const handleUnfollow = () => {
    try {
      unfollowEvent(event.id);

      setEvent((prevEvent) => (prevEvent ? { ...prevEvent, followed_by_current_user: false } : undefined));
    } catch (error) {
      errorSnackbar('Error al dejar de seguir el evento. Contacte a soporte.');
    }
  };

  return (
    <MMBox className="show-boxes info-box">
      <div className="info-box">
        <div className="image-container">
          <img
            alt="Portada del Evento"
            onError={() => setSrc(undefined)}
            src={src ?? require('../../../../assets/images/default-event.jpg')}
            className="image"
          />
        </div>

        <div className="data-container">
          <h1 className="name">{event.name}</h1>

          <Grid container spacing={2}>
            {/* Date */}
            <Grid item xs={12} sm={6}>
              <div className="events-icon-with-data-container">
                <MMDateIcon />
                {formatDate({ date: event.datetime, format: 'longDate' })}
              </div>
            </Grid>

            {/* Artist */}
            <Grid item xs={12} sm={6}>
              <div className="events-icon-with-data-container">
                <MMArtistIcon />
                <MMLink to={`/profiles/artists/${event.artist.id}`} content={event.artist.name} />
              </div>
            </Grid>

            {/* Venue */}
            <Grid item xs={12} sm={6}>
              <div className="events-icon-with-data-container">
                <MMVenueIcon />
                <MMLink to={`/profiles/venues/${event.venue.id}`} content={event.venue.name} />
              </div>
            </Grid>

            {/* Producer */}
            <Grid item xs={12} sm={6}>
              <div className="events-icon-with-data-container">
                <MMProducerIcon />
                <MMLink to={`/profiles/producers/${event.producer.id}`} content={event.producer.name} />
              </div>
            </Grid>
          </Grid>
        </div>

        {!hideActions && (
          <div className="actions-container">
            {user && (
              <MMButton
                onClick={() => {
                  if (event.followed_by_current_user) {
                    handleUnfollow();
                  } else {
                    handleFollow();
                  }
                }}
              >
                {`${event.followed_by_current_user ? 'Dejar de seguir ' : 'Seguir '}`}
                Evento
              </MMButton>
            )}

            <MMButton onClick={openModal}>Editar Evento</MMButton>
          </div>
        )}
      </div>
    </MMBox>
  );
};
