import React from 'react';
import { Artist } from '../../../models/Artist';
import { Producer } from '../../../models/Producer';
import { Venue } from '../../../models/Venue';
import { useAuth } from '../../../context/authContext';
import { MMBox } from '../../../components/MMBox/MMBox';
import '../Profiles.scss';
import { Grid } from '@mui/material';
import { MMButton } from '../../../components/MMButton/MMButton';
import { warningSnackbar } from '../../../components/Snackbar/Snackbar';
import { MMSubTitle } from '../../../components/MMTitle/MMTitle';
import { Genre } from '../../../models/Genre';
import MMAnchor from '../../../components/MMLink/MMAnchor';

type ProfileInfoBoxProps = {
  profile: Artist | Producer | Venue;
  isFollowingProfile?: boolean;
  openEditModal: () => void;
};

export const ProfileInfoBox = ({ profile, isFollowingProfile, openEditModal }: ProfileInfoBoxProps) => {
  const { user } = useAuth();

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

            {/* todo: no lo puedo poner al boton, hasta que tengamos en el endpoint si sigue a este evento o no */}
            {user && (
              <MMButton onClick={() => warningSnackbar('Funcion no implementada')}>
                {isFollowingProfile ? 'Dejar de seguir' : 'Seguir'}
              </MMButton>
            )}
          </div>

          <div className="actions-container">
            <MMButton onClick={openEditModal}>Editar Perfil</MMButton>
          </div>
        </div>
      </MMBox>

      {/* Description - Links */}
      <MMBox className="show-boxes">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={9} display={'flex'} flexDirection={'column'} gap={'5px'} whiteSpace={'pre-wrap'}>
            <MMSubTitle content="Descripción" />
            {profile.description}
          </Grid>

          <Grid item xs={12} sm={3}>
            <MMSubTitle content="Enlaces" />

            {profile.links && (
              <ul style={{ marginTop: '3px' }}>
                {profile.links.map((link) => (
                  <MMAnchor
                    key={link.id}
                    style={{ wordBreak: 'break-all' }}
                    href={link.url ?? '#'}
                    content={link.title}
                  />
                ))}
              </ul>
            )}

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
        </Grid>
      </MMBox>
    </>
  );
};
