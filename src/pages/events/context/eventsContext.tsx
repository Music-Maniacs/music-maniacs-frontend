import React, { Dispatch, MutableRefObject, SetStateAction, createContext, useContext, useRef, useState } from 'react';
import { Pagination } from '../../../models/Generic';
import { usePagination } from '../../../components/searcher/usePagination';
import { Event } from '../../../models/Event';
import { getEvent } from '../../../services/eventService';
import { errorSnackbar } from '../../../components/Snackbar/Snackbar';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

type StoreProps = {
  events?: Event[];
  setEvents: Dispatch<SetStateAction<Event[] | undefined>>;
  eventToEdit?: Event;
  pagination: Pagination;
  setPagination: Dispatch<SetStateAction<Pagination>>;
  queryParams: MutableRefObject<Record<string, string>>;
  cleanQueryParams: () => void;
  showEvent?: Event;
  setShowEvent: Dispatch<SetStateAction<Event | undefined>>;
  getShowEvent: (id: string) => Promise<void>;
};

const EventsContext = createContext<StoreProps | null>(null);

export const EventsProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const INDEX_URL = `${process.env.REACT_APP_API_URL}/events/search`;
  // Table Data
  const [events, setEvents] = useState<Event[]>();
  const [showEvent, setShowEvent] = useState<Event>();

  // Searcher
  const queryParams = useRef<Record<string, string>>({
    name_cont: '',
    datetime_gteq: '',
    datetime_lteq: '',
    artist_id_eq: '',
    producer_id_eq: '',
    venue_id_eq: '',
    venue_location_city_cont: '',
    venue_location_country_cont: '',
    venue_location_province_cont: ''
  });

  const { pagination, setPagination } = usePagination<Event>({
    url: INDEX_URL,
    requestCallback: (data) => indexRequestCallback(data),
    queryParams: queryParams.current
  });

  const indexRequestCallback = (events: Event[]) => {
    if (pagination.page === 1) {
      setEvents(events);
    } else {
      // Infinite Scroll
      setEvents((prevEvents) => [...(prevEvents ?? []), ...events]);
    }
  };

  const cleanQueryParams = () => {
    queryParams.current = {
      name_cont: '',
      datetime_gteq: '',
      datetime_lteq: '',
      artist_id_eq: '',
      producer_id_eq: '',
      venue_id_eq: ''
    };
  };

  const getShowEvent = async (id: string) => {
    try {
      const event = await getEvent(id);

      setShowEvent(event);
    } catch (error) {
      errorSnackbar('Error al obtener el evento. Contacte a soporte.');
      navigate('/events');
    }
  };

  const store: StoreProps = {
    events,
    setEvents,
    pagination,
    setPagination,
    queryParams,
    cleanQueryParams,
    showEvent,
    setShowEvent,
    getShowEvent
  };

  return <EventsContext.Provider value={store}>{children}</EventsContext.Provider>;
};

export const useEvents = (): StoreProps => {
  return useContext(EventsContext) as StoreProps;
};
