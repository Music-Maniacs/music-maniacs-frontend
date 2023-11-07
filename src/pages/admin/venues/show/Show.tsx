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
import { VenueInfo } from './VenueInfo';
import '../../Admin.scss';
import { adminGetVenue } from '../../../../services/venueService';
import { Venue } from '../../../../models/Venue';
import { useVenuesRequests } from '../hooks/useVenuesRequests';
import { VenuesForm } from '../../../../components/forms/venues/VenuesForm';
import { VersionBox } from '../../../../components/versions/VersionBox';
import { MMChip } from '../../../../components/MMChip/MMChip';
import { StyledFlex } from '../../../../styles/styledComponents';
import { Policy } from '../../../../models/Policy';
import { checkPolicy } from '../../../../services/policyService';
import { isAxiosError } from 'axios';

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState<Venue>();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { handleDeleteVenue } = useVenuesRequests();
  const [policies, setPolicies] = useState<Policy>();

  useEffect(() => {
    getVenue();
    getPolicy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPolicy = async () => {
    try {
      const response = await checkPolicy('Admin::VenuesController');

      setPolicies(response);
    } catch (error) {
      errorSnackbar('Error al obtener los permisos. Contacte a soporte');
    }
  };

  const getVenue = async () => {
    if (!id) return;

    try {
      const venue = await adminGetVenue(id);

      setVenue(venue);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 403) {
        errorSnackbar('No tienes permisos para realizar esta acción');

        return navigate('/');
      }

      errorSnackbar('Error al obtener el espacio de eventos. Contacte a soporte.');
      navigate(-1);
    }
  };

  const handleDeleteButton = () => {
    if (!id) return;

    handleDeleteVenue(id, () => {
      setVenue((prevState) => {
        if (prevState) {
          const newState = { ...prevState };
          newState.deleted_at = new Date().toString();
          return newState;
        }
      });
    });
  };

  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="admin-box-container">
        <div className="admin-title-container">
          <StyledFlex $alignItems="center" $gap="10px">
            <MMTitle content="Espacio de Evento" />

            {venue && venue.deleted_at && <MMChip color="error">Eliminado</MMChip>}
          </StyledFlex>

          <Stack direction={'row'} spacing={1} justifyContent={'flex-end'}>
            {policies?.update && (
              <MMButtonResponsive Icon={FaEdit} onClick={() => openModal()}>
                Editar
              </MMButtonResponsive>
            )}

            {!venue?.deleted_at && policies?.destroy && (
              <MMButtonResponsive color="error" onClick={() => handleDeleteButton()} Icon={FaTrash}>
                Eliminar
              </MMButtonResponsive>
            )}

            <MMButtonResponsive Icon={FaArrowLeft} onClick={() => navigate(-1)}>
              Volver
            </MMButtonResponsive>
          </Stack>
        </div>

        {venue ? (
          <>
            <MMModal title="Editar Espacio de Evento" isModalOpen={isModalOpen} closeModal={closeModal} maxWidth="lg">
              <VenuesForm
                useAdminController={true}
                isFormEdit={true}
                venueToEdit={venue}
                closeFormModal={closeModal}
                successCallback={(venue) => setVenue(venue)}
              />
            </MMModal>
            <VenueInfo venue={venue} />
          </>
        ) : (
          <Loader />
        )}
      </MMBox>

      {venue && <VersionBox versions={venue.history} customClassName="admin-versions-box-container" />}
      <Tooltip id="tooltip" place="top" />
    </MMContainer>
  );
};

export default Show;
