import React from 'react';

import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMTitle } from '../../../components/MMTitle/MMTitle';
import { MMButton } from '../../../components/MMButton/MMButton';
import { Tooltip } from 'react-tooltip';
import { MMModal } from '../../../components/Modal/MMModal';
import '../Admin.scss';

//import { Searcher } from './searcher/Searcher';
import { Table } from './table/Table';
import { Form } from './form/Form';
import { useThreshold } from './context/ThresholdProvider';

function Index() {
  const { thresholds, dispatch, isModalOpen, openModal, closeModal } = useThreshold();

  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="admin-box-container">
        <div className="admin-title-container">
          <MMTitle content="Umbrales" />
          <MMButton
            onClick={() => {
              openModal();
            }}
          >
            Crear Umbral
          </MMButton>
        </div>

        <MMModal isModalOpen={isModalOpen} closeModal={closeModal} title="Umbral ...">
          <Form />
        </MMModal>


        {/*
        thresholds && thresholds.map((task, index) => 
        <p>{task.id}</p>)
        */}

        <Table />
      </MMBox>
      <Tooltip id="tooltip" place="top" />
    </MMContainer>
  );
}

export default Index;
