import React, { FormEvent } from 'react';
import { useReports } from '../../context/moderationContext';
import { Grid } from '@mui/material';
import { StyledFloatRight } from '../../../admin/styles';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { FaSearchPlus } from 'react-icons/fa';
import { SearchInputSelect } from '../../../../components/searcher/InputSelect/SearchInputSelect';
import { SearchInputDate } from '../../../../components/searcher/InputDate/SearchInputDate';

export const Search = () => {
  const { setPagination, queryParams } = useReports();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPagination((prevState) => ({ ...prevState, isLoading: true, page: 1 }));
  };

  return (
    <>
      <br />

      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4} lg={2.4}>
                <SearchInputSelect
                  paramKey="category_eq"
                  placeholder="Categoría"
                  queryParams={queryParams}
                  containerWidth="100%"
                  // todo: ver si matchean con el enum del backend
                  options={[
                    { label: 'inappropriate_content', value: 0 },
                    { label: 'spam', value: 1 },
                    { label: 'other', value: 2 },
                    { label: 'fake', value: 3 },
                    { label: 'duplicated', value: 4 },
                    { label: 'doesnt_belong_to_event', value: 5 },
                    { label: 'incorrect_artist', value: 6 },
                    { label: 'incorrect_producer', value: 7 },
                    { label: 'incorrect_venue', value: 8 }
                  ]}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2.4}>
                <SearchInputSelect
                  paramKey="reportable_type_eq"
                  placeholder="Tipo de Reporte"
                  queryParams={queryParams}
                  containerWidth="100%"
                  // todo: ver si matchean con el enum del backend
                  options={[
                    { label: 'Comentario', value: 'Comment' },
                    { label: 'Espacio de Eventos', value: 'Venue' },
                    { label: 'Artista', value: 'Artist' },
                    { label: 'Productora', value: 'Producer' },
                    { label: 'Evento', value: 'Event' },
                    { label: 'Video', value: 'Video' },
                    { label: 'Reseña', value: 'Review' },
                    { label: 'Versión', value: 'Version' }
                  ]}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2.4}>
                <SearchInputSelect
                  paramKey="status_eq"
                  placeholder="Estado"
                  queryParams={queryParams}
                  containerWidth="100%"
                  // todo: ver si matchean con el enum del backend
                  options={[
                    { label: 'Pendiente', value: 0 },
                    { label: 'Resuelto', value: 1 },
                    { label: 'Ignorado', value: 2 }
                  ]}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2.4}>
                <SearchInputDate
                  paramKey="created_at_gteq"
                  placeholder="Fecha Creado Desde"
                  type="datetime-local"
                  queryParams={queryParams}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2.4}>
                <SearchInputDate
                  paramKey="created_at_lteq"
                  placeholder="Fecha Creado Hasta"
                  type="datetime-local"
                  queryParams={queryParams}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <StyledFloatRight>
              <MMButton type="submit">
                <FaSearchPlus />
                Buscar
              </MMButton>
            </StyledFloatRight>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
