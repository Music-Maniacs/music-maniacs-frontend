import React from 'react';
import { MMTable } from '../../../../components/MMTable/MMTable';
import { Genre } from '../../../../models/Genre';
import { useGenres } from '../context/genreContext';
import { Stack } from '@mui/material';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { FaSearch, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useGenreRequests } from '../hooks/useGenreRequests';

export const Table = () => {
  const navigate = useNavigate();
  const { genres, pagination, setPagination } = useGenres();
  const { handleDeleteGenre } = useGenreRequests();

  const handleShowButton = (genreId: string, genreName: string) => {
    navigate(`/admin/genres/${genreId}/${genreName}`);
  };

  const handleDeleteButton = (genreId: string) => {
    handleDeleteGenre(genreId, () => {
        setPagination(prevPagination => ({
            ...prevPagination,
            page: (Math.round( (prevPagination.total-1)/prevPagination.perPage+0.5)===prevPagination.page) 
            && (prevPagination.total-1)/prevPagination.perPage <= (prevPagination.page-1) ?
             prevPagination.page-1 : prevPagination.page,
            isLoading: true
          }));
    });
  };

  return (
    <MMTable<Genre>
      data={genres}
      isLoading={pagination.isLoading}
      columns={[
        {
          header: 'Nombre',
          renderCell: (rowData) => {
            return rowData.name;
          }
        },
        {
          header: 'Acciones',
          renderCell: (rowData) => {
            return (
              <Stack direction={'row'} spacing={1}>
                <MMButton
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Ver"
                  onClick={() => handleShowButton(rowData.id,rowData.name)}
                >
                  <FaSearch />
                </MMButton>
                <MMButton
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Eliminar"
                      onClick={() => handleDeleteButton(rowData.id)}
                    >
                    <FaTrash />
                </MMButton>
              </Stack>
            );
          },
          cellProps: {
            width: '1%'
          }
        }
      ]}
    />
  );
};
