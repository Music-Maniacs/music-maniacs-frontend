import React from 'react';
import { Event } from '../../../models/Event';

type Props = {
  useAdminController?: boolean;
  eventToEdit?: Event;
  isFormEdit?: boolean;
  closeFormModal: () => void;
  successCallback?: (event: Event) => void;
};

export const EventsForm = ({
  useAdminController = false,
  eventToEdit,
  isFormEdit,
  closeFormModal,
  successCallback
}: Props) => {
  return <div>Form</div>;
};
