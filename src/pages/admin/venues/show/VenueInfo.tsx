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
import { Venue } from '../../../../models/Venue';
import { LeafletMap } from '../../../../components/forms/venues/LeafletMap';

type Props = {
  venue: Venue;
};

export const VenueInfo = ({ venue }: Props) => {
  const firstColumn = [
    {
      label: 'Nombre',
      content: <InputText disabled value={venue.name} />
    },
    {
      label: 'Descripción',
      content: <InputArea disabled value={venue.description} rows={8} />
    }
  ];

  const secondColumn = [
    {
      label: 'Links',
      content: (
        <>
          {venue.links &&
            venue.links.map((link, index) => (
              <StyledLinksContainer key={index}>
                <InputText disabled value={link.title} containerWidth="40%" />
                <InputText disabled value={link.url} containerWidth="60%" />
              </StyledLinksContainer>
            ))}
        </>
      )
    }
  ];

  const mapLocationColumn = [
    {
      content: (
        <Grid container spacing={0} width={'93%'}>
          <Grid item xs={8}>
            <StyledDataContainer>
              <StyledBoldText>Dirección</StyledBoldText>
              <InputText disabled value={venue.location?.street} />
            </StyledDataContainer>
          </Grid>
          <Grid item xs={4}>
            <StyledDataContainer>
              <StyledBoldText>Número</StyledBoldText>
              <InputText disabled value={venue.location?.number} />
            </StyledDataContainer>
          </Grid>
        </Grid>
      )
    },
    {
      content: (
        <Grid container spacing={0} width={'93%'}>
          <Grid item xs={8}>
            <StyledDataContainer>
              <StyledBoldText>Departamento</StyledBoldText>
              <InputText disabled value={venue.location?.department} />
            </StyledDataContainer>
          </Grid>
          <Grid item xs={4}>
            <StyledDataContainer>
              <StyledBoldText>Código Postal</StyledBoldText>
              <InputText disabled value={venue.location?.zip_code} />
            </StyledDataContainer>
          </Grid>
        </Grid>
      )
    },
    {
      label: 'Localidad',
      content: <InputText disabled value={venue.location?.locality} />
    },
    {
      label: 'Provincia',
      content: <InputText disabled value={venue.location?.province} />
    },
    {
      label: 'Pais',
      content: <InputText disabled value={venue.location?.country} />
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

  const gridMapProps: GridProps = {
    item: true,
    xs: 12,
    sm: 12,
    md: 6,
    lg: 6,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  };

  return (
    <>
      <Grid container>
        <Grid {...gridCommonProps}>
          <StyledLabel>Portada del Espacio de Evento</StyledLabel>

          <StyledImageContainer>
            <StyledImageScaledDown
              alt="Portada del espacio de evento"
              src={venue.image?.full_url ?? require('../../../../assets/images/no-image.jpg')}
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

      <Grid container spacing={2}>
        <Grid {...gridMapProps}>
          <Grid container spacing={2} width={'96%'}>
            <Grid item xs={6}>
              <StyledDataContainer>
                <StyledBoldText>Latitud</StyledBoldText>
                <InputText disabled value={venue.location?.latitude} />
              </StyledDataContainer>
            </Grid>
            <Grid item xs={6}>
              <StyledDataContainer>
                <StyledBoldText>Longitud</StyledBoldText>
                <InputText disabled value={venue.location?.longitude} />
              </StyledDataContainer>
            </Grid>
          </Grid>

          <LeafletMap
            latitude={venue.location?.latitude ? parseFloat(venue.location.latitude) : undefined}
            longitude={venue.location?.longitude ? parseFloat(venue.location.longitude) : undefined}
            hasClickEvent={false}
            width="88%"
          />
        </Grid>
        <Grid {...gridMapProps}>
          {mapLocationColumn.map((stat, index) => {
            return stat.label ? (
              <StyledDataContainer key={index}>
                <StyledBoldText>{stat.label}</StyledBoldText>
                {stat.content}
              </StyledDataContainer>
            ) : (
              <div key={index}>{stat.content}</div>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};
