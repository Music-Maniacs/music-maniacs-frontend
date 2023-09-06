import React, { FormEvent } from 'react';
import { Grid } from '@mui/material';
import { SearchInputText } from '../../../../components/searcher/InputText/SearchInputText';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { FaSearchPlus } from 'react-icons/fa';
import { useEvents } from '../context/eventsContext';
import { SearchInputDate } from '../../../../components/searcher/InputDate/SearchInputDate';
import { SearchInputAsyncSelect } from '../../../../components/searcher/InputAsyncSelect/SearchInputAsyncSelect';

export const Searcher = () => {
  const { setPagination, queryParams } = useEvents();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPagination((prevState) => ({ ...prevState, isLoading: true, page: 1 }));
  };

  return (
    <form className="admin-search-container" onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <SearchInputText paramKey="name_cont" placeholder="Buscar por Nombre" queryParams={queryParams} />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={4}>
              <SearchInputDate
                paramKey="datetime_gteq"
                placeholder="Fecha Desde"
                queryParams={queryParams}
                type="datetime-local"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={4}>
              <SearchInputDate
                paramKey="datetime_lteq"
                placeholder="Fecha Hasta"
                queryParams={queryParams}
                type="datetime-local"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <SearchInputAsyncSelect
                placeholder="Artista"
                paramKey="artist_id_eq"
                name="artist"
                typeaheadUrl="/admin/artists/search_typeahead?q[name_cont]="
                queryParams={queryParams}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={4}>
              <SearchInputAsyncSelect
                placeholder="Productora"
                paramKey="producer_id_eq"
                name="producer"
                typeaheadUrl="/admin/producers/search_typeahead?q[name_cont]="
                queryParams={queryParams}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={4}>
              <SearchInputAsyncSelect
                placeholder="Espacio de Evento"
                paramKey="venue_id_eq"
                name="venue"
                typeaheadUrl="/admin/venues/search_typeahead?q[name_cont]="
                queryParams={queryParams}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} display={'flex'} justifyContent={'flex-end'} alignItems={'flex-end'}>
          <MMButton type="submit">
            <FaSearchPlus />
            Buscar
          </MMButton>
        </Grid>
      </Grid>
    </form>
  );
};
