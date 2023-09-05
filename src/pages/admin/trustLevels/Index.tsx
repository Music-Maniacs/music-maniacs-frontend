import React from 'react';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMTitle } from '../../../components/MMTitle/MMTitle';
import '../Admin.scss';
import { Tooltip } from 'react-tooltip';
import MMTablePaginator from '../../../components/MMTable/MMTablePaginator';
import { MMModal } from '../../../components/Modal/MMModal';
import { Table } from './table/Table';
import { useTrustLevels } from './context/trustLevelContext';
import { Searcher } from './searcher/Searcher';
import { FaPlus } from 'react-icons/fa';
import { MMButtonResponsive } from '../../../components/MMButton/MMButtonResponsive';
import Form from './form/Form';

export const Index = () => {
  const { openFormModal, isFormModalOpen, closeFormModal, pagination, setPagination, setTrustLevels, trustLevels } =
    useTrustLevels();
  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="admin-box-container">
        <div className="admin-title-container">
          <MMTitle content="Niveles de Confianza" />
          <MMButtonResponsive onClick={openFormModal} Icon={FaPlus}>
            Crear Nivel de Confianza
          </MMButtonResponsive>
        </div>

        <MMModal
          isModalOpen={isFormModalOpen}
          closeModal={closeFormModal}
          title="Crear Nivel de Confianza"
          maxWidth="lg"
        >
          <Form
            type="create"
            closeFormModal={closeFormModal}
            setTrustLevelList={setTrustLevels}
            trustLevelList={trustLevels}
          />
        </MMModal>

        <Searcher />

        <Table />

        {pagination && <MMTablePaginator pagination={pagination} setPagination={setPagination} />}
      </MMBox>
      <Tooltip id="tooltip" place="top" />
    </MMContainer>
  );
};
