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
import { Dropdown } from '../../../../components/dropdown/Dropdown';
import { MMSubTitle } from '../../../../components/MMTitle/MMTitle';
import MMLink from '../../../../components/MMLink/MMLink';

type Props = {
  event: Event;
};

export const EventInfoBox = ({ event }: Props) => {
  const backendUrl = process.env.REACT_APP_API_URL;

  return (
    <>
      <MMBox className="show-boxes info-box">
        <div className="info-box">
          <div className="image-container">
            <img
              alt="Portada del Evento"
              src={
                event.image && event.image.url
                  ? `${backendUrl}${event.image.url}`
                  : `${require('../../../../assets/images/default-event.jpg')}`
              }
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

          <div className="dropdown-container">
            <Dropdown />
          </div>
        </div>
      </MMBox>
      <MMBox className="show-boxes">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} display={'flex'} flexDirection={'column'} gap={'5px'}>
            <MMSubTitle content="Descripción" />
            {event.description}
          </Grid>
          <Grid item xs={12} sm={4}>
            <MMSubTitle content="Enlaces" />

            {event.links && (
              <ul style={{ marginTop: '3px' }}>
                {event.links.map((link) => (
                  <li key={link.id}>{link.url}</li>
                ))}
              </ul>
            )}
          </Grid>
        </Grid>
      </MMBox>
    </>
  );
};
