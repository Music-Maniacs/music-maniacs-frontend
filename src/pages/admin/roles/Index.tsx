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
import { useNavigate } from 'react-router-dom';
import { MMButtonResponsive } from '../../../components/MMButton/MMButtonResponsive';
import { FaPlus } from 'react-icons/fa';

export const Index = () => {
  const { pagination, setPagination } = useRoles();
  const navigate = useNavigate();
  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="admin-box-container">
        <div className="admin-title-container">
          <MMTitle content="Roles" />
          <MMButtonResponsive onClick={() => navigate('./create')} Icon={FaPlus}>
            Crear Rol
          </MMButtonResponsive>
        </div>

        <Searcher />

        <Table />

        {pagination && <MMTablePaginator pagination={pagination} setPagination={setPagination} />}
      </MMBox>
      <Tooltip id="tooltip" place="top" />
    </MMContainer>
  );
};
