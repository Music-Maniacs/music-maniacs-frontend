import React from 'react';
import { User } from '../../../../models/User';
import { Grid } from '@mui/material';
import { styled } from 'styled-components';
import { InputText } from '../../../../components/form/InputText/InputText';
import { InputArea } from '../../../../components/form/InputArea/InputArea';

type Props = {
  user: User;
};

const StyledBoldText = styled.span`
  font-weight: 600;
`;

const StyledStatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const StyledDataContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  margin-bottom: 10px;

  width: 90%;
`;

const StyledLinkContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 9px;
`;

export const UserInfo = ({ user }: Props) => {
  const firstColumn = [
    {
      label: 'Nombre Completo',
      content: <InputText disabled value={user.full_name} />
    },
    {
      label: 'Usuario',
      content: <InputText disabled value={user.username} />
    },
    {
      label: 'Email',
      content: <InputText disabled value={user.email} />
    },
    {
      label: 'Biografía',
      content: <InputArea disabled value={user.biography ?? ''} />
    }
  ];

  const secondColumn = [
    {
      label: 'Rol',
      content: <InputText disabled value={user.role.name} />
    },
    {
      label: 'Creado El',
      content: <InputText disabled value={user.created_at} />
    },
    {
      label: 'Actualizado El',
      content: <InputText disabled value={user.updated_at} />
    },
    {
      label: 'Links',
      content: (
        <>
          {user.links &&
            user.links.map((link, index) => (
              <StyledLinkContainer key={index}>
                <InputText disabled value={link.title} containerWidth="40%" />
                <InputText disabled value={link.url} containerWidth="60%" />
              </StyledLinkContainer>
            ))}
        </>
      )
    }
  ];

  const stats = [
    {
      label: 'Último inicio de sesión:',
      value: '..'
    },
    {
      label: 'Días visitados:',
      value: '..'
    },
    {
      label: 'Eventos consutlados:',
      value: '..'
    },
    {
      label: 'Me gustas dados:',
      value: '..'
    },
    {
      label: 'Me gustas recibidos:',
      value: '..'
    },
    {
      label: 'Penalizaciones:',
      value: '..'
    },
    {
      label: 'Respuestas creadas:',
      value: '..'
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

      <Grid item xs={12} sm={6} md={4}>
        {secondColumn.map((stat, index) => (
          <StyledDataContainer key={index}>
            <StyledBoldText>{stat.label}</StyledBoldText>
            {stat.content}
          </StyledDataContainer>
        ))}
      </Grid>

      <Grid item sm={12} md={4}>
        <h3>Estadísticas del Usuario</h3>
        {stats.map((stat, index) => (
          <StyledStatContainer key={index}>
            <StyledBoldText>{stat.label}</StyledBoldText> <span>{stat.value}</span>
          </StyledStatContainer>
        ))}
      </Grid>
    </Grid>
  );
};
