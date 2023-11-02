import React from 'react';
import { MMBox } from '../../../../components/MMBox/MMBox';
import { Grid } from '@mui/material';
import { MMSubTitle } from '../../../../components/MMTitle/MMTitle';
import { Event } from '../../../../models/Event';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { useNavigate } from 'react-router-dom';
import { MMLinksGroup } from '../../../../components/MMLinkGroup/MMLinksGroup';

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
          {event.links && event.links.length > 0 && <MMLinksGroup links={event.links} />}

          <MMSubTitle content="Multimedia" />

          <MMButton onClick={() => navigate(`multimedia`)}>Ver Multimedia</MMButton>
        </Grid>
      </Grid>
    </MMBox>
  );
};
