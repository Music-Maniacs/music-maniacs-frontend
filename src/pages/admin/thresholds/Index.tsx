import React from 'react';

import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMTitle } from '../../../components/MMTitle/MMTitle';
import { MMButton } from '../../../components/MMButton/MMButton';
import { Tooltip } from 'react-tooltip';
import { MMModal } from '../../../components/Modal/MMModal';
import '../Admin.scss';

import { Table } from './table/Table';
import { Form } from './form/Form';
import { useThreshold } from './context/ThresholdProvider';

function Index() {
  const { threshold, setThreshold, isModalOpen, openModal, closeModal, policies } = useThreshold();

  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="admin-box-container">
        <div className="admin-title-container">
          <MMTitle content="Umbrales" />

          {policies?.create && (
            <MMButton
              onClick={() => {
                setThreshold(undefined);
                openModal();
              }}
            >
              Crear Umbral
            </MMButton>
          )}
        </div>

        <MMModal isModalOpen={isModalOpen} closeModal={closeModal} title={`${threshold ? 'Editar' : 'Crear'} umbral`}>
          <Form />
        </MMModal>

        <Table />
      </MMBox>
      <Tooltip id="tooltip" place="top" />
    </MMContainer>
  );
}

export default Index;
