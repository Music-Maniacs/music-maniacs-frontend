import React from 'react';
import { Artist } from '../../../../models/Artist';
import { Grid } from '@mui/material';
import { StyledBoldText, StyledDataContainer, StyledImageScaledDown, StyledLinksContainer } from '../../styles';
import { InputText } from '../../../../components/form/InputText/InputText';
import { StyledLabel } from '../../../../components/form/formStyles';
import { InputArea } from '../../../../components/form/InputArea/InputArea';

type Props = {
  artist: Artist;
};

export const ArtistInfo = ({ artist }: Props) => {
  const backendUrl = process.env.REACT_APP_API_URL;
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
      content: <InputText disabled value={artist.genres.toString()} />
    },
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
    }
  ];

  const secondColumn = [
    {
      label: 'Descripción',
      content: <InputArea disabled value={artist.description} rows={10} />
    }
  ];

  return (
    <Grid container>
      <Grid item xs={12} sm={6} md={4}>
        <StyledLabel>Portada del Artista</StyledLabel>

        {artist.image && artist.image.url && (
          <StyledImageScaledDown alt="Portada del artista" src={`${backendUrl}${artist.image.url}`} />
        )}
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        {firstColumn.map((stat, index) => (
          <StyledDataContainer key={index}>
            <StyledBoldText>{stat.label}</StyledBoldText>
            {stat.content}
          </StyledDataContainer>
        ))}
      </Grid>

      <Grid item sm={12} md={4}>
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
