import React from 'react';
import { Grid, GridProps } from '@mui/material';
import {
  StyledBoldText,
  StyledDataContainer,
  StyledImageContainer,
  StyledImageScaledDown,
  StyledLinksContainer
} from '../../styles';
import { InputText } from '../../../../components/form/InputText/InputText';
import { StyledLabel } from '../../../../components/form/formStyles';
import { InputArea } from '../../../../components/form/InputArea/InputArea';
import { Event } from '../../../../models/Event';
import { formatDate } from '../../../../utils/formatDate';

type Props = {
  event: Event;
};

export const EventInfo = ({ event }: Props) => {
  const firstColumn = [
    {
      label: 'Nombre del evento',
      content: <InputText disabled value={event.name} />
    },
    {
      label: 'Fecha y Hora',
      content: <InputText disabled value={formatDate({ date: event.datetime, format: 'slashWithTime' })} />
    },
    {
      label: 'Artista',
      content: <InputText disabled value={event.artist.name} />
    },
    {
      label: 'Espacio de evento',
      content: <InputText disabled value={event.venue.name} />
    },
    {
      label: 'Productora',
      content: <InputText disabled value={event.producer.name} />
    }
  ];

  const secondColumn = [
    {
      label: 'Descripción',
      content: <InputArea disabled value={event.description} rows={6} />
    },
    {
      label: 'Links',
      content: (
        <>
          {event.links &&
            event.links.map((link, index) => (
              <StyledLinksContainer key={index}>
                <InputText disabled value={link.title} containerWidth="40%" />
                <InputText disabled value={link.url} containerWidth="60%" />
              </StyledLinksContainer>
            ))}
        </>
      )
    }
  ];

  const gridCommonProps: GridProps = {
    item: true,
    xs: 12,
    sm: 12,
    md: 4,
    lg: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  };

  return (
    <Grid container>
      <Grid {...gridCommonProps}>
        <StyledLabel>Portada del Evento</StyledLabel>

        <StyledImageContainer>
          <StyledImageScaledDown
            alt="Portada del espacio de evento"
            src={event.image?.full_url ?? require('../../../../assets/images/no-image.jpg')}
          />
        </StyledImageContainer>
      </Grid>

      <Grid {...gridCommonProps}>
        {firstColumn.map((stat, index) => (
          <StyledDataContainer key={index}>
            <StyledBoldText>{stat.label}</StyledBoldText>
            {stat.content}
          </StyledDataContainer>
        ))}
      </Grid>

      <Grid {...gridCommonProps}>
        {secondColumn.map((stat, index) => (
          <StyledDataContainer key={index}>
            <StyledBoldText>{stat.label}</StyledBoldText>
            {stat.content}
          </StyledDataContainer>
        ))}
      </Grid>
    </Grid>
  );
};
