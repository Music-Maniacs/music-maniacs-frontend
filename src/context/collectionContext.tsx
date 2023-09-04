import React, { createContext, useContext, useMemo, useState } from 'react';
import { fetchPermissionsSelect, fetchRolesSelect } from '../services/roleService';
import { errorSnackbar } from '../components/Snackbar/Snackbar';
import { SelectCollection } from '../models/Generic';
import { fetchGenresSelect } from '../services/genreService';
import { Genre } from '../models/Genre';
import { Permission, Role } from '../models/Role';

type StoreProps = {
  nationalitiesCollection: SelectCollection[];
  getRolesCollection: () => Promise<SelectCollection[]>;
  getGenresCollection: () => Promise<SelectCollection[]>;
  getPermissionsCollection: () => Promise<Permission[][]>;
  addGenreToCollection: (genre: Genre) => void;
  addRoleToCollection: (role: Role) => void;
  updateGenreInCollection: (genre: Genre) => void;
  updateRoleInCollection: (role: Role) => void;
  removeGenreInCollection: (id: string) => void;
  removeRoleInCollection: (id: string) => void;
};

type Props = {
  children: React.ReactNode;
};

const CollectionContext = createContext<StoreProps | null>(null);

export const CollectionProvider = ({ children }: Props) => {
  const { getCountries } = require('country-list-spanish');

  const [rolesCollection, setRolesCollection] = useState<SelectCollection[]>([]);
  const [genresCollection, setGenresCollection] = useState<SelectCollection[]>([]);
  const [permissionsCollection, setPermissionsCollection] = useState<Permission[][]>([]);
  const nationalitiesCollection = useMemo(() => {
    const countries = getCountries();
    const countriesCollection = countries.map((country: string) => ({ value: country, label: country }));
    return countriesCollection;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const getPermissionsCollection = async (): Promise<Permission[][]> => {
    if (permissionsCollection.length > 0) return permissionsCollection;

    try {
      const response = await fetchPermissionsSelect();
      response.sort((a, b) => a.subject_class.localeCompare(b.subject_class));
      const sortedPermissions = response.reduce(
        (function (hash) {
          return function (r: Permission[][], o) {
            if (!hash[o.subject_class]) {
              hash[o.subject_class] = [];
              r.push(hash[o.subject_class]);
            }
            hash[o.subject_class].push(o);
            return r;
          };
        })(Object.create(null)),
        []
      );
      setPermissionsCollection(sortedPermissions);
      return sortedPermissions;
    } catch (error) {
      errorSnackbar('Error al obtener los permisos. Contacte a soporte');
      return [];
    }
  };

  const addGenreToCollection = (genre: Genre) => {
    if (genresCollection.length === 0) return;

    const genreAsSelectCollection = { value: genre.id, label: genre.name };
    setGenresCollection((prevState) => [genreAsSelectCollection, ...prevState]);
  };

  const addRoleToCollection = (role: Role) => {
    if (rolesCollection.length === 0) return;

    const roleAsSelectCollection = { value: role.id, label: role.name };
    setRolesCollection((prevState) => [roleAsSelectCollection, ...prevState]);
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

  const updateRoleInCollection = (role: Role) => {
    if (rolesCollection.length === 0) return;

    const index = rolesCollection.findIndex((roleCollection) => roleCollection.value === role.id);

    if (index === -1) addRoleToCollection(role);

    const roleAsSelectCollection = { value: role.id, label: role.name };
    setRolesCollection((prevState) => {
      prevState[index] = roleAsSelectCollection;
      return [...prevState];
    });
  };

  const removeGenreInCollection = (id: string) => {
    if (genresCollection.length === 0) return;
    setGenresCollection(genresCollection.filter((item) => item.value !== id));
  };

  const removeRoleInCollection = (id: string) => {
    if (rolesCollection.length === 0) return;
    setRolesCollection(rolesCollection.filter((item) => item.value !== id));
  };
  const store: StoreProps = {
    nationalitiesCollection,
    getRolesCollection,
    getGenresCollection,
    getPermissionsCollection,
    addGenreToCollection,
    addRoleToCollection,
    updateGenreInCollection,
    updateRoleInCollection,
    removeGenreInCollection,
    removeRoleInCollection
  };

  return <CollectionContext.Provider value={store}>{children}</CollectionContext.Provider>;
};

export const useCollection = (): StoreProps => {
  return useContext(CollectionContext) as StoreProps;
};
