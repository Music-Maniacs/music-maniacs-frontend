import { Grid } from '@mui/material';
import './profile.scss';
import { useUser } from '../../context/userContext';
import { MMSubTitle } from '../../../../components/MMTitle/MMTitle';
import { FiUser } from 'react-icons/fi';
import { stateColors, stateNames } from '../../../../models/User';
import { MMColors } from '../../../../models/Generic';
import colors from '../../../../styles/_colors.scss';
import { MMChip } from '../../../../components/MMChip/MMChip';
import { useEffect, useState } from 'react';
import { Review } from '../../../../models/Review';
import { MMModal } from '../../../../components/Modal/MMModal';
import { EventReviewForm } from '../../../events/show/components/EventReviewForm';

export const Profile = () => {
  const { userProfile } = useUser();
  const [stats, setStats] = useState<{ label: string; value: string }[][] | null>(null);

  const formatISODate = (date: string) => {
    const newDate = new Date(date);

    return `${newDate.getDay()}/${newDate.getMonth()}/${newDate.getFullYear()} ${newDate.toLocaleTimeString()}`;
  };
  useEffect(() => {
    if (userProfile?.user_stat) {
      setStats([
        [
          {
            label: 'Último inicio de sesión:',
            value: formatISODate(userProfile.user_stat.last_session)
          },
          {
            label: 'Días visitados:',
            value: userProfile.user_stat.days_visited.toString()
          },
          {
            label: 'Eventos consutlados:',
            value: userProfile?.user_stat.viewed_events.toString()
          }
        ],
        [
          {
            label: 'Me gustas dados:',
            value: userProfile?.user_stat.likes_given.toString()
          },
          {
            label: 'Me gustas recibidos:',
            value: userProfile?.user_stat.likes_received.toString()
          },
          {
            label: 'Penalizaciones:',
            value: userProfile?.user_stat.penalty_score.toString()
          }
        ]
      ]);
    }
  }, [userProfile]);

  const renderStats = () => {
    if (!stats) return <></>;
    return stats.map((subarray, index1) => {
      return (
        <Grid item direction={'column'} sm={12} md={6}>
          {subarray.map((stat) => {
            return (
              <div className="user-profile-stat-container">
                <span className="user-profile-stat-text">{stat.label}</span>
                <span className="user-profile-stat-text">{stat.value}</span>
              </div>
            );
          })}
        </Grid>
      );
    });
  };

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
        {stats && (
          <div className="user-profile-stats">
            <MMSubTitle content="Estadisticas de Usuario" />
            <Grid item container direction={'row'} spacing={3} paddingLeft={2}>
              {renderStats()}
            </Grid>
          </div>
        )}
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
          {/* {userProfile &&
            userProfile.reviews &&
            userProfile.reviews.map((review: Review) => (
              <ReviewContent
                key={review.id}
                reviewableName={''}
                review={review}
                canEdit={userProfile?.id === review.user?.id}
                handleEditReviewButton={handleEditReviewButton}
              />
            ))} */}
        </div>
      </Grid>
    </Grid>
  );
};
