import { Grid } from '@mui/material';
import React, { FormEvent } from 'react';
import { useDashboard } from '../context/dashboardContext';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { FaSearchPlus } from 'react-icons/fa';
import { SearchInputDatePicker } from '../components/SearchInputDatePicker';

export const Searcher = () => {
  const { queryParams, fetchGraphs } = useDashboard();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchGraphs();
  };

  return (
    <form onSubmit={handleFormSubmit} style={{ margin: '20px 0' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SearchInputDatePicker label="Fecha Desde" paramKey="startDate" queryParams={queryParams} />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SearchInputDatePicker label="Fecha Hasta" paramKey="endDate" queryParams={queryParams} />
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={3} className="dashboard-searcher--button-container">
          <MMButton type="submit">
            <FaSearchPlus />
            Buscar
          </MMButton>
        </Grid>
      </Grid>
    </form>
  );
};
