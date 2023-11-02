import React from 'react';
import { MMBox } from '../MMBox/MMBox';
import { MMSubTitle } from '../MMTitle/MMTitle';
import { Version } from '../../models/Version';
import { StyledFlex, StyledFlexColumn } from '../../styles/styledComponents';
import colors from '../../styles/_colors.scss';
import { BiUserCircle } from 'react-icons/bi';
import { formatDate } from '../../utils/formatDate';
import { MMChip } from '../MMChip/MMChip';
import { Dictionary, MMColors } from '../../models/Generic';
import { Grid } from '@mui/material';

type Props = {
  versions: Version[];
  customClassName?: string;
};

const colorByEventType = {
  create: 'tertiary',
  update: 'primary',
  destroy: 'warning'
};

const eventTranslation = {
  create: 'Creación',
  update: 'Actualización',
  destroy: 'Eliminación'
};

const attrTranslation: Dictionary = {
  artist: 'Artista',
  datetime: 'Fecha y Hora',
  description: 'Descripción',
  name: 'Nombre',
  nationality: 'Nacionalidad',
  producer: 'Productora',
  venue: 'Espacio de Evento'
};

export const VersionBox = ({ versions, customClassName }: Props) => {
  return (
    <MMBox className={`${customClassName ?? 'show-boxes'}`}>
      <MMSubTitle content="Versiones" />

      <StyledFlexColumn $gap="10px">
        {[...versions].reverse().map((version) => (
          <StyledFlexColumn
            $padding="3px 0px"
            $margin="3px 0px"
            $borderBottom={`1px solid ${colors.input_border}`}
            $gap="10px"
            key={version.id}
          >
            <StyledFlex $gap="5px">
              <StyledFlex>
                <BiUserCircle size={'2rem'} />
              </StyledFlex>

              <StyledFlexColumn $gap="2px">
                <span>{version.anonymous ? 'Usuario Eliminado' : version.user?.full_name}</span>
                <small>{formatDate({ date: version.created_at, format: 'slashWithTime' })}</small>
              </StyledFlexColumn>

              <MMChip color={(colorByEventType[version.event] as MMColors) ?? 'primary'}>
                {eventTranslation[version.event]}
              </MMChip>
            </StyledFlex>

            {Object.keys(version.named_object_changes).length > 0 &&
              Object.entries(version.named_object_changes).map(([key, value]) => (
                <Grid container key={key} spacing={2}>
                  <Grid item sm={12} md={2}>
                    <span>
                      Atributo: <b>{attrTranslation[key] ?? key}</b>
                    </span>
                  </Grid>
                  {version.event === 'update' && (
                    <Grid item sm={12} md={5}>
                      <span>
                        Valor Anterior: <b>{value[0]}</b>
                      </span>
                    </Grid>
                  )}
                  <Grid item sm={12} md={version.event === 'update' ? 5 : 10}>
                    <span>
                      Valor Nuevo: <b>{value[1]}</b>
                    </span>
                  </Grid>
                </Grid>
              ))}
          </StyledFlexColumn>
        ))}
      </StyledFlexColumn>
    </MMBox>
  );
};
