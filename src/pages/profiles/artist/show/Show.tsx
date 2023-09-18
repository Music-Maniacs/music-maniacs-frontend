import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Artist } from '../../../../models/Artist';
import { useModal } from '../../../../components/hooks/useModal';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';
import { getArtist as serviceGetArtist } from '../../../../services/artistService';
import { MMModal } from '../../../../components/Modal/MMModal';
import { ArtistForm } from '../../../../components/forms/artist/ArtistForm';
import { MMContainer } from '../../../../components/MMContainer/MMContainer';
import { Breadcrumb } from '../../../../components/breadrumb/Breadcrumb';
import { Loader } from '../../../../components/Loader/Loader';
import { Tooltip } from 'react-tooltip';
import { ProfileInfoBox } from '../../components/ProfileInfoBox';
import '../../Profiles.scss';

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState<Artist>();
  const { isModalOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    getArtist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getArtist = async () => {
    if (!id) {
      navigate('/profiles');
      return errorSnackbar('No se encontró el artista');
    }

    try {
      const artist = await serviceGetArtist(id);

      setArtist(artist);
    } catch (error) {
      errorSnackbar('Error al obtener el artista. Contacte a soporte.');
      navigate('/profiles');
    }
  };

  return (
    <>
      <MMModal isModalOpen={isModalOpen} closeModal={closeModal} title="Editar Artista" maxWidth="lg">
        <ArtistForm
          isFormEdit={true}
          closeFormModal={closeModal}
          artistToEdit={artist}
          useAdminController={false}
          successCallback={(artist) => setArtist((prevArtist) => ({ ...prevArtist, ...artist }))}
        />
      </MMModal>

      <MMContainer maxWidth="xxl" className="profiles-show-boxes-container ">
        {artist ? (
          <>
            <Breadcrumb items={[{ label: 'Perfiles', onClick: () => navigate('/profiles') }, { label: artist.name }]} />

            {/* todo: agregar si lo esta siguiendo o no */}
            <ProfileInfoBox profile={artist} openEditModal={openModal} />

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
