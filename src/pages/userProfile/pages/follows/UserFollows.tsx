import { Dispatch, SetStateAction, useState } from 'react';
import { styled } from 'styled-components';
import { useInfiniteScroll } from '../../../../components/hooks/useInfiniteScroll';
import { Loader } from '../../../../components/Loader/Loader';
import { Navtab } from '../../../../components/Navtab/Navtab';
import { usePagination } from '../../../../components/searcher/usePagination';
import { Pagination } from '../../../../models/Generic';
import { Follow } from '../../../../services/userProfileService';
import { FollowContent, FollowTypes } from './FollowContent';
import { NoData } from '../../../../components/NoData/NoData';

const FollowsListContainer = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;
export const UserFollows = () => {
  const [followedEvents, setFollowedEvents] = useState<Follow[]>([]);
  const [followedArtists, setFollowedArtists] = useState<Follow[]>([]);
  const [followedVenues, setFollowedVenues] = useState<Follow[]>([]);
  const [followedProducers, setFollowedProducers] = useState<Follow[]>([]);

  const { pagination: artistPagination, setPagination: setArtistPagination } = usePagination<Follow>({
    url: `${process.env.REACT_APP_API_URL}/profile/show_followed_events`,
    requestCallback: (follows) => followsRequestCallback(follows, setFollowedEvents, artistPagination),
    isLoading: true
  });

  const { pagination: venuePagination, setPagination: setVenuePagination } = usePagination<Follow>({
    url: `${process.env.REACT_APP_API_URL}/profile/show_followed_artists`,
    requestCallback: (follows) => followsRequestCallback(follows, setFollowedArtists, venuePagination),
    isLoading: true
  });

  const { pagination: producerPagination, setPagination: setProducerPagination } = usePagination<Follow>({
    url: `${process.env.REACT_APP_API_URL}/profile/show_followed_venues`,
    requestCallback: (follows) => followsRequestCallback(follows, setFollowedVenues, producerPagination),
    isLoading: true
  });

  const { pagination: eventPagination, setPagination: setEventPagination } = usePagination<Follow>({
    url: `${process.env.REACT_APP_API_URL}/profile/show_followed_producers`,
    requestCallback: (follows) => followsRequestCallback(follows, setFollowedProducers, eventPagination),
    isLoading: true
  });

  function followsRequestCallback(
    follows: Follow[],
    setFollows: Dispatch<SetStateAction<Follow[]>>,
    pagination: Pagination
  ) {
    if (pagination.page === 1) {
      setFollows(follows);
    } else {
      setFollows((prevState) => [...(prevState ?? []), ...follows]);
    }
  }

  const { lastElementRef: artistLastElementRef } = useInfiniteScroll({
    pagination: artistPagination,
    setPagination: setArtistPagination
  });

  const { lastElementRef: producerLastElementRef } = useInfiniteScroll({
    pagination: producerPagination,
    setPagination: setProducerPagination
  });

  const { lastElementRef: venueLastElementRef } = useInfiniteScroll({
    pagination: venuePagination,
    setPagination: setVenuePagination
  });

  const { lastElementRef: eventLastElementRef } = useInfiniteScroll({
    pagination: eventPagination,
    setPagination: setEventPagination
  });

  return (
    <div>
      <Navtab
        items={[
          {
            label: 'Artistas',
            content: () => (
              <FollowsByFollowable
                pagination={artistPagination}
                follows={followedArtists}
                lastElementRef={artistLastElementRef}
                type="artist"
                setFollows={setFollowedArtists}
              />
            )
          },
          {
            label: 'Espacio de Evento',
            content: () => (
              <FollowsByFollowable
                pagination={venuePagination}
                follows={followedVenues}
                lastElementRef={venueLastElementRef}
                type="venue"
                setFollows={setFollowedVenues}
              />
            )
          },
          {
            label: 'Productora',
            content: () => (
              <FollowsByFollowable
                pagination={producerPagination}
                follows={followedProducers}
                lastElementRef={producerLastElementRef}
                type="producer"
                setFollows={setFollowedProducers}
              />
            )
          },
          {
            label: 'Evento',
            content: () => (
              <FollowsByFollowable
                pagination={eventPagination}
                follows={followedEvents}
                lastElementRef={eventLastElementRef}
                type="event"
                setFollows={setFollowedEvents}
              />
            )
          }
        ]}
      />
    </div>
  );
};

type FollowsByFollowableProps = {
  pagination: Pagination;
  follows: Follow[];
  lastElementRef: (node: HTMLDivElement) => void;
  type: FollowTypes;
  setFollows: Dispatch<SetStateAction<Follow[]>>;
};

const FollowsByFollowable = ({ pagination, follows, lastElementRef, type, setFollows }: FollowsByFollowableProps) => {
  return (
    <FollowsListContainer>
      {pagination.isLoading && pagination.page === 1 && <Loader />}

      {follows.length === 0 ? (
        <NoData message="No hay seguidos para mostrar" style={{ width: '100%' }} />
      ) : (
        follows.map((follow: Follow, index) => (
          <FollowContent
            key={follow.id}
            innerRef={follows.length === index + 1 ? lastElementRef : undefined}
            follow={follow}
            canUnfollow={true}
            type={type}
            setFollows={setFollows}
          />
        ))
      )}

      {pagination.isLoading && pagination.page > 1 && <Loader />}
    </FollowsListContainer>
  );
};
