import React, { useState } from 'react';
import { useModal } from '../../../../components/hooks/useModal';
import { MMModal } from '../../../../components/Modal/MMModal';
import { MMContainer } from '../../../../components/MMContainer/MMContainer';
import { Breadcrumb } from '../../../../components/breadrumb/Breadcrumb';
import { Loader } from '../../../../components/Loader/Loader';
import { Tooltip } from 'react-tooltip';
import { ProfileInfoBox } from '../../components/ProfileInfoBox';
import { ProducerForm } from '../../../../components/forms/producer/ProducerForm';
import '../../Profiles.scss';
import { VersionBox } from '../../../../components/versions/VersionBox';
import { ProfileEventsBox } from '../../components/ProfileEventsBox';
import { ProfileReviewsBox } from '../../components/ProfileReviewsBox';
import { useProducer } from '../context/producerContext';
import { ReportForm } from '../../../../components/forms/report/ReportForm';
import { reportVersions } from '../../../../services/versionService';
import { Version } from '../../../../models/Version';

const Show = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { producer, setProducer } = useProducer();
  const [versionsToReport, setVersionsToReport] = useState<Version>();
  const {
    isModalOpen: isVersionsReportModalOpen,
    openModal: openVersionsReportModal,
    closeModal: closeVersionsReportModal
  } = useModal();

  const handleReportVersion = (version: Version) => {
    setVersionsToReport(version);
    openVersionsReportModal();
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

      <MMModal closeModal={closeVersionsReportModal} isModalOpen={isVersionsReportModalOpen} maxWidth="sm">
        <ReportForm
          reportableId={versionsToReport?.id || ''}
          service={reportVersions}
          closeModal={closeVersionsReportModal}
          reportTitleText="la versión"
          reportableType="Version"
        />
      </MMModal>

      <MMContainer maxWidth="xxl" className="profiles-show-boxes-container ">
        {producer ? (
          <>
            <Breadcrumb items={[{ label: 'Perfiles', to: '/profiles' }, { label: producer.name }]} />

            <ProfileInfoBox
              profile={producer}
              openEditModal={openModal}
              setProfile={setProducer}
              reviewableKlass="producer"
            />

            <ProfileEventsBox profile={producer} />

            <ProfileReviewsBox profile={producer} reviewableKlass="producer" />

            <VersionBox versions={producer.versions} handleReportVersion={handleReportVersion} />
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
