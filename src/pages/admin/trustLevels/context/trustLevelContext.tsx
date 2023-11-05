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
import { TrustLevel } from '../../../../models/TrustLevel';
import { Policy } from '../../../../models/Policy';
import { checkPolicy } from '../../../../services/policyService';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';

type Props = {
  children: React.ReactNode;
};

type StoreProps = {
  trustLevels?: TrustLevel[];
  setTrustLevels: Dispatch<SetStateAction<TrustLevel[] | undefined>>;
  isFormModalOpen: boolean;
  openFormModal: () => void;
  closeFormModal: () => void;
  pagination: Pagination;
  setPagination: Dispatch<SetStateAction<Pagination>>;
  queryParams: MutableRefObject<Record<string, string>>;
  policies?: Policy;
};

const TrustLevelContext = createContext<StoreProps | null>(null);

export const TrustLevelsProvider = ({ children }: Props) => {
  const INDEX_URL = `${process.env.REACT_APP_API_URL}/admin/trust_levels`;
  const queryParams = useRef<Record<string, string>>({
    name_cont: ''
  });

  const [trustLevels, setTrustLevels] = useState<TrustLevel[]>();
  const { pagination, setPagination } = usePagination<TrustLevel>({
    url: INDEX_URL,
    requestCallback: (data) => indexRequestCallback(data),
    queryParams: queryParams.current
  });
  const { isModalOpen: isFormModalOpen, openModal: openFormModal, closeModal: closeFormModal } = useModal();

  const [policies, setPolicies] = useState<Policy>();

  useEffect(() => {
    getPolicy();
  }, []);

  const getPolicy = async () => {
    try {
      const response = await checkPolicy('Admin::TrustLevelsController');

      setPolicies(response);
    } catch (error) {
      errorSnackbar('Error al obtener los permisos. Contacte a soporte');
    }
  };

  const indexRequestCallback = (trustLevels: TrustLevel[]) => {
    setTrustLevels(trustLevels);
  };

  const store = {
    trustLevels,
    setTrustLevels,
    isFormModalOpen,
    openFormModal,
    closeFormModal,
    pagination,
    setPagination,
    queryParams,
    policies
  };

  return <TrustLevelContext.Provider value={store}>{children}</TrustLevelContext.Provider>;
};

export const useTrustLevels = (): StoreProps => {
  return useContext(TrustLevelContext) as StoreProps;
};
