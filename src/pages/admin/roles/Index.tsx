import React from 'react';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMTitle } from '../../../components/MMTitle/MMTitle';
import { MMButton } from '../../../components/MMButton/MMButton';
import '../Admin.scss';
import { Tooltip } from 'react-tooltip';
import MMTablePaginator from '../../../components/MMTable/MMTablePaginator';
import { Table } from '../roles/table/Table';
import { useRoles } from './context/roleContext';
import { Searcher } from './searcher/Searcher';
import { useNavigate } from 'react-router-dom';

export const Index = () => {
  const { pagination, setPagination } = useRoles();
  const navigate = useNavigate();
  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="admin-box-container">
        <div className="admin-title-container">
          <MMTitle content="Roles" />
          <MMButton onClick={() => navigate('./create')}>Crear Rol</MMButton>
        </div>

        <Searcher />

        <Table />

        {pagination && <MMTablePaginator pagination={pagination} setPagination={setPagination} />}
      </MMBox>
      <Tooltip id="tooltip" place="top" />
    </MMContainer>
  );
};
