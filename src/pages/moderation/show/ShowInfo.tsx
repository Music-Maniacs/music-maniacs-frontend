import React from 'react';
import { Grid } from '@mui/material';
import { StyledBoldText, StyledDataContainer } from '../../admin/styles';
import { InputText } from '../../../components/form/InputText/InputText';
import { Report, reportCategoriesTranslated, reportableTypeTranslated } from '../../../models/Report';
import { formatDate } from '../../../utils/formatDate';
import { InputArea } from '../../../components/form/InputArea/InputArea';

type Props = {
  report: Report;
};

export const ShowInfo = ({ report }: Props) => {
  const firstColumn = [
    {
      label: 'Contenido Reportado',
      content: <InputText disabled value={reportableTypeTranslated[report.reportable_type]} />
    },
    {
      label: 'Categoria',
      content: <InputText disabled value={reportCategoriesTranslated[report.category] ?? ''} />
    },
    {
      label: 'Fecha Reporte',
      content: <InputText disabled value={formatDate({ date: report.created_at })} />
    },
    {
      label: 'Fecha Actualización Reporte',
      content: <InputText disabled value={formatDate({ date: report.updated_at })} />
    }
  ];

  const secondColumn = [
    {
      label: 'Usuario que reportó',
      content: <InputText disabled value={report.reporter?.full_name ?? ''} />
    },
    {
      label: 'Usuario Reportado',
      content: <InputText disabled value={report.author?.full_name ?? ''} />
    },
    {
      label: 'Usuario que resolvió el reporte',
      content: <InputText disabled value={report.resolver?.full_name ?? ''} />
    },
    {
      label: 'Penalización',
      content: <InputText disabled value={report.penalization_score ?? ''} />
    }
  ];

  const thirdColumn = [
    {
      label: 'Comentario Usuario',
      content: <InputArea containerWidth="100%" disabled rows={5} value={report.user_comment ?? ''} />
    },
    {
      label: 'Comentario Moderador',
      content: <InputArea containerWidth="100%" disabled rows={5} value={report.moderator_comment ?? ''} />
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

      <Grid item sm={12} md={4}>
        {thirdColumn.map((stat, index) => (
          <StyledDataContainer key={index}>
            <StyledBoldText>{stat.label}</StyledBoldText>
            {stat.content}
          </StyledDataContainer>
        ))}
      </Grid>
    </Grid>
  );
};
