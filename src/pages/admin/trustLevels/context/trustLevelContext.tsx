import React, { Dispatch, MutableRefObject, SetStateAction, createContext, useContext, useRef, useState } from 'react';
import { useModal } from '../../../../components/hooks/useModal';
import { usePagination } from '../../../../components/searcher/usePagination';
import { Pagination } from '../../../../models/Generic';
import { TrustLevel } from '../../../../models/TrustLevel';

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
    queryParams
  };

  return <TrustLevelContext.Provider value={store}>{children}</TrustLevelContext.Provider>;
};

export const useTrustLevels = (): StoreProps => {
  return useContext(TrustLevelContext) as StoreProps;
};
