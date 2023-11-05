import React from 'react';
import { MMBox } from '../../../components/MMBox/MMBox';
import '../Profiles.scss';
import { Artist } from '../../../models/Artist';
import { Producer } from '../../../models/Producer';
import { Venue } from '../../../models/Venue';
import { MMButton } from '../../../components/MMButton/MMButton';
import { useAuth } from '../../../context/authContext';
import { warningSnackbar } from '../../../components/Snackbar/Snackbar';
import { StyledFlex } from '../../../styles/styledComponents';
import { FaFlag } from 'react-icons/fa';

type ProfileBasicInfoProps = {
  profile: Artist | Producer | Venue;
  handleFollow?: () => void;
  handleUnfollow?: () => void;
  handleReportProfile?: () => void;
  handleEditProfile?: () => void;
  hideActions?: boolean;
  customActions?: React.ReactNode;
};

export const ProfileBasicInfo = ({
  profile,
  handleFollow,
  handleUnfollow,
  handleReportProfile,
  handleEditProfile,
  hideActions = false,
  customActions
}: ProfileBasicInfoProps) => {
  const { user } = useAuth();

  return (
    <MMBox className="show-boxes">
      <div className="profiles-info-box ">
        <div className="image-container">
          <img
            alt="Portada del Perfil"
            src={profile.image?.full_url ?? require('../../../assets/images/default-event.jpg')}
            className="image"
          />
        </div>

        <div className="data-container">
          <h1 className="name">{profile.name}</h1>

          {handleFollow && handleUnfollow && (
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
          )}
        </div>

        {(customActions || !hideActions) && (
          <div className="actions-container">
            {handleReportProfile && (
              <StyledFlex
                $cursor="pointer"
                onClick={() => {
                  if (user) {
                    handleReportProfile();
                  } else {
                    warningSnackbar('Debes iniciar sesión para reportar el perfil');
                  }
                }}
              >
                <FaFlag />
                <span>Reportar</span>
              </StyledFlex>
            )}

            {handleEditProfile && (
              <MMButton
                onClick={() => {
                  if (user) {
                    handleEditProfile();
                  } else {
                    warningSnackbar('Debes iniciar sesión para editar el perfil');
                  }
                }}
              >
                Editar Perfil
              </MMButton>
            )}

            {customActions}
          </div>
        )}
      </div>
    </MMBox>
  );
};
