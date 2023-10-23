import React, { FormEvent } from 'react';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { FaSearchPlus } from 'react-icons/fa';
import { useTrustLevels } from '../context/trustLevelContext';
import { SearchInputText } from '../../../../components/searcher/InputText/SearchInputText';
import { Grid } from '@mui/material';
import { StyledFloatRight } from '../../styles';

export const Searcher = () => {
  const { setPagination, queryParams } = useTrustLevels();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPagination((prevState) => ({ ...prevState, isLoading: true, page: 1 }));
  };

  return (
    <form className="admin-search-container" onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={10} lg={11}>
          <SearchInputText paramKey="name_cont" placeholder="Buscar por Nombre" queryParams={queryParams} />
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
