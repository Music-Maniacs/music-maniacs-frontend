import React from 'react';
import { Artist } from '../../../../models/Artist';
import { Grid } from '@mui/material';
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

type Props = {
  artist: Artist;
};

export const ArtistInfo = ({ artist }: Props) => {
  const firstColumn = [
    {
      label: 'Nombre',
      content: <InputText disabled value={artist.name} />
    },
    {
      label: 'Nacionalidad',
      content: <InputText disabled value={artist.nationality} />
    },
    {
      label: 'Géneros Relacionados',
      content: (
        <ul style={{ marginTop: '3px' }}>
          {artist.genres.map((genre) => (
            <li key={genre.name}>{genre.name}</li>
          ))}
        </ul>
      )
    }
  ];

  const secondColumn = [
    {
      label: 'Links',
      content: (
        <>
          {artist.links &&
            artist.links.map((link, index) => (
              <StyledLinksContainer key={index}>
                <InputText disabled value={link.title} containerWidth="40%" />
                <InputText disabled value={link.url} containerWidth="60%" />
              </StyledLinksContainer>
            ))}
        </>
      )
    },
    {
      label: 'Descripción',
      content: <InputArea disabled value={artist.description} rows={12} />
    }
  ];

  return (
    <Grid container>
      <Grid item xs={12} sm={6} md={4}>
        <StyledLabel>Portada del Artista</StyledLabel>

        <StyledImageContainer>
          <StyledImageScaledDown
            alt="Portada del artista"
            src={artist?.image?.full_url ?? require('../../../../assets/images/no-image.jpg')}
          />
        </StyledImageContainer>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        {firstColumn.map((stat, index) => (
          <StyledDataContainer key={index}>
            <StyledBoldText>{stat.label}</StyledBoldText>
            {stat.content}
          </StyledDataContainer>
        ))}
      </Grid>

      <Grid item xs={12} sm={12} md={4}>
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
