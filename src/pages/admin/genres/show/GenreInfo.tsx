import React from 'react';
import { Genre } from '../../../../models/Genre';
import { Grid } from '@mui/material';
import { styled } from 'styled-components';
import { InputText } from '../../../../components/form/InputText/InputText';

type Props = {
  genre: Genre;
};

const StyledBoldText = styled.span`
  font-weight: 600;
`;

const StyledDataContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  margin-bottom: 10px;

  width: 90%;
`;

export const GenreInfo = ({ genre }: Props) => {
  const firstColumn = [
    {
      label: 'Nombre',
      content: <InputText disabled value={genre.name} />
    }
  ];

  return (
    <Grid container>
      <Grid item xs={12} sm={6} md={4}>
        {firstColumn.map((stat, index) => (
          <StyledDataContainer key={index}>
            <StyledBoldText>{stat.label}</StyledBoldText>
            {stat.content}
          </StyledDataContainer>
        ))}
      </Grid>
    </Grid>
  );
};
