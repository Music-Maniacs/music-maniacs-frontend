import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { Artist } from '../../../../models/Artist';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';
import { getArtist } from '../../../../services/artistService';
import { useNavigate, useParams } from 'react-router-dom';
import { usePolicy } from '../../../../components/hooks/usePolicy';
import { Policy } from '../../../../models/Policy';

type Props = {
  children: React.ReactNode;
};

type StoreProps = {
  artist?: Artist;
  setArtist: Dispatch<SetStateAction<Artist | undefined>>;
  artistPolicies?: Policy;
  versionPolicies?: Policy;
  reviewsPolicies?: Policy;
};

const ArtistContext = createContext<StoreProps | null>(null);

export const ArtistProvider = ({ children }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [artist, setArtist] = useState<Artist>();
  const { policies: artistPolicies } = usePolicy({ controllerClassName: 'ArtistsController' });
  const { policies: versionPolicies } = usePolicy({ controllerClassName: 'VersionsController' });
  const { policies: reviewsPolicies } = usePolicy({ controllerClassName: 'ReviewsController' });

  useEffect(() => {
    if (!id) return navigate('/profiles');

    getShowArtist(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setArtist,
    artistPolicies,
    versionPolicies,
    reviewsPolicies
  };

  return <ArtistContext.Provider value={store}>{children}</ArtistContext.Provider>;
};

export const useArtist = (): StoreProps => {
  return useContext(ArtistContext) as StoreProps;
};
