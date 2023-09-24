import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useModal } from '../../../../components/hooks/useModal';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';
import { MMModal } from '../../../../components/Modal/MMModal';
import { MMContainer } from '../../../../components/MMContainer/MMContainer';
import { Breadcrumb } from '../../../../components/breadrumb/Breadcrumb';
import { Loader } from '../../../../components/Loader/Loader';
import { Tooltip } from 'react-tooltip';
import { ProfileInfoBox } from '../../components/ProfileInfoBox';
import { Producer } from '../../../../models/Producer';
import { ProducerForm } from '../../../../components/forms/producer/ProducerForm';
import { getProducer as serviceGetProducer } from '../../../../services/producerService';
import '../../Profiles.scss';
import { VersionBox } from '../../../../components/versions/VersionBox';

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producer, setProducer] = useState<Producer>();
  const { isModalOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    getProducer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProducer = async () => {
    if (!id) {
      navigate('/profiles');
      return errorSnackbar('No se encontró la productora.');
    }

    try {
      const producer = await serviceGetProducer(id);

      setProducer(producer);
    } catch (error) {
      errorSnackbar('Error al obtener la productora. Contacte a soporte.');
      navigate('/profiles');
    }
  };

  return (
    <>
      <MMModal isModalOpen={isModalOpen} closeModal={closeModal} title="Editar Productora" maxWidth="lg">
        <ProducerForm
          isFormEdit={true}
          closeFormModal={closeModal}
          producerToEdit={producer}
          useAdminController={false}
          successCallback={(producer) => setProducer((prevProducer) => ({ ...prevProducer, ...producer }))}
        />
      </MMModal>

      <MMContainer maxWidth="xxl" className="profiles-show-boxes-container ">
        {producer ? (
          <>
            <Breadcrumb items={[{ label: 'Perfiles', to: '/profiles' }, { label: producer.name }]} />

            {/* todo: agregar si lo esta siguiendo o no */}
            <ProfileInfoBox profile={producer} openEditModal={openModal} />

            {/* <EventReviewBox event={event} setEvent={setEvent} /> */}

            <VersionBox versions={producer.versions} />
          </>
        ) : (
          <Loader />
        )}
      </MMContainer>

      <Tooltip id="tooltip" place="top" />
    </>
  );
};

export default Show;
