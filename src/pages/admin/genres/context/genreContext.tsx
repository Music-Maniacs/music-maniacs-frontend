import React, { Dispatch, MutableRefObject, SetStateAction, createContext, useContext, useRef, useState } from 'react';
import { Genre } from '../../../../models/Genre';
import { useModal } from '../../../../components/hooks/useModal';
import { usePagination } from '../../../../components/searcher/usePagination';
import { Pagination } from '../../../../models/Generic';

type Props = {
  children: React.ReactNode;
};

type StoreProps = {
  genres?: Genre[];
  setGenres: Dispatch<SetStateAction<Genre[] | undefined>>;
  isFormModalOpen: boolean;
  openFormModal: () => void;
  closeFormModal: () => void;
  pagination: Pagination;
  setPagination: Dispatch<SetStateAction<Pagination>>;
  queryParams: MutableRefObject<Record<string, string>>;
};

const GenresContext = createContext<StoreProps | null>(null);

export const GenresProvider = ({ children }: Props) => {
  const INDEX_URL = `${process.env.REACT_APP_API_URL}/admin/genres`;
  const queryParams = useRef<Record<string, string>>({
    name_cont: ''
  });

  const [genres, setGenres] = useState<Genre[]>();
  const { pagination, setPagination } = usePagination<Genre>({
    url: INDEX_URL,
    requestCallback: (data) => indexRequestCallback(data),
    queryParams: queryParams.current
  });
  const { isModalOpen: isFormModalOpen, openModal: openFormModal, closeModal: closeFormModal } = useModal();

  const indexRequestCallback = (genres: Genre[]) => {
    setGenres(genres);
  };

  const store = {
    genres,
    setGenres,
    isFormModalOpen,
    openFormModal,
    closeFormModal,
    pagination,
    setPagination,
    queryParams
  };

  return <GenresContext.Provider value={store}>{children}</GenresContext.Provider>;
};

export const useGenres = (): StoreProps => {
  return useContext(GenresContext) as StoreProps;
};