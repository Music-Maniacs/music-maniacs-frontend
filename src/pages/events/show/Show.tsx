import React, { useEffect, useState } from 'react';
import { MMModal } from '../../../components/Modal/MMModal';
import { EventsForm } from '../../../components/forms/events/EventsForm';
import { Event } from '../../../models/Event';
import { useModal } from '../../../components/hooks/useModal';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { MMBox } from '../../../components/MMBox/MMBox';
import { useParams } from 'react-router-dom';

const Show = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event>();
  const { isModalOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    if (!id) return;

    getEvent(id);
  }, []);

  const getEvent = async (id: string) => {
    // Fetch Event

    const event: Event = {
      id: '8804034a-b377-4451-8b44-2daf541b2b88',
      name: 'Evento Nro 1 Evento Nro 1 Evento Nro 1 Evento Nro 1',
      datetime: '2021-10-10T10:00:00.000Z',
      description: 'Descripcion numero 1',
      artist: {
        name: 'Artista Nro 1'
      },
      venue: {
        name: 'Lugar Nro 1'
      },
      producer: {
        name: 'Productor Nro 1'
      },
      links: []
    };
    setEvent(event);
  };

  return (
    <>
      <MMModal isModalOpen={isModalOpen} closeModal={closeModal} title="Editar Evento" maxWidth="lg">
        <EventsForm isFormEdit={true} eventToEdit={event} closeFormModal={closeModal} useAdminController={false} />
      </MMModal>

      <MMContainer maxWidth="xxl" className="events-show-boxes-container ">
        <MMBox className="show-boxes">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>Image</div>
            <div style={{ flexGrow: 1 }}>Data</div>
            <div>Opciones</div>
          </div>
        </MMBox>
        <MMBox className="show-boxes">hola</MMBox>
        <MMBox className="show-boxes">hola</MMBox>
        <MMBox className="show-boxes">hola</MMBox>
      </MMContainer>
    </>
  );
};

export default Show;
