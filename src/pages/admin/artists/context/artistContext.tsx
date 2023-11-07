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
import { useModal } from '../../../../components/hooks/useModal';
import { usePagination } from '../../../../components/searcher/usePagination';
import { Pagination } from '../../../../models/Generic';
import { Artist } from '../../../../models/Artist';
import { Policy } from '../../../../models/Policy';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';
import { checkPolicy } from '../../../../services/policyService';

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
  policies?: Policy;
};

const ArtistsContext = createContext<StoreProps | null>(null);

export const ArtistsProvider = ({ children }: Props) => {
  const INDEX_URL = `${process.env.REACT_APP_API_URL}/admin/artists`;
  // Table Data
  const [artists, setArtists] = useState<Artist[]>();
  const [policies, setPolicies] = useState<Policy>();

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

  useEffect(() => {
    getPolicy();
  }, []);

  const getPolicy = async () => {
    try {
      const response = await checkPolicy('Admin::ArtistsController');

      setPolicies(response);
    } catch (error) {
      errorSnackbar('Error al obtener los permisos. Contacte a soporte');
    }
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
    queryParams,
    policies
  };

  return <ArtistsContext.Provider value={store}>{children}</ArtistsContext.Provider>;
};

export const useArtists = (): StoreProps => {
  return useContext(ArtistsContext) as StoreProps;
};
