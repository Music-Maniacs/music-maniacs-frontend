import React, { Dispatch, MutableRefObject, SetStateAction, createContext, useContext, useRef, useState } from 'react';
import { Role } from '../../../../models/Role';
import { usePagination } from '../../../../components/searcher/usePagination';
import { Pagination } from '../../../../models/Generic';

type Props = {
  children: React.ReactNode;
};

type StoreProps = {
  roles?: Role[];
  setRoles: Dispatch<SetStateAction<Role[] | undefined>>;
  pagination: Pagination;
  setPagination: Dispatch<SetStateAction<Pagination>>;
  queryParams: MutableRefObject<Record<string, string>>;
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

  const indexRequestCallback = (roles: Role[]) => {
    setRoles(roles);
  };

  const store = {
    roles,
    setRoles,
    pagination,
    setPagination,
    queryParams
  };

  return <RolesContext.Provider value={store}>{children}</RolesContext.Provider>;
};

export const useRoles = (): StoreProps => {
  return useContext(RolesContext) as StoreProps;
};
