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

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState<Artist>();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { handleDeleteArtist } = useArtistsRequests();

  useEffect(() => {
    getArtist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getArtist = async () => {
    if (!id) return;

    try {
      const user = await adminGetArtist(id);

      setArtist(user);
    } catch (error) {
      errorSnackbar('Error al obtener el artista. Contacte a soporte.');
      navigate(-1);
    }
  };

  const handleDeleteButton = () => {
    if (!id) return;

    handleDeleteArtist(id, () => {
      navigate(-1);
    });
  };

  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="admin-box-container">
        <div className="admin-title-container">
          <MMTitle content="Artista" />

          <Stack direction={'row'} spacing={1} justifyContent={'flex-end'} width={'100%'}>
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
      <Tooltip id="tooltip" place="top" />
    </MMContainer>
  );
};

export default Show;
