import React, { useEffect, useState } from 'react';
import { MMContainer } from '../../../../components/MMContainer/MMContainer';
import { MMBox } from '../../../../components/MMBox/MMBox';
import { MMTitle } from '../../../../components/MMTitle/MMTitle';
import { Stack } from '@mui/material';
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import { MMButtonResponsive } from '../../../../components/MMButton/MMButtonResponsive';
import { useNavigate, useParams } from 'react-router-dom';
import { useModal } from '../../../../components/hooks/useModal';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';
import { MMModal } from '../../../../components/Modal/MMModal';
import { Loader } from '../../../../components/Loader/Loader';
import { Tooltip } from 'react-tooltip';
import '../../Admin.scss';
import { useEventsRequests } from '../hooks/useEventsRequests';
import { Event } from '../../../../models/Event';
import { adminGetEvent } from '../../../../services/eventService';
import { EventsForm } from '../../../../components/forms/events/EventsForm';
import { EventInfo } from './EventInfo';

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event>();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { handleDeleteEvent } = useEventsRequests();

  useEffect(() => {
    getEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getEvent = async () => {
    if (!id) return;

    try {
      const event = await adminGetEvent(id);

      setEvent(event);
    } catch (error) {
      errorSnackbar('Error al obtener el evento. Contacte a soporte.');
      navigate(-1);
    }
  };

  const handleDeleteButton = () => {
    if (!id) return;

    handleDeleteEvent(id, () => {
      navigate(-1);
    });
  };

  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="admin-box-container">
        <div className="admin-title-container">
          <MMTitle content="Evento" />

          <Stack direction={'row'} spacing={1} justifyContent={'flex-end'}>
            <MMButtonResponsive Icon={FaEdit} onClick={() => openModal()}>
              Editar
            </MMButtonResponsive>

            <MMButtonResponsive color="error" onClick={() => handleDeleteButton()} Icon={FaTrash}>
              Eliminar
            </MMButtonResponsive>

            <MMButtonResponsive Icon={FaArrowLeft} onClick={() => navigate(-1)}>
              Volver
            </MMButtonResponsive>
          </Stack>
        </div>

        {event ? (
          <>
            <MMModal title="Editar Evento" isModalOpen={isModalOpen} closeModal={closeModal} maxWidth="lg">
              <EventsForm
                isFormEdit={true}
                eventToEdit={event}
                closeFormModal={closeModal}
                successCallback={(event) => setEvent(event)}
              />
            </MMModal>
            <EventInfo event={event} />
          </>
        ) : (
          <Loader />
        )}
      </MMBox>
      <Tooltip id="tooltip" place="top" />
    </MMContainer>
  );
};

export default Show;
