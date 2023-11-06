import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { Venue } from '../../../../models/Venue';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';
import { getVenue } from '../../../../services/venueService';
import { useNavigate, useParams } from 'react-router-dom';
import { usePolicy } from '../../../../components/hooks/usePolicy';
import { Policy } from '../../../../models/Policy';

type Props = {
  children: React.ReactNode;
};

type StoreProps = {
  venue?: Venue;
  setVenue: Dispatch<SetStateAction<Venue | undefined>>;
  venuePolicies?: Policy;
  versionPolicies?: Policy;
  reviewsPolicies?: Policy;
};

const VenueContext = createContext<StoreProps | null>(null);

export const VenueProvider = ({ children }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [venue, setVenue] = useState<Venue>();
  const { policies: venuePolicies } = usePolicy({ controllerClassName: 'VenuesController' });
  const { policies: versionPolicies } = usePolicy({ controllerClassName: 'VersionsController' });
  const { policies: reviewsPolicies } = usePolicy({ controllerClassName: 'ReviewsController' });

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
    setVenue,
    venuePolicies,
    versionPolicies,
    reviewsPolicies
  };

  return <VenueContext.Provider value={store}>{children}</VenueContext.Provider>;
};

export const useVenue = (): StoreProps => {
  return useContext(VenueContext) as StoreProps;
};
