import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { Venue } from '../../../../models/Venue';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';
import { getVenue } from '../../../../services/venueService';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

type StoreProps = {
  venue?: Venue;
  setVenue: Dispatch<SetStateAction<Venue | undefined>>;
};

const VenueContext = createContext<StoreProps | null>(null);

export const VenueProvider = ({ children }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [venue, setVenue] = useState<Venue>();

  useEffect(() => {
    if (!id) return navigate('/profiles');

    getShowVenue(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getShowVenue = async (id: string) => {
    try {
      const venue = await getVenue(id);

      setVenue(venue);
    } catch (error) {
      errorSnackbar('Error al obtener el espacio de eventos. Contacte a soporte.');
      navigate('/profiles');
    }
  };

  const store: StoreProps = {
    venue,
    setVenue
  };

  return <VenueContext.Provider value={store}>{children}</VenueContext.Provider>;
};

export const useVenue = (): StoreProps => {
  return useContext(VenueContext) as StoreProps;
};
