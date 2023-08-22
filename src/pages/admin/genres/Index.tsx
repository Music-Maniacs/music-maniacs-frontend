import React from 'react';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMTitle } from '../../../components/MMTitle/MMTitle';
import { MMButton } from '../../../components/MMButton/MMButton';
import '../Admin.scss';
import { Tooltip } from 'react-tooltip';
import MMTablePaginator from '../../../components/MMTable/MMTablePaginator';
import { MMModal } from '../../../components/Modal/MMModal';


import { useGenres } from './context/genreContext';
import { Form } from './form/Form';
import { Searcher } from './searcher/Searcher';
import { Table } from './table/Table';

export const Index = () => {
  const { openFormModal, isFormModalOpen, closeFormModal, pagination, setPagination } = useGenres();

  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="admin-box-container">
        <div className="admin-title-container">
          <MMTitle content="Géneros" />
          <MMButton onClick={openFormModal}>Crear Género</MMButton>
        </div>

        <MMModal isModalOpen={isFormModalOpen} closeModal={closeFormModal} title="Crear Género">
          <Form />
        </MMModal>
        <Searcher />
        <Table />
        {pagination && <MMTablePaginator pagination={pagination} setPagination={setPagination} />}
      </MMBox>
      <Tooltip id="tooltip" place="top" />
    </MMContainer>
  );
};
