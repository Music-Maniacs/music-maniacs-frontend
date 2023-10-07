import React from 'react';
import { useArtists } from '../context/artistContext';
import { Artist } from '../../../../models/Artist';
import { ArtistForm } from '../../../../components/forms/artist/ArtistForm';

export const Form = () => {
  const { setArtists, closeFormModal, isFormEdit, artistToEdit } = useArtists();

  const successCallback = (artist: Artist) => {
    if (isFormEdit) {
      setArtists((artists) => artists?.map((a) => (a.id === artist.id ? artist : a)));
    } else {
      setArtists((artists) => [artist, ...(artists ?? [])]);
    }
  };

  return (
    <ArtistForm
      useAdminController={true}
      artistToEdit={artistToEdit}
      isFormEdit={isFormEdit}
      closeFormModal={closeFormModal}
      successCallback={successCallback}
    />
  );
};
