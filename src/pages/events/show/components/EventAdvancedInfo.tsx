import React from 'react';
import { MMBox } from '../../../../components/MMBox/MMBox';
import { Grid } from '@mui/material';
import { MMSubTitle } from '../../../../components/MMTitle/MMTitle';
import { Event } from '../../../../models/Event';

type Props = {
  event: Event;
};

export const EventAdvancedInfo = ({ event }: Props) => {
  /* Description - Links */
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
                <li key={link.id}>{`${link.title}: ${link.url}`}</li>
              ))}
            </ul>
          )}
        </Grid>
      </Grid>
    </MMBox>
  );
};
