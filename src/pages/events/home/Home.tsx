import React, { useEffect, useState } from 'react';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { StyledFlex, StyledFlexColumn } from '../../../styles/styledComponents';
import { useUserLocation } from '../../../components/hooks/useUserLocation';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMTitle } from '../../../components/MMTitle/MMTitle';
import { discoverEvents } from '../../../services/eventService';
import { errorSnackbar } from '../../../components/Snackbar/Snackbar';
import { Event } from '../../../models/Event';
import { EventCard } from '../components/EventCard';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import colors from '../../../styles/_colors.scss';
import './Home.scss';
import { HomeSkeleton } from './HomeSkeleton';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <MMContainer maxWidth="xxl" className="home-container">
      {isLoading ? (
        <HomeSkeleton />
      ) : (
        <>
          {discoveredEvents?.by_location && discoveredEvents.by_location.length > 0 && (
            <MMBox className="home-boxes">
              <MMTitle content={`Eventos En ${userLocation?.province}, ${userLocation?.country}`} />

              <EventsCarrousel events={discoveredEvents.by_location} />
            </MMBox>
          )}

          {discoveredEvents?.by_followed_venues && discoveredEvents.by_followed_venues.length > 0 && (
            <MMBox className="home-boxes">
              <MMTitle content={`Eventos Espacio de Eventos Seguidos`} />

              <EventsCarrousel events={discoveredEvents.by_followed_venues} />
            </MMBox>
          )}

          {discoveredEvents?.by_followed_artists && discoveredEvents.by_followed_artists.length > 0 && (
            <MMBox className="home-boxes">
              <MMTitle content={`Eventos Artistas Seguidos`} />

              <EventsCarrousel events={discoveredEvents.by_followed_artists} />
            </MMBox>
          )}

          {discoveredEvents?.by_followed_producers && discoveredEvents.by_followed_producers.length > 0 && (
            <MMBox className="home-boxes">
              <MMTitle content={`Eventos Productoras Seguidas`} />

              <EventsCarrousel events={discoveredEvents.by_followed_producers} />
            </MMBox>
          )}

          {discoveredEvents?.most_popular && discoveredEvents.most_popular.length > 0 && (
            <MMBox className="home-boxes">
              <MMTitle content={`Eventos Populares`} />

              <EventsCarrousel events={discoveredEvents.most_popular} />
            </MMBox>
          )}
        </>
      )}
    </MMContainer>
  );
};

export default Home;

type EventsCarrouselProps = {
  events: Event[];
};

const EventsCarrousel = ({ events }: EventsCarrouselProps) => {
  const navigate = useNavigate();

  return (
    <StyledFlex $gap="20px" $overflowY="hidden" $overflowX="auto" $padding="25px 0 5px 0">
      {events.map((event) => (
        <div style={{ width: '270px', minWidth: '270px' }} key={event.id}>
          <EventCard event={event} />
        </div>
      ))}

      <StyledFlex $justifyContent="center" $alignItems="center" $width="120px" $minWidth="120px">
        <StyledFlexColumn
          $justifyContent="center"
          $alignItems="center"
          $cursor="pointer"
          $gap="5px"
          onClick={() => navigate('/events')}
        >
          <StyledFlex
            $height="20px"
            $width="20px"
            $justifyContent="center"
            $alignItems="center"
            $padding="5px"
            $borderRadius="50%"
            $backgroundColor={colors.input_background}
            $cursor="pointer"
          >
            <FaArrowRight />
          </StyledFlex>
          <span>Ver Más</span>
        </StyledFlexColumn>
      </StyledFlex>
    </StyledFlex>
  );
};
