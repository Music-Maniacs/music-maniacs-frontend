import React, { FormEvent } from 'react';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { FaSearchPlus } from 'react-icons/fa';
import { useUsers } from '../context/userContext';
import { SearchInputText } from '../../../../components/searcher/InputText/SearchInputText';
import { SearchInputSelect } from '../../../../components/searcher/InputSelect/SearchInputSelect';
import { Grid } from '@mui/material';
import { StyledFloatRight } from '../../styles';

export const Searcher = () => {
  const { setPagination, queryParams } = useUsers();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPagination((prevState) => ({ ...prevState, isLoading: true }));
  };

  return (
    <form className="admin-search-container" onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={10} lg={11}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8} md={8} lg={8}>
              <SearchInputText
                paramKey="full_name_or_username_or_email_cont"
                placeholder="Buscar por Nombre, Usuarios o Email"
                queryParams={queryParams}
              />
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={4}>
              <SearchInputSelect
                paramKey="search_by_state"
                placeholder="Estado"
                queryParams={queryParams}
                containerWidth="100%"
                options={[
                  { label: 'Activo', value: 'active' },
                  { label: 'Bloqueado', value: 'blocked' },
                  { label: 'Eliminado', value: 'deleted' }
                ]}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={2} lg={1}>
          <StyledFloatRight>
            <MMButton type="submit">
              <FaSearchPlus />
              Buscar
            </MMButton>
          </StyledFloatRight>
        </Grid>
      </Grid>
    </form>
  );
};
