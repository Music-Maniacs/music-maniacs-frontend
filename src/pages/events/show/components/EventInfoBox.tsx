import React from 'react';
import { MMBox } from '../../../../components/MMBox/MMBox';
import { Event } from '../../../../models/Event';
import { Grid } from '@mui/material';
import { MMDateIcon } from '../../../../components/icons/MMDateIcon';
import { formatDate } from '../../../../utils/formatDate';
import { MMArtistIcon } from '../../../../components/icons/MMArtistIcon';
import { MMVenueIcon } from '../../../../components/icons/MMVenueIcon';
import { MMProducerIcon } from '../../../../components/icons/MMProducerIcon';
import '../../Events.scss';
import { MMSubTitle } from '../../../../components/MMTitle/MMTitle';
import MMLink from '../../../../components/MMLink/MMLink';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { warningSnackbar } from '../../../../components/Snackbar/Snackbar';
import { useAuth } from '../../../../context/authContext';

type Props = {
  event: Event;
  openModal: () => void;
};

export const EventInfoBox = ({ event, openModal }: Props) => {
  const { user } = useAuth();

  return (
    <>
      <MMBox className="show-boxes info-box">
        <div className="info-box">
          <div className="image-container">
            <img
              alt="Portada del Evento"
              src={event.image?.full_url ?? require('../../../../assets/images/default-event.jpg')}
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
                  <MMLink to={`/artists/${event.artist.id}`} content={event.artist.name} />
                </div>
              </Grid>

              {/* Venue */}
              <Grid item xs={12} sm={6}>
                <div className="events-icon-with-data-container">
                  <MMVenueIcon />
                  <MMLink to={`/venues/${event.venue.id}`} content={event.venue.name} />
                </div>
              </Grid>

              {/* Producer */}
              <Grid item xs={12} sm={6}>
                <div className="events-icon-with-data-container">
                  <MMProducerIcon />
                  <MMLink to={`/producers/${event.producer.id}`} content={event.producer.name} />
                </div>
              </Grid>
            </Grid>
          </div>

          <div className="actions-container">
            {/* todo: no lo puedo poner al boton, hasta que tengamos en el endpoint si sigue a este evento o no */}
            {user && <MMButton onClick={() => warningSnackbar('Funcion no implementada')}>Seguir Evento</MMButton>}

            <MMButton onClick={openModal}>Editar Evento</MMButton>
          </div>
        </div>
      </MMBox>

      {/* Description - Links */}
      <MMBox className="show-boxes">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={9} display={'flex'} flexDirection={'column'} gap={'5px'} whiteSpace={'pre-wrap'}>
            <MMSubTitle content="Descripción" />
            {event.description}
          </Grid>

          <Grid item xs={12} sm={3}>
            <MMSubTitle content="Enlaces" />

            {event.links && (
              <ul style={{ marginTop: '3px' }}>
                {event.links.map((link) => (
                  <li key={link.id}>{`${link.title}: ${link.url}`}</li>
                ))}
              </ul>
            )}
          </Grid>
        </Grid>
      </MMBox>
    </>
  );
};
