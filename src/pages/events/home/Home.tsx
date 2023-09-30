import React, { useEffect, useState } from 'react';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { StyledFlexColumn } from '../../../styles/styledComponents';
import { useUserLocation } from '../../../components/hooks/useUserLocation';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMTitle } from '../../../components/MMTitle/MMTitle';
import { discoverEvents } from '../../../services/eventService';
import { errorSnackbar } from '../../../components/Snackbar/Snackbar';
import { Loader } from '../../../components/Loader/Loader';

export type DiscoverEventsResponse = {
  by_location: Event[];
  most_popular: Event[];
  by_followed_artists: Event[];
  by_followed_venues: Event[];
  by_followed_producers: Event[];
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { userLocation } = useUserLocation();
  const [discoveredEvents, setDiscoveredEvents] = useState<DiscoverEventsResponse>();

  useEffect(() => {
    if (userLocation) {
      // Se obtuvo la direccion del usuario. Pedir los datos
      getEvents();
    }
  }, [userLocation]);

  const getEvents = async () => {
    if (!userLocation) return;

    try {
      const response = await discoverEvents(userLocation);

      setDiscoveredEvents(response);
    } catch (error) {
      errorSnackbar('Error al obtener los eventos. Contacte a Soporte');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MMContainer maxWidth="xxl">
      <StyledFlexColumn $gap="10px">
        {isLoading ? (
          <div>
            <Loader />
          </div>
        ) : (
          <span>{JSON.stringify(discoveredEvents)}</span>
        )}
        {/* <MMBox>
          <MMTitle content="Eventos En <Ciudad>" />
        </MMBox>

        <MMBox>
          <MMTitle content="Eventos Artistas Seguidos" />
        </MMBox>

        <MMBox>
          <MMTitle content="Eventos Espacio de Eventos Seguidos" />
        </MMBox>

        <MMBox>
          <MMTitle content="Eventos Productoras" />
        </MMBox>

        <MMBox>
          <MMTitle content="Eventos Populares" />
        </MMBox> */}
      </StyledFlexColumn>
    </MMContainer>
  );
};

export default Home;
