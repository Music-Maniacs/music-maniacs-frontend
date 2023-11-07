import { Grid } from '@mui/material';
import './profile.scss';
import { useUser } from '../../context/userContext';
import { MMSubTitle } from '../../../../components/MMTitle/MMTitle';
import { useEffect, useState } from 'react';
import { Review } from '../../../../models/Review';
import { MMModal } from '../../../../components/Modal/MMModal';
import { ReviewContent } from '../../../../components/Reviews/ReviewContent';
import { ReviewForm } from '../../../../components/forms/reviews/ReviewForm';
import { useModal } from '../../../../components/hooks/useModal';
import { CoverImage } from '../../components/CoverImage';
import { UserInfo } from '../../components/UserInfo';
import { MMLinksGroup } from '../../../../components/MMLinkGroup/MMLinksGroup';

export const Profile = () => {
  const { userProfile, reviews, setReviews } = useUser();
  const [stats, setStats] = useState<{ label: string; value: string }[][]>([[]]);
  const { closeModal, isModalOpen, openModal } = useModal();
  const [reviewToEdit, setReviewToEdit] = useState<Review>();
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
            label: 'Eventos consultados:',
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
        <Grid item sm={12} md={6} key={`statsCol-${index1}`} className="user-profile-stat-container">
          {subarray.map((stat, index2) => {
            return (
              <div className="user-profile-stat-text" key={`statCol-${index1}-stat-${index2}`}>
                <span className="user-profile-stat-label">{stat.label}</span>
                <span className="user-profile-stat-value">{stat.value}</span>
              </div>
            );
          })}
        </Grid>
      );
    });
  };

  const updateReviewList = (review: Review) => {
    closeModal();
    if (!reviews) return;
    const index = reviews.findIndex((r) => r.id === review.id);
    if (index === -1) return;
    let updatedReviews = reviews;
    const reviewableName = updatedReviews[index].reviewable_name;
    review.reviewable_name = reviewableName;
    updatedReviews[index] = review;
    setReviews(updatedReviews);
  };

  const handleEditReviewButton = (review: Review) => {
    setReviewToEdit(review);
    openModal();
  };

  return (
    <Grid container direction={'column'} className="user-profile-page-container">
      {/* User cover image */}
      <CoverImage coverImage={userProfile?.cover_image} />

      <Grid item>
        <div className="first-row-container">
          <UserInfo
            fullName={userProfile?.full_name}
            profileImage={userProfile?.profile_image}
            username={userProfile?.username}
            role={userProfile?.role}
          />
          {userProfile?.links && userProfile?.links.length > 0 && <MMLinksGroup links={userProfile?.links} />}
        </div>
      </Grid>
      <Grid item>
        {stats && (
          <div className="user-profile-stats">
            <MMSubTitle content="Estadisticas de Usuario" />
            <Grid item container direction={'row'} rowSpacing={1} columnSpacing={3} paddingLeft={2}>
              {renderStats()}
            </Grid>
          </div>
        )}
      </Grid>
      {userProfile?.biography && (
        <Grid item>
          <div className="user-profile-biography-container">
            <MMSubTitle content="Biografía" />
            <p>{userProfile?.biography}</p>
          </div>
        </Grid>
      )}

      <Grid item>
        <div>
          <MMSubTitle content="Reseñas" />
          <h3>Ultimas Reseñas:</h3>
          <div className="user-profile-reviews-container">
            {reviews &&
              reviews.map((review: Review) => (
                <ReviewContent
                  key={review.id}
                  reviewableName={review.reviewable_name}
                  review={review}
                  canEdit={true}
                  handleEditReviewButton={handleEditReviewButton}
                />
              ))}
          </div>
        </div>
      </Grid>
      <MMModal closeModal={closeModal} isModalOpen={isModalOpen} title={'Editar Reseña'}>
        <ReviewForm
          isFormEdit={true}
          reviewToEdit={reviewToEdit}
          closeModal={closeModal}
          successCallback={(review) => updateReviewList(review)}
          artistName={reviewToEdit?.reviewable_type === 'Artist' ? reviewToEdit.reviewable_name : undefined}
          producerName={reviewToEdit?.reviewable_type === 'Producer' ? reviewToEdit.reviewable_name : undefined}
          venueName={reviewToEdit?.reviewable_type === 'Venue' ? reviewToEdit.reviewable_name : undefined}
        />
      </MMModal>
    </Grid>
  );
};
