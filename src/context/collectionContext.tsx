import React, { createContext, useContext, useMemo, useState } from 'react';
import { fetchRolesSelect } from '../services/rolesService';
import { errorSnackbar } from '../components/Snackbar/Snackbar';
import { SelectCollection } from '../models/Generic';
import { fetchGenresSelect } from '../services/genreService';
import { Genre } from '../models/Genre';

type StoreProps = {
  nationalitiesCollection: SelectCollection[];
  getRolesCollection: () => Promise<SelectCollection[]>;
  getGenresCollection: () => Promise<SelectCollection[]>;
  addGenreToCollection: (genre: Genre) => void;
  updateGenreInCollection: (genre: Genre) => void;
};

type Props = {
  children: React.ReactNode;
};

const CollectionContext = createContext<StoreProps | null>(null);

export const CollectionProvider = ({ children }: Props) => {
  const { getCountries } = require('country-list-spanish');

  const [rolesCollection, setRolesCollection] = useState<SelectCollection[]>([]);
  const [genresCollection, setGenresCollection] = useState<SelectCollection[]>([]);
  const nationalitiesCollection = useMemo(() => {
    const countries = getCountries();
    const countriesCollection = countries.map((country: string) => ({ value: country, label: country }));
    return countriesCollection;
  }, []);

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

  const addGenreToCollection = (genre: Genre) => {
    if (genresCollection.length === 0) return;

    const genreAsSelectCollection = { value: genre.id, label: genre.name };
    setGenresCollection((prevState) => [genreAsSelectCollection, ...prevState]);
  };

  const updateGenreInCollection = (genre: Genre) => {
    if (genresCollection.length === 0) return;

    const index = genresCollection.findIndex((genreCollection) => genreCollection.value === genre.id);

    if (index === -1) addGenreToCollection(genre);

    const genreAsSelectCollection = { value: genre.id, label: genre.name };
    setGenresCollection((prevState) => {
      prevState[index] = genreAsSelectCollection;
      return [...prevState];
    });
  };

  const store: StoreProps = {
    nationalitiesCollection,
    getRolesCollection,
    getGenresCollection,
    addGenreToCollection,
    updateGenreInCollection
  };

  return <CollectionContext.Provider value={store}>{children}</CollectionContext.Provider>;
};

export const useCollection = (): StoreProps => {
  return useContext(CollectionContext) as StoreProps;
};
