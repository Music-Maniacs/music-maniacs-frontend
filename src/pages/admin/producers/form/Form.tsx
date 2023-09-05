import React from 'react';
import { useProducers } from '../context/producerContext';
import { Producer } from '../../../../models/Producer';
import { ProducerForm } from '../../../../components/forms/producer/ProducerForm';

export const Form = () => {
  const { setProducers, closeFormModal, isFormEdit, producerToEdit } = useProducers();

  const successCallback = (producer: Producer) => {
    if (isFormEdit) {
      setProducers((producers) => producers?.map((a) => (a.id === producer.id ? producer : a)));
    } else {
      setProducers((producers) => [producer, ...(producers ?? [])]);
    }
  };

  return (
    <ProducerForm
      producerToEdit={producerToEdit}
      isFormEdit={isFormEdit}
      closeFormModal={closeFormModal}
      successCallback={successCallback}
    />
  );
};
