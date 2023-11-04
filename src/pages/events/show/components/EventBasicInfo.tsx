import React, { useEffect, useState } from 'react';
import { Event } from '../../../../models/Event';
import { MMBox } from '../../../../components/MMBox/MMBox';
import '../../Events.scss';
import { useAuth } from '../../../../context/authContext';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { Grid } from '@mui/material';
import { MMDateIcon } from '../../../../components/icons/MMDateIcon';
import { formatDate } from '../../../../utils/formatDate';
import { MMArtistIcon } from '../../../../components/icons/MMArtistIcon';
import MMLink from '../../../../components/MMLink/MMLink';
import { MMVenueIcon } from '../../../../components/icons/MMVenueIcon';
import { MMProducerIcon } from '../../../../components/icons/MMProducerIcon';
import { StyledFlex } from '../../../../styles/styledComponents';
import { FaFlag } from 'react-icons/fa';

type Props = {
  event: Event;
  handleEditEvent?: () => void;
  handleReportEvent?: () => void;
  handleFollow?: () => void;
  handleUnfollow?: () => void;
  hideActions?: boolean;
  customActions?: React.ReactNode;
};

export const EventBasicInfo = ({
  event,
  handleEditEvent,
  handleReportEvent,
  handleFollow,
  handleUnfollow,
  hideActions = false,
  customActions
}: Props) => {
  const { user } = useAuth();

  const [src, setSrc] = useState<string | undefined>(event.image?.full_url);

  useEffect(() => {
    if (event.image?.full_url) setSrc(event.image.full_url);
  }, [event]);

  return (
    <MMBox className="show-boxes">
      <div className="events-info-box">
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

          {user && handleFollow && handleUnfollow && (
            <MMButton
              onClick={() => {
                if (event.followed_by_current_user) {
                  handleUnfollow();
                } else {
                  handleFollow();
                }
              }}
            >
              {`${event.followed_by_current_user ? 'Dejar de seguir' : 'Seguir'}`}
            </MMButton>
          )}

          <Grid container spacing={2} paddingTop={'10px'}>
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

                {event.artist ? (
                  <MMLink to={`/profiles/artists/${event.artist.id}`} content={event.artist.name} />
                ) : (
                  <span>Perfil Eliminado</span>
                )}
              </div>
            </Grid>

            {/* Venue */}
            <Grid item xs={12} sm={6}>
              <div className="events-icon-with-data-container">
                <MMVenueIcon />

                {event.venue ? (
                  <MMLink to={`/profiles/venues/${event.venue.id}`} content={event.venue.name} />
                ) : (
                  <span>Perfil Eliminado</span>
                )}
              </div>
            </Grid>

            {/* Producer */}
            <Grid item xs={12} sm={6}>
              <div className="events-icon-with-data-container">
                <MMProducerIcon />
                {event.producer ? (
                  <MMLink to={`/profiles/producers/${event.producer.id}`} content={event.producer.name} />
                ) : (
                  <span>Perfil Eliminado</span>
                )}
              </div>
            </Grid>
          </Grid>
        </div>

        {(customActions || !hideActions) && (
          <div className="actions-container">
            {handleReportEvent && (
              <StyledFlex $cursor="pointer" onClick={handleReportEvent}>
                <FaFlag />
                <span>Reportar</span>
              </StyledFlex>
            )}

            {handleEditEvent && <MMButton onClick={handleEditEvent}>Editar Evento</MMButton>}

            {customActions}
          </div>
        )}
      </div>
    </MMBox>
  );
};
