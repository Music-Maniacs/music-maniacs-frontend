import { Grid } from '@mui/material';
import './profile.scss';
import { useUser } from '../../context/userContext';
import { MMSubTitle } from '../../../../components/MMTitle/MMTitle';
import { FiUser } from 'react-icons/fi';
import { stateColors, stateNames } from '../../../../models/User';
import { MMColors } from '../../../../models/Generic';
import colors from '../../../../styles/_colors.scss';
import { MMChip } from '../../../../components/MMChip/MMChip';

export const Profile = () => {
  const { userProfile } = useUser();

  console.log(userProfile);
  return (
    <Grid container direction={'column'} className="user-profile-page-container">
      {/* User cover image */}
      {userProfile?.cover_image && (
        <Grid item className="user-profile-cover">
          <img src={userProfile?.cover_image.full_url} />
        </Grid>
      )}

      <Grid item>
        <div className="first-row-container">
          <div className="user-profile-info">
            <div className="user-profile-image">
              {userProfile?.profile_image ? <img src={userProfile.profile_image.full_url} /> : <FiUser />}
            </div>
            <div className="user-profile-user-data">
              <span className="user-profile-fullname">{userProfile?.full_name}</span>
              {userProfile && <MMChip color="primary">{userProfile?.role.name}</MMChip>}
              <span className="user-profile-username">{`@${userProfile?.username}`}</span>
            </div>
          </div>

          <div className="user-profile-links">
            <MMSubTitle content="Enlaces" />

            {userProfile?.links && (
              <ul style={{ marginTop: '3px' }}>
                {userProfile?.links.map((link) => (
                  <li key={link.id}>{`${link.title}: ${link.url}`}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Grid>
      <Grid item>
        <div className="user-profile-stats">
          <MMSubTitle content="Estadisticas de Usuario" />
          <Grid container direction={'row'}></Grid>
        </div>
      </Grid>
      <Grid item>
        <div>
          <MMSubTitle content="Biografía" />
          <p>{userProfile?.biography}</p>
        </div>
      </Grid>
      <Grid item>
        <div>
          <MMSubTitle content="Reseñas" />
          <h3>Ultimas Reseñas:</h3>
        </div>
      </Grid>
    </Grid>
  );
};
