import React from 'react';
import { sweetAlert } from '../../../../components/SweetAlert/sweetAlert';
import { warningSnackbar } from '../../../../components/Snackbar/Snackbar';
import { MMTable } from '../../../../components/MMTable/MMTable';
import { Genre, stateColors, stateNames } from '../../../../models/Genre';
import { useGenres } from '../context/genreContext';
import { MMColors } from '../../../../models/Generic';
import colors from '../../../../styles/_colors.scss';
import { Stack } from '@mui/material';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { FaLock, FaSearch, FaTrash, FaTrashRestore, FaUnlock } from 'react-icons/fa';
import { MMChip } from '../../../../components/MMChip/MMChip';
import { useNavigate } from 'react-router-dom';
import { useGenreRequests } from '../hooks/useGenreRequests';

export const Table = () => {
  const navigate = useNavigate();
  const { genres, pagination, setPagination, setGenres } = useGenres();
  const { handleDeleteGenre } = useGenreRequests();

  const handleShowButton = (genreId: string, genreName: string) => {
    navigate(`/admin/genres/${genreId}/${genreName}`);
  };

  const handleDeleteButton = (genreId: string) => {
    handleDeleteGenre(genreId, () => {
        setPagination(prevPagination => ({
            ...prevPagination,
            page: (Math.round( (prevPagination.total-1)/prevPagination.perPage+0.5)==prevPagination.page) 
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
