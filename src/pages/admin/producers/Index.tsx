import React from 'react';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMTitle } from '../../../components/MMTitle/MMTitle';
import { MMButtonResponsive } from '../../../components/MMButton/MMButtonResponsive';
import { FaPlus } from 'react-icons/fa';
import { MMModal } from '../../../components/Modal/MMModal';
import { Searcher } from './searcher/Searcher';
import MMTablePaginator from '../../../components/MMTable/MMTablePaginator';
import { useProducers } from './context/producerContext';
import { Tooltip } from 'react-tooltip';
import '../Admin.scss';
import { Form } from './form/Form';
import { Table } from './table/Table';

export const Index = () => {
  const {
    isFormModalOpen,
    isFormEdit,
    openFormModal,
    closeFormModal,
    pagination,
    setPagination,
    setIsFormEdit,
    setProducerToEdit,
    policies
  } = useProducers();

  const handleCreateButton = () => {
    setIsFormEdit(false);
    setProducerToEdit(undefined);
    openFormModal();
  };

  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="admin-box-container">
        <div className="admin-title-container">
          <MMTitle content="Productoras" />
          {policies?.create && (
            <MMButtonResponsive onClick={handleCreateButton} Icon={FaPlus}>
              Crear Productora
            </MMButtonResponsive>
          )}
        </div>

        <MMModal
          isModalOpen={isFormModalOpen}
          closeModal={closeFormModal}
          maxWidth="lg"
          title={`${isFormEdit ? 'Editar' : 'Crear'} Productora`}
        >
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
