import React, { useEffect, useState } from 'react';
import { MMContainer } from '../../../../components/MMContainer/MMContainer';
import { MMBox } from '../../../../components/MMBox/MMBox';
import { MMTitle } from '../../../../components/MMTitle/MMTitle';
import { Stack } from '@mui/material';
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import { MMButtonResponsive } from '../../../../components/MMButton/MMButtonResponsive';
import { useNavigate, useParams } from 'react-router-dom';
import { Producer } from '../../../../models/Producer';
import { useModal } from '../../../../components/hooks/useModal';
import { useProducerRequests } from '../hooks/useProducerRequest';
import { adminGetProducer } from '../../../../services/producerService';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';
import { MMModal } from '../../../../components/Modal/MMModal';
import { Loader } from '../../../../components/Loader/Loader';
import { Tooltip } from 'react-tooltip';
import { ProducerInfo } from './ProducerInfo';
import '../../Admin.scss';
import { ProducerForm } from '../../../../components/forms/producer/ProducerForm';

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producer, setProducer] = useState<Producer>();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { handleDeleteProducer } = useProducerRequests();

  useEffect(() => {
    getProducer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProducer = async () => {
    if (!id) return;

    try {
      const user = await adminGetProducer(id);

      setProducer(user);
    } catch (error) {
      errorSnackbar('Error al obtener la productora. Contacte a soporte.');
      navigate(-1);
    }
  };

  const handleDeleteButton = () => {
    if (!id) return;

    handleDeleteProducer(id, () => {
      navigate(-1);
    });
  };

  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="admin-box-container">
        <div className="admin-title-container">
          <MMTitle content="Productora" />

          <Stack direction={'row'} spacing={1} justifyContent={'flex-end'} width={'100%'}>
            <MMButtonResponsive Icon={FaEdit} onClick={() => openModal()}>
              Editar
            </MMButtonResponsive>

            <MMButtonResponsive color="error" onClick={() => handleDeleteButton()} Icon={FaTrash}>
              Eliminar
            </MMButtonResponsive>

            <MMButtonResponsive Icon={FaArrowLeft} onClick={() => navigate(-1)}>
              Volver
            </MMButtonResponsive>
          </Stack>
        </div>

        {producer ? (
          <>
            <MMModal title="Editar Productora" isModalOpen={isModalOpen} closeModal={closeModal} maxWidth="lg">
              <ProducerForm
                isFormEdit={true}
                producerToEdit={producer}
                closeFormModal={closeModal}
                successCallback={(producer) => setProducer(producer)}
              />
            </MMModal>
            <ProducerInfo producer={producer} />
          </>
        ) : (
          <Loader />
        )}
      </MMBox>
      <Tooltip id="tooltip" place="top" />
    </MMContainer>
  );
};

export default Show;