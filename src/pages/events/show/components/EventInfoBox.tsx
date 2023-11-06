import React, { Dispatch, SetStateAction } from 'react';
import { Event } from '../../../../models/Event';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';
import { followEvent, unfollowEvent } from '../../../../services/eventService';
import '../../Events.scss';
import { EventBasicInfo } from './EventBasicInfo';

type Props = {
  event: Event;
  setEvent: Dispatch<SetStateAction<Event | undefined>>;
  handleEditEvent?: () => void;
  handleReportEvent?: () => void;
  hideActions?: boolean;
};

export const EventInfoBox = ({ event, setEvent, handleEditEvent, handleReportEvent, hideActions = false }: Props) => {
  const handleFollow = () => {
    try {
      followEvent(event.id);

      setEvent((prevEvent) => (prevEvent ? { ...prevEvent, followed_by_current_user: true } : undefined));
    } catch (error) {
      errorSnackbar('Error al seguir el evento. Contacte a soporte.');
    }
  };

  const handleUnfollow = () => {
    try {
      unfollowEvent(event.id);

      setEvent((prevEvent) => (prevEvent ? { ...prevEvent, followed_by_current_user: false } : undefined));
    } catch (error) {
      errorSnackbar('Error al dejar de seguir el evento. Contacte a soporte.');
    }
  };

  return (
    <EventBasicInfo
      event={event}
      handleEditEvent={handleEditEvent}
      handleReportEvent={handleReportEvent}
      handleFollow={handleFollow}
      handleUnfollow={handleUnfollow}
      hideActions={hideActions}
    />
  );
};
