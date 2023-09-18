import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useModal } from '../../../../components/hooks/useModal';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';
import { MMModal } from '../../../../components/Modal/MMModal';
import { MMContainer } from '../../../../components/MMContainer/MMContainer';
import { Breadcrumb } from '../../../../components/breadrumb/Breadcrumb';
import { Loader } from '../../../../components/Loader/Loader';
import { Tooltip } from 'react-tooltip';
import { ProfileInfoBox } from '../../components/ProfileInfoBox';
import { Venue } from '../../../../models/Venue';
import { VenuesForm } from '../../../../components/forms/venues/VenuesForm';
import { getVenue as serviceGetVenue } from '../../../../services/venueService';
import '../../Profiles.scss';

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState<Venue>();
  const { isModalOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    getVenue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getVenue = async () => {
    if (!id) {
      navigate('/profiles');
      return errorSnackbar('No se encontró el espacio de evento.');
    }

    try {
      const venue = await serviceGetVenue(id);

      setVenue(venue);
    } catch (error) {
      errorSnackbar('Error al obtener el espacio de evento. Contacte a soporte.');
      navigate('/profiles');
    }
  };

  return (
    <>
      <MMModal isModalOpen={isModalOpen} closeModal={closeModal} title="Editar Productora" maxWidth="lg">
        <VenuesForm
          isFormEdit={true}
          closeFormModal={closeModal}
          venueToEdit={venue}
          useAdminController={false}
          successCallback={(venue) => setVenue((prevVenue) => ({ ...prevVenue, ...venue }))}
        />
      </MMModal>

      <MMContainer maxWidth="xxl" className="profiles-show-boxes-container ">
        {venue ? (
          <>
            <Breadcrumb items={[{ label: 'Perfiles', onClick: () => navigate('/profiles') }, { label: venue.name }]} />

            {/* todo: agregar si lo esta siguiendo o no */}
            <ProfileInfoBox profile={venue} openEditModal={openModal} />

            {/* <EventReviewBox event={event} setEvent={setEvent} /> */}
          </>
        ) : (
          <Loader />
        )}
      </MMContainer>

      <Tooltip id="tooltip" place="top" />
    </>
  );
};

export default Show;
