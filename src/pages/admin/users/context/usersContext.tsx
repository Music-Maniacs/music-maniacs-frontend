import React, { Dispatch, MutableRefObject, SetStateAction, createContext, useContext, useRef, useState } from 'react';
import { User } from '../../../../models/User';
import { useModal } from '../../../../components/hooks/useModal';
import { usePagination } from '../../../../components/searcher/usePagination';
import { Pagination } from '../../../../models/Generic';

type Props = {
  children: React.ReactNode;
};

type StoreProps = {
  users?: User[];
  setUsers: Dispatch<SetStateAction<User[] | undefined>>;
  isFormModalOpen: boolean;
  openFormModal: () => void;
  closeFormModal: () => void;
  pagination: Pagination;
  setPagination: Dispatch<SetStateAction<Pagination>>;
  queryParams: MutableRefObject<Record<string, string>>;
};

const UsersContext = createContext<StoreProps | null>(null);

export const UsersProvider = ({ children }: Props) => {
  const INDEX_URL = `${process.env.REACT_APP_API_URL}/admin/users`;
  const queryParams = useRef<Record<string, string>>({
    full_name_or_username_or_email_cont: '',
    search_by_state: ''
  });

  const [users, setUsers] = useState<User[]>();
  const { pagination, setPagination } = usePagination<User>({
    url: INDEX_URL,
    requestCallback: (data) => indexRequestCallback(data),
    queryParams: queryParams.current
  });
  const { isModalOpen: isFormModalOpen, openModal: openFormModal, closeModal: closeFormModal } = useModal();

  const indexRequestCallback = (users: User[]) => {
    setUsers(users);
  };

  const store = {
    users,
    setUsers,
    isFormModalOpen,
    openFormModal,
    closeFormModal,
    pagination,
    setPagination,
    queryParams
  };

  return <UsersContext.Provider value={store}>{children}</UsersContext.Provider>;
};

export const useUsers = (): StoreProps => {
  return useContext(UsersContext) as StoreProps;
};
