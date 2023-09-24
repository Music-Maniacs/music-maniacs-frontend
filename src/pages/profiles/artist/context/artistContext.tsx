import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { Artist } from '../../../../models/Artist';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';
import { getArtist } from '../../../../services/artistService';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

type StoreProps = {
  artist?: Artist;
  setArtist: Dispatch<SetStateAction<Artist | undefined>>;
};

const ArtistContext = createContext<StoreProps | null>(null);

export const ArtistProvider = ({ children }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [artist, setArtist] = useState<Artist>();

  useEffect(() => {
    if (!id) return navigate('/profiles');

    getShowArtist(id);
  }, []);

  const getShowArtist = async (id: string) => {
    try {
      const artist = await getArtist(id);

      setArtist(artist);
    } catch (error) {
      errorSnackbar('Error al obtener el artista. Contacte a soporte.');
      navigate('/profiles');
    }
  };

  const store: StoreProps = {
    artist,
    setArtist
  };

  return <ArtistContext.Provider value={store}>{children}</ArtistContext.Provider>;
};

export const useArtist = (): StoreProps => {
  return useContext(ArtistContext) as StoreProps;
};
