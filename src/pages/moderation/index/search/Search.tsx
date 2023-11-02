import React, { FormEvent } from 'react';
import { useReports } from '../../context/moderationContext';
import { Grid } from '@mui/material';
import { StyledFloatRight } from '../../../admin/styles';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { FaSearchPlus } from 'react-icons/fa';
import { SearchInputSelect } from '../../../../components/searcher/InputSelect/SearchInputSelect';
import { SearchInputDate } from '../../../../components/searcher/InputDate/SearchInputDate';
import { reportCategoriesCollection, reportableTypeTranslated } from '../../../../models/Report';

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
                  paramKey="reportable_type_eq"
                  placeholder="Contenido Reportado"
                  queryParams={queryParams}
                  containerWidth="100%"
                  options={Object.entries(reportableTypeTranslated).map(([key, value]) => ({
                    label: value,
                    value: key
                  }))}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2.4}>
                <SearchInputSelect
                  paramKey="category_eq"
                  placeholder="Categoría"
                  queryParams={queryParams}
                  containerWidth="100%"
                  options={reportCategoriesCollection}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2.4}>
                <SearchInputSelect
                  paramKey="status_eq"
                  placeholder="Estado"
                  queryParams={queryParams}
                  containerWidth="100%"
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
