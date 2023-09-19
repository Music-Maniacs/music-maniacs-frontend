import React, { Dispatch, MutableRefObject, SetStateAction, createContext, useContext, useRef, useState } from 'react';
import { Pagination } from '../../../models/Generic';
import { usePagination } from '../../../components/searcher/usePagination';
import { Event } from '../../../models/Event';

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
};

const EventsContext = createContext<StoreProps | null>(null);

export const EventsProvider = ({ children }: Props) => {
  const INDEX_URL = `${process.env.REACT_APP_API_URL}/events/search`;
  // Table Data
  const [events, setEvents] = useState<Event[]>();

  // Searcher
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
  const store: StoreProps = {
    events,
    setEvents,
    pagination,
    setPagination,
    queryParams,
    cleanQueryParams
  };

  return <EventsContext.Provider value={store}>{children}</EventsContext.Provider>;
};

export const useEvents = (): StoreProps => {
  return useContext(EventsContext) as StoreProps;
};
