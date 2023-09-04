import React, { Dispatch, MutableRefObject, SetStateAction, createContext, useContext, useRef, useState } from 'react';
import { useModal } from '../../../../components/hooks/useModal';
import { usePagination } from '../../../../components/searcher/usePagination';
import { Pagination } from '../../../../models/Generic';
import { Venue } from '../../../../models/Venue';

type Props = {
  children: React.ReactNode;
};

type StoreProps = {
  venues?: Venue[];
  setVenues: Dispatch<SetStateAction<Venue[] | undefined>>;
  isFormModalOpen: boolean;
  openFormModal: () => void;
  closeFormModal: () => void;
  isFormEdit: boolean;
  setIsFormEdit: Dispatch<SetStateAction<boolean>>;
  venueIdToEdit?: string;
  setVenueIdToEdit: Dispatch<SetStateAction<string | undefined>>;
  pagination: Pagination;
  setPagination: Dispatch<SetStateAction<Pagination>>;
  queryParams: MutableRefObject<Record<string, string>>;
};

const VenuesContext = createContext<StoreProps | null>(null);

export const VenuesProvider = ({ children }: Props) => {
  const INDEX_URL = `${process.env.REACT_APP_API_URL}/admin/venues`;
  // Table Data
  const [venues, setVenues] = useState<Venue[]>();

  // Searceher
  const queryParams = useRef<Record<string, string>>({
    name_cont: ''
  });
  const { pagination, setPagination } = usePagination<Venue>({
    url: INDEX_URL,
    requestCallback: (data) => indexRequestCallback(data),
    queryParams: queryParams.current
  });

  // Form
  const { isModalOpen: isFormModalOpen, openModal: openFormModal, closeModal: closeFormModal } = useModal();
  const [isFormEdit, setIsFormEdit] = useState<boolean>(false);
  const [venueIdToEdit, setVenueIdToEdit] = useState<string>();

  const indexRequestCallback = (venues: Venue[]) => {
    setVenues(venues);
  };

  const store: StoreProps = {
    venues,
    setVenues,
    isFormModalOpen,
    openFormModal,
    closeFormModal,
    isFormEdit,
    setIsFormEdit,
    venueIdToEdit,
    setVenueIdToEdit,
    pagination,
    setPagination,
    queryParams
  };

  return <VenuesContext.Provider value={store}>{children}</VenuesContext.Provider>;
};

export const useVenues = (): StoreProps => {
  return useContext(VenuesContext) as StoreProps;
};
