import React, { useEffect, useState } from 'react';
import { MMContainer } from '../../../../components/MMContainer/MMContainer';
import { MMBox } from '../../../../components/MMBox/MMBox';
import { MMTitle } from '../../../../components/MMTitle/MMTitle';
import { Stack } from '@mui/material';
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import { MMButtonResponsive } from '../../../../components/MMButton/MMButtonResponsive';
import { useNavigate, useParams } from 'react-router-dom';
import { Artist } from '../../../../models/Artist';
import { useModal } from '../../../../components/hooks/useModal';
import { useArtistsRequests } from '../hooks/useArtistsRequest';
import { adminGetArtist } from '../../../../services/artistService';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';
import { MMModal } from '../../../../components/Modal/MMModal';
import { Loader } from '../../../../components/Loader/Loader';
import { Tooltip } from 'react-tooltip';
import { ArtistInfo } from './ArtistInfo';
import '../../Admin.scss';
import { ArtistForm } from '../../../../components/forms/artist/ArtistForm';
import { VersionBox } from '../../../../components/versions/VersionBox';
import { StyledFlex } from '../../../../styles/styledComponents';
import { MMChip } from '../../../../components/MMChip/MMChip';
import { isAxiosError } from 'axios';
import { checkPolicy } from '../../../../services/policyService';
import { Policy } from '../../../../models/Policy';

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState<Artist>();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { handleDeleteArtist } = useArtistsRequests();
  const [policies, setPolicies] = useState<Policy>();

  useEffect(() => {
    getArtist();
    getPolicy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getArtist = async () => {
    if (!id) return;

    try {
      const user = await adminGetArtist(id);

      setArtist(user);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 403) {
        errorSnackbar(`No tienes permisos para ver artistas.`);

        return navigate('/');
      }

      errorSnackbar('Error al obtener el artista. Contacte a soporte.');
      navigate(-1);
    }
  };

  const getPolicy = async () => {
    try {
      const response = await checkPolicy('Admin::ArtistsController');

      setPolicies(response);
    } catch (error) {
      errorSnackbar('Error al obtener los permisos. Contacte a soporte');
    }
  };

  const handleDeleteButton = () => {
    if (!id) return;

    handleDeleteArtist(id, () => {
      setArtist((prevState) => {
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
            <MMTitle content="Artista" />

            {artist && artist.deleted_at && <MMChip color="error">Eliminado</MMChip>}
          </StyledFlex>

          <Stack direction={'row'} spacing={1} justifyContent={'flex-end'}>
            {policies?.update && (
              <MMButtonResponsive Icon={FaEdit} onClick={() => openModal()}>
                Editar
              </MMButtonResponsive>
            )}

            {!artist?.deleted_at && policies?.destroy && (
              <MMButtonResponsive color="error" onClick={() => handleDeleteButton()} Icon={FaTrash}>
                Eliminar
              </MMButtonResponsive>
            )}

            <MMButtonResponsive Icon={FaArrowLeft} onClick={() => navigate(-1)}>
              Volver
            </MMButtonResponsive>
          </Stack>
        </div>

        {artist ? (
          <>
            <MMModal title="Editar Artista" isModalOpen={isModalOpen} closeModal={closeModal} maxWidth="lg">
              <ArtistForm
                useAdminController={true}
                isFormEdit={true}
                artistToEdit={artist}
                closeFormModal={closeModal}
                successCallback={(artist) => setArtist(artist)}
              />
            </MMModal>
            <ArtistInfo artist={artist} />
          </>
        ) : (
          <Loader />
        )}
      </MMBox>

      {artist && <VersionBox versions={artist.history} customClassName="admin-versions-box-container" />}
      <Tooltip id="tooltip" place="top" />
    </MMContainer>
  );
};

export default Show;
