import React from 'react';
import { useModal } from '../../../../components/hooks/useModal';
import { MMModal } from '../../../../components/Modal/MMModal';
import { ArtistForm } from '../../../../components/forms/artist/ArtistForm';
import { MMContainer } from '../../../../components/MMContainer/MMContainer';
import { Breadcrumb } from '../../../../components/breadrumb/Breadcrumb';
import { Loader } from '../../../../components/Loader/Loader';
import { Tooltip } from 'react-tooltip';
import { ProfileInfoBox } from '../../components/ProfileInfoBox';
import '../../Profiles.scss';
import { useArtist } from '../context/artistContext';
import { VersionBox } from '../../../../components/versions/VersionBox';
import { ProfileEventsBox } from '../../components/ProfileEventsBox';
import { ProfileReviewsBox } from '../../components/ProfileReviewsBox';

const Show = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { artist, setArtist } = useArtist();

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

      <MMContainer maxWidth="xxl" className="profiles-show-boxes-container">
        {artist ? (
          <>
            <Breadcrumb items={[{ label: 'Perfiles', to: '/profiles' }, { label: artist.name }]} />

            <ProfileInfoBox
              profile={artist}
              openEditModal={openModal}
              setProfile={setArtist}
              reviewableKlass="artist"
            />

            <ProfileEventsBox profile={artist} />

            <ProfileReviewsBox profile={artist} reviewableKlass="artist" />

            <VersionBox versions={artist.versions} />
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
