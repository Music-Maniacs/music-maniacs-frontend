import React from 'react';
import { MMTable } from '../../../../components/MMTable/MMTable';
import { Genre } from '../../../../models/Genre';
import { useGenres } from '../context/genreContext';
import { Stack } from '@mui/material';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useGenreRequests } from '../hooks/useGenreRequests';
import { useCollection } from '../../../../context/collectionContext';

export const Table = () => {
  const { setGenreToEdit, genres, pagination, setPagination, openFormModal } = useGenres();
  const { handleDeleteGenre } = useGenreRequests();
  const { removeGenreInCollection } = useCollection();

  const handleDeleteButton = (genreId: string) => {
    handleDeleteGenre(genreId, () => {
      removeGenreInCollection(genreId);
      setPagination((prevPagination) => ({
        ...prevPagination,
        page:
          Math.round((prevPagination.total - 1) / prevPagination.perPage + 0.5) === prevPagination.page &&
          (prevPagination.total - 1) / prevPagination.perPage <= prevPagination.page - 1
            ? prevPagination.page - 1
            : prevPagination.page,
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
                  data-tooltip-content="Editar"
                  onClick={() => {
                    setGenreToEdit(rowData);
                    openFormModal();
                  }}
                >
                  <FaEdit />
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
