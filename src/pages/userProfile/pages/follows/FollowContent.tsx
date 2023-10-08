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
import colors from '../../../../styles/_colors.scss';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';
import { Dispatch, RefObject, SetStateAction } from 'react';

const FollowContentContainer = styled.div`
  display: flex;
  padding: 10px 30px;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid ${colors.box_background};
  width: 100%;
  box-sizing: border-box;
`;
const FollowContentTitle = styled.span`
  color: white;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-right: auto;
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
        return <MMArtistIcon />;

      case 'event':
        return <MMEventIcon />;

      case 'producer':
        return <MMProducerIcon />;

      case 'venue':
        return <MMVenueIcon />;

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
        <MMButton onClick={handleUnfollow} style={{ lineHeight: 'normal' }}>
          <span>Dejar de Seguir</span>
        </MMButton>
      )}
    </FollowContentContainer>
  );
};
