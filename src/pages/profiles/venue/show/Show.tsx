import React from 'react';
import { useModal } from '../../../../components/hooks/useModal';
import { MMModal } from '../../../../components/Modal/MMModal';
import { MMContainer } from '../../../../components/MMContainer/MMContainer';
import { Breadcrumb } from '../../../../components/breadrumb/Breadcrumb';
import { Loader } from '../../../../components/Loader/Loader';
import { Tooltip } from 'react-tooltip';
import { ProfileInfoBox } from '../../components/ProfileInfoBox';
import { VenuesForm } from '../../../../components/forms/venues/VenuesForm';
import '../../Profiles.scss';
import { VersionBox } from '../../../../components/versions/VersionBox';
import { ProfileEventsBox } from '../../components/ProfileEventsBox';
import { ProfileReviewsBox } from '../../components/ProfileReviewsBox';
import { useVenue } from '../context/venueContext';

const Show = () => {
  const { venue, setVenue } = useVenue();
  const { isModalOpen, openModal, closeModal } = useModal();

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
            <Breadcrumb items={[{ label: 'Perfiles', to: '/profiles' }, { label: venue.name }]} />

            {/* todo: agregar si lo esta siguiendo o no */}
            <ProfileInfoBox profile={venue} openEditModal={openModal} />

            <ProfileEventsBox profile={venue} />

            <ProfileReviewsBox profile={venue} reviewableKlass="venue" />

            <VersionBox versions={venue.versions} />
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
