import React, { useState } from 'react';
import { useModal } from '../../../../components/hooks/useModal';
import { MMModal } from '../../../../components/Modal/MMModal';
import { MMContainer } from '../../../../components/MMContainer/MMContainer';
import { Breadcrumb } from '../../../../components/breadrumb/Breadcrumb';
import { Loader } from '../../../../components/Loader/Loader';
import { Tooltip } from 'react-tooltip';
import { ProfileInfoBox } from '../../components/ProfileInfoBox';
import { VenuesForm } from '../../../../components/forms/venues/VenuesForm';
import '../../Profiles.scss';
import { VersionBox } from '../../../../components/versions/VersionBox';
import { ProfileEventsBox } from '../../components/ProfileEventsBox';
import { ProfileReviewsBox } from '../../components/ProfileReviewsBox';
import { useVenue } from '../context/venueContext';
import { Version } from '../../../../models/Version';
import { ReportForm } from '../../../../components/forms/report/ReportForm';
import { reportVersions } from '../../../../services/versionService';

const Show = () => {
  const { venue, setVenue } = useVenue();
  const { isModalOpen, openModal, closeModal } = useModal();
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
        <VenuesForm
          isFormEdit={true}
          closeFormModal={closeModal}
          venueToEdit={venue}
          useAdminController={false}
          successCallback={(venue) => setVenue((prevVenue) => ({ ...prevVenue, ...venue }))}
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
        {venue ? (
          <>
            <Breadcrumb items={[{ label: 'Perfiles', to: '/profiles' }, { label: venue.name }]} />

            <ProfileInfoBox profile={venue} openEditModal={openModal} setProfile={setVenue} reviewableKlass="venue" />

            <ProfileEventsBox profile={venue} />

            <ProfileReviewsBox profile={venue} reviewableKlass="venue" />

            <VersionBox versions={venue.versions} handleReportVersion={handleReportVersion} />
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
