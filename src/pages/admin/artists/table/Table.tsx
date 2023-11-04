import React from 'react';
import { MMTable } from '../../../../components/MMTable/MMTable';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { FaEdit, FaSearch, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useArtists } from '../context/artistContext';
import { Artist } from '../../../../models/Artist';
import { Stack } from '@mui/material';
import { useArtistsRequests } from '../hooks/useArtistsRequest';
import { MMChip } from '../../../../components/MMChip/MMChip';

export const Table = () => {
  const navigate = useNavigate();
  const { artists, pagination, setArtists, openFormModal, setIsFormEdit, setArtistToEdit } = useArtists();
  const { handleDeleteArtist } = useArtistsRequests();

  const handleShowButton = (artistId: string) => {
    navigate(`/admin/artists/${artistId}`);
  };

  const handleEditButton = (artist: Artist) => {
    setIsFormEdit(true);
    setArtistToEdit(artist);
    openFormModal();
  };

  const handleDeleteButton = (artistId: string) => {
    handleDeleteArtist(artistId, () => {
      setArtists((prevState) => {
        if (prevState) {
          const newState = [...prevState];
          const artistIndex = newState.findIndex((artist) => artist.id === artistId);

          if (artistIndex === -1) return prevState;

          newState[artistIndex].deleted_at = new Date().toString();
          return newState;
        }
      });
    });
  };

  return (
    <MMTable<Artist>
      data={artists}
      isLoading={pagination.isLoading}
      columns={[
        {
          header: 'Nombre',
          renderCell: (rowData) => {
            return rowData.name;
          }
        },
        {
          header: 'Nacionalidad',
          renderCell: (rowData) => {
            return rowData.nationality;
          }
        },
        {
          header: '',
          renderCell: (rowData) => {
            return rowData.deleted_at && <MMChip color="error">Eliminado</MMChip>;
          },
          cellProps: {
            width: '1%'
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
                  onClick={() => handleShowButton(rowData.id)}
                >
                  <FaSearch />
                </MMButton>

                <MMButton
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Editar"
                  onClick={() => handleEditButton(rowData)}
                >
                  <FaEdit />
                </MMButton>

                {!rowData.deleted_at && (
                  <MMButton
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Eliminar"
                    onClick={() => handleDeleteButton(rowData.id)}
                  >
                    <FaTrash />
                  </MMButton>
                )}
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
