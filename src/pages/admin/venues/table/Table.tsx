import React from 'react';
import { MMTable } from '../../../../components/MMTable/MMTable';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { FaEdit, FaSearch, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { useVenues } from '../context/venueContext';
import { useVenuesRequests } from '../hooks/useVenuesRequests';
import { Venue } from '../../../../models/Venue';
import { MMChip } from '../../../../components/MMChip/MMChip';

export const Table = () => {
  const navigate = useNavigate();
  const { venues, pagination, setVenues, openFormModal, setIsFormEdit, setVenueIdToEdit } = useVenues();
  const { handleDeleteVenue } = useVenuesRequests();

  const handleShowButton = (venueId: string) => {
    navigate(`/admin/venues/${venueId}`);
  };

  const handleEditButton = (venueId: string) => {
    setIsFormEdit(true);
    setVenueIdToEdit(venueId);
    openFormModal();
  };

  const handleDeleteButton = (venueId: string) => {
    handleDeleteVenue(venueId, () => {
      setVenues((prevState) => {
        if (prevState) {
          const newState = [...prevState];
          const venueIndex = newState.findIndex((venue) => venue.id === venueId);

          if (venueIndex === -1) return prevState;

          newState[venueIndex].deleted_at = new Date().toString();
          return newState;
        }
      });
    });
  };

  return (
    <MMTable<Venue>
      data={venues}
      isLoading={pagination.isLoading}
      columns={[
        {
          header: 'Nombre',
          renderCell: (rowData) => {
            return rowData.name;
          }
        },
        {
          header: 'Ubicación',
          renderCell: (rowData) => {
            return rowData.address;
          }
        },
        {
          header: 'Descripción',
          renderCell: (rowData) => {
            return rowData.description;
          },
          cellProps: {
            style: {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '250px'
            }
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
                  onClick={() => handleEditButton(rowData.id)}
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
