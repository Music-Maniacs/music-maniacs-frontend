import React from 'react';
import { Artist } from '../../../models/Artist';
import { Producer } from '../../../models/Producer';
import { Venue } from '../../../models/Venue';
import { useAuth } from '../../../context/authContext';
import { MMBox } from '../../../components/MMBox/MMBox';
import '../Profiles.scss';
import { Grid } from '@mui/material';
import { MMButton } from '../../../components/MMButton/MMButton';
import { errorSnackbar, warningSnackbar } from '../../../components/Snackbar/Snackbar';
import { MMSubTitle } from '../../../components/MMTitle/MMTitle';
import { Genre } from '../../../models/Genre';
import MMAnchor from '../../../components/MMLink/MMAnchor';
import { followArtist, unfollowArtist } from '../../../services/artistService';
import { followProducer, unfollowProducer } from '../../../services/producerService';
import { followVenue, unfollowVenue } from '../../../services/venueService';
import { VenueMapInfo } from '../venue/components/VenueMapInfo';
import { MMLinksGroup } from '../../../components/MMLinkGroup/MMLinksGroup';

type ProfileInfoBoxProps = {
  profile: Artist | Producer | Venue;
  setProfile?: any;
  openEditModal?: () => void;
  hideActions?: boolean;
  reviewableKlass: 'artist' | 'venue' | 'producer';
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

export const ProfileInfoBox = ({
  profile,
  setProfile,
  openEditModal,
  hideActions = false,
  reviewableKlass
}: ProfileInfoBoxProps) => {
  const { user } = useAuth();

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

  return (
    <>
      <MMBox className="show-boxes info-box">
        <div className="info-box">
          <div className="image-container">
            <img
              alt="Portada del Perfil"
              src={profile.image?.full_url ?? require('../../../assets/images/default-event.jpg')}
              className="image"
            />
          </div>

          <div className="data-container">
            <h1 className="name">{profile.name}</h1>

            <MMButton
              onClick={() => {
                if (user) {
                  if (profile.followed_by_current_user) {
                    handleUnfollow();
                  } else {
                    handleFollow();
                  }
                } else {
                  warningSnackbar('Debes iniciar sesión para seguir el perfil');
                }
              }}
            >
              {profile.followed_by_current_user ? 'Dejar de seguir' : 'Seguir'}
            </MMButton>
          </div>

          {!hideActions && (
            <div className="actions-container">
              <MMButton
                onClick={() => {
                  if (user) {
                    openEditModal && openEditModal();
                  } else {
                    warningSnackbar('Debes iniciar sesión para editar el perfil');
                  }
                }}
              >
                Editar Perfil
              </MMButton>
            </div>
          )}
        </div>
      </MMBox>

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
