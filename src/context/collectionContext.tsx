import React, { createContext, useContext, useState } from 'react';
import { fetchRolesSelect } from '../services/rolesService';
import { errorSnackbar } from '../components/Snackbar/Snackbar';
import { SelectCollection } from '../models/Generic';
import { fetchGenresSelect } from '../services/genresService';

type StoreProps = {
  getRolesCollection: () => Promise<SelectCollection[]>;
  getGenresCollection: () => Promise<SelectCollection[]>;
};

type Props = {
  children: React.ReactNode;
};

const CollectionContext = createContext<StoreProps | null>(null);

export const CollectionProvider = ({ children }: Props) => {
  const [rolesCollection, setRolesCollection] = useState<SelectCollection[]>([]);
  const [genresCollection, setGenresCollection] = useState<SelectCollection[]>([]);

  const getRolesCollection = async (): Promise<SelectCollection[]> => {
    if (rolesCollection.length > 0) return rolesCollection;

    try {
      const response = await fetchRolesSelect();

      const rolesCollectionMap = response.map((role) => ({ value: role.id, label: role.name }));

      setRolesCollection(rolesCollectionMap);
      return rolesCollectionMap;
    } catch (error) {
      errorSnackbar('Error al obtener los roles. Contacte a soporte');
      return [];
    }
  };

  const getGenresCollection = async (): Promise<SelectCollection[]> => {
    if (genresCollection.length > 0) return genresCollection;

    try {
      const response = await fetchGenresSelect();

      const genresCollectionMap = response.map((genre) => ({ value: genre.id, label: genre.name }));

      setGenresCollection(genresCollectionMap);
      return genresCollectionMap;
    } catch (error) {
      errorSnackbar('Error al obtener los géneros. Contacte a soporte');
      return [];
    }
  };

  const store: StoreProps = { getRolesCollection, getGenresCollection };

  return <CollectionContext.Provider value={store}>{children}</CollectionContext.Provider>;
};

export const useCollection = (): StoreProps => {
  return useContext(CollectionContext) as StoreProps;
};
