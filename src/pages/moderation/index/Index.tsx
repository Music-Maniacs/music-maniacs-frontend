import React from 'react';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { MMBox } from '../../../components/MMBox/MMBox';
import '../Moderation.scss';
import { MMTitle } from '../../../components/MMTitle/MMTitle';
import MMTablePaginator from '../../../components/MMTable/MMTablePaginator';
import { useReports } from '../context/moderationContext';
import { Tooltip } from 'react-tooltip';
import { Search } from './search/Search';
import { Table } from './table/Table';

const Index = () => {
  const { pagination, setPagination } = useReports();

  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="moderation-box-container">
        <MMTitle content="Moderación de Contenido" />

        <Search />

        <Table />

        {pagination && <MMTablePaginator pagination={pagination} setPagination={setPagination} />}
      </MMBox>
      <Tooltip id="tooltip" place="top" />
    </MMContainer>
  );
};

export default Index;
