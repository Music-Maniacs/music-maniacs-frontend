import React, { Dispatch, MutableRefObject, SetStateAction, createContext, useContext, useRef, useState } from 'react';
import { useModal } from '../../../../components/hooks/useModal';
import { usePagination } from '../../../../components/searcher/usePagination';
import { Pagination } from '../../../../models/Generic';
import { Artist } from '../../../../models/Artist';

type Props = {
  children: React.ReactNode;
};

type StoreProps = {
  artists?: Artist[];
  setArtists: Dispatch<SetStateAction<Artist[] | undefined>>;
  isFormModalOpen: boolean;
  openFormModal: () => void;
  closeFormModal: () => void;
  isFormEdit: boolean;
  setIsFormEdit: Dispatch<SetStateAction<boolean>>;
  artistToEdit?: Artist;
  setArtistToEdit: Dispatch<SetStateAction<Artist | undefined>>;
  pagination: Pagination;
  setPagination: Dispatch<SetStateAction<Pagination>>;
  queryParams: MutableRefObject<Record<string, string>>;
};

const ArtistsContext = createContext<StoreProps | null>(null);

export const ArtistsProvider = ({ children }: Props) => {
  const INDEX_URL = `${process.env.REACT_APP_API_URL}/admin/artists`;
  // Table Data
  const [artists, setArtists] = useState<Artist[]>();

  // Searceher
  const queryParams = useRef<Record<string, string>>({
    name_cont: ''
  });
  const { pagination, setPagination } = usePagination<Artist>({
    url: INDEX_URL,
    requestCallback: (data) => indexRequestCallback(data),
    queryParams: queryParams.current
  });

  // Form
  const { isModalOpen: isFormModalOpen, openModal: openFormModal, closeModal: closeFormModal } = useModal();
  const [isFormEdit, setIsFormEdit] = useState<boolean>(false);
  const [artistToEdit, setArtistToEdit] = useState<Artist>();

  const indexRequestCallback = (artists: Artist[]) => {
    setArtists(artists);
  };

  const store: StoreProps = {
    artists,
    setArtists,
    isFormModalOpen,
    openFormModal,
    closeFormModal,
    isFormEdit,
    setIsFormEdit,
    artistToEdit,
    setArtistToEdit,
    pagination,
    setPagination,
    queryParams
  };

  return <ArtistsContext.Provider value={store}>{children}</ArtistsContext.Provider>;
};

export const useArtists = (): StoreProps => {
  return useContext(ArtistsContext) as StoreProps;
};
