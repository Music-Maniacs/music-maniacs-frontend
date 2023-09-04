import React from 'react';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMTitle } from '../../../components/MMTitle/MMTitle';
import { MMButtonResponsive } from '../../../components/MMButton/MMButtonResponsive';
import { FaPlus } from 'react-icons/fa';
import { MMModal } from '../../../components/Modal/MMModal';
import { useVenues } from './context/venueContext';
import MMTablePaginator from '../../../components/MMTable/MMTablePaginator';
import { Tooltip } from 'react-tooltip';
import { Form } from './form/Form';
import { Searcher } from './searcher/Searcher';
import '../Admin.scss';
import { Table } from './table/Table';

export const Index = () => {
  const {
    isFormModalOpen,
    isFormEdit,
    closeFormModal,
    openFormModal,
    setIsFormEdit,
    setVenueIdToEdit,
    pagination,
    setPagination
  } = useVenues();

  const handleCreateButton = () => {
    setIsFormEdit(false);
    setVenueIdToEdit(undefined);
    openFormModal();
  };

  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="admin-box-container">
        <div className="admin-title-container">
          <MMTitle content="Espacio de Eventos" />
          <MMButtonResponsive onClick={handleCreateButton} Icon={FaPlus}>
            Crear Espacio de Evento
          </MMButtonResponsive>
        </div>

        <MMModal
          isModalOpen={isFormModalOpen}
          closeModal={closeFormModal}
          maxWidth="lg"
          title={`${isFormEdit ? 'Editar' : 'Crear'} Espacio de Evento`}
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
