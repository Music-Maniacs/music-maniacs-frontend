import React from 'react';
import { MMBox } from '../../../../components/MMBox/MMBox';
import { Grid } from '@mui/material';
import { MMSubTitle } from '../../../../components/MMTitle/MMTitle';
import { Event } from '../../../../models/Event';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { useNavigate } from 'react-router-dom';
import MMAnchor from '../../../../components/MMLink/MMAnchor';

type Props = {
  event: Event;
};

export const EventAdvancedInfo = ({ event }: Props) => {
  const navigate = useNavigate();

  /* Description - Links - Multimedia */
  return (
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
                <li key={link.id}>
                  <MMAnchor style={{ wordBreak: 'break-all' }} href={link.url ?? '#'} content={link.title} />
                </li>
              ))}
            </ul>
          )}

          <MMSubTitle content="Multimedia" />

          <MMButton onClick={() => navigate(`multimedia`)}>Ver Multimedia</MMButton>
        </Grid>
      </Grid>
    </MMBox>
  );
};
