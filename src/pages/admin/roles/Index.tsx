import React from 'react';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMTitle } from '../../../components/MMTitle/MMTitle';
import '../Admin.scss';
import { Tooltip } from 'react-tooltip';
import MMTablePaginator from '../../../components/MMTable/MMTablePaginator';
import { Table } from '../roles/table/Table';
import { useRoles } from './context/roleContext';
import { Searcher } from './searcher/Searcher';
import { MMButtonResponsive } from '../../../components/MMButton/MMButtonResponsive';
import { FaPlus } from 'react-icons/fa';
import { MMModal } from '../../../components/Modal/MMModal';
import Form from './form/Form';

export const Index = () => {
  const { openFormModal, isFormModalOpen, closeFormModal, pagination, setPagination, setRoles, roles, policies } =
    useRoles();
  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="admin-box-container">
        <div className="admin-title-container">
          <MMTitle content="Roles" />

          {policies?.create && (
            <MMButtonResponsive onClick={() => openFormModal()} Icon={FaPlus}>
              Crear Rol
            </MMButtonResponsive>
          )}
        </div>

        <MMModal isModalOpen={isFormModalOpen} closeModal={closeFormModal} maxWidth="lg" title="Crear Rol">
          <Form type="create" roleList={roles} setRoleList={setRoles} closeFormModal={closeFormModal} />
        </MMModal>

        <Searcher />

        <Table />

        {pagination && <MMTablePaginator pagination={pagination} setPagination={setPagination} />}
      </MMBox>
      <Tooltip id="tooltip" place="top" />
    </MMContainer>
  );
};
