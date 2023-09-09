import React, { Dispatch, MutableRefObject, SetStateAction, createContext, useContext, useRef, useState } from 'react';
import { useModal } from '../../../../components/hooks/useModal';
import { usePagination } from '../../../../components/searcher/usePagination';
import { Pagination } from '../../../../models/Generic';
import { Event } from '../../../../models/Event';

type Props = {
  children: React.ReactNode;
};

type StoreProps = {
  events?: Event[];
  setEvents: Dispatch<SetStateAction<Event[] | undefined>>;
  isFormModalOpen: boolean;
  openFormModal: () => void;
  closeFormModal: () => void;
  isFormEdit: boolean;
  setIsFormEdit: Dispatch<SetStateAction<boolean>>;
  eventToEdit?: Event;
  setEventToEdit: Dispatch<SetStateAction<Event | undefined>>;
  pagination: Pagination;
  setPagination: Dispatch<SetStateAction<Pagination>>;
  queryParams: MutableRefObject<Record<string, string>>;
};

const EventsContext = createContext<StoreProps | null>(null);

export const EventsProvider = ({ children }: Props) => {
  const INDEX_URL = `${process.env.REACT_APP_API_URL}/admin/events`;
  // Table Data
  const [events, setEvents] = useState<Event[]>();

  // Searceher
  const queryParams = useRef<Record<string, string>>({
    name_cont: '',
    datetime_gteq: '',
    datetime_lteq: '',
    artist_id_eq: '',
    producer_id_eq: '',
    venue_id_eq: ''
  });
  const { pagination, setPagination } = usePagination<Event>({
    url: INDEX_URL,
    requestCallback: (data) => indexRequestCallback(data),
    queryParams: queryParams.current
  });

  // Form
  const { isModalOpen: isFormModalOpen, openModal: openFormModal, closeModal: closeFormModal } = useModal();
  const [isFormEdit, setIsFormEdit] = useState<boolean>(false);
  const [eventToEdit, setEventToEdit] = useState<Event>();

  const indexRequestCallback = (eventss: Event[]) => {
    setEvents(eventss);
  };

  const store: StoreProps = {
    events,
    setEvents,
    isFormModalOpen,
    openFormModal,
    closeFormModal,
    isFormEdit,
    setIsFormEdit,
    eventToEdit,
    setEventToEdit,
    pagination,
    setPagination,
    queryParams
  };

  return <EventsContext.Provider value={store}>{children}</EventsContext.Provider>;
};

export const useEvents = (): StoreProps => {
  return useContext(EventsContext) as StoreProps;
};