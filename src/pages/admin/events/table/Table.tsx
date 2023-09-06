import React from 'react';
import { MMTable } from '../../../../components/MMTable/MMTable';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { FaEdit, FaSearch, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { useEventsRequests } from '../hooks/useEventsRequests';
import { useEvents } from '../context/eventsContext';
import { Event } from '../../../../models/Event';
import { formatDate } from '../../../../utils/formatDate';

export const Table = () => {
  const navigate = useNavigate();
  const { events, pagination, setEvents, openFormModal, setIsFormEdit, setEventIdToEdit } = useEvents();
  const { handleDeleteEvent } = useEventsRequests();

  const handleShowButton = (eventId: string) => {
    navigate(`/admin/events/${eventId}`);
  };

  const handleEditButton = (eventId: string) => {
    setIsFormEdit(true);
    setEventIdToEdit(eventId);
    openFormModal();
  };

  const handleDeleteButton = (eventId: string) => {
    handleDeleteEvent(eventId, () => setEvents((prevState) => prevState?.filter((event) => event.id !== eventId)));
  };

  return (
    <MMTable<Event>
      data={events}
      isLoading={pagination.isLoading}
      columns={[
        {
          header: 'Nombre',
          renderCell: (rowData) => {
            return rowData.name;
          }
        },
        {
          header: 'Fecha',
          renderCell: (rowData) => {
            return formatDate({ date: rowData.datetime, format: 'slashWithTime' });
          }
        },
        {
          header: 'Artista',
          renderCell: (rowData) => {
            return rowData.artist.name;
          }
        },
        {
          header: 'Espacio de evento',
          renderCell: (rowData) => {
            return rowData.venue.name;
          }
        },
        {
          header: 'Productora',
          renderCell: (rowData) => {
            return rowData.producer.name;
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
