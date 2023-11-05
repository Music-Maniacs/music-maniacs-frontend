import React from 'react';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMTitle } from '../../../components/MMTitle/MMTitle';
import '../Admin.scss';
import { Tooltip } from 'react-tooltip';
import MMTablePaginator from '../../../components/MMTable/MMTablePaginator';
import { MMModal } from '../../../components/Modal/MMModal';
import { Table } from './table/Table';
import { Form } from './form/Form';
import { useUsers } from './context/usersContext';
import { Searcher } from './searcher/Searcher';
import { FaPlus } from 'react-icons/fa';
import { MMButtonResponsive } from '../../../components/MMButton/MMButtonResponsive';

export const Index = () => {
  const { openFormModal, isFormModalOpen, closeFormModal, pagination, setPagination, policies } = useUsers();

  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="admin-box-container">
        <div className="admin-title-container">
          <MMTitle content="Usuarios" />

          {policies?.create && (
            <MMButtonResponsive onClick={openFormModal} Icon={FaPlus}>
              Crear Usuario
            </MMButtonResponsive>
          )}
        </div>

        <MMModal isModalOpen={isFormModalOpen} closeModal={closeFormModal} title="Crear Usuario">
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
