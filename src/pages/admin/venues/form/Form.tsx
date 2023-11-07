import React, { useEffect, useState } from 'react';
import { useVenues } from '../context/venueContext';
import { Venue } from '../../../../models/Venue';
import { VenuesForm } from '../../../../components/forms/venues/VenuesForm';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';
import { adminGetVenue } from '../../../../services/venueService';
import { Loader } from '../../../../components/Loader/Loader';
import { isAxiosError } from 'axios';

export const Form = () => {
  const { setVenues, closeFormModal, isFormEdit, venueIdToEdit, isFormModalOpen } = useVenues();
  const [isShowRequestLoading, setIsShowRequestLoading] = useState(false);
  const [venueToEdit, setVenueToEdit] = useState<Venue>();

  useEffect(() => {
    getVenue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFormModalOpen]);

  const getVenue = async () => {
    if (!venueIdToEdit) return;

    setIsShowRequestLoading(true);
    try {
      const venue = await adminGetVenue(venueIdToEdit);

      setVenueToEdit(venue);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 403) {
        errorSnackbar('No tienes permisos para realizar esta acción');

        return closeFormModal();
      }

      errorSnackbar('Error al obtener el espacio de eventos. Contacte a soporte.');
      closeFormModal();
    } finally {
      setIsShowRequestLoading(false);
    }
  };

  const successCallback = (venue: Venue) => {
    if (isFormEdit) {
      setVenues((venues) => venues?.map((v) => (v.id === venue.id ? venue : v)));
    } else {
      setVenues((venues) => [venue, ...(venues ?? [])]);
    }
  };

  return isShowRequestLoading ? (
    <Loader />
  ) : (
    <VenuesForm
      useAdminController={true}
      venueToEdit={venueToEdit}
      isFormEdit={isFormEdit}
      closeFormModal={closeFormModal}
      successCallback={successCallback}
    />
  );
};
