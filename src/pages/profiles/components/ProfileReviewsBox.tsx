import React, { useState } from 'react';
import { Artist } from '../../../models/Artist';
import { Producer } from '../../../models/Producer';
import { Venue } from '../../../models/Venue';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMSubTitle } from '../../../components/MMTitle/MMTitle';
import { StyledFlexColumn } from '../../../styles/styledComponents';
import { Rating } from '@mui/material';
import MMLink from '../../../components/MMLink/MMLink';
import { Review } from '../../../models/Review';
import { ReviewContent } from '../../../components/Reviews/ReviewContent';
import { useAuth } from '../../../context/authContext';
import { useModal } from '../../../components/hooks/useModal';
import { MMModal } from '../../../components/Modal/MMModal';
import { ReviewForm } from '../../../components/forms/reviews/ReviewForm';
import { ReportForm } from '../../../components/forms/report/ReportForm';
import { reportReview } from '../../../services/reviewsService';
import { NoData } from '../../../components/NoData/NoData';

type ProfileReviewsBoxProps = {
  profile: Artist | Producer | Venue;
  reviewableKlass: 'artist' | 'venue' | 'producer';
};

export const ProfileReviewsBox = ({ profile, reviewableKlass }: ProfileReviewsBoxProps) => {
  const { user } = useAuth();
  const [reviewToEdit, setReviewToEdit] = useState<Review>();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [reviewToReport, setReviewToReport] = useState<Review>();
  const { isModalOpen: isReportModalOpen, openModal: openReportModal, closeModal: closeReportModal } = useModal();

  const handleEditReviewButton = (review: Review) => {
    setReviewToEdit(review);
    openModal();
  };

  const handleReportReviewButton = (review: Review) => {
    setReviewToReport(review);
    openReportModal();
  };

  const updateReviewList = (review: Review) => {
    closeModal();

    const index = profile.last_reviews.findIndex((r) => r.id === review.id);
    if (index === -1) return;

    profile.last_reviews[index] = review;
  };

  const reviewFormNameProps = {
    [`${reviewableKlass}Name`]: profile.name
  };

  const reportableType = (reviewableKlass.charAt(0).toUpperCase() + reviewableKlass.slice(1)) as
    | 'Venue'
    | 'Artist'
    | 'Producer';

  return (
    <>
      <MMModal closeModal={closeModal} isModalOpen={isModalOpen} title={'Editar Reseña'}>
        <ReviewForm
          isFormEdit={true}
          reviewToEdit={reviewToEdit}
          {...reviewFormNameProps}
          closeModal={closeModal}
          successCallback={(review) => updateReviewList(review)}
        />
      </MMModal>

      <MMModal closeModal={closeReportModal} isModalOpen={isReportModalOpen} maxWidth="sm">
        <ReportForm
          reportableId={reviewToReport?.id || ''}
          service={reportReview}
          closeModal={closeReportModal}
          reportTitleText="la reseña"
          reportableType={reportableType}
        />
      </MMModal>

      <MMBox className="show-boxes ">
        <div className="reviews-box">
          <MMSubTitle content="Reseñas" />

          <h4>Puntuación General</h4>

          <StyledFlexColumn $gap="5px">
            <span>{profile.name}</span>
            <Rating name="artist-rating" value={profile.rating ? +profile.rating : 0} precision={0.5} readOnly />
          </StyledFlexColumn>

          <h4>Últimas Reseñas</h4>

          {profile.last_reviews.length === 0 ? (
            <NoData message="No hay reseñas para mostrar" />
          ) : (
            profile.last_reviews.map((review: Review) => (
              <ReviewContent
                key={review.id}
                reviewableName={profile.name}
                review={review}
                canEdit={user?.id === review.user?.id}
                handleEditReviewButton={handleEditReviewButton}
                handleReportReviewButton={handleReportReviewButton}
              />
            ))
          )}

          <br />

          <MMLink content="Ver todas las reseñas" to={`reviews`} />
        </div>
      </MMBox>
    </>
  );
};
