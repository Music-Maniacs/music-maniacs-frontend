import React from 'react';
import { MMTable } from '../../../../components/MMTable/MMTable';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { FaEdit, FaSearch, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { useVenues } from '../context/venueContext';
import { useVenuesRequests } from '../hooks/useVenuesRequests';
import { Venue } from '../../../../models/Venue';

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
    handleDeleteVenue(venueId, () => setVenues((prevState) => prevState?.filter((venue) => venue.id !== venueId)));
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
