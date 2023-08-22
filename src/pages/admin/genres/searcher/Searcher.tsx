import React, { FormEvent } from 'react';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { FaSearchPlus } from 'react-icons/fa';
import { useGenres } from '../context/genreContext';
import { SearchInputText } from '../../../../components/searcher/InputText/SearchInputText';

export const Searcher = () => {
  const { setPagination, queryParams } = useGenres();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPagination((prevState) => ({ ...prevState, isLoading: true }));
  };

  return (
    <form className="admin-search-container" onSubmit={handleFormSubmit}>
      <div className="inputs-container">
        <SearchInputText
          paramKey="name_cont"
          placeholder="Buscar por Nombre"
          queryParams={queryParams}
        />
      </div>

      <MMButton type="submit">
        <FaSearchPlus />
        Buscar
      </MMButton>
    </form>
  );
};
