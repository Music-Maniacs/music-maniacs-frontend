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
import { Producer } from '../../../../models/Producer';
import { Policy } from '../../../../models/Policy';
import { checkPolicy } from '../../../../services/policyService';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';

type Props = {
  children: React.ReactNode;
};

type StoreProps = {
  producers?: Producer[];
  setProducers: Dispatch<SetStateAction<Producer[] | undefined>>;
  isFormModalOpen: boolean;
  openFormModal: () => void;
  closeFormModal: () => void;
  isFormEdit: boolean;
  setIsFormEdit: Dispatch<SetStateAction<boolean>>;
  producerToEdit?: Producer;
  setProducerToEdit: Dispatch<SetStateAction<Producer | undefined>>;
  pagination: Pagination;
  setPagination: Dispatch<SetStateAction<Pagination>>;
  queryParams: MutableRefObject<Record<string, string>>;
  policies?: Policy;
};

const ProducersContext = createContext<StoreProps | null>(null);

export const ProducersProvider = ({ children }: Props) => {
  const INDEX_URL = `${process.env.REACT_APP_API_URL}/admin/producers`;
  // Table Data
  const [producers, setProducers] = useState<Producer[]>();

  // Searceher
  const queryParams = useRef<Record<string, string>>({
    name_cont: ''
  });
  const { pagination, setPagination } = usePagination<Producer>({
    url: INDEX_URL,
    requestCallback: (data) => indexRequestCallback(data),
    queryParams: queryParams.current
  });

  // Form
  const { isModalOpen: isFormModalOpen, openModal: openFormModal, closeModal: closeFormModal } = useModal();
  const [isFormEdit, setIsFormEdit] = useState<boolean>(false);
  const [producerToEdit, setProducerToEdit] = useState<Producer>();
  const [policies, setPolicies] = useState<Policy>();

  useEffect(() => {
    getPolicy();
  }, []);

  const getPolicy = async () => {
    try {
      const response = await checkPolicy('Admin::ProducersController');

      setPolicies(response);
    } catch (error) {
      errorSnackbar('Error al obtener los permisos. Contacte a soporte');
    }
  };

  const indexRequestCallback = (producers: Producer[]) => {
    setProducers(producers);
  };

  const store: StoreProps = {
    producers,
    setProducers,
    isFormModalOpen,
    openFormModal,
    closeFormModal,
    isFormEdit,
    setIsFormEdit,
    producerToEdit,
    setProducerToEdit,
    pagination,
    setPagination,
    queryParams,
    policies
  };

  return <ProducersContext.Provider value={store}>{children}</ProducersContext.Provider>;
};

export const useProducers = (): StoreProps => {
  return useContext(ProducersContext) as StoreProps;
};
