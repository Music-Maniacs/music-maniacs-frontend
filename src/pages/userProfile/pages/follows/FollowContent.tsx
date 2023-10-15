import { styled } from 'styled-components';
import { MMArtistIcon } from '../../../../components/icons/MMArtistIcon';
import { MMEventIcon } from '../../../../components/icons/MMEventIcon';
import { MMProducerIcon } from '../../../../components/icons/MMProducerIcon';
import { MMVenueIcon } from '../../../../components/icons/MMVenueIcon';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { unfollowEvent } from '../../../../services/eventService';
import { unfollowProducer } from '../../../../services/producerService';
import { Follow } from '../../../../services/userProfileService';
import { unfollowVenue } from '../../../../services/venueService';
import { unfollowArtist } from '../../../../services/artistService';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';
import { Dispatch, RefObject, SetStateAction } from 'react';

const FollowContentContainer = styled.div`
  display: flex;
  padding: 5px;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border-radius: 5px;
  border: 2px solid var(--highlight);
  box-sizing: border-box;
  width: 100%;
`;

const FollowContentTitle = styled.span`
  flex-grow: 1;
  font-weight: bold;
`;

export type FollowTypes = 'venue' | 'producer' | 'event' | 'artist';
type FollowContentProps = {
  follow: Follow;
  setFollows: Dispatch<SetStateAction<Follow[]>>;
  canUnfollow: boolean;
  type: FollowTypes;
  innerRef?: RefObject<HTMLDivElement> | null | ((node: HTMLDivElement) => void);
};
export const FollowContent = ({ follow, canUnfollow, type, setFollows, innerRef }: FollowContentProps) => {
  const unfollowEndpoint = {
    artist: unfollowArtist,
    producer: unfollowProducer,
    venue: unfollowVenue,
    event: unfollowEvent
  };
  const renderIcon = (type: FollowTypes) => {
    switch (type) {
      case 'artist':
        return <MMArtistIcon size={'1.5rem'} />;

      case 'event':
        return <MMEventIcon size={'1.5rem'} />;

      case 'producer':
        return <MMProducerIcon size={'1.5rem'} />;

      case 'venue':
        return <MMVenueIcon size={'1.5rem'} />;

      default:
        return <></>;
    }
  };

  const handleUnfollow = () => {
    try {
      unfollowEndpoint[type](follow.id);
      setFollows((prevState) => {
        return prevState.filter((currentFollow) => {
          return currentFollow.id !== follow.id;
        });
      });
    } catch (error) {
      errorSnackbar('Error al dejar de seguir. Contacte a soporte.');
    }
  };

  return (
    <FollowContentContainer ref={innerRef}>
      {renderIcon(type)}
      <FollowContentTitle>{follow.name}</FollowContentTitle>
      {canUnfollow && (
        <MMButton onClick={handleUnfollow}>
          <span>Dejar de Seguir</span>
        </MMButton>
      )}
    </FollowContentContainer>
  );
};
