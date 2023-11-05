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
import { Role } from '../../../../models/Role';
import { usePagination } from '../../../../components/searcher/usePagination';
import { Pagination } from '../../../../models/Generic';
import { useModal } from '../../../../components/hooks/useModal';
import { Policy } from '../../../../models/Policy';
import { checkPolicy } from '../../../../services/policyService';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';

type Props = {
  children: React.ReactNode;
};

type StoreProps = {
  roles?: Role[];
  setRoles: Dispatch<SetStateAction<Role[] | undefined>>;
  isFormModalOpen: boolean;
  openFormModal: () => void;
  closeFormModal: () => void;
  pagination: Pagination;
  setPagination: Dispatch<SetStateAction<Pagination>>;
  queryParams: MutableRefObject<Record<string, string>>;
  policies?: Policy;
};

const RolesContext = createContext<StoreProps | null>(null);

export const RolesProvider = ({ children }: Props) => {
  const INDEX_URL = `${process.env.REACT_APP_API_URL}/admin/roles`;
  const queryParams = useRef<Record<string, string>>({
    name_cont: ''
  });

  const [roles, setRoles] = useState<Role[]>();
  const { pagination, setPagination } = usePagination<Role>({
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
      const response = await checkPolicy('Admin::RolesController');

      setPolicies(response);
    } catch (error) {
      errorSnackbar('Error al obtener los permisos. Contacte a soporte');
    }
  };

  const indexRequestCallback = (roles: Role[]) => {
    setRoles(roles);
  };

  const store = {
    roles,
    setRoles,
    isFormModalOpen,
    openFormModal,
    closeFormModal,
    pagination,
    setPagination,
    queryParams,
    policies
  };

  return <RolesContext.Provider value={store}>{children}</RolesContext.Provider>;
};

export const useRoles = (): StoreProps => {
  return useContext(RolesContext) as StoreProps;
};
