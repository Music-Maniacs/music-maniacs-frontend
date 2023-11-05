import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { Genre } from '../../../../models/Genre';
import { useModal } from '../../../../components/hooks/useModal';
import { usePagination } from '../../../../components/searcher/usePagination';
import { Pagination } from '../../../../models/Generic';
import { Policy } from '../../../../models/Policy';
import { checkPolicy } from '../../../../services/policyService';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';

type Props = {
  children: React.ReactNode;
};

type StoreProps = {
  genreToEdit?: Genre;
  setGenreToEdit: Dispatch<SetStateAction<Genre | undefined>>;
  genres?: Genre[];
  setGenres: Dispatch<SetStateAction<Genre[] | undefined>>;
  isFormModalOpen: boolean;
  openFormModal: () => void;
  closeFormModal: () => void;
  pagination: Pagination;
  setPagination: Dispatch<SetStateAction<Pagination>>;
  queryParams: MutableRefObject<Record<string, string>>;
  policies?: Policy;
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

  const [genreToEdit, setGenreToEdit] = useState<Genre>();

  const [policies, setPolicies] = useState<Policy>();

  useEffect(() => {
    getPolicy();
  }, []);

  const getPolicy = async () => {
    try {
      const response = await checkPolicy('Admin::GenresController');

      setPolicies(response);
    } catch (error) {
      errorSnackbar('Error al obtener los permisos. Contacte a soporte');
    }
  };

  const indexRequestCallback = (genres: Genre[]) => {
    setGenres(genres);
  };

  const store = {
    genreToEdit,
    setGenreToEdit,
    genres,
    setGenres,
    isFormModalOpen,
    openFormModal,
    closeFormModal,
    pagination,
    setPagination,
    queryParams,
    policies
  };

  return <GenresContext.Provider value={store}>{children}</GenresContext.Provider>;
};

export const useGenres = (): StoreProps => {
  return useContext(GenresContext) as StoreProps;
};
