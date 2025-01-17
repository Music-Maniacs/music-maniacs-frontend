import React, { useState } from 'react';
import { useModal } from '../../../../components/hooks/useModal';
import { MMModal } from '../../../../components/Modal/MMModal';
import { ArtistForm } from '../../../../components/forms/artist/ArtistForm';
import { MMContainer } from '../../../../components/MMContainer/MMContainer';
import { Breadcrumb } from '../../../../components/breadrumb/Breadcrumb';
import { Loader } from '../../../../components/Loader/Loader';
import { Tooltip } from 'react-tooltip';
import { ProfileInfoBox } from '../../components/ProfileInfoBox';
import '../../Profiles.scss';
import { useArtist } from '../context/artistContext';
import { VersionBox } from '../../../../components/versions/VersionBox';
import { ProfileEventsBox } from '../../components/ProfileEventsBox';
import { ProfileReviewsBox } from '../../components/ProfileReviewsBox';
import { Version } from '../../../../models/Version';
import { ReportForm } from '../../../../components/forms/report/ReportForm';
import { reportVersions } from '../../../../services/versionService';
import { warningSnackbar } from '../../../../components/Snackbar/Snackbar';

const Show = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { artist, setArtist, artistPolicies, versionPolicies, reviewsPolicies } = useArtist();
  const [versionsToReport, setVersionsToReport] = useState<Version>();
  const {
    isModalOpen: isVersionsReportModalOpen,
    openModal: openVersionsReportModal,
    closeModal: closeVersionsReportModal
  } = useModal();

  const handleReportVersion = (version: Version) => {
    if (versionPolicies?.report) {
      setVersionsToReport(version);
      openVersionsReportModal();
    } else {
      warningSnackbar(
        'No tienes permisos para reportar versiones. Debes alcanzar un nivel de confianza más alto para desbloquear esta función.'
      );
    }
  };

  return (
    <>
      <MMModal isModalOpen={isModalOpen} closeModal={closeModal} title="Editar Artista" maxWidth="lg">
        <ArtistForm
          isFormEdit={true}
          closeFormModal={closeModal}
          artistToEdit={artist}
          useAdminController={false}
          successCallback={(artist) => setArtist((prevArtist) => ({ ...prevArtist, ...artist }))}
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

      <MMContainer maxWidth="xxl" className="profiles-show-boxes-container">
        {artist ? (
          <>
            <Breadcrumb items={[{ label: 'Perfiles', to: '/profiles' }, { label: artist.name }]} />

            <ProfileInfoBox
              profile={artist}
              openEditModal={openModal}
              setProfile={setArtist}
              reviewableKlass="artist"
              canEdit={artistPolicies?.update}
              canReport={artistPolicies?.report}
            />

            <ProfileEventsBox profile={artist} />

            <ProfileReviewsBox profile={artist} reviewableKlass="artist" canReport={reviewsPolicies?.report} />

            <VersionBox versions={artist.history} handleReportVersion={handleReportVersion} />
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
