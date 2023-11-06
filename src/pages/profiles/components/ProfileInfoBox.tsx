import React from 'react';
import { Artist } from '../../../models/Artist';
import { Producer } from '../../../models/Producer';
import { Venue } from '../../../models/Venue';
import { MMBox } from '../../../components/MMBox/MMBox';
import '../Profiles.scss';
import { Grid } from '@mui/material';
import { errorSnackbar, warningSnackbar } from '../../../components/Snackbar/Snackbar';
import { MMSubTitle } from '../../../components/MMTitle/MMTitle';
import { Genre } from '../../../models/Genre';
import { followArtist, reportArtist, unfollowArtist } from '../../../services/artistService';
import { followProducer, reportProducer, unfollowProducer } from '../../../services/producerService';
import { followVenue, reportVenue, unfollowVenue } from '../../../services/venueService';
import { ReportForm } from '../../../components/forms/report/ReportForm';
import { MMModal } from '../../../components/Modal/MMModal';
import { ReportCategory, ReportableType } from '../../../models/Report';
import { useModal } from '../../../components/hooks/useModal';
import { VenueMapInfo } from '../venue/components/VenueMapInfo';
import { ProfileBasicInfo } from './ProfileBasicInfo';
import { MMLinksGroup } from '../../../components/MMLinkGroup/MMLinksGroup';
import { useAuth } from '../../../context/authContext';

type ProfileInfoBoxProps = {
  profile: Artist | Producer | Venue;
  setProfile?: any;
  openEditModal?: () => void;
  hideActions?: boolean;
  reviewableKlass: 'artist' | 'venue' | 'producer';
  canEdit?: boolean;
  canReport?: boolean;
};

const followEndpointByReviewable = {
  artist: followArtist,
  producer: followProducer,
  venue: followVenue
};

const unfollowEndpointByReviewable = {
  artist: unfollowArtist,
  producer: unfollowProducer,
  venue: unfollowVenue
};

type Text = {
  reportTitleText: string;
  reportableType: ReportableType;
  service: (id: string, userComment: string, category: ReportCategory, originalReportableId?: string) => Promise<any>;
};

const reportFormPropsByType: Record<'artist' | 'venue' | 'producer', Text> = {
  venue: { service: reportVenue, reportTitleText: 'el espacio de evento', reportableType: 'Venue' },
  artist: { service: reportArtist, reportTitleText: 'el artista', reportableType: 'Artist' },
  producer: { service: reportProducer, reportTitleText: 'la productora', reportableType: 'Producer' }
};

export const ProfileInfoBox = ({
  profile,
  setProfile,
  openEditModal,
  hideActions = false,
  reviewableKlass,
  canEdit = false,
  canReport = false
}: ProfileInfoBoxProps) => {
  const { user } = useAuth();
  const { isModalOpen: isReportModalOpen, openModal: openReportModal, closeModal: closeReportModal } = useModal();

  const followEndpoint = followEndpointByReviewable[reviewableKlass];
  const unfollowEndpoint = unfollowEndpointByReviewable[reviewableKlass];

  const handleFollow = () => {
    try {
      followEndpoint(profile.id);

      // @ts-ignore
      setProfile((prevProfile) => ({ ...prevProfile, followed_by_current_user: true }));
    } catch (error) {
      errorSnackbar('Error al seguir el perfil. Contacte a soporte.');
    }
  };

  const handleUnfollow = () => {
    try {
      unfollowEndpoint(profile.id);

      // @ts-ignore
      setProfile((prevProfile) => ({ ...prevProfile, followed_by_current_user: false }));
    } catch (error) {
      errorSnackbar('Error al dejar de seguir el perfil. Contacte a soporte.');
    }
  };

  const handleReportProfile = () => {
    if (user) {
      if (canReport) {
        openReportModal();
      } else {
        warningSnackbar(
          'No tienes permisos para reportar perfiles. Debes alcanzar un nivel de confianza más alto para desbloquear esta función.'
        );
      }
    } else {
      warningSnackbar('Debe iniciar sesión para reportar un perfil.');
    }
  };

  const handleEditProfile = () => {
    if (user) {
      if (canEdit) {
        openEditModal && openEditModal();
      } else {
        warningSnackbar(
          'No tienes permisos para editar perfiles. Debes alcanzar un nivel de confianza más alto para desbloquear esta función.'
        );
      }
    } else {
      warningSnackbar('Debe iniciar sesión para editar un perfil.');
    }
  };

  return (
    <>
      <MMModal closeModal={closeReportModal} isModalOpen={isReportModalOpen} maxWidth="sm">
        <ReportForm
          reportableId={profile.id}
          closeModal={closeReportModal}
          {...reportFormPropsByType[reviewableKlass]}
        />
      </MMModal>

      <ProfileBasicInfo
        profile={profile}
        handleEditProfile={handleEditProfile}
        handleFollow={handleFollow}
        handleUnfollow={handleUnfollow}
        handleReportProfile={handleReportProfile}
        hideActions={hideActions}
      />

      {/* Description - Links */}
      <MMBox className="show-boxes">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={9} display={'flex'} flexDirection={'column'} gap={'5px'} whiteSpace={'pre-wrap'}>
            <MMSubTitle content="Descripción" />
            {profile.description}
          </Grid>

          <Grid item xs={12} sm={3}>
            {profile.links && profile.links.length > 0 && <MMLinksGroup links={profile.links} />}

            {/* @ts-ignore */}
            {profile.genres && (
              <>
                <MMSubTitle content="Géneros" />
                <ul style={{ marginTop: '3px' }}>
                  {/* @ts-ignore */}
                  {profile.genres.map((genre: Genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </>
            )}
          </Grid>

          {/* @ts-ignore */}
          {profile.address && (
            <Grid item xs={12}>
              <VenueMapInfo venue={profile} />
            </Grid>
          )}
        </Grid>
      </MMBox>
    </>
  );
};
