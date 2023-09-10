import React from 'react';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMTitle } from '../../../components/MMTitle/MMTitle';
import { MMButtonResponsive } from '../../../components/MMButton/MMButtonResponsive';
import { FaPlus } from 'react-icons/fa';
import { useModal } from '../../../components/hooks/useModal';
import { MMModal } from '../../../components/Modal/MMModal';
import { EventsForm } from '../../../components/forms/events/EventsForm';
import { useEvents } from '../context/eventsContext';
import { Loader } from '../../../components/Loader/Loader';
import { Grid } from '@mui/material';
import { EventCard } from '../components/EventCard';
import '../Events.scss';
import { Event } from '../../../models/Event';

const Index = () => {
  const { pagination, events } = useEvents();
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleCreateButton = () => {
    openModal();
  };

  return (
    <>
      <MMModal isModalOpen={isModalOpen} closeModal={closeModal} title="Crear Evento" maxWidth="lg">
        <EventsForm closeFormModal={closeModal} useAdminController={false} />
      </MMModal>

      <MMContainer maxWidth="xxl">
        <MMBox className="events-box-container">
          <div className="events-title-container">
            <MMTitle content="Eventos" />
            <MMButtonResponsive onClick={handleCreateButton} Icon={FaPlus}>
              Crear Evento
            </MMButtonResponsive>
          </div>

          {pagination.isLoading ? (
            <Loader />
          ) : (
            <Grid container spacing={4} justifyContent="center" alignItems="center" marginTop={'1rem'}>
              {events &&
                events.map((e: Event) => (
                  <Grid
                    key={e.id}
                    item
                    container
                    xs={12}
                    sm={4}
                    md={3}
                    lg={2}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <EventCard event={e} />
                  </Grid>
                ))}
            </Grid>
          )}
        </MMBox>
      </MMContainer>
    </>
  );
};

export default Index;
