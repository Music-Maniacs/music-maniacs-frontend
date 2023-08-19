import React, { FormEvent } from 'react';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { FaSearchPlus } from 'react-icons/fa';
import { useUsers } from '../context/userContext';
import { SearchInputText } from '../../../../components/searcher/InputText/SearchInputText';
import { SearchInputSelect } from '../../../../components/searcher/InputSelect/SearchInputSelect';

export const Searcher = () => {
  const { setPagination, queryParams } = useUsers();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPagination((prevState) => ({ ...prevState, isLoading: true }));
  };

  return (
    <form className="admin-search-container" onSubmit={handleFormSubmit}>
      <div className="inputs-container">
        <SearchInputText
          paramKey="name_or_username_or_email_matches"
          placeholder="Buscar por Nombre, Usuarios o Email"
          queryParams={queryParams}
        />

        <SearchInputSelect
          paramKey="search_by_state"
          placeholder="Estado"
          queryParams={queryParams}
          containerWidth="250px"
          options={[
            { label: 'Activo', value: 'active' },
            { label: 'Bloqueado', value: 'blocked' },
            { label: 'Eliminado', value: 'deleted' }
          ]}
        />
      </div>

      <MMButton type="submit">
        <FaSearchPlus />
        Buscar
      </MMButton>
    </form>
  );
};
