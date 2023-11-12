import React from 'react';
import { User } from '../../../../models/User';
import { Grid } from '@mui/material';
import { styled } from 'styled-components';
import { InputText } from '../../../../components/form/InputText/InputText';
import { InputArea } from '../../../../components/form/InputArea/InputArea';
import { StyledBoldText, StyledDataContainer, StyledLinksContainer } from '../../styles';
import { formatDate } from '../../../../utils/formatDate';

type Props = {
  user: User;
};

const StyledStatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
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
      content: (
        <InputText
          disabled
          value={user.created_at ? formatDate({ date: user.created_at, format: 'slashWithTime' }) : ''}
        />
      )
    },
    {
      label: 'Actualizado El',
      content: (
        <InputText
          disabled
          value={user.updated_at ? formatDate({ date: user.updated_at, format: 'slashWithTime' }) : ''}
        />
      )
    },
    {
      label: 'Links',
      content: (
        <>
          {user.links &&
            user.links.map((link, index) => (
              <StyledLinksContainer key={index}>
                <InputText disabled value={link.title} containerWidth="40%" />
                <InputText disabled value={link.url} containerWidth="60%" />
              </StyledLinksContainer>
            ))}
        </>
      )
    }
  ];

  const stats = [
    {
      label: 'Último inicio de sesión:',
      value: user.user_stat.last_day_visited
        ? formatDate({
            date: user.user_stat.last_day_visited,
            format: 'slashWithTime'
          })
        : '--'
    },
    {
      label: 'Días visitados:',
      value: user.user_stat.days_visited
    },
    {
      label: 'Eventos consultados:',
      value: user.user_stat.viewed_events
    },
    {
      label: 'Me gustas dados:',
      value: user.user_stat.likes_given
    },
    {
      label: 'Me gustas recibidos:',
      value: user.user_stat.likes_given
    },
    {
      label: 'Penalizaciones:',
      value: user.user_stat.penalty_score
    },
    {
      label: 'Respuestas creadas:',
      value: user.user_stat.comments_count
    }
  ];

  return (
    <Grid container spacing={2}>
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

      <Grid item xs={12} sm={12} md={4}>
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
