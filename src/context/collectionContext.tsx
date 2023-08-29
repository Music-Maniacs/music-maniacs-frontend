import React, { createContext, useContext, useState } from 'react';
import { fetchRolesSelect } from '../services/roleService';
import { errorSnackbar } from '../components/Snackbar/Snackbar';
import { SelectCollection } from '../models/Generic';

type StoreProps = {
  getRolesCollection: () => Promise<SelectCollection[]>;
};

type Props = {
  children: React.ReactNode;
};

const CollectionContext = createContext<StoreProps | null>(null);

export const CollectionProvider = ({ children }: Props) => {
  const [rolesCollection, setRolesCollection] = useState<SelectCollection[]>([]);

  const getRolesCollection = async (): Promise<SelectCollection[]> => {
    if (rolesCollection.length > 0) return rolesCollection;

    try {
      const response = await fetchRolesSelect();

      const rolesCollectionMapped = response.map((role) => ({ value: role.id, label: role.name }));

      setRolesCollection(rolesCollectionMapped);
      return rolesCollectionMapped;
    } catch (error) {
      errorSnackbar('Error al obtener los roles. Contacte a soporte');
      return [];
    }
  };

  const store: StoreProps = { getRolesCollection };

  return <CollectionContext.Provider value={store}>{children}</CollectionContext.Provider>;
};

export const useCollection = (): StoreProps => {
  return useContext(CollectionContext) as StoreProps;
};
