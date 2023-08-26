import React, { Dispatch, MutableRefObject, SetStateAction, createContext, useContext, useRef, useState } from 'react';
import { Genre } from '../../../../models/Genre';
import { useModal } from '../../../../components/hooks/useModal';
import { usePagination } from '../../../../components/searcher/usePagination';
import { Pagination } from '../../../../models/Generic';


type Props = {
  children: React.ReactNode;
};

type StoreProps = {
  genre?: Genre;
  setGenre: Dispatch<SetStateAction<Genre | undefined>>;
  genres?: Genre[];
  setGenres: Dispatch<SetStateAction<Genre[] | undefined>>;
  isFormModalOpenForCreate: boolean;
  openFormModalForCreate: () => void;
  closeFormModalForCreate: () => void;
  isFormModalOpenForEdit: boolean;
  openFormModalForEdit: () => void;
  closeFormModalForEdit: () => void;
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
  const { isModalOpen: isFormModalOpenForCreate, openModal: openFormModalForCreate, closeModal: closeFormModalForCreate } = useModal();
  const { isModalOpen: isFormModalOpenForEdit, openModal: openFormModalForEdit, closeModal: closeFormModalForEdit } = useModal();

  const [genre, setGenre] = useState<Genre>();

  const indexRequestCallback = (genres: Genre[]) => {
    setGenres(genres);
  };

  const store = {
    genre,
    setGenre,
    genres,
    setGenres,
    isFormModalOpenForCreate,
    openFormModalForCreate,
    closeFormModalForCreate,
    isFormModalOpenForEdit,
    openFormModalForEdit,
    closeFormModalForEdit,
    pagination,
    setPagination,
    queryParams
  };

  return <GenresContext.Provider value={store}>{children}</GenresContext.Provider>;
};

export const useGenres = (): StoreProps => {
  return useContext(GenresContext) as StoreProps;
};