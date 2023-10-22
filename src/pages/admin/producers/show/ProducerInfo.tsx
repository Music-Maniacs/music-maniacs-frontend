import React from 'react';
import { Producer } from '../../../../models/Producer';
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
import { NoData } from '../../../../components/NoData/NoData';

type Props = {
  producer: Producer;
};

export const ProducerInfo = ({ producer }: Props) => {
  const firstColumn = [
    {
      label: 'Nombre',
      content: <InputText disabled value={producer.name} />
    },
    {
      label: 'Nacionalidad',
      content: <InputText disabled value={producer.nationality} />
    },
    {
      label: 'Géneros Relacionados',
      content: (
        <>
          {producer.genres.length === 0 ? (
            <NoData message="No hay géneros para mostrar" />
          ) : (
            <ul style={{ marginTop: '3px' }}>
              {producer.genres.map((genre) => (
                <li key={genre.name}>{genre.name}</li>
              ))}
            </ul>
          )}
        </>
      )
    }
  ];

  const secondColumn = [
    {
      label: 'Links',
      content: (
        <>
          {producer.links && producer.links.length === 0 ? (
            <NoData message="No hay links para mostrar" />
          ) : (
            producer.links.map((link, index) => (
              <StyledLinksContainer key={index}>
                <InputText disabled value={link.title} containerWidth="40%" />
                <InputText disabled value={link.url} containerWidth="60%" />
              </StyledLinksContainer>
            ))
          )}
        </>
      )
    },
    {
      label: 'Descripción',
      content: <InputArea disabled value={producer.description} rows={12} />
    }
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <StyledLabel>Portada de la Productora</StyledLabel>

        <StyledImageContainer>
          <StyledImageScaledDown
            alt="Portada de la productora"
            src={producer.image?.full_url ?? require('../../../../assets/images/no-image.jpg')}
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
